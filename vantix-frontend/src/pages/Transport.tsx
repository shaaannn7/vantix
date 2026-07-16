import React from 'react';
import Sidebar from '@/components/navigation/Sidebar';
import TopBar from '@/components/navigation/TopBar';
import BottomTelemetryBar from '@/components/navigation/BottomTelemetryBar';
import AICopilotSidebar from '@/components/ai/AICopilotSidebar';
import AuraFAB from '@/components/ai/AuraFAB';
import { Train, Bus, RefreshCcw } from 'lucide-react';

export const Transport: React.FC = () => {
  const routes = [
    { id: 't-1', type: 'shuttle', name: 'Shuttle Line A (Azteca North)', status: 'FREQUENCY_HIGH', eta: '2 mins', delay: '0 min' },
    { id: 't-2', type: 'metro', name: 'Metro Azteca (Central Station)', status: 'NOMINAL', eta: '4 mins', delay: '1 min' },
    { id: 't-3', type: 'shuttle', name: 'Shuttle Line B (Azteca South)', status: 'DELAYED', eta: '9 mins', delay: '4 min' },
    { id: 't-4', type: 'metro', name: 'Metro Stadium Link L2', status: 'NOMINAL', eta: '3 mins', delay: '0 min' },
  ];

  return (
    <div className="flex flex-col h-screen w-screen bg-obsidian text-white overflow-hidden font-sans select-none">
      <TopBar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-md space-y-md flex flex-col scrollbar-none">
          <div className="flex flex-col gap-2xs">
            <span className="font-mono text-xs text-system-amber uppercase tracking-widest font-semibold">
              Transit Logistics Hub
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Transit Arrivals & Capacity HUD
            </h1>
            <p className="text-xs text-system-mutedText">
              Real-time monitoring of Metro routes, auxiliary shuttle bus lines, local parking occupancy, and visitor arrival rates.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-sm">
              <span className="text-[10px] text-system-mutedText uppercase font-mono block mb-2xs">Parking Occupancy</span>
              <span className="text-lg font-bold text-white">84.2%</span>
            </div>
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-sm">
              <span className="text-[10px] text-system-mutedText uppercase font-mono block mb-2xs">Transit Inflow Rate</span>
              <span className="text-lg font-bold text-system-cyan">1,240 / hour</span>
            </div>
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-sm">
              <span className="text-[10px] text-system-mutedText uppercase font-mono block mb-2xs">Mean Ingress Wait</span>
              <span className="text-lg font-bold text-system-green">Nominal</span>
            </div>
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-sm">
              <span className="text-[10px] text-system-mutedText uppercase font-mono block mb-2xs">Active Shuttles</span>
              <span className="text-lg font-bold text-system-cyan">16 Buses</span>
            </div>
          </div>

          <div className="bg-obsidian-muted border border-system-border rounded-xs p-md flex flex-col gap-md">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">Active Transit Registry</span>
              <button className="flex items-center gap-xs text-[10px] font-mono text-system-cyan hover:underline">
                <RefreshCcw className="w-3 h-3" />
                Refresh Feed
              </button>
            </div>
            
            <div className="space-y-xs">
              {routes.map((rt, idx) => (
                <div key={idx} className="bg-obsidian border border-system-border/40 p-xs rounded-xs flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-sm">
                    {rt.type === 'metro' ? (
                      <Train className="w-4 h-4 text-system-cyan" />
                    ) : (
                      <Bus className="w-4 h-4 text-system-amber" />
                    )}
                    <div>
                      <span className="font-semibold text-white">{rt.name}</span>
                      <span className="text-[8px] font-mono text-system-mutedText uppercase block">ID: {rt.id}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-lg font-mono text-[10px]">
                    <div>
                      <span className="text-[8px] text-system-mutedText block">ETA</span>
                      <span className="text-white">{rt.eta}</span>
                    </div>
                    <div>
                      <span className="text-[8px] text-system-mutedText block">Delay</span>
                      <span className={rt.delay === '0 min' ? 'text-system-green' : 'text-system-crimson'}>{rt.delay}</span>
                    </div>
                    <div>
                      <span className="text-[8px] text-system-mutedText block">Status</span>
                      <span className={rt.status === 'DELAYED' ? 'text-system-crimson' : 'text-system-green'}>{rt.status}</span>
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

export default Transport;
