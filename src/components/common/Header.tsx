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
    stopSpeaking
  } = useApp();

  const isDoctorSide = currentScreen.startsWith('doctor-');
  const lang = getLanguageDetails(currentLanguage);

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Tagline */}
          <div className="flex items-center space-x-3 cursor-pointer select-none" onClick={() => setCurrentScreen(isDoctorSide ? 'doctor-dashboard' : 'kiosk-home')}>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-teal-600/20">
              <Activity className="w-7 h-7 animate-pulse-slow" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-black tracking-tight text-slate-900 font-sans">
                  MEDI<span className="text-teal-600">KIOSK</span>
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mr-1.5 animate-ping"></span>
                  System Online
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium tracking-wide hidden sm:block">
                AI-Powered Multilingual Primary Care Assistant
              </p>
            </div>
          </div>

          {/* Quick Actions & Mode Switcher */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Multilingual Badge (Patient Mode) */}
            {!isDoctorSide && (
              <button
                onClick={() => setCurrentScreen('language')}
                className="hidden md:flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium transition-colors border border-slate-200/80"
                title="Change Language"
              >
                <Globe className="w-4 h-4 text-teal-600" />
                <span>{lang.nativeName} ({lang.name})</span>
              </button>
            )}

            {/* Voice guidance toggle */}
            <button
              onClick={() => {
                if (isSpeaking) {
                  stopSpeaking();
                }
                updateAccessibility({ voiceGuidance: !accessibility.voiceGuidance });
              }}
              className={`p-2.5 rounded-xl border transition-all ${
                accessibility.voiceGuidance 
                  ? 'bg-teal-50 border-teal-300 text-teal-700 shadow-sm' 
                  : 'bg-slate-100 border-slate-200 text-slate-400'
              }`}
              title={accessibility.voiceGuidance ? 'Voice Guidance Active' : 'Voice Guidance Muted'}
            >
              {accessibility.voiceGuidance ? (
                <Volume2 className={`w-5 h-5 ${isSpeaking ? 'text-teal-600 animate-bounce' : ''}`} />
              ) : (
                <VolumeX className="w-5 h-5" />
              )}
            </button>

            {/* Accessibility Modal Trigger */}
            <button
              onClick={() => setIsAccessibilityModalOpen(true)}
              className="flex items-center space-x-1 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium border border-slate-200 transition-colors"
              title="Accessibility Settings"
            >
              <Sliders className="w-4 h-4 text-slate-600" />
              <span className="hidden lg:inline">Accessibility</span>
            </button>

            {/* About / Product Story */}
            <button
              onClick={() => setIsAboutModalOpen(true)}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
              title="About Medikiosk & Clinical Rationale"
            >
              <Info className="w-5 h-5 text-slate-600" />
            </button>

            {/* Need Help Button */}
            {!isDoctorSide && (
              <button
                onClick={() => setIsHelpModalOpen(true)}
                className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-sm font-semibold transition-colors"
              >
                <HelpCircle className="w-4 h-4 text-amber-600" />
                <span>Need Help?</span>
              </button>
            )}

            <div className="h-6 w-px bg-slate-200 mx-1"></div>

            {/* Doctor Portal / Patient Kiosk Switcher */}
            {isDoctorSide ? (
              <button
                onClick={() => setCurrentScreen('kiosk-home')}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white text-sm font-semibold shadow-sm transition-all"
              >
                <UserCheck className="w-4 h-4" />
                <span>Switch to Patient Kiosk</span>
              </button>
            ) : (
              <button
                onClick={() => setCurrentScreen('doctor-dashboard')}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold shadow-sm hover:shadow transition-all"
              >
                <Stethoscope className="w-4 h-4 text-teal-400" />
                <span className="hidden sm:inline">Doctor Portal</span>
                <span className="sm:hidden">Doctor</span>
              </button>
            )}

          </div>
        </div>
      </div>
    </header>
  );
};
