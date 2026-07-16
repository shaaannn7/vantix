import { describe, it, expect, beforeEach } from 'vitest';
import { useTelemetryStore } from './telemetryStore';
import type { CrowdTelemetryPoint } from '@/types/crowd';
import type { EmergencyIncident } from '@/types/emergency';

describe('telemetryStore state machine', () => {
  beforeEach(() => {
    // Reset state to default empty metrics and incidents
    useTelemetryStore.setState({
      metrics: {},
      incidents: [],
      systemStatus: {
        latencyMs: 12,
        dbSync: 'OK',
        websocketStatus: 'CONNECTED',
      },
      showSearch: false,
      emergencyType: 'none',
    });
  });

  it('initializes with default telemetry metrics', () => {
    const state = useTelemetryStore.getState();
    expect(state.metrics).toEqual({});
    expect(state.incidents).toEqual([]);
    expect(state.systemStatus.latencyMs).toBe(12);
  });

  it('updates metrics correctly', () => {
    const mockPoint: CrowdTelemetryPoint = {
      sectorId: 'sector-west',
      density: 0.75,
      flowRate: 35,
      gateStatus: 'OPEN',
      optimalRate: 50,
      timestamp: 1713456789000,
    };

    useTelemetryStore.getState().updateMetric('sector-west', mockPoint);

    const state = useTelemetryStore.getState();
    expect(state.metrics['sector-west']).toEqual(mockPoint);
  });

  it('adds incidents correctly', () => {
    const mockIncident: EmergencyIncident = {
      id: 'inc-12',
      title: 'Queue Bottleneck at Concourse C',
      location: 'Gate C Ingress',
      severity: 'high',
      status: 'reported',
      reporter: 'AI_INGRESS_BOT_01',
      timestamp: 1713456789000,
      coordinates: [10, -5],
    };

    useTelemetryStore.getState().addIncident(mockIncident);

    const state = useTelemetryStore.getState();
    expect(state.incidents.length).toBe(1);
    expect(state.incidents[0]).toEqual(mockIncident);
  });

  it('updates system status correctly', () => {
    useTelemetryStore.getState().setSystemStatus({ latencyMs: 18, websocketStatus: 'DISCONNECTED' });

    const state = useTelemetryStore.getState();
    expect(state.systemStatus.latencyMs).toBe(18);
    expect(state.systemStatus.websocketStatus).toBe('DISCONNECTED');
    expect(state.systemStatus.dbSync).toBe('OK'); // preserves unchanged properties
  });

  it('updates emergency type correctly', () => {
    useTelemetryStore.getState().setEmergencyType('fire');
    const state = useTelemetryStore.getState();
    expect(state.emergencyType).toBe('fire');
  });
});
