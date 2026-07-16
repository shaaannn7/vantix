import React from 'react';
import * as THREE from 'three';

export const Gates: React.FC = () => {
  // Banners based on photo reference
  const banners = [
    { color: '#a855f7', label: 'FIFA', x: -3.5 },
    { color: '#0ea5e9', label: '2026', x: -1.2 },
    { color: '#10b981', label: 'WORLD', x: 1.2 },
    { color: '#f59e0b', label: 'CUP', x: 3.5 },
  ];

  return (
    <group>
      {/* 1. Grand Glass Entrance Facade */}
      <group position={[0, 3.2, 22.2]}>
        {/* Glass Structure */}
        <mesh>
          <planeGeometry args={[16, 6.2]} />
          <meshStandardMaterial
            color="#06b6d4"
            transparent
            opacity={0.35}
            roughness={0.1}
            metalness={0.9}
            side={THREE.DoubleSide}
          />
        </mesh>
        
        {/* Structural Glazing Pane grid lines */}
        <gridHelper args={[16, 8, '#0891b2', '#0891b2']} position={[0, 0, 0.01]} rotation={[Math.PI / 2, 0, 0]} />

        {/* Large Operable Entrance Gates (Separated logic - static base structure) */}
        {[-6, -2, 2, 6].map((x, idx) => (
          <mesh key={idx} position={[x, -2.1, 0.05]}>
            <boxGeometry args={[1.5, 2.0, 0.1]} />
            <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.3} />
          </mesh>
        ))}

        {/* FIFA World Cup Banners */}
        {banners.map((ban, i) => (
          <group key={i} position={[ban.x, 0, 0.02]}>
            <mesh>
              <planeGeometry args={[1.8, 5.5]} />
              <meshStandardMaterial color={ban.color} roughness={0.8} side={THREE.DoubleSide} />
            </mesh>
            <mesh position={[0, -2.0, 0.01]}>
              <planeGeometry args={[1.4, 0.8]} />
              <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
            </mesh>
          </group>
        ))}

        {/* Top Header Support Gird */}
        <mesh position={[0, 3.1, 0]}>
          <boxGeometry args={[16.5, 0.35, 0.4]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.6} />
        </mesh>
      </group>

      {/* 2. Operable Endzone Glass Walls (Sides - West and East) */}
      <group position={[0, 1.8, 0]}>
        {/* West Operable Wall */}
        <mesh position={[-21, 0.8, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[14, 5.0]} />
          <meshStandardMaterial
            color="#06b6d4"
            transparent
            opacity={0.35}
            roughness={0.1}
            metalness={0.9}
            side={THREE.DoubleSide}
          />
        </mesh>
        <gridHelper args={[14, 7, '#0891b2', '#0891b2']} position={[-20.95, 0.8, 0]} rotation={[Math.PI / 2, 0, 0]} />

        {/* East Operable Wall */}
        <mesh position={[21, 0.8, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[14, 5.0]} />
          <meshStandardMaterial
            color="#06b6d4"
            transparent
            opacity={0.35}
            roughness={0.1}
            metalness={0.9}
            side={THREE.DoubleSide}
          />
        </mesh>
        <gridHelper args={[14, 7, '#0891b2', '#0891b2']} position={[20.95, 0.8, 0]} rotation={[Math.PI / 2, 0, 0]} />
      </group>

      {/* 3. Plaza Security Checkpoints & Tents */}
      <group position={[0, 0.02, 26]}>
        {/* Main Event Tent */}
        <group position={[-8, 0, 0]}>
          <mesh position={[0, 0.4, 0]}>
            <boxGeometry args={[4.2, 0.8, 2.5]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.9} />
          </mesh>
          <mesh position={[0, 1.0, 0]} rotation={[0, Math.PI / 4, 0]}>
            <coneGeometry args={[2.0, 0.7, 4]} />
            <meshStandardMaterial color="#ffffff" roughness={0.8} />
          </mesh>
        </group>

        {/* Four Gate Security Lanes */}
        {[[-3, -2], [-1.2, -2], [1.2, -2], [3, -2]].map(([x, z], i) => (
          <group key={i} position={[x, 0, z]}>
            <mesh position={[0, 0.3, 0]}>
              <boxGeometry args={[0.8, 0.6, 0.8]} />
              <meshStandardMaterial color="#f1f5f9" roughness={0.9} />
            </mesh>
            <mesh position={[0, 0.7, 0]} rotation={[0, Math.PI / 4, 0]}>
              <coneGeometry args={[0.55, 0.25, 4]} />
              <meshStandardMaterial color="#ffffff" roughness={0.8} />
            </mesh>
          </group>
        ))}

        {/* Outdoor Video Display Screen */}
        <group position={[7, 0, -2]}>
          <mesh position={[0, 0.6, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 1.2, 8]} />
            <meshStandardMaterial color="#334155" metalness={0.7} />
          </mesh>
          <mesh position={[0, 1.4, 0]}>
            <boxGeometry args={[1.8, 1.0, 0.15]} />
            <meshStandardMaterial color="#1e293b" metalness={0.8} />
          </mesh>
          <mesh position={[0, 1.4, 0.09]}>
            <planeGeometry args={[1.6, 0.8]} />
            <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.6} />
          </mesh>
        </group>
      </group>
    </group>
  );
};

export default Gates;
