import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface PlayerState {
  id: string;
  name: string;
  number: number;
  team: 'MEX' | 'BRA' | 'REF';
  color: string;
  textColor: string;
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  baseX: number;
  baseZ: number;
}

export const MatchSimulation: React.FC = () => {
  // 1. Initialize 11 players (5 MEX, 5 BRA, 1 Ref)
  const players = useMemo<PlayerState[]>(() => [
    // Team Mexico (MEX) - Green
    { id: 'm1', name: 'R. Jimenez', number: 9, team: 'MEX', color: '#15803d', textColor: '#ffffff', pos: new THREE.Vector3(-3, 0.05, -2), vel: new THREE.Vector3(), baseX: -4, baseZ: -2 },
    { id: 'm2', name: 'H. Herrera', number: 16, team: 'MEX', color: '#15803d', textColor: '#ffffff', pos: new THREE.Vector3(-6, 0.05, 3), vel: new THREE.Vector3(), baseX: -6, baseZ: 3 },
    { id: 'm3', name: 'H. Lozano', number: 11, team: 'MEX', color: '#15803d', textColor: '#ffffff', pos: new THREE.Vector3(-2, 0.05, 4), vel: new THREE.Vector3(), baseX: -3, baseZ: 4 },
    { id: 'm4', name: 'J. Gallardo', number: 23, team: 'MEX', color: '#15803d', textColor: '#ffffff', pos: new THREE.Vector3(-8, 0.05, -3), vel: new THREE.Vector3(), baseX: -8, baseZ: -3 },
    { id: 'm5', name: 'G. Ochoa', number: 13, team: 'MEX', color: '#059669', textColor: '#ffffff', pos: new THREE.Vector3(-10.5, 0.05, 0), vel: new THREE.Vector3(), baseX: -10.5, baseZ: 0 },

    // Team Brazil (BRA) - Yellow
    { id: 'b1', name: 'Neymar Jr', number: 10, team: 'BRA', color: '#eab308', textColor: '#1e3a5f', pos: new THREE.Vector3(3, 0.05, 2), vel: new THREE.Vector3(), baseX: 4, baseZ: 2 },
    { id: 'b2', name: 'Vinicius Jr', number: 7, team: 'BRA', color: '#eab308', textColor: '#1e3a5f', pos: new THREE.Vector3(5, 0.05, -3), vel: new THREE.Vector3(), baseX: 5, baseZ: -3 },
    { id: 'b3', name: 'Casemiro', number: 5, team: 'BRA', color: '#eab308', textColor: '#1e3a5f', pos: new THREE.Vector3(2, 0.05, -1), vel: new THREE.Vector3(), baseX: 2, baseZ: -1 },
    { id: 'b4', name: 'Marquinhos', number: 4, team: 'BRA', color: '#eab308', textColor: '#1e3a5f', pos: new THREE.Vector3(7, 0.05, 2), vel: new THREE.Vector3(), baseX: 7, baseZ: 2 },
    { id: 'b5', name: 'Alisson B.', number: 1, team: 'BRA', color: '#ca8a04', textColor: '#ffffff', pos: new THREE.Vector3(10.5, 0.05, 0), vel: new THREE.Vector3(), baseX: 10.5, baseZ: 0 },

    // Referee - Black
    { id: 'r1', name: 'Referee', number: 0, team: 'REF', color: '#18181b', textColor: '#ffffff', pos: new THREE.Vector3(0, 0.05, 1), vel: new THREE.Vector3(), baseX: 0, baseZ: 1 }
  ], []);

  // Ball states
  const ballPos = useMemo(() => new THREE.Vector3(0, 0.08, 0), []);
  const ballTarget = useMemo(() => new THREE.Vector3(0, 0.08, 0), []);
  const ballOwnerIndex = useRef<number>(0);
  const lastPassTime = useRef<number>(0);

  // Group references for position updates
  const playerGroupsRef = useRef<(THREE.Group | null)[]>([]);
  const ballRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();

    // 1. Pass the ball periodically
    if (elapsed - lastPassTime.current > 3.5) {
      // Find a teammate of the current ball owner to pass to
      const owner = players[ballOwnerIndex.current];
      const teammates = players.map((p, idx) => ({ p, idx })).filter(
        item => item.p.team === owner.team && item.idx !== ballOwnerIndex.current
      );
      
      if (teammates.length > 0) {
        const nextOwner = teammates[Math.floor(Math.random() * teammates.length)].idx;
        ballOwnerIndex.current = nextOwner;
        ballTarget.copy(players[nextOwner].pos);
      }
      lastPassTime.current = elapsed;
    }

    // 2. Update players positions
    players.forEach((p, idx) => {
      // Base positions with small dynamic sway
      const targetX = p.baseX + Math.sin(elapsed * 0.8 + idx) * 2.5;
      const targetZ = p.baseZ + Math.cos(elapsed * 1.1 + idx) * 2.0;

      // If this player is the ball owner, push them towards the opponent goal
      let finalTargetX = targetX;
      let finalTargetZ = targetZ;

      if (idx === ballOwnerIndex.current) {
        // Move towards the opposition goal
        const goalDir = p.team === 'MEX' ? 9.5 : -9.5;
        finalTargetX = p.pos.x + (goalDir - p.pos.x) * 0.25;
        finalTargetZ = p.pos.z + (0 - p.pos.z) * 0.15;
      }

      // Simple spring damping movement physics
      const dx = finalTargetX - p.pos.x;
      const dz = finalTargetZ - p.pos.z;
      p.pos.x += dx * 0.05;
      p.pos.z += dz * 0.05;

      // Restrict to pitch boundaries
      p.pos.x = Math.max(-10.8, Math.min(10.8, p.pos.x));
      p.pos.z = Math.max(-6.8, Math.min(6.8, p.pos.z));

      // Update 3D Group matrix positions
      const group = playerGroupsRef.current[idx];
      if (group) {
        group.position.set(p.pos.x, p.pos.y, p.pos.z);
      }
    });

    // 3. Move the Ball towards the current owner
    const ownerPos = players[ballOwnerIndex.current].pos;
    // Ball follows slightly ahead or behind based on velocity
    ballTarget.copy(ownerPos);
    
    // Lerp ball position
    ballPos.lerp(ballTarget, 0.15);
    
    // Add small bounce arc using sine of time if ball is moving
    const distToOwner = ballPos.distanceTo(ownerPos);
    const bounceHeight = distToOwner > 0.5 ? Math.abs(Math.sin(elapsed * 5)) * 0.22 : 0;
    
    if (ballRef.current) {
      ballRef.current.position.set(ballPos.x, 0.06 + bounceHeight, ballPos.z);
    }
  });

  return (
    <group>
      {/* 3D Soccer Ball */}
      <mesh ref={ballRef} position={[0, 0.06, 0]}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
      </mesh>

      {/* Render 11 Dynamic Players */}
      {players.map((p, idx) => (
        <group
          key={p.id}
          ref={(el) => {
            playerGroupsRef.current[idx] = el;
          }}
          position={[p.pos.x, p.pos.y, p.pos.z]}
        >
          {/* Player Disc shape */}
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.26, 0.26, 0.05, 12]} />
            <meshStandardMaterial color={p.color} roughness={0.3} metalness={0.6} />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
            <ringGeometry args={[0.28, 0.35, 12]} />
            <meshBasicMaterial color="#ffffff" opacity={0.5} transparent />
          </mesh>

          {/* Floating HUD jersey tag */}
          {p.team !== 'REF' && (
            <Html distanceFactor={14} position={[0, 0.35, 0]}>
              <div className="flex items-center gap-[3px] bg-obsidian-elevated/95 border border-system-border/80 px-[4px] py-[1px] rounded-xs text-[7px] font-mono whitespace-nowrap shadow-high text-white">
                <span 
                  className="font-bold px-[3px] py-[0.5px] rounded-2xs text-[6px]" 
                  style={{ backgroundColor: p.color, color: p.textColor }}
                >
                  {p.number}
                </span>
                <span>{p.name.split(' ')[0]}</span>
              </div>
            </Html>
          )}
        </group>
      ))}
    </group>
  );
};

export default MatchSimulation;
