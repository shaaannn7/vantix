import React, { useMemo } from 'react';
import { useTelemetryStore } from '@/store/telemetryStore';
import { ShieldAlert, HeartPulse, UserCheck, Train, Sparkles, Flame, Volume2, Sliders, LogOut } from 'lucide-react';

export const LiveEventTimeline: React.FC = () => {
  const emergencyType = useTelemetryStore((state) => state.emergencyType);

  const events = useMemo(() => {
    switch (emergencyType) {
      case 'fire':
        return [
          {
            id: 'ev-f1',
            time: '19:47',
            title: 'AI: Egress rerouting active',
            detail: 'Redirecting Sector West flows to Gate C exits',
            color: 'text-system-purple',
            icon: Sparkles,
          },
          {
            id: 'ev-f2',
            time: '19:46',
            title: 'Thermal alarm confirmed',
            detail: 'SCADA sensor #104 verifies 94°C spike',
            color: 'text-system-crimson',
            icon: Flame,
          },
          {
            id: 'ev-f3',
            time: '19:45',
            title: 'Fire Squad 4B dispatched',
            detail: 'Deploying with full extinguishment gear',
            color: 'text-system-crimson',
            icon: ShieldAlert,
          },
          {
            id: 'ev-f4',
            time: '19:44',
            title: 'Smoke detected - Concourse L2',
            detail: 'Thermal sensor array flags local anomaly',
            color: 'text-system-amber',
            icon: ShieldAlert,
          }
        ];
      case 'medical':
        return [
          {
            id: 'ev-m1',
            time: '19:47',
            title: 'AI: AED Station deployed',
            detail: 'Staff dispatch confirms box opened',
            color: 'text-system-purple',
            icon: Sparkles,
          },
          {
            id: 'ev-m2',
            time: '19:46',
            title: 'Medical Response A on scene',
            detail: 'Commencing first aid triage protocols',
            color: 'text-system-cyan',
            icon: HeartPulse,
          },
          {
            id: 'ev-m3',
            time: '19:44',
            title: 'Cardiac distress report',
            detail: 'Gate C concession queue - fan dehydration',
            color: 'text-system-crimson',
            icon: HeartPulse,
          }
        ];
      case 'surge':
        return [
          {
            id: 'ev-s1',
            time: '19:48',
            title: 'AI: Redirecting to Gate D',
            detail: 'Balancing turnstile ingress flows',
            color: 'text-system-purple',
            icon: Sparkles,
          },
          {
            id: 'ev-s2',
            time: '19:46',
            title: 'Ingress delay warning',
            detail: 'Queue bottleneck detected at Gate C lines',
            color: 'text-system-amber',
            icon: ShieldAlert,
          },
          {
            id: 'ev-s3',
            time: '19:43',
            title: 'Metro Line 1 delay update',
            detail: 'Transit schedules delayed +4 mins',
            color: 'text-system-mutedText',
            icon: Train,
          }
        ];
      case 'evacuation':
        return [
          {
            id: 'ev-e1',
            time: '19:50',
            title: 'AI: Evac guidance initialized',
            detail: 'Dynamic visual strobe guides active',
            color: 'text-system-purple',
            icon: Sparkles,
          },
          {
            id: 'ev-e2',
            time: '19:49',
            title: 'All Emergency Exits unlocked',
            detail: 'Setting turnstiles to free passage',
            color: 'text-system-green',
            icon: LogOut,
          },
          {
            id: 'ev-e3',
            time: '19:48',
            title: 'Retractable roof retraction complete',
            detail: 'Ventilation protocols active',
            color: 'text-system-cyan',
            icon: Sliders,
          },
          {
            id: 'ev-e4',
            time: '19:47',
            title: 'Egress command broadcasted',
            detail: 'Announcements repeating on stadium PA',
            color: 'text-system-crimson animate-pulse',
            icon: Volume2,
          }
        ];
      case 'none':
      default:
        return [
          {
            id: 'ev-1',
            time: '19:47',
            title: 'AI: Volunteer allocation mapped',
            detail: 'Concourses B & D — projected ingress rate +25%',
            color: 'text-system-purple',
            icon: Sparkles,
          },
          {
            id: 'ev-2',
            time: '19:44',
            title: 'Turnstile overcrowd — Sector B4',
            detail: 'Security Team Alpha dispatched',
            color: 'text-system-crimson',
            icon: ShieldAlert,
          },
          {
            id: 'ev-3',
            time: '19:35',
            title: 'Volunteers assigned to Gate B4',
            detail: 'Manual queue control active',
            color: 'text-system-green',
            icon: UserCheck,
          },
          {
            id: 'ev-4',
            time: '19:28',
            title: 'Medical dispatch cleared',
            detail: 'MED-102 resolved — team returning to patrol',
            color: 'text-system-green',
            icon: HeartPulse,
          },
          {
            id: 'ev-5',
            time: '19:12',
            title: 'Metro Line 1 delays',
            detail: 'ETA extended +4 min due to congestion',
            color: 'text-system-amber',
            icon: Train,
          },
        ];
    }
  }, [emergencyType]);

  return (
    <div className="bg-obsidian-elevated border border-system-border rounded-xs p-md shadow-high">
      <p className="text-xs font-semibold text-white mb-md font-sans">Recent Events Log</p>
      <div className="space-y-sm">
        {events.map((ev) => {
          const Icon = ev.icon;
          return (
            <div key={ev.id} className="flex items-start gap-sm animate-fadeSlideUp">
              <Icon className={`w-3.5 h-3.5 mt-[2px] shrink-0 ${ev.color}`} />
              <div className="min-w-0">
                <div className="flex items-baseline gap-sm">
                  <span className="text-[10px] font-mono text-system-mutedText shrink-0">{ev.time}</span>
                  <span className="text-xs text-white font-medium leading-snug font-sans">{ev.title}</span>
                </div>
                <p className="text-[10px] text-system-mutedText leading-snug mt-[2px] font-sans">{ev.detail}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LiveEventTimeline;
