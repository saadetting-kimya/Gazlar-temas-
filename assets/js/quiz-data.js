/* =========================================================
   GazLab 10 — quiz-data.js
   Bağlam temelli, düşündüren değerlendirme soruları (yalnızca
   paylaşılan kazanımlar/kavramlarla sınırlıdır: KİM.10.1.8 – 1.11).
   ========================================================= */

export const QUIZ = {
  kmt: [
    {
      context: "Hidrolik Fren Sistemi",
      text: "Bir oto tamircisi, fren hattına hava kaçan bir arabada fren pedalının 'yumuşadığını' (süngerimsi bastığını) ve frenin zayıfladığını söylüyor. Hidrolik fren sıvısı neredeyse hiç sıkışmazken, hatta hapsolan küçük bir hava kabarcığı bu sorunu neden yaratır?",
      options: [
        "Hava, sıvıdan farklı olarak kolayca sıkıştığından, pedala uygulanan kuvvetin bir kısmı balonu sıkıştırmaya harcanır ve fren balatasına iletilmez",
        "Hava sıvıdan daha ağır olduğu için hatta birikip tıkanıklık yapar",
        "Hava, fren sıvısıyla tepkimeye girip sıvının kaynama noktasını düşürür",
        "Hava sıcaklığı düşürerek sıvının donmasına neden olur",
      ],
      correct: 0,
      explain: "Gazlar tanecikleri arasındaki büyük boşluk nedeniyle kolayca sıkışır; hapsolan hava kabarcığı basınç enerjisini emer ve fren gücü zayıflar. Sıvılar bu ölçüde sıkışmadığı için hidrolik sistemler güvenle sıvıyla çalışır.",
    },
    {
      context: "LPG mi, Doğal Gaz mı?",
      text: "Ev güvenliği eğitimlerinde LPG (M≈44 g/mol) sızıntısı olduğunda yere yakın alanların, doğal gaz (metan, M≈16 g/mol) sızıntısında ise tavana yakın alanların önce havalandırılması önerilir. Bu fark gazların hangi özelliğinden kaynaklanır?",
      options: ["Yoğunluk", "Sıkıştırılabilirlik", "Genleşme", "Karışabilirlik"],
      correct: 0,
      explain: "Aynı sıcaklık ve basınçta mol kütlesi büyük olan gaz (LPG) havadan yoğundur ve yere çöker; mol kütlesi küçük olan gaz (metan) havadan az yoğundur ve yükselir.",
    },
    {
      context: "Vakumlu Saklama Poşeti",
      text: "Bir vakumlu gıda saklama poşetinden pompayla hava çekildiğinde poşet küçülüp gıdaya sımsıkı yapışır; poşetin içindeki katı gıdanın boyutunda ise gözle görülür bir değişiklik olmaz. Bu karşılaştırma gazların hangi özelliğini en açık şekilde gösterir?",
      options: ["Sıkıştırılabilirlik", "Yoğunluk", "Karışabilirlik", "Basınç"],
      correct: 0,
      explain: "Poşetteki hava, tanecikler arası boşluk sayesinde kolayca sıkışıp hacmini küçültür; katı gıdadaki tanecikler zaten birbirine çok yakın olduğundan boyut neredeyse sabit kalır.",
    },
    {
      context: "Sıcak Hava Neden Yükselir?",
      text: "Bir ocağın üzerindeki sıcak hava görünmez şekilde yukarı doğru yükselir. Bu olayı KMT'ye dayanarak İKİ ADIMDA açıklayan seçenek hangisidir?",
      options: [
        "Sıcaklık artınca tanecikler hızlanıp birbirinden uzaklaşır (genleşme) → aynı kütle daha büyük hacme yayılınca yoğunluk azalır ve hava yükselir",
        "Sıcaklık artınca tanecik sayısı artar → daha fazla tanecik daha hafif olur",
        "Sıcaklık artınca tanecikler küçülür → hava hafifler",
        "Sıcaklık artınca hava rengi değişir → ışığı daha az yansıtır",
      ],
      correct: 0,
      explain: "Genleşme ve yoğunluk birbirine bağlı iki kavramdır: sıcaklık artışı önce hacmi büyütür (genleşme), aynı kütlenin daha büyük hacme yayılması ise yoğunluğu azaltır.",
    },
    {
      context: "Aseton Kokusu",
      text: "Kapalı bir sınıfta bir öğrenci oje çıkarıcı (aseton) şişesinin kapağını açtığında, koku birkaç dakika içinde sınıfın en uzak köşesine kadar ulaşır — ama masaya damlayan sıvı aseton, masadan aşağı akmadan kendiliğinden yayılmaz. Gaz hâlindeki asetonun bu şekilde yayılmasına ne denir?",
      options: ["Karışabilirlik", "Yoğunluk", "Sıkıştırılabilirlik", "Basınç"],
      correct: 0,
      explain: "Gaz taneciklerinin bulundukları ortamla kendiliğinden, her yöne homojen şekilde karışması karışabilirlik olarak adlandırılır; bu, sıvıların yüzey gerilimiyle sınırlı yayılmasından çok farklıdır.",
    },
    {
      context: "Yoğunluk Gazı Ele Verir mi?",
      text: "Bir öğrenci 'bir gazın yoğunluğunu ölçersem hangi gaz olduğunu her zaman kesin olarak anlarım, çünkü her gazın kendine özgü sabit bir yoğunluğu vardır' diyor. Bu ifade neden sorunludur?",
      options: [
        "Gazın hacmi sıcaklık ve basınca göre değiştiği için yoğunluğu da değişir; yoğunluk gazlar için sabit/ayırt edici bir özellik değildir",
        "Gazların yoğunluğu yoktur, yalnızca katı ve sıvıların yoğunluğu ölçülebilir",
        "Yoğunluk yalnızca renkli gazlarda ölçülebilir",
        "İfade tamamen doğrudur, itiraz edilecek bir nokta yoktur",
      ],
      correct: 0,
      explain: "Gazların hacmi koşullara (sıcaklık, basınç) bağlı olarak kolayca değiştiğinden aynı gazın yoğunluğu da değişir. Bu yüzden yoğunluk, katılardaki gibi gazlar için sabit/ayırt edici bir özellik olarak kullanılamaz.",
    },
  ],

  yasalar: [
    {
      context: "Dalgıç Eğitiminin Altın Kuralı",
      text: "Dalış eğitmenleri öğrencilerine 'su yüzeyine çıkarken asla nefesini tutma, sürekli nefes ver' der. Bir dalgıç, akciğerlerinde hapsettiği havayla derinden hızla yüzeye çıkarsa, sabit sıcaklıkta ne olur ve bu neden tehlikelidir?",
      options: [
        "Boyle Yasası'na göre dış basınç azaldıkça hapsolan havanın hacmi artar; akciğerlerde aşırı genleşme yaralanmaya (barotravmaya) yol açabilir",
        "Charles Yasası'na göre su sıcaklığı düştüğü için hava hacmi küçülür, tehlike oluşmaz",
        "Avogadro Yasası'na göre akciğerdeki mol sayısı azalır, hacim küçülür",
        "Gay-Lussac Yasası'na göre sabit hacimde basınç artar, hacim değişmez",
      ],
      correct: 0,
      explain: "Sabit sıcaklıkta P·V=sabit (Boyle). Yüzeye çıkarken dış su basıncı azalır; nefes tutulursa akciğerdeki hava genleşmeye devam eder ve zarar verebilir. Bu yüzden dalgıçlar sürekli nefes vererek fazla havanın çıkmasına izin verir.",
    },
    {
      context: "Fırındaki Şişen Poşet",
      text: "Bir fırıncı, içine bir miktar hava hapsedilmiş esnek bir plastik poşeti sıcak fırına koyduğunda poşetin belirgin şekilde şiştiğini gözlemliyor (poşet esnek olduğu için iç basınç dış atmosfer basıncına eşit kalıyor). Bu gözlem hangi yasayla açıklanır?",
      options: ["Charles Yasası", "Boyle Yasası", "Gay-Lussac Yasası", "Avogadro Yasası"],
      correct: 0,
      explain: "Sabit basınçta hacim, mutlak sıcaklıkla doğru orantılıdır (Charles); poşet esnek olduğundan basınç sabit kalır, sıcaklık artınca hacim büyür.",
    },
    {
      context: "Lastik Basıncı Uyarı Lambası",
      text: "Modern arabalarda kışın soğuk havalarda sık sık yanan, yaz gelince kendiliğinden sönen bir 'düşük lastik basıncı' uyarı lambası vardır — oysa sürücü lastiğe hiç hava eklemedi/çıkarmadı. Lastiğin hacmi (sert gövdesi nedeniyle) sabit kabul edilirse bu değişim hangi yasayla açıklanır?",
      options: [
        "Gay-Lussac Yasası; sabit hacimde sıcaklık düşünce taneciklerin çarpma sıklığı azalır, basınç düşer",
        "Boyle Yasası; hacim küçüldüğü için basınç düşer",
        "Charles Yasası; hacim arttığı için basınç düşer",
        "Avogadro Yasası; mol sayısı azaldığı için basınç düşer",
      ],
      correct: 0,
      explain: "Sabit hacimde basınç, mutlak sıcaklıkla doğru orantılıdır (Gay-Lussac). Kışın düşen sıcaklık çarpışma sıklığını azaltır, basınç düşer ve lamba yanar; yazın sıcaklık artınca basınç kendiliğinden normale döner.",
    },
    {
      context: "Şişme Oyun Kalesi",
      text: "Bir çocuk parkındaki şişme oyun kalesi, sürekli çalışan bir fan ile şişirilir; fazla hava kenarlardaki küçük boşluklardan sürekli kaçtığı için iç basınç neredeyse sabit kalır. Fan daha güçlü çalışıp daha fazla hava pompaladığında kalenin hacmi büyür. Bu, hangi ilişkiyi doğrudan gösterir?",
      options: [
        "V ile n doğru orantılıdır (Avogadro Yasası)",
        "V ile T doğru orantılıdır",
        "V ile P ters orantılıdır",
        "P ile T doğru orantılıdır",
      ],
      correct: 0,
      explain: "Sabit P ve T'de hacim, kaptaki (buradaki 'kap' esnek kale) mol sayısıyla doğru orantılı artar — Avogadro Yasası.",
    },
    {
      context: "İki Öğrenci Tartışıyor",
      text: "Kimya dersinde Ali 'Boyle Yasası her koşulda geçerlidir; bir gazın basıncı ile hacmi HER ZAMAN ters orantılıdır' diyor. Ayşe ise buna itiraz ediyor. Ayşe'nin itirazı hangisi olmalıdır?",
      options: [
        "Boyle Yasası yalnızca sabit sıcaklık ve sabit mol sayısında geçerlidir; sıcaklık da değişiyorsa P·V sabit kalmaz",
        "Boyle Yasası yalnızca gaz katı hâldeyken geçerlidir",
        "Boyle Yasası yalnızca 0°C'de geçerlidir",
        "Ayşe'nin itiraz edecek bir noktası yoktur, Ali tamamen haklıdır",
      ],
      correct: 0,
      explain: "Boyle Yasası, n ve T sabit tutulduğunda P ile V arasındaki ilişkiyi tanımlar. Sıcaklık veya mol sayısı da değişirse P·V çarpımı sabit kalmaz; bu yüzden ideal gaz denklemine ihtiyaç duyulur (Modül 3).",
    },
    {
      context: "Grafiği Yeniden Çizmek",
      text: "Bir öğrenci sabit sıcaklıkta bir gazın basıncını değiştirip hacmini ölçüyor; P'ye karşı V grafiği bir hiperbol (ters orantı eğrisi) çıkıyor. Öğrenci P yerine 1/P değerlerini kullanıp grafiği yeniden çizerse nasıl bir grafik elde eder ve bu neden işe yarar?",
      options: [
        "Orijinden geçen bir doğru elde eder; çünkü V = k·(1/P) doğrusal bir ilişkidir ve doğrusal grafikler orantı sabitini (eğimi) doğrudan verir",
        "Bir parabol elde eder, çünkü V ile P arasında karesel ilişki vardır",
        "Yatay bir doğru elde eder, çünkü V sabittir",
        "Yine bir hiperbol elde eder, dönüşüm hiçbir şeyi değiştirmez",
      ],
      correct: 0,
      explain: "V = k·(1/P) doğrusal bir ilişkidir; 1/P eksenine karşı çizilen V, orijinden geçen bir doğru verir. Bilim insanları eğriyi doğrusallaştırarak orantı sabitini kolayca ölçer.",
    },
    {
      context: "Pencereden Süzülen Işıkta Toz Zerreleri",
      text: "Bir pencereden içeri giren ışık demetinde havadaki toz zerrelerinin düzensiz, zikzaklı bir şekilde hareket ettiği gözlemlenir. Bu hareket biçiminin adı ve bu hareketin durup gaz taneciklerinin enerjisini kaybetmeden sürmesini sağlayan çarpışma türü hangileridir?",
      options: [
        "Brown (Bravn) hareketi; tanecikler birbirleri ve kabın çeperleriyle esnek çarpışma yapar, bu yüzden toplam enerji ve hız korunur",
        "Difüzyon hareketi; tanecikler birbirleriyle esnek olmayan çarpışma yapıp yavaşça durur",
        "Brown hareketi; tanecikler yalnızca yer çekimi etkisiyle hareket eder",
        "Efüzyon hareketi; tanecikler yalnızca bir delikten geçerken hareket eder",
      ],
      correct: 0,
      explain: "Gaz taneciklerinin her yöne sürekli, doğrusal ve zikzaklı hareketine Brown (Bravn) hareketi denir. Tanecikler birbirleri ve kabın çeperleriyle esnek çarpışma yaptığı için yön değişir ama toplam enerji ve hız korunur; hareket bu yüzden durmaz.",
    },
  ],

  ideal: [
    {
      context: "Dalış Tüpünde İki Kat, Üç Kat",
      text: "Bir dalış eğitmeni, aynı miktar (n sabit) havayı içeren bir tüpte basıncı 2 katına, hacmi de 3 katına çıkarırsa mutlak sıcaklığın nasıl değişeceğini soruyor. İdeal gaz denklemine göre cevap nedir?",
      options: ["6 katına çıkar", "1,5 katına çıkar", "Değişmez", "Yarıya iner"],
      correct: 0,
      explain: "PV = nRT ⇒ sabit n'de (P₂V₂)/(P₁V₁) = T₂/T₁ = 2×3 = 6.",
    },
    {
      context: "Aynı Hacim, Farklı Gaz",
      text: "Normal şartlarda (NŞ: 0°C/273,15 K, 1 atm) 1 mol He (M=4) ile 1 mol Ar (M=40) gazı ayrı kaplarda bulunuyor. Bu iki ifadeden hangisi doğrudur? (1) NŞ, referans bir basınç-sıcaklık koşuludur. (2) İki gazın hacmi birbirine eşittir.",
      options: [
        "İkisi de doğrudur — NŞ basınç ve sıcaklığı sabitler; ideal gaz denklemi mol kütlesini içermediği için aynı n,P,T'de tüm ideal gazlar aynı hacmi kaplar",
        "Yalnızca (1) doğrudur, hacimler farklıdır çünkü Ar daha ağırdır",
        "Yalnızca (2) doğrudur, NŞ basınç ve mol sayısını sabitler",
        "İkisi de yanlıştır",
      ],
      correct: 0,
      explain: "PV=nRT ifadesinde molar kütle (M) yer almaz — yalnızca n, P, T hacmi belirler. NŞ, gazları karşılaştırmak için tanımlanmış referans bir basınç-sıcaklık koşuludur (0°C, 1 atm); bu koşulda 1 mol ideal gaz her zaman ≈22,4 L kaplar.",
    },
    {
      context: "R Sabitinin Birimi Ne Anlatır?",
      text: "R = P·V/(n·T) ifadesinin birimi L·atm/(mol·K) çıkar. Bu birim aslında R'nin neyi ifade ettiğini anlamamıza nasıl yardımcı olur?",
      options: [
        "R, 'her 1 mol gazın sıcaklığı 1 K arttığında, birim basınçta hacminin ne kadar değişeceğini' gösteren bir orantı sabitidir — birimindeki her terim denklemdeki bir değişkene karşılık gelir",
        "Birim, R'nin gazın rengiyle ilgili olduğunu gösterir",
        "Birim, R'nin yalnızca sıvılar için geçerli olduğunu gösterir",
        "Birimin bir anlamı yoktur, sadece hesaplama kolaylığı sağlar",
      ],
      correct: 0,
      explain: "R'nin birimi, denklemdeki dört değişkenin (P, V, n, T) birimlerinden türetilir; bu da R'nin gaz türünden bağımsız, yalnızca P-V-n-T arasındaki oranı sabitleyen evrensel bir 'dönüşüm katsayısı' olduğunu gösterir.",
    },
    {
      context: "Yükselen Meteoroloji Balonu",
      text: "Bir meteoroloji balonu yerden 5 L hacimde ve 2 atm basınçla dolduruluyor. Balon yükseldikçe dış basınç düşer; sıcaklığı yaklaşık sabit kabul edersek, iç basıncı 1 atm'ye düştüğünde balonun hacmi kaç L olur? (Balonun neden yükseldikçe şiştiğini de düşün.)",
      options: ["10 L", "2,5 L", "5 L", "20 L"],
      correct: 0,
      explain: "Sabit n, T'de P₁V₁ = P₂V₂ ⇒ 2×5 = 1×V₂ ⇒ V₂ = 10 L. Gerçek meteoroloji balonları bu yüzden çok yükseklerde aşırı şişip patlayabilir.",
    },
    {
      context: "Sabiti Avlamak",
      text: "Bir öğrenci sabit n ve T'de farklı P değerleri için V ölçüyor ve her defasında P×V çarpımını hesaplıyor; çarpımın her seferinde neredeyse aynı sayıya eşit çıktığını görüyor. Bu sabit sayı neyi temsil eder ve öğrenci aynı testi farklı bir gazla tekrarlarsa ne beklenir?",
      options: [
        "nRT çarpımını temsil eder; farklı bir gazla tekrarlanırsa (aynı n,T'de) yine aynı sayı çıkar çünkü R gaz türünden bağımsızdır",
        "Yalnızca o gaza özgü bir sabittir; başka bir gazla tamamen farklı bir sayı çıkar",
        "Yalnızca n'i temsil eder",
        "Yalnızca T'yi temsil eder",
      ],
      correct: 0,
      explain: "Sabit n ve T'de PV = nRT sabittir. R evrensel olduğundan, aynı n ve T'de hangi gaz kullanılırsa kullanılsın PV çarpımı aynı çıkar — ideal gaz denklemini tümevarımsal keşfetmenin özü budur.",
    },
    {
      context: "Sprey Kutusu Uyarısı",
      text: "Deodorant ve boya spreylerinin üzerinde 'Doğrudan güneş ışığında bırakmayın, 50°C üzerinde patlayabilir' uyarısı bulunur. Kutunun hacmi sabit (rijit metal) olduğuna göre bu uyarı ideal gaz denkleminin hangi özel durumuyla açıklanır?",
      options: [
        "Sabit n, V'de P, T ile doğru orantılıdır; güneşte ısınan kutuda basınç güvenli sınırın üzerine çıkabilir",
        "Sabit n, P'de V, T ile doğru orantılıdır; kutu genleşip büyür",
        "Sabit P, T'de V, n ile doğru orantılıdır; kutudaki mol sayısı artar",
        "İdeal gaz denklemiyle ilgisi yoktur, yalnızca kimyasal bir tepkimedir",
      ],
      correct: 0,
      explain: "PV=nRT'de n ve V sabitken P, T ile doğru orantılı artar. Rijit bir kutuda aşırı ısınma basıncı güvensiz seviyelere çıkarabileceği için üretici bu uyarıyı ekler.",
    },
    {
      context: "İdeal Gaza En Yakın Davranış",
      text: "Gerçek gazlarda tanecikler arası çekim kuvveti vardır ve tanecik hacmi sıfır değildir — bu yüzden hiçbir gerçek gaz tam olarak ideal davranmaz. Bir gerçek gaz hangi koşulda ideal davranışa EN YAKIN sonuç verir?",
      options: [
        "Düşük basınç, yüksek sıcaklık ve küçük mol kütlesinde (tanecikler seyrek, hızlı ve hafif; aralarındaki etkileşim önemsizleşir)",
        "Yüksek basınç ve düşük sıcaklıkta (tanecikler sık ve yavaş)",
        "Basınç ve sıcaklıktan bağımsız, her zaman aynıdır",
        "Yalnızca çok büyük mol kütleli gazlarda",
      ],
      correct: 0,
      explain: "Gazlar yüksek sıcaklıkta, düşük basınçta ve mol kütlesi küçük olduğunda ideale yaklaşır — tanecikler arası mesafe büyür ve çekim kuvvetlerinin etkisi görece küçülür.",
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
      context: "Kimliği Bilinmeyen Gaz X",
      text: "Kapalı bir odada aynı anda açılan X gazı (M=16 g/mol) ile Y gazı (M=146 g/mol) kaynaklarından, X gazının kokusu Y gazınınkinden çok daha önce fark ediliyor. Bu gözlem hangi akıl yürütmeyle açıklanır?",
      options: [
        "Graham Yasası'na göre mol kütlesi küçük olan X gazı, Y gazından daha hızlı difüze olur",
        "X gazı Y gazından daha sıcaktır, bu yüzden önce hissedilir",
        "X gazının rengi daha belirgin olduğu için önce fark edilir",
        "Mol kütlesinin difüzyon hızıyla bir ilgisi yoktur, tesadüftür",
      ],
      correct: 0,
      explain: "Graham Yasası'na göre mol kütlesi küçük olan tanecikler daha hızlı yayılır; X gazının mol kütlesi Y gazından çok daha küçük olduğu için kokusu daha erken fark edilir.",
    },
    {
      context: "NH₃ – HCl Klasik Deneyi",
      text: "Bir cam borunun bir ucundan NH₃ (M≈17 g/mol), diğer ucundan HCl (M≈36,5 g/mol) gazı aynı anda serbest bırakılırsa, iki gazın karşılaşıp beyaz duman (NH₄Cl) oluşturduğu nokta borunun hangi ucuna daha yakın olur?",
      options: [
        "HCl'nin bırakıldığı uca, çünkü daha hafif olan NH3 daha hızlı difüze olur",
        "Tam ortada olur",
        "NH3'ün bırakıldığı uca, çünkü HCl daha hızlı difüze olur",
        "Belirlenemez",
      ],
      correct: 0,
      explain: "Mol kütlesi küçük olan NH3, Graham Yasası gereği daha hızlı difüze olduğundan daha uzun mesafe kat eder; buluşma noktası HCl ucuna daha yakın olur.",
    },
    {
      context: "Şişme Yüzme Simidi",
      text: "Bir çocuk, biri hava biri helyumla şişirilmiş iki özdeş kauçuk yüzme simidini kıyaslıyor. Birkaç gün sonra helyumla şişirilen simit gözle görülür şekilde daha çok söner. Kauçuğun gözenekleri her iki gaz için de aynı olduğuna göre bu farkın nedeni nedir?",
      options: [
        "Helyumun mol kütlesi havadakinden (ortalama M≈29) çok daha küçüktür; Graham Yasası'na göre küçük mol kütleli tanecikler aynı gözeneklerden daha hızlı efüze olur",
        "Helyum kauçukla tepkimeye girip gözenekleri büyütür",
        "Helyum havadan daha sıcaktır, bu yüzden hızla kaçar",
        "Helyum molekülleri elektrikçe yüklüdür, kauçuktan itilir",
      ],
      correct: 0,
      explain: "Graham Yasası'na göre mol kütlesi küçük olan tanecikler daha hızlı efüze olur. Helyum (M=4), havanın ortalama mol kütlesinden (≈29) çok küçük olduğundan aynı gözeneklerden çok daha hızlı kaçar.",
    },
    {
      context: "Ali ile Ayşe Tartışıyor",
      text: "Ali, 'efüzyon hızı yalnızca mol kütlesine bağlıdır' diyor. Ayşe ise 'hayır, sıcaklığa da bağlıdır' diyor. Kinetik moleküler teoriye göre kim haklı?",
      options: [
        "Ayşe haklı; gaz taneciklerinin ortalama kinetik enerjisi sıcaklıkla doğru orantılıdır, bu yüzden sıcaklık arttıkça hız da artar — Graham Yasası yalnızca AYNI sıcaklıkta iki gazı karşılaştırırken mol kütlesini öne çıkarır",
        "Ali haklı; sıcaklığın hiçbir etkisi yoktur",
        "İkisi de yanlış; efüzyon hızı yalnızca basınca bağlıdır",
        "İkisi de haklı ama farklı gazlar için geçerlidir",
      ],
      correct: 0,
      explain: "Kinetik moleküler teoriye göre gaz taneciklerinin ortalama kinetik enerjisi mutlak sıcaklıkla doğru orantılıdır; bu yüzden sıcaklık da hızı etkiler. Graham Yasası, sıcaklık AYNI tutulduğunda mol kütlesinin etkisini karşılaştırmaya odaklanır.",
    },
    {
      context: "Sızdıran Tüp mü, Kokusu Yayılan Oda mı?",
      text: "Sıkıştırılmış CO₂ dolu sızdırmaz bir tüp, küçük bir valften CO₂ içermeyen boş bir odaya yavaşça gaz kaçırıyor. Bir öğrenci 'bu da konsantrasyon farkından kaynaklanan bir difüzyondur, tıpkı parfüm kokusunun yayılması gibi' diyor. Bu görüşteki eksiklik nedir?",
      options: [
        "Bu olay efüzyondur: kaçış küçük bir delikten, iki bölge arasındaki BASINÇ farkı nedeniyle olur; difüzyon ise genellikle bir bariyer olmadan, KONSANTRASYON farkından kaynaklanan karışmadır",
        "Eksiklik yok, öğrenci tamamen haklıdır",
        "CO₂ hiçbir koşulda difüze veya efüze olamaz",
        "Bu olay yalnızca sıvılar için geçerli bir kavramdır, gazlarla ilgisi yoktur",
      ],
      correct: 0,
      explain: "Efüzyon, sıkışmış gazın küçük bir delikten kaçmasıdır ve basınç farkıyla oluşur/kolaylaşır; difüzyon ise genellikle bir bariyer olmaksızın konsantrasyon farkından kaynaklanan karışmadır. Tüpten kaçış senaryosu (küçük delik + basınç farkı) efüzyona örnektir.",
    },
  ],
};
