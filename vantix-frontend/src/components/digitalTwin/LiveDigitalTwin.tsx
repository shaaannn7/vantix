import React, { useState, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Html, Line } from '@react-three/drei';
import { useTelemetryStore } from '@/store/telemetryStore';
import * as THREE from 'three';
import { 
  Map, 
  Users, 
  UserCheck, 
  ShieldAlert, 
  Train, 
  Play, 
  Pause, 
  Compass, 
  Activity, 
  Flame, 
  HeartPulse, 
  LogOut
} from 'lucide-react';

// --- Types ---
interface IncidentPin {
  id: string;
  type: 'medical' | 'fire' | 'security' | 'transport';
  title: string;
  position: [number, number, number];
  detail: string;
}

interface Volunteer {
  id: string;
  name: string;
  position: [number, number, number];
  status: 'active' | 'idle';
  eta: string;
}

import { StadiumMesh } from './StadiumMesh';
import { CrowdParticles } from './CrowdParticles';

// --- Custom Camera Controller (Orbit Target Animator) ---
const CameraController: React.FC<{ cameraView: string }> = ({ cameraView }) => {
  const { camera } = useThree();

  useEffect(() => {
    const duration = 1200;
    const startTime = performance.now();
    
    let targetPos = new THREE.Vector3(30, 22, 30);
    if (cameraView === 'top') targetPos.set(0, 42, 0.1);
    if (cameraView === 'isometric') targetPos.set(30, 22, 30);
    if (cameraView === 'north') targetPos.set(0, 10, -28); // Zoom Gate C/D
    if (cameraView === 'south') targetPos.set(-14, 8, 12);  // Zoom Sector West
    if (cameraView === 'pitch') targetPos.set(0, 3, 14);

    const startPos = camera.position.clone();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Snappy spring easing
      const ease = 1 - Math.pow(1 - progress, 4);

      camera.position.lerpVectors(startPos, targetPos, ease);
      camera.lookAt(0, 0, 0);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [cameraView, camera]);

  return null;
};

export const LiveDigitalTwin: React.FC = () => {
  // Navigation & Layers States
  const [activeLayers, setActiveLayers] = useState({
    heatmap: true,
    crowd: true,
    volunteers: true,
    emergency: true,
    transport: false,
  });

  const [activeDeck, setActiveDeck] = useState('lower');
  const [cameraView, setCameraView] = useState('isometric');
  const [predictionOffset, setPredictionOffset] = useState(0); // 0, 5, 15, 30 min
  const [roofOpen, setRoofOpen] = useState(true);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [playbackActive, setPlaybackActive] = useState(true);
  const [selectedIncident, setSelectedIncident] = useState<IncidentPin | null>(null);

  // Global Telemetry Store emergency synchronization
  const emergencyType = useTelemetryStore((state) => state.emergencyType);
  const setEmergencyType = useTelemetryStore((state) => state.setEmergencyType);

  const emergencyMode = emergencyType !== 'none';

  // Automatically sweep camera based on selected emergency type
  useEffect(() => {
    if (emergencyType === 'fire') {
      setCameraView('south');
    } else if (emergencyType === 'surge') {
      setCameraView('north');
    } else if (emergencyType === 'evacuation') {
      setCameraView('top');
      setRoofOpen(true); // Automatically retract roof panels on evacuation for ventilation
    } else {
      setCameraView('isometric');
    }
  }, [emergencyType]);

  const handleRoofToggle = () => {
    const nextState = !roofOpen;
    setRoofOpen(nextState);
    const previousView = cameraView;
    setCameraView('top');
    setTimeout(() => {
      setCameraView(previousView);
    }, 2800);
  };

  // Mock Telemetry Anchors
  const mockIncidents: IncidentPin[] = [
    { id: 'inc-1', type: 'fire', title: 'Thermal Alert: Sector West', position: [-12, 1.5, 6], detail: 'Thermal progression sensor flags 94°C on arch joint.' },
    { id: 'inc-2', type: 'security', title: 'Security Alert: Gate C Ingress', position: [16, 0.5, -8], detail: 'Optical crowd count exceeds 4.2 fans/m².' },
  ];

  const mockVolunteers: Volunteer[] = [
    { id: 'v-1', name: 'R. Garcia', position: [-5, 0.4, 13], status: 'active', eta: '3 mins' },
    { id: 'v-2', name: 'L. Chen', position: [10, 0.4, -11], status: 'idle', eta: 'N/A' },
  ];

  const mockTransitHubs = [
    { id: 't-1', name: 'Shuttle Line A', position: [-22, 0.2, -18] as [number, number, number], status: 'FREQUENCY_HIGH' },
    { id: 't-2', name: 'Metro Azteca', position: [22, 0.2, 18] as [number, number, number], status: 'NOMINAL' },
  ];

  const toggleLayer = (layer: keyof typeof activeLayers) => {
    setActiveLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  return (
    <div className="bg-obsidian-muted border border-system-border rounded-xs flex flex-col h-full relative overflow-hidden select-none shadow-high font-sans">
      
      {/* 1. HUD Header Info */}
      <div className="absolute top-md left-md z-10 flex flex-col gap-2xs bg-obsidian-elevated/80 border border-system-border/60 p-sm rounded-xs backdrop-blur-command">
        <span className="font-mono text-[8px] text-system-mutedText uppercase tracking-widest">AT&T Stadium Digital Twin</span>
        <span className="text-xs font-bold text-white tracking-wide">Live Telemetry Model</span>
        <div className="flex items-center gap-xs font-mono text-[8px] text-system-cyan mt-[2px]">
          <span className="w-1.5 h-1.5 bg-system-green rounded-full animate-ping" />
          <span>L3_WORKSPACE_ONLINE (60FPS)</span>
        </div>
      </div>

      {/* 2. Top Right Camera view selector */}
      <div className="absolute top-md right-md z-10 flex items-center gap-xs bg-obsidian-elevated/80 border border-system-border/60 p-xs rounded-xs backdrop-blur-command">
        <button 
          onClick={() => setCameraView('top')}
          aria-label="Top down ortho camera angle"
          aria-pressed={cameraView === 'top'}
          className={`px-sm py-xs font-mono text-[9px] uppercase rounded-2xs ${cameraView === 'top' ? 'text-system-cyan font-bold bg-system-cyan/10' : 'text-system-mutedText hover:text-white'}`}
        >
          Top
        </button>
        <div className="w-[1px] bg-system-border h-3" />
        <button 
          onClick={() => setCameraView('isometric')}
          aria-label="Isometric perspective camera angle"
          aria-pressed={cameraView === 'isometric'}
          className={`px-sm py-xs font-mono text-[9px] uppercase rounded-2xs ${cameraView === 'isometric' ? 'text-system-cyan font-bold bg-system-cyan/10' : 'text-system-mutedText hover:text-white'}`}
        >
          Iso
        </button>
        <div className="w-[1px] bg-system-border h-3" />
        <button 
          onClick={() => setCameraView('pitch')}
          aria-label="Ground level pitch side camera angle"
          aria-pressed={cameraView === 'pitch'}
          className={`px-sm py-xs font-mono text-[9px] uppercase rounded-2xs ${cameraView === 'pitch' ? 'text-system-cyan font-bold bg-system-cyan/10' : 'text-system-mutedText hover:text-white'}`}
        >
          Pitch
        </button>
      </div>

      {/* 3. Left floor Deck levels controls */}
      <div className="absolute bottom-[80px] left-md z-10 flex flex-col gap-2xs bg-obsidian-elevated/80 border border-system-border/60 p-xs rounded-xs backdrop-blur-command">
        <span className="font-mono text-[7px] text-system-mutedText uppercase text-center border-b border-system-border/40 pb-[2px] mb-[2px]">Decks</span>
        {['upper', 'mid', 'lower'].map((deck) => (
          <button 
            key={deck}
            onClick={() => setActiveDeck(deck)}
            aria-label={`Select ${deck} tier`}
            aria-pressed={activeDeck === deck}
            className={`px-sm py-[4px] rounded-2xs text-[9px] font-mono uppercase text-left transition-colors ${
              activeDeck === deck 
                ? 'bg-system-cyan/20 border border-system-cyan/30 text-system-cyan font-bold' 
                : 'text-system-mutedText hover:text-white'
            }`}
          >
            {deck}
          </button>
        ))}
      </div>

      {/* 4. Left side Emergency Crisis Interactive Selector (Tesla / Smart City style segment buttons) */}
      <div className="absolute top-[80px] left-md z-10 flex flex-col gap-xs w-[172px]">
        <div className="bg-obsidian-elevated/80 border border-system-border/60 p-sm rounded-xs backdrop-blur-command flex flex-col gap-xs">
          <span className="font-mono text-[8px] text-system-mutedText uppercase tracking-wider font-semibold">Triage Simulation</span>
          
          <div className="grid grid-cols-1 gap-[2px] font-mono text-[8px]">
            {/* NORMAL STATE */}
            <button
              onClick={() => setEmergencyType('none')}
              aria-label="Set operations to nominal status"
              className={`flex items-center gap-xs px-sm py-[5px] rounded-2xs text-left border transition-all ${
                emergencyType === 'none'
                  ? 'bg-system-green/10 border-system-green/30 text-system-green font-bold'
                  : 'bg-obsidian border-transparent text-system-mutedText hover:text-white'
              }`}
            >
              <Activity className="w-3 h-3" />
              <span>Normal Ops</span>
            </button>

            {/* FIRE CRISIS */}
            <button
              onClick={() => setEmergencyType('fire')}
              aria-label="Simulate fire incident in West concourse"
              className={`flex items-center gap-xs px-sm py-[5px] rounded-2xs text-left border transition-all ${
                emergencyType === 'fire'
                  ? 'bg-system-crimson/10 border-system-crimson/30 text-system-crimson font-bold'
                  : 'bg-obsidian border-transparent text-system-mutedText hover:text-white'
              }`}
            >
              <Flame className="w-3 h-3" />
              <span>Fire Threat</span>
            </button>

            {/* MEDICAL ASSIST */}
            <button
              onClick={() => setEmergencyType('medical')}
              aria-label="Simulate medical distress incident near concessions"
              className={`flex items-center gap-xs px-sm py-[5px] rounded-2xs text-left border transition-all ${
                emergencyType === 'medical'
                  ? 'bg-system-cyan/10 border-system-cyan/30 text-system-cyan font-bold'
                  : 'bg-obsidian border-transparent text-system-mutedText hover:text-white'
              }`}
            >
              <HeartPulse className="w-3 h-3" />
              <span>Medical Alert</span>
            </button>

            {/* CROWD SURGE */}
            <button
              onClick={() => setEmergencyType('surge')}
              aria-label="Simulate crowd bottleneck at main ingress turnstile"
              className={`flex items-center gap-xs px-sm py-[5px] rounded-2xs text-left border transition-all ${
                emergencyType === 'surge'
                  ? 'bg-system-purple/10 border-system-purple/30 text-system-purple font-bold'
                  : 'bg-obsidian border-transparent text-system-mutedText hover:text-white'
              }`}
            >
              <Users className="w-3 h-3" />
              <span>Crowd Surge</span>
            </button>

            {/* EVACUATION */}
            <button
              onClick={() => setEmergencyType('evacuation')}
              aria-label="Trigger full stadium evacuation protocol"
              className={`flex items-center gap-xs px-sm py-[5px] rounded-2xs text-left border transition-all ${
                emergencyType === 'evacuation'
                  ? 'bg-system-amber/20 border-system-amber/40 text-system-amber font-bold animate-pulse'
                  : 'bg-obsidian border-transparent text-system-mutedText hover:text-white'
              }`}
            >
              <LogOut className="w-3 h-3" />
              <span>Mass Evac</span>
            </button>
          </div>
        </div>

        <button 
          onClick={handleRoofToggle}
          aria-label="Toggle retractable roof open or closed"
          className={`flex items-center justify-center py-xs border rounded-xs font-mono text-[9px] uppercase transition-all duration-200 bg-obsidian-elevated/80 ${
            roofOpen 
              ? 'border-system-cyan/50 text-system-cyan font-bold hover:border-system-cyan' 
              : 'border-system-border text-system-mutedText hover:text-white hover:bg-obsidian-sub'
          }`}
        >
          <span>Roof: {roofOpen ? 'Retracted' : 'Closed'}</span>
        </button>
      </div>

      {/* 5. Right side Layer Selectors */}
      <div className="absolute right-md top-[56px] z-10 flex flex-col gap-xs bg-obsidian-elevated/80 border border-system-border/60 p-sm rounded-xs backdrop-blur-command">
        <span className="font-mono text-[8px] text-system-mutedText uppercase pb-2xs">Layers</span>
        
        <button 
          onClick={() => toggleLayer('heatmap')}
          aria-label="Toggle crowd density heatmap layer"
          aria-pressed={activeLayers.heatmap}
          className={`flex items-center gap-sm px-sm py-[5px] rounded-2xs text-[10px] font-mono border transition-colors ${
            activeLayers.heatmap 
              ? 'bg-system-purple/10 border-system-purple/20 text-system-purple' 
              : 'bg-transparent border-transparent text-system-mutedText'
          }`}
        >
          <Map className="w-3.5 h-3.5" />
          <span>Density Map</span>
        </button>

        <button 
          onClick={() => toggleLayer('crowd')}
          aria-label="Toggle active crowd flow lines"
          aria-pressed={activeLayers.crowd}
          className={`flex items-center gap-sm px-sm py-[5px] rounded-2xs text-[10px] font-mono border transition-colors ${
            activeLayers.crowd 
              ? 'bg-system-cyan/10 border-system-cyan/20 text-system-cyan' 
              : 'bg-transparent border-transparent text-system-mutedText'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Crowd Flow</span>
        </button>

        <button 
          onClick={() => toggleLayer('volunteers')}
          aria-label="Toggle volunteer GPS locs"
          aria-pressed={activeLayers.volunteers}
          className={`flex items-center gap-sm px-sm py-[5px] rounded-2xs text-[10px] font-mono border transition-colors ${
            activeLayers.volunteers 
              ? 'bg-system-green/10 border-system-green/20 text-system-green' 
              : 'bg-transparent border-transparent text-system-mutedText'
          }`}
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>Volunteer Locs</span>
        </button>

        <button 
          onClick={() => toggleLayer('emergency')}
          aria-label="Toggle active warning beacons"
          aria-pressed={activeLayers.emergency}
          className={`flex items-center gap-sm px-sm py-[5px] rounded-2xs text-[10px] font-mono border transition-colors ${
            activeLayers.emergency 
              ? 'bg-system-crimson/10 border-system-crimson/20 text-system-crimson' 
              : 'bg-transparent border-transparent text-system-mutedText'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Alert Nodes</span>
        </button>

        <button 
          onClick={() => toggleLayer('transport')}
          aria-label="Toggle transit arrival points"
          aria-pressed={activeLayers.transport}
          className={`flex items-center gap-sm px-sm py-[5px] rounded-2xs text-[10px] font-mono border transition-colors ${
            activeLayers.transport 
              ? 'bg-system-amber/10 border-system-amber/20 text-system-amber' 
              : 'bg-transparent border-transparent text-system-mutedText'
          }`}
        >
          <Train className="w-3.5 h-3.5" />
          <span>Transit Hubs</span>
        </button>
      </div>

      {/* 6. Main 3D Canvas viewport */}
      <div className="flex-1 bg-obsidian relative min-h-[440px]">
        <Canvas camera={{ position: [30, 22, 30], fov: 42 }}>
          <fog attach="fog" args={['#050506', 35, 75]} />
          <ambientLight intensity={0.45} />
          <directionalLight position={[20, 30, 15]} intensity={1.8} />
          <directionalLight position={[-20, 20, -10]} intensity={0.6} color="#bae6fd" />
          <hemisphereLight args={['#0ea5e9', '#1e293b', 0.4]} />
          
          {/* Main 3D Stadium mesh layout */}
          <StadiumMesh activeDeck={activeDeck} emergencyMode={emergencyMode} roofOpen={roofOpen} />

          {/* Crowd Simulation particles layer */}
          {activeLayers.crowd && (
            <CrowdParticles 
              densityFactor={playbackActive ? (1 + predictionOffset * 0.05) : 0} 
              heatmapActive={activeLayers.heatmap} 
              emergencyMode={emergencyMode}
            />
          )}

          {/* Incident beacons (pins) layer */}
          {activeLayers.emergency && mockIncidents.map((inc) => {
            const isMatchingCrisis = emergencyType === inc.type || (emergencyType === 'surge' && inc.type === 'security') || (emergencyType === 'evacuation');
            if (emergencyType !== 'none' && !isMatchingCrisis) return null;

            return (
              <group key={inc.id} position={inc.position}>
                {/* Beacons cylinder */}
                <mesh>
                  <cylinderGeometry args={[0.02, 0.4, 3, 16]} />
                  <meshBasicMaterial color="#ef4444" opacity={0.35} transparent />
                </mesh>
                {/* Beacons head */}
                <mesh position={[0, 1.5, 0]} onClick={() => setSelectedIncident(inc)}>
                  <sphereGeometry args={[0.3, 16, 16]} />
                  <meshBasicMaterial color="#ef4444" />
                </mesh>

                {/* Floating HTML 2D Label */}
                <Html distanceFactor={14} position={[0, 2, 0]}>
                  <button 
                    onClick={() => setSelectedIncident(inc)}
                    className="bg-obsidian-elevated/90 border border-system-crimson/50 text-[9px] font-mono text-white px-sm py-[2px] rounded-2xs whitespace-nowrap hover:bg-system-crimson transition-colors"
                  >
                    {inc.title}
                  </button>
                </Html>
              </group>
            );
          })}

          {/* Volunteer positions layer */}
          {activeLayers.volunteers && mockVolunteers.map((vol) => (
            <group key={vol.id} position={vol.position}>
              <mesh>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshBasicMaterial color="#10b981" />
              </mesh>
              <Html distanceFactor={12} position={[0, 0.5, 0]}>
                <div className="bg-obsidian-muted/90 border border-system-green/40 text-[8px] font-mono text-white px-xs rounded-2xs whitespace-nowrap">
                  {vol.name} // {vol.status}
                </div>
              </Html>
            </group>
          ))}

          {/* Transit Hubs layer */}
          {activeLayers.transport && mockTransitHubs.map((hub) => (
            <group key={hub.id} position={hub.position}>
              <mesh>
                <boxGeometry args={[0.4, 0.4, 0.4]} />
                <meshBasicMaterial color="#f59e0b" />
              </mesh>
              <Html distanceFactor={12} position={[0, 0.6, 0]}>
                <div className="bg-obsidian-muted/90 border border-system-amber/40 text-[8px] font-mono text-white px-xs rounded-2xs whitespace-nowrap">
                  🚍 {hub.name} ({hub.status})
                </div>
              </Html>
            </group>
          ))}

          {/* Dynamic Splines for Guidance / Evacuation */}
          {emergencyType === 'fire' && (
            <Line 
              points={[[-12, 0.5, 6], [-2, 0.3, 8], [8, 0.3, 14], [18, 0.4, 22]]} 
              color="#ef4444" 
              lineWidth={2} 
              dashed 
            />
          )}

          {emergencyType === 'surge' && (
            <Line 
              points={[[16, 0.2, -8], [8, 0.2, -14], [0, 0.2, -18], [-10, 0.2, -22]]} 
              color="#a855f7" 
              lineWidth={3} 
            />
          )}

          {emergencyType === 'evacuation' && (
            <Line 
              points={[[-12, 0.5, 6], [-8, 0.3, 2], [0, 0.3, -10], [16, 0.4, -18]]} 
              color="#10b981" 
              lineWidth={2.5} 
              dashed 
            />
          )}

          {selectedSeat && (
            <Line 
              points={[[-2, 0.2, -2], [2, 0.2, 2], [6, 0.2, 8]]} 
              color="#06b6d4" 
              lineWidth={3} 
            />
          )}

          {/* Orbit camera controls */}
          <OrbitControls 
            enablePan={true} 
            enableZoom={true} 
            maxPolarAngle={Math.PI / 2.05} 
            minDistance={12} 
            maxDistance={70} 
          />

          {/* Custom Camera views controls binder */}
          <CameraController cameraView={cameraView} />
        </Canvas>

        {/* Dynamic tooltip box overlay (bottom right) */}
        {selectedIncident && (
          <div className="absolute bottom-[64px] right-md z-10 w-[240px] bg-obsidian-elevated/90 border border-system-crimson rounded-xs p-sm backdrop-blur-command animate-fadeIn">
            <div className="flex items-center justify-between border-b border-system-border/40 pb-2xs mb-xs">
              <span className="font-mono text-[9px] text-system-crimson font-bold uppercase">Critical Dispatch Alert</span>
              <button onClick={() => setSelectedIncident(null)} className="text-system-mutedText hover:text-white font-mono text-[9px]">Close</button>
            </div>
            <p className="text-xs font-semibold text-white">{selectedIncident.title}</p>
            <p className="text-[11px] text-system-mutedText mt-[2px]">{selectedIncident.detail}</p>
          </div>
        )}
      </div>

      {/* 7. Bottom Playback and Prediction Timeline Bar Controls */}
      <div className="h-[48px] bg-obsidian-elevated border-t border-system-border px-lg flex items-center justify-between gap-xl shrink-0 select-none">
        
        {/* Playback simulation status triggers */}
        <div className="flex items-center gap-md shrink-0">
          <button 
            onClick={() => setPlaybackActive(!playbackActive)}
            aria-label={playbackActive ? "Pause simulation tracking" : "Resume simulation tracking"}
            className="p-xs bg-obsidian hover:bg-obsidian-sub border border-system-border rounded-2xs text-system-cyan hover:text-white transition-colors"
          >
            {playbackActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          
          <div className="flex items-center gap-xs font-mono text-[9px] text-system-mutedText uppercase">
            <Compass className="w-3.5 h-3.5" />
            <span>Telemetry playback</span>
          </div>
        </div>

        {/* Prediction time slider */}
        <div className="flex-1 max-w-md flex items-center gap-md">
          <span className="font-mono text-[9px] text-system-mutedText uppercase shrink-0">Prediction offset:</span>
          <input 
            type="range" 
            min="0" 
            max="3" 
            aria-label="Adjust simulation time prediction offset"
            value={predictionOffset === 0 ? 0 : predictionOffset === 5 ? 1 : predictionOffset === 15 ? 2 : 3}
            onChange={(e) => {
              const vals = [0, 5, 15, 30];
              setPredictionOffset(vals[parseInt(e.target.value)]);
            }}
            className="flex-1 h-[2px] bg-obsidian border border-system-border accent-system-cyan rounded-full appearance-none cursor-pointer"
          />
          <span className="font-mono text-[10px] text-system-cyan font-bold shrink-0 min-w-[48px] text-right">
            {predictionOffset === 0 ? 'CURRENT' : `+${predictionOffset} MIN`}
          </span>
        </div>

        {/* Seat navigation mode toggle */}
        <div className="shrink-0 flex items-center gap-sm">
          <button 
            onClick={() => setSelectedSeat(selectedSeat ? null : 'SEC-104')}
            aria-label="Toggle passenger seat routing guide"
            aria-pressed={!!selectedSeat}
            className={`px-sm py-xs border rounded-xs font-mono text-[9px] uppercase transition-colors ${
              selectedSeat 
                ? 'bg-system-cyan/20 border-system-cyan/40 text-system-cyan font-bold' 
                : 'bg-obsidian hover:bg-obsidian-sub border-system-border text-system-mutedText hover:text-white'
            }`}
          >
            {selectedSeat ? 'Seat Routing: Active' : 'Seat Route Guide'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveDigitalTwin;
