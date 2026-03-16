import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import TechnologySection from '@/components/TechnologySection';

/* ── Lazy-load every below-fold section ──
   Each becomes its own JS chunk — browser only downloads + parses it
   when Next.js is about to render it, not on initial page load. */
const ElectrostaticFilterSection = dynamic(() => import('@/components/ElectrostaticFilterSection'));
const PerformanceSection          = dynamic(() => import('@/components/PerformanceSection'));
const ProductsSection             = dynamic(() => import('@/components/ProductsSection'));
const CertificationsSection       = dynamic(() => import('@/components/CertificationsSection'));
const InstallationsSection        = dynamic(() => import('@/components/InstallationsSection'));
const ApplicationsSection         = dynamic(() => import('@/components/ApplicationsSection'));
const MENASection                 = dynamic(() => import('@/components/MENASection'));
const ContactSection              = dynamic(() => import('@/components/ContactSection'));
const Footer                      = dynamic(() => import('@/components/Footer'));

export default function LocalizedHome() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <TechnologySection />
        <ElectrostaticFilterSection />
        <PerformanceSection />
        <ProductsSection />
        <CertificationsSection />
        <InstallationsSection />
        <ApplicationsSection />
        <MENASection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
