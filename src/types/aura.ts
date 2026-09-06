export type AuraMode = 'focus' | 'relaxing' | 'sleeping' | 'away' | 'hosting';

export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';
export type MotionLevel = 'low' | 'medium' | 'high';
export type NoiseLevel = 'quiet' | 'moderate' | 'loud';

export interface ContextInput {
  timeOfDay: TimeOfDay;
  meetingNow: boolean;
  motionLevel: MotionLevel;
  noiseLevel: NoiseLevel;
  isInactive: boolean;
}

export interface SignalWeight {
  name: string;
  weight: number; // Percentage 0 - 100
  displayLabel: string;
  value: string;
  impact: string;
}

export interface PredictedNext {
  mode: AuraMode;
  inMinutes: number;
  rationale: string;
}

export interface ModeResult {
  mode: AuraMode;
  confidence: number; // e.g. 94
  primaryReason: string;
  signals: SignalWeight[];
  predictedNext: PredictedNext;
}

export interface DeviceStates {
  lights: {
    power: boolean;
    brightness: number; // 0-100
    temperatureK: number; // 2200 to 5000
    colorDesc: string;
    connected: boolean;
    connectionType: string;
    lastSynced: string;
    signalBars: number;
  };
  thermostat: {
    currentTemp: number;
    targetTemp: number;
    status: 'cooling' | 'heating' | 'eco' | 'idle';
    connected: boolean;
    connectionType: string;
    lastSynced: string;
    signalBars: number;
  };
  lock: {
    isLocked: boolean;
    statusText: string;
    lastActionTime?: string;
    connected: boolean;
    connectionType: string;
    lastSynced: string;
    signalBars: number;
  };
  speaker: {
    isPlaying: boolean;
    trackName: string;
    artistName: string;
    volume: number; // 0-100
    ambientType: string;
    connected: boolean;
    connectionType: string;
    lastSynced: string;
    signalBars: number;
  };
}

export interface TimelineEntry {
  id: string;
  time: string;
  mode: AuraMode;
  reason: string;
  confidence: number;
  isNew?: boolean;
}

export type NavigationTab = 'home' | 'timeline' | 'simulate';

export interface ModeThemeConfig {
  name: string;
  tagline: string;
  badge: string;
  accentHex: string;
  gradient: string;
  glowClass: string;
  borderClass: string;
  iconBg: string;
}
