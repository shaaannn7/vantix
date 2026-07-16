import React from 'react';
import Sidebar from '@/components/navigation/Sidebar';
import TopBar from '@/components/navigation/TopBar';
import BottomTelemetryBar from '@/components/navigation/BottomTelemetryBar';
import AICopilotSidebar from '@/components/ai/AICopilotSidebar';
import AuraFAB from '@/components/ai/AuraFAB';
import { Users, RefreshCcw } from 'lucide-react';

export const CrowdIntelligence: React.FC = () => {
  const sectors = [
    { id: 'SEC-W1', name: 'West Gate Entrance', flow: 140, density: '4.2/m²', status: 'CONGESTED', color: 'text-system-crimson' },
    { id: 'SEC-N2', name: 'North concourse', flow: 85, density: '1.8/m²', status: 'NOMINAL', color: 'text-system-green' },
    { id: 'SEC-E4', name: 'East Gate Ingress', flow: 120, density: '3.1/m²', status: 'HEAVY', color: 'text-system-amber' },
    { id: 'SEC-S1', name: 'South Concourse L3', flow: 55, density: '0.8/m²', status: 'CLEAR', color: 'text-system-green' },
  ];

  return (
    <div className="flex flex-col h-screen w-screen bg-obsidian text-white overflow-hidden font-sans select-none">
      <TopBar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-md space-y-md flex flex-col scrollbar-none">
          <div className="flex flex-col gap-2xs">
            <span className="font-mono text-xs text-system-cyan uppercase tracking-widest font-semibold">
              Crowd Intelligence OS
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Sector Flow & Density Control
            </h1>
            <p className="text-xs text-system-mutedText">
              Real-time monitoring of ingress turnstiles, concourse choke points, and exit density grids.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-sm">
              <span className="text-[10px] text-system-mutedText uppercase font-mono block mb-2xs">Total Ingress Rate</span>
              <span className="text-lg font-bold text-white">402 / min</span>
            </div>
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-sm">
              <span className="text-[10px] text-system-mutedText uppercase font-mono block mb-2xs">Peak Ingress Sector</span>
              <span className="text-lg font-bold text-system-crimson">West Gate</span>
            </div>
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-sm">
              <span className="text-[10px] text-system-mutedText uppercase font-mono block mb-2xs">Mean Ingress Wait</span>
              <span className="text-lg font-bold text-system-cyan">6.4 mins</span>
            </div>
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-sm">
              <span className="text-[10px] text-system-mutedText uppercase font-mono block mb-2xs">Flow Efficiency</span>
              <span className="text-lg font-bold text-system-green">94.8%</span>
            </div>
          </div>

          <div className="bg-obsidian-muted border border-system-border rounded-xs p-md flex flex-col gap-md">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">Ingress Sector Registry</span>
              <button className="flex items-center gap-xs text-[10px] font-mono text-system-cyan hover:underline">
                <RefreshCcw className="w-3 h-3" />
                Refresh Feed
              </button>
            </div>
            
            <div className="space-y-xs">
              {sectors.map((sec, idx) => (
                <div key={idx} className="bg-obsidian border border-system-border/40 p-xs rounded-xs flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-sm">
                    <Users className="w-4 h-4 text-system-cyan" />
                    <div>
                      <span className="font-semibold text-white">{sec.name}</span>
                      <span className="text-[8px] font-mono text-system-mutedText uppercase block">ID: {sec.id}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-lg font-mono text-[10px]">
                    <div>
                      <span className="text-[8px] text-system-mutedText block">Flow</span>
                      <span className="text-white">{sec.flow} p/m</span>
                    </div>
                    <div>
                      <span className="text-[8px] text-system-mutedText block">Density</span>
                      <span className="text-white">{sec.density}</span>
                    </div>
                    <div>
                      <span className="text-[8px] text-system-mutedText block">Status</span>
                      <span className={sec.color}>{sec.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
        <AICopilotSidebar />
      </div>
      <BottomTelemetryBar />
      <AuraFAB />
    </div>
  );
};

export default CrowdIntelligence;
