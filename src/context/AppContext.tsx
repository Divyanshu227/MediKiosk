import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  ScreenType, 
  LanguageCode, 
  Patient, 
  ClinicalInfo, 
  Message, 
  AccessibilitySettings,
  ClinicalDepartment,
  MedicalDocument,
  AbhaProfile,
  AyushAssessment,
  FhirResourceBundle,
  PatientRegistrationForm,
  DoctorUser
} from '../types';
import { INITIAL_PATIENTS, SUPPORTED_LANGUAGES, SAMPLE_SCAN_TEMPLATES } from '../data/mockData';

interface AppContextType {
  currentScreen: ScreenType;
  setCurrentScreen: (screen: ScreenType) => void;
  navigateBack: () => void;
  screenHistory: ScreenType[];

  clinicalDepartment: ClinicalDepartment;
  setClinicalDepartment: (dept: ClinicalDepartment) => void;

  activePatient: Patient;
  setActivePatient: React.Dispatch<React.SetStateAction<Patient>>;
  updateActiveClinicalInfo: (updates: Partial<ClinicalInfo>) => void;
  updateAyushAssessment: (updates: Partial<AyushAssessment>) => void;
  addMessageToActivePatient: (msg: Omit<Message, 'id' | 'timestamp'>) => void;
  resetPatientFlow: () => void;
  
  // Real Patient Registration & Login
  registerNewPatient: (formData: PatientRegistrationForm) => Patient;
  loginPatientByMobileOrId: (query: string, otp?: string) => { success: boolean; patient?: Patient; error?: string };
  loadExistingPatient: (patientId: string) => boolean;

  // Doctor Auth & Session
  activeDoctor: DoctorUser;
  loginDoctor: (regNumber: string, pin: string) => boolean;
  logoutDoctor: () => void;
  isDoctorLoginModalOpen: boolean;
  setIsDoctorLoginModalOpen: (open: boolean) => void;

  // Medical Document Intelligence (Module B)
  documents: MedicalDocument[];
  addScannedDocument: (doc: MedicalDocument) => void;
  removeDocument: (docId: string) => void;
  isOcrScanning: boolean;
  simulateOcrScan: (templateId?: string) => Promise<void>;

  // ABDM / ABHA Profile (Module D)
  isAbhaVerified: boolean;
  verifyAbhaProfile: (profile: AbhaProfile) => void;
  generateFhirBundle: () => FhirResourceBundle;

  currentLanguage: LanguageCode;
  setCurrentLanguage: (lang: LanguageCode) => void;
  getLanguageDetails: (langCode?: LanguageCode) => typeof SUPPORTED_LANGUAGES[0];

  patientQueue: Patient[];
  selectedDoctorPatient: Patient | null;
  setSelectedDoctorPatient: (patient: Patient | null) => void;
  sendActivePatientToDoctor: () => void;
  markPatientAsReviewed: (patientId: string) => void;
  updatePatientPriority: (patientId: string, priority: 'Normal' | 'High' | 'Urgent') => void;

  accessibility: AccessibilitySettings;
  updateAccessibility: (updates: Partial<AccessibilitySettings>) => void;
  speakText: (text: string, langCode?: LanguageCode) => void;
  isSpeaking: boolean;
  stopSpeaking: () => void;

  isAccessibilityModalOpen: boolean;
  setIsAccessibilityModalOpen: (open: boolean) => void;
  isHelpModalOpen: boolean;
  setIsHelpModalOpen: (open: boolean) => void;
  isAboutModalOpen: boolean;
  setIsAboutModalOpen: (open: boolean) => void;
  isUrgentAlertOpen: boolean;
  setIsUrgentAlertOpen: (open: boolean) => void;
  urgentReason: string;
  triggerUrgentAlert: (reason: string) => void;
  
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const DEFAULT_DOCTOR: DoctorUser = {
  id: 'DOC-892',
  name: 'Dr. Alok K. Sharma',
  specialty: 'MD (Internal Medicine) • Senior Consultant',
  regNumber: 'MCI-48201',
  roomNumber: 'Room 204 (OPD Block A)',
  department: 'allopathy',
  isLoggedIn: true
};

const DEFAULT_PATIENT_INFO: Patient = {
  id: 'P-1024',
  tokenNumber: 'A-104',
  name: 'Rajesh Kumar',
  age: 54,
  gender: 'Male',
  department: 'allopathy',
  language: 'hi',
  languageName: 'Hindi (हिन्दी)',
  chiefComplaint: 'Fever and headache for 3 days',
  status: 'In Progress',
  priority: 'Normal',
  time: 'Just now',
  lastVisit: '14 May 2026',
  intakeTimestamp: 'Just now',
  doctorReviewed: false,
  mobile: '+91 98765 43210',
  bloodGroup: 'B+',
  address: 'House 42, Sector 14, Rohini, New Delhi 110085',
  abhaProfile: {
    abhaId: 'rajesh.kumar54@abdm',
    abhaNumber: '91-4829-1039-4821',
    name: 'Rajesh Kumar',
    gender: 'Male',
    dob: '14-06-1972',
    mobile: '+91 98765 43210',
    address: 'House 42, Sector 14, Rohini, New Delhi 110085',
    isLinked: true,
    kycVerified: true
  },
  clinicalInfo: {
    chiefComplaint: 'Fever and headache for 3 days',
    duration: '3 days',
    severity: 'Moderate (Temp 101.4°F)',
    temperature: '101.4°F',
    associatedSymptoms: ['Throbbing frontal headache', 'Body malaise'],
    deniedSymptoms: ['Cough', 'Chest pain', 'Breathing difficulty', 'Vomiting'],
    medicationsTaken: ['Paracetamol 650mg'],
    allergies: 'No known drug allergies reported',
    existingConditions: ['Type 2 Diabetes Mellitus', 'Hypertension'],
    notes: 'Intake recorded in Hindi via speech and touch interface.'
  },
  documents: [
    SAMPLE_SCAN_TEMPLATES[0],
    SAMPLE_SCAN_TEMPLATES[1]
  ],
  conversation: []
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreenState] = useState<ScreenType>('kiosk-home');
  const [screenHistory, setScreenHistory] = useState<ScreenType[]>(['kiosk-home']);
  const [clinicalDepartment, setClinicalDepartmentState] = useState<ClinicalDepartment>('allopathy');
  const [currentLanguage, setCurrentLanguageState] = useState<LanguageCode>('hi');
  const [patientQueue, setPatientQueue] = useState<Patient[]>(INITIAL_PATIENTS);
  const [activePatient, setActivePatient] = useState<Patient>(DEFAULT_PATIENT_INFO);
  const [selectedDoctorPatient, setSelectedDoctorPatient] = useState<Patient | null>(INITIAL_PATIENTS[0]);
  const [isOcrScanning, setIsOcrScanning] = useState(false);
  const [isAbhaVerified, setIsAbhaVerified] = useState(true);

  // Doctor Auth State
  const [activeDoctor, setActiveDoctor] = useState<DoctorUser>(DEFAULT_DOCTOR);
  const [isDoctorLoginModalOpen, setIsDoctorLoginModalOpen] = useState(false);

  const [accessibility, setAccessibility] = useState<AccessibilitySettings>({
    largeText: false,
    highContrast: false,
    voiceGuidance: true,
    reduceMotion: false
  });
  const [isSpeaking, setIsSpeaking] = useState(false);

  const [isAccessibilityModalOpen, setIsAccessibilityModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isUrgentAlertOpen, setIsUrgentAlertOpen] = useState(false);
  const [urgentReason, setUrgentReason] = useState('Severe chest pain or respiratory distress detected.');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const body = document.body;
    body.classList.toggle('high-contrast', accessibility.highContrast);
    body.classList.toggle('large-text', accessibility.largeText);
    body.classList.toggle('reduce-motion', accessibility.reduceMotion);
  }, [accessibility]);

  const setCurrentScreen = (screen: ScreenType) => {
    setScreenHistory(prev => [...prev, screen]);
    setCurrentScreenState(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setClinicalDepartment = (dept: ClinicalDepartment) => {
    setClinicalDepartmentState(dept);
    setActivePatient(prev => ({
      ...prev,
      department: dept,
      tokenNumber: dept === 'ayush' ? `AY-${Math.floor(200 + Math.random() * 100)}` : `A-${Math.floor(100 + Math.random() * 100)}`
    }));
  };

  const navigateBack = () => {
    if (screenHistory.length > 1) {
      const newHistory = [...screenHistory];
      newHistory.pop();
      const prevScreen = newHistory[newHistory.length - 1];
      setScreenHistory(newHistory);
      setCurrentScreenState(prevScreen);
    } else {
      setCurrentScreenState('kiosk-home');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setCurrentLanguage = (lang: LanguageCode) => {
    setCurrentLanguageState(lang);
    const langObj = SUPPORTED_LANGUAGES.find(l => l.code === lang);
    if (langObj) {
      setActivePatient(prev => ({
        ...prev,
        language: lang,
        languageName: `${langObj.name} (${langObj.nativeName})`
      }));
    }
  };

  const getLanguageDetails = (langCode?: LanguageCode) => {
    const code = langCode || currentLanguage;
    return SUPPORTED_LANGUAGES.find(l => l.code === code) || SUPPORTED_LANGUAGES[0];
  };

  const updateActiveClinicalInfo = (updates: Partial<ClinicalInfo>) => {
    setActivePatient(prev => ({
      ...prev,
      clinicalInfo: {
        ...prev.clinicalInfo,
        ...updates
      }
    }));
  };

  const updateAyushAssessment = (updates: Partial<AyushAssessment>) => {
    setActivePatient(prev => ({
      ...prev,
      ayushAssessment: prev.ayushAssessment ? { ...prev.ayushAssessment, ...updates } : {
        prakriti: 'Vata-Kapha',
        vikriti: 'Vata Pradhana Tridosha imbalance with Ama',
        agni: 'Manda',
        koshtha: 'Krura',
        sara: 'Madhyama',
        samhanana: 'Medium',
        satmya: 'Katu-Tikta Rasa Satmya',
        sattva: 'Madhyama (Moderate)',
        aharaShakti: 'Abhyavaharana & Jarana (High/Moderate/Low)',
        vyayamaShakti: 'Low',
        aharaVihara: {
          dietType: 'Vegetarian',
          mealTiming: 'Irregular',
          waterIntake: '1.2 Liters / day',
          sleepPattern: 'Disturbed due to pain',
          stressLevel: 'Moderate'
        },
        nidanaFactors: ['Sheetahara (Cold food/water)', 'Daytime sleep'],
        sampraptiSummary: 'Vata-Kapha vitiation localized in joint spaces.',
        ...updates
      }
    }));
  };

  const addMessageToActivePatient = (msg: Omit<Message, 'id' | 'timestamp'>) => {
    const timeStr = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(new Date());

    const newMessage: Message = {
      ...msg,
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: timeStr
    };

    setActivePatient(prev => ({
      ...prev,
      conversation: [...prev.conversation, newMessage]
    }));
  };

  const addScannedDocument = (doc: MedicalDocument) => {
    setActivePatient(prev => ({
      ...prev,
      documents: [doc, ...prev.documents]
    }));
    showToast(`Document "${doc.title}" digitized and attached.`);
  };

  const removeDocument = (docId: string) => {
    setActivePatient(prev => ({
      ...prev,
      documents: prev.documents.filter(d => d.id !== docId)
    }));
    showToast('Document removed from current intake session.');
  };

  const simulateOcrScan = async (templateId?: string) => {
    setIsOcrScanning(true);
    await new Promise(r => setTimeout(r, 1500));
    
    const chosenTemplate = SAMPLE_SCAN_TEMPLATES.find(t => t.id === templateId) || SAMPLE_SCAN_TEMPLATES[0];
    const newDoc: MedicalDocument = {
      ...chosenTemplate,
      id: `doc-${Date.now()}`,
      isUploadedByPatient: true
    };

    addScannedDocument(newDoc);
    setIsOcrScanning(false);
  };

  // Real Patient Registration
  const registerNewPatient = (formData: PatientRegistrationForm): Patient => {
    const newId = `P-${Math.floor(1000 + Math.random() * 9000)}`;
    const newToken = formData.department === 'ayush' ? `AY-${Math.floor(200 + Math.random() * 100)}` : `A-${Math.floor(100 + Math.random() * 100)}`;
    
    const generatedAbha: AbhaProfile = {
      abhaId: formData.createAbha && formData.preferredAbhaAddress ? `${formData.preferredAbhaAddress.toLowerCase().replace(/[^a-z0-9]/g, '')}@abdm` : `${formData.name.toLowerCase().replace(/\s+/g, '')}${formData.age}@abdm`,
      abhaNumber: `91-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
      name: formData.name,
      gender: formData.gender,
      dob: formData.dob || '1980-01-01',
      mobile: formData.mobile,
      address: `${formData.address}, ${formData.district}, ${formData.state}`,
      state: formData.state,
      district: formData.district,
      bloodGroup: formData.bloodGroup,
      isLinked: true,
      kycVerified: true
    };

    const newPatient: Patient = {
      id: newId,
      tokenNumber: newToken,
      name: formData.name,
      age: formData.age,
      gender: formData.gender,
      department: formData.department,
      language: currentLanguage,
      languageName: getLanguageDetails(currentLanguage).name,
      chiefComplaint: 'Awaiting intake recording',
      status: 'In Progress',
      priority: 'Normal',
      time: 'Just now',
      lastVisit: 'First Registration (Today)',
      intakeTimestamp: 'Just now',
      doctorReviewed: false,
      mobile: formData.mobile,
      bloodGroup: formData.bloodGroup,
      address: `${formData.address}, ${formData.district}, ${formData.state}`,
      abhaProfile: generatedAbha,
      clinicalInfo: {
        chiefComplaint: '',
        duration: '',
        severity: 'Normal',
        associatedSymptoms: [],
        deniedSymptoms: [],
        medicationsTaken: [],
        allergies: 'No known drug allergies reported',
        existingConditions: []
      },
      documents: [],
      conversation: []
    };

    setActivePatient(newPatient);
    setClinicalDepartmentState(formData.department);
    showToast(`Patient registered! Token #${newToken} generated.`);
    return newPatient;
  };

  // Real Patient Login by Mobile or ID
  const loginPatientByMobileOrId = (query: string, otp?: string): { success: boolean; patient?: Patient; error?: string } => {
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) return { success: false, error: 'Please enter a valid Patient ID, Mobile number, or ABHA address.' };

    const found = patientQueue.find(p => 
      p.id.toLowerCase() === cleanQuery || 
      p.tokenNumber.toLowerCase() === cleanQuery ||
      p.mobile?.replace(/\s+/g, '').includes(cleanQuery.replace(/\s+/g, '')) ||
      p.abhaProfile?.abhaId.toLowerCase() === cleanQuery ||
      p.abhaProfile?.abhaNumber.replace(/[^0-9]/g, '') === cleanQuery.replace(/[^0-9]/g, '')
    );

    if (found) {
      setActivePatient({
        ...found,
        status: 'In Progress',
        time: 'Just now'
      });
      setCurrentLanguageState(found.language);
      setClinicalDepartmentState(found.department || 'allopathy');
      showToast(`Welcome back, ${found.name}! Session authenticated.`);
      return { success: true, patient: found };
    }

    return { success: false, error: 'No patient record found matching those credentials. Please register as a new patient.' };
  };

  // Doctor Auth
  const loginDoctor = (regNumber: string, pin: string): boolean => {
    if (regNumber.trim() && (pin === '1234' || pin === 'admin' || pin.length >= 4)) {
      setActiveDoctor(prev => ({
        ...prev,
        regNumber: regNumber.toUpperCase(),
        isLoggedIn: true
      }));
      setIsDoctorLoginModalOpen(false);
      showToast(`Authenticated as ${activeDoctor.name} (${regNumber.toUpperCase()})`);
      return true;
    }
    return false;
  };

  const logoutDoctor = () => {
    setActiveDoctor(prev => ({ ...prev, isLoggedIn: false }));
    setCurrentScreen('kiosk-home');
    showToast('Doctor session logged out.');
  };

  const verifyAbhaProfile = (profile: AbhaProfile) => {
    setIsAbhaVerified(true);
    setActivePatient(prev => ({
      ...prev,
      name: profile.name,
      abhaProfile: profile
    }));
    showToast(`ABHA ID ${profile.abhaId} verified successfully via ABDM.`);
  };

  const generateFhirBundle = (): FhirResourceBundle => {
    const bundleData = {
      resourceType: 'Bundle',
      id: `fhir-bundle-${activePatient.id}`,
      type: 'collection',
      timestamp: new Date().toISOString(),
      entry: [
        {
          resource: {
            resourceType: 'Patient',
            id: activePatient.id,
            identifier: [
              { system: 'https://healthid.ndhm.gov.in', value: activePatient.abhaProfile?.abhaId || 'ABHA-NOT-LINKED' }
            ],
            name: [{ text: activePatient.name }],
            gender: activePatient.gender.toLowerCase(),
            birthDate: activePatient.abhaProfile?.dob || '1975-01-01'
          }
        },
        {
          resource: {
            resourceType: 'Encounter',
            status: 'in-progress',
            class: { code: 'AMB', display: 'Ambulatory OPD' },
            serviceType: { text: activePatient.department === 'ayush' ? 'AYUSH Kayachikitsa' : 'General Medicine' }
          }
        },
        {
          resource: {
            resourceType: 'Condition',
            clinicalStatus: { coding: [{ code: 'active' }] },
            code: { text: activePatient.clinicalInfo.chiefComplaint || 'Consultation Intake' }
          }
        },
        ...activePatient.documents.map(doc => ({
          resource: {
            resourceType: 'DocumentReference',
            id: doc.id,
            status: 'current',
            type: { text: doc.title },
            date: doc.date
          }
        }))
      ]
    };

    return {
      resourceType: 'Bundle',
      id: `fhir-bundle-${activePatient.id}`,
      type: 'collection',
      timestamp: new Date().toISOString(),
      totalEntries: bundleData.entry.length,
      fhirJson: JSON.stringify(bundleData, null, 2)
    };
  };

  const loadExistingPatient = (patientId: string): boolean => {
    const res = loginPatientByMobileOrId(patientId);
    return res.success;
  };

  const resetPatientFlow = () => {
    const newId = `P-${Math.floor(1000 + Math.random() * 9000)}`;
    const newToken = clinicalDepartment === 'ayush' ? `AY-${Math.floor(200 + Math.random() * 100)}` : `A-${Math.floor(100 + Math.random() * 100)}`;
    
    setActivePatient({
      ...DEFAULT_PATIENT_INFO,
      id: newId,
      tokenNumber: newToken,
      name: 'New Patient',
      time: 'Just now',
      status: 'In Progress',
      department: clinicalDepartment,
      documents: [],
      conversation: []
    });
    setScreenHistory(['kiosk-home']);
    setCurrentScreenState('kiosk-home');
  };

  const sendActivePatientToDoctor = () => {
    const fhir = generateFhirBundle();
    const isSevere = activePatient.clinicalInfo.severity.toLowerCase().includes('severe') || activePatient.clinicalInfo.severity.toLowerCase().includes('high');

    const completedPatient: Patient = {
      ...activePatient,
      status: 'Complete',
      priority: isSevere ? 'High' : 'Normal',
      intakeTimestamp: 'Today, Just now',
      doctorReviewed: false,
      fhirBundle: fhir
    };

    setPatientQueue(prev => {
      const filtered = prev.filter(p => p.id !== completedPatient.id);
      return [completedPatient, ...filtered];
    });

    setSelectedDoctorPatient(completedPatient);
    showToast(`Intake completed! Token #${completedPatient.tokenNumber} pushed to Doctor EMR.`);
  };

  const markPatientAsReviewed = (patientId: string) => {
    setPatientQueue(prev => prev.map(p => {
      if (p.id === patientId) {
        return { ...p, doctorReviewed: true, status: 'Complete' };
      }
      return p;
    }));
    if (selectedDoctorPatient?.id === patientId) {
      setSelectedDoctorPatient(prev => prev ? { ...prev, doctorReviewed: true, status: 'Complete' } : null);
    }
    showToast(`Patient ${patientId} marked as reviewed.`);
  };

  const updatePatientPriority = (patientId: string, priority: 'Normal' | 'High' | 'Urgent') => {
    setPatientQueue(prev => prev.map(p => {
      if (p.id === patientId) {
        return { ...p, priority };
      }
      return p;
    }));
    if (selectedDoctorPatient?.id === patientId) {
      setSelectedDoctorPatient(prev => prev ? { ...prev, priority } : null);
    }
    showToast(`Priority updated to ${priority}`);
  };

  const updateAccessibility = (updates: Partial<AccessibilitySettings>) => {
    setAccessibility(prev => ({ ...prev, ...updates }));
  };

  const speakText = (text: string, langCode?: LanguageCode) => {
    if (!accessibility.voiceGuidance) return;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const code = langCode || currentLanguage;

      const localeMap: Record<LanguageCode, string> = {
        hi: 'hi-IN',
        en: 'en-IN',
        bn: 'bn-IN',
        ta: 'ta-IN',
        te: 'te-IN',
        mr: 'mr-IN',
        gu: 'gu-IN',
        kn: 'kn-IN',
        ml: 'ml-IN',
        pa: 'pa-IN'
      };

      const langNameMap: Record<LanguageCode, string[]> = {
        hi: ['hindi', 'hi-in', 'hi_in', 'हिन्दी', 'devanagari'],
        en: ['english', 'en-in', 'en-gb', 'en-us', 'en_in'],
        bn: ['bengali', 'bangla', 'bn-in', 'bn_in', 'বাংলা'],
        ta: ['tamil', 'ta-in', 'ta_in', 'தமிழ்'],
        te: ['telugu', 'te-in', 'te_in', 'తెలుగు'],
        mr: ['marathi', 'mr-in', 'mr_in', 'मराठी'],
        gu: ['gujarati', 'gu-in', 'gu_in', 'ગુજરાતી'],
        kn: ['kannada', 'kn-in', 'kn_in', 'ಕನ್ನಡ', 'gagan', 'sapna'],
        ml: ['malayalam', 'ml-in', 'ml_in', 'മലയാളം', 'sobhana', 'midhun'],
        pa: ['punjabi', 'pa-in', 'pa_in', 'panjabi', 'ਪੰਜਾਬੀ', 'gurpal', 'raavee']
      };

      const targetLocale = localeMap[code] || 'hi-IN';
      utterance.lang = targetLocale;

      // Select matching voice from browser if available
      try {
        const voices = window.speechSynthesis.getVoices();
        if (voices && voices.length > 0) {
          const matchKeywords = langNameMap[code] || [code];
          const matchingVoice = voices.find(v => {
            const vLang = v.lang.toLowerCase().replace('_', '-');
            const vName = v.name.toLowerCase();
            return (
              vLang === targetLocale.toLowerCase() ||
              vLang.startsWith(`${code}-`) ||
              vLang === code ||
              matchKeywords.some(k => vName.includes(k.toLowerCase()) || vLang.includes(k.toLowerCase()))
            );
          });
          if (matchingVoice) {
            utterance.voice = matchingVoice;
          }
        }
      } catch {
        // Continue with default voice
      }

      utterance.rate = 0.95;
      utterance.pitch = 1.0;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => {
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const triggerUrgentAlert = (reason: string) => {
    setUrgentReason(reason);
    setIsUrgentAlertOpen(true);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        navigateBack,
        screenHistory,
        clinicalDepartment,
        setClinicalDepartment,
        activePatient,
        setActivePatient,
        updateActiveClinicalInfo,
        updateAyushAssessment,
        addMessageToActivePatient,
        resetPatientFlow,
        registerNewPatient,
        loginPatientByMobileOrId,
        loadExistingPatient,
        activeDoctor,
        loginDoctor,
        logoutDoctor,
        isDoctorLoginModalOpen,
        setIsDoctorLoginModalOpen,
        documents: activePatient.documents || [],
        addScannedDocument,
        removeDocument,
        isOcrScanning,
        simulateOcrScan,
        isAbhaVerified,
        verifyAbhaProfile,
        generateFhirBundle,
        currentLanguage,
        setCurrentLanguage,
        getLanguageDetails,
        patientQueue,
        selectedDoctorPatient,
        setSelectedDoctorPatient,
        sendActivePatientToDoctor,
        markPatientAsReviewed,
        updatePatientPriority,
        accessibility,
        updateAccessibility,
        speakText,
        isSpeaking,
        stopSpeaking,
        isAccessibilityModalOpen,
        setIsAccessibilityModalOpen,
        isHelpModalOpen,
        setIsHelpModalOpen,
        isAboutModalOpen,
        setIsAboutModalOpen,
        isUrgentAlertOpen,
        setIsUrgentAlertOpen,
        urgentReason,
        triggerUrgentAlert,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
