import { create } from 'zustand';
import confetti from 'canvas-confetti';
import { 
  AuraMode, 
  ContextInput, 
  DeviceStates, 
  NavigationTab, 
  PredictedNext, 
  SignalWeight, 
  TimelineEntry 
} from '../types/aura';
import { detectMode } from '../lib/modeEngine';
import { MODE_DEVICE_PRESETS } from '../lib/devicePresets';
import { INITIAL_TIMELINE, DemoPreset } from '../lib/mockData';

interface AuraState {
  // Mode & Inference
  currentMode: AuraMode;
  confidence: number;
  primaryReason: string;
  signals: SignalWeight[];
  predictedNext: PredictedNext;
  lastDetectedTime: string;

  // Devices
  deviceStates: DeviceStates;

  // Timeline
  timelineHistory: TimelineEntry[];

  // Simulation Controls
  simulateContext: ContextInput;
  activePresetId: string | null;
  isAnalyzing: boolean;
  analyzingStage: string;
  analyzingProgress: number;

  // UI State
  activeTab: NavigationTab;
  isWhyPanelOpen: boolean;

  // Actions
  setActiveTab: (tab: NavigationTab) => void;
  setWhyPanelOpen: (isOpen: boolean) => void;
  setContextInput: (partial: Partial<ContextInput>) => void;
  applyPreset: (preset: DemoPreset) => void;
  runDetection: () => Promise<void>;
  
  // Interactive device overrides
  toggleLightPower: () => void;
  setLightBrightness: (val: number) => void;
  adjustThermostat: (delta: number) => void;
  toggleDoorLock: () => void;
  toggleSpeakerPlayback: () => void;
  setSpeakerVolume: (val: number) => void;
}

const initialContext: ContextInput = {
  timeOfDay: 'afternoon',
  meetingNow: true,
  motionLevel: 'low',
  noiseLevel: 'quiet',
  isInactive: false
};

const initialResult = detectMode(initialContext);

export const useAuraStore = create<AuraState>((set, get) => ({
  currentMode: initialResult.mode,
  confidence: initialResult.confidence,
  primaryReason: initialResult.primaryReason,
  signals: initialResult.signals,
  predictedNext: initialResult.predictedNext,
  lastDetectedTime: 'Detected just now',

  deviceStates: { ...MODE_DEVICE_PRESETS[initialResult.mode] },

  timelineHistory: INITIAL_TIMELINE,

  simulateContext: initialContext,
  activePresetId: 'preset-focus',
  isAnalyzing: false,
  analyzingStage: '',
  analyzingProgress: 0,

  activeTab: 'home',
  isWhyPanelOpen: false,

  setActiveTab: (tab) => set({ activeTab: tab }),

  setWhyPanelOpen: (isOpen) => set({ isWhyPanelOpen: isOpen }),

  setContextInput: (partial) => {
    set((state) => ({
      simulateContext: { ...state.simulateContext, ...partial },
      activePresetId: null // Clear preset highlight when manually modifying
    }));
  },

  applyPreset: (preset) => {
    set({
      simulateContext: { ...preset.context },
      activePresetId: preset.id
    });
  },

  runDetection: async () => {
    const { simulateContext, timelineHistory } = get();

    // Start simulated AI inference animation
    set({
      isAnalyzing: true,
      analyzingProgress: 15,
      analyzingStage: 'Sampling acoustic & motion sensors...'
    });

    await new Promise((resolve) => setTimeout(resolve, 400));
    set({
      analyzingProgress: 55,
      analyzingStage: 'Evaluating Bayesian decision signals...'
    });

    await new Promise((resolve) => setTimeout(resolve, 450));
    set({
      analyzingProgress: 88,
      analyzingStage: 'Reconfiguring smart home environment...'
    });

    await new Promise((resolve) => setTimeout(resolve, 350));

    // Run actual deterministic engine logic
    const result = detectMode(simulateContext);
    const newDevices = { ...MODE_DEVICE_PRESETS[result.mode] };

    // Format current time
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

    // Prepend to timeline
    const newEntry: TimelineEntry = {
      id: `tl-${Date.now()}`,
      time: timeStr,
      mode: result.mode,
      reason: result.primaryReason,
      confidence: result.confidence,
      isNew: true
    };

    set({
      currentMode: result.mode,
      confidence: result.confidence,
      primaryReason: result.primaryReason,
      signals: result.signals,
      predictedNext: result.predictedNext,
      lastDetectedTime: `Detected at ${timeStr}`,
      deviceStates: newDevices,
      timelineHistory: [newEntry, ...timelineHistory],
      isAnalyzing: false,
      analyzingProgress: 100,
      activeTab: 'home'
    });

    // Subtle celebration for mode detection
    try {
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.25 },
        colors: ['#A78BFA', '#F59E0B', '#10B981', '#6366F1', '#F43F5E']
      });
    } catch {
      // ignore in tests/headless
    }
  },

  toggleLightPower: () => {
    set((state) => {
      const nextPower = !state.deviceStates.lights.power;
      return {
        deviceStates: {
          ...state.deviceStates,
          lights: {
            ...state.deviceStates.lights,
            power: nextPower,
            brightness: nextPower ? (state.deviceStates.lights.brightness || 80) : 0
          }
        }
      };
    });
  },

  setLightBrightness: (val) => {
    set((state) => ({
      deviceStates: {
        ...state.deviceStates,
        lights: {
          ...state.deviceStates.lights,
          brightness: val,
          power: val > 0
        }
      }
    }));
  },

  adjustThermostat: (delta) => {
    set((state) => ({
      deviceStates: {
        ...state.deviceStates,
        thermostat: {
          ...state.deviceStates.thermostat,
          targetTemp: state.deviceStates.thermostat.targetTemp + delta,
          status: delta > 0 ? 'heating' : 'cooling'
        }
      }
    }));
  },

  toggleDoorLock: () => {
    set((state) => {
      const nextLocked = !state.deviceStates.lock.isLocked;
      return {
        deviceStates: {
          ...state.deviceStates,
          lock: {
            ...state.deviceStates.lock,
            isLocked: nextLocked,
            statusText: nextLocked ? 'Locked Manually' : 'Unlocked • Door Open'
          }
        }
      };
    });
  },

  toggleSpeakerPlayback: () => {
    set((state) => ({
      deviceStates: {
        ...state.deviceStates,
        speaker: {
          ...state.deviceStates.speaker,
          isPlaying: !state.deviceStates.speaker.isPlaying
        }
      }
    }));
  },

  setSpeakerVolume: (val) => {
    set((state) => ({
      deviceStates: {
        ...state.deviceStates,
        speaker: {
          ...state.deviceStates.speaker,
          volume: val,
          isPlaying: val > 0
        }
      }
    }));
  }
}));
