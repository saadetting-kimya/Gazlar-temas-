/* =========================================================
   GazLab 10 — quiz-data.js
   Bağlam temelli değerlendirme soruları (yalnızca paylaşılan
   kazanımlar/kavramlarla sınırlıdır: KİM.10.1.8 – 1.11 ve
   ilgili anahtar kavramlar).
   ========================================================= */

export const QUIZ = {
  kmt: [
    {
      context: "Dalgıç Tüpü",
      text: "Bir dalgıç tüpüne sıkıştırılmış hava doldurulduğunda normalden çok daha fazla molekül sığdırılabilir; aynı tüpe sıkıştırılmış su doldurmak ise neredeyse imkânsızdır. Bu farkın temel nedeni nedir?",
      options: [
        "Suyun tanecikleri arasında boşluk neredeyse yoktur, gazın taneciklerinin arasında ise büyük boşluklar vardır",
        "Su molekülleri gaz moleküllerinden daha küçüktür",
        "Gaz molekülleri elektrikçe yüklüdür, su molekülleri yüksüzdür",
        "Su, tüp içinde daha hızlı ısınır",
      ],
      correct: 0,
      explain: "Gazların sıkıştırılabilir olmasının nedeni tanecikler arasındaki büyük boşluklardır (KMT varsayımı).",
    },
    {
      context: "Parfüm",
      text: "Kapalı bir odanın bir köşesinde açılan parfüm şişesinin kokusu bir süre sonra odanın her yerinde hissedilir. Bu gözlem gazların hangi özelliğiyle doğrudan açıklanır?",
      options: ["Yoğunluk", "Karışabilirlik", "Genleşme", "Basınç"],
      correct: 1,
      explain: "Gazlar birbiri içinde kendiliğinden her oranda karışır; bu özellik 'karışabilirlik' olarak adlandırılır.",
    },
    {
      context: "Sıcak Hava Balonu",
      text: "Sıcak hava balonunun altındaki brülör havayı ısıtır ve balon şişerek yukarı kalkar. Balonun şişmesi gazların hangi özelliğinin bir sonucudur?",
      options: ["Yoğunluk", "Sıkıştırılabilirlik", "Genleşme", "Karışabilirlik"],
      correct: 2,
      explain: "Sıcaklık artınca tanecikler daha hızlı hareket eder, birbirinden uzaklaşır ve gaz genleşir.",
    },
    {
      context: "O2 – H2 Karşılaştırması",
      text: "Aynı sıcaklıkta, aynı hacimdeki iki ayrı kapta bulunan 1 mol O2 gazı ile 1 mol H2 gazı için aşağıdakilerden hangisi YANLIŞTIR?",
      options: [
        "İki gazın basıncı birbirine eşittir",
        "İki gazın ortalama kinetik enerjisi birbirine eşittir",
        "H2 taneciklerinin ortalama hızı O2'den büyüktür",
        "İki kaptaki tanecik sayısı birbirinden farklıdır",
      ],
      correct: 3,
      explain: "Aynı mol sayısı, aynı tanecik sayısı demektir (Avogadro ilkesi); bu nedenle D seçeneği yanlıştır.",
    },
    {
      context: "Basınçlı Tencere",
      text: "Basınçlı bir tencerede pişirme sırasında tencere içindeki gaz taneciklerinin kapağa ve sıvı yüzeyine sürekli çarpması neyi oluşturur?",
      options: ["Gazın rengini", "Gaz basıncını", "Gazın kütlesini", "Gazın mol kütlesini"],
      correct: 1,
      explain: "Gaz basıncı, taneciklerin yüzeye yaptığı çarpışmaların birim alandaki etkisiyle oluşur.",
    },
    {
      context: "Balon Yarışı",
      text: "Aynı sıcaklık ve basınçta CO2 dolu bir balon havada aşağı batarken He dolu bir balon yukarı çıkar. Bu fark gazların hangi özelliğiyle açıklanır?",
      options: ["Yoğunluk", "Sıkıştırılabilirlik", "Genleşme", "Karışabilirlik"],
      correct: 0,
      explain: "Farklı mol kütleleri, birim hacimdeki kütleyi (yoğunluğu) değiştirir; havadan yoğun CO2 batar, havadan az yoğun He yükselir.",
    },
  ],

  yasalar: [
    {
      context: "Cips Paketi",
      text: "Deniz seviyesinde sıkıca kapatılmış bir cips paketi, yüksek bir dağa çıkarıldığında şişerek gerilir. Sıcaklık sabit kabul edilirse, dış basınç azalırken paket içindeki gazın hacmi neden artar?",
      options: [
        "Boyle Yasası'na göre sabit sıcaklıkta basınç azalınca hacim artar",
        "Charles Yasası'na göre sabit basınçta sıcaklık azalınca hacim artar",
        "Avogadro Yasası'na göre mol sayısı azalınca hacim artar",
        "Gay-Lussac Yasası'na göre sabit hacimde basınç azalınca sıcaklık artar",
      ],
      correct: 0,
      explain: "Sabit sıcaklıkta P·V = sabit (Boyle); dış basınç azalınca paket içi gaz genişler.",
    },
    {
      context: "Dondurucudaki Balon",
      text: "Oda sıcaklığında şişirilmiş bir balon dondurucuya konursa küçülür. Bu gözlem hangi gaz yasasıyla açıklanır?",
      options: ["Charles Yasası", "Boyle Yasası", "Gay-Lussac Yasası", "Avogadro Yasası"],
      correct: 0,
      explain: "Sabit basınçta V, T ile doğru orantılıdır (Charles); sıcaklık düşünce hacim küçülür.",
    },
    {
      context: "Güneşteki Lastik",
      text: "Güneş altında bekleyen bir araba lastiğinin iç basıncı zamanla artar; lastiğin hacmi (sert gövdesi nedeniyle) neredeyse sabit kalır. Bu durum hangi yasayla ve nasıl açıklanır?",
      options: [
        "Gay-Lussac Yasası; sabit hacimde sıcaklık artınca tanecik hızları ve çarpışma sıklığı artar, basınç yükselir",
        "Boyle Yasası; hacim azaldığı için basınç artar",
        "Charles Yasası; hacim arttığı için basınç artar",
        "Avogadro Yasası; mol sayısı arttığı için basınç artar",
      ],
      correct: 0,
      explain: "Sabit hacimde P, T ile doğru orantılıdır (Gay-Lussac); bu ilişki KMT ile çarpışma sıklığı üzerinden açıklanır.",
    },
    {
      context: "Balona Üfleme",
      text: "Sabit sıcaklık ve basınçta bir balona üflemeye devam ettikçe balonun hacmi büyür. Bu durum hangi ilişkiyi doğrudan gösterir?",
      options: [
        "V ile n doğru orantılıdır (Avogadro Yasası)",
        "V ile T doğru orantılıdır",
        "V ile P ters orantılıdır",
        "P ile T doğru orantılıdır",
      ],
      correct: 0,
      explain: "Sabit P ve T'de hacim, mol sayısı ile doğru orantılı artar.",
    },
    {
      context: "Grafik Yorumlama",
      text: "Bir öğrenci sabit sıcaklıkta bir gazın basıncını değiştirip hacmini ölçüyor; P'ye karşı V grafiği bir hiperbol (ters orantı eğrisi) çıkıyor. Öğrenci P yerine 1/P değerlerini kullanıp grafiği yeniden çizerse nasıl bir grafik elde eder?",
      options: [
        "Orijinden geçen bir doğru",
        "Bir parabol",
        "Yatay bir doğru",
        "Yine bir hiperbol",
      ],
      correct: 0,
      explain: "V = k·(1/P) doğrusal bir ilişkidir; 1/P eksenine karşı çizilen V, orijinden geçen bir doğru verir.",
    },
    {
      context: "Kabaran Hamur",
      text: "Kabaran bir hamurun içindeki CO2 kabarcıkları fırında pişerken hem sıcaklık artışından hem de mayalanmayla üretilen ek CO2'den etkilenerek büyür. Bu durumu en uygun açıklayan seçenek hangisidir?",
      options: [
        "Sadece Charles Yasası geçerlidir, mol sayısının etkisi yoktur",
        "Hem sıcaklık artışı (Charles) hem üretilen ek CO2 (Avogadro) hacmi birlikte artırır",
        "Sadece Avogadro Yasası geçerlidir, sıcaklığın etkisi yoktur",
        "Boyle Yasası gereği hacim azalır",
      ],
      correct: 1,
      explain: "Gerçek olaylarda birden çok değişken birlikte değişebilir; bu da ideal gaz denklemine duyulan ihtiyacı doğurur.",
    },
  ],

  ideal: [
    {
      context: "Laboratuvar Ölçümü",
      text: "Sabit mol sayısına sahip bir gazın basıncı 2 katına, hacmi de 3 katına çıkarılıyor. İdeal gaz denklemine göre gazın mutlak sıcaklığı ne olur?",
      options: ["6 katına çıkar", "1,5 katına çıkar", "Değişmez", "Yarıya iner"],
      correct: 0,
      explain: "PV = nRT ⇒ sabit n'de (P₂V₂)/(P₁V₁) = T₂/T₁ = 2×3 = 6.",
    },
    {
      context: "Standart-Normal Şartlar",
      text: "'Standart-normal şartlar (NŞ)' ifadesi bir gaz örneği için hangi iki değişkenin belirli referans değerlerde sabitlendiği anlamına gelir?",
      options: ["Basınç ve sıcaklık", "Hacim ve mol sayısı", "Basınç ve hacim", "Sıcaklık ve mol sayısı"],
      correct: 0,
      explain: "NŞ, referans bir basınç ve sıcaklık koşuludur (yaklaşık 1 atm, 273 K); bu koşulda 1 mol ideal gaz sabit bir hacim kaplar.",
    },
    {
      context: "Genleşen Gaz",
      text: "Sabit sıcaklık ve mol sayısında, 2 atm basınçta 5 L hacim kaplayan bir gaz örneği 1 atm'ye kadar genişletiliyor. Yeni hacim kaç litre olur?",
      options: ["10 L", "2,5 L", "5 L", "20 L"],
      correct: 0,
      explain: "Sabit n, T'de P₁V₁ = P₂V₂ ⇒ 2×5 = 1×V₂ ⇒ V₂ = 10 L.",
    },
    {
      context: "Sabiti Keşfetmek",
      text: "Bir öğrenci sabit n ve T'de farklı P değerleri için V ölçüyor ve her defasında P×V çarpımını hesaplıyor. Çarpımın her seferinde neredeyse aynı sayıya eşit çıktığını görüyor. Bu sabit sayı neyi temsil eder?",
      options: ["nRT çarpımını", "Yalnızca R sabitini", "Yalnızca n'i", "Yalnızca T'yi"],
      correct: 0,
      explain: "Sabit n ve T'de PV = nRT sabittir; bu tam olarak ideal gaz denklemini tümevarımsal keşfetme sürecidir.",
    },
    {
      context: "He ve Ar Karşılaştırması",
      text: "Aynı sıcaklık ve basınçta bulunan 1 mol He gazı ile 1 mol Ar gazı için ideal gaz denklemine göre aşağıdakilerden hangisi söylenebilir?",
      options: [
        "Her ikisinin hacmi birbirine eşittir; ideal gaz denklemi gaz türünden bağımsızdır",
        "Ar'ın hacmi daha büyüktür çünkü tanecikleri daha ağırdır",
        "He'nin hacmi daha büyüktür çünkü tanecikleri daha hafiftir",
        "Hacimleri karşılaştırılamaz",
      ],
      correct: 0,
      explain: "PV = nRT ifadesinde molar kütle yer almaz; aynı n, P, T'de tüm ideal gazlar aynı hacmi kaplar.",
    },
    {
      context: "Kapalı Tüp",
      text: "Kapalı bir tüpte n ve V sabit tutulurken sıcaklık 2 katına çıkarılıyor. Basınç nasıl değişir?",
      options: ["2 katına çıkar", "Yarıya iner", "Değişmez", "4 katına çıkar"],
      correct: 0,
      explain: "Sabit n, V'de P, T ile doğru orantılıdır (PV = nRT'nin özel bir durumu).",
    },
  ],

  difuzyon: [
    {
      context: "Araba Lastiği",
      text: "Bir araba lastiğinin içindeki hava, haftalar içinde yavaşça azalır ve lastik basıncı düşer; lastik gövdesinde görünür bir delik yoktur. Bu yavaş kaçış hangi olayla açıklanır?",
      options: ["Efüzyon", "Difüzyon", "Yoğunlaşma", "Genleşme"],
      correct: 0,
      explain: "Gaz taneciklerinin küçük gözeneklerden tek tek kaçışı efüzyon olarak adlandırılır.",
    },
    {
      context: "Parfüm Kokusu",
      text: "Oda içinde açılan bir parfüm şişesinin kokusunun havada dağılıp odanın her yanına yayılması hangi olayla açıklanır?",
      options: [
        "Difüzyon; bir gazın başka bir gaz (hava) içine kendiliğinden yayılması",
        "Efüzyon; gazın boşluğa yayılması",
        "Difüzyon; yalnızca boşlukta gerçekleşen bir olay",
        "Efüzyon; yalnızca sıvı içinde gerçekleşen bir olay",
      ],
      correct: 0,
      explain: "Bir gazın başka bir gaz ortamı içine kendiliğinden yayılması difüzyon olarak tanımlanır.",
    },
    {
      context: "He – CH4 Efüzyon Yarışı",
      text: "Aynı sıcaklıkta, mol kütlesi 4 g/mol olan He gazı ile mol kütlesi 16 g/mol olan CH4 gazı aynı küçük delikten efüzyona uğruyor. Graham Yasası'na göre He'nin efüzyon hızının CH4'e oranı (r_He / r_CH4) kaçtır?",
      options: ["2", "4", "0,5", "8"],
      correct: 0,
      explain: "r₁/r₂ = √(M₂/M₁) = √(16/4) = √4 = 2.",
    },
    {
      context: "NH3 – HCl Klasik Deneyi",
      text: "Bir cam borunun bir ucundan NH3 (M ≈ 17 g/mol), diğer ucundan HCl (M ≈ 36,5 g/mol) gazı aynı anda serbest bırakılırsa, iki gazın karşılaşıp beyaz duman (NH4Cl) oluşturduğu nokta borunun hangi ucuna daha yakın olur?",
      options: [
        "HCl'nin bırakıldığı uca, çünkü daha hafif olan NH3 daha hızlı difüze olur",
        "Tam ortada olur",
        "NH3'ün bırakıldığı uca, çünkü HCl daha hızlı difüze olur",
        "Belirlenemez",
      ],
      correct: 0,
      explain: "Mol kütlesi küçük olan NH3, Graham Yasası gereği daha hızlı difüze olduğundan daha uzun mesafe kat eder.",
    },
    {
      context: "Sıcaklığın Etkisi",
      text: "Aynı gaz için mol kütlesi sabitken sıcaklık artırılırsa efüzyon hızı nasıl değişir?",
      options: [
        "Artar; sıcaklık arttıkça ortalama tanecik hızı artar",
        "Azalır",
        "Değişmez",
        "Önce artar sonra azalır",
      ],
      correct: 0,
      explain: "Kinetik moleküler teoriye göre sıcaklık arttıkça taneciklerin ortalama hızı (dolayısıyla efüzyon hızı) artar.",
    },
    {
      context: "Dalış Tüpü",
      text: "Dalış tüplerinde kullanılan gaz karışımındaki helyumun (He), azota (N2) göre vücut dokularından çok daha hızlı difüze olup uzaklaşması hangi temel ilkeyle açıklanır?",
      options: [
        "Daha küçük mol kütlesine sahip gazların difüzyon hızı daha büyüktür (Graham Yasası)",
        "Helyum dokularla kimyasal tepkimeye girer",
        "Helyum sudan ağırdır",
        "Azotun mol kütlesi helyumdan küçüktür",
      ],
      correct: 0,
      explain: "He'nin mol kütlesi (4 g/mol) N2'ninkinden (28 g/mol) çok küçüktür; Graham Yasası'na göre difüzyon hızı mol kütlesiyle ters ilişkilidir.",
    },
  ],
};
