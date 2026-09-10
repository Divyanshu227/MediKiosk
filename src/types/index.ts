export type ScreenType = 
  | 'kiosk-home'
  | 'patient-id'
  | 'language'
  | 'consent'
  | 'voice-intake'
  | 'ai-conversation'
  | 'review'
  | 'clinical-summary'
  | 'doctor-dashboard'
  | 'doctor-patient-summary'
  | 'doctor-conversation';

export type LanguageCode = 
  | 'hi'
  | 'en'
  | 'bn'
  | 'te'
  | 'mr'
  | 'ta'
  | 'gu'
  | 'kn'
  | 'ml'
  | 'pa';

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
  greeting: string;
  flag: string;
  samplePrompt: string;
}

export interface Message {
  id: string;
  sender: 'ai' | 'patient';
  text: string;
  originalText?: string;
  translation?: string;
  timestamp: string;
  audioUrl?: string;
  isUrgent?: boolean;
}

export interface ClinicalInfo {
  chiefComplaint: string;
  duration: string;
  severity: string;
  temperature?: string;
  associatedSymptoms: string[];
  deniedSymptoms: string[];
  medicationsTaken: string[];
  allergies: string;
  existingConditions: string[];
  notes?: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  language: LanguageCode;
  languageName: string;
  chiefComplaint: string;
  status: 'Complete' | 'In Progress' | 'Needs Review' | 'Urgent';
  priority: 'High' | 'Normal' | 'Urgent' | 'Needs Review';
  time: string;
  lastVisit?: string;
  clinicalInfo: ClinicalInfo;
  conversation: Message[];
  doctorReviewed?: boolean;
  intakeTimestamp: string;
}

export interface AccessibilitySettings {
  largeText: boolean;
  highContrast: boolean;
  voiceGuidance: boolean;
  reduceMotion: boolean;
}
