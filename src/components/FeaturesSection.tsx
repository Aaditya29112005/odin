import { motion } from 'framer-motion';
import { Brain, Zap, Shield, Eye, BarChart, Globe } from 'lucide-react';
import aiInterface from '@/assets/ai-interface.jpg';

const features = [
  {
    icon: Brain,
    title: "Self-Evolving AI",
    description: "Learns from every past mission & updates navigation intelligence autonomously",
    color: "text-primary"
  },
  {
    icon: Zap,
    title: "Generative Hazard Anticipation",
    description: "Doesn't just avoid hazards — predicts future ones before they occur",
    color: "text-accent"
  },
  {
    icon: Eye,
    title: "Explainable AI Logs",
    description: "Every trajectory choice comes with clear, human-readable trade-off explanations",
    color: "text-secondary"
  },
  {
    icon: Shield,
    title: "Dynamic Mission Resilience",
    description: "Mission continues seamlessly under solar storms, debris swarms, or comms blackout",
    color: "text-warning"
  },
  {
    icon: BarChart,
    title: "Real-time Optimization",
    description: "Optimizes Δv, mission duration, and crew safety simultaneously in real-time",
    color: "text-success"
  },
  {
    icon: Globe,
    title: "First-of-its-Kind",
    description: "No space agency globally has fused real-time generative AI + interplanetary navigation",
    color: "text-primary-glow"
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-orbitron font-black neon-text mb-6">
            <span className="bg-gradient-secondary bg-clip-text text-transparent">
              The Future of Space Navigation
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            ODIN transforms navigation from reactive to proactive — enabling spacecraft to think, adapt, and safeguard missions as living explorers in space.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="glass-card p-8 rounded-xl cosmic-glow">
              <img 
                src={aiInterface} 
                alt="ODIN AI Interface" 
                className="w-full rounded-lg opacity-80"
              />
            </div>
          </motion.div>

          <motion.div
            className="grid gap-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {features.slice(0, 3).map((feature, index) => (
              <motion.div
                key={feature.title}
                className="glass-card p-6 rounded-xl cosmic-glow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-gradient-primary">
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <div>
                    <h3 className="font-orbitron font-bold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {features.slice(3).map((feature, index) => (
            <motion.div
              key={feature.title}
              className="glass-card p-6 rounded-xl cosmic-glow text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="p-4 rounded-full bg-gradient-secondary w-fit mx-auto mb-4">
                <feature.icon className={`h-8 w-8 ${feature.color}`} />
              </div>
              <h3 className="font-orbitron font-bold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};