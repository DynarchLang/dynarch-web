import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function EnhancedParticles({ scrollProgress }: { scrollProgress: number }) {
  const particlesRef = useRef<THREE.Points>(null);
  const particlesRef2 = useRef<THREE.Points>(null);

  const count = 3000;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = Math.random() * 150;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = radius * Math.cos(phi);

      const color = new THREE.Color();
      color.setHSL(0.5 + Math.random() * 0.3, 0.7, 0.6);
      col[i3] = color.r;
      col[i3 + 1] = color.g;
      col[i3 + 2] = color.b;
    }

    return [pos, col];
  }, []);

  useFrame((state, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.1;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
      particlesRef.current.position.z = scrollProgress * 100 - 50;
      particlesRef.current.position.y = Math.sin(scrollProgress * Math.PI * 2) * 20;
    }

    if (particlesRef2.current) {
      particlesRef2.current.rotation.y -= delta * 0.15;
      particlesRef2.current.rotation.z += delta * 0.05;
      particlesRef2.current.position.z = scrollProgress * 80 - 30;
      particlesRef2.current.position.x = Math.cos(scrollProgress * Math.PI * 3) * 15;
    }
  });

  return (
    <>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={count}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.2}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      <points ref={particlesRef2}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={count}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          vertexColors
          transparent
          opacity={0.6}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </>
  );
}
