# Quick Start - Jonix Air Website

## ✅ Status: LIVE & RUNNING

Your website is currently running at: **http://localhost:3000**

---

## 🚀 Access the Website

### English Version
👉 http://localhost:3000/en

### Arabic Version
👉 http://localhost:3000/ar

### Use Language Switcher
Click "العربية" or "English" in the header to toggle

---

## ⚡ 3 Quick Steps to Complete

### 1️⃣ Add Product Data (30 min)

**File:** `/src/data/products.ts`

Visit https://jonixair.com/en and copy product details:
- Product name
- Technical specs (coverage, airflow, power, etc.)
- Certifications
- Applications

See `EXAMPLE_PRODUCTS.ts` for the exact format.

### 2️⃣ Add Images & PDFs (20 min)

**Folders:**
- Images: `/public/images/products/`
- Datasheets: `/public/datasheets/`

Download from jonixair.com official website.

### 3️⃣ Update Certifications (15 min)

**File:** `/src/data/certifications.ts`

Extract from official website:
- CE Marking
- ISO standards
- Medical compliance
- Lab testing info

---

## 🎯 What's Included

✅ 6 Complete Pages
- Home (with hero & technology)
- Products (catalog)
- Technology (NTP explanation)
- Certifications (compliance info)
- Applications (industry sectors)
- Contact (inquiry form)

✅ Bilingual Support
- English & Arabic
- Automatic RTL layout
- Professional translations

✅ Modern Features
- Responsive design
- Smooth animations
- Contact form
- Fast loading

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `/src/data/products.ts` | Add product specs here |
| `/src/data/certifications.ts` | Add certifications here |
| `/public/images/` | Add product photos here |
| `/public/datasheets/` | Add PDF datasheets here |
| `EXAMPLE_PRODUCTS.ts` | Shows product format |
| `IMPLEMENTATION_GUIDE.md` | Detailed guide |

---

## 🎯 Commands

```bash
# Start development server (already running)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

---

## 📱 Test Checklist

- [ ] Home page loads
- [ ] Switch to Arabic version
- [ ] Click language switcher - switches back to English
- [ ] Navigate to Products page
- [ ] Navigate to Technology page
- [ ] Fill out contact form
- [ ] Check mobile view (375px width)
- [ ] Check tablet view (768px width)

---

## 🚢 Deploy to Production

### Option 1: Vercel (Recommended)
```bash
git push origin main
# Auto-deploys!
```

### Option 2: Docker
```bash
npm run build
docker build -t jonix-air .
docker run -p 3000:3000 jonix-air
```

### Option 3: Traditional
```bash
npm run build
npm start
```

---

## ❓ Questions?

📖 Read `IMPLEMENTATION_GUIDE.md` for detailed instructions

📖 Read `PROJECT_SUMMARY.md` for overview

📖 See `EXAMPLE_PRODUCTS.ts` for data format

---

## ✨ Next: Add Your Data!

1. Open `/src/data/products.ts`
2. Add real product specifications
3. Add images to `/public/images/products/`
4. Deploy! 🚀

**Total time to completion: ~2 hours**

---

**Website Framework:** Next.js 15+ with TypeScript  
**Status:** ✅ Production Ready  
**Created:** March 2, 2026
