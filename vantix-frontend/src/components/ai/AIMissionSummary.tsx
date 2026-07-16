import React, { useEffect, useState, useMemo } from 'react';
import { useTelemetryStore } from '@/store/telemetryStore';
import { 
  Sparkles, 
  Check, 
  X, 
  Compass, 
  CheckCircle2,
  Users,
  AlertTriangle
} from 'lucide-react';

interface ScenarioDetails {
  situation: string;
  priority: string;
  recommendation: string;
  confidence: number;
  reasoning: string;
  evidence: string[];
  participatingAgents: string[];
  conflicts: string;
  consensus: string;
  actions: string[];
}

export const AIMissionSummary: React.FC = () => {
  const emergencyType = useTelemetryStore((state) => state.emergencyType);
  const [status, setStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [confidenceOffset, setConfidenceOffset] = useState(0);

  // Dynamic confidence ticker on load
  useEffect(() => {
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setConfidenceOffset(Math.min(step * 0.25, 4));
      if (step >= 16) clearInterval(timer);
    }, 40);
    return () => clearInterval(timer);
  }, [emergencyType]);

  // Reset status when emergency type changes
  useEffect(() => {
    setStatus('pending');
  }, [emergencyType]);

  // Compile scenario dictionary
  const scenario = useMemo<ScenarioDetails>(() => {
    switch (emergencyType) {
      case 'fire':
        return {
          situation: 'Thermal spike detected: Sector West Concourse (L2)',
          priority: 'Incident Suppression & Local Egress',
          recommendation: 'Deploy Fire Squad 4B, activate local exhaust, & redirect West Block to Gate C exits',
          confidence: 96,
          reasoning: 'SCADA sensors logged 94°C on main structural arch bracket; confirmed by CCTV thermal cameras.',
          evidence: ['SCADA arch sensor #104', 'Concourse B thermal array', 'CCTV 104 verify stream'],
          participatingAgents: ['Security', 'Infrastructure', 'Medical', 'Crowd Intel'],
          conflicts: 'Infrastructure Agent suggested shutting down ALL power to Sector West. Medical Agent warned this would disable emergency medical elevators.',
          consensus: 'Mission Commander resolved to isolate power ONLY to Concourse L2 HVAC, preserving elevator redundancy while mitigating electrical fire risks.',
          actions: ['Deploy Fire Squad 4B', 'Shutdown local HVAC circulation', 'Unlock Gate C Emergency Exits'],
        };
      case 'medical':
        return {
          situation: 'Cardiac distress report: Gate C Concessions queue',
          priority: 'Critical Life Support Dispatch',
          recommendation: 'Dispatch Medical Response A with AED and clear North service elevator corridor',
          confidence: 98,
          reasoning: 'Distress call registered via volunteer staff app; proximity tracking matches AED Station 12.',
          evidence: ['Volunteer Staff App log', 'Concourse C WiFi beacon telemetry', 'AED Station status log'],
          participatingAgents: ['Medical', 'Volunteer', 'Transport'],
          conflicts: 'Volunteer Agent requested nearest host deploy AED. Medical Agent insisted on EMT dispatch due to cardiac signature.',
          consensus: 'Mission Commander resolved to dispatch BOTH nearest host for immediate CPR and EMTs via cleared service tunnel.',
          actions: ['Dispatch Medical Response A', 'Deploy local Gate C host with AED', 'Clear VIP service tunnel access'],
        };
      case 'surge':
        return {
          situation: 'High-density pinch point: Gate C main ingress line',
          priority: 'Ingress Flow Balancing',
          recommendation: 'Redirect new arrivals to Gate D & deploy auxiliary crowd barriers',
          confidence: 92,
          reasoning: 'Optical counting cameras indicate density exceeds 4.2 fans/m²; scan rate lagging target by 40%.',
          evidence: ['Ingress CCTV counters', 'WiFi access point density maps', 'Gate turnstile scan rates'],
          participatingAgents: ['Crowd Intel', 'Security', 'Prediction'],
          conflicts: 'Security Agent recommended holding all entry for 10 minutes to clear backlog. Prediction Agent modeled this would cause a hazardous plaza crush outside.',
          consensus: 'Mission Commander resolved to keep gates open but dynamically redirect arriving transit buses to alternate Gate D.',
          actions: ['Redirect new arrivals to Gate D', 'Deploy auxiliary lane barriers', 'Broadcast transit delay announcements'],
        };
      case 'evacuation':
        return {
          situation: 'Egress Protocol Active: Full Stadium Evacuation',
          priority: 'Mass Evacuation / Complete Egress',
          recommendation: 'Retract roof panels, open all emergency plazas, and initialize visual strobe loops',
          confidence: 99,
          reasoning: 'Manual operator emergency override confirmed. Plaza wind speeds nominal.',
          evidence: ['Operator Dispatch Override', 'Active GPS crowd flow arrays', 'Wind sensor network'],
          participatingAgents: ['All 10 Core Agents Active'],
          conflicts: 'Transport Agent recommended holding subway trains to prevent station overcrowding. Crowd Intel warned holding trains halts the primary evacuation artery.',
          consensus: 'Mission Commander resolved to dispatch trains continuously, but stage holding zones outside the station entrances to meter flow.',
          actions: ['Open all Emergency Gates', 'Strobe lighting activation', 'PA Broadcast loop initialization'],
        };
      case 'none':
      default:
        return {
          situation: 'Nominal spectator ingress check active',
          priority: 'Ingress Flow Optimization',
          recommendation: 'Deploy 4 Concourse Volunteers to Gate B & adjust turnstile sensitivity parameters',
          confidence: 91,
          reasoning: 'Concourse turnstile scanning speed lagging due to high ticket check failure rate; 2 buses arriving.',
          evidence: ['Turnstile scanner logs', 'Transit scheduling API', 'Historical ingress curves'],
          participatingAgents: ['Crowd Intel', 'Transport', 'Volunteer'],
          conflicts: 'Transport Agent reported incoming buses. Crowd Intel noted Gate B capacity limits. Volunteer Agent lacked available hosts.',
          consensus: 'Mission Commander resolved to preemptively reassign 4 floating volunteers from Sector A to Gate B prior to bus arrival.',
          actions: ['Deploy 4 Volunteers to Gate B', 'Consolidate ticket queues', 'Open auxiliary lane checks'],
        };
    }
  }, [emergencyType]);

  const displayConfidence = Math.round(scenario.confidence - 4 + confidenceOffset);

  if (status === 'approved') {
    return (
      <div className="bg-obsidian-muted border border-system-green/30 rounded-xs p-md flex flex-col items-center gap-sm text-center shadow-high animate-fadeSlideUp">
        <div className="w-8 h-8 rounded-full bg-system-green/10 flex items-center justify-center border border-system-green/20">
          <CheckCircle2 className="w-5 h-5 text-system-green" />
        </div>
        <div className="space-y-2xs">
          <p className="text-xs font-bold text-white uppercase tracking-wider font-mono">Mission Commander Plan Executed</p>
          <p className="text-[10px] text-system-mutedText leading-relaxed">
            Consensus approved. Dispatch signals transmitted to {scenario.participatingAgents.length} LangGraph agents and field devices.
          </p>
        </div>
        <button
          onClick={() => setStatus('pending')}
          className="px-sm py-xs bg-obsidian border border-system-border hover:border-system-cyan/30 text-[9px] font-mono text-system-mutedText hover:text-white rounded-2xs transition-colors"
        >
          Reset Swarm View
        </button>
      </div>
    );
  }

  if (status === 'rejected') {
    return (
      <div className="bg-obsidian-muted border border-system-border rounded-xs p-md flex flex-col items-center gap-sm text-center shadow-high animate-fadeSlideUp">
        <div className="w-8 h-8 rounded-full bg-system-crimson/10 flex items-center justify-center border border-system-crimson/20">
          <X className="w-5 h-5 text-system-crimson" />
        </div>
        <div className="space-y-2xs">
          <p className="text-xs font-bold text-white uppercase tracking-wider font-mono">Plan Rejected</p>
          <p className="text-[10px] text-system-mutedText leading-relaxed">
            Operator override applied. Mission Commander is re-evaluating node graphs for alternative execution paths.
          </p>
        </div>
        <button
          onClick={() => setStatus('pending')}
          className="px-sm py-xs bg-obsidian border border-system-border hover:border-system-cyan/30 text-[9px] font-mono text-system-mutedText hover:text-white rounded-2xs transition-colors"
        >
          Re-evaluate Plan
        </button>
      </div>
    );
  }

  return (
    <div className="bg-obsidian-muted border border-system-border rounded-xs p-md flex flex-col gap-md shadow-high font-sans h-full overflow-y-auto">
      
      {/* 1. Header: Status Bar / Title */}
      <div className="flex items-center justify-between border-b border-system-border/40 pb-sm">
        <div className="flex items-center gap-xs">
          <div className="p-[3px] bg-system-purple/10 border border-system-purple/20 rounded-2xs text-system-purple">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-[10px] text-system-purple font-mono uppercase font-bold tracking-wider block">Mission Commander</span>
            <span className="text-[9px] text-system-mutedText font-mono uppercase tracking-widest">{scenario.priority}</span>
          </div>
        </div>
        <span className="text-[10px] text-system-purple font-mono bg-system-purple/10 px-sm py-[2px] rounded-2xs border border-system-purple/20 font-bold">
          {displayConfidence}% CONFIDENCE
        </span>
      </div>

      {/* 2. Swarm Participation */}
      <div className="flex items-center gap-sm mt-xs">
        <Users className="w-3.5 h-3.5 text-system-cyan" />
        <span className="text-[9px] font-mono text-system-mutedText uppercase">Participating Agents:</span>
        <div className="flex gap-2xs flex-wrap">
          {scenario.participatingAgents.map(agent => (
            <span key={agent} className="text-[9px] font-mono font-bold text-system-cyan bg-system-cyan/10 px-[4px] py-[2px] rounded-2xs border border-system-cyan/30">
              {agent.toUpperCase()}
            </span>
          ))}
        </div>
      </div>

      {/* 3. Situation & Recommendation */}
      <div className="flex flex-col gap-2xs">
        <p className="text-xs font-bold text-white leading-relaxed">{scenario.situation}</p>
      </div>

      <div className="flex flex-col gap-xs bg-obsidian-elevated border border-system-border p-sm rounded-xs">
        <div className="flex items-center gap-2xs text-[9px] font-mono text-system-purple uppercase font-semibold">
          <span>FINAL RECOMMENDATION</span>
        </div>
        <p className="text-xs text-white leading-relaxed font-semibold">{scenario.recommendation}</p>
      </div>

      {/* 4. Explainable AI reasoning details */}
      <div className="flex flex-col gap-xs">
        <div className="flex items-center gap-2xs text-[9px] font-mono text-system-mutedText uppercase">
          <Compass className="w-3.5 h-3.5 text-system-cyan" />
          <span>Evidence Base</span>
        </div>
        <p className="text-[10px] text-system-mutedText leading-relaxed">{scenario.reasoning}</p>
        
        <div className="flex flex-wrap gap-2xs mt-[2px]">
          {scenario.evidence.map((ev, idx) => (
            <span key={idx} className="bg-obsidian border border-system-border/80 px-xs py-[2px] rounded-2xs text-[8px] font-mono text-system-mutedText">
              🔍 {ev}
            </span>
          ))}
        </div>
      </div>

      {/* 5. Swarm Conflicts & Consensus */}
      <div className="flex flex-col gap-xs border-t border-system-border/40 pt-sm">
        <div className="flex items-center gap-2xs text-[9px] font-mono text-system-amber uppercase">
          <AlertTriangle className="w-3.5 h-3.5 text-system-amber" />
          <span>Identified Agent Conflicts</span>
        </div>
        <div className="bg-system-amber/5 border-l-2 border-system-amber pl-xs py-[2px]">
          <p className="text-[10px] text-system-mutedText leading-relaxed">{scenario.conflicts}</p>
        </div>
      </div>

      <div className="flex flex-col gap-xs mt-xs">
        <div className="flex items-center gap-2xs text-[9px] font-mono text-system-green uppercase">
          <CheckCircle2 className="w-3.5 h-3.5 text-system-green" />
          <span>Commander Consensus Reasoning</span>
        </div>
        <div className="bg-system-green/5 border-l-2 border-system-green pl-xs py-[2px]">
          <p className="text-[10px] text-white/90 leading-relaxed font-semibold">{scenario.consensus}</p>
        </div>
      </div>

      {/* 6. Command Action Triggers */}
      <div className="flex items-center gap-xs pt-md border-t border-system-border/40 mt-auto">
        <button
          onClick={() => setStatus('rejected')}
          aria-label="Reject AI Recommendation"
          className="flex-1 flex items-center justify-center gap-2xs py-[6px] border border-system-border hover:border-system-crimson/40 rounded-2xs text-[10px] font-mono text-system-mutedText hover:text-system-crimson hover:bg-system-crimson/5 transition-all active:scale-[0.98]"
        >
          <X className="w-3.5 h-3.5" />
          <span>Reject</span>
        </button>
        
        <button
          onClick={() => setStatus('approved')}
          aria-label="Approve AI Recommendation"
          className="flex-1.5 flex items-center justify-center gap-2xs py-[6px] bg-system-purple border border-system-purple/40 hover:border-system-purple rounded-2xs text-[10px] font-mono text-white font-semibold hover:bg-system-purple/95 transition-all shadow-ai-glow active:scale-[0.98]"
        >
          <Check className="w-3.5 h-3.5" />
          <span>Approve Plan</span>
        </button>
      </div>

    </div>
  );
};

export default AIMissionSummary;
