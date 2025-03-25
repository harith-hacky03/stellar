import { useRef } from 'react'
import { useGLTF, Sphere, Text } from '@react-three/drei'
import * as THREE from 'three'

export default function HeartModel({ setHoveredPart }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/scene.glb')

  // Create safe material fallback
  const heartMaterial = materials.Heart_Tex 
    ? materials.Heart_Tex.clone() 
    : new THREE.MeshStandardMaterial({
        color: 0xcc0000,
        roughness: 0.3,
        metalness: 0.2
      })

  // Create visible hover indicators
  const HoverIndicator = ({ position, label }) => (
    <group position={position}>
      <Sphere args={[0.15, 16, 16]}>
        <meshStandardMaterial 
          color="#00ff00" 
          emissive="#00ff00" 
          emissiveIntensity={2} 
        />
      </Sphere>
      <Text
        position={[0, 0.2, 0]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  )

  const heartParts = [
    {
      name: "Aorta",
      position: [0, 0.5, 0.2],
      labelPosition: [0, 0.7, 0.2],
      geometry: nodes.aorta?.geometry || nodes.hartZBrush_defualt_group_Heart_Tex_0?.geometry
    },
    {
      name: "Ventricle",
      position: [0, -0.3, 0],
      labelPosition: [0, -0.5, 0],
      geometry: nodes.ventricle?.geometry || nodes.hartZBrush_defualt_group_Heart_Tex_0?.geometry
    }
  ]

  return (
    <group ref={group} dispose={null} scale={0.174} rotation={[-Math.PI / 2, 0, 0]}>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <mesh
          geometry={nodes.hartZBrush_defualt_group_Heart_Tex_0?.geometry}
          material={heartMaterial}
          scale={286.365}
        />
        
        {heartParts.map((part, index) => (
          <group key={index}>
            <mesh
              geometry={part.geometry}
              position={part.position}
              onPointerOver={() => setHoveredPart(part.name)}
              onPointerOut={() => setHoveredPart(null)}
            >
              <meshBasicMaterial visible={false} />
            </mesh>
            <HoverIndicator position={part.labelPosition} label={`${part.name}`} />
          </group>
        ))}
      </group>
    </group>
  )
}