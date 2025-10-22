'use client'

import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, RoundedBox, Text } from '@react-three/drei'
import * as THREE from 'three'

const PhoneModel = () => {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.05
      
      if (hovered) {
        meshRef.current.scale.setScalar(1.1)
      } else {
        meshRef.current.scale.setScalar(1)
      }
    }
  })

  return (
    <group ref={meshRef}>
      {/* Phone body */}
      <RoundedBox
        args={[2, 4, 0.2]}
        radius={0.2}
        smoothness={4}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.8}
          roughness={0.2}
          emissive="#00d4ff"
          emissiveIntensity={0.1}
        />
      </RoundedBox>

      {/* Screen */}
      <RoundedBox
        args={[1.8, 3.6, 0.01]}
        radius={0.15}
        smoothness={4}
        position={[0, 0, 0.11]}
      >
        <meshStandardMaterial
          color="#000000"
          emissive="#00d4ff"
          emissiveIntensity={0.3}
        />
      </RoundedBox>

      {/* NovaOS text on screen */}
      <Text
        position={[0, 0.5, 0.12]}
        fontSize={0.3}
        color="#00d4ff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
      >
        NovaOS
      </Text>

      {/* AI indicator */}
      <mesh position={[0, -0.5, 0.12]}>
        <circleGeometry args={[0.1, 32]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Glow effect */}
      <pointLight
        position={[0, 0, 1]}
        color="#00d4ff"
        intensity={0.5}
        distance={5}
      />
    </group>
  )
}

const Phone3D = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} />
        <PhoneModel />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1}
        />
      </Canvas>
    </div>
  )
}

export default Phone3D