import { motion } from 'framer-motion';
import { ScrollReveal } from './ScrollReveal';
import { ParallaxSection } from './ParallaxSection';
import { Brain, Zap, Shield, Globe, Rocket, Target } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: "AI-Powered Navigation",
    description: "Advanced machine learning algorithms for optimal trajectory planning",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Zap,
    title: "Real-time Optimization",
    description: "Continuous path recalculation based on dynamic space conditions",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: Shield,
    title: "Mission Resilience",
    description: "Fault-tolerant systems ensuring mission success in all scenarios",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Globe,
    title: "Global Coverage",
    description: "Earth-to-Moon trajectory optimization with global monitoring",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Rocket,
    title: "Space Technology",
    description: "Cutting-edge propulsion and navigation systems integration",
    color: "from-red-500 to-rose-500"
  },
  {
    icon: Target,
    title: "Precision Landing",
    description: "Sub-meter accuracy for lunar surface mission objectives",
    color: "from-indigo-500 to-blue-500"
  }
];

export const EnhancedFeaturesSection = () => {
  return (
    <section className="relative min-h-screen py-20 overflow-hidden bg-gradient-to-b from-black via-slate-900 to-black">
      {/* Background Elements */}
      <ParallaxSection speed={0.3} className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
      </ParallaxSection>
      
      <ParallaxSection speed={0.5} direction="down" className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </ParallaxSection>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="up" className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                ADVANCED
              </span>
              <br />
              <span className="text-white">CAPABILITIES</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Cutting-edge AI technology powering the future of space navigation and mission planning
            </p>
          </motion.div>
        </ScrollReveal>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <ScrollReveal
              key={feature.title}
              direction="up"
              delay={index * 0.1}
              className="group"
            >
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 group-hover:bg-white/10"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`} />
                
                {/* Icon */}
                <div className="relative z-10 mb-6">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-cyan-500/5 transition-all duration-500" />
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <ScrollReveal direction="up" delay={0.8} className="text-center mt-20">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25">
              Explore Technology
            </button>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default EnhancedFeaturesSection;
