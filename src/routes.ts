import { ScreenType } from './types';

export interface RouteConfig {
  id: ScreenType;
  path: string;
  canonicalHash: string;
  title: string;
  category: 'kiosk' | 'doctor' | 'safety';
  stepNumber?: number;
  totalSteps?: number;
  description: string;
  badge?: string;
}

export const APP_ROUTES: Record<ScreenType, RouteConfig> = {
  'kiosk-home': {
    id: 'kiosk-home',
    path: '/',
    canonicalHash: '#/',
    title: 'Self-Service Intake Kiosk',
    category: 'kiosk',
    description: 'Multilingual Indic conversational intake and guided touchscreen registration.',
    badge: 'Terminal #3'
  },
  'patient-id': {
    id: 'patient-id',
    path: '/patient-id',
    canonicalHash: '#/patient-id',
    title: 'Patient Identification & ABHA',
    category: 'kiosk',
    stepNumber: 1,
    totalSteps: 9,
    description: 'New registration, returning patient verification, and ABHA QR scanner.',
    badge: 'Step 1 of 9'
  },
  'language': {
    id: 'language',
    path: '/language',
    canonicalHash: '#/language',
    title: 'Language Selection',
    category: 'kiosk',
    stepNumber: 2,
    totalSteps: 9,
    description: '10 Indian scheduled languages with native voice prompts and transliteration.',
    badge: 'Step 2 of 9'
  },
  'consent': {
    id: 'consent',
    path: '/consent',
    canonicalHash: '#/consent',
    title: 'Clinical Consent & Privacy',
    category: 'kiosk',
    stepNumber: 3,
    totalSteps: 9,
    description: 'DPDP Act 2023 compliant data protection and non-diagnostic legal consent.',
    badge: 'Step 3 of 9'
  },
  'voice-intake': {
    id: 'voice-intake',
    path: '/voice-intake',
    canonicalHash: '#/voice-intake',
    title: 'Microphone & Audio Calibration',
    category: 'kiosk',
    stepNumber: 4,
    totalSteps: 9,
    description: 'Noise suppression hardware check and Indic voice input calibration.',
    badge: 'Step 4 of 9'
  },
  'ai-conversation': {
    id: 'ai-conversation',
    path: '/ai-conversation',
    canonicalHash: '#/ai-conversation',
    title: 'Clinical Case-Taking (SOCRATES)',
    category: 'kiosk',
    stepNumber: 5,
    totalSteps: 9,
    description: 'SOCRATES framework history collection, clinical NER, and negation extraction.',
    badge: 'Step 5 of 9'
  },
  'document-scanner': {
    id: 'document-scanner',
    path: '/document-scanner',
    canonicalHash: '#/document-scanner',
    title: 'Optical Document Scanner & OCR',
    category: 'kiosk',
    stepNumber: 6,
    totalSteps: 9,
    description: 'Prescription, lab test, and discharge summary digitization with abnormal value flags.',
    badge: 'Step 6 of 9'
  },
  'timeline': {
    id: 'timeline',
    path: '/timeline',
    canonicalHash: '#/timeline',
    title: 'Longitudinal Health Timeline',
    category: 'kiosk',
    stepNumber: 7,
    totalSteps: 9,
    description: 'Unified chronological synthesis of past prescriptions, labs, and intake.',
    badge: 'Step 7 of 9'
  },
  'review': {
    id: 'review',
    path: '/review',
    canonicalHash: '#/review',
    title: 'Comprehensive Intake Review',
    category: 'kiosk',
    stepNumber: 8,
    totalSteps: 9,
    description: 'Patient-facing verification and audio playback before physician submission.',
    badge: 'Step 8 of 9'
  },
  'clinical-summary': {
    id: 'clinical-summary',
    path: '/clinical-summary',
    canonicalHash: '#/clinical-summary',
    title: 'Physician Summary & Token Slip',
    category: 'kiosk',
    stepNumber: 9,
    totalSteps: 9,
    description: 'Standardized 13-section clinical summary, thermal token, and FHIR R4 bundle.',
    badge: 'Step 9 of 9'
  },
  'red-flag': {
    id: 'red-flag',
    path: '/red-flag',
    canonicalHash: '#/red-flag',
    title: 'Emergency Red-Flag Alert',
    category: 'safety',
    description: 'Emergency triage protocol activation and nursing station notification.',
    badge: 'Triage Halt'
  },
  'doctor-dashboard': {
    id: 'doctor-dashboard',
    path: '/doctor/queue',
    canonicalHash: '#/doctor/queue',
    title: 'OPD Clinical Queue & Worklist',
    category: 'doctor',
    description: 'Real-time patient queue with department filtering, triage badges, and gap alerts.',
    badge: 'Doctor Worklist'
  },
  'doctor-patient-summary': {
    id: 'doctor-patient-summary',
    path: '/doctor/patient-chart',
    canonicalHash: '#/doctor/patient-chart',
    title: 'Physician Clinical Workstation',
    category: 'doctor',
    description: '3-column clinical workstation with pre-consult SOAP, e-prescribing, and lab meters.',
    badge: 'Patient Chart'
  },
  'doctor-conversation': {
    id: 'doctor-conversation',
    path: '/doctor/transcript',
    canonicalHash: '#/doctor/transcript',
    title: 'Bilingual Intake Audit Trail',
    category: 'doctor',
    description: 'Verbatim Indic audio transcription, clinical translation, and speech audit.',
    badge: 'Audit Trail'
  }
};

/**
 * Resolves a URL hash or pathname to a valid ScreenType.
 * Supports legacy aliases (e.g. #/doctor, #/scanner, #/doctor-summary).
 */
export function resolveScreenFromPath(hashOrPath: string): ScreenType {
  const clean = hashOrPath.replace(/^[#/]+/, '').trim().toLowerCase();

  if (!clean || clean === 'home' || clean === 'kiosk-home') {
    return 'kiosk-home';
  }

  // Check exact matches on canonical keys
  if (clean in APP_ROUTES) {
    return clean as ScreenType;
  }

  // Check path matches
  for (const [key, config] of Object.entries(APP_ROUTES)) {
    const configPath = config.path.replace(/^\//, '').toLowerCase();
    if (clean === configPath) {
      return key as ScreenType;
    }
  }

  // Friendly aliases
  switch (clean) {
    case 'doctor':
    case 'queue':
    case 'worklist':
      return 'doctor-dashboard';
    case 'chart':
    case 'doctor/summary':
    case 'doctor-summary':
    case 'doctor/patient':
      return 'doctor-patient-summary';
    case 'transcript':
    case 'doctor/audio':
    case 'audio':
      return 'doctor-conversation';
    case 'register':
    case 'id':
    case 'identification':
      return 'patient-id';
    case 'scan':
    case 'scanner':
    case 'ocr':
      return 'document-scanner';
    case 'summary':
    case 'token':
    case 'slip':
      return 'clinical-summary';
    case 'emergency':
    case 'triage':
    case 'alert':
      return 'red-flag';
    default:
      return 'kiosk-home';
  }
}

/**
 * Returns the canonical hash string for a ScreenType.
 */
export function getHashForScreen(screen: ScreenType): string {
  return APP_ROUTES[screen]?.canonicalHash || '#/';
}

/**
 * Returns route metadata for a ScreenType.
 */
export function getRouteDetails(screen: ScreenType): RouteConfig {
  return APP_ROUTES[screen] || APP_ROUTES['kiosk-home'];
}
