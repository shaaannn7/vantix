import React from 'react';
import Sidebar from '@/components/navigation/Sidebar';
import TopBar from '@/components/navigation/TopBar';
import BottomTelemetryBar from '@/components/navigation/BottomTelemetryBar';
import AICopilotSidebar from '@/components/ai/AICopilotSidebar';
import AuraFAB from '@/components/ai/AuraFAB';
import { MessageSquare, HelpCircle, Navigation2 } from 'lucide-react';

export const FanAssistant: React.FC = () => {
  return (
    <div className="flex flex-col h-screen w-screen bg-obsidian text-white overflow-hidden font-sans select-none">
      <TopBar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-md space-y-md flex flex-col scrollbar-none">
          <div className="flex flex-col gap-2xs">
            <span className="font-mono text-xs text-system-cyan uppercase tracking-widest font-semibold">
              Fan Assistant & Information OS
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Spectator Services Control Panel
            </h1>
            <p className="text-xs text-system-mutedText">
              Manage live virtual helper responses, fan wayfinding queries, facility service checks, concession workloads.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-md flex flex-col gap-sm">
              <div className="flex items-center gap-xs text-system-cyan">
                <MessageSquare className="w-4 h-4" />
                <span className="text-xs font-semibold font-mono uppercase text-white font-sans">Active AI Chats</span>
              </div>
              <p className="text-2xl font-bold">142</p>
              <span className="text-[10px] text-system-mutedText">Satisfied: 99.1%</span>
            </div>

            <div className="bg-obsidian-muted border border-system-border rounded-xs p-md flex flex-col gap-sm">
              <div className="flex items-center gap-xs text-system-cyan">
                <Navigation2 className="w-4 h-4" />
                <span className="text-xs font-semibold font-mono uppercase text-white font-sans">Seat Routes Mapped</span>
              </div>
              <p className="text-2xl font-bold text-system-green">1,842</p>
              <span className="text-[10px] text-system-mutedText">Avg load delay: 84ms</span>
            </div>

            <div className="bg-obsidian-muted border border-system-border rounded-xs p-md flex flex-col gap-sm">
              <div className="flex items-center gap-xs text-system-purple">
                <HelpCircle className="w-4 h-4" />
                <span className="text-xs font-semibold font-mono uppercase text-white font-sans">FAQ Resolved</span>
              </div>
              <p className="text-2xl font-bold">4,912</p>
              <span className="text-[10px] text-system-mutedText">Automated rate: 96.4%</span>
            </div>
          </div>

          <div className="bg-obsidian-muted border border-system-border rounded-xs p-md flex-1 flex flex-col items-center justify-center text-center gap-sm min-h-[300px]">
            <MessageSquare className="w-10 h-10 text-system-mutedText/40" />
            <div className="space-y-xs">
              <p className="text-xs font-bold text-white uppercase font-mono tracking-wider font-sans">Spectator Chat Intelligence</p>
              <p className="text-[10px] text-system-mutedText max-w-sm font-sans">
                Spectator mobile queries (e.g. "where is nearest family restroom", "find my gate entry route") are resolved automatically by the AI Copilot API.
              </p>
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

export default FanAssistant;
