import React from 'react';
import Sidebar from '@/components/navigation/Sidebar';
import TopBar from '@/components/navigation/TopBar';
import BottomTelemetryBar from '@/components/navigation/BottomTelemetryBar';
import AICopilotSidebar from '@/components/ai/AICopilotSidebar';
import AuraFAB from '@/components/ai/AuraFAB';
import { BarChart3, TrendingUp, Users, ShieldAlert } from 'lucide-react';

export const Analytics: React.FC = () => {
  return (
    <div className="flex flex-col h-screen w-screen bg-obsidian text-white overflow-hidden font-sans select-none">
      <TopBar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-md space-y-md flex flex-col scrollbar-none">
          <div className="flex flex-col gap-2xs">
            <span className="font-mono text-xs text-system-purple uppercase tracking-widest font-semibold">
              Telemetry Analytics & Reports
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Operations Metrics Dashboard
            </h1>
            <p className="text-xs text-system-mutedText">
              Consolidated historical crowd density overlays, flow rate profiles, security response performance metrics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-md flex flex-col gap-sm">
              <div className="flex items-center gap-xs text-system-cyan">
                <Users className="w-4 h-4" />
                <span className="text-xs font-semibold font-mono uppercase text-white">Crowd Influx Profile</span>
              </div>
              <p className="text-2xl font-bold">83,412</p>
              <span className="text-[10px] text-system-mutedText">Peak capacity: 87,523</span>
            </div>

            <div className="bg-obsidian-muted border border-system-border rounded-xs p-md flex flex-col gap-sm">
              <div className="flex items-center gap-xs text-system-purple">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs font-semibold font-mono uppercase text-white">Avg Entry Efficiency</span>
              </div>
              <p className="text-2xl font-bold text-system-green">94.8%</p>
              <span className="text-[10px] text-system-mutedText">Target threshold: 90.0%</span>
            </div>

            <div className="bg-obsidian-muted border border-system-border rounded-xs p-md flex flex-col gap-sm">
              <div className="flex items-center gap-xs text-system-crimson">
                <ShieldAlert className="w-4 h-4" />
                <span className="text-xs font-semibold font-mono uppercase text-white">Security Dispatches</span>
              </div>
              <p className="text-2xl font-bold">2 Alerts</p>
              <span className="text-[10px] text-system-mutedText">Mean mitigation: 2.4 mins</span>
            </div>
          </div>

          <div className="bg-obsidian-muted border border-system-border rounded-xs p-md flex-1 flex flex-col items-center justify-center text-center gap-sm min-h-[300px]">
            <BarChart3 className="w-10 h-10 text-system-mutedText/40" />
            <div className="space-y-xs">
              <p className="text-xs font-bold text-white uppercase font-mono tracking-wider">Interactive Analytics Engine</p>
              <p className="text-[10px] text-system-mutedText max-w-sm">
                Statistical modeling and correlation charts (Ingress Rate vs Weather, Density vs Queue Latency) are populated continuously by operational databases.
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

export default Analytics;
