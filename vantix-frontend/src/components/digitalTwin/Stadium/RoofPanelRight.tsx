import React from 'react';
import * as THREE from 'three';

interface RoofPanelRightProps {
  color: string;
}

export const RoofPanelRight: React.FC<RoofPanelRightProps> = ({ color }) => {
  return (
    <group>
      {/* 1. Curved Roof Shell */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[23.62, 23.62, 8.0, 64, 1, true, Math.PI * 0.5, Math.PI * 0.06]} />
        <meshStandardMaterial
          color={color}
          roughness={0.5}
          metalness={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 2. Structural Edge Beams (Details) */}
      {[-4.0, 0, 4.0].map((z, idx) => (
        <mesh key={idx} position={[0, 0, z]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[23.65, 23.65, 0.12, 64, 1, true, Math.PI * 0.5, Math.PI * 0.065]} />
          <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}

      {/* 3. Cross truss reinforcement lines (visual layout) */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <cylinderGeometry args={[23.64, 23.64, 7.9, 8, 1, true, Math.PI * 0.5, Math.PI * 0.06]} />
        <meshStandardMaterial
          color="#334155"
          wireframe
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

export default RoofPanelRight;
