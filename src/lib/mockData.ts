import { TimelineEntry, ContextInput } from '../types/aura';

export const INITIAL_TIMELINE: TimelineEntry[] = [
  {
    id: 'tl-1',
    time: '2:15 PM',
    mode: 'focus',
    reason: 'Calendar sync: "Product Architecture Review" started with desk presence confirmed.',
    confidence: 97
  },
  {
    id: 'tl-2',
    time: '1:05 PM',
    mode: 'relaxing',
    reason: 'Lunch break detected: calendar window free with intermittent kitchen motion.',
    confidence: 92
  },
  {
    id: 'tl-3',
    time: '10:00 AM',
    mode: 'focus',
    reason: 'Calendar meeting: "Q3 Core Sprint Kickoff" with noise dampening activated.',
    confidence: 99
  },
  {
    id: 'tl-4',
    time: '8:45 AM',
    mode: 'away',
    reason: 'Zero motion detected for 45 minutes after front door lock event.',
    confidence: 95
  },
  {
    id: 'tl-5',
    time: '7:10 AM',
    mode: 'relaxing',
    reason: 'Morning circadian dawn schedule triggered with gradual ambient lighting.',
    confidence: 90
  }
];

export interface DemoPreset {
  id: string;
  name: string;
  emoji: string;
  subtitle: string;
  context: ContextInput;
}

export const DEMO_PRESETS: DemoPreset[] = [
  {
    id: 'preset-focus',
    name: 'Work Meeting',
    emoji: '💼',
    subtitle: 'Afternoon • Meeting Active',
    context: {
      timeOfDay: 'afternoon',
      meetingNow: true,
      motionLevel: 'low',
      noiseLevel: 'quiet',
      isInactive: false
    }
  },
  {
    id: 'preset-relaxing',
    name: 'Evening Chill',
    emoji: '🛋️',
    subtitle: 'Evening • Free Time • Calm',
    context: {
      timeOfDay: 'evening',
      meetingNow: false,
      motionLevel: 'low',
      noiseLevel: 'quiet',
      isInactive: false
    }
  },
  {
    id: 'preset-sleeping',
    name: 'Night Sleep',
    emoji: '🌙',
    subtitle: 'Night • Low Motion • Still',
    context: {
      timeOfDay: 'night',
      meetingNow: false,
      motionLevel: 'low',
      noiseLevel: 'quiet',
      isInactive: false
    }
  },
  {
    id: 'preset-hosting',
    name: 'Friends Over',
    emoji: '🎉',
    subtitle: 'Evening • High Motion • Loud',
    context: {
      timeOfDay: 'evening',
      meetingNow: false,
      motionLevel: 'high',
      noiseLevel: 'loud',
      isInactive: false
    }
  },
  {
    id: 'preset-away',
    name: 'Left House',
    emoji: '🚪',
    subtitle: 'Afternoon • Inactive 45m+',
    context: {
      timeOfDay: 'afternoon',
      meetingNow: false,
      motionLevel: 'low',
      noiseLevel: 'quiet',
      isInactive: true
    }
  }
];
