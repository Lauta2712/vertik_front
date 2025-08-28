import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles() {
  const pointsRef = useRef();

  // Creamos posiciones aleatorias para las partículas
  const particles = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 1000; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10;
      positions.push(x, y, z);
    }
    return new Float32Array(positions);
  }, []);

  // Animación ligera
  useFrame(({ mouse }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0005;
      pointsRef.current.rotation.x += 0.0003;

      // Movimiento suave en base al mouse
      pointsRef.current.rotation.y += mouse.x * 0.0005;
      pointsRef.current.rotation.x += mouse.y * 0.0005;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00adb5"
        size={0.03}
        sizeAttenuation
        transparent
        opacity={0.6}
      />
    </points>
  );
}

export default function Background() {
  return (
    <Canvas
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
        width: "100%",
        height: "100%",
      }}
      camera={{ position: [0, 0, 5], fov: 75 }}
    >
      <ambientLight intensity={0.3} />
      <Particles />
    </Canvas>
  );
}
