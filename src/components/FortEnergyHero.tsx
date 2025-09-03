import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import AdvancedEarth3D from './AdvancedEarth3D'
import SpaceAmbientAudio from './SpaceAmbientAudio'
import IntegratedSpaceVisualization from './IntegratedSpaceVisualization'
import LiveSpaceData from './LiveSpaceData'

export const FortEnergyHero = () => {
  const [replanning, setReplanning] = useState(false);

  // Simulate replanning every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setReplanning(true);
      setTimeout(() => setReplanning(false), 2000);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0f172a]">
      {/* Advanced 3D Earth Background */}
      <AdvancedEarth3D />

      {/* Integrated Space Visualization */}
      <IntegratedSpaceVisualization replanning={replanning} />

      {/* Live Space Data */}
      <LiveSpaceData />

      {/* Space Ambient Audio */}
      <SpaceAmbientAudio />

      {/* Overlay gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60 z-5" />

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
        <div className="text-white/70 text-sm font-medium mb-2">SCROLL DOWN TO DISCOVER</div>
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-white/30" />
          <div className="w-2 h-2 rounded-full bg-white" />
          <div className="w-2 h-2 rounded-full bg-white/30" />
        </div>
      </div>
    </section>
  )
}

export default FortEnergyHero


