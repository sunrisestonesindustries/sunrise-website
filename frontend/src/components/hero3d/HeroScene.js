// Cinematic night scene — a monumental stone portal lit by two torches, their
// flames reflecting in a dark water floor. Moody, atmospheric, torch-warm
// against cool darkness. Loaded lazily (see Hero3D.js) so none of this ships in
// the initial bundle or runs on devices that get the static fallback.

import React, { useRef, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshReflectorMaterial, useTexture, AdaptiveDpr } from '@react-three/drei';
import * as THREE from 'three';

import limestoneTex from './textures/limestone.jpg';

// Portal (the "porte") — a tall dark stone slab, centered.
const PORTAL = { position: [0, 3.1, -4], size: [4.2, 6.2, 0.7] };
const TORCH_LEFT = [-3.6, 2.6, -1.6];
const TORCH_RIGHT = [3.6, 2.6, -1.6];

function StonePortal() {
  const texture = useTexture(limestoneTex);

  useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.needsUpdate = true;
  }, [texture]);

  return (
    <group position={PORTAL.position}>
      {/* Main slab, darkened so torchlight does the sculpting, not flat fill. */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={PORTAL.size} />
        <meshStandardMaterial map={texture} color="#39352f" roughness={0.9} metalness={0.04} />
      </mesh>
      {/* Recessed doorway — dark threshold visitors will eventually pass through. */}
      <mesh position={[0, -0.3, 0.36]}>
        <planeGeometry args={[2.4, 4.4]} />
        <meshStandardMaterial color="#0c0b09" roughness={1} metalness={0} />
      </mesh>
      {/* Carved lintel spanning the top, like a monumental frame. */}
      <mesh position={[0, 3.35, 0.05]} castShadow>
        <boxGeometry args={[5.2, 0.6, 0.9]} />
        <meshStandardMaterial map={texture} color="#332f29" roughness={0.9} metalness={0.04} />
      </mesh>
      {/* Flanking pillars for architectural depth. */}
      <mesh position={[-2.55, -0.5, 0.05]} castShadow>
        <boxGeometry args={[0.55, 5.6, 0.9]} />
        <meshStandardMaterial map={texture} color="#332f29" roughness={0.9} metalness={0.04} />
      </mesh>
      <mesh position={[2.55, -0.5, 0.05]} castShadow>
        <boxGeometry args={[0.55, 5.6, 0.9]} />
        <meshStandardMaterial map={texture} color="#332f29" roughness={0.9} metalness={0.04} />
      </mesh>
    </group>
  );
}

// A single flickering torch: warm point light + a small emissive flame that
// reflects in the water below.
function Torch({ position }) {
  const lightRef = useRef();
  const flameRef = useRef();
  const seed = useMemo(() => Math.random() * 10, []);
  const base = position[1];

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // Layered sine "noise" for an organic flicker.
    const flicker =
      0.75 +
      0.18 * Math.sin(t * 13 + seed) +
      0.09 * Math.sin(t * 27 + seed * 2) +
      0.06 * Math.sin(t * 41 + seed * 3);
    if (lightRef.current) {
      lightRef.current.intensity = 13 * flicker;
    }
    if (flameRef.current) {
      const s = 0.9 + 0.12 * Math.sin(t * 20 + seed);
      flameRef.current.scale.set(s * 0.55, s, s * 0.55);
      flameRef.current.position.y = base + 0.03 * Math.sin(t * 9 + seed);
    }
  });

  return (
    <group>
      {/* Torch post — a dark stick grounds the flame so it isn't a floating orb. */}
      <mesh position={[position[0], position[1] - 1.1, position[2]]}>
        <cylinderGeometry args={[0.06, 0.08, 1.6, 8]} />
        <meshStandardMaterial color="#1a1712" roughness={0.9} />
      </mesh>

      <pointLight
        ref={lightRef}
        position={position}
        color="#ff8a34"
        intensity={13}
        distance={11}
        decay={2.6}
      />
      {/* Flame core — tapered cone, not a sphere, so it reads as fire. */}
      <mesh ref={flameRef} position={position}>
        <coneGeometry args={[0.16, 0.5, 10]} />
        <meshBasicMaterial color="#ffe2a0" transparent opacity={0.95} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      {/* Warm mid glow, elongated vertically like a flame silhouette. */}
      <mesh position={position} scale={[1, 1.6, 1]}>
        <sphereGeometry args={[0.22, 12, 12]} />
        <meshBasicMaterial color="#ff8a34" transparent opacity={0.5} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      {/* Soft outer bloom. */}
      <mesh position={position}>
        <sphereGeometry args={[0.6, 12, 12]} />
        <meshBasicMaterial color="#ff8a34" transparent opacity={0.16} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}

// Dark reflective water floor — mirrors the portal and torch flames.
function WaterFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[60, 60]} />
      <MeshReflectorMaterial
        resolution={1024}
        mixBlur={1.2}
        mixStrength={5}
        blur={[200, 60]}
        mirror={0.6}
        depthScale={1.1}
        minDepthThreshold={0.3}
        maxDepthThreshold={1.4}
        roughness={0.55}
        metalness={0.5}
        color="#05070b"
      />
    </mesh>
  );
}

// Warm embers rising from the torches.
function Embers({ count = 180 }) {
  const pointsRef = useRef();

  const positions = useMemo(() => {
    const array = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const side = Math.random() > 0.5 ? 3.6 : -3.6;
      array[i * 3] = side + (Math.random() - 0.5) * 2.4;
      array[i * 3 + 1] = Math.random() * 6;
      array[i * 3 + 2] = -1.6 + (Math.random() - 0.5) * 2.4;
    }
    return array;
  }, [count]);

  useFrame((_state, delta) => {
    const points = pointsRef.current;
    if (!points) {
      return;
    }
    const array = points.geometry.attributes.position.array;
    for (let i = 0; i < count; i += 1) {
      array[i * 3 + 1] += delta * (0.25 + (i % 5) * 0.04);
      array[i * 3] += delta * 0.08 * Math.sin(i + array[i * 3 + 1]);
      if (array[i * 3 + 1] > 6.5) {
        array[i * 3 + 1] = 0;
      }
    }
    points.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#ffb257"
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Slow cinematic idle: a gentle breathing push and pointer parallax.
function CameraRig() {
  const { camera } = useThree();
  const base = useRef(new THREE.Vector3(0, 2.4, 8.4));
  const target = useRef(new THREE.Vector3(0, 2.6, -2));

  useEffect(() => {
    camera.position.copy(base.current);
    camera.lookAt(target.current);
  }, [camera]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const px = state.pointer.x;
    const py = state.pointer.y;
    const desiredX = base.current.x + px * 0.5;
    const desiredY = base.current.y - py * 0.3 + Math.sin(t * 0.3) * 0.06;
    const desiredZ = base.current.z + Math.sin(t * 0.2) * 0.15;
    const lerp = 1 - Math.pow(0.002, delta);
    camera.position.x += (desiredX - camera.position.x) * lerp;
    camera.position.y += (desiredY - camera.position.y) * lerp;
    camera.position.z += (desiredZ - camera.position.z) * lerp;
    camera.lookAt(target.current);
  });

  return null;
}

function ReadySignal({ onReady }) {
  useEffect(() => {
    if (onReady) {
      const id = requestAnimationFrame(() => onReady());
      return () => cancelAnimationFrame(id);
    }
    return undefined;
  }, [onReady]);
  return null;
}

export default function HeroScene({ onReady }) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      camera={{ position: [0, 2.4, 8.4], fov: 46, near: 0.1, far: 120 }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
      }}
    >
      <color attach="background" args={['#05070b']} />
      <fog attach="fog" args={['#05070b', 8, 26]} />

      {/* Cool moonlight fill so the darkness stays blue, not black. */}
      <hemisphereLight args={['#1b2c40', '#050608', 0.35]} />
      <ambientLight intensity={0.12} color="#2a3a52" />
      <directionalLight position={[-4, 9, 2]} intensity={0.5} color="#6f8fb5" castShadow shadow-mapSize={[1024, 1024]} />

      <Suspense fallback={null}>
        <StonePortal />
      </Suspense>

      <Torch position={TORCH_LEFT} />
      <Torch position={TORCH_RIGHT} />
      <WaterFloor />
      <Embers />

      <CameraRig />
      <ReadySignal onReady={onReady} />
      <AdaptiveDpr pixelated />
    </Canvas>
  );
}
