/**
 * 3D Floating Shapes — mouse-reactive floating geometry.
 * Adapted from Olivier Larose's 3D Float Effect tutorial.
 *
 * Uses @react-three/fiber for rendering, with manual lerp-based
 * mouse tracking for smooth cursor-driven transforms.
 */
import React, { useEffect, useRef, useMemo, Suspense, Component } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

/* ── Shape config ── */

interface ShapeConfig {
  geometry: 'sphere' | 'torus' | 'box' | 'octahedron' | 'cylinder' | 'torusKnot';
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  multiplier: number;
  color: string;
  floatSpeed?: number;
  floatIntensity?: number;
}

const SHAPES: ShapeConfig[] = [
  { geometry: 'sphere', position: [-12, 6, -2], rotation: [0, 0, 0], scale: 4.5, multiplier: 2.0, color: '#c8ff00', floatSpeed: 2, floatIntensity: 2 },
  { geometry: 'torus', position: [14, -5, -4], rotation: [0.5, 0.3, 0], scale: 3.5, multiplier: 2.4, color: '#c8ff00', floatSpeed: 1.5, floatIntensity: 1.5 },
  { geometry: 'octahedron', position: [10, 8, -3], rotation: [0.3, 0.7, 0], scale: 3.0, multiplier: 1.8, color: '#0024c1', floatSpeed: 1.8, floatIntensity: 2.5 },
  { geometry: 'box', position: [-10, -7, -5], rotation: [0.4, 0.4, 0.2], scale: 3.2, multiplier: 1.5, color: '#c8ff00', floatSpeed: 1.2, floatIntensity: 1.8 },
  { geometry: 'cylinder', position: [5, -9, -2], rotation: [0.2, 0, 0.6], scale: 2.0, multiplier: 2.2, color: '#88aaff', floatSpeed: 2.2, floatIntensity: 1.2 },
  { geometry: 'torusKnot', position: [-6, -3, -6], rotation: [0.1, 0.5, 0], scale: 1.8, multiplier: 1.6, color: '#c8ff00', floatSpeed: 1.4, floatIntensity: 2 },
  { geometry: 'sphere', position: [16, 3, -8], rotation: [0, 0, 0], scale: 1.5, multiplier: 1.2, color: '#88aaff', floatSpeed: 2.5, floatIntensity: 1 },
  { geometry: 'octahedron', position: [-15, 2, -4], rotation: [0.8, 0.2, 0.3], scale: 2.2, multiplier: 2.0, color: '#88aaff', floatSpeed: 1.6, floatIntensity: 2.2 },
];

/* ── Shared mouse state (module-level for perf) ── */

const mouseTarget = { x: 0.5, y: 0.5 };
const mouseCurrent = { x: 0.5, y: 0.5 };

/* ── Individual shape mesh ── */

function Shape({ config }: { config: ShapeConfig }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { position, rotation, scale, multiplier } = config;
  const a = multiplier / 2;

  const geo = useMemo(() => {
    switch (config.geometry) {
      case 'sphere': return new THREE.SphereGeometry(1, 32, 32);
      case 'torus': return new THREE.TorusGeometry(1, 0.4, 16, 32);
      case 'box': return new THREE.BoxGeometry(1, 1, 1);
      case 'octahedron': return new THREE.OctahedronGeometry(1);
      case 'cylinder': return new THREE.CylinderGeometry(0.5, 0.5, 1.5, 32);
      case 'torusKnot': return new THREE.TorusKnotGeometry(0.8, 0.3, 64, 16);
      default: return new THREE.SphereGeometry(1, 32, 32);
    }
  }, [config.geometry]);

  useFrame(() => {
    if (!meshRef.current) return;
    const mx = mouseCurrent.x;
    const my = mouseCurrent.y;

    meshRef.current.position.x = THREE.MathUtils.lerp(
      position[0] - multiplier * 2, position[0] + multiplier * 2, mx,
    );
    meshRef.current.position.y = THREE.MathUtils.lerp(
      position[1] + multiplier * 2, position[1] - multiplier * 2, my,
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(rotation[1] - a, rotation[1] + a, mx);
    meshRef.current.rotation.x = THREE.MathUtils.lerp(rotation[0] - a, rotation[0] + a, my);
  });

  return (
    <Float speed={config.floatSpeed ?? 1.5} floatIntensity={config.floatIntensity ?? 2} rotationIntensity={0.4}>
      <mesh ref={meshRef} geometry={geo} scale={scale} position={position} rotation={rotation}>
        <meshStandardMaterial color={config.color} roughness={0.15} metalness={0.8} transparent opacity={0.55} />
      </mesh>
    </Float>
  );
}

/* ── Lerp driver — runs every frame to smooth mouse ── */

function MouseSmoother() {
  useFrame(() => {
    mouseCurrent.x += (mouseTarget.x - mouseCurrent.x) * 0.04;
    mouseCurrent.y += (mouseTarget.y - mouseCurrent.y) * 0.04;
  });
  return null;
}

/* ── Scene content ── */

function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <directionalLight position={[-5, -5, 5]} intensity={0.4} />
      <MouseSmoother />
      {SHAPES.map((config, i) => (
        <Shape key={i} config={config} />
      ))}
    </>
  );
}

/* ── Error boundary — prevents R3F crashes from killing the page ── */

class ErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() { return this.state.hasError ? null : this.props.children; }
}

/* ── Main export ── */

const FloatingShapes: React.FC = () => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseTarget.x = e.clientX / window.innerWidth;
      mouseTarget.y = e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <ErrorBoundary>
      <Canvas
        orthographic
        camera={{ position: [0, 0, 200], zoom: 18 }}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1,
        }}
        gl={{ alpha: true, antialias: true }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </ErrorBoundary>
  );
};

export default FloatingShapes;
