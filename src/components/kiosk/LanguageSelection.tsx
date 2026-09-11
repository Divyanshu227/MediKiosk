import React, { useState } from 'react';
import { 
  Languages, 
  ArrowRight, 
  ArrowLeft, 
  Mic, 
  Check, 
  CheckCircle2 
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
    }, 1800);
  };

  const handleContinue = () => {
    setCurrentScreen('consent');
  };

  return (
    <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 animate-fadeIn">
      
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={navigateBack}
          className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-xs transition-colors shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Step 2 of 6 • Language Preference
        </span>
      </div>

      <div className="text-center max-w-xl mx-auto mb-6">
        <div className="inline-flex items-center space-x-2 px-3 py-0.5 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold border border-teal-200 mb-2">
          <Languages className="w-3.5 h-3.5 text-teal-600" />
          <span>Language Selection</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Select Your Preferred Language
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          You can speak or type in any of the 10 supported regional languages.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-6">
        {SUPPORTED_LANGUAGES.map((lang) => {
          const isSelected = currentLanguage === lang.code;
          return (
            <div
              key={lang.code}
              onClick={() => handleSelectLanguage(lang.code)}
              className={`p-3.5 sm:p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between items-center text-center relative ${
                isSelected 
                  ? 'border-teal-600 bg-teal-50/70 shadow-sm' 
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
              }`}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-teal-600 text-white flex items-center justify-center">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              )}

              <span className="text-2xl mb-1">{lang.flag}</span>
              <div className="text-base sm:text-lg font-bold text-slate-900">{lang.nativeName}</div>
              <div className="text-xs font-medium text-slate-500">{lang.name}</div>
              <div className="text-[11px] text-teal-700 font-medium mt-1 italic">"{lang.greeting}"</div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm mb-6 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center space-x-3 text-center md:text-left">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900">
              Selected Language: <span className="text-teal-700 font-black">{selectedLang.name} ({selectedLang.nativeName})</span>
            </div>
            <p className="text-xs text-slate-500">
              You can speak naturally in your normal accent.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {isMicTesting ? (
            <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse"></span>
              <span>Checking microphone audio...</span>
            </div>
          ) : micTestPassed ? (
            <div className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Microphone Ready</span>
            </div>
          ) : (
            <button
              onClick={handleTestMic}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors"
            >
              <Mic className="w-3.5 h-3.5 text-teal-600" />
              <span>Test Audio</span>
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          onClick={() => handleSelectLanguage('en')}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          Or continue in English
        </button>

        <button
          onClick={handleContinue}
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-base shadow-sm transition-all flex items-center justify-center space-x-2 cursor-pointer"
        >
          <span>Continue / आगे बढ़ें</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
