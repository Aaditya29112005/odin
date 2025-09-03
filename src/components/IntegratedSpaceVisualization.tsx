import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Text, Line } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const Earth = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 32, 32]} position={[-4, 0, 0]}>
      <meshStandardMaterial
        color="#1e3a8a"
        emissive="#0f172a"
        emissiveIntensity={0.2}
      />
    </Sphere>
  );
};

const Moon = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <Sphere ref={meshRef} args={[0.3, 16, 16]} position={[4, 0, 0]}>
      <meshStandardMaterial
        color="#e5e7eb"
        emissive="#6b7280"
        emissiveIntensity={0.1}
      />
    </Sphere>
  );
};

const TrajectoryPath = ({ replanning }: { replanning: boolean }) => {
  const [points, setPoints] = useState<THREE.Vector3[]>([]);
  
  useEffect(() => {
    const basePoints: THREE.Vector3[] = [];
    for (let i = 0; i <= 100; i++) {
      const t = i / 100;
      const x = -4 + 8 * t;
      const y = Math.sin(t * Math.PI) * (replanning ? 2 : 1);
      const z = 0;
      basePoints.push(new THREE.Vector3(x, y, z));
    }
    setPoints(basePoints);
  }, [replanning]);

  if (points.length === 0) {
    return null;
  }

  return (
    <Line
      points={points}
      color={replanning ? "#f59e0b" : "#10b981"}
      lineWidth={3}
    />
  );
};

interface IntegratedSpaceVisualizationProps {
  replanning: boolean;
}

export const IntegratedSpaceVisualization = ({ replanning }: IntegratedSpaceVisualizationProps) => {
  return (
    <motion.div 
      className="absolute top-1/2 right-8 w-96 h-80 glass-card rounded-xl overflow-hidden z-10"
      initial={{ opacity: 0, scale: 0.9, x: 50 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 1, delay: 2 }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        
        <Earth />
        <Moon />
        <TrajectoryPath replanning={replanning} />
        
        <Text
          position={[-4, -1.5, 0]}
          fontSize={0.3}
          color="#60A5FA"
          anchorX="center"
        >
          Earth
        </Text>
        
        <Text
          position={[4, -0.8, 0]}
          fontSize={0.2}
          color="#E5E7EB"
          anchorX="center"
        >
          Moon
        </Text>
        
        <OrbitControls 
          enablePan={false}
          minDistance={8}
          maxDistance={15}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
      
      <div className="absolute bottom-4 left-4 text-sm text-white/80">
        {replanning ? "🔄 Replanning trajectory..." : "✓ Optimal path calculated"}
      </div>
      
      <div className="absolute top-4 left-4 text-xs text-white/60 font-medium">
        ODIN TRAJECTORY SYSTEM
      </div>
    </motion.div>
  );
};

export default IntegratedSpaceVisualization;
