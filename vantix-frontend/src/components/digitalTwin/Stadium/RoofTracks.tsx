import React from 'react';

export const RoofTracks: React.FC = () => {
  return (
    <group position={[0, -8.5, 0]}>
      {/* Outer fixed track guide rails running along the arches */}
      <mesh position={[0, 0, 4.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[23.7, 23.7, 0.15, 64, 1, true, Math.PI * 0.34, Math.PI * 0.32]} />
        <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0, -4.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[23.7, 23.7, 0.15, 64, 1, true, Math.PI * 0.34, Math.PI * 0.32]} />
        <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
};

export default RoofTracks;
