# Test Plan: Dijital Kartvizit (VCF) Olusturucu

Bu dokuman, PRD’de tanimlanan temel senaryolari manuel olarak dogrulamak icindir.

## Hazirlik

1. Uygulamayi calistirin: `python -m http.server 8000` ve `http://localhost:8000`
2. Tarayiciyi mobil gorunume gecirin (DevTools) veya telefonda deneyin

## Senaryo 1: Sadece ad + Instagram (URL seklinde)

1. `Ad` alanina bir deger girin
2. `Sosyal Medya URL (Instagram)` alanina `instagram.com/kullanici` (https olmadan) girin
3. Beklenen:
   - QR kod olusur
   - `Indir` butonu aktif olur
   - `.vcf` icinde `URL:https://instagram.com/kullanici` satiri bulunur

## Senaryo 2: Tum alanlar doluyken VCF indirme

1. Ad, Soyad, Telefon, E-posta, Is Unvani, Sirket, Sosyal Medya alanlarinin hepsini doldurun
2. Beklenen:
   - VCF onizleme alaninda satirlar gorunur
   - QR kod guncellenir
   - `Indir` ile indirilen dosya `BEGIN:VCARD` ile baslar ve `END:VCARD` ile biter

## Senaryo 3: Sadece telefon

1. Telefon alanini doldurun
2. Diger alanlari bos birakin
3. Beklenen:
   - QR kod olusur
   - VCF onizleme alaninda yalnizca telefon ile ilgili satir gorunur

## Senaryo 4: Sadece e-posta

1. E-posta alanini doldurun
2. Diger alanlari bos birakin
3. Beklenen:
   - QR kod olusur
   - VCF icinde `EMAIL;TYPE=INTERNET:` satiri bulunur

## Senaryo 5: Gecersiz sosyal medya URL

1. Sosyal medya alanina `instagram` veya `not-a-url` gibi gecersiz bir deger girin
2. En az bir diger alan doldurun (ornegin ad)
3. Beklenen:
   - VCF olusur (diger alanlara gore)
   - QR kod olusur
   - Status mesajinda URL formatini kontrol edin uyarisi gorunur

## Mobil/responsive kontrol noktasi

1. Ekran genisligini kucultun
2. Beklenen:
   - Form ve QR onizleme alanlari okunabilir kalir
   - Butonlar dokunmatik olarak kullanilabilir boyutta olur

## Performans/hiz kontrol noktasi

1. Bir input degistirin
2. Beklenen:
   - QR ve onizleme ani sekilde guncellenir (fark edilebilir gecikme olmamali)

