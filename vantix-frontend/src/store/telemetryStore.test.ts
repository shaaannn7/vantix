import { describe, it, expect, beforeEach } from 'vitest';
import { useTelemetryStore } from './telemetryStore';

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
    });
  });

  it('initializes with default telemetry metrics', () => {
    const state = useTelemetryStore.getState();
    expect(state.metrics).toEqual({});
    expect(state.incidents).toEqual([]);
    expect(state.systemStatus.latencyMs).toBe(12);
  });

  it('updates metrics correctly', () => {
    const mockPoint = {
      sectorId: 'sector-west',
      density: 0.75,
      capacity: 12000,
      headcount: 9000,
      flowRate: 35,
      alertStatus: 'NORMAL' as const,
    };

    useTelemetryStore.getState().updateMetric('sector-west', mockPoint);

    const state = useTelemetryStore.getState();
    expect(state.metrics['sector-west']).toEqual(mockPoint);
  });

  it('adds incidents correctly', () => {
    const mockIncident = {
      id: 'inc-12',
      title: 'Queue Bottleneck at Concourse C',
      type: 'security' as const,
      severity: 'HIGH' as const,
      status: 'MONITORING' as const,
      response: '5m',
      position: [10, 1.5, -5] as [number, number, number],
      detail: 'Queue processing delay detected at Sector West ingress check.'
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
});
