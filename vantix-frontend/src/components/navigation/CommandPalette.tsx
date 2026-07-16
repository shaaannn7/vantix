import React, { useState, useEffect } from 'react';
import { Search, Map, Activity, ShieldAlert, Cpu } from 'lucide-react';
import { EventBus } from '@/core/EventBus';

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) return null;

  const handleAction = (action: string) => {
    setIsOpen(false);
    setQuery('');
    
    // Publish via Central Event Bus
    if (action === 'sim_start') {
      EventBus.publish('SimulationStarted', { mode: 'future_prediction' });
    } else if (action === 'trigger_emergency') {
      EventBus.publish('EmergencyTriggered', { type: 'fire', location: 'Gate C' });
    } else if (action === 'dispatch_volunteers') {
      EventBus.publish('VolunteerDispatched', { count: 12, target: 'Sector West' });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-obsidian/80 backdrop-blur-sm flex items-start justify-center pt-[15vh]">
      <div className="w-full max-w-2xl bg-obsidian-muted border border-system-border rounded-xs shadow-high overflow-hidden animate-fadeSlideUp">
        {/* Search Input */}
        <div className="flex items-center px-lg border-b border-system-border h-14 bg-obsidian-elevated">
          <Search className="w-5 h-5 text-system-mutedText mr-md" />
          <input
            autoFocus
            className="flex-1 bg-transparent border-none outline-none text-white font-sans placeholder-system-mutedText"
            placeholder="Search entities, execute commands, or ask AI... (e.g. 'Deploy medical to Gate B')"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="flex items-center gap-xs ml-md">
            <kbd className="px-xs py-[2px] bg-obsidian border border-system-border rounded-2xs text-[10px] font-mono text-system-mutedText">ESC</kbd>
          </div>
        </div>

        {/* Action List */}
        <div className="p-sm max-h-[400px] overflow-y-auto">
          <div className="mb-xs px-sm py-2xs text-[10px] font-mono uppercase tracking-widest text-system-mutedText">Quick Commands</div>
          
          <button onClick={() => handleAction('trigger_emergency')} className="w-full flex items-center gap-md px-md py-sm hover:bg-system-crimson/10 rounded-xs group transition-colors text-left">
            <ShieldAlert className="w-4 h-4 text-system-mutedText group-hover:text-system-crimson" />
            <div className="flex flex-col">
              <span className="text-sm font-sans text-white">Trigger Emergency Simulation</span>
              <span className="text-[10px] font-mono text-system-mutedText">Mission Commander › Override</span>
            </div>
          </button>

          <button onClick={() => handleAction('sim_start')} className="w-full flex items-center gap-md px-md py-sm hover:bg-system-purple/10 rounded-xs group transition-colors text-left">
            <Cpu className="w-4 h-4 text-system-mutedText group-hover:text-system-purple" />
            <div className="flex flex-col">
              <span className="text-sm font-sans text-white">Run T+45 Prediction Mode</span>
              <span className="text-[10px] font-mono text-system-mutedText">AI Engine › Simulation</span>
            </div>
          </button>

          <button onClick={() => handleAction('dispatch_volunteers')} className="w-full flex items-center gap-md px-md py-sm hover:bg-system-cyan/10 rounded-xs group transition-colors text-left">
            <Activity className="w-4 h-4 text-system-mutedText group-hover:text-system-cyan" />
            <div className="flex flex-col">
              <span className="text-sm font-sans text-white">Dispatch 12 Volunteers to Sector West</span>
              <span className="text-[10px] font-mono text-system-mutedText">Resource Management › Deployment</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
