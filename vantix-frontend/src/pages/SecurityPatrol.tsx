import React from 'react';
import Sidebar from '@/components/navigation/Sidebar';
import TopBar from '@/components/navigation/TopBar';
import BottomTelemetryBar from '@/components/navigation/BottomTelemetryBar';
import AICopilotSidebar from '@/components/ai/AICopilotSidebar';
import AuraFAB from '@/components/ai/AuraFAB';
import { ShieldCheck, RefreshCcw } from 'lucide-react';

export const SecurityPatrol: React.FC = () => {
  const patrols = [
    { id: 'pat-1', name: 'Alpha Squad', zone: 'Sector West Plaza', status: 'PATROLLING', members: 4 },
    { id: 'pat-2', name: 'Beta Squad', zone: 'Concourse level L2', status: 'STATIONED', members: 3 },
    { id: 'pat-3', name: 'Quick Response Unit', zone: 'VIP Elevators North', status: 'READY', members: 5 },
  ];

  return (
    <div className="flex flex-col h-screen w-screen bg-obsidian text-white overflow-hidden font-sans select-none">
      <TopBar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-md space-y-md flex flex-col scrollbar-none">
          <div className="flex flex-col gap-2xs">
            <span className="font-mono text-xs text-system-crimson uppercase tracking-widest font-semibold">
              Security Patrol Operations
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Stadium Security Guard allocation
            </h1>
            <p className="text-xs text-system-mutedText">
              Real-time monitoring of security patrol squads, tactical camera streams, perimeter checkpoints.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-sm">
              <span className="text-[10px] text-system-mutedText uppercase font-mono block mb-2xs">Patrol Squads</span>
              <span className="text-lg font-bold text-white">3 Teams</span>
            </div>
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-sm">
              <span className="text-[10px] text-system-mutedText uppercase font-mono block mb-2xs">Perimeter Integrity</span>
              <span className="text-lg font-bold text-system-green">100%</span>
            </div>
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-sm">
              <span className="text-[10px] text-system-mutedText uppercase font-mono block mb-2xs">Tactical Feeds</span>
              <span className="text-lg font-bold text-system-cyan">42 Active</span>
            </div>
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-sm">
              <span className="text-[10px] text-system-mutedText uppercase font-mono block mb-2xs">System Threat Index</span>
              <span className="text-lg font-bold text-system-green">0.12 (Low)</span>
            </div>
          </div>

          <div className="bg-obsidian-muted border border-system-border rounded-xs p-md flex flex-col gap-md">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">Patrol Registry</span>
              <button className="flex items-center gap-xs text-[10px] font-mono text-system-cyan hover:underline">
                <RefreshCcw className="w-3 h-3" />
                Refresh Feed
              </button>
            </div>
            
            <div className="space-y-xs">
              {patrols.map((pat, idx) => (
                <div key={idx} className="bg-obsidian border border-system-border/40 p-xs rounded-xs flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-sm">
                    <ShieldCheck className="w-4 h-4 text-system-crimson" />
                    <div>
                      <span className="font-semibold text-white">{pat.name}</span>
                      <span className="text-[8px] font-mono text-system-mutedText uppercase block">ID: {pat.id} ({pat.members} officers)</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-lg font-mono text-[10px]">
                    <div>
                      <span className="text-[8px] text-system-mutedText block">Assigned Zone</span>
                      <span className="text-white">{pat.zone}</span>
                    </div>
                    <div>
                      <span className="text-[8px] text-system-mutedText block">Status</span>
                      <span className={pat.status === 'READY' ? 'text-system-green font-bold' : 'text-system-cyan'}>{pat.status}</span>
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

export default SecurityPatrol;
