import React, { useEffect, useState, useMemo } from 'react';
import { useTelemetryStore } from '@/store/telemetryStore';
import { 
  Sparkles, 
  Check, 
  X, 
  ArrowRight, 
  Activity, 
  Compass, 
  CheckCircle2 
} from 'lucide-react';

interface ScenarioDetails {
  situation: string;
  priority: string;
  recommendation: string;
  oldMetrics: string;
  newMetrics: string;
  confidence: number;
  reasoning: string;
  evidence: string[];
  alternatives: { label: string; desc: string }[];
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
          oldMetrics: 'Fire Spread risk: HIGH',
          newMetrics: 'Local containment in 1.8 mins',
          confidence: 96,
          reasoning: 'SCADA sensors logged 94°C on main structural arch bracket; confirmed by CCTV thermal cameras.',
          evidence: ['SCADA arch sensor #104', 'Concourse B thermal array', 'CCTV 104 verify stream'],
          alternatives: [
            { label: 'Option A (Global Evacuation)', desc: 'Open all stadium gates immediately (risk of exit stampede).' },
            { label: 'Option B (Delayed Verify)', desc: 'Deploy security guard for manual inspection (delay risk: 4 min).' }
          ],
          actions: ['Deploy Fire Squad 4B', 'Shutdown local HVAC circulation', 'Unlock Gate C Emergency Exits'],
        };
      case 'medical':
        return {
          situation: 'Cardiac distress report: Gate C Concessions queue',
          priority: 'Critical Life Support Dispatch',
          recommendation: 'Dispatch Medical Response A with AED and clear North service elevator corridor',
          oldMetrics: 'Response ETA: 6.2 mins',
          newMetrics: 'Response ETA: 1.2 mins',
          confidence: 98,
          reasoning: 'Distress call registered via volunteer staff app; proximity tracking matches AED Station 12.',
          evidence: ['Volunteer Staff App log', 'Concourse C WiFi beacon telemetry', 'AED Station status log'],
          alternatives: [
            { label: 'Option A (Ambulance Tunnel)', desc: 'Route city ambulance via public gates (ETA delay: 8.5 min).' },
            { label: 'Option B (Host Deployment)', desc: 'Direct general concession staff to deploy AED box.' }
          ],
          actions: ['Dispatch Medical Response A', 'Deploy local Gate C host with AED', 'Clear VIP service tunnel access'],
        };
      case 'surge':
        return {
          situation: 'High-density pinch point: Gate C main ingress line',
          priority: 'Ingress Flow Balancing',
          recommendation: 'Redirect new arrivals to Gate D & deploy auxiliary crowd barriers',
          oldMetrics: 'Queue delay: 24 mins',
          newMetrics: 'Queue delay: 8 mins',
          confidence: 92,
          reasoning: 'Optical counting cameras indicate density exceeds 4.2 fans/m²; scan rate lagging target by 40%.',
          evidence: ['Ingress CCTV counters', 'WiFi access point density maps', 'Gate turnstile scan rates'],
          alternatives: [
            { label: 'Option A (Hold Ingress)', desc: 'Throttle entry at external perimeter gates (creates plaza crush risk).' },
            { label: 'Option B (Manual Bypass)', desc: 'Disable ticket scanner validation checks (security review failure).' }
          ],
          actions: ['Redirect new arrivals to Gate D', 'Deploy auxiliary lane barriers', 'Broadcast transit delay announcements'],
        };
      case 'evacuation':
        return {
          situation: 'Egress Protocol Active: Full Stadium Evacuation',
          priority: 'Mass Evacuation / Complete Egress',
          recommendation: 'Retract roof panels, open all emergency plazas, and initialize visual strobe loops',
          oldMetrics: 'Egress time: 28 mins',
          newMetrics: 'Egress time: 11.2 mins',
          confidence: 99,
          reasoning: 'Manual operator emergency override confirmed. Plaza wind speeds nominal.',
          evidence: ['Operator Dispatch Override', 'Active GPS crowd flow arrays', 'Wind sensor network'],
          alternatives: [
            { label: 'Option A (Staggered Egress)', desc: 'Evacuate sector by sector (slower, ~19 mins, lower plaza crush risk).' },
            { label: 'Option B (Auditory only)', desc: 'Limit alert to PA broadcast (delays panic reaction times).' }
          ],
          actions: ['Open all Emergency Gates', 'Strobe lighting activation', 'PA Broadcast loop initialization'],
        };
      case 'none':
      default:
        return {
          situation: 'Nominal spectator ingress check active',
          priority: 'Ingress Flow Optimization',
          recommendation: 'Deploy 4 Concourse Volunteers to Gate B & adjust turnstile sensitivity parameters',
          oldMetrics: 'Ingress delay: 18 mins',
          newMetrics: 'Ingress delay: 7 mins',
          confidence: 91,
          reasoning: 'Concourse turnstile scanning speed lagging due to high ticket check failure rate; 2 buses arriving.',
          evidence: ['Turnstile scanner logs', 'Transit scheduling API', 'Historical ingress curves'],
          alternatives: [
            { label: 'Option A (Open bypass)', desc: 'Allow manual visual ticket inspection (increases gate leakage risk).' },
            { label: 'Option B (Status Quo)', desc: 'Maintain current staff layout (queue length continues to spike).' }
          ],
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
          <p className="text-xs font-bold text-white uppercase tracking-wider font-mono">Recommendation Dispatched</p>
          <p className="text-[10px] text-system-mutedText leading-relaxed">
            AI Operations plan approved. Dispatch signals transmitted to field devices and volunteer staff.
          </p>
        </div>
        <button
          onClick={() => setStatus('pending')}
          className="px-sm py-xs bg-obsidian border border-system-border hover:border-system-cyan/30 text-[9px] font-mono text-system-mutedText hover:text-white rounded-2xs transition-colors"
        >
          Reset Action View
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
          <p className="text-xs font-bold text-white uppercase tracking-wider font-mono">Plan Dismissed</p>
          <p className="text-[10px] text-system-mutedText leading-relaxed">
            AI Operational plan rejected. Incident catalog updated to refine subsequent recommendation dispatches.
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
    <div className="bg-obsidian-muted border border-system-border rounded-xs p-md flex flex-col gap-md shadow-high font-sans">
      
      {/* 1. Header: Status Bar / Title */}
      <div className="flex items-center justify-between border-b border-system-border/40 pb-sm">
        <div className="flex items-center gap-xs">
          <div className="p-[3px] bg-system-purple/10 border border-system-purple/20 rounded-2xs text-system-purple">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-[10px] text-system-purple font-mono uppercase font-bold tracking-wider block">AI Mission Commander</span>
            <span className="text-[9px] text-system-mutedText font-mono uppercase tracking-widest">{scenario.priority}</span>
          </div>
        </div>
        <span className="text-[10px] text-system-purple font-mono bg-system-purple/10 px-sm py-[2px] rounded-2xs border border-system-purple/20 font-bold">
          {displayConfidence}% CONFIDENCE
        </span>
      </div>

      {/* 2. Situation & Recommendation */}
      <div className="flex flex-col gap-2xs">
        <div className="flex items-center gap-2xs text-[9px] font-mono text-system-mutedText uppercase">
          <Activity className="w-3 h-3 text-system-cyan" />
          <span>Current Situation</span>
        </div>
        <p className="text-xs font-bold text-white leading-relaxed">{scenario.situation}</p>
      </div>

      <div className="flex flex-col gap-xs bg-obsidian-elevated border border-system-border p-sm rounded-xs">
        <div className="flex items-center gap-2xs text-[9px] font-mono text-system-purple uppercase font-semibold">
          <span>AI RECOMMENDATION</span>
        </div>
        <p className="text-xs text-white leading-relaxed font-semibold">{scenario.recommendation}</p>
        
        {/* Expected Impact metrics badge */}
        <div className="flex items-center gap-xs mt-xs text-[9px] font-mono text-system-green bg-system-green/5 border border-system-green/20 px-xs py-[2px] rounded-2xs w-fit">
          <span className="opacity-60">{scenario.oldMetrics}</span>
          <ArrowRight className="w-2.5 h-2.5" />
          <span className="font-bold">{scenario.newMetrics}</span>
        </div>
      </div>

      {/* 3. Explainable AI reasoning details */}
      <div className="flex flex-col gap-xs">
        <div className="flex items-center gap-2xs text-[9px] font-mono text-system-mutedText uppercase">
          <Compass className="w-3.5 h-3.5 text-system-cyan" />
          <span>AI Reasoning & Telemetry Evidence</span>
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

      {/* 4. Alternative Actions (Google/Linear style) */}
      <div className="flex flex-col gap-xs border-t border-system-border/40 pt-sm">
        <span className="text-[9px] font-mono text-system-mutedText uppercase">Alternative Actions evaluated</span>
        <div className="space-y-xs">
          {scenario.alternatives.map((alt, idx) => (
            <div key={idx} className="text-[9px] leading-relaxed border-l-2 border-system-border pl-xs">
              <span className="text-white font-semibold block">{alt.label}</span>
              <span className="text-system-mutedText">{alt.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Command Action Triggers */}
      <div className="flex items-center gap-xs pt-sm border-t border-system-border/40">
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
