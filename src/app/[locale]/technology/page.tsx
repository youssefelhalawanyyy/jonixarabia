'use client';

import { useLocale } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TechnologySection from '@/components/TechnologySection';

export default function TechnologyPage() {
  const locale = useLocale();
  const isArabic = locale === 'ar';

  return (
    <div className={`min-h-screen bg-white ${isArabic ? 'rtl' : 'ltr'}`}>
      <Header />
      <TechnologySection />
      <Footer />
    </div>
  );
}
