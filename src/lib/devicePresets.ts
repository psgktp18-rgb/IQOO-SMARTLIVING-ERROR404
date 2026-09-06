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
      colorDesc: '4500K Crisp Focus White',
      connected: true,
      connectionType: 'Zigbee',
      lastSynced: 'Just now',
      signalBars: 4
    },
    thermostat: {
      currentTemp: 70,
      targetTemp: 69,
      status: 'cooling',
      connected: true,
      connectionType: 'Wi-Fi',
      lastSynced: 'Just now',
      signalBars: 4
    },
    lock: {
      isLocked: true,
      statusText: 'Locked • Do Not Disturb',
      connected: true,
      connectionType: 'Bluetooth',
      lastSynced: 'Just now',
      signalBars: 3
    },
    speaker: {
      isPlaying: true,
      trackName: 'Binaural Focus 40Hz',
      artistName: 'Deep Work Lab',
      volume: 38,
      ambientType: 'Alpha Waves',
      connected: true,
      connectionType: 'Wi-Fi',
      lastSynced: 'Just now',
      signalBars: 4
    }
  },
  relaxing: {
    lights: {
      power: true,
      brightness: 55,
      temperatureK: 2700,
      colorDesc: '2700K Warm Sunset Amber',
      connected: true,
      connectionType: 'Zigbee',
      lastSynced: 'Just now',
      signalBars: 4
    },
    thermostat: {
      currentTemp: 72,
      targetTemp: 72,
      status: 'idle',
      connected: true,
      connectionType: 'Wi-Fi',
      lastSynced: 'Just now',
      signalBars: 4
    },
    lock: {
      isLocked: true,
      statusText: 'Locked • Home Perimeter',
      connected: true,
      connectionType: 'Bluetooth',
      lastSynced: 'Just now',
      signalBars: 3
    },
    speaker: {
      isPlaying: true,
      trackName: 'Coffee Shop Evening Lo-Fi',
      artistName: 'Aura Chill Collective',
      volume: 45,
      ambientType: 'Acoustic Lo-Fi',
      connected: true,
      connectionType: 'Wi-Fi',
      lastSynced: 'Just now',
      signalBars: 4
    }
  },
  sleeping: {
    lights: {
      power: false,
      brightness: 0,
      temperatureK: 2000,
      colorDesc: 'All Zones Dark • Nightlight Standby',
      connected: true,
      connectionType: 'Zigbee',
      lastSynced: 'Just now',
      signalBars: 4
    },
    thermostat: {
      currentTemp: 68,
      targetTemp: 66,
      status: 'cooling',
      connected: true,
      connectionType: 'Wi-Fi',
      lastSynced: 'Just now',
      signalBars: 4
    },
    lock: {
      isLocked: true,
      statusText: 'Locked • Night Armor Armed',
      connected: true,
      connectionType: 'Bluetooth',
      lastSynced: 'Just now',
      signalBars: 3
    },
    speaker: {
      isPlaying: true,
      trackName: 'Rain On Skylight & Delta Waves',
      artistName: 'Somnus Soundscapes',
      volume: 22,
      ambientType: 'Sleep Masking',
      connected: true,
      connectionType: 'Wi-Fi',
      lastSynced: 'Just now',
      signalBars: 4
    }
  },
  away: {
    lights: {
      power: false,
      brightness: 0,
      temperatureK: 3000,
      colorDesc: 'Standby • Smart Eco Off',
      connected: true,
      connectionType: 'Zigbee',
      lastSynced: 'Just now',
      signalBars: 4
    },
    thermostat: {
      currentTemp: 75,
      targetTemp: 78,
      status: 'eco',
      connected: true,
      connectionType: 'Wi-Fi',
      lastSynced: 'Just now',
      signalBars: 4
    },
    lock: {
      isLocked: true,
      statusText: 'Locked • High Security Geofence',
      connected: true,
      connectionType: 'Bluetooth',
      lastSynced: 'Just now',
      signalBars: 3
    },
    speaker: {
      isPlaying: false,
      trackName: 'Audio Muted',
      artistName: 'Energy Saver Active',
      volume: 0,
      ambientType: 'Silent',
      connected: true,
      connectionType: 'Wi-Fi',
      lastSynced: 'Just now',
      signalBars: 4
    }
  },
  hosting: {
    lights: {
      power: true,
      brightness: 92,
      temperatureK: 3200,
      colorDesc: '3200K Dynamic Party Glow',
      connected: true,
      connectionType: 'Zigbee',
      lastSynced: 'Just now',
      signalBars: 4
    },
    thermostat: {
      currentTemp: 71,
      targetTemp: 70,
      status: 'cooling',
      connected: true,
      connectionType: 'Wi-Fi',
      lastSynced: 'Just now',
      signalBars: 4
    },
    lock: {
      isLocked: false,
      statusText: 'Unlocked • Guest Welcome Pass',
      connected: true,
      connectionType: 'Bluetooth',
      lastSynced: 'Just now',
      signalBars: 3
    },
    speaker: {
      isPlaying: true,
      trackName: 'Sunset Lounge & Indie Nu-Disco',
      artistName: 'Café Del Sol',
      volume: 68,
      ambientType: 'Social Groove',
      connected: true,
      connectionType: 'Wi-Fi',
      lastSynced: 'Just now',
      signalBars: 4
    }
  }
};
