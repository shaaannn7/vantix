import React, { useState, useEffect } from 'react';
import { Network, Activity, Cpu, ShieldAlert, Zap, CloudLightning, Stethoscope } from 'lucide-react';

const agents = [
  { id: 'crowd', name: 'Crowd Intel', icon: Activity, confidence: 92, status: 'ANALYZING' },
  { id: 'security', name: 'Security', icon: ShieldAlert, confidence: 88, status: 'IDLE' },
  { id: 'medical', name: 'Medical', icon: Stethoscope, confidence: 95, status: 'REPORTING' },
  { id: 'weather', name: 'Weather', icon: CloudLightning, confidence: 99, status: 'IDLE' },
  { id: 'energy', name: 'Energy', icon: Zap, confidence: 85, status: 'ANALYZING' },
];

export const AICopilotSidebar: React.FC = () => {
  const [activeAgents, setActiveAgents] = useState(agents);

  // Simulate distributed agent thinking over time
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveAgents(prev => prev.map(agent => ({
        ...agent,
        status: Math.random() > 0.6 ? 'REPORTING' : (Math.random() > 0.3 ? 'ANALYZING' : 'IDLE'),
        confidence: Math.max(70, Math.min(99, agent.confidence + Math.floor(Math.random() * 5) - 2))
      })));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="hidden lg:flex w-[320px] bg-obsidian-muted border-l border-system-border flex-col h-full select-none shrink-0 overflow-y-auto">
      {/* Sidebar Header */}
      <div className="h-[56px] border-b border-system-border flex items-center px-lg justify-between shrink-0 bg-obsidian">
        <div className="flex items-center gap-sm">
          <Network className="w-4 h-4 text-system-purple glow-purple" />
          <span className="font-sans text-xs font-semibold text-white tracking-widest">LANGGRAPH SWARM</span>
        </div>
        <div className="flex items-center gap-xs">
          <Cpu className="w-3.5 h-3.5 text-system-mutedText animate-pulse" />
          <span className="font-mono text-[9px] text-system-green uppercase font-bold">Commander Active</span>
        </div>
      </div>

      {/* Swarm Status Matrix */}
      <div className="p-md border-b border-system-border bg-obsidian-elevated/20">
        <span className="font-mono text-[9px] text-system-mutedText uppercase tracking-widest block pb-sm">Agent Matrix</span>
        <div className="space-y-sm">
          {activeAgents.map(agent => (
            <div key={agent.id} className="flex items-center justify-between bg-obsidian/50 border border-system-border/40 p-2xs rounded-xs">
              <div className="flex items-center gap-2xs">
                <agent.icon className="w-3 h-3 text-system-cyan" />
                <span className="font-sans text-[10px] text-white font-medium">{agent.name}</span>
              </div>
              <div className="flex items-center gap-md">
                <span className={`font-mono text-[9px] font-bold ${
                  agent.status === 'REPORTING' ? 'text-system-purple' : 
                  agent.status === 'ANALYZING' ? 'text-system-cyan animate-pulse' : 'text-system-mutedText'
                }`}>
                  {agent.status}
                </span>
                <span className="font-mono text-[9px] text-white w-[25px] text-right">{agent.confidence}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Animated Reasoning Graph Placeholder / Consensus */}
      <div className="p-md flex-1 bg-obsidian flex flex-col gap-sm">
        <span className="font-mono text-[9px] text-system-mutedText uppercase tracking-widest">Active Consensus Debate</span>
        
        {/* Mock Conflicts */}
        <div className="flex flex-col gap-xs mt-xs">
          <div className="bg-system-crimson/10 border-l-2 border-system-crimson p-xs rounded-r-xs">
            <span className="font-sans text-[9px] font-bold text-system-crimson block mb-[2px]">SECURITY AGENT (88%)</span>
            <span className="font-sans text-[10px] text-white/90">Recommends locking Gate C to isolate perimeter anomaly.</span>
          </div>
          <div className="bg-system-amber/10 border-l-2 border-system-amber p-xs rounded-r-xs">
            <span className="font-sans text-[9px] font-bold text-system-amber block mb-[2px]">CROWD INTEL AGENT (92%)</span>
            <span className="font-sans text-[10px] text-white/90">Conflicts: Locking Gate C creates 84% probability of crowd crush.</span>
          </div>
        </div>

        {/* Mission Commander Resolution */}
        <div className="mt-md bg-system-purple/10 border border-system-purple/30 p-sm rounded-xs shadow-ai-glow">
          <span className="font-sans text-[10px] font-bold text-system-purple flex items-center gap-2xs mb-xs">
            <Network className="w-3 h-3" />
            MISSION COMMANDER CONSENSUS
          </span>
          <p className="font-sans text-[10px] text-white/90 leading-relaxed mb-sm">
            Hierarchy override: Life Safety &gt; Asset Security. 
            Rejecting Gate C lockdown. 
            Executing directed flow routing to secondary exits.
          </p>
          <div className="flex justify-between items-center border-t border-system-purple/20 pt-xs">
            <span className="font-mono text-[8px] text-system-mutedText">AGENTS: CROWD, SECURITY</span>
            <span className="font-mono text-[8px] font-bold text-system-green">CONFIDENCE: 94%</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
export default AICopilotSidebar;
