import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CertificationsSection from '@/components/CertificationsSection';
import InstallationsSection from '@/components/InstallationsSection';
import PerformanceSection from '@/components/PerformanceSection';

export default function CertificationsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <CertificationsSection />
      <PerformanceSection />
      <InstallationsSection />
      <Footer />
    </div>
  );
}
