import { AuraMode, DeviceStates } from '../types/aura';

/**
 * Intelligent device automation presets triggered by each mode.
 */
export const MODE_DEVICE_PRESETS: Record<AuraMode, DeviceStates> = {
  focus: {
    lights: {
      power: true,
      brightness: 85,
      temperatureK: 4500,
      colorDesc: '4500K Crisp Focus White'
    },
    thermostat: {
      currentTemp: 70,
      targetTemp: 69,
      status: 'cooling'
    },
    lock: {
      isLocked: true,
      statusText: 'Locked • Do Not Disturb'
    },
    speaker: {
      isPlaying: true,
      trackName: 'Binaural Focus 40Hz',
      artistName: 'Deep Work Lab',
      volume: 38,
      ambientType: 'Alpha Waves'
    }
  },
  relaxing: {
    lights: {
      power: true,
      brightness: 55,
      temperatureK: 2700,
      colorDesc: '2700K Warm Sunset Amber'
    },
    thermostat: {
      currentTemp: 72,
      targetTemp: 72,
      status: 'idle'
    },
    lock: {
      isLocked: true,
      statusText: 'Locked • Home Perimeter'
    },
    speaker: {
      isPlaying: true,
      trackName: 'Coffee Shop Evening Lo-Fi',
      artistName: 'Aura Chill Collective',
      volume: 45,
      ambientType: 'Acoustic Lo-Fi'
    }
  },
  sleeping: {
    lights: {
      power: false,
      brightness: 0,
      temperatureK: 2000,
      colorDesc: 'All Zones Dark • Nightlight Standby'
    },
    thermostat: {
      currentTemp: 68,
      targetTemp: 66,
      status: 'cooling'
    },
    lock: {
      isLocked: true,
      statusText: 'Locked • Night Armor Armed'
    },
    speaker: {
      isPlaying: true,
      trackName: 'Rain On Skylight & Delta Waves',
      artistName: 'Somnus Soundscapes',
      volume: 22,
      ambientType: 'Sleep Masking'
    }
  },
  away: {
    lights: {
      power: false,
      brightness: 0,
      temperatureK: 3000,
      colorDesc: 'Standby • Smart Eco Off'
    },
    thermostat: {
      currentTemp: 75,
      targetTemp: 78,
      status: 'eco'
    },
    lock: {
      isLocked: true,
      statusText: 'Locked • High Security Geofence'
    },
    speaker: {
      isPlaying: false,
      trackName: 'Audio Muted',
      artistName: 'Energy Saver Active',
      volume: 0,
      ambientType: 'Silent'
    }
  },
  hosting: {
    lights: {
      power: true,
      brightness: 92,
      temperatureK: 3200,
      colorDesc: '3200K Dynamic Party Glow'
    },
    thermostat: {
      currentTemp: 71,
      targetTemp: 70,
      status: 'cooling'
    },
    lock: {
      isLocked: false,
      statusText: 'Unlocked • Guest Welcome Pass'
    },
    speaker: {
      isPlaying: true,
      trackName: 'Sunset Lounge & Indie Nu-Disco',
      artistName: 'Café Del Sol',
      volume: 68,
      ambientType: 'Social Groove'
    }
  }
};
