# Task List: Dijital Kartvizit (VCF) Olusturucu

## 1. Proje Kurulumu

- [x] Proje yapisini olustur
  - Uygulama icin temel frontend yapisini sec ve kur
  - Gerekli klasorleri olustur (`src`, `components`, `utils` gibi)
  - Gelistirme ve build komutlarini calisir hale getir
  - Kabul kriteri: Proje lokal ortamda hata vermeden acilir

- [x] Gerekli kutuphaneleri ekle
  - QR kod kutuphanesini projeye dahil et
  - VCF/vCard uretimi icin kullanilacak kutuphaneyi ekle veya utility yaz
  - Kabul kriteri: Bagimliliklar kurulduktan sonra proje derlenir

## 2. Temel Kullanici Akisi

- [x] Kartvizit formunu olustur
  - Ad alani ekle
  - Soyad alani ekle
  - Telefon alani ekle
  - E-posta alani ekle
  - Is unvani alani ekle
  - Sirket alani ekle
  - Sosyal medya URL alani ekle
  - Kabul kriteri: Tum alanlar opsiyonel olarak gorunur ve duzenlenebilir

- [x] Form state yonetimini kur
  - Input degisikliklerini anlik takip et
  - Bos alanlarin uygulamayi bozmamasini sagla
  - Kabul kriteri: Kullanici yalnizca tek bir alan doldursa bile akis calisir

- [x] VCF icerigi uretme mantigini yaz
  - Girilen verileri vCard 3.0 veya 4.0 formatina donustur
  - Bos alanlari dosyaya gereksiz sekilde ekleme
  - Telefon, e-posta ve URL alanlarini dogru satirlara yaz
  - Kabul kriteri: Uretilen metin rehbere eklenebilir gecerli bir VCF icerigi olur

## 3. QR Kod Deneyimi

- [x] VCF iceriginden QR kod olustur
  - Form verisi degistikce QR kodu yenile
  - Gecerli veri olmadiginda uygun bos durum goster
  - Kabul kriteri: Kullanici veri girdiginde QR kod anlik gorunur

- [x] QR kod onizleme alanini tasarla
  - QR kodu okunabilir boyutta goster
  - Mobil ekranlarda kirpilmayan bir yerlesim sagla
  - Kabul kriteri: Ortalama telefon ekraninda QR kod rahat okunur

## 4. Dosya Indirme ve Paylasim

- [x] VCF indirme ozelligini ekle
  - "Indir" butonu ekle
  - Uretilen vCard icerigini `.vcf` dosyasi olarak indir
  - Dosya adlandirmasini anlamli yap (`ad-soyad.vcf` gibi)
  - Kabul kriteri: Kullanici tek tikla cihazina VCF dosyasini indirebilir

- [x] Hata durumlarini ele al
  - Tum alanlar bos oldugunda gereksiz indirmeyi engelle veya yonlendir
  - Gecersiz URL gibi durumlar icin hafif geri bildirim ver
  - Kabul kriteri: Kullanici neden sonuc alamadigini anlayabilir

## 5. UI/UX ve Responsive Tasarim

- [x] Minimal ve mobil oncelikli arayuz olustur
  - Form ve QR kodu ayni ekranda sade sekilde konumlandir
  - Dokunmatik dostu input ve buton boyutlari kullan
  - Kabul kriteri: Arayuz telefon ekraninda rahat kullanilir

- [x] Tasarim sistemini uygula
  - Acik arka plan, koyu metin ve tek aksan rengi kullan
  - Bosluk, tipografi ve buton stillerini tutarli hale getir
  - Kabul kriteri: Ekran profesyonel ve duzenli gorunur

- [x] Erisilebilirlik iyilestirmeleri yap
  - Form etiketlerini inputlarla bagla
  - Buton ve aksiyonlara acik metinler ekle
  - Klavye ile temel kullanimi destekle
  - Kabul kriteri: Form temel erisilebilirlik beklentilerini karsilar

## 6. Kalite ve Dogrulama

- [x] Manuel test planini ekle (`TEST_PLAN.md`)

- [ ] Ana kullanici senaryolarini test et
  - Yalnizca ad + Instagram ile QR uretimi
  - Tum alanlar dolu iken VCF indirme
  - Sadece telefon veya sadece e-posta ile akisin calismasi
  - Kabul kriteri: PRD'deki temel user story'ler calisir

- [ ] Mobil cihaz uyumlulugunu kontrol et
  - Kucuk ekranlarda form yerlesimini test et
  - QR kod okunabilirligini kontrol et
  - Kabul kriteri: Arayuz farkli ekran genisliklerinde bozulmaz

- [ ] Performans ve hiz hedefini kontrol et
  - Ilk kullanimda akisin basit kalmasini sagla
  - Kullanici 30 saniye icinde kartvizit olusturabilsin
  - Kabul kriteri: Form akisi gereksiz adimlar icermeden hizli tamamlanir

## 7. Yayinlama

- [ ] Production build hazirla
  - Cevreye uygun build ayarlarini tamamla
  - Statik yayin icin gerekli ciktiyi dogrula
  - Kabul kriteri: Proje deploy edilmeye hazir hale gelir

- [ ] Uygulamayi canliya al
  - Vercel, Netlify veya GitHub Pages uzerinden yayinla
  - Gerekirse temel proje aciklamasini ekle
  - Kabul kriteri: Uygulama paylasilabilir bir URL uzerinden acilir

## 8. V2 Backlog

- [ ] Profil fotografi destegi ekle
- [ ] Coklu dil destegi ekle
- [ ] QR kod renk ve stil ozellestirme secenekleri ekle
