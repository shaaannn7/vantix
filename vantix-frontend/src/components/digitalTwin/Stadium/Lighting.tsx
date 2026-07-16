import React from 'react';

interface LightingProps {
  emergencyMode: boolean;
  roofOpen: boolean;
}

export const Lighting: React.FC<LightingProps> = ({ emergencyMode, roofOpen }) => {
  // Sunlight intensity: increases when roof is open, dim/diffuse when closed
  const sunIntensity = roofOpen ? 1.6 : 0.85;

  return (
    <group>
      {/* Ambient sky lighting */}
      <ambientLight intensity={emergencyMode ? 0.3 : 0.45} />

      {/* Main Solar directional light (Sunlight) */}
      <directionalLight 
        position={[15, 30, 15]} 
        intensity={emergencyMode ? 0.4 : sunIntensity} 
      />

      {/* Bounce fill light */}
      <directionalLight 
        position={[-20, 20, -10]} 
        intensity={emergencyMode ? 0.2 : 0.65} 
        color="#bae6fd" 
      />

      {/* Hemisphere sky/ground gradient */}
      <hemisphereLight args={['#0ea5e9', '#1e293b', emergencyMode ? 0.15 : 0.4]} />

      {/* Interior Pitch spotlights and emergency beacons */}
      <pointLight
        position={[0, 6, 0]}
        intensity={emergencyMode ? 3.5 : 1.5}
        color={emergencyMode ? '#ef4444' : '#bae6fd'}
        distance={35}
      />
    </group>
  );
};

export default Lighting;
