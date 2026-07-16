import React, { useEffect, useState, useMemo } from 'react';
import { useTelemetryStore } from '@/store/telemetryStore';
import { Users, ShieldAlert, Cpu, Activity } from 'lucide-react';

const ATTENDANCE_START = 80000;
const ATTENDANCE_END = 83412;

export const CenterHero: React.FC = React.memo(() => {
  const [attendance, setAttendance] = useState(ATTENDANCE_START);
  const emergencyType = useTelemetryStore((state) => state.emergencyType);

  useEffect(() => {
    const totalSteps = 60;
    const stepMs = 2000 / totalSteps;
    const increment = (ATTENDANCE_END - ATTENDANCE_START) / totalSteps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setAttendance(Math.min(Math.round(ATTENDANCE_START + increment * step), ATTENDANCE_END));
      if (step >= totalSteps) clearInterval(timer);
    }, stepMs);
    return () => clearInterval(timer);
  }, []);

  // Compute status metrics based on the globally synchronized emergency type
  const metrics = useMemo(() => {
    switch (emergencyType) {
      case 'fire':
        return {
          riskText: 'CRITICAL',
          riskSub: '0.94 index',
          riskColor: 'text-system-crimson font-bold animate-pulse',
          healthText: '74.8%',
          healthSub: 'Fire alert active',
          healthColor: 'text-system-crimson font-bold',
        };
      case 'medical':
        return {
          riskText: 'MEDIUM',
          riskSub: '0.38 index',
          riskColor: 'text-system-cyan font-bold',
          healthText: '94.1%',
          healthSub: 'Medical dispatch',
          healthColor: 'text-white',
        };
      case 'surge':
        return {
          riskText: 'HIGH',
          riskSub: '0.65 index',
          riskColor: 'text-system-purple font-bold',
          healthText: '89.2%',
          healthSub: 'Ingress flow lag',
          healthColor: 'text-system-purple font-bold',
        };
      case 'evacuation':
        return {
          riskText: 'CRITICAL',
          riskSub: '0.99 index',
          riskColor: 'text-system-crimson font-bold animate-strobe',
          healthText: '42.5%',
          healthSub: 'Egress active',
          healthColor: 'text-system-crimson font-bold',
        };
      case 'none':
      default:
        return {
          riskText: 'Low',
          riskSub: '0.12 index',
          riskColor: 'text-system-green',
          healthText: '98.4%',
          healthSub: 'Nominal',
          healthColor: 'text-white',
        };
    }
  }, [emergencyType]);

  const stats = [
    {
      icon: Users,
      label: 'Attendance',
      value: `${attendance.toLocaleString()}`,
      sub: '/ 87,523',
      color: 'text-white',
    },
    {
      icon: ShieldAlert,
      label: 'Risk Level',
      value: metrics.riskText,
      sub: metrics.riskSub,
      color: metrics.riskColor,
    },
    {
      icon: Cpu,
      label: 'AI Readiness',
      value: emergencyType !== 'none' ? 'CRITICAL MODE' : '99.8%',
      sub: emergencyType !== 'none' ? 'Action active' : 'All agents active',
      color: emergencyType !== 'none' ? 'text-system-purple font-bold' : 'text-system-purple',
    },
    {
      icon: Activity,
      label: 'Arena Health',
      value: metrics.healthText,
      sub: metrics.healthSub,
      color: metrics.healthColor,
    },
  ];

  return (
    <div className="flex flex-col gap-sm">
      {/* Page context line */}
      <div className="flex flex-col gap-[2px]">
        <p className="text-[11px] text-system-mutedText font-mono uppercase tracking-widest">
          World Cup · Match Day 3
        </p>
        <h1 className="text-lg font-semibold text-white leading-snug">
          Mission Control
        </h1>
      </div>

      {/* Four stat pills */}
      <div className="grid grid-cols-2 gap-sm">
        {stats.map(({ icon: Icon, label, value, sub, color }) => (
          <div
            key={label}
            className="bg-obsidian-elevated border border-system-border rounded-sm p-sm flex items-center gap-sm"
          >
            <Icon className={`w-3.5 h-3.5 shrink-0 ${color}`} />
            <div className="min-w-0">
              <p className="text-[10px] text-system-mutedText leading-none mb-[3px]">{label}</p>
              <p className={`text-xs font-semibold leading-none ${color}`}>
                {value}
                {sub && <span className="text-system-mutedText font-normal ml-xs text-[10px]">{sub}</span>}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

CenterHero.displayName = 'CenterHero';
export default CenterHero;
