import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { Stars, Cloud } from '@react-three/drei';
import { EnhancedParticles } from './EnhancedParticles';
import { FlyingRings } from './FlyingRings';
import { GeometricShapes } from './GeometricShapes';

function Clouds({ scrollProgress }: { scrollProgress: number }) {
  const cloudsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (cloudsRef.current) {
      cloudsRef.current.position.z = scrollProgress * 50 - 20;
      cloudsRef.current.position.y = Math.sin(scrollProgress * Math.PI) * 10 - 5;
    }
  });

  const cloudPositions = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 100,
      ] as [number, number, number],
      scale: Math.random() * 4 + 2,
      speed: Math.random() * 0.5 + 0.1,
    }));
  }, []);

  return (
    <group ref={cloudsRef}>
      {cloudPositions.map((cloud, i) => (
        <Cloud
          key={i}
          position={cloud.position}
          speed={cloud.speed}
          opacity={0.3}
          scale={cloud.scale}
          color="#ffffff"
        />
      ))}
    </group>
  );
}

function ParticleField({ scrollProgress }: { scrollProgress: number }) {
  const points = useRef<THREE.Points>(null);

  const particlesCount = 2000;
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 200;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 200;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 200;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = scrollProgress * Math.PI * 2;
      points.current.position.z = scrollProgress * 100 - 50;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#ffffff"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Terrain({ scrollProgress }: { scrollProgress: number }) {
  const terrainRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(200, 200, 128, 128);
    const pos = geo.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const wave = Math.sin(x * 0.05) * Math.cos(y * 0.05) * 3;
      const noise = (Math.random() - 0.5) * 2;
      pos.setZ(i, wave + noise);
    }

    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((state) => {
    if (terrainRef.current) {
      terrainRef.current.rotation.x = -Math.PI / 2;
      terrainRef.current.position.y = -30 - scrollProgress * 20;
      terrainRef.current.position.z = scrollProgress * 50;
    }
  });

  return (
    <mesh ref={terrainRef} geometry={geometry}>
      <meshStandardMaterial
        color="#1a1a2e"
        wireframe
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}

function FalconCamera({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree();

  useFrame(() => {
    const altitude = scrollProgress * 80 + 5;
    const tilt = Math.sin(scrollProgress * Math.PI * 2) * 0.3;
    const sway = Math.cos(scrollProgress * Math.PI * 3) * 2;

    camera.position.y = altitude;
    camera.position.x = sway;
    camera.position.z = scrollProgress * 50;

    camera.rotation.x = -0.1 - scrollProgress * 0.2 + tilt;
    camera.rotation.z = sway * 0.05;
  });

  return null;
}

function LightRings({ scrollProgress }: { scrollProgress: number }) {
  const ringsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ringsRef.current) {
      ringsRef.current.children.forEach((ring, i) => {
        ring.rotation.x += 0.002 * (i + 1);
        ring.rotation.y += 0.001 * (i + 1);
      });
      ringsRef.current.position.z = scrollProgress * 100 - 20;
    }
  });

  return (
    <group ref={ringsRef}>
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh
          key={i}
          position={[0, 10 + i * 20, i * 30]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <torusGeometry args={[15 + i * 5, 0.3, 16, 100]} />
          <meshStandardMaterial
            color={`hsl(${200 + i * 30}, 70%, 60%)`}
            emissive={`hsl(${200 + i * 30}, 70%, 40%)`}
            emissiveIntensity={0.5}
            transparent
            opacity={0.4}
          />
        </mesh>
      ))}
    </group>
  );
}

function FloatingCubes({ scrollProgress }: { scrollProgress: number }) {
  const cubesRef = useRef<THREE.Group>(null);

  const cubes = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 100,
        Math.random() * 100 + 10,
        Math.random() * 100 - 50,
      ] as [number, number, number],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [number, number, number],
      scale: Math.random() * 2 + 0.5,
      speed: Math.random() * 0.02 + 0.01,
    }));
  }, []);

  useFrame((state, delta) => {
    if (cubesRef.current) {
      cubesRef.current.children.forEach((cube, i) => {
        cube.rotation.x += cubes[i].speed;
        cube.rotation.y += cubes[i].speed * 0.7;
      });
      cubesRef.current.position.z = scrollProgress * 80 - 30;
    }
  });

  return (
    <group ref={cubesRef}>
      {cubes.map((cube, i) => (
        <mesh key={i} position={cube.position} rotation={cube.rotation} scale={cube.scale}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.1}
            wireframe
          />
        </mesh>
      ))}
    </group>
  );
}

function Scene({ scrollProgress }: { scrollProgress: number }) {
  return (
    <>
      <FalconCamera scrollProgress={scrollProgress} />

      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} color="#ffffff" />
      <pointLight position={[0, 50, 0]} intensity={0.8} color="#4a9eff" />
      <pointLight position={[0, 20, -50]} intensity={0.5} color="#ff6b9d" />
      <pointLight position={[-30, 30, 20]} intensity={0.6} color="#9d4eff" />
      <spotLight position={[50, 80, 50]} intensity={1} angle={0.3} penumbra={1} color="#00ffff" />

      <Stars radius={150} depth={80} count={8000} factor={5} saturation={0.1} fade speed={1.5} />

      <Clouds scrollProgress={scrollProgress} />
      <ParticleField scrollProgress={scrollProgress} />
      <EnhancedParticles scrollProgress={scrollProgress} />
      <Terrain scrollProgress={scrollProgress} />
      <LightRings scrollProgress={scrollProgress} />
      <FlyingRings scrollProgress={scrollProgress} />
      <FloatingCubes scrollProgress={scrollProgress} />
      <GeometricShapes scrollProgress={scrollProgress} />

      <fog attach="fog" args={['#0a0a0a', 60, 180]} />
    </>
  );
}

export function FalconFlightBackground({ scrollProgress }: { scrollProgress: number }) {
  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-b from-black via-[#0a0a1a] to-black">
      <Canvas
        camera={{ position: [0, 5, 0], fov: 80 }}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
      >
        <Scene scrollProgress={scrollProgress} />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60 pointer-events-none" />
    </div>
  );
}
