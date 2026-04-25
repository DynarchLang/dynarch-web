import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function FlyingRings({ scrollProgress }: { scrollProgress: number }) {
  const ringsRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (ringsRef.current) {
      ringsRef.current.children.forEach((ring, i) => {
        ring.rotation.x += delta * 0.5 * (i % 2 === 0 ? 1 : -1);
        ring.rotation.y += delta * 0.3 * (i % 3 === 0 ? 1 : -1);
        ring.position.z = scrollProgress * 120 - 40 + i * 25;
        ring.position.y = Math.sin(state.clock.elapsedTime + i) * 8 + 10;
        ring.position.x = Math.cos(state.clock.elapsedTime * 0.5 + i * 1.2) * 20;

        const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.1;
        ring.scale.setScalar(scale);
      });
    }
  });

  const rings = Array.from({ length: 8 }, (_, i) => ({
    radius: 12 + i * 3,
    tube: 0.4,
    color: `hsl(${180 + i * 25}, 80%, ${50 + i * 5}%)`,
    emissive: `hsl(${180 + i * 25}, 100%, 40%)`,
  }));

  return (
    <group ref={ringsRef}>
      {rings.map((ring, i) => (
        <mesh key={i}>
          <torusGeometry args={[ring.radius, ring.tube, 24, 128]} />
          <meshStandardMaterial
            color={ring.color}
            emissive={ring.emissive}
            emissiveIntensity={0.6}
            transparent
            opacity={0.7}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}
