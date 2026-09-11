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
      
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={navigateBack}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-xs transition-colors shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Step 2 of 6 • Language Preference
        </span>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7 shadow-sm mb-4">
        <div className="mb-5">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded bg-teal-50 text-teal-800 text-xs font-medium border border-teal-200 mb-2">
            <Languages className="w-3.5 h-3.5 text-teal-700" />
            <span>Language Selection / भाषा चयन</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Select Your Preferred Language
          </h1>
          <p className="mt-0.5 text-xs sm:text-sm text-slate-600">
            Choose your language for voice guidance and symptom recording.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 mb-5">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = currentLanguage === lang.code;
            return (
              <div
                key={lang.code}
                onClick={() => handleSelectLanguage(lang.code)}
                className={`p-3 rounded-lg border-2 cursor-pointer transition-colors flex flex-col justify-between items-center text-center relative ${
                  isSelected 
                    ? 'border-teal-700 bg-teal-50/50 shadow-sm' 
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full bg-teal-700 text-white flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                )}

                <span className="text-xl mb-1">{lang.flag}</span>
                <div className="text-sm font-bold text-slate-900">{lang.nativeName}</div>
                <div className="text-[11px] font-medium text-slate-500">{lang.name}</div>
                <div className="text-[10px] text-teal-800 font-medium mt-1">"{lang.greeting}"</div>
              </div>
            );
          })}
        </div>

        <div className="bg-slate-50 rounded-lg border border-slate-200 p-3.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center font-bold shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">
                Selected Language: <span className="text-teal-800">{selectedLang.name} ({selectedLang.nativeName})</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Questions will be read aloud and transcribed in this language.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            {isMicTesting ? (
              <div className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-md bg-teal-50 border border-teal-200 text-teal-800 text-xs font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-pulse"></span>
                <span>Testing audio...</span>
              </div>
            ) : micTestPassed ? (
              <div className="flex items-center space-x-1 px-2.5 py-1.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Audio OK</span>
              </div>
            ) : (
              <button
                onClick={handleTestMic}
                className="flex items-center space-x-1 px-2.5 py-1.5 rounded-md bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200 transition-colors"
              >
                <Mic className="w-3.5 h-3.5 text-teal-700" />
                <span>Test Audio</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          onClick={() => handleSelectLanguage('en')}
          className="text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors"
        >
          Or continue in English
        </button>

        <button
          onClick={handleContinue}
          className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-medium text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
        >
          <span>Continue / आगे बढ़ें</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
