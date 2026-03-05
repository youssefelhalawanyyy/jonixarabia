# Jonix Air - Professional Bilingual Corporate Website

A modern, professional, fully bilingual (English & Arabic) corporate website for **Jonix Air** - advanced non-thermal plasma air purification systems for Egypt and the Middle East (MENA region).

## 🎯 Key Features

- **Bilingual Support**: Full English & Arabic with RTL layout support
- **Responsive Design**: Mobile-first optimization
- **Modern Animations**: Framer Motion for smooth interactions
- **Professional Branding**: Corporate blue scientific aesthetic
- **SEO Optimized**: Semantic HTML and structured data ready

## 🌍 Multilingual Pages

- Home (with hero and technology overview)
- Products Catalog
- Technology (NTP Deep Dive)
- Certifications & Compliance
- Industry Applications
- Contact & Technical Consultation

## 🛠️ Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **i18n**: next-intl (English & Arabic)
- **Animations**: Framer Motion
- **Forms**: React Hook Form

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

Visit `http://localhost:3000` - redirects to `/en` by default

## 📝 How to Add Real Data

### Products
1. Extract product information from https://jonixair.com/en
2. Edit `/src/data/products.ts` with:
   - Product name, description, specifications
   - Coverage area (m²), airflow (m³/h), power consumption
   - Dimensions, weight, voltage
   - Certifications, installation type

3. Add images to `/public/images/products/`
4. Add PDFs to `/public/datasheets/`

### Certifications
1. Extract from official website
2. Edit `/src/data/certifications.ts`
3. Add real certifications: CE, ISO, medical compliance, etc.

### Images
- Product photos: `/public/images/products/`
- Installations: `/public/images/installations/`
- Industry environments: `/public/images/environments/`

## 🌐 Language Switching

- Default: English `/en`
- Arabic: `/ar`
- Toggle in header
- Automatic RTL layout switching

## 📱 Pages

- **/** → Home page (redirects to `/en`)
- **/en** → English home
- **/ar** → Arabic home
- **/[locale]/products** → Product catalog
- **/[locale]/technology** → NTP technology
- **/[locale]/certifications** → Compliance info
- **/[locale]/applications** → Industry solutions
- **/[locale]/contact** → Inquiry form

## 📞 Contact Form

Includes:
- Name, email, phone validation
- Company and sector selection
- MENA country dropdown (Egypt, UAE, Saudi Arabia, etc.)
- Custom message
- Auto-responses in selected language

## 🎨 Design System

**Colors:**
- Primary Blue: `#003d7a`
- Light Blue: `#0056b3`
- Dark Blue: `#002847`
- Accent: `#0099cc`
- Background: `#f5f5f5`

**Animations:**
- Fade in on scroll
- Smooth hover effects
- Technical infographic animations

## 📦 Project Structure

```
src/
├── app/[locale]/           # Localized pages
├── components/             # React components
├── data/                   # Products, certifications
├── messages/               # Translations (en.json, ar.json)
└── navigation.ts           # i18n routing
```

## ✅ Next Steps

1. **Populate Products**: Add real product data from jonixair.com
2. **Add Images**: Product photos, installations, environments
3. **Add Certifications**: Extract from official website
4. **Setup Email**: Configure contact form backend
5. **Add Analytics**: Google Analytics tracking
6. **Deploy**: To Vercel or your preferred host

## 🚢 Deployment

**Vercel (Recommended):**
```bash
git push origin main
```

**Docker:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## �� License

Professional website for Jonix Air MENA operations.
