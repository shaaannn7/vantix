import React from 'react';
import * as THREE from 'three';

interface GoalpostsProps {
  x: number;
  isLeft: boolean;
}

const Goalposts: React.FC<GoalpostsProps> = ({ x, isLeft }) => {
  const postR = 0.06;
  const postH = 1.3;
  const crossW = 2.4;
  const netDepth = 0.8;
  const netDir = isLeft ? -1 : 1;

  return (
    <group position={[x, 0, 0]}>
      {/* Main Goal posts */}
      <mesh position={[0, postH / 2, -crossW / 2]}>
        <cylinderGeometry args={[postR, postR, postH, 8]} />
        <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.5} />
      </mesh>
      <mesh position={[0, postH / 2, crossW / 2]}>
        <cylinderGeometry args={[postR, postR, postH, 8]} />
        <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.5} />
      </mesh>
      <mesh position={[0, postH, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[postR, postR, crossW, 8]} />
        <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.5} />
      </mesh>

      {/* Goal netting back support */}
      <mesh position={[netDir * netDepth / 2, postH / 2, 0]}>
        <boxGeometry args={[netDepth, postH, crossW]} />
        <meshStandardMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

export const Field: React.FC = () => {
  const pitchW = 22;
  const pitchH = 14;
  const stripeCount = 11;
  const stripeW = pitchW / stripeCount;

  return (
    <group>
      {/* Turf Grass Stripes */}
      {Array.from({ length: stripeCount }, (_, i) => (
        <mesh
          key={i}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[-pitchW / 2 + stripeW * i + stripeW / 2, 0.01, 0]}
        >
          <planeGeometry args={[stripeW, pitchH]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? '#1b5e20' : '#2e7d32'}
            roughness={0.95}
          />
        </mesh>
      ))}

      {/* Outer Pitch Border */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <planeGeometry args={[pitchW + 0.6, pitchH + 0.6]} />
        <meshStandardMaterial color="#2d3748" roughness={1.0} />
      </mesh>

      {/* Boundaries & lines */}
      <mesh position={[0, 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.2, 2.25, 64]} />
        <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.015, -pitchH / 2]}>
        <boxGeometry args={[pitchW, 0.005, 0.06]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, 0.015, pitchH / 2]}>
        <boxGeometry args={[pitchW, 0.005, 0.06]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-pitchW / 2, 0.015, 0]}>
        <boxGeometry args={[0.06, 0.005, pitchH]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[pitchW / 2, 0.015, 0]}>
        <boxGeometry args={[0.06, 0.005, pitchH]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, 0.015, 0]}>
        <boxGeometry args={[0.06, 0.005, pitchH]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Sideline Player Benches */}
      <mesh position={[0, 0.15, -pitchH / 2 - 0.6]}>
        <boxGeometry args={[3.2, 0.25, 0.5]} />
        <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.15, pitchH / 2 + 0.6]}>
        <boxGeometry args={[3.2, 0.25, 0.5]} />
        <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Goals */}
      <Goalposts x={-pitchW / 2} isLeft={true} />
      <Goalposts x={pitchW / 2} isLeft={false} />
    </group>
  );
};

export default Field;
