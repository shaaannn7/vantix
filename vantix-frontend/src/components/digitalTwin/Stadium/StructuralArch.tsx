import React from 'react';
import * as THREE from 'three';

export const StructuralArch: React.FC = () => {
  const segments = 32;
  const archRadius = 23.5;

  const renderTrussArch = (zOffset: number) => {
    const trussCylinders: React.ReactNode[] = [];

    for (let i = 0; i < segments; i++) {
      const t1 = (i / segments) * Math.PI;
      const t2 = ((i + 1) / segments) * Math.PI;

      // Outer arch cord
      const x1 = Math.cos(t1) * archRadius;
      const y1 = Math.sin(t1) * archRadius - 8.5;
      const x2 = Math.cos(t2) * archRadius;
      const y2 = Math.sin(t2) * archRadius - 8.5;

      // Inner arch cord (offset downwards by 0.7)
      const ix1 = Math.cos(t1) * (archRadius - 0.7);
      const iy1 = Math.sin(t1) * (archRadius - 0.7) - 8.5;
      const ix2 = Math.cos(t2) * (archRadius - 0.7);
      const iy2 = Math.sin(t2) * (archRadius - 0.7) - 8.5;

      const p1 = new THREE.Vector3(x1, y1, zOffset);
      const p2 = new THREE.Vector3(x2, y2, zOffset);
      const ip1 = new THREE.Vector3(ix1, iy1, zOffset);
      const ip2 = new THREE.Vector3(ix2, iy2, zOffset);

      const drawBar = (start: THREE.Vector3, end: THREE.Vector3, radius: number, keySuffix: string) => {
        const distance = start.distanceTo(end);
        const position = start.clone().add(end).multiplyScalar(0.5);
        const direction = new THREE.Vector3().subVectors(end, start).normalize();
        const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);

        return (
          <mesh key={`${i}-${keySuffix}`} position={position} quaternion={quaternion}>
            <cylinderGeometry args={[radius, radius, distance, 6]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.2} />
          </mesh>
        );
      };

      trussCylinders.push(drawBar(p1, p2, 0.16, 'outer'));
      trussCylinders.push(drawBar(ip1, ip2, 0.13, 'inner'));
      trussCylinders.push(drawBar(p1, ip1, 0.08, 'vertical'));
      trussCylinders.push(drawBar(p1, ip2, 0.06, 'diagonal'));
    }

    return trussCylinders;
  };

  return (
    <group>
      {/* North Arch Truss */}
      {renderTrussArch(4.2)}
      {/* South Arch Truss */}
      {renderTrussArch(-4.2)}

      {/* Massive Concrete/Steel Support Pillars on Ground */}
      {[-23.5, 23.5].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          {/* North Support pillar leg */}
          <mesh position={[x < 0 ? 0.7 : -0.7, 2.5, 4.2]} rotation={[0, 0, x < 0 ? -Math.PI / 9 : Math.PI / 9]}>
            <cylinderGeometry args={[0.4, 0.6, 5.2, 8]} />
            <meshStandardMaterial color="#e2e8f0" roughness={0.5} />
          </mesh>
          {/* South Support pillar leg */}
          <mesh position={[x < 0 ? 0.7 : -0.7, 2.5, -4.2]} rotation={[0, 0, x < 0 ? -Math.PI / 9 : Math.PI / 9]}>
            <cylinderGeometry args={[0.4, 0.6, 5.2, 8]} />
            <meshStandardMaterial color="#e2e8f0" roughness={0.5} />
          </mesh>
          {/* Concrete base block */}
          <mesh position={[0, 0.4, 0]}>
            <boxGeometry args={[1.8, 0.8, 10.5]} />
            <meshStandardMaterial color="#cbd5e1" roughness={0.7} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

export default StructuralArch;
