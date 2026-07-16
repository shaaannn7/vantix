import React from 'react';
import SeatOptimizer from '../SeatOptimizer';

interface SeatingProps {
  emergencyMode: boolean;
}

export const Seating: React.FC<SeatingProps> = ({ emergencyMode }) => {
  return (
    <group>
      {/* High-Performance GPU-Instanced seats rendering bowl */}
      <SeatOptimizer emergencyMode={emergencyMode} />
    </group>
  );
};

export default Seating;
