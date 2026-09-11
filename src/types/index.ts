export type ScreenType = 
  | 'kiosk-home'
  | 'patient-id'
  | 'language'
  | 'consent'
  | 'voice-intake'
  | 'ai-conversation'
  | 'document-scanner'
  | 'review'
  | 'clinical-summary'
  | 'doctor-dashboard'
  | 'doctor-patient-summary'
  | 'doctor-conversation';

export type ClinicalDepartment = 'allopathy' | 'ayush';

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

export type PrakritiType = 'Vata' | 'Pitta' | 'Kapha' | 'Vata-Pitta' | 'Pitta-Kapha' | 'Vata-Kapha' | 'Tridosha';
export type AgniType = 'Manda' | 'Tikshna' | 'Visham' | 'Sama';
export type KoshthaType = 'Krura' | 'Mridu' | 'Madhya';

export interface AyushAssessment {
  prakriti: PrakritiType;
  vikriti: string;
  agni: AgniType;
  koshtha: KoshthaType;
  sara: 'Pravara' | 'Madhyama' | 'Avara';
  samhanana: 'Compact' | 'Medium' | 'Loose';
  satmya: string;
  sattva: 'Pravara (Strong)' | 'Madhyama (Moderate)' | 'Avara (Weak)';
  aharaShakti: 'Abhyavaharana & Jarana (High/Moderate/Low)';
  vyayamaShakti: 'High' | 'Moderate' | 'Low';
  aharaVihara: {
    dietType: 'Vegetarian' | 'Non-Vegetarian' | 'Mixed';
    mealTiming: 'Regular' | 'Irregular';
    waterIntake: string;
    sleepPattern: string;
    stressLevel: 'Low' | 'Moderate' | 'High';
  };
  nidanaFactors: string[];
  sampraptiSummary: string;
}

export type DocumentType = 'prescription' | 'lab_report' | 'discharge_summary' | 'imaging';

export interface AbnormalLabValue {
  parameter: string;
  value: string;
  unit: string;
  referenceRange: string;
  status: 'high' | 'low' | 'critical';
  date: string;
}

export interface ExtractedEntity {
  type: 'diagnosis' | 'medication' | 'investigation' | 'allergy' | 'procedure';
  text: string;
  confidence: number;
  date?: string;
}

export interface MedicalDocument {
  id: string;
  title: string;
  type: DocumentType;
  date: string;
  clinicOrLab: string;
  ocrConfidence: number;
  ocrText: string;
  entities: ExtractedEntity[];
  abnormalValues: AbnormalLabValue[];
  fileUrl?: string;
  isUploadedByPatient?: boolean;
}

export interface AbhaProfile {
  abhaId: string;
  abhaNumber: string;
  name: string;
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  mobile: string;
  address: string;
  isLinked: boolean;
  kycVerified: boolean;
}

export interface FhirResourceBundle {
  resourceType: 'Bundle';
  id: string;
  type: 'collection';
  timestamp: string;
  totalEntries: number;
  fhirJson: string;
}

export interface Patient {
  id: string;
  tokenNumber: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  department: ClinicalDepartment;
  language: LanguageCode;
  languageName: string;
  chiefComplaint: string;
  status: 'Complete' | 'In Progress' | 'Needs Review' | 'Urgent';
  priority: 'High' | 'Normal' | 'Urgent' | 'Needs Review';
  time: string;
  lastVisit?: string;
  abhaProfile?: AbhaProfile;
  clinicalInfo: ClinicalInfo;
  ayushAssessment?: AyushAssessment;
  documents: MedicalDocument[];
  fhirBundle?: FhirResourceBundle;
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
