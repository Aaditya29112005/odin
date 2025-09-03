import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Box } from '@react-three/drei';
import * as THREE from 'three';

// Milky Way Galaxy Background
const MilkyWay = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.001;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[100, 32, 32]} />
      <meshBasicMaterial
        color="#1a1a2e"
        side={THREE.BackSide}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
};

// Asteroid Field
const AsteroidField = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  const asteroids = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 50; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 200,
          (Math.random() - 0.5) * 200,
          (Math.random() - 0.5) * 200
        ] as [number, number, number],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        ] as [number, number, number],
        scale: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 0.01 + 0.005
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      {asteroids.map((asteroid, index) => (
        <Asteroid
          key={index}
          position={asteroid.position}
          rotation={asteroid.rotation}
          scale={asteroid.scale}
          speed={asteroid.speed}
        />
      ))}
    </group>
  );
};

// Individual Asteroid
const Asteroid = ({ position, rotation, scale, speed }: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  speed: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += speed;
      meshRef.current.rotation.y += speed * 0.7;
      meshRef.current.rotation.z += speed * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#4a5568"
        roughness={0.8}
        metalness={0.2}
      />
    </mesh>
  );
};

// Live Satellite Network
const SatelliteNetwork = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  const satellites = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 20; i++) {
      const radius = 15 + Math.random() * 10;
      const angle = (i / 20) * Math.PI * 2;
      temp.push({
        position: [
          Math.cos(angle) * radius,
          (Math.random() - 0.5) * 4,
          Math.sin(angle) * radius
        ] as [number, number, number],
        speed: 0.01 + Math.random() * 0.02
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.005;
    }
  });

  return (
    <group ref={groupRef}>
      {satellites.map((satellite, index) => (
        <Satellite
          key={index}
          position={satellite.position}
          speed={satellite.speed}
        />
      ))}
    </group>
  );
};

// Individual Satellite
const Satellite = ({ position, speed }: {
  position: [number, number, number];
  speed: number;
}) => {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * speed;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Satellite Body */}
      <Box args={[0.1, 0.05, 0.2]}>
        <meshStandardMaterial
          color="#e5e7eb"
          metalness={0.8}
          roughness={0.2}
        />
      </Box>
      
      {/* Solar Panels */}
      <Box args={[0.3, 0.02, 0.1]} position={[0.2, 0, 0]}>
        <meshStandardMaterial
          color="#1e40af"
          metalness={0.6}
          roughness={0.3}
        />
      </Box>
      <Box args={[0.3, 0.02, 0.1]} position={[-0.2, 0, 0]}>
        <meshStandardMaterial
          color="#1e40af"
          metalness={0.6}
          roughness={0.3}
        />
      </Box>
      
      {/* Antenna */}
      <Box args={[0.02, 0.1, 0.02]} position={[0, 0.05, 0]}>
        <meshStandardMaterial
          color="#6b7280"
          metalness={0.7}
          roughness={0.3}
        />
      </Box>
    </group>
  );
};

// Space Debris Field
const SpaceDebris = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  const debris = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 100; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 300,
          (Math.random() - 0.5) * 300,
          (Math.random() - 0.5) * 300
        ] as [number, number, number],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        ] as [number, number, number],
        scale: Math.random() * 0.02 + 0.005,
        speed: Math.random() * 0.02 + 0.01
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.0005;
    }
  });

  return (
    <group ref={groupRef}>
      {debris.map((piece, index) => (
        <Debris
          key={index}
          position={piece.position}
          rotation={piece.rotation}
          scale={piece.scale}
          speed={piece.speed}
        />
      ))}
    </group>
  );
};

// Individual Debris Piece
const Debris = ({ position, rotation, scale, speed }: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  speed: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += speed;
      meshRef.current.rotation.y += speed * 1.2;
      meshRef.current.rotation.z += speed * 0.8;
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#6b7280"
        roughness={0.9}
        metalness={0.1}
      />
    </mesh>
  );
};

// Main Space Environment Component
export const SpaceEnvironment = () => {
  return (
    <>
      <MilkyWay />
      <AsteroidField />
      <SatelliteNetwork />
      <SpaceDebris />
    </>
  );
};

export default SpaceEnvironment;
