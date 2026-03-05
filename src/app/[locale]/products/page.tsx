'use client';

import { useLocale } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductsSection from '@/components/ProductsSection';

export default function ProductsPage() {
  const locale = useLocale();
  const isArabic = locale === 'ar';

  return (
    <div className={`min-h-screen bg-white ${isArabic ? 'rtl' : 'ltr'}`}>
      <Header />
      <ProductsSection />
      <Footer />
    </div>
  );
}
