import { useRef, useState } from "react";
import { useGLTF, Html } from "@react-three/drei";

export default function HeartModel({ setHoveredPart }) {
  const group = useRef();
  const { scene } = useGLTF("/models/scene.gltf");

  if (!scene) {
    console.error("GLTF Model failed to load.");
    return null;
  }

  // Updated markers with more anatomical parts
  const markers = [
    {
      position: [0, 0.8, 0.3],
      name: "Aorta",
      description: "The main artery that carries oxygen-rich blood from the heart to the body.",
    },
    {
      position: [-0.4, 0.3, 0.2],
      name: "Left Atrium",
      description: "Receives oxygenated blood from the lungs and pumps it into the left ventricle.",
    },
    {
      position: [0.4, -0.3, 0.2],
      name: "Right Ventricle",
      description: "Pumps deoxygenated blood to the lungs for oxygenation.",
    },
    {
      position: [-0.3, -0.5, 0.1],
      name: "Mitral Valve",
      description: "Prevents backflow of blood between the left atrium and left ventricle.",
    },
    {
      position: [0.3, -0.7, 0.2],
      name: "Pulmonary Artery",
      description: "Carries deoxygenated blood from the right ventricle to the lungs.",
    },
    {
      position: [0, -0.9, 0],
      name: "Inferior Vena Cava",
      description: "Brings deoxygenated blood from the lower body back to the heart.",
    },
  ];

  return (
    <group ref={group} dispose={null} scale={0.35} rotation={[-Math.PI / 2, 0, 0]}>
      <primitive object={scene} />
      
      {/* Markers on the Heart */}
      {markers.map((marker, index) => (
        <Marker key={index} {...marker} setHoveredPart={setHoveredPart} />
      ))}
    </group>
  );
}

// Marker Component
function Marker({ position, name, description, setHoveredPart }) {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position}>
      {/* Bigger, glowing green sphere for visibility */}
      <mesh
        onPointerOver={() => {
          setHovered(true);
          setHoveredPart({ name, description });
        }}
        onPointerOut={() => {
          setHovered(false);
          setHoveredPart(null);
        }}
        scale={hovered ? 1.5 : 1.2}
      >
        <sphereGeometry args={[0.07, 32, 32]} />
        <meshStandardMaterial
          color="green"
          emissive="green"
          emissiveIntensity={hovered ? 5 : 3}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Tooltip above the marker */}
      {hovered && (
        <Html position={[0, 0.15, 0]} center>
          <div
            style={{
              background: "rgba(0, 0, 0, 0.85)",
              color: "white",
              padding: "6px 12px",
              borderRadius: "6px",
              fontSize: "14px",
              whiteSpace: "nowrap",
              border: "1px solid green",
            }}
          >
            {name}
          </div>
        </Html>
      )}
    </group>
  );
}
