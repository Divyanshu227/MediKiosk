import React, { useState } from 'react';
import { 
  Languages, 
  ArrowRight, 
  ArrowLeft, 
  Mic, 
  Check, 
  Volume2, 
  CheckCircle2,
  Sparkles,
  Activity
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SUPPORTED_LANGUAGES } from '../../data/mockData';
import { LanguageCode } from '../../types';

export const LanguageSelection: React.FC = () => {
  const { 
    currentLanguage, 
    setCurrentLanguage, 
    setCurrentScreen, 
    navigateBack, 
    getLanguageDetails,
    speakText 
  } = useApp();

  const [isMicTesting, setIsMicTesting] = useState(false);
  const [micTestPassed, setMicTestPassed] = useState(false);

  const selectedLang = getLanguageDetails(currentLanguage);

  const handleSelectLanguage = (code: LanguageCode) => {
    setCurrentLanguage(code);
    const langObj = SUPPORTED_LANGUAGES.find(l => l.code === code);
    if (langObj) {
      speakText(`${langObj.greeting}!`, code);
    }
  };

  const handleTestMic = () => {
    setIsMicTesting(true);
    setMicTestPassed(false);
    setTimeout(() => {
      setIsMicTesting(false);
      setMicTestPassed(true);
    }, 2000);
  };

  const handleContinue = () => {
    setCurrentScreen('consent');
  };

  return (
    <div className="flex-1 flex flex-col justify-center max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 animate-fadeIn">
      
      {/* Top Navigation */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={navigateBack}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-sm transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
          Step 2 of 6 • Language Preference
        </span>
      </div>

      {/* Heading */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider border border-teal-200 mb-3">
          <Languages className="w-4 h-4 text-teal-600" />
          <span>Multilingual Voice AI</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Which language would you like to speak?
        </h1>
        <p className="mt-2 text-base text-slate-600">
          You can describe your symptoms naturally in your preferred Indian language.
        </p>
      </div>

      {/* Language Grid (10 languages) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 mb-8">
        {SUPPORTED_LANGUAGES.map((lang) => {
          const isSelected = currentLanguage === lang.code;
          return (
            <div
              key={lang.code}
              onClick={() => handleSelectLanguage(lang.code)}
              className={`p-4 sm:p-5 rounded-3xl border-2 cursor-pointer transition-all flex flex-col justify-between items-center text-center relative ${
                isSelected 
                  ? 'border-teal-600 bg-teal-50/70 shadow-lg shadow-teal-600/15 ring-2 ring-teal-500/20 scale-[1.02]' 
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
              }`}
            >
              {isSelected && (
                <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              )}

              <span className="text-2xl mb-2">{lang.flag}</span>
              <div className="text-lg sm:text-xl font-black text-slate-900 mb-0.5">{lang.nativeName}</div>
              <div className="text-xs font-bold text-slate-500">{lang.name}</div>
              <div className="text-[11px] text-teal-700 font-medium mt-2 italic">"{lang.greeting}"</div>
            </div>
          );
        })}
      </div>

      {/* Selected Language Feedback & Mic Test Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: Confirmation prompt */}
        <div className="flex items-center space-x-3.5 text-center md:text-left">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold flex-shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="text-base font-bold text-slate-900">
              Great! We'll continue in <span className="text-teal-600 font-black">{selectedLang.name} ({selectedLang.nativeName})</span>.
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              You can speak freely in your normal accent and dialect.
            </p>
          </div>
        </div>

        {/* Right: Microphone Audio Check */}
        <div className="flex items-center space-x-3">
          {isMicTesting ? (
            <div className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold animate-pulse">
              <div className="flex items-center space-x-1">
                <span className="w-1.5 h-4 bg-teal-600 rounded-full animate-soundwave-1"></span>
                <span className="w-1.5 h-6 bg-teal-600 rounded-full animate-soundwave-2"></span>
                <span className="w-1.5 h-3 bg-teal-600 rounded-full animate-soundwave-3"></span>
                <span className="w-1.5 h-5 bg-teal-600 rounded-full animate-soundwave-4"></span>
              </div>
              <span>Testing Audio Level...</span>
            </div>
          ) : micTestPassed ? (
            <div className="flex items-center space-x-1.5 px-4 py-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Microphone Ready (100% OK)</span>
            </div>
          ) : (
            <button
              onClick={handleTestMic}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 transition-colors"
            >
              <Mic className="w-4 h-4 text-teal-600" />
              <span>Test Microphone</span>
            </button>
          )}
        </div>

      </div>

      {/* Continue Action */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={() => handleSelectLanguage('en')}
          className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          Or continue in English
        </button>

        <button
          onClick={handleContinue}
          className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-lg shadow-lg shadow-teal-600/20 transition-all flex items-center justify-center space-x-3"
        >
          <span>Continue / आगे बढ़ें</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
};
