# GazLab 10 — Gazlar Teması Sanal Laboratuvarı

10. Sınıf Kimya, **Gazlar** teması (T.C. Türkiye Yüzyılı Maarif Modeli) için geliştirilmiş,
üç boyutlu (Three.js) etkileşimli bir sanal laboratuvar. Bağımlılıksız, saf HTML/CSS/JS —
derleme (build) adımı gerektirmez; herhangi bir statik dosya sunucusuyla veya GitHub Pages
ile doğrudan yayınlanabilir.

## Neden bu proje

Kaynak müfredat belgesindeki "Etkileşim" temasının **yalnızca gazlarla ilgili** kısmı
kullanılmıştır — Kimyasal Tepkimeler bölümü (mol, tepkime denklemleri, stokiyometri, tepkime
türleri) bilinçli olarak kapsam dışı bırakılmıştır. İçerik şu dört kazanımla sınırlıdır:

| Kod | Kazanım (özet) | Modül |
|---|---|---|
| KİM.10.1.8 | Gazların özelliklerine (hacim, basınç, genleşme, sıkıştırılabilirlik, karışabilirlik, yoğunluk) ilişkin bilimsel gözlem; tanecikli modelle açıklama | Modül 1 |
| KİM.10.1.9 | P, V, T, n arasındaki ilişkileri bilimsel sorgulama; grafik/matematiksel model önerme; kinetik moleküler teoriyle değerlendirme | Modül 2 |
| KİM.10.1.10 | Boyle, Charles, Avogadro yasaları arasında örüntü oluşturarak ideal gaz denklemini tümevarımsal akıl yürütmeyle oluşturma | Modül 3 (+ Serbest Mod) |
| KİM.10.1.11 | Efüzyon ve difüzyona ilişkin deney tasarlama; sonuçları günlük hayatla ilişkilendirme | Modül 4 |

Kullanılan anahtar kavramlar da aynı şekilde sınırlıdır: **gaz basıncı, hacim, ideal gaz,
mutlak sıcaklık, standart-normal şartlar, difüzyon, efüzyon, mol.** Tepkimeye özgü kavramlar
(asit-baz tepkimesi, çökelme, redoks, sınırlayıcı bileşen, yüzde verim…) kullanılmamıştır.

## Yapı

```
index.html                          Ana sayfa: tema tanıtımı, kazanım özeti, sözlük, modül kartları
moduller/
  01-kmt.html                       Gazların Özellikleri & Kinetik Moleküler Teori
  02-gaz-yasalari.html              Boyle · Charles · Gay-Lussac · Avogadro (sekmeli)
  03-ideal-gaz.html                 PV=nRT — P/V/T/n kilit paneli + R sabitini keşfetme + ★ Serbest Mod (iki gazlı sandbox)
  04-difuzyon-efuzyon.html          Graham Yasası — difüzyon ve efüzyon "yarışları"
assets/
  vendor/three/                     Yerel olarak vendor edilmiş Three.js (CDN bağımlılığı yok)
  css/style.css                     Ortak tasarım sistemi
  js/gas-engine.js                  3B "kap + piston + tanecik" fizik/render motoru (GasBox) — kamera kuruluşta bir kez konumlanır, bir daha taşınmaz
  js/charts.js                      Bağımlılıksız canvas grafik yardımcıları (iz grafiği, yarış çubuğu)
  js/quiz-engine.js                 Bağlam temelli soru render motoru + ilerleme (localStorage)
  js/quiz-data.js                   Modül başına 6 bağlam temelli değerlendirme sorusu
  js/nav.js                         Paylaşılan üst menü / altbilgi enjeksiyonu
```

## Tasarım ilkeleri

- **Üç boyutlu, mekanik kaplar.** Her deney, sabit bir sol duvarı (silindir tabanı) ve
  sürüklenebilir bir piston/pistonu olan gerçekçi bir kap üzerinde kurulur. Taneciklerin
  duvarlarla esnek çarpışması ve birbirleriyle basit esnek çarpışması gerçek zamanlı olarak
  hesaplanır.
- **Kararlı kamera.** Kamera her sahnede kuruluşta bir kez, o sahnenin görebileceği en büyük
  hacme göre konumlanır ve bir daha asla programatik olarak taşınmaz/yeniden ölçeklenmez —
  kap yalnızca sabit sol duvardan sağa büyür, bu yüzden hiçbir hacimde kadraj dışına çıkmaz.
- **Sadelik önce.** Basınç, sensör gürültüsünden değil doğrudan `P = nRT/V` (R ≈ 0,0821
  L·atm/(mol·K)) eşitliğinden hesaplanır. 3B sahne bu değeri niteliksel olarak (hız, yoğunluk,
  çarpışma sıklığı) görselleştirir; sayısal doğruluk ile görsel sezgi birbiriyle çelişmez.
- **Ölçek şeffaflığı.** Gerçek bir gaz örneğindeki tanecik sayısı Avogadro sayısı
  (6,02×10²³) mertebesindedir; simülasyonda kavramsal netlik için 1 mol ≈ 12 görsel tanecik
  ölçeği kullanılır; oranlar ve eğilimler gerçek gaz davranışıyla birebir uyumludur, sadece
  nokta sayısı ölçeklenmiştir. Bu, her modülde bir "Model Notu" ile açıkça belirtilir.
- **Bağlam temelli değerlendirme.** Her modülün soruları (toplam 24) günlük hayattan bir
  durumla başlar (dalgıç tüpü, araba lastiği, sıcak hava balonu, dalış tüpü…) ve kazanımın
  ilgili alt bileşeniyle doğrudan eşleşir.
- **Keşif önce, formül sonra.** Her modülde bir "Keşfet" bölümü — açık uçlu görevler ve
  otomatik kaydedilen bir "Keşif Günlüğü" (localStorage) — öğrenciyi örüntüyü kendi
  verileriyle bulmaya yönlendirir; kazanımların "tümevarımsal/tümdengelimsel akıl yürütme"
  vurgusuyla örtüşür.

## Yerel çalıştırma

Derleme adımı yoktur. Herhangi bir statik sunucu yeterlidir:

```bash
python3 -m http.server 8000
# veya: npx serve .
```

Ardından `http://localhost:8000/index.html` adresini açın. Three.js `assets/vendor/three/`
altında yerel olarak paylaşılır (import map ile); internet bağlantısı ya da CDN gerekmez —
okul ağlarında CDN engellense bile çalışır.

## Çevrimdışı kullanım (akıllı tahta / internetsiz sınıf)

Ana sayfadaki **💾 Çevrimdışı Sürüm (ZIP)** düğmesiyle `GazLab10-Cevrimdisi.zip` indirilebilir.
Bu paket, tüm ES module `import`/`export` ifadelerini tek bir klasik (non-module) script'e
derler; böylece bir klasöre çıkarıldığında **sunucu kurmadan**, `offline/index.html` dosyasına
çift tıklayarak (`file://`) doğrudan açılır — internet bağlantısı hiç gerekmez.

Kaynak site (`index.html`, `moduller/`, `assets/`) değiştiğinde çevrimdışı paketi yeniden
üretmek için:

```bash
node tools/build-offline.js   # offline/ klasörünü yeniden oluşturur
zip -r -X GazLab10-Cevrimdisi.zip offline/
```

`tools/build-offline.js`, her JS dosyasını kendi izole kapsamında (IIFE) sarıp bağımlılıkları
parametre olarak geçirir — gerçek ES module kapsamını taklit eder, bu yüzden örn. Three.js ile
OrbitControls içindeki aynı isimli iç değişkenler (`_ray` gibi) çakışmaz.

## Tarayıcı desteği

ES modülleri, import map ve `ResizeObserver` kullanan modern bir tarayıcı (Chrome, Edge,
Firefox, Safari — güncel sürümler) gerekir.
