import { Navigation, AdvancedHeroSection } from '@/components/AdvancedNavigation';
import { FeaturesSection } from '@/components/FeaturesSection';
import { EnhancedFeaturesSection } from '@/components/EnhancedFeaturesSection';
import { LiveDashboard } from '@/components/LiveDashboard';
import FortEnergyHero from '@/components/FortEnergyHero';

const Index = () => {
  return (
    <main className="min-h-screen scroll-smooth overflow-x-hidden" style={{ scrollSnapType: 'y mandatory' }}>
      <section style={{ scrollSnapAlign: 'start' }}>
        <Navigation />
        <FortEnergyHero />
      </section>
      
      <section style={{ scrollSnapAlign: 'start' }}>
        <EnhancedFeaturesSection />
      </section>
      
      <section style={{ scrollSnapAlign: 'start' }}>
        <LiveDashboard />
      </section>
    </main>
  );
};

export default Index;
