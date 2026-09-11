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
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Header: React.FC = () => {
  const { 
    currentScreen, 
    setCurrentScreen, 
    currentLanguage, 
    getLanguageDetails,
    setIsAccessibilityModalOpen, 
    setIsHelpModalOpen,
    setIsAboutModalOpen,
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Terminal Info */}
          <div 
            className="flex items-center space-x-3 cursor-pointer select-none" 
            onClick={() => setCurrentScreen(isDoctorSide ? 'doctor-dashboard' : 'kiosk-home')}
          >
            <div className="w-8 h-8 rounded-lg bg-teal-700 text-white flex items-center justify-center font-bold">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900">
                  MediKiosk
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mr-1.5"></span>
                  Terminal #3 (OPD)
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-normal hidden sm:block">
                Multilingual AI Clinical Intake & EHR System
              </p>
            </div>
          </div>

          {/* Quick Utility Tools */}
          <div className="flex items-center space-x-1.5 sm:space-x-2">
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
                <Volume2 className="w-4 h-4 text-teal-700" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>

            {/* Accessibility Settings */}
            <button
              onClick={() => setIsAccessibilityModalOpen(true)}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200 transition-colors"
              title="Accessibility Settings"
            >
              <Sliders className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden lg:inline">Accessibility</span>
            </button>

            {/* About / Clinical Spec */}
            <button
              onClick={() => setIsAboutModalOpen(true)}
              className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors"
              title="Project Details & Rationale"
            >
              <Info className="w-4 h-4 text-slate-600" />
            </button>

            {!isDoctorSide && (
              <button
                onClick={() => setIsHelpModalOpen(true)}
                className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-semibold transition-colors"
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
                <span>Help Desk</span>
              </button>
            )}

            <div className="h-4 w-px bg-slate-200 mx-1"></div>

            {/* Doctor Portal / Patient Kiosk Switcher */}
            {isDoctorSide ? (
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => setCurrentScreen('kiosk-home')}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold transition-colors shadow-2xs"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Kiosk Terminal</span>
                </button>

                <button
                  onClick={logoutDoctor}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 border border-slate-200 transition-colors"
                  title="Logout Doctor"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleDoctorClick}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors shadow-2xs"
              >
                <Stethoscope className="w-3.5 h-3.5 text-teal-400" />
                <span>Doctor Portal</span>
              </button>
            )}

          </div>
        </div>
      </div>
    </header>
  );
};
