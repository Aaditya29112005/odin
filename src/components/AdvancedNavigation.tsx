import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Badge } from '@/components/ui/badge';
import { Menu, X, ArrowRight, Brain, Zap, Shield, ChevronDown } from 'lucide-react';

const navigation = [
  { name: 'FEATURES', href: '#features' },
  { name: 'TECHNOLOGY', href: '#technology' },
  { name: 'DASHBOARD', href: '#dashboard' },
  { name: 'MISSIONS', href: '#missions' },
  { name: 'ABOUT', href: '#about' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [0.95, 0.8]);
  const headerBlur = useTransform(scrollY, [0, 100], [0, 24]);

  return (
    <motion.header
      style={{ 
        backdropFilter: `blur(${headerBlur}px)`,
        backgroundColor: `hsl(var(--background) / ${headerOpacity.get()})`,
      }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur-xl bg-black/20"
    >
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2"
          >
            <div className="h-8 w-8 bg-gradient-hero rounded-lg flex items-center justify-center">
              <div className="h-5 w-5 bg-white rounded-sm" />
            </div>
            <span className="text-xl font-space-grotesk font-bold text-white">
              ODIN
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navigation.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`text-xs font-medium transition-colors relative group ${
                  item.active 
                    ? 'text-white border-b border-white' 
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {item.name}
                {!item.active && (
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                )}
              </motion.a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Badge className="bg-white/10 text-white border-white/20">
              LIVE
            </Badge>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              MENU
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="glass-card"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 space-y-2 border-t border-glass-border"
          >
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="pt-4 space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                Sign In
              </Button>
              <Button className="w-full bg-gradient-primary">
                Get Started
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
}

export function AdvancedHeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 parallax-bg"
      >
        <div className="absolute inset-0 bg-gradient-backdrop" />
        {/* Animated particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <Badge className="mb-6 glass-card border-primary/20">
            <Zap className="h-3 w-3 mr-2" />
            Next-Generation Space AI
          </Badge>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-space-grotesk font-black mb-6"
          >
            <span className="block premium-text text-balance">
              ODIN
            </span>
            <span className="block text-3xl md:text-4xl font-normal text-muted-foreground mt-4 text-balance">
              Where AI Meets Space Resilience
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-balance"
          >
            A generative, self-evolving interplanetary AI that autonomously plans and continuously replans Earth-to-Moon spacecraft trajectories in real time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:opacity-90 shadow-glow text-lg px-8"
            >
              Explore ODIN
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button 
              variant="ghost" 
              size="lg"
              className="glass-card border-primary/20 text-lg px-8"
            >
              Watch Demo
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-primary" />
              <span>Self-Evolving AI</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-accent" />
              <span>Real-time Replanning</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-success" />
              <span>Mission Resilience</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center text-muted-foreground">
            <span className="text-xs mb-2 font-medium">Scroll to explore</span>
            <ChevronDown className="h-4 w-4 scroll-indicator" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}