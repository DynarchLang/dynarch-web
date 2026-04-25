import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function GeometricShapes({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);

  const shapes = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      type: ['box', 'sphere', 'octahedron', 'tetrahedron'][Math.floor(Math.random() * 4)],
      position: [
        (Math.random() - 0.5) * 120,
        Math.random() * 120 + 5,
        Math.random() * 150 - 75,
      ] as [number, number, number],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [number, number, number],
      scale: Math.random() * 3 + 0.5,
      speed: Math.random() * 0.02 + 0.005,
      color: `hsl(${Math.random() * 60 + 180}, 70%, 60%)`,
    }));
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        child.rotation.x += shapes[i].speed;
        child.rotation.y += shapes[i].speed * 0.7;
        child.rotation.z += shapes[i].speed * 0.5;

        child.position.y += Math.sin(state.clock.elapsedTime * 2 + i) * 0.02;
      });

      groupRef.current.position.z = scrollProgress * 100 - 40;
      groupRef.current.rotation.y = scrollProgress * Math.PI;
    }
  });

  return (
    <group ref={groupRef}>
      {shapes.map((shape, i) => (
        <mesh key={i} position={shape.position} rotation={shape.rotation} scale={shape.scale}>
          {shape.type === 'box' && <boxGeometry args={[1, 1, 1]} />}
          {shape.type === 'sphere' && <sphereGeometry args={[0.5, 16, 16]} />}
          {shape.type === 'octahedron' && <octahedronGeometry args={[0.6]} />}
          {shape.type === 'tetrahedron' && <tetrahedronGeometry args={[0.7]} />}
          <meshStandardMaterial
            color={shape.color}
            transparent
            opacity={0.6}
            wireframe={Math.random() > 0.5}
            emissive={shape.color}
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}
