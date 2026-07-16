import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import RoofTracks from './RoofTracks';
import RoofPanelLeft from './RoofPanelLeft';
import RoofPanelRight from './RoofPanelRight';

interface RoofProps {
  roofOpen: boolean;
  emergencyMode: boolean;
}

export const Roof: React.FC<RoofProps> = ({ roofOpen, emergencyMode }) => {
  const panelLeftRef = useRef<THREE.Group>(null);
  const panelRightRef = useRef<THREE.Group>(null);

  // Target rotations (closed = 0.0, open = +/-0.28 radians sliding down arches)
  const targetRotation = roofOpen ? 0.28 : 0.0;
  const currentRotation = useRef(targetRotation);

  useFrame(() => {
    // Smooth mechanical interpolation (spring action LERP)
    currentRotation.current += (targetRotation - currentRotation.current) * 0.05;

    if (panelLeftRef.current) {
      panelLeftRef.current.rotation.z = -currentRotation.current;
    }
    if (panelRightRef.current) {
      panelRightRef.current.rotation.z = currentRotation.current;
    }
  });

  const getRoofColor = () => (emergencyMode ? '#7f1d1d' : '#f8fafc');

  return (
    <group>
      {/* Fixed guide rails tracks */}
      <RoofTracks />

      {/* Retractable Panels Group centered on arch pivot (0, -8.5, 0) */}
      <group position={[0, -8.5, 0]}>
        {/* Left operable panel (West) */}
        <group ref={panelLeftRef}>
          <RoofPanelLeft color={getRoofColor()} />
        </group>

        {/* Right operable panel (East) */}
        <group ref={panelRightRef}>
          <RoofPanelRight color={getRoofColor()} />
        </group>
      </group>
    </group>
  );
};

export default Roof;
