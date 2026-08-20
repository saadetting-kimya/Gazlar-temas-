#!/usr/bin/env python3
"""
Ders Defteri'nin sorular bölümlerine, kitap-ek/unite-ek.html'den üretilen
üniteye özel ek soru sayfalarını doğrudan yerleştirir (Acrobat/pypdf gibi
bir araç olmadan, saf Python ile — bkz. pdf_lib.py).

Kullanım:
  1. Her ünite için kitap-ek/uretilen/Unite-N-Ek.pdf dosyalarını üret
     (Playwright ile ../kitap-ek/unite-ek.html?unit=<key> sayfasını A4
     PDF'e bas — bkz. proje geçmişindeki test scriptleri).
  2. Ders Defteri PDF'inde her ünitenin "Sorular" bölümünün BİTTİĞİ sayfa
     numarasını (1-indeksli, tam PDF içindeki gerçek sayfa no) Chromium'da
     açıp elle bul (bu depoda otomatik PDF sayfa render aracı yok).
  3. Aşağıdaki INSERTS listesini güncelle, betiği çalıştır.

ÖNEMLİ: Bu betik idempotent DEĞİLDİR — zaten birleştirilmiş bir PDF'e
tekrar çalıştırmak sayfa numaralarını kaydırıp yanlış yere ekleme yapar.
Yeni bir ekleme turu için INSERTS'teki sayfa numaralarını PDF'in GÜNCEL
hâline göre yeniden tespit et.
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from pdf_lib import PDF, PdfRef, PdfStream, serialize

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEFTER_PATH = os.path.join(ROOT, "Gazlar Ders Defteri.pdf")
OUT_PATH = DEFTER_PATH  # yerinde günceller; çağıran taraf önceden yedek almalı

# (kitap-ek/uretilen/Unite-N-Ek.pdf yolu, bu sayfadan SONRA eklenecek doc-order sayfa no)
#
# ÖNEMLİ SIRALAMA NOTU: leaf_lookup aşağıda TEK SEFER, betiğin başında
# hesaplanır ve tüm INSERTS için aynı (değişmeyen) index'leri kullanır. Eğer
# iki INSERT aynı /Pages ebeveynine düşüyorsa (bu kitapta örn. Ünite 1 ve
# Ünite 2 sayfaları aynı ebeveyni paylaşıyor), listedeki sayfa numaraları
# büyükten küçüğe sıralanmalıdır — aksi hâlde önce yapılan bir ekleme, aynı
# ebeveyndeki SONRAKİ (ama sayı olarak küçük, listede sonra gelen) bir
# INSERT'in index'ini kaydırıp yanlış yere ekleme yapar. Büyükten küçüğe
# sıralamada daha büyük index'e yapılan ekleme, daha küçük index'i hiç
# etkilemez.
INSERTS = [
    (os.path.join(ROOT, "kitap-ek/uretilen/Unite-4-Ek-Yeni.pdf"), 31),
    (os.path.join(ROOT, "kitap-ek/uretilen/Unite-3-Ek-Yeni.pdf"), 24),
    (os.path.join(ROOT, "kitap-ek/uretilen/Unite-2-Ek-Yeni.pdf"), 17),
    (os.path.join(ROOT, "kitap-ek/uretilen/Unite-1-Ek-Yeni.pdf"), 10),
]


def load(path):
    return PDF(open(path, "rb").read())


def flatten_pages(pdf, pages_root_ref):
    """Sayfa ağacını (iç içe /Pages düğümleri olabilir) belge sırasına göre
    düzleştirir: [(yaprak_sayfa_no, ebeveyn_no, ebeveynin_Kids_dizisindeki_index), ...]"""
    leaves = []
    def walk(node_ref):
        node = pdf.resolve(node_ref)
        kids = pdf.resolve(node["Kids"])
        for i, kref in enumerate(kids):
            kd = pdf.resolve(kref)
            if str(kd.get("Type")) == "Page":
                leaves.append((kref.num, node_ref.num, i))
            else:
                walk(kref)
    walk(pages_root_ref)
    return leaves


def iter_refs(v):
    if isinstance(v, PdfRef):
        yield v
    elif isinstance(v, dict):
        for x in v.values():
            yield from iter_refs(x)
    elif isinstance(v, list):
        for x in v:
            yield from iter_refs(x)
    elif isinstance(v, PdfStream):
        for x in v.dict.values():
            yield from iter_refs(x)


def collect_reachable(pdf, start_nums):
    """Kök(ler)den erişilebilen tüm nesneleri toplar — ObjStm/XRef gibi
    idari nesneler hiçbir gerçek içerikten referans edilmediği için
    kendiliğinden dışarıda kalır."""
    visited = {}
    stack = list(start_nums)
    seen = set(start_nums)
    while stack:
        num = stack.pop()
        val = pdf.get(num)
        visited[num] = val
        for ref in iter_refs(val):
            if ref.num not in seen:
                seen.add(ref.num)
                stack.append(ref.num)
    return visited


def remap_value(v, remap):
    if isinstance(v, PdfRef):
        return PdfRef(remap.get(v.num, v.num), 0)
    if isinstance(v, dict):
        return {k: remap_value(x, remap) for k, x in v.items()}
    if isinstance(v, list):
        return [remap_value(x, remap) for x in v]
    if isinstance(v, PdfStream):
        return PdfStream(remap_value(v.dict, remap), v.raw)
    return v


def write_pdf(objects, root_num, info_ref, out_path):
    max_num = max(objects.keys())
    parts = [b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n"]
    offsets = {}
    pos = len(parts[0])
    for num in sorted(objects.keys()):
        chunk = f"{num} 0 obj\n".encode() + serialize(objects[num]) + b"\nendobj\n"
        offsets[num] = pos
        parts.append(chunk)
        pos += len(chunk)
    xref_offset = pos
    xref = [f"xref\n0 {max_num + 1}\n".encode(), b"0000000000 65535 f \n"]
    for num in range(1, max_num + 1):
        xref.append((f"{offsets[num]:010d} 00000 n \n" if num in offsets else "0000000000 65535 f \n").encode())
    trailer = {"Size": max_num + 1, "Root": PdfRef(root_num, 0)}
    if isinstance(info_ref, PdfRef):
        trailer["Info"] = info_ref
    tail = b"trailer\n" + serialize(trailer) + f"\nstartxref\n{xref_offset}\n%%EOF".encode()
    with open(out_path, "wb") as f:
        for p in parts: f.write(p)
        for l in xref: f.write(l)
        f.write(tail)


def main():
    defter = load(DEFTER_PATH)
    droot = defter.resolve(defter.trailer["Root"])
    dpages_ref = droot["Pages"]
    dleaves = flatten_pages(defter, dpages_ref)
    print(f"[defter] {len(dleaves)} sayfa bulundu")

    start = [defter.trailer["Root"].num]
    if isinstance(defter.trailer.get("Info"), PdfRef):
        start.append(defter.trailer["Info"].num)
    d_objects = collect_reachable(defter, start)
    next_num = max(d_objects.keys()) + 1

    leaf_lookup = {i + 1: (p, idx) for i, (_, p, idx) in enumerate(dleaves)}
    parent_objs = {}
    total_inserted = 0

    for ins_path, after_page in INSERTS:
        b = load(ins_path)
        broot = b.resolve(b.trailer["Root"])
        bleaves = flatten_pages(b, broot["Pages"])
        b_objects = collect_reachable(b, [b.trailer["Root"].num])
        print(f"[{os.path.basename(ins_path)}] {len(bleaves)} sayfa, {len(b_objects)} nesne")

        remap = {}
        for old_num in b_objects:
            remap[old_num] = next_num
            next_num += 1

        parent_num, idx_in_parent = leaf_lookup[after_page]
        parent_objs.setdefault(parent_num, d_objects[parent_num])
        parent_dict = parent_objs[parent_num]
        kids_list = parent_dict["Kids"]

        new_refs = [PdfRef(remap[leaf_num], 0) for leaf_num, _, _ in bleaves]
        insert_at = idx_in_parent + 1
        for offset, r in enumerate(new_refs):
            kids_list.insert(insert_at + offset, r)
        parent_dict["Count"] = parent_dict.get("Count", len(kids_list)) + len(new_refs)

        for old_num, val in b_objects.items():
            d_objects[remap[old_num]] = remap_value(val, remap)
        for leaf_num, _, _ in bleaves:
            d_objects[remap[leaf_num]]["Parent"] = PdfRef(parent_num, 0)

        total_inserted += len(new_refs)
        print(f"  -> ebeveyn {parent_num}, kids-index {insert_at}'e {len(new_refs)} sayfa eklendi")

    d_objects[dpages_ref.num]["Count"] += total_inserted

    write_pdf(d_objects, defter.trailer["Root"].num, defter.trailer.get("Info"), OUT_PATH)
    print("yazıldı:", OUT_PATH, f"(+{total_inserted} sayfa)")


if __name__ == "__main__":
    main()
