import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TechnologySection from '@/components/TechnologySection';
import ElectrostaticFilterSection from '@/components/ElectrostaticFilterSection';
import PerformanceSection from '@/components/PerformanceSection';

export default function TechnologyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <TechnologySection />
      <ElectrostaticFilterSection />
      <PerformanceSection />
      <Footer />
    </div>
  );
}
