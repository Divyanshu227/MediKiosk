import React, { useEffect } from 'react';
import { 
  Mic, 
  Hand, 
  ArrowRight, 
  Sliders, 
  Volume2, 
  VolumeX, 
  Check, 
  ShieldCheck, 
  Activity,
  Globe
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SUPPORTED_LANGUAGES } from '../../data/mockData';
import { LanguageCode } from '../../types';

export const KioskHome: React.FC = () => {
  const { 
    currentLanguage, 
    setCurrentLanguage, 
    getLanguageDetails,
    inputModality,
    setInputModality,
    accessibility,
    updateAccessibility,
    setCurrentScreen,
    resetPatientFlow,
    speakText,
    isSpeaking,
    stopSpeaking
  } = useApp();

  const selectedLang = getLanguageDetails(currentLanguage);

  useEffect(() => {
    const greetings: Record<string, string> = {
      hi: 'मेडीकियोस्क में आपका स्वागत है। कृपया अपनी भाषा और तरीका चुनें।',
      en: 'Welcome to MediKiosk. Please choose your language and preferred mode.',
      bn: 'মেডিকিয়স্কে আপনাকে স্বাগতম। অনুগ্রহ করে আপনার ভাষা নির্বাচন করুন।',
      te: 'మెడికియోస్క్‌కు స్వాగతం. దయచేసి మీ భాషను ఎంచుకోండి.',
      mr: 'मेडीकियोस्कमध्ये आपले स्वागत आहे. कृपया तुमची भाषा निवडा.',
      ta: 'மெடிகியோஸ்க்கிற்கு வருக. உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்.',
      gu: 'મેડીકિયોસ્કમાં આપનું સ્વાગત છે. કૃપા કરીને તમારી ભાષા પસંદ કરો.',
      kn: 'ಮೆಡಿಕಿಯೋಸ್ಕ್‌ಗೆ ಸುಸ್ವಾಗತ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.',
      ml: 'മെഡികിയോസ്കിലേക്ക് സ്വാഗതം. നിങ്ങളുടെ ഭാഷ തിരഞ്ഞെടുക്കുക.',
      pa: 'ਮੈਡੀਕਿਓਸਕ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੀ ਬੋਲੀ ਚੁਣੋ।'
    };
    const greeting = greetings[currentLanguage] || greetings.en;
    if (accessibility.voiceGuidance) {
      speakText(greeting, currentLanguage);
    }
  }, [currentLanguage]);

  const handleProceed = (mode?: 'voice' | 'touch') => {
    if (mode) {
      setInputModality(mode);
    }
    resetPatientFlow();
    setCurrentScreen('patient-id');
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center py-4 sm:py-8 px-3 sm:px-6 max-w-4xl mx-auto w-full animate-fadeIn">
      
      {/* Main Kiosk Card */}
      <div className="w-full bg-white border border-slate-200 rounded-2xl shadow-sm p-4 sm:p-8 mb-4 sm:mb-6">
        
        {/* Header Branding */}
        <div className="text-center pb-5 sm:pb-6 border-b border-slate-100">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold mb-2 sm:mb-3">
            <Activity className="w-3.5 h-3.5 text-teal-600 animate-pulse" />
            <span>AI-Assisted Self-Service OPD Terminal</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            MediKiosk
          </h1>
          <p className="mt-1.5 sm:mt-2 text-sm sm:text-lg text-slate-600 font-medium max-w-xl mx-auto">
            “Your medical history, ready before your consultation.”
          </p>
          <p className="text-[11px] sm:text-xs text-slate-400 mt-1">
            परामर्श से पहले आपका मेडिकल इतिहास तैयार करें • 10 Indian Regional Languages
          </p>
        </div>

        {/* Step 1: Select Language */}
        <div className="py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-3">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-1.5">
              <Globe className="w-4 h-4 text-teal-700" />
              <span>1. Select Language / अपनी भाषा चुनें</span>
            </label>
            <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-100 w-fit">
              Selected: {selectedLang.nativeName} ({selectedLang.name})
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-2.5">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = currentLanguage === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => setCurrentLanguage(lang.code as LanguageCode)}
                  className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                    isSelected
                      ? 'border-teal-700 bg-teal-50/80 shadow-xs ring-1 ring-teal-700'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-lg">{lang.flag}</span>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-teal-700 text-white flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 leading-tight">
                      {lang.nativeName}
                    </div>
                    <div className="text-[11px] text-slate-500 font-normal">
                      {lang.name}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Choose Mode & Start */}
        <div className="py-4 border-t border-slate-100">
          <div className="mb-3">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              2. Choose How to Answer / तरीका चुनें
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {/* Speak Mode */}
            <button
              onClick={() => handleProceed('voice')}
              className={`p-4 sm:p-5 rounded-xl text-left transition-all border shadow-sm flex flex-col justify-between group cursor-pointer ${
                inputModality === 'voice'
                  ? 'bg-teal-700 hover:bg-teal-800 text-white border-teal-800'
                  : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center ${
                  inputModality === 'voice' ? 'bg-white/15 text-white' : 'bg-teal-50 text-teal-700'
                }`}>
                  <Mic className="w-5 h-5" />
                </div>
                <ArrowRight className={`w-5 h-5 group-hover:translate-x-1 transition-transform ${
                  inputModality === 'voice' ? 'text-teal-200' : 'text-slate-400'
                }`} />
              </div>
              <div>
                <div className="text-base sm:text-lg font-bold">
                  Speak in Native Language
                </div>
                <p className={`text-xs mt-0.5 font-medium ${
                  inputModality === 'voice' ? 'text-teal-100' : 'text-slate-500'
                }`}>
                  बोलकर बताएं • Voice Intake ({selectedLang.name})
                </p>
              </div>
            </button>

            {/* Touch Mode */}
            <button
              onClick={() => handleProceed('touch')}
              className={`p-4 sm:p-5 rounded-xl text-left transition-all border shadow-sm flex flex-col justify-between group cursor-pointer ${
                inputModality === 'touch'
                  ? 'bg-teal-700 hover:bg-teal-800 text-white border-teal-800'
                  : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center ${
                  inputModality === 'touch' ? 'bg-white/15 text-white' : 'bg-slate-100 text-slate-700'
                }`}>
                  <Hand className="w-5 h-5" />
                </div>
                <ArrowRight className={`w-5 h-5 group-hover:translate-x-1 transition-transform ${
                  inputModality === 'touch' ? 'text-teal-200' : 'text-slate-400'
                }`} />
              </div>
              <div>
                <div className="text-base sm:text-lg font-bold">
                  Use Touch Screen
                </div>
                <p className={`text-xs mt-0.5 font-medium ${
                  inputModality === 'touch' ? 'text-teal-100' : 'text-slate-500'
                }`}>
                  स्क्रीन छूकर चुनें • Guided Touch Interface
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Quick Accessibility Bar */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl">
          <div className="flex items-center space-x-1.5 font-semibold text-slate-700 text-[11px]">
            <Sliders className="w-3.5 h-3.5 text-slate-500" />
            <span>Accessibility:</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => updateAccessibility({ largeText: !accessibility.largeText })}
              className={`px-2 py-0.5 rounded text-[11px] font-medium border transition-colors ${
                accessibility.largeText
                  ? 'bg-teal-700 text-white border-teal-700'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              Large Text {accessibility.largeText ? '✓' : ''}
            </button>

            <button
              onClick={() => updateAccessibility({ highContrast: !accessibility.highContrast })}
              className={`px-2 py-0.5 rounded text-[11px] font-medium border transition-colors ${
                accessibility.highContrast
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              High Contrast {accessibility.highContrast ? '✓' : ''}
            </button>

            <button
              onClick={() => {
                if (isSpeaking) stopSpeaking();
                updateAccessibility({ voiceGuidance: !accessibility.voiceGuidance });
              }}
              className={`px-2 py-0.5 rounded text-[11px] font-medium border transition-colors flex items-center space-x-1 ${
                accessibility.voiceGuidance
                  ? 'bg-teal-700 text-white border-teal-700'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {accessibility.voiceGuidance ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
              <span>Voice Readout {accessibility.voiceGuidance ? 'ON' : 'OFF'}</span>
            </button>
          </div>
        </div>

      </div>

      {/* Safety & Non-Diagnostic Footer Disclaimer */}
      <div className="flex items-center space-x-1.5 text-[11px] text-slate-500 text-center">
        <ShieldCheck className="w-3.5 h-3.5 text-teal-700 shrink-0" />
        <p>
          Non-diagnostic history intake • Doctor validates and makes all clinical decisions.
        </p>
      </div>

    </div>
  );
};
