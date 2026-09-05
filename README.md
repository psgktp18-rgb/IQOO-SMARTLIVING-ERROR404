# iQOO Aura — Monster Smart Living AI Prototype ⚡

![iQOO Aura Header](https://img.shields.io/badge/iQOO-Smart_Living_Hackathon_2026-FFC000?style=for-the-badge)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

Aura is a mobile-first, edge-AI smart living engine built for the **iQOO Smart Living Hackathon 2026**. It automatically detects a user's context (Focus, Relaxing, Sleeping, Away, Hosting) using simulated signals and dynamically reconfigures the smart home environment (lights, temperature, locks, speakers) while explaining *why* it made those decisions.

## 🌟 Key Features

- **🧠 Edge Inference Engine**: Deterministic, explainable AI mode detection running 100% locally.
- **🎨 iQOO Monster UI**: Premium, dark-mode design with iQOO Gold accents, glassmorphism, and Framer Motion animations.
- **📊 Context Lab**: Simulate real-world events (like starting a meeting or having friends over) to see how Aura reacts in real-time.
- **🔍 Explainable AI (XAI)**: Transparent reasoning panel showing exactly which sensor signals influenced the current mode.
- **📱 Mobile-First Dashboard**: Realistic device controls for lights, climate, locks, and audio.

## 🚀 Quick Start

Ensure you have Node.js installed, then clone the repository and run:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Visit `http://localhost:5173` to view the prototype.

## 🛠️ Technology Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v3
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Icons**: Lucide React
- **Typography**: Poppins (Google Fonts)

## 📁 Project Structure

```text
src/
├── components/
│   ├── dashboard/    # Main UI cards (Device controls, Header)
│   ├── layout/       # Phone frame wrapper, Bottom navigation
│   ├── simulate/     # Context Lab (Event simulation)
│   ├── timeline/     # Telemetry Log (Event history)
│   └── why/          # AI reasoning panel
├── lib/
│   ├── devicePresets.ts # Configuration for smart home states
│   ├── mockData.ts      # Initial timeline data
│   └── modeEngine.ts    # The core AI inference logic
├── store/
│   └── useAuraStore.ts  # Zustand global state manager
└── types/
    └── aura.ts          # TypeScript interfaces
```

## 🌐 Deploying to Vercel

This project is fully optimized for Vercel deployment. 

If your repository is on GitHub:
1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New...** -> **Project**
3. Import this GitHub repository
4. Leave the build settings as default (Framework Preset: Vite)
5. Click **Deploy**

---
*Built for the iQOO Hackathon.*
