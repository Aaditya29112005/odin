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
        color="#4A90E2"
        emissive="#1E3A8A"
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
        color="#E5E7EB"
        emissive="#6B7280"
        emissiveIntensity={0.1}
      />
    </Sphere>
  );
};

const TrajectoryPath = ({ replanning }: { replanning: boolean }) => {
  const [points, setPoints] = useState<THREE.Vector3[]>([]);
  
  useEffect(() => {
    // Generate trajectory points with proper validation
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

  // Don't render Line until we have valid points
  if (points.length === 0) {
    return null;
  }

  return (
    <Line
      points={points}
      color={replanning ? "#F59E0B" : "#10B981"}
      lineWidth={3}
    />
  );
};

interface SpaceVisualizationProps {
  replanning: boolean;
}

export const SpaceVisualization = ({ replanning }: SpaceVisualizationProps) => {
  return (
    <motion.div 
      className="w-full h-[400px] glass-card rounded-xl overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
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
          font="/fonts/orbitron.woff"
        >
          Earth
        </Text>
        
        <Text
          position={[4, -0.8, 0]}
          fontSize={0.2}
          color="#E5E7EB"
          anchorX="center"
          font="/fonts/orbitron.woff"
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
        
        {/* Starfield background */}
        <mesh>
          <sphereGeometry args={[50, 32, 32]} />
          <meshBasicMaterial color="#000319" side={THREE.BackSide} />
        </mesh>
      </Canvas>
      
      <div className="absolute bottom-4 left-4 text-sm text-muted-foreground">
        {replanning ? "🔄 Replanning trajectory..." : "✓ Optimal path calculated"}
      </div>
    </motion.div>
  );
};