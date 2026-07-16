import React from 'react';
import * as THREE from 'three';

interface BowlProps {
  activeDeck: string;
}

export const Bowl: React.FC<BowlProps> = ({ activeDeck }) => {
  return (
    <group>
      {/* Lower deck concrete support structure */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[16.0, 12.8, 1.6, 64, 1, true]} />
        <meshStandardMaterial color="#0f172a" roughness={0.9} side={THREE.DoubleSide} />
      </mesh>

      {/* Mid deck concrete support structure */}
      {activeDeck !== 'lower' && (
        <mesh position={[0, 2.3, 0]}>
          <cylinderGeometry args={[18.6, 17.0, 1.4, 64, 1, true]} />
          <meshStandardMaterial color="#1e293b" roughness={0.9} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Upper deck concrete support structure */}
      {activeDeck === 'upper' && (
        <mesh position={[0, 4.0, 0]}>
          <cylinderGeometry args={[21.3, 19.0, 2.0, 64, 1, true]} />
          <meshStandardMaterial color="#0f172a" roughness={0.9} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Outer Stadium Shell (Silver-Metallic Stacked Bands) */}
      <group>
        {/* Lower Silver Band */}
        <mesh position={[0, 1.2, 0]}>
          <cylinderGeometry args={[22.0, 21.0, 1.8, 64, 1, true, Math.PI / 4, 1.5 * Math.PI]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.7} roughness={0.3} side={THREE.DoubleSide} />
        </mesh>

        {/* Mid Silver Band */}
        <mesh position={[0, 2.8, 0]}>
          <cylinderGeometry args={[22.6, 22.0, 1.6, 64, 1, true, Math.PI / 4, 1.5 * Math.PI]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.7} roughness={0.3} side={THREE.DoubleSide} />
        </mesh>

        {/* Upper Silver Band */}
        <mesh position={[0, 4.4, 0]}>
          <cylinderGeometry args={[23.2, 22.6, 1.8, 64, 1, true, Math.PI / 4, 1.5 * Math.PI]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.7} roughness={0.3} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
};

export default Bowl;
