import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere, OrbitControls, Stars, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import { SpaceEnvironment } from './SpaceEnvironment';
import * as THREE from 'three';

// Earth component with procedural textures and physics
const Earth = ({ mousePosition }: { mousePosition: THREE.Vector2 }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  // Create Montfort Capital style Earth texture
  const earthMaterial = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;
    
    // Create dark, muted Earth texture like Montfort Capital
    const gradient = ctx.createRadialGradient(1024, 512, 0, 1024, 512, 1024);
    gradient.addColorStop(0, '#1e293b'); // Very dark blue-grey
    gradient.addColorStop(0.3, '#334155'); // Dark slate
    gradient.addColorStop(0.6, '#475569'); // Medium slate
    gradient.addColorStop(0.8, '#1e293b'); // Dark slate
    gradient.addColorStop(1, '#0f172a'); // Almost black
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 2048, 1024);
    
    // Add realistic land masses with very dark colors
    ctx.fillStyle = '#1f2937'; // Very dark grey land
    // North America
    ctx.beginPath();
    ctx.ellipse(400, 300, 120, 80, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Europe/Africa - more detailed
    ctx.beginPath();
    ctx.ellipse(1000, 400, 100, 120, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Asia
    ctx.beginPath();
    ctx.ellipse(1600, 350, 150, 100, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Australia
    ctx.beginPath();
    ctx.ellipse(1800, 700, 80, 60, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Add some texture variation
    ctx.fillStyle = '#374151';
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * 2048;
      const y = Math.random() * 1024;
      const size = Math.random() * 30 + 10;
      ctx.beginPath();
      ctx.ellipse(x, y, size, size * 0.7, Math.random() * Math.PI, 0, 2 * Math.PI);
      ctx.fill();
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    
    return new THREE.MeshPhongMaterial({
      map: texture,
      shininess: 300,
      transparent: false,
      color: 0x2d3748, // Very muted dark blue-grey
    });
  }, []);

  const cloudMaterial = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;
    
    // Create Montfort Capital style cloud texture - more subtle and dark
    ctx.fillStyle = 'rgba(0, 0, 0, 0)';
    ctx.fillRect(0, 0, 2048, 1024);
    
    // Add subtle, dark cloud patterns like in the reference
    ctx.fillStyle = 'rgba(107, 114, 128, 0.4)'; // Muted grey clouds
    for (let i = 0; i < 80; i++) {
      const x = Math.random() * 2048;
      const y = Math.random() * 1024;
      const size = Math.random() * 200 + 50;
      
      // Create swirling, organic cloud shapes
      ctx.beginPath();
      ctx.ellipse(x, y, size, size * 0.5, Math.random() * Math.PI, 0, 2 * Math.PI);
      ctx.fill();
      
      // Add cloud details and swirls
      if (Math.random() > 0.6) {
        ctx.beginPath();
        ctx.ellipse(x + size * 0.3, y + size * 0.2, size * 0.3, size * 0.15, 0, 0, 2 * Math.PI);
        ctx.fill();
      }
      
      // Add some smaller cloud fragments
      if (Math.random() > 0.8) {
        ctx.beginPath();
        ctx.ellipse(x - size * 0.4, y - size * 0.3, size * 0.2, size * 0.1, 0, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    
    return new THREE.MeshLambertMaterial({
      map: texture,
      transparent: true,
      opacity: 0.5,
    });
  }, []);

  const atmosphereMaterial = useMemo(() => {
    return new THREE.MeshPhongMaterial({
      color: 0x4a5568, // Muted blue-grey atmospheric glow like Montfort
      transparent: true,
      opacity: 0.12,
      side: THREE.BackSide,
    });
  }, []);

  // Animation and physics
  useFrame((state) => {
    if (meshRef.current) {
      // Slow rotation
      meshRef.current.rotation.y += 0.001;
      
      // Mouse interaction - subtle tilt
      if (mousePosition) {
        const targetRotationX = mousePosition.y * 0.1;
        const targetRotationZ = mousePosition.x * 0.1;
        
        meshRef.current.rotation.x = THREE.MathUtils.lerp(
          meshRef.current.rotation.x, 
          targetRotationX, 
          0.05
        );
        meshRef.current.rotation.z = THREE.MathUtils.lerp(
          meshRef.current.rotation.z, 
          targetRotationZ, 
          0.05
        );
      }
    }

    // Cloud rotation (slightly faster)
    if (meshRef.current.children[0]) {
      meshRef.current.children[0].rotation.y += 0.0015;
    }

    // Atmosphere pulsing
    if (atmosphereRef.current) {
      atmosphereRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02);
    }
  });

  return (
    <group>
      {/* Main Earth */}
      <Sphere
        ref={meshRef}
        args={[2, 64, 64]}
        material={earthMaterial}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.05 : 1}
      >
        {/* Clouds layer */}
        <Sphere args={[2.01, 32, 32]} material={cloudMaterial} />
      </Sphere>

      {/* Atmosphere */}
      <Sphere
        ref={atmosphereRef}
        args={[2.1, 32, 32]}
        material={atmosphereMaterial}
      />
    </group>
  );
};

// Advanced lighting setup - Montfort Capital style
const Lighting = () => {
  const lightRef = useRef<THREE.DirectionalLight>(null);
  
  useFrame((state) => {
    if (lightRef.current) {
      // Very subtle lighting movement
      const time = state.clock.elapsedTime * 0.02;
      lightRef.current.position.set(
        Math.cos(time) * 2 + 1,
        Math.sin(time) * 1.5 + 0.5,
        3
      );
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} color="#1e293b" />
      <directionalLight
        ref={lightRef}
        position={[1, 0.5, 3]}
        intensity={0.8}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-2, -1, -2]} intensity={0.1} color="#4a5568" />
    </>
  );
};

// Enhanced particle system for space dust and nebula
const SpaceDust = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const nebulaRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    const colors = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
      
      // Add some color variation for nebula effect
      const color = new THREE.Color();
      color.setHSL(0.6 + Math.random() * 0.2, 0.3, 0.5 + Math.random() * 0.3);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0003;
    }
    if (nebulaRef.current) {
      nebulaRef.current.rotation.y += 0.0001;
    }
  });

  return (
    <>
      {/* Space Dust */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.positions.length / 3}
            array={particles.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particles.colors.length / 3}
            array={particles.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.05} vertexColors transparent opacity={0.4} />
      </points>
      
      {/* Nebula Effect */}
      <points ref={nebulaRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.positions.length / 3}
            array={particles.positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.2} color="#4a5568" transparent opacity={0.1} />
      </points>
    </>
  );
};

// Main 3D Earth Scene
const EarthScene = () => {
  const [mousePosition, setMousePosition] = useState(new THREE.Vector2());
  const { camera } = useThree();

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePosition(new THREE.Vector2(x, y));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <Environment preset="night" />
      <Stars radius={100} depth={50} count={1500} factor={1.5} saturation={0} fade speed={0.3} />
      <SpaceDust />
      <SpaceEnvironment />
      <Lighting />
      <Earth mousePosition={mousePosition} />
      
      {/* Camera controls - Montfort Capital style */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.2}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI - Math.PI / 3}
      />
    </>
  );
};

// Main component
export const AdvancedEarth3D = () => {
  return (
    <motion.div 
      className="absolute inset-0 w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <Canvas
        camera={{ 
          position: [0, 0, 8], 
          fov: 60,
          near: 0.1,
          far: 1000
        }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]}
      >
        <EarthScene />
      </Canvas>
      
      {/* Overlay text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 1 }}
          className="text-center text-white z-10"
        >
          <h1 className="text-6xl md:text-8xl font-bold tracking-wider mb-4">
            ODIN
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-4xl">
            AI-POWERED SPACE NAVIGATION & MISSION PLANNING
          </p>
          <p className="text-lg md:text-xl text-white/60 max-w-3xl mt-4">
            ADVANCED TRAJECTORY OPTIMIZATION FOR INTERPLANETARY MISSIONS
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdvancedEarth3D;
