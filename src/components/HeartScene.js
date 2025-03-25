import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Stats } from '@react-three/drei'
import HeartModel from './HeartModel'

export default function HeartScene() {
  const [hoveredPart, setHoveredPart] = useState(null)

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: '#000',
      display: 'flex',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Information Panel */}
      <div style={{
        width: '350px',
        padding: '25px',
        color: '#fff',
        background: 'rgba(20,20,30,0.8)',
        borderRight: '1px solid #444',
        overflowY: 'auto'
      }}>
        <h1 style={{ color: '#ff5555', borderBottom: '1px solid #444' }}>
          Human Heart Anatomy
        </h1>
        
        {hoveredPart ? (
          <div style={{ marginTop: '20px' }}>
            <h2 style={{ color: '#00ff99' }}>{hoveredPart.name}</h2>
            <p style={{ lineHeight: '1.6' }}>{hoveredPart.description}</p>
            
            <div style={{ 
              marginTop: '15px',
              padding: '10px',
              background: 'rgba(0,255,150,0.1)',
              borderLeft: '3px solid #00ff99'
            }}>
              <h4>Fun Fact:</h4>
              <p>
                {hoveredPart.name.includes('Ventricle') 
                  ? "The left ventricle wall is 3x thicker than the right to pump blood throughout the body."
                  : hoveredPart.name.includes('Atrium')
                  ? "The right atrium receives about 2,000 gallons of blood daily."
                  : "The aorta can withstand blood pressure of 120 mmHg during systole."}
              </p>
            </div>
          </div>
        ) : (
          <div style={{ marginTop: '20px' }}>
            <p style={{ lineHeight: '1.6' }}>
              <strong style={{ color: '#00ff99' }}>Hover over the green markers</strong> on the 3D heart model 
              to learn about different anatomical structures and their functions in the cardiovascular system.
            </p>
            <div style={{ marginTop: '30px' }}>
              <h3>Heart Overview:</h3>
              <ul style={{ lineHeight: '1.8', paddingLeft: '20px' }}>
                <li>Size: About the size of a fist</li>
                <li>Weight: 250-350 grams</li>
                <li>Daily beats: ~100,000 times</li>
                <li>Blood pumped: ~2,000 gallons daily</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* 3D Viewer */}
      <div style={{ flex: 1, position: 'relative' }}>
        <Canvas
          camera={{ position: [0, 0, 2.5], fov: 45 }}
          gl={{ antialias: true }}
          shadows
        >
          <ambientLight intensity={0.8} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={1.5}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          
          <HeartModel setHoveredPart={setHoveredPart} />
          
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            minDistance={1.5}
            maxDistance={5}
            //autoRotate
            enableRotate={true}
            autoRotateSpeed={0.5}
          />
          
          <Environment preset="city" />
          <Stats />
        </Canvas>
      </div>
    </div>
  )
}