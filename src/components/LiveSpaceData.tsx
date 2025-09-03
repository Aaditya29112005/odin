import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Satellite, Activity, Zap, Globe } from 'lucide-react';

interface SpaceData {
  activeSatellites: number;
  spaceDebris: number;
  missions: number;
  lastUpdate: string;
}

export const LiveSpaceData = () => {
  const [spaceData, setSpaceData] = useState<SpaceData>({
    activeSatellites: 0,
    spaceDebris: 0,
    missions: 0,
    lastUpdate: ''
  });

  const [isLive, setIsLive] = useState(true);

  // Simulate live space data updates
  useEffect(() => {
    const updateData = () => {
      setSpaceData({
        activeSatellites: Math.floor(Math.random() * 50) + 2847, // Realistic satellite count
        spaceDebris: Math.floor(Math.random() * 100) + 12894, // Realistic debris count
        missions: Math.floor(Math.random() * 5) + 12, // Active missions
        lastUpdate: new Date().toLocaleTimeString()
      });
    };

    updateData();
    const interval = setInterval(updateData, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const dataItems = [
    {
      icon: Satellite,
      label: 'Active Satellites',
      value: spaceData.activeSatellites.toLocaleString(),
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    {
      icon: Activity,
      label: 'Space Debris',
      value: spaceData.spaceDebris.toLocaleString(),
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20'
    },
    {
      icon: Zap,
      label: 'Active Missions',
      value: spaceData.missions.toString(),
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    },
    {
      icon: Globe,
      label: 'Ground Stations',
      value: '47',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.5 }}
      className="absolute top-4 left-4 z-20 max-w-sm"
    >
      <div className="glassmorphism-strong rounded-xl p-4 border border-white/10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold text-sm">LIVE SPACE DATA</h3>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
            <span className="text-xs text-white/60">LIVE</span>
          </div>
        </div>

        {/* Data Grid */}
        <div className="grid grid-cols-2 gap-3">
          {dataItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.7 + index * 0.1 }}
              className={`${item.bgColor} ${item.borderColor} border rounded-lg p-3 backdrop-blur-sm`}
            >
              <div className="flex items-center space-x-2 mb-1">
                <item.icon className={`w-4 h-4 ${item.color}`} />
                <span className="text-xs text-white/70">{item.label}</span>
              </div>
              <div className={`text-lg font-bold ${item.color}`}>
                {item.value}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-white/10">
          <div className="flex items-center justify-between text-xs text-white/50">
            <span>Last Update: {spaceData.lastUpdate}</span>
            <span>ODIN Network</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LiveSpaceData;
