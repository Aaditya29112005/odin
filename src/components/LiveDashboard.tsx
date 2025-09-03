import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { DecisionLog } from './DecisionLog';
import { SpaceVisualization } from './SpaceVisualization';
import { Badge } from '@/components/ui/badge';
import { Sun, AlertTriangle, Zap } from 'lucide-react';

const sampleLogs = [
  {
    timestamp: "T+02:15:42",
    decision: "Solar storm detected - trajectory adjusted",
    impact: {
      time: "+1.2h",
      fuel: "-80kg",
      risk: "↓95%"
    },
    reasoning: "High-energy proton flux detected from solar event AR3842. Adjusted departure window by 72 minutes to utilize Earth's magnetosphere shadow. Alternative trajectory maintains mission objectives while reducing radiation exposure to crew by 95%.",
    severity: "high" as const
  },
  {
    timestamp: "T+00:45:18", 
    decision: "Orbital debris field avoidance maneuver",
    impact: {
      time: "+0.3h",
      fuel: "-15kg", 
      risk: "↓78%"
    },
    reasoning: "Kessler cascade event detected in LEO sector 7. Initiated 2.3 m/s delta-V burn to adjust inclination by 0.8°. New trajectory maintains lunar insertion accuracy while avoiding debris field with 99.7% confidence.",
    severity: "medium" as const
  },
  {
    timestamp: "T+01:22:06",
    decision: "Communications blackout contingency activated",
    impact: {
      time: "+0.0h",
      fuel: "+5kg",
      risk: "↓65%"
    },
    reasoning: "Solar radio burst predicted to cause 14-minute comms blackout during lunar approach. Activated autonomous navigation mode with pre-loaded decision trees. Fuel savings from optimized approach burn during blackout period.",
    severity: "low" as const
  }
];

export const LiveDashboard = () => {
  const [activeDemo, setActiveDemo] = useState(false);
  const [currentLog, setCurrentLog] = useState(0);

  const triggerDemo = () => {
    setActiveDemo(true);
    setCurrentLog(0);
    
    // Cycle through logs
    const interval = setInterval(() => {
      setCurrentLog(prev => {
        if (prev >= sampleLogs.length - 1) {
          clearInterval(interval);
          setActiveDemo(false);
          return 0;
        }
        return prev + 1;
      });
    }, 3000);
  };

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
            <span className="bg-gradient-accent bg-clip-text text-transparent">
              Live Mission Dashboard
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Watch ODIN make real-time decisions during a simulated Earth-Moon transit with live hazard scenarios.
          </p>
          
          <Button
            onClick={triggerDemo}
            variant="premium"
            size="lg"
            disabled={activeDemo}
            className="cosmic-glow"
          >
            {activeDemo ? (
              <>
                <Zap className="h-4 w-4 mr-2 animate-spin" />
                Demo Running...
              </>
            ) : (
              <>
                <Sun className="h-4 w-4 mr-2" />
                Trigger Solar Storm Demo
              </>
            )}
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <SpaceVisualization replanning={activeDemo} />
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <h3 className="font-orbitron font-bold text-lg">Live Decision Logs</h3>
            </div>
            
            {activeDemo && currentLog < sampleLogs.length && (
              <motion.div
                key={`${activeDemo}-${currentLog}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <DecisionLog {...sampleLogs[currentLog]} />
              </motion.div>
            )}
            
            {!activeDemo && (
              <div className="glass-card p-8 rounded-xl text-center">
                <div className="space-y-4">
                  <div className="p-4 rounded-full bg-muted/20 w-fit mx-auto">
                    <Sun className="h-8 w-8 text-accent" />
                  </div>
                  <h4 className="font-orbitron font-bold text-lg">
                    Ready for Demonstration
                  </h4>
                  <p className="text-muted-foreground">
                    Click the button above to simulate a solar storm and watch ODIN automatically replan the mission trajectory in real-time.
                  </p>
                  <Badge variant="outline" className="cosmic-glow">
                    Interactive Demo Available
                  </Badge>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Static examples when demo is not running */}
        {!activeDemo && (
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {sampleLogs.map((log, index) => (
              <motion.div
                key={log.timestamp}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <DecisionLog {...log} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};