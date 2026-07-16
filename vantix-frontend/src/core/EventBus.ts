export type VentixEventName = 
  | 'CrowdDensityChanged'
  | 'WeatherUpdated'
  | 'EmergencyTriggered'
  | 'VolunteerDispatched'
  | 'GateClosed'
  | 'SimulationStarted'
  | 'PredictionCompleted'
  | 'MissionApproved'
  | 'MissionRejected';

export interface VentixEvent<T = any> {
  type: VentixEventName;
  payload: T;
  timestamp: number;
}

type EventHandler = (event: VentixEvent) => void;

class CentralEventBus {
  private listeners: Map<VentixEventName, Set<EventHandler>> = new Map();

  subscribe(eventName: VentixEventName, handler: EventHandler): () => void {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, new Set());
    }
    this.listeners.get(eventName)!.add(handler);
    
    return () => {
      this.listeners.get(eventName)?.delete(handler);
    };
  }

  publish<T>(eventName: VentixEventName, payload?: T): void {
    const event: VentixEvent = {
      type: eventName,
      payload,
      timestamp: Date.now()
    };
    
    // Log to console for debugging central OS flow
    console.log(`[VENTIX-OS] EVENT: ${eventName}`, payload);

    const handlers = this.listeners.get(eventName);
    if (handlers) {
      handlers.forEach(handler => handler(event));
    }
  }
}

export const EventBus = new CentralEventBus();
