import React from 'react';

// Import modular stadium components
import Field from './Stadium/Field';
import Bowl from './Stadium/Bowl';
import Seating from './Stadium/Seating';
import StructuralArch from './Stadium/StructuralArch';
import Roof from './Stadium/Roof';
import Gates from './Stadium/Gates';
import Lighting from './Stadium/Lighting';
import MatchSimulation from './Stadium/MatchSimulation';

interface StadiumMeshProps {
  activeDeck: string;
  emergencyMode: boolean;
  roofOpen: boolean;
}

// ─── Texas Jumbotron (AT&T Center-Hung Screen) ───────────────────────────────
const TexasJumbotron: React.FC = () => {
  return (
    <group position={[0, 5.8, 0]}>
      {/* Steel Cables */}
      {[-8, 8].map((x) => (
        <group key={x}>
          <mesh position={[x, 2.6, -4.5]} rotation={[0.2, 0, -0.4]}>
            <cylinderGeometry args={[0.03, 0.03, 5.5, 4]} />
            <meshStandardMaterial color="#4b5563" metalness={0.9} />
          </mesh>
          <mesh position={[x, 2.6, 4.5]} rotation={[-0.2, 0, -0.4]}>
            <cylinderGeometry args={[0.03, 0.03, 5.5, 4]} />
            <meshStandardMaterial color="#4b5563" metalness={0.9} />
          </mesh>
        </group>
      ))}

      {/* Chassis */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[9.5, 2.8, 2.5]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Screens displaying live mock game HUD */}
      {[-1.26, 1.26].map((z, idx) => (
        <mesh key={idx} position={[0, 0, z]} rotation={[0, z < 0 ? Math.PI : 0, 0]}>
          <planeGeometry args={[9.0, 2.4]} />
          <meshStandardMaterial
            color="#0ea5e9"
            emissive="#0284c7"
            emissiveIntensity={0.65}
            roughness={0.15}
          />
        </mesh>
      ))}
    </group>
  );
};

// ─── Surrounding Plaza & Landscaping ─────────────────────────────────────────
const PlazaEnvironment: React.FC = () => {
  const trees: [number, number][] = [
    [-26, -18], [-28, -22], [-24, -25], [-29, -15],
    [26, 18], [28, 22], [24, 25], [29, 15],
    [-26, 18], [-28, 22], [-24, 25], [-29, 15],
    [26, -18], [28, -22], [24, -25], [29, -15],
  ];

  return (
    <group>
      {/* Plaza concrete base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <planeGeometry args={[95, 95]} />
        <meshStandardMaterial color="#0b0f19" roughness={0.9} />
      </mesh>

      {/* Soft Ground Shadow Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.09, 0]}>
        <circleGeometry args={[24, 64]} />
        <meshBasicMaterial color="#020617" opacity={0.6} transparent />
      </mesh>

      {/* Asphalt apron roads */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.08, 0]}>
        <ringGeometry args={[25, 42, 64]} />
        <meshStandardMaterial color="#1e293b" roughness={0.95} />
      </mesh>

      {/* 3D Landscaped Trees */}
      {trees.map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh position={[0, 0.25, 0]}>
            <cylinderGeometry args={[0.05, 0.08, 0.5, 6]} />
            <meshStandardMaterial color="#78350f" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.7, 0]}>
            <coneGeometry args={[0.35, 0.8, 6]} />
            <meshStandardMaterial color="#166534" roughness={0.9} />
          </mesh>
        </group>
      ))}

      {/* Perimeter Columns (Outer Concrete Shell Support Ribs) */}
      {Array.from({ length: 16 }, (_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        const radius = 21.8;
        return (
          <mesh key={i} position={[Math.cos(angle) * radius, 2.5, Math.sin(angle) * radius]}>
            <cylinderGeometry args={[0.15, 0.25, 5.0, 8]} />
            <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.3} />
          </mesh>
        );
      })}
    </group>
  );
};

// ─── Main Assembly Export ───────────────────────────────────────────────────
export const StadiumMesh: React.FC<StadiumMeshProps> = ({
  activeDeck,
  emergencyMode,
  roofOpen,
}) => {
  return (
    <group>
      {/* 1. Surrounding landscape plaza, trees, and shadow grid */}
      <PlazaEnvironment />

      {/* 2. Football field pitch turf, boundaries, benches, and goalposts */}
      <Field />

      {/* Live active match simulation players layer */}
      <MatchSimulation />

      {/* 3. Seating bowl concrete supporting structure */}
      <Bowl activeDeck={activeDeck} />

      {/* 4. High-Performance GPU-Instanced seats rendering bowl */}
      <Seating emergencyMode={emergencyMode} />

      {/* 5. Soaring Structural Arch steel box trusses */}
      <StructuralArch />

      {/* 6. Suspended Center Jumbotron screens */}
      <TexasJumbotron />

      {/* 7. Entrances, checkpoints, and operable glass endzones */}
      <Gates />

      {/* 8. Retractable roof panels (left/right sliding down arches) */}
      <Roof roofOpen={roofOpen} emergencyMode={emergencyMode} />

      {/* 9. Dynamic Solar / Sky / Pitch illumination tracker */}
      <Lighting emergencyMode={emergencyMode} roofOpen={roofOpen} />
    </group>
  );
};

export default StadiumMesh;
