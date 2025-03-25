import { useRef } from 'react'
import { useFrame, useGLTF } from '@react-three/fiber'

export default function HeartModel({ setHoveredPart }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/scene.glb')
  
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.005
    }
  })

  const heartParts = [
    {
      name: "Aorta",
      position: [0, 0.5, 0.2],
      geometry: nodes.aorta?.geometry || nodes.hartZBrush_defualt_group_Heart_Tex_0.geometry,
    },
    {
      name: "Ventricle",
      position: [0, -0.3, 0],
      geometry: nodes.ventricle?.geometry || nodes.hartZBrush_defualt_group_Heart_Tex_0.geometry,
    },
  ]

  return (
    <group ref={group} dispose={null} scale={0.174} rotation={[-Math.PI / 2, 0, 0]}>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <mesh
          geometry={nodes.hartZBrush_defualt_group_Heart_Tex_0.geometry}
          material={materials.Heart_Tex}
          scale={286.365}
        />
        {heartParts.map((part, index) => (
          <mesh
            key={index}
            geometry={part.geometry}
            position={part.position}
            onPointerOver={() => setHoveredPart(part.name)}
            onPointerOut={() => setHoveredPart(null)}
          >
            <meshBasicMaterial color="red" transparent opacity={0} />
          </mesh>
        ))}
      </group>
    </group>
  )
}