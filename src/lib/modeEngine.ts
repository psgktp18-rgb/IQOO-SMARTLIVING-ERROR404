import { ContextInput, ModeResult, AuraMode, SignalWeight, ModeThemeConfig } from '../types/aura';

/**
 * Deterministic, explainable AI Mode Detection Engine for Aura.
 * Uses transparent multi-factor weighted scoring based on ambient context signals.
 */
export function detectMode(context: ContextInput): ModeResult {
  const { timeOfDay, meetingNow, motionLevel, noiseLevel, isInactive } = context;

  // Case 1: Inactivity / Away flag active
  if (isInactive) {
    const signals: SignalWeight[] = [
      {
        name: 'Device Presence',
        weight: 65,
        displayLabel: 'Zero Device Motion',
        value: 'Inactive > 45m',
        impact: 'Absence of motion & mobile geofence triggers Away state.'
      },
      {
        name: 'Motion Sensor',
        weight: 25,
        displayLabel: 'Interior PIR Sensors',
        value: motionLevel.toUpperCase(),
        impact: 'No physical movement detected in living zones.'
      },
      {
        name: 'Time Context',
        weight: 10,
        displayLabel: 'Time of Day',
        value: capitalize(timeOfDay),
        impact: 'Normal occupancy expected, but confirmed vacant.'
      }
    ];

    return {
      mode: 'away',
      confidence: 96,
      primaryReason: 'Aura switched to Away mode because zero movement and absence signals were detected for over 45 minutes.',
      signals,
      predictedNext: {
        mode: 'relaxing',
        inMinutes: 90,
        rationale: 'Expected return based on weekday calendar schedule (~6:30 PM).'
      }
    };
  }

  // Case 2: Meeting now / Work calendar event
  if (meetingNow) {
    const calendarWeight = motionLevel === 'high' ? 60 : 72;
    const noiseWeight = noiseLevel === 'loud' ? 18 : 14;
    const motionWeight = 100 - (calendarWeight + noiseWeight + 8);

    const signals: SignalWeight[] = [
      {
        name: 'Calendar Sync',
        weight: calendarWeight,
        displayLabel: 'Active Meeting Event',
        value: 'Confirmed Busy',
        impact: 'Calendar indicates a scheduled high-priority sprint call.'
      },
      {
        name: 'Ambient Noise',
        weight: noiseWeight,
        displayLabel: 'Acoustic Baseline',
        value: capitalize(noiseLevel),
        impact: noiseLevel === 'loud' 
          ? 'Elevated background sound detected, engaging speech-clarity profile.'
          : 'Low noise floor ideal for concentrated deep work.'
      },
      {
        name: 'Motion Level',
        weight: motionWeight,
        displayLabel: 'Desk Proximity',
        value: capitalize(motionLevel),
        impact: 'Seated desk presence aligned with productive posture.'
      },
      {
        name: 'Time of Day',
        weight: 8,
        displayLabel: 'Peak Work Window',
        value: capitalize(timeOfDay),
        impact: 'Falls within standard focused hours.'
      }
    ];

    return {
      mode: 'focus',
      confidence: 98,
      primaryReason: 'Aura switched to Focus mode mainly because your calendar shows an active meeting in progress.',
      signals,
      predictedNext: {
        mode: 'relaxing',
        inMinutes: 35,
        rationale: 'Current calendar meeting scheduled to end in 35 minutes.'
      }
    };
  }

  // Case 3: Hosting Guests (Evening or Afternoon + Loud noise + High/Medium motion)
  if ((noiseLevel === 'loud' && motionLevel === 'high') || 
      (timeOfDay === 'evening' && noiseLevel === 'loud') ||
      (motionLevel === 'high' && noiseLevel === 'moderate' && (timeOfDay === 'evening' || timeOfDay === 'night'))) {
    const signals: SignalWeight[] = [
      {
        name: 'Acoustic Dynamics',
        weight: 48,
        displayLabel: 'Multi-Voice Sound Level',
        value: `${capitalize(noiseLevel)} (>68dB)`,
        impact: 'Multiple audio frequency signatures typical of social conversation.'
      },
      {
        name: 'Multi-Room Motion',
        weight: 34,
        displayLabel: 'Living & Dining Sensors',
        value: capitalize(motionLevel),
        impact: 'Frequent concurrent motion across kitchen and living spaces.'
      },
      {
        name: 'Time Frame',
        weight: 18,
        displayLabel: 'Social Window',
        value: capitalize(timeOfDay),
        impact: 'Evening social pattern consistent with hosting gatherings.'
      }
    ];

    return {
      mode: 'hosting',
      confidence: 93,
      primaryReason: 'Aura detected multiple conversational voices and elevated multi-room motion typical of hosting guests.',
      signals,
      predictedNext: {
        mode: 'relaxing',
        inMinutes: 120,
        rationale: 'Average weekend guest departure trend is 2 hours from peak.'
      }
    };
  }

  // Case 4: Sleeping (Night + Low motion + Quiet/Moderate noise)
  if (timeOfDay === 'night' && (motionLevel === 'low' || noiseLevel === 'quiet')) {
    const signals: SignalWeight[] = [
      {
        name: 'Circadian Time',
        weight: 46,
        displayLabel: 'Sleep Window',
        value: 'Night (11:15 PM)',
        impact: 'Late night hour matches established circadian sleep profile.'
      },
      {
        name: 'Bedroom Motion',
        weight: 36,
        displayLabel: 'Bed Proximity Sensor',
        value: 'Minimal / Still',
        impact: 'Zero movement for 20 minutes indicates sleep initiation.'
      },
      {
        name: 'Noise Floor',
        weight: 18,
        displayLabel: 'Acoustic Silence',
        value: capitalize(noiseLevel),
        impact: 'Whisper-quiet ambient sound levels (<28 dB).'
      }
    ];

    return {
      mode: 'sleeping',
      confidence: 97,
      primaryReason: 'Aura switched to Sleeping mode due to nocturnal schedule, bedroom stillness, and low ambient noise.',
      signals,
      predictedNext: {
        mode: 'focus',
        inMinutes: 420,
        rationale: 'Wake-up alarm and morning focus routine scheduled for 7:00 AM.'
      }
    };
  }

  // Case 5: Default / Relaxing
  const signals: SignalWeight[] = [
    {
      name: 'Schedule Availability',
      weight: 42,
      displayLabel: 'Calendar Free',
      value: 'Zero Events',
      impact: 'No work commitments or upcoming alarms.'
    },
    {
      name: 'Gentle Ambience',
      weight: 35,
      displayLabel: 'Ambient Atmosphere',
      value: `${capitalize(noiseLevel)} Noise`,
      impact: 'Calm background levels ideal for rest, reading, or media.'
    },
    {
      name: 'Pacing & Motion',
      weight: 23,
      displayLabel: 'Living Room PIR',
      value: capitalize(motionLevel),
      impact: 'Gentle, intermittent motion consistent with leisure rest.'
    }
  ];

  return {
    mode: 'relaxing',
    confidence: 91,
    primaryReason: 'Aura switched to Relaxing mode because your schedule is clear with calm, comfortable ambient motion.',
    signals,
    predictedNext: {
      mode: timeOfDay === 'evening' ? 'sleeping' : 'focus',
      inMinutes: timeOfDay === 'evening' ? 75 : 60,
      rationale: timeOfDay === 'evening'
        ? 'Approaching wind-down schedule for bedtime.'
        : 'Afternoon productivity window starting shortly.'
    }
  };
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * Visual themes and styling tokens for each mode
 */
export const MODE_THEMES: Record<AuraMode, ModeThemeConfig> = {
  focus: {
    name: 'Focus Mode',
    tagline: 'Monster Performance & Deep Work',
    badge: 'Monster Performance',
    accentHex: '#FFC000',
    gradient: 'from-[#FFC000]/20 via-[#FFC000]/10 to-transparent',
    glowClass: 'shadow-glow-focus',
    borderClass: 'border-[#FFC000]/40',
    iconBg: 'bg-[#FFC000]/15 text-[#FFC000]'
  },
  relaxing: {
    name: 'Relaxing Mode',
    tagline: 'Zen Flow & Climate Balance',
    badge: 'Zen Ambient',
    accentHex: '#00E5FF',
    gradient: 'from-[#00E5FF]/20 via-[#00E5FF]/10 to-transparent',
    glowClass: 'shadow-glow-relaxing',
    borderClass: 'border-[#00E5FF]/40',
    iconBg: 'bg-[#00E5FF]/15 text-[#00E5FF]'
  },
  sleeping: {
    name: 'Sleeping Mode',
    tagline: 'Stealth Shield & Circadian Rest',
    badge: 'Stealth Rest',
    accentHex: '#4F46E5',
    gradient: 'from-indigo-500/20 via-blue-600/10 to-transparent',
    glowClass: 'shadow-glow-sleeping',
    borderClass: 'border-indigo-500/40',
    iconBg: 'bg-indigo-500/15 text-indigo-400'
  },
  away: {
    name: 'Away Mode',
    tagline: 'Titanium Guard & Energy Saver',
    badge: 'Titanium Guard',
    accentHex: '#94A3B8',
    gradient: 'from-slate-500/20 via-slate-600/10 to-transparent',
    glowClass: 'shadow-glow-away',
    borderClass: 'border-slate-500/40',
    iconBg: 'bg-slate-500/15 text-slate-300'
  },
  hosting: {
    name: 'Hosting Guests',
    tagline: 'Phoenix Energy & Social Dynamic',
    badge: 'Phoenix Mode',
    accentHex: '#FF5E00',
    gradient: 'from-[#FF5E00]/20 via-[#FF5E00]/10 to-transparent',
    glowClass: 'shadow-glow-hosting',
    borderClass: 'border-[#FF5E00]/40',
    iconBg: 'bg-[#FF5E00]/15 text-[#FF5E00]'
  }
};
