import React from 'react';
import Sidebar from '@/components/navigation/Sidebar';
import TopBar from '@/components/navigation/TopBar';
import BottomTelemetryBar from '@/components/navigation/BottomTelemetryBar';
import AICopilotSidebar from '@/components/ai/AICopilotSidebar';
import AuraFAB from '@/components/ai/AuraFAB';
import { Cpu } from 'lucide-react';

export const AISimulationEngine: React.FC = () => {
  return (
    <div className="flex flex-col h-screen w-screen bg-obsidian text-white overflow-hidden font-sans select-none">
      <TopBar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-md space-y-md flex flex-col scrollbar-none">
          <div className="flex flex-col gap-2xs">
            <span className="font-mono text-xs text-system-purple uppercase tracking-widest font-semibold">
              LangGraph Multi-Agent Engine
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Simulation Graph Editor
            </h1>
            <p className="text-xs text-system-mutedText">
              Configure parameters, edge triggers, and state checkpoints for the live multi-agent decision model.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-sm">
              <span className="text-[10px] text-system-mutedText uppercase font-mono block mb-2xs">Agent Loops</span>
              <span className="text-lg font-bold text-white">4 Active</span>
            </div>
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-sm">
              <span className="text-[10px] text-system-mutedText uppercase font-mono block mb-2xs">Graph Latency</span>
              <span className="text-lg font-bold text-system-cyan">148 ms</span>
            </div>
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-sm">
              <span className="text-[10px] text-system-mutedText uppercase font-mono block mb-2xs">State Database</span>
              <span className="text-lg font-bold text-system-green">Connected</span>
            </div>
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-sm">
              <span className="text-[10px] text-system-mutedText uppercase font-mono block mb-2xs">Decision Yield</span>
              <span className="text-lg font-bold text-system-cyan">99.4%</span>
            </div>
          </div>

          <div className="bg-obsidian-muted border border-system-border rounded-xs p-md flex-1 flex flex-col items-center justify-center text-center gap-sm min-h-[300px]">
            <Cpu className="w-10 h-10 text-system-mutedText/40" />
            <div className="space-y-xs">
              <p className="text-xs font-bold text-white uppercase font-mono tracking-wider font-sans">Multi-Agent Workflow Simulation</p>
              <p className="text-[10px] text-system-mutedText max-w-sm font-sans">
                The simulation uses LangGraph state objects to resolve gate redirect bottlenecks and medical emergency volunteer paths, running on an isolated virtual node.
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

export default AISimulationEngine;
