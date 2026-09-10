import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  ScreenType, 
  LanguageCode, 
  Patient, 
  ClinicalInfo, 
  Message, 
  AccessibilitySettings 
} from '../types';
import { INITIAL_PATIENTS, SUPPORTED_LANGUAGES } from '../data/mockData';

interface AppContextType {
  // Navigation
  currentScreen: ScreenType;
  setCurrentScreen: (screen: ScreenType) => void;
  navigateBack: () => void;
  screenHistory: ScreenType[];

  // Patient Intake State
  activePatient: Patient;
  setActivePatient: React.Dispatch<React.SetStateAction<Patient>>;
  updateActiveClinicalInfo: (updates: Partial<ClinicalInfo>) => void;
  addMessageToActivePatient: (msg: Omit<Message, 'id' | 'timestamp'>) => void;
  resetPatientFlow: () => void;
  loadExistingPatient: (patientId: string) => boolean;

  // Language
  currentLanguage: LanguageCode;
  setCurrentLanguage: (lang: LanguageCode) => void;
  getLanguageDetails: (langCode?: LanguageCode) => typeof SUPPORTED_LANGUAGES[0];

  // Doctor Dashboard State
  patientQueue: Patient[];
  selectedDoctorPatient: Patient | null;
  setSelectedDoctorPatient: (patient: Patient | null) => void;
  sendActivePatientToDoctor: () => void;
  markPatientAsReviewed: (patientId: string) => void;
  updatePatientPriority: (patientId: string, priority: 'Normal' | 'High' | 'Urgent') => void;

  // Accessibility
  accessibility: AccessibilitySettings;
  updateAccessibility: (updates: Partial<AccessibilitySettings>) => void;
  speakText: (text: string, langCode?: LanguageCode) => void;
  isSpeaking: boolean;
  stopSpeaking: () => void;

  // Modals & Safety
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
  
  // Toast notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const DEFAULT_PATIENT_INFO: Patient = {
  id: 'P-1024',
  name: 'Rajesh Kumar',
  age: 54,
  gender: 'Male',
  language: 'hi',
  languageName: 'Hindi (हिन्दी)',
  chiefComplaint: 'Fever and headache',
  status: 'In Progress',
  priority: 'Normal',
  time: 'Just now',
  lastVisit: '18 Aug 2026',
  intakeTimestamp: 'Just now',
  doctorReviewed: false,
  clinicalInfo: {
    chiefComplaint: 'Fever and headache',
    duration: '3 days',
    severity: 'Moderate',
    temperature: '101.0°F',
    associatedSymptoms: ['Headache (frontal)'],
    deniedSymptoms: ['Cough', 'Chest pain', 'Breathing difficulty', 'Vomiting'],
    medicationsTaken: ['Paracetamol 650mg'],
    allergies: 'Not reported / None known',
    existingConditions: ['Hypertension'],
    notes: 'Intake conducted in Hindi via speech interface.'
  },
  conversation: []
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreenState] = useState<ScreenType>('kiosk-home');
  const [screenHistory, setScreenHistory] = useState<ScreenType[]>(['kiosk-home']);
  const [currentLanguage, setCurrentLanguageState] = useState<LanguageCode>('hi');
  const [patientQueue, setPatientQueue] = useState<Patient[]>(INITIAL_PATIENTS);
  const [activePatient, setActivePatient] = useState<Patient>(DEFAULT_PATIENT_INFO);
  const [selectedDoctorPatient, setSelectedDoctorPatient] = useState<Patient | null>(INITIAL_PATIENTS[0]);

  // Accessibility
  const [accessibility, setAccessibility] = useState<AccessibilitySettings>({
    largeText: false,
    highContrast: false,
    voiceGuidance: true,
    reduceMotion: false
  });
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Modals
  const [isAccessibilityModalOpen, setIsAccessibilityModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isUrgentAlertOpen, setIsUrgentAlertOpen] = useState(false);
  const [urgentReason, setUrgentReason] = useState('Severe chest pain or respiratory distress detected.');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Apply accessibility classes to body
  useEffect(() => {
    const body = document.body;
    if (accessibility.highContrast) {
      body.classList.add('high-contrast');
    } else {
      body.classList.remove('high-contrast');
    }

    if (accessibility.largeText) {
      body.classList.add('large-text');
    } else {
      body.classList.remove('large-text');
    }

    if (accessibility.reduceMotion) {
      body.classList.add('reduce-motion');
    } else {
      body.classList.remove('reduce-motion');
    }
  }, [accessibility]);

  const setCurrentScreen = (screen: ScreenType) => {
    setScreenHistory(prev => [...prev, screen]);
    setCurrentScreenState(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateBack = () => {
    if (screenHistory.length > 1) {
      const newHistory = [...screenHistory];
      newHistory.pop(); // remove current
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

  const loadExistingPatient = (patientId: string): boolean => {
    const found = patientQueue.find(p => p.id.toUpperCase() === patientId.trim().toUpperCase());
    if (found) {
      setActivePatient({
        ...found,
        status: 'In Progress',
        time: 'Just now'
      });
      setCurrentLanguageState(found.language);
      return true;
    }
    return false;
  };

  const resetPatientFlow = () => {
    const newId = `P-${Math.floor(1000 + Math.random() * 9000)}`;
    setActivePatient({
      ...DEFAULT_PATIENT_INFO,
      id: newId,
      name: 'New Patient',
      time: 'Just now',
      status: 'In Progress',
      conversation: []
    });
    setScreenHistory(['kiosk-home']);
    setCurrentScreenState('kiosk-home');
  };

  const sendActivePatientToDoctor = () => {
    const completedPatient: Patient = {
      ...activePatient,
      status: 'Complete',
      priority: activePatient.clinicalInfo.severity.toLowerCase().includes('severe') ? 'High' : 'Normal',
      intakeTimestamp: 'Today, Just now',
      doctorReviewed: false
    };

    setPatientQueue(prev => {
      const filtered = prev.filter(p => p.id !== completedPatient.id);
      return [completedPatient, ...filtered];
    });

    setSelectedDoctorPatient(completedPatient);
    showToast('Intake data sent successfully to Doctor Dashboard!');
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
    showToast(`Patient ${patientId} marked as Reviewed.`);
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
      if (code === 'hi') utterance.lang = 'hi-IN';
      else if (code === 'en') utterance.lang = 'en-US';
      else if (code === 'bn') utterance.lang = 'bn-IN';
      else if (code === 'ta') utterance.lang = 'ta-IN';
      else if (code === 'te') utterance.lang = 'te-IN';
      else if (code === 'mr') utterance.lang = 'mr-IN';
      else if (code === 'gu') utterance.lang = 'gu-IN';
      else utterance.lang = 'en-IN';

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
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
        activePatient,
        setActivePatient,
        updateActiveClinicalInfo,
        addMessageToActivePatient,
        resetPatientFlow,
        loadExistingPatient,
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
