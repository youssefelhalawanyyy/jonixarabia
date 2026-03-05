import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ApplicationsSection from '@/components/ApplicationsSection';
import InstallationsSection from '@/components/InstallationsSection';
import MENASection from '@/components/MENASection';

export default function ApplicationsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <ApplicationsSection />
      <InstallationsSection />
      <MENASection />
      <Footer />
    </div>
  );
}
