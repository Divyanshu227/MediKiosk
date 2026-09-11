import React from 'react';
import { 
  Activity, 
  Globe, 
  HelpCircle, 
  Sliders, 
  Stethoscope, 
  UserCheck, 
  Volume2, 
  VolumeX, 
  Info,
  LogOut,
  ShieldCheck,
  Layers,
  ArrowLeft,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Header: React.FC = () => {
  const { 
    currentScreen, 
    setCurrentScreen, 
    navigateBack,
    resetAllSessionData,
    currentLanguage, 
    getLanguageDetails,
    setIsAccessibilityModalOpen, 
    setIsHelpModalOpen,
    setIsAboutModalOpen,
    setIsArchitectureModalOpen,
    accessibility,
    updateAccessibility,
    isSpeaking,
    stopSpeaking,
    activeDoctor,
    setIsDoctorLoginModalOpen,
    logoutDoctor
  } = useApp();

  const isDoctorSide = currentScreen.startsWith('doctor-');
  const lang = getLanguageDetails(currentLanguage);

  const handleDoctorClick = () => {
    if (activeDoctor.isLoggedIn) {
      setCurrentScreen('doctor-dashboard');
    } else {
      setIsDoctorLoginModalOpen(true);
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          
          {/* Logo & Terminal Info */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            <div 
              className="flex items-center space-x-2 sm:space-x-3 cursor-pointer select-none shrink-0" 
              onClick={() => setCurrentScreen(isDoctorSide ? 'doctor-dashboard' : 'kiosk-home')}
            >
              <div className="w-7 h-7 sm:w-8 h-8 rounded-lg bg-teal-700 text-white flex items-center justify-center font-bold shrink-0">
                <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5 sm:space-x-2">
                  <span className="text-sm sm:text-lg font-bold tracking-tight text-slate-900">
                    MediKiosk
                  </span>
                  <span className="inline-flex items-center px-1 sm:px-1.5 py-0.2 sm:py-0.5 rounded text-[9px] sm:text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mr-1 sm:mr-1.5"></span>
                    <span className="hidden xs:inline">Terminal </span>#3
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-slate-500 font-normal hidden md:block">
                  Pre-Consultation Intake Terminal • 10 Indian Languages
                </p>
              </div>
            </div>

            {/* Universal Back Navigation Button */}
            {currentScreen !== 'kiosk-home' && currentScreen !== 'doctor-dashboard' && (
              <button
                onClick={navigateBack}
                className="inline-flex items-center space-x-1 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all border border-slate-200 shadow-2xs cursor-pointer ml-1 sm:ml-2"
                title="Go back to previous screen (Alt + Left Arrow)"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-slate-700" />
                <span className="hidden sm:inline">Back</span>
              </button>
            )}
          </div>

          {/* Quick Utility Tools */}
          <div className="flex items-center space-x-1 sm:space-x-1.5">
            {!isDoctorSide && (
              <button
                onClick={() => setCurrentScreen('language')}
                className="hidden md:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors border border-slate-200"
                title="Change Language"
              >
                <Globe className="w-3.5 h-3.5 text-teal-700" />
                <span>{lang.nativeName} ({lang.name})</span>
              </button>
            )}

            {/* Voice Readout Toggle */}
            <button
              onClick={() => {
                if (isSpeaking) {
                  stopSpeaking();
                }
                updateAccessibility({ voiceGuidance: !accessibility.voiceGuidance });
              }}
              className={`p-1.5 rounded-lg border transition-colors ${
                accessibility.voiceGuidance 
                  ? 'bg-teal-50 border-teal-300 text-teal-800' 
                  : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}
              title={accessibility.voiceGuidance ? 'Voice Guidance On' : 'Voice Guidance Off'}
            >
              {accessibility.voiceGuidance ? (
                <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-700" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              )}
            </button>

            {/* Accessibility Settings */}
            <button
              onClick={() => setIsAccessibilityModalOpen(true)}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200 transition-colors flex items-center space-x-1"
              title="Accessibility Settings"
            >
              <Sliders className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden xl:inline">Accessibility</span>
            </button>

            {/* About / Clinical Spec */}
            <button
              onClick={() => setIsAboutModalOpen(true)}
              className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors"
              title="Project Details & Rationale"
            >
              <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600" />
            </button>

            {/* 5-Layer System Architecture Modal for Judges */}
            <button
              onClick={() => setIsArchitectureModalOpen(true)}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-900 text-xs font-semibold border border-teal-200 transition-colors shadow-2xs flex items-center space-x-1"
              title="5-Layer System Architecture (SIH26047)"
            >
              <Layers className="w-3.5 h-3.5 text-teal-700" />
              <span className="hidden sm:inline">Arch</span>
            </button>

            {/* Quick Session Reset */}
            <button
              onClick={() => {
                if (window.confirm('Reset all demo intakes, queues and forms to factory defaults?')) {
                  resetAllSessionData();
                }
              }}
              className="p-1.5 rounded-lg bg-slate-50 hover:bg-red-50 text-slate-500 hover:text-red-700 border border-slate-200 transition-colors"
              title="Reset Demo Session Data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {!isDoctorSide && (
              <button
                onClick={() => setIsHelpModalOpen(true)}
                className="hidden sm:flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-semibold transition-colors"
                title="Help Desk"
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
                <span className="hidden lg:inline">Help Desk</span>
              </button>
            )}

            <div className="h-4 w-px bg-slate-200 mx-0.5 sm:mx-1"></div>

            {/* Doctor Portal / Patient Kiosk Switcher */}
            {isDoctorSide ? (
              <div className="flex items-center space-x-1 sm:space-x-1.5">
                <button
                  onClick={() => setCurrentScreen('kiosk-home')}
                  className="flex items-center space-x-1 sm:space-x-1.5 px-2 sm:px-3 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold transition-colors shadow-2xs"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">Kiosk</span>
                </button>

                <button
                  onClick={logoutDoctor}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 border border-slate-200 transition-colors"
                  title="Logout Doctor"
                >
                  <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleDoctorClick}
                className="flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors shadow-2xs"
              >
                <Stethoscope className="w-3.5 h-3.5 text-teal-400" />
                <span className="text-[11px] sm:text-xs">Doctor<span className="hidden xs:inline"> Portal</span></span>
              </button>
            )}

          </div>
        </div>
      </div>
    </header>
  );
};
