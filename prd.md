import os

# Define the content of the PRD in Markdown format
prd_content = """# 📄 PRD: Dijital Kartvizit (VCF) Oluşturucu

## 1. Proje Özeti
Bu proje, kullanıcıların iletişim bilgilerini ve sosyal medya linklerini içeren dijital bir kartvizit (VCF dosyası) oluşturmalarını ve bu dosyayı bir QR kod aracılığıyla kolayca paylaşmalarını sağlayan hafif bir web uygulamasıdır.

---

## 2. Hedefler ve Vizyon
- **Hız:** Kullanıcının 30 saniye içinde paylaşılabilir bir kartvizit oluşturması.
- **Esneklik:** Hiçbir alanın zorunlu tutulmaması (Minimum veri ile maksimum çıktı).
- **Erişilebilirlik:** Herhangi bir mobil cihazın kamerasından okunabilirlik.

---

## 3. Kullanıcı Hikayeleri (User Stories)
- **Kullanıcı olarak;** ismimi ve sadece Instagram linkimi girip bir QR kod almak istiyorum.
- **Kullanıcı olarak;** oluşturduğum QR kodu karşımdaki kişiye gösterip beni rehberine eklemesini sağlamak istiyorum.
- **Kullanıcı olarak;** "indir" butonuna basarak kendi VCF dosyamı telefonuma yedeklemek istiyorum.

---

## 4. Teknik Gereksinimler & Özellikler

### 4.1. Fonksiyonel Özellikler
- **Dinamik Form:** Ad, Soyad, Telefon, E-posta, İş Unvanı, Şirket ve Sosyal Medya (URL) alanları.
- **VCard (VCF) Üretimi:** Girilen verilerin vCard 3.0 veya 4.0 formatına dönüştürülmesi.
- **QR Kod Oluşturucu:** VCF içeriğinin anlık olarak QR koda basılması.
- **Önizleme:** QR kodun ekranda net bir şekilde gösterilmesi.

### 4.2. Teknik Yığın (Tech Stack - Önerilen)
- **Frontend:** HTML5, CSS3 (Tailwind CSS önerilir), JavaScript (Vanilla JS veya React).
- **Kütüphaneler:** - `qrcode.js` veya `react-qr-code`: QR kod üretimi için.
  - `vcard-creator`: Standartlara uygun VCF dosyası oluşturmak için.
- **Deployment:** Vercel, Netlify veya GitHub Pages (Statik bir site olacağı için ücretsizdir).

---

## 5. Tasarım Rehberi
- **Minimalist Yaklaşım:** Odak noktası form ve QR kod olmalı.
- **Mobil Öncelikli (Mobile First):** Uygulama çoğunlukla telefonlarda kullanılacağı için butonlar ve inputlar büyük, dokunmatik dostu olmalı.
- **Renk Paleti:** Sade ve profesyonel (Örn: Beyaz arka plan, koyu gri metinler, belirgin bir aksan rengi).

---

## 6. Yol Haritası (Milestones)
1. **Faz 1:** Temel HTML formunun ve "VCF generate" mantığının kurulması.
2. **Faz 2:** QR kod kütüphanesinin entegre edilmesi.
3. **Faz 3:** Tasarımın iyileştirilmesi (CSS/Responsive).
4. **Faz 4:** Canlıya alma (Deploy).

---

## 7. Gelecek Özellikler (V2)
- Profil fotoğrafı ekleme desteği.
- Çoklu dil desteği.
- QR kodun renklerini ve stilini özelleştirme.

---
**Hazırlayan:** Senior Full Stack Developer (Gemini)  
**Tarih:** 16 Nisan 2026
"""

# Create the file
file_path = "dijital-kartvizit-prd.md"
with open(file_path, "w", encoding="utf-8") as f:
    f.write(prd_content)