import React from 'react';
import Sidebar from '@/components/navigation/Sidebar';
import TopBar from '@/components/navigation/TopBar';
import BottomTelemetryBar from '@/components/navigation/BottomTelemetryBar';
import AICopilotSidebar from '@/components/ai/AICopilotSidebar';
import AuraFAB from '@/components/ai/AuraFAB';
import { UserCheck, RefreshCcw } from 'lucide-react';

export const Volunteers: React.FC = () => {
  const volunteersList = [
    { name: 'R. Garcia', sector: 'Sector West Turnstiles', role: 'Ingress Guide', status: 'ACTIVE' },
    { name: 'L. Chen', sector: 'VIP Suite Entrance L1', role: 'Access Supervisor', status: 'IDLE' },
    { name: 'M. Johnson', sector: 'Gate C Ticket Checkpoint', role: 'Support Host', status: 'ACTIVE' },
    { name: 'A. Smith', sector: 'Concourse North concessions', role: 'Information Host', status: 'ACTIVE' },
  ];

  return (
    <div className="flex flex-col h-screen w-screen bg-obsidian text-white overflow-hidden font-sans select-none">
      <TopBar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-md space-y-md flex flex-col scrollbar-none">
          <div className="flex flex-col gap-2xs">
            <span className="font-mono text-xs text-system-green uppercase tracking-widest font-semibold">
              Volunteer Coordination Network
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Staff & Volunteer Allocation HUD
            </h1>
            <p className="text-xs text-system-mutedText">
              Real-time monitoring of volunteer dispatch paths, station occupancy levels, and emergency first-responder squads.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-sm">
              <span className="text-[10px] text-system-mutedText uppercase font-mono block mb-2xs">Total Active Staff</span>
              <span className="text-lg font-bold text-white">128 Hosts</span>
            </div>
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-sm">
              <span className="text-[10px] text-system-mutedText uppercase font-mono block mb-2xs">Mean Ingress Wait</span>
              <span className="text-lg font-bold text-system-cyan">3 mins</span>
            </div>
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-sm">
              <span className="text-[10px] text-system-mutedText uppercase font-mono block mb-2xs">Active Dispatches</span>
              <span className="text-lg font-bold text-system-green">2 Teams</span>
            </div>
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-sm">
              <span className="text-[10px] text-system-mutedText uppercase font-mono block mb-2xs">Staff Coverage</span>
              <span className="text-lg font-bold text-system-cyan">98.2%</span>
            </div>
          </div>

          <div className="bg-obsidian-muted border border-system-border rounded-xs p-md flex flex-col gap-md">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">Active Host Registry</span>
              <button className="flex items-center gap-xs text-[10px] font-mono text-system-cyan hover:underline">
                <RefreshCcw className="w-3 h-3" />
                Refresh Feed
              </button>
            </div>
            
            <div className="space-y-xs">
              {volunteersList.map((vol, idx) => (
                <div key={idx} className="bg-obsidian border border-system-border/40 p-xs rounded-xs flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-sm">
                    <UserCheck className="w-4 h-4 text-system-green" />
                    <div>
                      <span className="font-semibold text-white">{vol.name}</span>
                      <span className="text-[8px] font-mono text-system-mutedText uppercase block">Role: {vol.role}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-lg font-mono text-[10px]">
                    <div>
                      <span className="text-[8px] text-system-mutedText block">Station</span>
                      <span className="text-white">{vol.sector}</span>
                    </div>
                    <div>
                      <span className="text-[8px] text-system-mutedText block">Status</span>
                      <span className={vol.status === 'ACTIVE' ? 'text-system-green font-bold' : 'text-system-mutedText'}>{vol.status}</span>
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

export default Volunteers;
