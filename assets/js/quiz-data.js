/* =========================================================
   GazLab 10 — quiz-data.js
   Bağlam temelli, düşündüren değerlendirme soruları (yalnızca
   paylaşılan kazanımlar/kavramlarla sınırlıdır: KİM.10.1.8 – 1.11).
   Her soru 5 seçenekli; doğru cevabın konumu sorular arasında
   kasıtlı olarak değiştirilir (hep aynı şıkta olmaz).
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
        "Hava, fren sisteminin metal borularını genleştirerek sıvı akışını yavaşlatır",
      ],
      correct: 0,
      explain: "Gazlar tanecikleri arasındaki büyük boşluk nedeniyle kolayca sıkışır; hapsolan hava kabarcığı basınç enerjisini emer ve fren gücü zayıflar. Sıvılar bu ölçüde sıkışmadığı için hidrolik sistemler güvenle sıvıyla çalışır.",
    },
    {
      context: "LPG mi, Doğal Gaz mı?",
      text: "Ev güvenliği eğitimlerinde LPG (M≈44 g/mol) sızıntısı olduğunda yere yakın alanların, doğal gaz (metan, M≈16 g/mol) sızıntısında ise tavana yakın alanların önce havalandırılması önerilir. Bu fark gazların hangi özelliğinden kaynaklanır?",
      options: ["Sıkıştırılabilirlik", "Yoğunluk", "Genleşme", "Karışabilirlik", "Basınç"],
      correct: 1,
      explain: "Aynı sıcaklık ve basınçta mol kütlesi büyük olan gaz (LPG) havadan yoğundur ve yere çöker; mol kütlesi küçük olan gaz (metan) havadan az yoğundur ve yükselir.",
    },
    {
      context: "Vakumlu Saklama Poşeti",
      text: "Bir vakumlu gıda saklama poşetinden pompayla hava çekildiğinde poşet küçülüp gıdaya sımsıkı yapışır; poşetin içindeki katı gıdanın boyutunda ise gözle görülür bir değişiklik olmaz. Bu karşılaştırma gazların hangi özelliğini en açık şekilde gösterir?",
      options: ["Yoğunluk", "Genleşme", "Sıkıştırılabilirlik", "Karışabilirlik", "Basınç"],
      correct: 2,
      explain: "Poşetteki hava, tanecikler arası boşluk sayesinde kolayca sıkışıp hacmini küçültür; katı gıdadaki tanecikler zaten birbirine çok yakın olduğundan boyut neredeyse sabit kalır.",
    },
    {
      context: "Sıcak Hava Neden Yükselir?",
      text: "Bir ocağın üzerindeki sıcak hava görünmez şekilde yukarı doğru yükselir. Bu olayı KMT'ye dayanarak İKİ ADIMDA açıklayan seçenek hangisidir?",
      options: [
        "Sıcaklık artınca tanecik sayısı artar → daha fazla tanecik daha hafif olur",
        "Sıcaklık artınca tanecikler küçülür → hava hafifler",
        "Sıcaklık artınca hava rengi değişir → ışığı daha az yansıtır",
        "Sıcaklık artınca tanecikler hızlanıp birbirinden uzaklaşır (genleşme) → aynı kütle daha büyük hacme yayılınca yoğunluk azalır ve hava yükselir",
        "Sıcaklık artınca taneciklerin kütlesi azalır → hava hafifler",
      ],
      correct: 3,
      explain: "Genleşme ve yoğunluk birbirine bağlı iki kavramdır: sıcaklık artışı önce hacmi büyütür (genleşme), aynı kütlenin daha büyük hacme yayılması ise yoğunluğu azaltır.",
    },
    {
      context: "Aseton Kokusu",
      text: "Kapalı bir sınıfta bir öğrenci oje çıkarıcı (aseton) şişesinin kapağını açtığında, koku birkaç dakika içinde sınıfın en uzak köşesine kadar ulaşır — ama masaya damlayan sıvı aseton, masadan aşağı akmadan kendiliğinden yayılmaz. Gaz hâlindeki asetonun bu şekilde yayılmasına ne denir?",
      options: ["Yoğunluk", "Sıkıştırılabilirlik", "Basınç", "Genleşme", "Karışabilirlik"],
      correct: 4,
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
        "Yoğunluk yalnızca sıvı hâldeki maddeler için tanımlıdır, gazlar için anlamsızdır",
      ],
      correct: 0,
      explain: "Gazların hacmi koşullara (sıcaklık, basınç) bağlı olarak kolayca değiştiğinden aynı gazın yoğunluğu da değişir. Bu yüzden yoğunluk, katılardaki gibi gazlar için sabit/ayırt edici bir özellik olarak kullanılamaz.",
    },
    {
      context: "İki Kap, İki Basınç",
      gasContainer: {
        caption: "Aynı hacim ve sıcaklıktaki iki kapalı kapta farklı sayıda gaz taneciği bulunuyor.",
        vessels: [
          { label: "1. Kap", kind: "fixed", particles: 8, gasColor: "#5b8dff", P: "düşük" },
          { label: "2. Kap", kind: "fixed", particles: 24, gasColor: "#ff5b7f", P: "yüksek" },
        ],
      },
      text: "Şekildeki 1. ve 2. kap aynı hacimde ve aynı sıcaklıktayken, 2. kabın iç basıncının 1. kaptan büyük olmasının KMT'ye göre temel nedeni nedir?",
      options: [
        "2. kaptaki tanecik sayısı daha fazla olduğundan, kap duvarına birim zamanda çarpan tanecik sayısı da fazladır",
        "2. kaptaki tanecikler daha yavaş hareket ettiği için",
        "2. kabın duvarları daha ince olduğu için",
        "2. kaptaki gaz daha soğuk olduğu için tanecikler birbirine yapışır",
        "Kapların rengi basıncı doğrudan etkiler",
      ],
      correct: 0,
      explain: "Gaz basıncı, taneciklerin kap duvarına yaptığı çarpışmalardan doğar. Sabit hacim ve sıcaklıkta tanecik (madde) miktarı arttıkça birim zamanda duvara çarpan tanecik sayısı artar, bu da basıncı yükseltir.",
    },
    {
      context: "Aynı Kutu, Farklı Hâl",
      particleModel: {
        caption: "Aynı boyuttaki iki kapalı kutuda eşit sayıda tanecik bulunuyor: biri katı, biri gaz hâlinde paketlenmiş.",
        boxes: [
          { label: "Katı", count: 42, color: "#2fb8c6" },
          { label: "Gaz", count: 8, color: "#5b8dff" },
        ],
      },
      text: "Şekildeki katı kutusunda tanecikler birbirine bitişik dururken, gaz kutusunda taneciklerin arasında büyük boşluklar var. Bu görsel fark, gazların hangi özelliğini DOĞRUDAN açıklar?",
      options: [
        "Gazların sıvı ve katılardan farklı olarak kolayca sıkıştırılabilmesini",
        "Gazların her zaman renksiz olmasını",
        "Gazların katılardan daha ağır olmasını",
        "Gazların yalnızca yüksek sıcaklıkta var olabilmesini",
        "Gazların elektrik iletmemesini",
      ],
      correct: 0,
      explain: "Katıda tanecikler birbirine bitişik, boşluksuzdur; gazda ise tanecikler arasında büyük boşluklar vardır. Bu boşluk, gazın dış basınç uygulandığında kolayca sıkışabilmesinin (sıkıştırılabilirlik) doğrudan nedenidir.",
    },
  ],

  yasalar: [
    {
      context: "Dalgıç Eğitiminin Altın Kuralı",
      text: "Bir dalgıç, 3 atm basınç altındaki bir derinlikte akciğerlerinde 6 L hava hapsedip nefesini tutarak hızla su yüzeyine (1 atm) çıkıyor. Sabit sıcaklıkta, akciğerlerindeki hava yüzeyde kaç L hacim kaplar?",
      options: ["12 L", "18 L", "2 L", "9 L", "24 L"],
      correct: 1,
      explain: "Sabit sıcaklıkta P₁V₁=P₂V₂ (Boyle Yasası) ⇒ 3 atm × 6 L = 1 atm × V₂ ⇒ V₂ = 18 L. Bu üç kata çıkan genleşme akciğerlerde ciddi hasara (barotravma) yol açabileceği için dalgıçlar sürekli nefes vererek fazla havanın çıkmasına izin verir.",
    },
    {
      context: "Fırındaki Şişen Poşet",
      text: "Sabit basınçlı esnek bir poşette 27°C sıcaklıkta 2 L hava bulunuyor. Poşet 177°C sıcaklıktaki bir fırına konuyor. Poşetin son hacmi kaç L olur?",
      options: ["2,5 L", "1,3 L", "3 L", "3,5 L", "4 L"],
      correct: 2,
      explain: "T(K)=t(°C)+273 ⇒ T₁=300 K, T₂=450 K. Sabit basınçta V₁/T₁=V₂/T₂ (Charles Yasası) ⇒ 2/300 = V₂/450 ⇒ V₂ = 3 L.",
    },
    {
      context: "Lastik Basıncı Uyarı Lambası",
      text: "Bir araç lastiğinin iç basıncı 27°C'de 2,4 atm'dir (sabit hacim). Kış gecesi sıcaklık -3°C'ye düştüğünde lastik basıncı kaç atm olur?",
      options: ["2,0 atm", "2,64 atm", "2,4 atm", "2,16 atm", "1,8 atm"],
      correct: 3,
      explain: "T₁=300 K, T₂=270 K. Sabit hacimde P₁/T₁=P₂/T₂ (Gay-Lussac Yasası) ⇒ 2,4/300 = P₂/270 ⇒ P₂=2,16 atm. Bu düşüş, kışın 'lastik basıncı düşük' uyarısının nedenidir.",
    },
    {
      context: "Şişme Oyun Kalesi",
      text: "Sabit sıcaklık ve basınçta 3 mol hava içeren esnek bir şişme oyun kalesi 12 m³ hacim kaplıyor. Fan daha güçlü çalışıp mol sayısını 5 mol'e çıkarırsa kalenin yeni hacmi kaç m³ olur?",
      options: ["15 m³", "18 m³", "22 m³", "7,2 m³", "20 m³"],
      correct: 4,
      explain: "Sabit P, T'de V/n=sabit (Avogadro Yasası) ⇒ 12/3 = V₂/5 ⇒ V₂ = 20 m³.",
    },
    {
      context: "İki Öğrenci Tartışıyor",
      text: "Kimya dersinde Ali 'Boyle Yasası her koşulda geçerlidir; bir gazın basıncı ile hacmi HER ZAMAN ters orantılıdır' diyor. Ayşe ise buna itiraz ediyor. Ayşe'nin itirazı hangisi olmalıdır?",
      options: [
        "Boyle Yasası yalnızca sabit sıcaklık ve sabit mol sayısında geçerlidir; sıcaklık da değişiyorsa P·V sabit kalmaz",
        "Boyle Yasası yalnızca gaz katı hâldeyken geçerlidir",
        "Boyle Yasası yalnızca 0°C'de geçerlidir",
        "Ayşe'nin itiraz edecek bir noktası yoktur, Ali tamamen haklıdır",
        "Boyle Yasası yalnızca gaz basıncı 1 atm'nin altındayken geçerlidir",
      ],
      correct: 0,
      explain: "Boyle Yasası, n ve T sabit tutulduğunda P ile V arasındaki ilişkiyi tanımlar. Sıcaklık veya mol sayısı da değişirse P·V çarpımı sabit kalmaz; bu yüzden ideal gaz denklemine ihtiyaç duyulur (Modül 3).",
    },
    {
      context: "Grafiği Yeniden Çizmek",
      text: "Bir öğrenci sabit sıcaklıkta bir gazın basıncını değiştirip hacmini ölçüyor; P'ye karşı V grafiği bir hiperbol (ters orantı eğrisi) çıkıyor. Öğrenci P yerine 1/P değerlerini kullanıp grafiği yeniden çizerse nasıl bir grafik elde eder ve bu neden işe yarar?",
      options: [
        "Bir parabol elde eder, çünkü V ile P arasında karesel ilişki vardır",
        "Orijinden geçen bir doğru elde eder; çünkü V = k·(1/P) doğrusal bir ilişkidir ve doğrusal grafikler orantı sabitini (eğimi) doğrudan verir",
        "Yatay bir doğru elde eder, çünkü V sabittir",
        "Yine bir hiperbol elde eder, dönüşüm hiçbir şeyi değiştirmez",
        "Eğimi negatif olan azalan bir doğru elde eder, çünkü V ile P ters orantılıdır",
      ],
      correct: 1,
      explain: "V = k·(1/P) doğrusal bir ilişkidir; 1/P eksenine karşı çizilen V, orijinden geçen bir doğru verir. Bilim insanları eğriyi doğrusallaştırarak orantı sabitini kolayca ölçer.",
    },
    {
      context: "Pencereden Süzülen Işıkta Toz Zerreleri",
      text: "Bir pencereden içeri giren ışık demetinde havadaki toz zerrelerinin düzensiz, zikzaklı bir şekilde hareket ettiği gözlemlenir. Bu hareket biçiminin adı ve bu hareketin durmadan, gaz taneciklerinin enerjisini kaybetmeden sürmesini sağlayan çarpışma türü hangileridir?",
      options: [
        "Difüzyon hareketi; tanecikler birbirleriyle esnek olmayan çarpışma yapıp yavaşça durur",
        "Brown hareketi; tanecikler yalnızca yer çekimi etkisiyle hareket eder",
        "Brown (Bravn) hareketi; tanecikler birbirleri ve kabın çeperleriyle esnek çarpışma yapar, bu yüzden toplam enerji ve hız korunur",
        "Efüzyon hareketi; tanecikler yalnızca bir delikten geçerken hareket eder",
        "Konveksiyon hareketi; tanecikler sıcaklık farkı nedeniyle yukarı-aşağı dolaşır",
      ],
      correct: 2,
      explain: "Gaz taneciklerinin her yöne sürekli, doğrusal ve zikzaklı hareketine Brown (Bravn) hareketi denir. Tanecikler birbirleri ve kabın çeperleriyle esnek çarpışma yaptığı için yön değişir ama toplam enerji ve hız korunur; hareket bu yüzden durmaz.",
    },
    {
      context: "Grafikten Charles Yasasını Okumak",
      chart: {
        type: "line",
        caption: "Sabit basınçta, aynı miktardaki bir gazın farklı sıcaklıklarda esnek bir pistonla ölçülen hacmi.",
        series: [
          {
            label: "Hacim (L)",
            color: "var(--gl-accent)",
            data: [{ x: 200, y: 2 }, { x: 300, y: 3 }, { x: 400, y: 4 }],
          },
        ],
        xLabel: "Sıcaklık (K)",
        yLabel: "Hacim (L)",
        xDomain: [0, 650],
        yDomain: [0, 6.5],
      },
      text: "Grafikteki doğrusal eğilim korunursa, sıcaklık 600 K'ye çıkarıldığında gazın hacmi yaklaşık kaç L olur?",
      options: ["5 L", "8 L", "6 L", "4,5 L", "12 L"],
      correct: 2,
      explain: "Grafikteki noktalar V/T = 0,01 L/K sabit oranını verir (Charles Yasası, sabit basınçta V∝T). T=600 K için V = 0,01 × 600 = 6 L. Doğru orantı, doğrunun orijinden geçmesinden de okunabilir.",
    },
    {
      context: "Sıkıştırma Deneyi",
      gasContainer: {
        caption: "Aynı miktardaki gaz, sabit sıcaklıkta bir pistonla sıkıştırılıyor.",
        vessels: [
          { label: "Başlangıç", kind: "piston", fillRatio: 0.82, particles: 10, gasColor: "#5b8dff", P: "1 atm", V: "6 L" },
          { label: "Sıkıştırılmış", kind: "piston", fillRatio: 0.27, particles: 10, gasColor: "#ff5b7f", P: "3 atm", V: "2 L" },
        ],
      },
      text: "Şekildeki iki durumda da tanecik sayısı ve sıcaklık aynıdır. Bu gözlem hangi gaz yasasıyla birebir uyumludur?",
      options: [
        "Boyle Yasası (P₁V₁ = P₂V₂): 1 atm × 6 L = 3 atm × 2 L, her iki durumda da PV = 6 sabit kalır",
        "Charles Yasası, çünkü sıcaklık değişmiştir",
        "Avogadro Yasası, çünkü tanecik sayısı değişmiştir",
        "Gay-Lussac Yasası, çünkü hacim sabit kalmıştır",
        "Hiçbiri; hacmin küçülmesi yalnızca pistonun ağırlığından kaynaklanır",
      ],
      correct: 0,
      explain: "Sabit sıcaklık ve mol sayısında P·V çarpımı sabit kalır (Boyle Yasası): 1 atm × 6 L = 6 = 3 atm × 2 L. Piston sıkıştırdıkça tanecikler birbirine yaklaşır, çarpışma sıklığı ve dolayısıyla basınç artar.",
    },
  ],

  ideal: [
    {
      context: "Dalış Tüpünde İki Kat, Üç Kat",
      text: "Bir dalış eğitmeni, aynı miktar (n sabit) havayı içeren bir tüpte basıncı 2 katına, hacmi de 3 katına çıkarırsa mutlak sıcaklığın nasıl değişeceğini soruyor. İdeal gaz denklemine göre cevap nedir?",
      options: ["1,5 katına çıkar", "Değişmez", "Yarıya iner", "6 katına çıkar", "3 katına çıkar"],
      correct: 3,
      explain: "PV = nRT ⇒ sabit n'de (P₂V₂)/(P₁V₁) = T₂/T₁ = 2×3 = 6.",
    },
    {
      context: "Aynı Hacim, Farklı Gaz",
      text: "Normal şartlarda (NŞ: 0°C/273,15 K, 1 atm) 1 mol He (M=4) ile 1 mol Ar (M=40) gazı ayrı kaplarda bulunuyor. Bu iki ifadeden hangisi doğrudur? (1) NŞ, referans bir basınç-sıcaklık koşuludur. (2) İki gazın hacmi birbirine eşittir.",
      options: [
        "Yalnızca (1) doğrudur, hacimler farklıdır çünkü Ar daha ağırdır",
        "Yalnızca (2) doğrudur, NŞ basınç ve mol sayısını sabitler",
        "İkisi de yanlıştır",
        "Yalnızca hacimler eşittir ama NŞ diye bir kavram yoktur",
        "İkisi de doğrudur — NŞ basınç ve sıcaklığı sabitler; ideal gaz denklemi mol kütlesini içermediği için aynı n,P,T'de tüm ideal gazlar aynı hacmi kaplar",
      ],
      correct: 4,
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
        "Birim yalnızca metrik sistemde çalışan bir gösterim kolaylığıdır, fiziksel bir anlamı yoktur",
      ],
      correct: 0,
      explain: "R'nin birimi, denklemdeki dört değişkenin (P, V, n, T) birimlerinden türetilir; bu da R'nin gaz türünden bağımsız, yalnızca P-V-n-T arasındaki oranı sabitleyen evrensel bir 'dönüşüm katsayısı' olduğunu gösterir.",
    },
    {
      context: "Yükselen Meteoroloji Balonu",
      text: "Bir meteoroloji balonu yerden 5 L hacimde ve 2 atm basınçla dolduruluyor. Balon yükseldikçe dış basınç düşer; sıcaklığı yaklaşık sabit kabul edersek, iç basıncı 1 atm'ye düştüğünde balonun hacmi kaç L olur? (Balonun neden yükseldikçe şiştiğini de düşün.)",
      options: ["7,5 L", "10 L", "2,5 L", "5 L", "20 L"],
      correct: 1,
      explain: "Sabit n, T'de P₁V₁ = P₂V₂ ⇒ 2×5 = 1×V₂ ⇒ V₂ = 10 L. Gerçek meteoroloji balonları bu yüzden çok yükseklerde aşırı şişip patlayabilir.",
    },
    {
      context: "Sabiti Avlamak",
      text: "Bir öğrenci sabit n ve T'de farklı P değerleri için V ölçüyor ve her defasında P×V çarpımını hesaplıyor; çarpımın her seferinde neredeyse aynı sayıya eşit çıktığını görüyor. Bu sabit sayı neyi temsil eder ve öğrenci aynı testi farklı bir gazla tekrarlarsa ne beklenir?",
      options: [
        "Yalnızca o gaza özgü bir sabittir; başka bir gazla tamamen farklı bir sayı çıkar",
        "Yalnızca n'i temsil eder",
        "nRT çarpımını temsil eder; farklı bir gazla tekrarlanırsa (aynı n,T'de) yine aynı sayı çıkar çünkü R gaz türünden bağımsızdır",
        "Yalnızca T'yi temsil eder",
        "Yalnızca ölçüm hatasından kaynaklanan rastgele bir sayıdır",
      ],
      correct: 2,
      explain: "Sabit n ve T'de PV = nRT sabittir. R evrensel olduğundan, aynı n ve T'de hangi gaz kullanılırsa kullanılsın PV çarpımı aynı çıkar — ideal gaz denklemini tümevarımsal keşfetmenin özü budur.",
    },
    {
      context: "Sprey Kutusu Uyarısı",
      text: "Deodorant ve boya spreylerinin üzerinde 'Doğrudan güneş ışığında bırakmayın, 50°C üzerinde patlayabilir' uyarısı bulunur. Kutunun hacmi sabit (rijit metal) olduğuna göre bu uyarı ideal gaz denkleminin hangi özel durumuyla açıklanır?",
      options: [
        "Sabit n, P'de V, T ile doğru orantılıdır; kutu genleşip büyür",
        "Sabit P, T'de V, n ile doğru orantılıdır; kutudaki mol sayısı artar",
        "İdeal gaz denklemiyle ilgisi yoktur, yalnızca kimyasal bir tepkimedir",
        "Sabit n, V'de P, T ile doğru orantılıdır; güneşte ısınan kutuda basınç güvenli sınırın üzerine çıkabilir",
        "Sabit T, V'de P, n ile ters orantılıdır; kutudaki mol sayısı azalır",
      ],
      correct: 3,
      explain: "PV=nRT'de n ve V sabitken P, T ile doğru orantılı artar. Rijit bir kutuda aşırı ısınma basıncı güvensiz seviyelere çıkarabileceği için üretici bu uyarıyı ekler.",
    },
    {
      context: "İdeal Gaza En Yakın Davranış",
      text: "Gerçek gazlarda tanecikler arası çekim kuvveti vardır ve tanecik hacmi sıfır değildir — bu yüzden hiçbir gerçek gaz tam olarak ideal davranmaz. Bir gerçek gaz hangi koşulda ideal davranışa EN YAKIN sonuç verir?",
      options: [
        "Yüksek basınç ve düşük sıcaklıkta (tanecikler sık ve yavaş)",
        "Basınç ve sıcaklıktan bağımsız, her zaman aynıdır",
        "Yalnızca çok büyük mol kütleli gazlarda",
        "Yalnızca soy gazlar (He, Ne, Ar) her koşulda tam ideal davranır",
        "Düşük basınç, yüksek sıcaklık ve küçük mol kütlesinde (tanecikler seyrek, hızlı ve hafif; aralarındaki etkileşim önemsizleşir)",
      ],
      correct: 4,
      explain: "Gazlar yüksek sıcaklıkta, düşük basınçta ve mol kütlesi küçük olduğunda ideale yaklaşır — tanecikler arası mesafe büyür ve çekim kuvvetlerinin etkisi görece küçülür.",
    },
    {
      context: "Dalış Tüpünde Kaç Mol Hava Var?",
      text: "Bir SCUBA dalış tüpü 12 L hacminde, 27°C sıcaklıkta 200 atm basınçla doldurulmuştur. R≈0,082 L·atm/(mol·K) alarak tüpteki hava miktarı yaklaşık kaç moldür?",
      options: ["≈98 mol", "≈49 mol", "≈24 mol", "≈196 mol", "≈12 mol"],
      correct: 0,
      explain: "T=27+273=300 K. n=PV/(RT)=(200×12)/(0,082×300)=2400/24,6≈98 mol. Bu, dalış tüplerinin neden bu kadar yüksek basınçla doldurulduğunu (küçük bir hacimde çok fazla hava taşımak için) gösterir.",
    },
    {
      context: "Kapalı Kaptaki Azot Gazı",
      text: "0,5 mol azot (N₂) gazı 25 L hacimli bir kapta 400 K sıcaklıkta bulunuyor. Kabın iç basıncı kaç atm'dir? (R≈0,082 L·atm/(mol·K))",
      options: ["≈0,33 atm", "≈0,66 atm", "≈1,3 atm", "≈2,6 atm", "≈0,16 atm"],
      correct: 1,
      explain: "P=nRT/V=(0,5×0,082×400)/25=16,4/25≈0,66 atm.",
    },
    {
      context: "Üç Kap, Üç Basınç",
      gasContainer: {
        caption: "K, L, M kaplarındaki gazların mol sayısı, hacmi ve sıcaklığı etiketlerde verilmiştir.",
        vessels: [
          { label: "K", kind: "fixed", particles: 10, gasColor: "#5b8dff", n: "1 mol", V: "10 L", T: "300 K" },
          { label: "L", kind: "fixed", particles: 20, gasColor: "#ff5b7f", n: "2 mol", V: "10 L", T: "300 K" },
          { label: "M", kind: "fixed", particles: 10, gasColor: "#2fb8c6", n: "1 mol", V: "6 L", T: "300 K" },
        ],
      },
      text: "K, L ve M kaplarındaki gazların basınçları PV=nRT'ye göre büyükten küçüğe nasıl sıralanır?",
      options: ["L > M > K", "K > L > M", "M > L > K", "L > K > M", "Üçü de eşittir"],
      correct: 0,
      explain: "P=nRT/V ⇒ P_K=(1×0,082×300)/10≈2,46 atm; P_L=(2×0,082×300)/10≈4,92 atm; P_M=(1×0,082×300)/6≈4,10 atm. Sıralama: L > M > K.",
    },
    {
      context: "Tabloda Bir Hata Var",
      table: {
        caption: "Aynı gazdan alınan dört örneğin ölçülen n, V, T değerleri ve hesaplanan P değerleri (R≈0,082 L·atm/(mol·K)).",
        headers: ["Örnek", "n (mol)", "V (L)", "T (K)", "P (atm)"],
        rows: [
          ["A", 1, 10, 300, "2,46"],
          ["B", 2, 20, 300, "2,46"],
          ["C", 1, 5, 300, "4,92"],
          ["D", 1, 10, 600, "5,00"],
        ],
      },
      text: "Tablodaki P değerlerinden hangisi PV=nRT ile HESAPLANAMAZ, yani verilen n, V, T ile tutarsızdır?",
      options: ["Örnek A", "Örnek B", "Örnek C", "Örnek D", "Hepsi tutarlıdır"],
      correct: 3,
      explain: "D için doğru değer P=nRT/V=(1×0,082×600)/10=4,92 atm olmalıdır; tabloda yazan 5,00 atm bu değerle uyuşmuyor. A, B, C değerleri PV=nRT ile birebir tutarlıdır (B'de n ve V birlikte 2 katına çıktığından P değişmez).",
    },
  ],

  difuzyon: [
    {
      context: "Araba Lastiği",
      text: "Bir araba lastiğinin içindeki hava, haftalar içinde yavaşça azalır ve lastik basıncı düşer; lastik gövdesinde görünür bir delik yoktur. Bu yavaş kaçış hangi olayla açıklanır?",
      options: ["Difüzyon", "Yoğunlaşma", "Efüzyon", "Genleşme", "Süblimleşme"],
      correct: 2,
      explain: "Gaz taneciklerinin küçük gözeneklerden tek tek kaçışı efüzyon olarak adlandırılır.",
    },
    {
      context: "Parfüm Kokusu",
      text: "Oda içinde açılan bir parfüm şişesinin kokusunun havada dağılıp odanın her yanına yayılması hangi olayla açıklanır?",
      options: [
        "Efüzyon; gazın boşluğa yayılması",
        "Difüzyon; yalnızca boşlukta gerçekleşen bir olay",
        "Efüzyon; yalnızca sıvı içinde gerçekleşen bir olay",
        "Difüzyon; bir gazın başka bir gaz (hava) içine kendiliğinden yayılması",
        "Konveksiyon; sıcak hava akımlarının kokuyu taşımasıyla oluşur",
      ],
      correct: 3,
      explain: "Bir gazın başka bir gaz ortamı içine kendiliğinden yayılması difüzyon olarak tanımlanır.",
    },
    {
      context: "Kimliği Bilinmeyen Gaz X",
      text: "Kapalı bir odada aynı anda açılan X gazı (M=16 g/mol) ile Y gazı (M=146 g/mol) kaynaklarından, X gazının kokusu Y gazınınkinden çok daha önce fark ediliyor. Bu gözlem hangi akıl yürütmeyle açıklanır?",
      options: [
        "X gazı Y gazından daha sıcaktır, bu yüzden önce hissedilir",
        "X gazının rengi daha belirgin olduğu için önce fark edilir",
        "Mol kütlesinin difüzyon hızıyla bir ilgisi yoktur, tesadüftür",
        "X gazı daha az yoğun olduğu için burna daha yakın kalır, difüzyonla ilgisi yoktur",
        "Graham Yasası'na göre mol kütlesi küçük olan X gazı, Y gazından daha hızlı difüze olur",
      ],
      correct: 4,
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
        "Borunun tam ortasına biraz daha yakın bir noktada, çünkü ikisi de yaklaşık aynı hızda difüze olur",
      ],
      correct: 0,
      explain: "Mol kütlesi küçük olan NH3, Graham Yasası gereği daha hızlı difüze olduğundan daha uzun mesafe kat eder; buluşma noktası HCl ucuna daha yakın olur.",
    },
    {
      context: "Şişme Yüzme Simidi",
      text: "Bir çocuk, biri hava biri helyumla şişirilmiş iki özdeş kauçuk yüzme simidini kıyaslıyor. Birkaç gün sonra helyumla şişirilen simit gözle görülür şekilde daha çok söner. Kauçuğun gözenekleri her iki gaz için de aynı olduğuna göre bu farkın nedeni nedir?",
      options: [
        "Helyum kauçukla tepkimeye girip gözenekleri büyütür",
        "Helyumun mol kütlesi havadakinden (ortalama M≈29) çok daha küçüktür; Graham Yasası'na göre küçük mol kütleli tanecikler aynı gözeneklerden daha hızlı efüze olur",
        "Helyum havadan daha sıcaktır, bu yüzden hızla kaçar",
        "Helyum molekülleri elektrikçe yüklüdür, kauçuktan itilir",
        "Helyum atomları hava moleküllerinden daha büyüktür ve kauçuğu gererek gözenekleri büyütür",
      ],
      correct: 1,
      explain: "Aynı sıcaklıkta efüzyon hızı mol kütlesi küçüldükçe artar. Helyum (M=4), havanın ortalama mol kütlesinden (≈29) çok küçük olduğundan aynı gözeneklerden çok daha hızlı kaçar.",
    },
    {
      context: "Ali ile Ayşe Tartışıyor",
      text: "Ali, 'efüzyon hızı yalnızca mol kütlesine bağlıdır' diyor. Ayşe ise 'hayır, sıcaklığa da bağlıdır' diyor. Kinetik moleküler teoriye göre kim haklı?",
      options: [
        "Ali haklı; sıcaklığın hiçbir etkisi yoktur",
        "İkisi de yanlış; efüzyon hızı yalnızca basınca bağlıdır",
        "Ayşe haklı; gaz taneciklerinin ortalama kinetik enerjisi sıcaklıkla doğru orantılıdır, bu yüzden sıcaklık arttıkça hız da artar — Graham Yasası yalnızca AYNI sıcaklıkta iki gazı karşılaştırırken mol kütlesini öne çıkarır",
        "İkisi de haklı ama farklı gazlar için geçerlidir",
        "Ayşe haklı ama yalnızca sıvı hâldeki gazlar için; gaz hâlinde sıcaklığın etkisi yoktur",
      ],
      correct: 2,
      explain: "Kinetik moleküler teoriye göre gaz taneciklerinin ortalama kinetik enerjisi mutlak sıcaklıkla doğru orantılıdır; bu yüzden sıcaklık da hızı etkiler. Graham Yasası, sıcaklık AYNI tutulduğunda mol kütlesinin etkisini karşılaştırmaya odaklanır.",
    },
    {
      context: "Sızdıran Tüp mü, Kokusu Yayılan Oda mı?",
      text: "Sıkıştırılmış CO₂ dolu sızdırmaz bir tüp, küçük bir valften CO₂ içermeyen boş bir odaya yavaşça gaz kaçırıyor. Bir öğrenci 'bu da konsantrasyon farkından kaynaklanan bir difüzyondur, tıpkı parfüm kokusunun yayılması gibi' diyor. Bu görüşteki eksiklik nedir?",
      options: [
        "Eksiklik yok, öğrenci tamamen haklıdır",
        "CO₂ hiçbir koşulda difüze veya efüze olamaz",
        "Bu olay yalnızca sıvılar için geçerli bir kavramdır, gazlarla ilgisi yoktur",
        "Bu olay efüzyondur: kaçış küçük bir delikten, iki bölge arasındaki BASINÇ farkı nedeniyle olur; difüzyon ise genellikle bir bariyer olmadan, KONSANTRASYON farkından kaynaklanan karışmadır",
        "Öğrenci haklıdır ama olay adı 'yayılma' olmalıdır, difüzyon yanlış bir terimdir",
      ],
      correct: 3,
      explain: "Efüzyon, sıkışmış gazın küçük bir delikten kaçmasıdır ve basınç farkıyla oluşur/kolaylaşır; difüzyon ise genellikle bir bariyer olmaksızın konsantrasyon farkından kaynaklanan karışmadır. Tüpten kaçış senaryosu (küçük delik + basınç farkı) efüzyona örnektir.",
    },
    {
      context: "He ile SO₂'nin Efüzyon Yarışı",
      text: "Efüzyon hızlarının oranının mol kütlelerinin kareköküyle ters orantılı olduğu bilinmektedir (hafif gaz, ağır gaza göre √(M_ağır/M_hafif) kat hızlı efüze olur). Aynı sıcaklıkta M=4 g/mol olan He gazı, M=64 g/mol olan SO₂ gazından kaç kat hızlı efüze olur?",
      options: ["2 kat", "8 kat", "16 kat", "0,25 kat", "4 kat"],
      correct: 4,
      explain: "r_He/r_SO2 = √(M_SO2/M_He) = √(64/4) = √16 = 4. He, SO₂'den 4 kat hızlı efüze olur.",
    },
    {
      context: "Efüzyon Süresi Neyi Gösterir?",
      text: "Aynı koşullarda eşit miktardaki X gazının efüzyonla tamamen boşalması, Y gazınınkinden 3 kat daha uzun sürüyor (yani X, Y'den 3 kat daha YAVAŞ efüze oluyor). Y gazının mol kütlesi 8 g/mol olduğuna göre X gazının mol kütlesi kaç g/mol'dür?",
      options: ["72 g/mol", "24 g/mol", "8/3 g/mol", "3 g/mol", "64 g/mol"],
      correct: 0,
      explain: "Efüzyon SÜRESİ, hızla TERS orantılıdır: X 3 kat yavaş efüze oluyorsa r_X/r_Y=1/3. Graham Yasası'ndan r_X/r_Y=√(M_Y/M_X) ⇒ 1/3=√(8/M_X) ⇒ 1/9=8/M_X ⇒ M_X=72 g/mol.",
    },
    {
      context: "İki Balon, Aynı Süre",
      balloons: {
        caption: "Aynı boyutta, aynı ince gözenekli kauçuktan yapılmış iki balon aynı odada aynı süre bekletiliyor.",
        balloons: [
          { label: "He (M=4)", color: "#5b8dff", sizeRatio: 0.55, sub: "Belirgin şekilde küçülmüş" },
          { label: "Ar (M=40)", color: "#ff5b7f", sizeRatio: 0.92, sub: "Neredeyse aynı boyutta" },
        ],
      },
      text: "Şekildeki gözleme göre He dolu balonun Ar dolu balondan çok daha fazla küçülmesinin nedeni nedir?",
      options: [
        "He, mol kütlesi küçük olduğu için gözeneklerden Ar'dan daha hızlı efüze olur",
        "He balonun kauçuğunu eritir",
        "Ar havadan ağır olduğu için balonun içinde birikip kalır",
        "He ile Ar arasında kimyasal tepkime olur",
        "İki balon da aynı hızda küçülür, gözlem yanıltıcıdır",
      ],
      correct: 0,
      explain: "Graham Yasası'na göre efüzyon hızı 1/√M ile orantılıdır. He'nin mol kütlesi (4) Ar'ınkinden (40) çok küçük olduğundan He tanecikleri gözeneklerden çok daha hızlı kaçar; bu yüzden He balonu aynı sürede belirgin şekilde küçülür.",
    },
    {
      context: "Doğru mu, Yanlış mı?",
      statements: {
        intro: "Difüzyon ve efüzyon ile ilgili aşağıdaki önermeleri değerlendiriniz.",
        statements: [
          "Aynı sıcaklıkta, mol kütlesi küçük olan tanecikler difüzyon ve efüzyonda daha hızlı yayılır.",
          "Efüzyon, bir gazın bariyer olmaksızın başka bir gazla karışmasıdır.",
          "Aynı sıcaklıkta iki farklı gazın tanecik başına ortalama kinetik enerjisi birbirine eşittir.",
        ],
      },
      text: "Yukarıdaki önermelerden hangileri doğrudur?",
      options: ["Yalnız I", "I ve III", "I, II ve III", "Yalnız III", "II ve III"],
      correct: 1,
      explain: "I doğrudur (Graham Yasası). II yanlıştır: tarif edilen olay difüzyondur, efüzyon küçük bir delikten kaçıştır. III doğrudur: aynı sıcaklıkta tüm gazların ortalama kinetik enerjisi (½mv²'nin ortalaması) mol kütlesinden bağımsız olarak eşittir — hız farkı kütleden kaynaklanır. Doğru cevap: I ve III.",
    },
  ],
};

/* =========================================================
   QUIZ_RESERVE — "Yanlışlarım" yedek soru havuzu.
   Bir soru yanlış cevaplandığında önerilen "aynı kazanımdan
   başka bir soru dene" bağlantısı buradan seçilir. Bu sorular
   modül sayfalarında kart olarak GÖSTERİLMEZ; yalnızca yedek
   olarak sunulur — bu sayede önerilen soru, ekranda zaten
   görünen bir kartla asla aynı olmaz (bkz. quiz-engine.js
   renderQuiz → pickReplacement).
   ========================================================= */
export const QUIZ_RESERVE = {
  kmt: [
    {
      context: "Dağda Şişen Cips Paketi",
      text: "Deniz seviyesinde sızdırmaz şekilde paketlenmiş bir cips paketi, yüksek bir dağa çıkarıldığında şişer ve gergin hâle gelir; paketin içine dışarıdan hiç hava girmez. Bu gözlem KMT'ye göre nasıl açıklanır?",
      options: [
        "Yükseklikte dış atmosfer basıncı azaldığı için paket içindeki gaz tanecikleri daha az dirençle karşılaşır ve birbirinden uzaklaşarak paketi genleştirir",
        "Yükseklikte sıcaklık arttığı için gaz tanecikleri büyür",
        "Paket içindeki hava kimyasal tepkimeyle çoğalır",
        "Yükseklikte yer çekimi azaldığı için tanecikler dışa doğru itilir",
        "Paketin plastik malzemesi ısıdan genleşir, gazın bir ilgisi yoktur",
      ],
      correct: 0,
      explain: "Paket içindeki gaz miktarı sabit kalır; dışarıdaki atmosfer basıncı yükseklikle azaldığından paketin dışını iten kuvvet zayıflar, içerideki tanecikler daha az sıkışmış hâlde daha geniş bir hacme yayılır (genleşme).",
    },
    {
      context: "Helyum Balonu Neden Yükselir?",
      text: "Bir helyum balonu havada bırakıldığında kendiliğinden yukarı doğru yükselir, oysa aynı boyuttaki hava dolu bir balon yerinde kalır. Bu farkın temel nedeni gazların hangi özelliğidir?",
      options: ["Yoğunluk", "Sıkıştırılabilirlik", "Genleşme", "Karışabilirlik", "Basınç"],
      correct: 0,
      explain: "Helyumun mol kütlesi (M≈4) havanın ortalama mol kütlesinden (M≈29) çok küçüktür; bu yüzden helyum havadan daha az yoğundur ve balon kaldırma kuvvetiyle yukarı yükselir.",
    },
    {
      context: "Kapalı Kutuda Dağılan Renkli Buhar",
      text: "Kapalı bir kutuda serbest bırakılan renkli bir gaz, zaman içinde kutunun tamamına homojen şekilde dağılır; kutunun hiçbir köşesi boş kalmaz. Bu davranış gazların hangi özelliğini gösterir?",
      options: ["Karışabilirlik", "Yoğunluk", "Sıkıştırılabilirlik", "Genleşme", "Basınç"],
      correct: 0,
      explain: "Gaz tanecikleri, tanecikler arası boşluklarda serbestçe hareket ederek bulundukları ortamla kendiliğinden, her yöne homojen biçimde karışır; bu özelliğe karışabilirlik denir.",
    },
    {
      context: "Bisiklet Pompasıyla Su Sıkıştırmak Neden Zor?",
      text: "Ucu kapatılmış bir bisiklet pompası hava ile doluyken piston kolayca itilebilirken, aynı pompa suyla doldurulduğunda pistonu ittirmek neredeyse imkânsız hâle gelir. Bu fark KMT'ye göre nasıl açıklanır?",
      options: [
        "Gaz taneciklerinin arasında büyük boşluklar vardır ve bu boşluklar kolayca daraltılabilir; sıvıda tanecikler zaten birbirine çok yakın olduğundan sıkıştırmaya çok daha fazla direnç gösterilir",
        "Su moleküllerinin kütlesi hava moleküllerinden daha büyük olduğu için sıkışmaz",
        "Hava elektrikçe yüklüdür, su değildir",
        "Pompa yalnızca gazlar için tasarlanmıştır, suyla çalışmaz",
        "Su sıcaklığı hava sıcaklığından düşüktür, bu yüzden sıkışmaz",
      ],
      correct: 0,
      explain: "Gaz taneciklerinin arasındaki büyük boşluk kolayca daraltılabilirken, sıvıda tanecikler zaten birbirine çok yakın olduğundan sıkıştırmaya karşı çok daha fazla direnç gösterir.",
    },
    {
      context: "Üç Hâlin Karşılaştırılması",
      table: {
        caption: "Aynı maddenin katı, sıvı ve gaz hâllerinin bazı özellikleri.",
        headers: ["Özellik", "Katı", "Sıvı", "Gaz"],
        rows: [
          ["Şekil", "Sabit", "Kabın şeklini alır", "Kabın şeklini alır"],
          ["Hacim", "Sabit", "Sabit", "Kabı tamamen doldurur"],
          ["Sıkıştırılabilirlik", "Yok denecek kadar az", "Çok az", "Yüksek"],
          ["Tanecikler arası boşluk", "Çok küçük", "Küçük", "Çok büyük"],
        ],
      },
      text: "Tablodaki dört özellik karşılaştırıldığında, gazları katı ve sıvılardan en temel düzeyde ayıran ve diğer üç farkın da KÖKENİNİ oluşturan özellik hangisidir?",
      options: [
        "Sabit şekil",
        "Sabit hacim",
        "Tanecikler arası boşluğun çok büyük olması",
        "Kabın şeklini alması",
        "Renk"
      ],
      correct: 2,
      explain: "Gaz taneciklerinin arasındaki boşluk katı ve sıvıya göre çok daha büyüktür; şeklin/hacmin sabit olmaması ve yüksek sıkıştırılabilirlik doğrudan bu büyük boşluğun sonucudur.",
    },
    {
      context: "Kaç İfade Doğru?",
      checklist: {
        intro: "Gazlarla ilgili aşağıdaki ifadeleri değerlendir:",
        items: [
          "Gaz tanecikleri arasındaki boşluk katı ve sıvıya göre çok daha büyüktür.",
          "Bir gazın yoğunluğu sıcaklık ve basınçtan bağımsız, sabit bir değerdir.",
          "Gazlar bulundukları kabın tamamını doldurur.",
          "İki farklı gaz bir araya geldiğinde kendiliğinden, homojen şekilde karışır.",
          "Sabit hacimde sıcaklık arttıkça gaz taneciklerinin kabın duvarına çarpma sıklığı azalır.",
        ],
      },
      text: "Yukarıdaki 5 ifadeden kaç tanesi DOĞRUDUR?",
      options: ["2", "3", "5", "4", "1"],
      correct: 1,
      explain: "Doğru olanlar: 1 (büyük boşluk), 3 (kabı doldurma) ve 4 (karışabilirlik) — 3 ifade doğru. 2. ifade yanlıştır çünkü gazın yoğunluğu koşullara bağlı değişir. 5. ifade yanlıştır çünkü sıcaklık arttıkça çarpma sıklığı ARTAR, azalmaz.",
    },
    {
      context: "Ayşe ile Mert Tartışıyor",
      dialogue: {
        speakers: [
          { name: "Mert", text: "Bir gazın yoğunluğunu bir kez ölçersem, o gazı her zaman bu değerden tanırım — yoğunluk suda olduğu gibi ayırt edici bir özelliktir." },
          { name: "Ayşe", text: "Bence bu yanlış; çünkü gazın hacmi kolayca değişebiliyor." },
        ],
      },
      text: "Ayşe'nin itirazını KMT'ye dayanarak en iyi tamamlayan seçenek hangisidir?",
      options: [
        "Ayşe haksızdır, gazların da suyunki gibi sabit bir yoğunluğu vardır",
        "Gaz tanecikleri arasındaki büyük boşluk nedeniyle hacim sıcaklık ve basınçla kolayca değişir; aynı kütle farklı hacimlere yayılınca yoğunluk da değişir, bu yüzden yoğunluk gazlar için ayırt edici değildir",
        "Ayşe haklıdır ama nedeni gazların renksiz olmasıdır",
        "Yoğunluk yalnızca sıvılar için tanımlı bir kavramdır",
        "Gazların kütlesi sürekli değiştiği için yoğunluk ölçülemez"
      ],
      correct: 1,
      explain: "Gaz taneciklerinin arasındaki boşluk kolayca değiştiğinden (sıkıştırılabilirlik/genleşme), aynı kütledeki bir gazın hacmi de değişir; d=m/V olduğundan yoğunluk da değişir. Bu yüzden yoğunluk, katı/sıvılardaki gibi gazlar için sabit/ayırt edici bir özellik değildir.",
    },
    {
      context: "Özellik – Örnek Eşleştirmesi",
      matchPairs: {
        leftLabel: "Özellik",
        rightLabel: "Günlük Hayat Örneği",
        left: ["Basınç", "Yoğunluk", "Sıkıştırılabilirlik", "Karışabilirlik"],
        right: ["Uçakta iniş sırasında kulakların tıkanması", "LPG tüpü sızıntısında yere yakın yerlerin havalandırılması", "Dalış tüpüne normalden çok fazla hava sığdırılabilmesi", "Açılan bir parfüm kokusunun tüm odaya yayılması"],
      },
      text: "Yukarıdaki eşleştirmede 'Basınç' satırıyla ilişkilendirilen örnek, gaz taneciklerinin hangi davranışıyla açıklanır?",
      options: [
        "Taneciklerin kap/zar yüzeyine çarpma sıklığının dış ortama göre farklılaşmasıyla",
        "Taneciklerin renk değiştirmesiyle",
        "Taneciklerin birbirine yapışmasıyla",
        "Taneciklerin sabit bir hacimde donmasıyla",
        "Taneciklerin manyetik alan oluşturmasıyla"
      ],
      correct: 0,
      explain: "Basınç, gaz taneciklerinin bir yüzeye birim zamanda yaptığı çarpışmalardan doğar. Kabin basıncı hızla değişince kulak zarının iki tarafındaki çarpışma sıklığı (basınç) dengesizleşir ve rahatsızlık hissedilir.",
    },
    {
      context: "İki Balon, İki Sıcaklık",
      balloons: {
        caption: "Aynı miktarda hava içeren iki özdeş balon, biri sıcak biri soğuk ortamda bir süre bekletiliyor.",
        balloons: [
          { label: "Sıcak Ortam", color: "#ff8a3d", sizeRatio: 1.15, sub: "Belirgin şekilde büyümüş" },
          { label: "Soğuk Ortam", color: "#5b8dff", sizeRatio: 0.85, sub: "Küçülmüş" },
        ],
      },
      text: "Şekildeki gözlem, gazların hangi özelliğinin doğrudan bir sonucudur?",
      options: ["Yoğunluk", "Karışabilirlik", "Genleşme", "Sıkıştırılabilirlik", "Basınç"],
      correct: 2,
      explain: "Sıcaklık arttıkça gaz tanecikleri hızlanıp birbirinden uzaklaşır; bu genleşme balonun büyümesine, soğukta ise tanecikler yavaşlayıp birbirine yaklaştığından balon küçülür.",
    },
    {
      context: "Mol Kütlesi ve Yoğunluk",
      chart: {
        type: "bar",
        caption: "Aynı sıcaklık ve basınçta dört farklı gazın yoğunluğu (g/L).",
        series: [{
          label: "Yoğunluk",
          data: [
            { x: "H₂ (M=2)", y: 0.09, color: "#5b8dff" },
            { x: "He (M=4)", y: 0.18, color: "#2fb8c6" },
            { x: "N₂ (M=28)", y: 1.25, color: "#ff8a3d" },
            { x: "CO₂ (M=44)", y: 1.96, color: "#ff5b7f" },
          ],
        }],
        xLabel: "Gaz",
        yLabel: "Yoğunluk (g/L)",
        yDomain: [0, 2.2],
      },
      text: "Grafikteki dört gaz arasındaki yoğunluk sıralaması hangi ilkeyle açıklanır?",
      options: [
        "Aynı sıcaklık ve basınçta eşit hacimdeki gazlar eşit sayıda tanecik içerir (Avogadro ilkesi); mol kütlesi büyük olan gaz aynı hacimde daha ağır basar, dolayısıyla daha yoğundur",
        "Gazların rengi yoğunluklarını belirler",
        "Yoğunluk yalnızca sıcaklığa bağlıdır, mol kütlesinin etkisi yoktur",
        "Daha hızlı hareket eden tanecikler daha yoğundur",
        "Yoğunluk rastgele bir özelliktir, örüntü yoktur"
      ],
      correct: 0,
      explain: "Avogadro ilkesine göre aynı sıcaklık/basınçta eşit hacimdeki gazlar eşit tanecik sayısı içerir; mol kütlesi büyüdükçe aynı hacimdeki toplam kütle (dolayısıyla yoğunluk) artar — grafikteki sıralama tam olarak mol kütlesi sıralamasıyla örtüşür.",
    },
  ],

  yasalar: [
    {
      context: "Tıkalı Şırınga Deneyi",
      text: "Ucu parmakla kapatılmış bir şırıngada 1 atm basınçta 20 mL hava var. Piston itilip hacim 5 mL'ye düşürülürse (sıcaklık sabit), basınç kaç atm olur?",
      options: ["2 atm", "0,25 atm", "8 atm", "4 atm", "5 atm"],
      correct: 3,
      explain: "Sabit sıcaklıkta P₁V₁=P₂V₂ (Boyle Yasası) ⇒ 1 atm × 20 mL = P₂ × 5 mL ⇒ P₂ = 4 atm.",
    },
    {
      context: "Balonun Soğuk Depoda Küçülmesi",
      text: "Sabit basınçlı bir balonun hacmi 27°C'de 3 L'dir. Balon -73°C'deki bir soğuk hava deposuna konursa hacmi kaç L olur?",
      options: ["4,5 L", "1 L", "2 L", "3,5 L", "6 L"],
      correct: 2,
      explain: "T(K)=t(°C)+273 ⇒ T₁=300 K, T₂=200 K. Sabit basınçta V₁/T₁=V₂/T₂ (Charles Yasası) ⇒ 3/300 = V₂/200 ⇒ V₂ = 2 L.",
    },
    {
      context: "Deodorant Kutusu Isınırsa",
      text: "Rijit (sabit hacimli) bir deodorant kutusunun iç basıncı 27°C'de 3 atm'dir. Kutu güneşte kalıp sıcaklığı 127°C'ye çıkarsa iç basınç kaç atm olur?",
      options: ["2,25 atm", "4 atm", "3,5 atm", "5 atm", "1,8 atm"],
      correct: 1,
      explain: "T₁=300 K, T₂=400 K. Sabit hacimde P₁/T₁=P₂/T₂ (Gay-Lussac Yasası) ⇒ 3/300 = P₂/400 ⇒ P₂ = 4 atm.",
    },
    {
      context: "Şişirilen Deniz Yatağı",
      text: "Sabit sıcaklık ve basınçta 2 mol hava içeren şişme bir deniz yatağı 8 L hacim kaplıyor. Pompayla 1 mol daha hava eklenirse (toplam 3 mol) yeni hacim kaç L olur?",
      options: ["10 L", "16 L", "12 L", "6 L", "14 L"],
      correct: 2,
      explain: "Sabit P, T'de V/n=sabit (Avogadro Yasası) ⇒ 8/2 = V₂/3 ⇒ V₂ = 12 L.",
    },
    {
      context: "Boyle Yasasını Grafikten Okumak",
      chart: {
        type: "line",
        caption: "Sabit sıcaklıkta bir gazın farklı basınçlarda ölçülen hacmi.",
        series: [{
          label: "V (L)",
          color: "#5b8dff",
          data: [{ x: 1, y: 12 }, { x: 2, y: 6 }, { x: 3, y: 4 }, { x: 4, y: 3 }],
        }],
        xLabel: "Basınç (atm)",
        yLabel: "Hacim (L)",
        xDomain: [0, 4.5],
        yDomain: [0, 13],
      },
      text: "Grafikteki eğri, doğrusal bir ilişki DEĞİL, bir hiperbol (ters orantı eğrisi) biçimindedir. Bu şekil hangi yasayı ve hangi matematiksel ilişkiyi doğrudan gösterir?",
      options: [
        "Charles Yasası; V ile T doğru orantılıdır",
        "Boyle Yasası; sabit sıcaklıkta P ile V ters orantılıdır (P·V=sabit)",
        "Gay-Lussac Yasası; P ile T doğru orantılıdır",
        "Avogadro Yasası; V ile n doğru orantılıdır",
        "Hiçbiri; grafik rastgele noktalardan oluşur"
      ],
      correct: 1,
      explain: "Her noktada P×V çarpımını hesaplarsan (1×12=12, 2×6=12, 3×4=12, 4×3=12) hep aynı sabiti bulursun — bu, Boyle Yasası'nın (sabit T'de P·V=sabit) grafiksel imzasıdır.",
    },
    {
      context: "Charles Yasasını Grafikten Okumak",
      chart: {
        type: "line",
        caption: "Sabit basınçta bir gazın farklı sıcaklıklarda ölçülen hacmi.",
        series: [{
          label: "V (L)",
          color: "#ff8a3d",
          data: [{ x: 100, y: 1 }, { x: 200, y: 2 }, { x: 300, y: 3 }, { x: 400, y: 4 }],
        }],
        xLabel: "Sıcaklık (K)",
        yLabel: "Hacim (L)",
        xDomain: [0, 450],
        yDomain: [0, 4.5],
      },
      text: "Grafikteki doğru orijinden geçmektedir. Bu, Charles Yasası'nın hangi koşulu için geçerlidir ve doğrunun orijinden geçmesi neyi kanıtlar?",
      options: [
        "Yalnızca sıcaklık °C cinsinden ölçüldüğünde geçerlidir",
        "Sıcaklık MUTLAK (Kelvin) ölçekte kullanıldığında V∝T doğru orantısı geçerlidir; doğrunun orijinden geçmesi V/T oranının sabit kaldığını gösterir",
        "Yalnızca gaz sıvı hâle geçtiğinde geçerlidir",
        "Basınç değiştiği için geçerlidir",
        "Grafik yalnızca tesadüfen orijinden geçer, bir anlamı yoktur"
      ],
      correct: 1,
      explain: "Charles Yasası V/T=sabit (sabit P, mutlak sıcaklıkta) şeklindedir; doğru orantı ilişkilerinin grafiği her zaman orijinden geçer. °C ölçeği kullanılsaydı doğru orijinden geçmezdi.",
    },
    {
      context: "Dört Yasa, Dört Kural",
      table: {
        caption: "Gaz yasalarının sabit tuttuğu ve değiştirdiği nicelikler.",
        headers: ["Yasa", "Sabit Tutulan", "İlişki"],
        rows: [
          ["Boyle", "n, T", "P ile V ters orantılı"],
          ["Charles", "n, P", "V ile T doğru orantılı"],
          ["Gay-Lussac", "n, V", "P ile T doğru orantılı"],
          ["Avogadro", "P, T", "V ile n doğru orantılı"],
        ],
      },
      text: "Tabloya göre, sabit HACİMDE bir gaz kabı ısıtılırsa iç basıncın artması hangi yasayla açıklanır?",
      options: ["Boyle Yasası", "Charles Yasası", "Gay-Lussac Yasası", "Avogadro Yasası", "Hiçbiri"],
      correct: 2,
      explain: "Gay-Lussac Yasası, sabit n ve V'de P ile T'nin doğru orantılı olduğunu söyler — bu yüzden rijit (sabit hacimli) bir kap ısıtıldığında iç basınç artar.",
    },
    {
      context: "Doğru mu, Yanlış mı?",
      statements: {
        intro: "Gaz yasalarıyla ilgili aşağıdaki önermeleri değerlendir:",
        statements: [
          "Boyle Yasası, sabit sıcaklık ve mol sayısında geçerlidir.",
          "Charles Yasası'nda sıcaklık mutlaka Kelvin cinsinden kullanılmalıdır.",
          "Avogadro Yasası, sabit hacim ve sıcaklıkta mol sayısı ile basınç arasındaki ilişkiyi tanımlar.",
        ],
      },
      text: "Yukarıdaki önermelerden hangileri DOĞRUDUR?",
      options: ["Yalnız I", "I ve II", "I, II ve III", "Yalnız III", "II ve III"],
      correct: 1,
      explain: "I doğrudur (Boyle Yasası'nın koşulu). II doğrudur (V/T oranı yalnızca mutlak sıcaklıkta anlamlıdır). III yanlıştır: Avogadro Yasası sabit BASINÇ ve SICAKLIKTA V ile n arasındaki ilişkiyi tanımlar, hacim ile mol sayısı arasındadır — basınçla değil. Doğru cevap: I ve II.",
    },
    {
      context: "Zeynep ile Kaan Tartışıyor",
      dialogue: {
        speakers: [
          { name: "Kaan", text: "Bir balonu ısıtırsak hem hacmi hem basıncı artar, ikisi de aynı anda büyür." },
          { name: "Zeynep", text: "Balon esnek olduğu için durum biraz farklı bence..." },
        ],
      },
      text: "Zeynep'in itirazını tamamlayan en doğru açıklama hangisidir?",
      options: [
        "Kaan tamamen haklıdır, esnekliğin bir önemi yoktur",
        "Esnek bir balonda dış basınç sabit kaldığından ısıtınca iç basınç neredeyse sabit kalır, bunun yerine Charles Yasası gereği hacim artar; basınç artışı ancak balon esnemeyi bırakırsa (rijit hâle gelirse) belirginleşir",
        "Balon ısıtıldığında yalnızca rengi değişir",
        "Esnek balonlarda gaz yasaları geçerli değildir",
        "Balon ısıtıldığında mol sayısı azaldığı için hacim küçülür"
      ],
      correct: 1,
      explain: "Esnek bir balonda iç basınç, dış atmosfer basıncına yakın kalmaya eğilimlidir (sabit P); bu koşulda ısıtma öncelikle Charles Yasası'na göre hacmi artırır. Basıncın da belirgin şekilde artması için balonun artık esneyemediği (hacminin sabitlendiği) bir noktaya gelmesi gerekir — o zaman devreye Gay-Lussac Yasası girer.",
    },
    {
      context: "Isıtılan İki Özdeş Kap",
      gasContainer: {
        caption: "Aynı hacimli iki kapalı (sabit hacimli, rijit) kapta eşit miktarda gaz, farklı sıcaklıklarda tutuluyor.",
        vessels: [
          { label: "1. Kap (300 K)", kind: "fixed", particles: 12, gasColor: "#5b8dff", P: "1 atm", T: "300 K" },
          { label: "2. Kap (600 K)", kind: "fixed", particles: 12, gasColor: "#ff5b7f", P: "2 atm", T: "600 K" },
        ],
      },
      text: "Şekildeki iki kapta da tanecik sayısı ve hacim aynıyken, 2. kabın basıncının 1. kaptan tam 2 kat fazla olması hangi ilişkiyle uyumludur?",
      options: [
        "P/T = sabit (Gay-Lussac Yasası) — sıcaklık 2 katına çıkınca (300→600 K) basınç da 2 katına çıkar",
        "P×V = sabit (Boyle Yasası) — ama burada hacim sabit olduğu için bu yasa uygulanamaz",
        "V/n = sabit (Avogadro Yasası)",
        "Basınç sıcaklıktan tamamen bağımsızdır, bu bir tesadüftür",
        "Tanecik sayısı 2 katına çıktığı için basınç artmıştır"
      ],
      correct: 0,
      explain: "Sabit hacim ve mol sayısında P/T sabittir (Gay-Lussac Yasası): 1/300 = 2/600. Sıcaklık mutlak ölçekte 2 katına çıkınca taneciklerin ortalama kinetik enerjisi ve dolayısıyla duvara çarpma şiddeti/sıklığı artar, basınç da tam 2 katına çıkar.",
    },
  ],

  ideal: [
    {
      context: "Plastik Balonun İçindeki Hava",
      text: "Bir plastik balonun içinde 27°C sıcaklıkta, 2 atm basınç altında 12,3 L hava bulunuyor. R≈0,082 L·atm/(mol·K) alarak balondaki hava yaklaşık kaç moldür?",
      options: ["≈0,5 mol", "≈1 mol", "≈2 mol", "≈4 mol", "≈0,25 mol"],
      correct: 1,
      explain: "T=27+273=300 K. n=PV/(RT)=(2×12,3)/(0,082×300)=24,6/24,6≈1 mol.",
    },
    {
      context: "Küçük Gaz Tüpünün Basıncı",
      text: "Bir gaz tüpü 12,3 L hacminde, 27°C sıcaklıkta 1 mol azot gazı içeriyor. R≈0,082 L·atm/(mol·K) alarak tüpün iç basıncı kaç atm'dir?",
      options: ["1 atm", "4 atm", "2 atm", "0,5 atm", "3 atm"],
      correct: 2,
      explain: "T=300 K. P=nRT/V=(1×0,082×300)/12,3=24,6/12,3=2 atm.",
    },
    {
      context: "Denklemi Yeniden Düzenlemek",
      text: "Bir öğrenci PV=nRT denklemini n ve R sabitken P=(nR)·(T/V) şeklinde yeniden yazıyor. Bu düzenlemeye göre, sabit mol sayısında T/V oranı sabit tutulursa P için ne söylenebilir?",
      options: [
        "P de sabit kalır, çünkü P doğrudan T/V oranına bağlıdır",
        "P sürekli artar",
        "P sıfıra iner",
        "P yalnızca T'ye bağlıdır, V'nin etkisi yoktur",
        "Bu düzenleme fiziksel olarak anlamsızdır",
      ],
      correct: 0,
      explain: "n ve R sabitken P=(nR)·(T/V) olduğundan, T/V oranı sabit kaldığı sürece P de sabit kalır — örneğin hem sıcaklık hem hacim aynı oranda artarsa basınç değişmez.",
    },
    {
      context: "Yüksek Basınçlı Doğal Gaz Deposu",
      text: "Endüstriyel bir doğal gaz deposunda gaz çok yüksek basınç altında sıkıştırılarak saklanıyor. Bu koşullarda gerçek gaz davranışının ideal gaz denkleminden sapması beklenir mi, beklenirse neden?",
      options: [
        "Evet; yüksek basınçta tanecikler birbirine çok yaklaşır, tanecik hacmi ve aralarındaki çekim kuvvetleri artık ihmal edilemez hâle gelir",
        "Hayır, basınç ideal gaz davranışını hiç etkilemez",
        "Evet ama yalnızca çok düşük basınçta sapma olur, yüksek basınçta olmaz",
        "Hayır; sapma yalnızca sıcaklık değiştiğinde görülür",
        "Evet; yüksek basınçta gaz kimyasal olarak bozunur",
      ],
      correct: 0,
      explain: "Yüksek basınçta gaz tanecikleri birbirine çok yaklaşır; ideal gaz varsayımının göz ardı ettiği tanecik hacmi ve tanecikler arası çekim kuvvetleri bu koşulda artık ihmal edilemez, bu yüzden gerçek gaz davranışı idealden sapar.",
    },
    {
      context: "Hangi Gaz İdeale En Yakın?",
      table: {
        caption: "Dört farklı gazın bulunduğu koşullar.",
        headers: ["Gaz", "Basınç", "Sıcaklık", "Mol Kütlesi"],
        rows: [
          ["K", "50 atm", "200 K", "44 g/mol"],
          ["L", "0,5 atm", "500 K", "2 g/mol"],
          ["M", "1 atm", "300 K", "28 g/mol"],
          ["N", "80 atm", "250 K", "146 g/mol"],
        ],
      },
      text: "Tablodaki dört gazdan hangisi ideal gaz davranışına EN YAKIN sonucu verir?",
      options: ["K", "L", "M", "N", "Hepsi eşit derecede idealdir"],
      correct: 1,
      explain: "Gazlar düşük basınç, yüksek sıcaklık ve küçük mol kütlesinde ideale en çok yaklaşır. L gazı (0,5 atm, 500 K, M=2 g/mol) bu üç koşulu birlikte en iyi sağlayan seçenektir.",
    },
    {
      context: "NŞ'de İki Farklı Gaz",
      gasContainer: {
        caption: "Normal şartlarda (0°C, 1 atm) eşit mol sayıdaki iki farklı gaz.",
        vessels: [
          { label: "1 mol He", kind: "fixed", particles: 14, gasColor: "#5b8dff", P: "1 atm", T: "273 K", V: "≈22,4 L" },
          { label: "1 mol CO₂", kind: "fixed", particles: 14, gasColor: "#ff5b7f", P: "1 atm", T: "273 K", V: "≈22,4 L" },
        ],
      },
      text: "Şekildeki iki kabın hacminin birbirine eşit çıkmasının nedeni nedir?",
      options: [
        "İdeal gaz denkleminde molar kütle yer almaz; aynı n, P, T'de tüm ideal gazlar aynı hacmi kaplar",
        "He ve CO₂'nin molar kütleleri tesadüfen birbirine çok yakındır",
        "Her iki gaz da aynı renktedir",
        "Kaplar aynı malzemeden yapıldığı için hacimleri eşitlenir",
        "Bu bir ölçüm hatasıdır, gerçekte hacimler farklı olmalıdır"
      ],
      correct: 0,
      explain: "PV=nRT'de yalnızca n, P, T yer alır — molar kütle (M) denklemde hiç geçmez. Bu yüzden aynı n, P, T koşulunda hangi ideal gaz olursa olsun aynı hacmi kaplar (NŞ'de ≈22,4 L/mol).",
    },
    {
      context: "İzotermleri Karşılaştırmak",
      chart: {
        type: "line",
        caption: "Aynı miktardaki bir gazın iki farklı sabit sıcaklıkta (izoterm) P-V eğrileri.",
        series: [
          { label: "T = 300 K", color: "#5b8dff", data: [{ x: 2, y: 12 }, { x: 4, y: 6 }, { x: 6, y: 4 }, { x: 8, y: 3 }] },
          { label: "T = 500 K", color: "#ff5b7f", data: [{ x: 2, y: 20 }, { x: 4, y: 10 }, { x: 6, y: 6.7 }, { x: 8, y: 5 }] },
        ],
        xLabel: "Basınç (atm)",
        yLabel: "Hacim (L)",
        xDomain: [0, 9],
        yDomain: [0, 22],
      },
      text: "Grafikte aynı basınç değerinde, 500 K eğrisinin hacmi her zaman 300 K eğrisinden daha büyüktür. Bu gözlem PV=nRT ile nasıl açıklanır?",
      options: [
        "Sabit n ve P'de V, T ile doğru orantılıdır (V=nRT/P); sıcaklık arttıkça aynı basınçta hacim de artar",
        "Sıcaklık arttıkça mol sayısı azalır, bu yüzden hacim artar",
        "Bu bir ölçüm hatasıdır, iki eğri de aynı olmalıdır",
        "Sabit basınçta sıcaklığın hacimle hiçbir ilgisi yoktur",
        "Yüksek sıcaklıkta gaz sıvılaşıp hacmi büyütür"
      ],
      correct: 0,
      explain: "V=nRT/P ifadesinde n ve P sabit tutulduğunda V, T ile doğru orantılıdır. Bu yüzden aynı basınç değerinde daha yüksek sıcaklıktaki izoterm (500 K) her zaman daha büyük bir hacme karşılık gelir.",
    },
    {
      context: "Yükselen Balon, Büyüyen Balon",
      balloons: {
        caption: "Bir meteoroloji balonu yerden yükseldikçe dış basınç azalır; balonun boyutu gözlemleniyor.",
        balloons: [
          { label: "Yerde (1 atm)", color: "#5b8dff", sizeRatio: 0.6, sub: "Küçük, sıkı" },
          { label: "Yüksekte (0,25 atm)", color: "#ff5b7f", sizeRatio: 1.3, sub: "Büyük, gergin" },
        ],
      },
      text: "Balonun içindeki gaz miktarı (n) ve sıcaklığı (T) yaklaşık sabit kabul edilirse, balonun yükseldikçe büyümesi ideal gaz denkleminin hangi biçimiyle açıklanır?",
      options: [
        "Sabit n, T'de V, 1/P ile doğru orantılıdır (V=nRT/P); dış basınç azaldıkça iç basınç da azalır ve hacim büyür",
        "Sabit n, T'de V, P ile doğru orantılıdır",
        "Yükseklikle mol sayısı artar, bu yüzden hacim büyür",
        "Yükseklikte sıcaklık çok arttığı için balon büyür",
        "Balonun büyümesi ideal gaz denklemiyle açıklanamaz"
      ],
      correct: 0,
      explain: "V=nRT/P'de n ve T sabitken V, P ile ters (1/P ile doğru) orantılıdır. Yükseklikle dış/iç basınç azaldıkça aynı miktardaki gaz daha büyük bir hacme yayılır ve balon şişer.",
    },
    {
      context: "İdeal Gaz Modelinin Varsayımları",
      checklist: {
        intro: "İdeal gaz modeli için aşağıdaki varsayımları değerlendir:",
        items: [
          "Gaz taneciklerinin kendi hacmi, kabın hacmine göre ihmal edilebilir kabul edilir.",
          "Tanecikler arasında çekim veya itme kuvveti olmadığı varsayılır.",
          "Tanecikler birbirleriyle ve kap duvarıyla esnek çarpışma yapar.",
          "Gaz taneciklerinin rengi hesaba katılır.",
          "Taneciklerin ortalama kinetik enerjisi yalnızca mutlak sıcaklığa bağlıdır.",
        ],
      },
      text: "Yukarıdaki 5 ifadeden kaç tanesi ideal gaz modelinin GERÇEK varsayımlarındandır?",
      options: ["2", "3", "5", "4", "1"],
      correct: 3,
      explain: "1, 2, 3 ve 5. ifadeler ideal gaz modelinin temel varsayımlarıdır (4 tanesi). 4. ifade (renk) fiziksel olarak anlamsızdır ve modelin bir parçası değildir.",
    },
    {
      context: "R Sabitinin Farklı Birimleri",
      matchPairs: {
        leftLabel: "Birim",
        rightLabel: "Sayısal Değer",
        left: ["L·atm/(mol·K)", "J/(mol·K)", "cal/(mol·K)", "L·torr/(mol·K)"],
        right: ["8,314", "0,082", "62,36", "1,987"],
      },
      text: "R sabitinin hangi birimdeki değeri, bu simülasyonda hesaplamalarda kullanılan değerdir?",
      options: ["8,314", "62,36", "1,987", "0,082", "Hepsi aynı sayısal değere sahiptir"],
      correct: 3,
      explain: "R'nin sayısal değeri kullanılan birime göre değişir (R birimden bağımsız TEK bir sabittir, yalnızca ifade edildiği birim değişir). Bu simülasyonda ve hesaplamalarda R≈0,082 L·atm/(mol·K) kullanılır.",
    },
    {
      context: "Deniz ile Efe Tartışıyor",
      dialogue: {
        speakers: [
          { name: "Deniz", text: "PV=nRT her koşulda, her gaz için tam olarak doğru sonuç verir; ideal gaz denklemi mükemmel bir modeldir." },
          { name: "Efe", text: "Hocamız gerçek gazların bazı koşullarda idealden saptığını söylemişti..." },
        ],
      },
      text: "Efe'nin itirazını destekleyen en doğru açıklama hangisidir?",
      options: [
        "Deniz haklıdır, ideal gaz denklemi istisnasız her koşulda geçerlidir",
        "İdeal gaz denklemi tanecik hacmini ve tanecikler arası çekim kuvvetlerini yok sayar; yüksek basınç ve düşük sıcaklıkta bu ihmaller geçersiz hâle gelir ve gerçek gazlar PV=nRT'den sapar",
        "Efe haklıdır ama nedeni gazların renkli olmasıdır",
        "İdeal gaz denklemi yalnızca soy gazlar için geçerlidir",
        "Sapma yalnızca gaz karışımlarında görülür, saf gazlarda hiç görülmez"
      ],
      correct: 1,
      explain: "İdeal gaz denklemi, tanecik hacmini sıfır ve tanecikler arası kuvvetleri yok sayan basitleştirilmiş bir modeldir. Yüksek basınç (tanecikler sıkışık) ve düşük sıcaklıkta (tanecikler yavaş, çekim kuvvetleri etkili) bu varsayımlar geçersizleşir ve gerçek gaz davranışı idealden sapar.",
    },
  ],

  difuzyon: [
    {
      context: "Metan mı, Karbondioksit mi Daha Hızlı?",
      text: "Aynı sıcaklıkta metan (CH₄, M=16) ile karbondioksit (CO₂, M=44) gazlarının efüzyon hızları karşılaştırıldığında, metan CO₂'den kaç kat daha hızlı efüze olur? (√(44/16)≈1,66 alınız)",
      options: ["1,66 kat", "2,75 kat", "0,6 kat", "4 kat", "1 kat"],
      correct: 0,
      explain: "Graham Yasası'na göre r_CH4/r_CO2=√(M_CO2/M_CH4)=√(44/16)≈1,66. Metan, CO₂'den yaklaşık 1,66 kat daha hızlı efüze olur.",
    },
    {
      context: "Zamanla Sönen Parti Balonu",
      text: "Lastik bir parti balonu havayla şişirilip bağlandıktan birkaç gün sonra kendiliğinden küçülür; balonun yüzeyinde gözle görülür bir delik yoktur. Bu olay hangi kavramla açıklanır?",
      options: [
        "Efüzyon; balonun mikroskobik gözeneklerinden gaz taneciklerinin tek tek sızmasıyla",
        "Difüzyon; balonun içindeki gaz kendi kendine yok olur",
        "Yoğunlaşma; gaz sıvıya dönüşüp buharlaşır",
        "Genleşme; balon içindeki hava küçülür",
        "Bu olayla KMT'nin bir ilgisi yoktur, yalnızca lastik yorulmasıdır",
      ],
      correct: 0,
      explain: "Lastiğin mikroskobik gözeneklerinden gaz taneciklerinin basınç farkı nedeniyle tek tek kaçması efüzyon olarak adlandırılır.",
    },
    {
      context: "Efüzyon Yarışı: O₂ ve H₂",
      text: "Aynı koşullarda eşit hacimdeki O₂ (M=32) ve H₂ (M=2) gazlarının tamamen efüze olma süreleri karşılaştırılıyor. H₂, O₂'den kaç kat daha hızlı efüze olur?",
      options: ["4 kat", "2 kat", "16 kat", "0,25 kat", "8 kat"],
      correct: 0,
      explain: "r_H2/r_O2=√(M_O2/M_H2)=√(32/2)=√16=4. H₂, O₂'den 4 kat daha hızlı efüze olur.",
    },
    {
      context: "Doğru Terim Hangisi?",
      text: "Bir laboratuvar raporunda 'gaz, ince bir gözenekten boşluğa doğru kaçtı' cümlesindeki olay için en doğru terim hangisidir?",
      options: ["Difüzyon", "Efüzyon", "Konveksiyon", "Yoğunlaşma", "Süblimleşme"],
      correct: 1,
      explain: "Efüzyon, bir gazın küçük bir delik veya gözenekten boşluğa ya da düşük basınçlı bir bölgeye kaçmasıdır; tarif edilen olay tam olarak budur.",
    },
    {
      context: "Dört Gazın Efüzyon Hızı",
      chart: {
        type: "bar",
        caption: "Aynı sıcaklık ve basınçta dört gazın bağıl efüzyon hızı (H₂'ye göre normalize edilmiş, H₂=1).",
        series: [{
          label: "Bağıl Hız",
          data: [
            { x: "H₂ (M=2)", y: 1, color: "#5b8dff" },
            { x: "He (M=4)", y: 0.71, color: "#2fb8c6" },
            { x: "O₂ (M=32)", y: 0.25, color: "#ff8a3d" },
            { x: "CO₂ (M=44)", y: 0.21, color: "#ff5b7f" },
          ],
        }],
        xLabel: "Gaz",
        yLabel: "Bağıl Efüzyon Hızı",
        yDomain: [0, 1.1],
      },
      text: "Grafikteki bağıl hız sıralaması hangi ilişkiyle birebir uyumludur?",
      options: [
        "Efüzyon hızı, mol kütlesinin kareköküyle TERS orantılıdır (Graham Yasası) — mol kütlesi küçüldükçe hız artar",
        "Efüzyon hızı, mol kütlesiyle doğru orantılıdır",
        "Efüzyon hızı yalnızca gazın rengine bağlıdır",
        "Tüm gazlar aynı sıcaklıkta her zaman aynı hızda efüze olur",
        "Efüzyon hızı yalnızca basınca bağlıdır, mol kütlesinin etkisi yoktur"
      ],
      correct: 0,
      explain: "Graham Yasası'na göre r∝1/√M'dir. H₂ (M=2) en küçük mol kütlesine sahip olduğundan en hızlı efüze olur; mol kütlesi arttıkça (He→O₂→CO₂) hız azalır — grafikteki sıralama bu ters orantıyı birebir yansıtır.",
    },
    {
      context: "He ile SF₆'nın Balon Yarışı",
      balloons: {
        caption: "Aynı boyuttaki iki gözenekli balon, biri He (M=4) biri SF₆ (M=146) ile doldurulup aynı süre bekletiliyor.",
        balloons: [
          { label: "He (M=4)", color: "#5b8dff", sizeRatio: 0.35, sub: "Neredeyse tamamen sönmüş" },
          { label: "SF₆ (M=146)", color: "#ff5b7f", sizeRatio: 0.97, sub: "Neredeyse aynı boyutta" },
        ],
      },
      text: "İki balon arasındaki büyüklük farkının bu kadar belirgin olmasının nedeni nedir?",
      options: [
        "SF₆'nın mol kütlesi He'ninkinden ÇOK daha büyük olduğundan, Graham Yasası'na göre efüzyon hızı çok daha yavaştır ve balon neredeyse hiç sönmez",
        "SF₆ molekülleri kauçukla tepkimeye girer",
        "He balonun içinde sıvılaşır",
        "SF₆ havadan çok daha soğuktur",
        "İki balon da aslında aynı hızda söner, gözlem yanıltıcıdır"
      ],
      correct: 0,
      explain: "r_He/r_SF6 = √(146/4) ≈ 6 — He, SF₆'dan yaklaşık 6 kat daha hızlı efüze olur. Bu büyük fark, He balonunun hızla sönerken SF₆ balonunun neredeyse aynı boyutta kalmasını açıklar.",
    },
    {
      context: "Bölme Kalkınca Ne Olur?",
      gasContainer: {
        caption: "Ortadan çıkarılabilir bir bölmeyle ayrılmış kapta, sol tarafta X gazı, sağ tarafta boşluk var. Bölme kaldırılıyor.",
        vessels: [
          { label: "Bölme Kalkmadan Önce", kind: "fixed", particles: 16, gasColor: "#5b8dff", V: "Sol yarı dolu" },
          { label: "Bir Süre Sonra", kind: "fixed", particles: 16, gasColor: "#5b8dff", V: "Tüm kaba homojen dağılmış" },
        ],
      },
      text: "Şekildeki olay hangi kavramla adlandırılır ve gaz taneciklerini bu şekilde hareket ettiren nedir?",
      options: [
        "Difüzyon; tanecikler yüksek konsantrasyonlu bölgeden düşük konsantrasyonlu bölgeye doğru kendiliğinden, rastgele hareketleriyle yayılır",
        "Efüzyon; tanecikler yalnızca bir delikten tek tek geçer",
        "Yoğunlaşma; gaz sıvı hâle geçer",
        "Erime; katı gaz hâline geçer",
        "Bu olay yalnızca dış bir kuvvet uygulanırsa gerçekleşir"
      ],
      correct: 0,
      explain: "Bariyer olmaksızın bir gazın boşluğa ya da başka bir bölgeye kendiliğinden yayılması difüzyondur. Tanecikler rastgele (Brown) hareket ettiğinden istatistiksel olarak boş bölgeye doğru net bir yayılma gözlenir; dış kuvvete gerek yoktur.",
    },
    {
      context: "Gazları Efüzyon Hızına Göre Sıralamak",
      table: {
        caption: "Dört gazın mol kütlesi ve H₂'ye göre bağıl efüzyon hızı.",
        headers: ["Gaz", "Mol Kütlesi (g/mol)", "Bağıl Hız (H₂=1)"],
        rows: [
          ["H₂", 2, 1],
          ["N₂", 28, "≈0,27"],
          ["O₂", 32, "≈0,25"],
          ["Kr", 84, "≈0,15"],
        ],
      },
      text: "Tablodaki verilere göre, efüzyon hızı en YAVAŞ olan gaz hangisidir ve bu neden böyledir?",
      options: [
        "Kr; mol kütlesi en büyük olduğundan Graham Yasası'na göre (r∝1/√M) efüzyon hızı en düşüktür",
        "H₂; mol kütlesi en küçük olduğundan en yavaştır",
        "N₂; azot gazı her zaman en yavaş efüze olur",
        "Hepsi aynı hızda efüze olur, tablo yanlıştır",
        "O₂; oksijenin kimyasal aktifliği onu yavaşlatır"
      ],
      correct: 0,
      explain: "Graham Yasası'na göre efüzyon hızı mol kütlesinin kareköküyle ters orantılıdır. Kr'nin mol kütlesi (84) tablodaki en büyük değer olduğundan bağıl hızı da en düşüktür.",
    },
    {
      context: "Doğru mu, Yanlış mı?",
      statements: {
        intro: "Difüzyon ve efüzyonla ilgili aşağıdaki önermeleri değerlendir:",
        statements: [
          "Efüzyon, bir gazın küçük bir delikten düşük basınçlı bir bölgeye kaçmasıdır.",
          "Difüzyonun gerçekleşmesi için mutlaka bir basınç farkı gerekir.",
          "Aynı sıcaklıkta mol kütlesi küçük olan gaz, hem difüzyonda hem efüzyonda daha hızlıdır.",
        ],
      },
      text: "Yukarıdaki önermelerden hangileri DOĞRUDUR?",
      options: ["Yalnız I", "I ve III", "I, II ve III", "Yalnız III", "II ve III"],
      correct: 1,
      explain: "I doğrudur (efüzyonun tanımı). II yanlıştır: difüzyon genellikle bir bariyer/basınç farkı olmadan, yalnızca KONSANTRASYON farkıyla kendiliğinden gerçekleşir. III doğrudur (Graham Yasası her iki olay için de geçerlidir). Doğru cevap: I ve III.",
    },
    {
      context: "Terim – Tanım Eşleştirmesi",
      matchPairs: {
        leftLabel: "Terim",
        rightLabel: "Tanım",
        left: ["Difüzyon", "Efüzyon", "Graham Yasası", "Brown Hareketi"],
        right: ["Gaz taneciklerinin küçük bir delikten boşluğa kaçışı", "Bir gazın bariyersiz olarak başka bir ortama kendiliğinden yayılması", "Efüzyon/difüzyon hızının mol kütlesinin kareköküyle ters orantılı olması", "Gaz taneciklerinin sürekli, düzensiz, zikzaklı hareketi"],
      },
      text: "Yukarıdaki eşleştirmede 'Graham Yasası' ile ilişkilendirilen tanıma göre, mol kütlesi 4 KATINA çıkan bir gazın efüzyon hızı nasıl değişir?",
      options: ["Yarıya iner", "4 kat artar", "Değişmez", "2 katına çıkar", "16 kat azalır"],
      correct: 0,
      explain: "r∝1/√M olduğundan mol kütlesi 4 katına çıkarsa hız 1/√4 = 1/2 katına, yani yarıya iner.",
    },
    {
      context: "Ege ile Nil Tartışıyor",
      dialogue: {
        speakers: [
          { name: "Ege", text: "Difüzyon ve efüzyon aslında aynı şey; ikisi de gazın bir yerden başka bir yere hareketi." },
          { name: "Nil", text: "Aralarında önemli bir fark olduğunu düşünüyorum..." },
        ],
      },
      text: "Nil'in belirtmek istediği fark en doğru şekilde hangi seçenekte ifade edilmiştir?",
      options: [
        "Efüzyon, gazın küçük bir DELİKTEN boşluğa/düşük basınçlı bölgeye kaçışıdır; difüzyon ise genellikle bir bariyer olmadan, KONSANTRASYON farkından kaynaklanan karışmadır — ikisi de Graham Yasası'na uyar ama farklı fiziksel durumları tanımlar",
        "Ege haklıdır, aralarında hiçbir fark yoktur",
        "Difüzyon yalnızca sıvılarda, efüzyon yalnızca gazlarda gerçekleşir",
        "Efüzyon yalnızca yüksek sıcaklıkta, difüzyon yalnızca düşük sıcaklıkta gerçekleşir",
        "Fark yalnızca isimlendirmeden ibarettir, fiziksel bir ayrım yoktur"
      ],
      correct: 0,
      explain: "Efüzyon, sıkışmış bir gazın küçük bir delikten kaçışıdır (genellikle basınç farkıyla ilişkili); difüzyon ise bir bariyer olmaksızın konsantrasyon farkından kaynaklanan kendiliğinden karışmadır. İkisi de mol kütlesine bağlı olarak Graham Yasası'na uyar, ama tarif ettikleri fiziksel durumlar farklıdır.",
    },
  ],
};
