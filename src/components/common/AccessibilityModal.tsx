import React from 'react';
import { X, Type, Contrast, Volume2, Sparkles, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AccessibilityModal: React.FC = () => {
  const { 
    isAccessibilityModalOpen, 
    setIsAccessibilityModalOpen, 
    accessibility, 
    updateAccessibility 
  } = useApp();

  if (!isAccessibilityModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
              <Type className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Accessibility Settings</h2>
              <p className="text-xs text-slate-500">Customize for elderly, visual, or audio assistance</p>
            </div>
          </div>
          <button 
            onClick={() => setIsAccessibilityModalOpen(false)}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options List */}
        <div className="py-6 space-y-4">
          
          {/* Large Text */}
          <div 
            onClick={() => updateAccessibility({ largeText: !accessibility.largeText })}
            className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
              accessibility.largeText 
                ? 'border-teal-600 bg-teal-50/50' 
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                <Type className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900">Larger Text Mode</h3>
                <p className="text-xs text-slate-500">Increases font and button touch targets for easy reading</p>
              </div>
            </div>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${
              accessibility.largeText ? 'bg-teal-600 border-teal-600 text-white' : 'border-slate-300'
            }`}>
              {accessibility.largeText && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
          </div>

          {/* High Contrast */}
          <div 
            onClick={() => updateAccessibility({ highContrast: !accessibility.highContrast })}
            className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
              accessibility.highContrast 
                ? 'border-teal-600 bg-teal-50/50' 
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                <Contrast className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900">High Contrast Mode</h3>
                <p className="text-xs text-slate-500">Deep blacks & high contrast outlines for vision clarity</p>
              </div>
            </div>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${
              accessibility.highContrast ? 'bg-teal-600 border-teal-600 text-white' : 'border-slate-300'
            }`}>
              {accessibility.highContrast && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
          </div>

          {/* Voice Guidance */}
          <div 
            onClick={() => updateAccessibility({ voiceGuidance: !accessibility.voiceGuidance })}
            className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
              accessibility.voiceGuidance 
                ? 'border-teal-600 bg-teal-50/50' 
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                <Volume2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900">Voice Assistant / Audio Prompts</h3>
                <p className="text-xs text-slate-500">Speaks instructions and questions aloud in chosen language</p>
              </div>
            </div>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${
              accessibility.voiceGuidance ? 'bg-teal-600 border-teal-600 text-white' : 'border-slate-300'
            }`}>
              {accessibility.voiceGuidance && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
          </div>

          {/* Reduce Motion */}
          <div 
            onClick={() => updateAccessibility({ reduceMotion: !accessibility.reduceMotion })}
            className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
              accessibility.reduceMotion 
                ? 'border-teal-600 bg-teal-50/50' 
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900">Reduce Motion</h3>
                <p className="text-xs text-slate-500">Disables animations and pulsing effects for calm viewing</p>
              </div>
            </div>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${
              accessibility.reduceMotion ? 'bg-teal-600 border-teal-600 text-white' : 'border-slate-300'
            }`}>
              {accessibility.reduceMotion && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={() => setIsAccessibilityModalOpen(false)}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md transition-all"
          >
            Save & Close
          </button>
        </div>

      </div>
    </div>
  );
};
