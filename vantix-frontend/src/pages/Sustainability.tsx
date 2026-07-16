import React from 'react';
import Sidebar from '@/components/navigation/Sidebar';
import TopBar from '@/components/navigation/TopBar';
import BottomTelemetryBar from '@/components/navigation/BottomTelemetryBar';
import AICopilotSidebar from '@/components/ai/AICopilotSidebar';
import AuraFAB from '@/components/ai/AuraFAB';
import { Leaf, Zap, Droplet, Wind } from 'lucide-react';

export const Sustainability: React.FC = () => {
  return (
    <div className="flex flex-col h-screen w-screen bg-obsidian text-white overflow-hidden font-sans select-none">
      <TopBar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-md space-y-md flex flex-col scrollbar-none">
          <div className="flex flex-col gap-2xs">
            <span className="font-mono text-xs text-system-green uppercase tracking-widest font-semibold">
              Eco-Grid & Sustainability Control
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Green Arena Metrics OS
            </h1>
            <p className="text-xs text-system-mutedText">
              Real-time modeling of HVAC efficiency, solar energy storage recharge cycles, and dynamic water pressure loops.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-md flex flex-col gap-sm">
              <div className="flex items-center gap-xs text-system-green">
                <Leaf className="w-4 h-4" />
                <span className="text-xs font-semibold font-mono uppercase text-white">Carbon Impact</span>
              </div>
              <p className="text-2xl font-bold">Carbon Neutral</p>
              <span className="text-[10px] text-system-mutedText">Net offset index: +0.02</span>
            </div>

            <div className="bg-obsidian-muted border border-system-border rounded-xs p-md flex flex-col gap-sm">
              <div className="flex items-center gap-xs text-system-amber">
                <Zap className="w-4 h-4" />
                <span className="text-xs font-semibold font-mono uppercase text-white">Solar Generation</span>
              </div>
              <p className="text-2xl font-bold text-system-amber">342 kW</p>
              <span className="text-[10px] text-system-mutedText">Battery reserve: 98.4%</span>
            </div>

            <div className="bg-obsidian-muted border border-system-border rounded-xs p-md flex flex-col gap-sm">
              <div className="flex items-center gap-xs text-system-cyan">
                <Droplet className="w-4 h-4" />
                <span className="text-xs font-semibold font-mono uppercase text-white">Recycled Water</span>
              </div>
              <p className="text-2xl font-bold">14,200 Gal</p>
              <span className="text-[10px] text-system-mutedText">System pressure: nominal</span>
            </div>
          </div>

          <div className="bg-obsidian-muted border border-system-border rounded-xs p-md flex-1 flex flex-col items-center justify-center text-center gap-sm min-h-[300px]">
            <Wind className="w-10 h-10 text-system-mutedText/40" />
            <div className="space-y-xs">
              <p className="text-xs font-bold text-white uppercase font-mono tracking-wider">Natural Air Circulation Mode</p>
              <p className="text-[10px] text-system-mutedText max-w-sm">
                Retractable roof slide settings coordinate with regional temperature sensor arrays to optimize natural cooling drafts, mitigating structural heat gain.
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

export default Sustainability;
