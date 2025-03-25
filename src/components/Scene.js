import { useState, Suspense } from 'react'
import { Canvas, Html } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import HeartModel from './HeartModel'

function HeartInfo({ hoveredPart }) {
  if (!hoveredPart) return null
  
  const info = {
    "Aorta": "The main artery carrying oxygenated blood from the heart",
    "Ventricle": "Chamber that pumps blood out of the heart",
  }

  return (
    <Html center>
      <div style={{
        background: 'rgba(0,0,0,0.7)',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '5px',
        maxWidth: '200px',
        textAlign: 'center'
      }}>
        <h3>{hoveredPart}</h3>
        <p>{info[hoveredPart]}</p>
      </div>
    </Html>
  )
}

export default function HeartScene() {
  const [hoveredPart, setHoveredPart] = useState(null)

  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      
      <Suspense fallback={null}>
        <HeartModel setHoveredPart={setHoveredPart} />
        <HeartInfo hoveredPart={hoveredPart} />
      </Suspense>
      
      <OrbitControls 
        enableZoom={true}
        enablePan={true}
        minDistance={1.5}
        maxDistance={5}
      />
    </Canvas>
  )
}