import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { SpaceVisualization } from './SpaceVisualization';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Zap, Brain, Shield } from 'lucide-react';
import heroSpace from '@/assets/hero-space.jpg';

export const HeroSection = () => {
  const [replanning, setReplanning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setReplanning(prev => !prev);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroSpace})` }}
      />
      
      {/* Animated starfield */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Badge className="mb-6 cosmic-glow neon-text">
                <Brain className="h-3 w-3 mr-1" />
                AI-Powered Navigation
              </Badge>
            </motion.div>

            <motion.h1
              className="text-5xl lg:text-7xl font-orbitron font-black neon-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                ODIN
              </span>
            </motion.h1>

            <motion.h2
              className="text-2xl lg:text-3xl font-orbitron font-bold text-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Where AI Meets Space Resilience
            </motion.h2>

            <motion.p
              className="text-lg text-muted-foreground leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              A generative, self-evolving interplanetary AI that autonomously plans and continuously replans Earth-to-Moon spacecraft trajectories in real time. Navigation is no longer planned—it's alive.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center gap-2 text-sm">
                <Zap className="h-4 w-4 text-accent" />
                <span>Real-time Replanning</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Brain className="h-4 w-4 text-primary" />
                <span>Generative AI</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4 text-secondary" />
                <span>Mission Resilience</span>
              </div>
            </motion.div>

            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Button variant="premium" size="lg" className="cosmic-glow">
                Explore ODIN
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button variant="ghost" size="lg" className="border border-primary/30">
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>

          {/* Right visualization */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <SpaceVisualization replanning={replanning} />
            
            <motion.div
              className="mt-6 text-center"
              animate={{ scale: replanning ? 1.05 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <Badge 
                variant={replanning ? "destructive" : "default"}
                className="cosmic-glow"
              >
                {replanning ? "⚡ Solar Storm Detected - Replanning..." : "✓ Optimal Trajectory Locked"}
              </Badge>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};