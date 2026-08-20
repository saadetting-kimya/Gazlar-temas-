#!/usr/bin/env python3
"""
Minimal from-scratch PDF object-level parser + writer, built because no
PDF library (pypdf/pikepdf/qpdf/poppler-utils) is installable in this
sandbox (no internet access). Scope is deliberately narrow: read any
well-formed PDF (including xref streams + compressed object streams,
with /Prev chains for incrementally-updated files), enumerate its page
tree, and splice whole pages from other (simpler) PDFs into its Kids
array at chosen positions, then serialize a fresh, valid classic-xref
PDF. Existing objects are decompressed/re-parsed and re-serialized
faithfully (streams kept as raw byte payloads, unchanged).
"""
import re, zlib, sys

class PdfName(str): pass
class PdfRef:
    __slots__ = ("num", "gen")
    def __init__(self, num, gen=0): self.num, self.gen = num, gen
    def __repr__(self): return f"<Ref {self.num} {self.gen}>"
    def __eq__(self, o): return isinstance(o, PdfRef) and self.num == o.num and self.gen == o.gen
    def __hash__(self): return hash((self.num, self.gen))
class PdfStream:
    def __init__(self, d, raw): self.dict, self.raw = d, raw

WS = b"\x00\t\n\x0c\r "
DELIM = b"()<>[]{}/%"

def is_ws(b): return b in WS

class Tokenizer:
    def __init__(self, data, pos=0):
        self.data = data; self.pos = pos
    def skip_ws(self):
        d = self.data
        while self.pos < len(d):
            c = d[self.pos]
            if c == 0x25:  # '%' comment
                while self.pos < len(d) and d[self.pos] not in b"\r\n": self.pos += 1
            elif is_ws(c):
                self.pos += 1
            else:
                break
    def peek(self):
        return self.data[self.pos] if self.pos < len(self.data) else -1

def parse_value(tok):
    tok.skip_ws()
    d = tok.data
    if tok.pos >= len(d): return None
    c = d[tok.pos]
    if c == 0x2f:  # '/'
        return parse_name(tok)
    if c == 0x28:  # '('
        return parse_litstring(tok)
    if c == 0x3c:  # '<'
        if d[tok.pos+1:tok.pos+2] == b"<":
            return parse_dict_or_stream(tok)
        return parse_hexstring(tok)
    if c == 0x5b:  # '['
        return parse_array(tok)
    if c in b"+-.0123456789":
        return parse_numeric_or_ref(tok)
    if d[tok.pos:tok.pos+4] == b"true": tok.pos += 4; return True
    if d[tok.pos:tok.pos+5] == b"false": tok.pos += 5; return False
    if d[tok.pos:tok.pos+4] == b"null": tok.pos += 4; return None
    raise ValueError(f"unexpected byte {c!r} at {tok.pos}: ctx={d[max(0,tok.pos-20):tok.pos+20]!r}")

def parse_name(tok):
    d = tok.data; tok.pos += 1  # skip '/'
    start = tok.pos
    out = bytearray()
    while tok.pos < len(d) and d[tok.pos] not in WS and d[tok.pos] not in DELIM:
        if d[tok.pos] == 0x23 and tok.pos+2 < len(d):  # '#'
            hx = d[tok.pos+1:tok.pos+3]
            try:
                out.append(int(hx, 16)); tok.pos += 3; continue
            except ValueError:
                pass
        out.append(d[tok.pos]); tok.pos += 1
    return PdfName(out.decode("latin-1"))

def parse_litstring(tok):
    d = tok.data; tok.pos += 1
    depth = 1; out = bytearray()
    while tok.pos < len(d) and depth > 0:
        c = d[tok.pos]
        if c == 0x5c:  # backslash
            nc = d[tok.pos+1:tok.pos+2]
            mapping = {b"n": b"\n", b"r": b"\r", b"t": b"\t", b"b": b"\b", b"f": b"\f", b"(": b"(", b")": b")", b"\\": b"\\"}
            if nc in mapping:
                out += mapping[nc]; tok.pos += 2
            elif nc in b"\r\n":
                tok.pos += 2
                if nc == b"\r" and d[tok.pos:tok.pos+1] == b"\n": tok.pos += 1
            elif nc.isdigit():
                j = tok.pos+1; digs = b""
                while j < len(d) and len(digs) < 3 and d[j:j+1].isdigit(): digs += d[j:j+1]; j += 1
                out.append(int(digs, 8) & 0xff); tok.pos = j
            else:
                out += nc; tok.pos += 2
        elif c == 0x28:
            depth += 1; out.append(c); tok.pos += 1
        elif c == 0x29:
            depth -= 1; tok.pos += 1
            if depth > 0: out.append(c)
        else:
            out.append(c); tok.pos += 1
    return bytes(out)

def parse_hexstring(tok):
    d = tok.data; tok.pos += 1
    start = tok.pos
    while tok.pos < len(d) and d[tok.pos] != 0x3e: tok.pos += 1
    hx = d[start:tok.pos].replace(b" ", b"").replace(b"\n", b"").replace(b"\r", b"")
    tok.pos += 1
    if len(hx) % 2: hx += b"0"
    return bytes.fromhex(hx.decode("latin-1"))

def parse_array(tok):
    tok.pos += 1
    out = []
    while True:
        tok.skip_ws()
        if tok.peek() == 0x5d:
            tok.pos += 1; break
        out.append(parse_value(tok))
    return out

def parse_dict_or_stream(tok):
    d = tok.data; tok.pos += 2
    dct = {}
    while True:
        tok.skip_ws()
        if d[tok.pos:tok.pos+2] == b">>":
            tok.pos += 2; break
        key = parse_name(tok)
        val = parse_value(tok)
        dct[str(key)] = val
    save = tok.pos
    tok.skip_ws()
    if d[tok.pos:tok.pos+6] == b"stream":
        tok.pos += 6
        if d[tok.pos:tok.pos+2] == b"\r\n": tok.pos += 2
        elif d[tok.pos:tok.pos+1] == b"\n": tok.pos += 1
        start = tok.pos
        length = dct.get("Length")
        if isinstance(length, int):
            end = start + length
            # sanity check for 'endstream' nearby; some producers have off-by-N Length
            probe = d.find(b"endstream", end)
            if probe == -1 or probe - end > 3:
                end2 = d.find(b"endstream", start)
                if end2 != -1: end = end2
        else:
            end = d.find(b"endstream", start)  # Length is indirect; resolved later by caller if needed
        raw = d[start:end]
        tok.pos = end
        tok.skip_ws()
        if d[tok.pos:tok.pos+9] == b"endstream": tok.pos += 9
        return PdfStream(dct, raw)
    else:
        tok.pos = save
        return dct

def parse_numeric_or_ref(tok):
    d = tok.data
    m = re.match(rb"[+-]?[0-9]*\.?[0-9]+", d[tok.pos:])
    numtxt = m.group(0); tok.pos += len(numtxt)
    if b"." in numtxt:
        return float(numtxt)
    n = int(numtxt)
    save = tok.pos
    tok.skip_ws()
    m2 = re.match(rb"([0-9]+)[ \t\r\n]+(R|obj)\b", d[tok.pos:])
    if m2 and n >= 0:
        gen = int(m2.group(1))
        kind = m2.group(2)
        if kind == b"R":
            tok.pos += m2.end()
            return PdfRef(n, gen)
        else:
            # "N G obj" -- caller (indirect object reader) handles this; roll back
            tok.pos = save
            return n
    tok.pos = save
    return n


class PDF:
    def __init__(self, data):
        self.data = data
        self.cache = {}          # (num) -> resolved python value (dict/PdfStream/list/...)
        self.offsets = {}        # num -> byte offset (type 1, uncompressed)
        self.compressed = {}     # num -> (objstm_num, index)
        self.trailer = {}
        self._load_xref()

    def _read_indirect_at(self, offset):
        tok = Tokenizer(self.data, offset)
        tok.skip_ws()
        m = re.match(rb"(\d+)[ \t\r\n]+(\d+)[ \t\r\n]+obj", self.data[tok.pos:])
        if not m:
            raise ValueError(f"no object header at offset {offset}: {self.data[offset:offset+30]!r}")
        tok.pos += m.end()
        val = parse_value(tok)
        # resolve indirect /Length for streams if needed
        if isinstance(val, PdfStream) and "Length" in val.dict and isinstance(val.dict["Length"], PdfRef):
            pass  # left as-is; raw already captured via endstream-scan fallback
        return val

    def _load_xref(self):
        d = self.data
        m = list(re.finditer(rb"startxref\s+(\d+)\s+%%EOF", d))
        if not m:
            raise ValueError("no startxref found")
        start = int(m[-1].group(1))
        seen_prev = set()
        trailer_merged = {}
        while start is not None and start not in seen_prev:
            seen_prev.add(start)
            if d[start:start+4] == b"xref":
                start = self._load_classic_xref(start, trailer_merged)
            else:
                start = self._load_xref_stream(start, trailer_merged)
        self.trailer = trailer_merged

    def _load_classic_xref(self, pos, trailer_merged):
        d = self.data
        tok = Tokenizer(d, pos+4)
        tok.skip_ws()
        while True:
            m = re.match(rb"(\d+)[ \t]+(\d+)\s*\n", d[tok.pos:])
            if not m:
                break
            first = int(m.group(1)); count = int(m.group(2))
            tok.pos += m.end()
            for i in range(count):
                entry = d[tok.pos:tok.pos+20]
                tok.pos += 20
                offset = int(entry[0:10]); flag = entry[17:18]
                num = first + i
                if flag == b"n" and num not in self.offsets and num not in self.compressed:
                    self.offsets[num] = offset
            tok.skip_ws()
        m2 = re.match(rb"trailer", d[tok.pos:])
        if not m2:
            raise ValueError("expected trailer keyword")
        tok.pos += m2.end()
        tdict = parse_value(tok)
        for k, v in tdict.items():
            trailer_merged.setdefault(k, v)
        prev = tdict.get("Prev")
        return int(prev) if prev is not None else None

    def _load_xref_stream(self, pos, trailer_merged):
        val = self._read_indirect_at(pos)
        assert isinstance(val, PdfStream)
        d2 = decode_stream(val)
        w = val.dict["W"]
        w0, w1, w2 = w
        size = val.dict["Size"]
        index = val.dict.get("Index", [0, size])
        rowlen = w0 + w1 + w2
        p = 0
        idx_pairs = [(index[i], index[i+1]) for i in range(0, len(index), 2)]
        for start_num, count in idx_pairs:
            for i in range(count):
                row = d2[p:p+rowlen]; p += rowlen
                f0 = int.from_bytes(row[0:w0], "big") if w0 else 1
                f1 = int.from_bytes(row[w0:w0+w1], "big")
                f2 = int.from_bytes(row[w0+w1:w0+w1+w2], "big") if w2 else 0
                num = start_num + i
                if num in self.offsets or num in self.compressed:
                    continue
                if f0 == 1:
                    self.offsets[num] = f1
                elif f0 == 2:
                    self.compressed[num] = (f1, f2)
        for k, v in val.dict.items():
            trailer_merged.setdefault(k, v)
        prev = val.dict.get("Prev")
        return int(prev) if prev is not None else None

    def get(self, num):
        if num in self.cache:
            return self.cache[num]
        if num in self.offsets:
            v = self._read_indirect_at(self.offsets[num])
        elif num in self.compressed:
            stm_num, idx = self.compressed[num]
            v = self._get_from_objstm(stm_num, idx)
        else:
            raise KeyError(f"object {num} not found in xref")
        self.cache[num] = v
        return v

    def _get_from_objstm(self, stm_num, idx):
        stm = self.get(stm_num)
        assert isinstance(stm, PdfStream)
        data = decode_stream(stm)
        n = stm.dict["N"]; first = stm.dict["First"]
        tok = Tokenizer(data, 0)
        pairs = []
        for _ in range(n):
            tok.skip_ws()
            m = re.match(rb"(\d+)[ \t]+(\d+)", data[tok.pos:])
            tok.pos += m.end()
            pairs.append((int(m.group(1)), int(m.group(2))))
        objnum, off = pairs[idx]
        t2 = Tokenizer(data, first+off)
        return parse_value(t2)

    def resolve(self, v):
        while isinstance(v, PdfRef):
            v = self.get(v.num)
        return v


def _png_unpredict(data, columns, colors=1, bpc=8):
    bpp = max(1, (colors * bpc) // 8)
    rowlen = columns * colors * bpc // 8
    out = bytearray()
    prev = bytearray(rowlen)
    pos = 0
    while pos < len(data):
        tag = data[pos]; pos += 1
        row = bytearray(data[pos:pos+rowlen]); pos += rowlen
        if tag == 0:
            pass
        elif tag == 1:  # Sub
            for i in range(len(row)):
                left = row[i-bpp] if i >= bpp else 0
                row[i] = (row[i] + left) & 0xff
        elif tag == 2:  # Up
            for i in range(len(row)):
                row[i] = (row[i] + prev[i]) & 0xff
        elif tag == 3:  # Average
            for i in range(len(row)):
                left = row[i-bpp] if i >= bpp else 0
                row[i] = (row[i] + ((left + prev[i]) >> 1)) & 0xff
        elif tag == 4:  # Paeth
            for i in range(len(row)):
                left = row[i-bpp] if i >= bpp else 0
                up = prev[i]
                upleft = prev[i-bpp] if i >= bpp else 0
                p = left + up - upleft
                pa, pb, pc = abs(p-left), abs(p-up), abs(p-upleft)
                pred = left if (pa <= pb and pa <= pc) else (up if pb <= pc else upleft)
                row[i] = (row[i] + pred) & 0xff
        else:
            raise ValueError(f"unsupported PNG predictor tag {tag}")
        out += row
        prev = row
    return bytes(out)

def decode_stream(stm):
    raw = stm.raw
    filt = stm.dict.get("Filter")
    if filt is None:
        return raw
    filters = filt if isinstance(filt, list) else [filt]
    parms = stm.dict.get("DecodeParms")
    parmlist = parms if isinstance(parms, list) else [parms] * len(filters)
    out = raw
    for f, dp in zip(filters, parmlist):
        if str(f) == "FlateDecode":
            out = zlib.decompress(out)
            if isinstance(dp, dict):
                predictor = dp.get("Predictor", 1)
                if predictor and predictor >= 10:
                    columns = dp.get("Columns", 1)
                    colors = dp.get("Colors", 1)
                    bpc = dp.get("BitsPerComponent", 8)
                    out = _png_unpredict(out, columns, colors, bpc)
                elif predictor and predictor != 1:
                    raise ValueError(f"unsupported predictor {predictor}")
        else:
            raise ValueError(f"unsupported filter {f}")
    return out


# ---------------- serialization ----------------

def esc_name(s):
    out = []
    for ch in s:
        b = ord(ch)
        if b < 33 or b > 126 or chr(b) in "()<>[]{}/%#":
            out.append(f"#{b:02x}")
        else:
            out.append(chr(b))
    return "/" + "".join(out)

def esc_litstring(b: bytes):
    out = bytearray(b"(")
    for c in b:
        if c in (0x28, 0x29, 0x5c):
            out += bytes([0x5c, c])
        elif c == 0x0d:
            out += b"\\r"
        elif c == 0x0a:
            out += b"\\n"
        else:
            out.append(c)
    out += b")"
    return bytes(out)

def serialize(v, remap=None):
    """remap: dict old_num -> new_num for PdfRef renumbering during write."""
    if v is None:
        return b"null"
    if v is True:
        return b"true"
    if v is False:
        return b"false"
    if isinstance(v, PdfRef):
        n = remap[v.num] if remap and v.num in remap else v.num
        return f"{n} 0 R".encode()
    if isinstance(v, PdfName):
        return esc_name(str(v)).encode("latin-1")
    if isinstance(v, bytes):
        return esc_litstring(v)
    if isinstance(v, float):
        return repr(v).encode()
    if isinstance(v, int):
        return str(v).encode()
    if isinstance(v, list):
        return b"[" + b" ".join(serialize(x, remap) for x in v) + b"]"
    if isinstance(v, dict):
        parts = [b"<<"]
        for k, val in v.items():
            parts.append(esc_name(k).encode("latin-1"))
            parts.append(serialize(val, remap))
        parts.append(b">>")
        return b" ".join(parts)
    if isinstance(v, PdfStream):
        dct = dict(v.dict)
        dct["Length"] = len(v.raw)
        head = serialize(dct, remap)
        return head + b"\nstream\n" + v.raw + b"\nendstream"
    raise TypeError(f"cannot serialize {type(v)}: {v!r}")
