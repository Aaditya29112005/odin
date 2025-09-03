import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Clock, Zap, Shield, AlertTriangle } from 'lucide-react';

interface DecisionLogProps {
  timestamp: string;
  decision: string;
  impact: {
    time: string;
    fuel: string;
    risk: string;
  };
  reasoning: string;
  severity: 'low' | 'medium' | 'high';
}

export const DecisionLog = ({ timestamp, decision, impact, reasoning, severity }: DecisionLogProps) => {
  const severityConfig = {
    low: { color: 'bg-success', icon: Shield },
    medium: { color: 'bg-warning', icon: Zap },
    high: { color: 'bg-destructive', icon: AlertTriangle }
  };

  const config = severityConfig[severity];
  const Icon = config.icon;

  return (
    <motion.div
      className="glass-card p-6 rounded-xl cosmic-glow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${config.color}`}>
            <Icon className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="font-orbitron font-bold text-foreground">
              {decision}
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-3 w-3" />
              {timestamp}
            </div>
          </div>
        </div>
        <Badge variant="outline" className="neon-text">
          AI Decision
        </Badge>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center p-3 rounded-lg bg-muted/20">
          <div className="text-lg font-orbitron font-bold text-primary">
            {impact.time}
          </div>
          <div className="text-xs text-muted-foreground">Time Impact</div>
        </div>
        <div className="text-center p-3 rounded-lg bg-muted/20">
          <div className="text-lg font-orbitron font-bold text-accent">
            {impact.fuel}
          </div>
          <div className="text-xs text-muted-foreground">Fuel Δv</div>
        </div>
        <div className="text-center p-3 rounded-lg bg-muted/20">
          <div className="text-lg font-orbitron font-bold text-secondary">
            {impact.risk}
          </div>
          <div className="text-xs text-muted-foreground">Risk Reduction</div>
        </div>
      </div>

      <div className="p-4 rounded-lg bg-background/30 border border-primary/20">
        <h4 className="font-semibold text-sm mb-2 text-primary">AI Reasoning:</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {reasoning}
        </p>
      </div>
    </motion.div>
  );
};