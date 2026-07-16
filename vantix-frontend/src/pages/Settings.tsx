import React from 'react';
import Sidebar from '@/components/navigation/Sidebar';
import TopBar from '@/components/navigation/TopBar';
import BottomTelemetryBar from '@/components/navigation/BottomTelemetryBar';
import AICopilotSidebar from '@/components/ai/AICopilotSidebar';
import AuraFAB from '@/components/ai/AuraFAB';
import { ShieldCheck, Database, Sliders } from 'lucide-react';

export const Settings: React.FC = () => {
  return (
    <div className="flex flex-col h-screen w-screen bg-obsidian text-white overflow-hidden font-sans select-none">
      <TopBar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-md space-y-md flex flex-col scrollbar-none">
          <div className="flex flex-col gap-2xs">
            <span className="font-mono text-xs text-system-purple uppercase tracking-widest font-semibold">
              Console Preferences & Security
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              System Settings
            </h1>
            <p className="text-xs text-system-mutedText">
              Adjust telemetry database sync parameters, API keys, AI model confidence boundaries, and credential safeguards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            {/* General API Config */}
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-md flex flex-col gap-sm">
              <div className="flex items-center gap-xs text-system-cyan">
                <Database className="w-4 h-4" />
                <span className="text-xs font-semibold font-mono uppercase text-white font-sans">API Endpoint Config</span>
              </div>
              <div className="space-y-xs text-xs">
                <div>
                  <span className="text-[10px] text-system-mutedText block font-mono">REST BASE URL</span>
                  <span className="font-mono text-white block bg-obsidian p-xs border border-system-border/40 rounded-2xs mt-[2px]">
                    http://localhost:8080/api
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-system-mutedText block font-mono">WEBSOCKET CONCOURSE URL</span>
                  <span className="font-mono text-white block bg-obsidian p-xs border border-system-border/40 rounded-2xs mt-[2px]">
                    ws://localhost:8080/ws/operations
                  </span>
                </div>
              </div>
            </div>

            {/* AI Security Policy */}
            <div className="bg-obsidian-muted border border-system-border rounded-xs p-md flex flex-col gap-sm">
              <div className="flex items-center gap-xs text-system-purple">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs font-semibold font-mono uppercase text-white font-sans">Credential Token Policy</span>
              </div>
              <div className="space-y-xs text-xs">
                <div>
                  <span className="text-[10px] text-system-mutedText block font-mono">JWT MOCK OPERATIONS TOKEN</span>
                  <span className="font-mono text-white block bg-obsidian p-xs border border-system-border/40 rounded-2xs mt-[2px]">
                    mock-operations-token-2026
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-system-mutedText block font-mono">API SECURE VERIFICATION</span>
                  <span className="text-system-green font-semibold mt-[2px] block">ACTIVE (Role boundaries enforced)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-obsidian-muted border border-system-border rounded-xs p-md flex flex-col gap-xs min-h-[150px] justify-center items-center text-center">
            <Sliders className="w-8 h-8 text-system-mutedText/40" />
            <div className="space-y-2xs">
              <p className="text-xs font-bold text-white uppercase font-mono tracking-wider font-sans">Simulated Telemetry Toggles</p>
              <p className="text-[10px] text-system-mutedText max-w-sm font-sans">
                Set active spectator ingress rates, stadium gate open/closed configurations, and retractable roof rotation speeds.
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

export default Settings;
