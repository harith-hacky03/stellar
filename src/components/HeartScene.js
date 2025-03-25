import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Stats } from "@react-three/drei";
import HeartModel from "./HeartModel";

export default function HeartScene() {
  const [hoveredPart, setHoveredPart] = useState(null);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#000",
        display: "flex",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Information Panel */}
      <div
        style={{
          width: "350px",
          padding: "25px",
          color: "#fff",
          background: "rgba(20,20,30,0.8)",
          borderRight: "1px solid #444",
          overflowY: "auto",
        }}
      >
        <h1 style={{ color: "#ff5555", borderBottom: "1px solid #444" }}>
          Human Heart Anatomy
        </h1>

        {hoveredPart ? (
          <div style={{ marginTop: "20px" }}>
            <h2 style={{ color: "#00ff99" }}>{hoveredPart.name}</h2>
            <p style={{ lineHeight: "1.6" }}>{hoveredPart.description}</p>
          </div>
        ) : (
          <div style={{ marginTop: "20px" }}>
            <p style={{ lineHeight: "1.6" }}>
              <strong style={{ color: "#00ff99" }}>Hover over the green markers</strong> on the 3D heart model
              to learn about different anatomical structures and their functions in the cardiovascular system.
            </p>
          </div>
        )}
      </div>

      {/* 3D Viewer */}
      <div style={{ flex: 1, position: "relative" }}>
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
          />

          <HeartModel setHoveredPart={setHoveredPart} />

          <OrbitControls enableZoom={true} enablePan={true} />
          <Environment preset="city" />
          <Stats />
        </Canvas>
      </div>
    </div>
  );
}
