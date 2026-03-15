import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import TechnologySection from '@/components/TechnologySection';
import ElectrostaticFilterSection from '@/components/ElectrostaticFilterSection';
import PerformanceSection from '@/components/PerformanceSection';
import ProductsSection from '@/components/ProductsSection';
import CertificationsSection from '@/components/CertificationsSection';
import InstallationsSection from '@/components/InstallationsSection';
import ApplicationsSection from '@/components/ApplicationsSection';
import MENASection from '@/components/MENASection';
import ContactSection from '@/components/ContactSection';

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
