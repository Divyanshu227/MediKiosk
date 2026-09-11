# MediKiosk

MediKiosk is an interactive, voice-enabled patient intake application designed for hospital outpatient departments (OPD). It allows patients to record their symptoms and medical history in their native language before consultation, generating a structured clinical summary for attending physicians.

## Features

- **Multilingual Voice Intake:** Supports 10 Indian regional languages (Hindi, English, Bengali, Telugu, Marathi, Tamil, Gujarati, Kannada, Malayalam, Punjabi).
- **Structured Clinical Data:** Captures chief complaints, symptom duration, severity, temperature, positive/negative symptoms, medications taken, and known allergies.
- **Doctor Portal & Live Queue:** Real-time patient queue with priority flags, clinical summary breakdowns, and verbatim audio/translation transcripts.
- **Red-Flag Emergency Alerts:** Automatic safety alert trigger for acute conditions (such as severe chest pain or respiratory distress) to alert triage staff immediately.
- **Accessibility Modes:** Large text mode, high-contrast dark mode, and speech synthesis voice guidance.

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation & Development

```bash
npm install
npm run dev
```

The app will be available locally at `http://localhost:5173/`.

### Building for Production

```bash
npm run build
```

## Tech Stack

- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Lucide React**
- **Vite**
- **Web Speech API**
