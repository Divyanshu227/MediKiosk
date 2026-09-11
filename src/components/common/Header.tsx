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
  Info 
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
    stopSpeaking
  } = useApp();

  const isDoctorSide = currentScreen.startsWith('doctor-');
  const lang = getLanguageDetails(currentLanguage);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          <div 
            className="flex items-center space-x-3 cursor-pointer select-none" 
            onClick={() => setCurrentScreen(isDoctorSide ? 'doctor-dashboard' : 'kiosk-home')}
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-sm">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 font-sans">
                  MEDI<span className="text-teal-600">KIOSK</span>
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
                  Online
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium tracking-wide hidden sm:block">
                Multilingual Patient Intake Kiosk
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            {!isDoctorSide && (
              <button
                onClick={() => setCurrentScreen('language')}
                className="hidden md:flex items-center space-x-2 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors border border-slate-200"
                title="Change Language"
              >
                <Globe className="w-4 h-4 text-teal-600" />
                <span>{lang.nativeName} ({lang.name})</span>
              </button>
            )}

            <button
              onClick={() => {
                if (isSpeaking) {
                  stopSpeaking();
                }
                updateAccessibility({ voiceGuidance: !accessibility.voiceGuidance });
              }}
              className={`p-2 rounded-lg border transition-all ${
                accessibility.voiceGuidance 
                  ? 'bg-teal-50 border-teal-300 text-teal-700' 
                  : 'bg-slate-100 border-slate-200 text-slate-400'
              }`}
              title={accessibility.voiceGuidance ? 'Voice Guidance On' : 'Voice Guidance Off'}
            >
              {accessibility.voiceGuidance ? (
                <Volume2 className="w-4 h-4 text-teal-600" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={() => setIsAccessibilityModalOpen(true)}
              className="flex items-center space-x-1 px-2.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium border border-slate-200 transition-colors"
              title="Accessibility Settings"
            >
              <Sliders className="w-4 h-4 text-slate-600" />
              <span className="hidden lg:inline">Accessibility</span>
            </button>

            <button
              onClick={() => setIsAboutModalOpen(true)}
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
              title="About Project & Clinical Rationale"
            >
              <Info className="w-4 h-4 text-slate-600" />
            </button>

            {!isDoctorSide && (
              <button
                onClick={() => setIsHelpModalOpen(true)}
                className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-semibold transition-colors"
              >
                <HelpCircle className="w-4 h-4 text-amber-600" />
                <span>Help</span>
              </button>
            )}

            <div className="h-5 w-px bg-slate-200 mx-1"></div>

            {isDoctorSide ? (
              <button
                onClick={() => setCurrentScreen('kiosk-home')}
                className="flex items-center space-x-2 px-3.5 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-sm transition-all"
              >
                <UserCheck className="w-4 h-4" />
                <span>Patient Kiosk</span>
              </button>
            ) : (
              <button
                onClick={() => setCurrentScreen('doctor-dashboard')}
                className="flex items-center space-x-2 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition-all"
              >
                <Stethoscope className="w-4 h-4 text-teal-400" />
                <span>Doctor Portal</span>
              </button>
            )}

          </div>
        </div>
      </div>
    </header>
  );
};
