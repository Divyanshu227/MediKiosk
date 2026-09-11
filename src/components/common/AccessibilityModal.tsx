import React from 'react';
import { X, Type, Contrast, Volume2, Sliders, Check } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-xl border border-slate-200 relative">
        
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
              <Type className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Accessibility Settings</h2>
              <p className="text-xs text-slate-500">Visual, text, and voice adjustments</p>
            </div>
          </div>
          <button 
            onClick={() => setIsAccessibilityModalOpen(false)}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-5 space-y-3">
          
          <div 
            onClick={() => updateAccessibility({ largeText: !accessibility.largeText })}
            className={`flex items-center justify-between p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
              accessibility.largeText 
                ? 'border-teal-600 bg-teal-50/40' 
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                <Type className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Larger Text Mode</h3>
                <p className="text-xs text-slate-500">Increases font sizes and button targets</p>
              </div>
            </div>
            <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
              accessibility.largeText ? 'bg-teal-600 border-teal-600 text-white' : 'border-slate-300'
            }`}>
              {accessibility.largeText && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
          </div>

          <div 
            onClick={() => updateAccessibility({ highContrast: !accessibility.highContrast })}
            className={`flex items-center justify-between p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
              accessibility.highContrast 
                ? 'border-teal-600 bg-teal-50/40' 
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                <Contrast className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">High Contrast Mode</h3>
                <p className="text-xs text-slate-500">High contrast styling for improved readability</p>
              </div>
            </div>
            <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
              accessibility.highContrast ? 'bg-teal-600 border-teal-600 text-white' : 'border-slate-300'
            }`}>
              {accessibility.highContrast && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
          </div>

          <div 
            onClick={() => updateAccessibility({ voiceGuidance: !accessibility.voiceGuidance })}
            className={`flex items-center justify-between p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
              accessibility.voiceGuidance 
                ? 'border-teal-600 bg-teal-50/40' 
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                <Volume2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Voice Guidance / Audio Prompts</h3>
                <p className="text-xs text-slate-500">Speaks instructions and questions aloud</p>
              </div>
            </div>
            <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
              accessibility.voiceGuidance ? 'bg-teal-600 border-teal-600 text-white' : 'border-slate-300'
            }`}>
              {accessibility.voiceGuidance && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
          </div>

          <div 
            onClick={() => updateAccessibility({ reduceMotion: !accessibility.reduceMotion })}
            className={`flex items-center justify-between p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
              accessibility.reduceMotion 
                ? 'border-teal-600 bg-teal-50/40' 
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                <Sliders className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Reduce Motion</h3>
                <p className="text-xs text-slate-500">Disables animations and pulsing effects</p>
              </div>
            </div>
            <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
              accessibility.reduceMotion ? 'bg-teal-600 border-teal-600 text-white' : 'border-slate-300'
            }`}>
              {accessibility.reduceMotion && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
          </div>

        </div>

        <div className="pt-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={() => setIsAccessibilityModalOpen(false)}
            className="w-full sm:w-auto px-5 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs shadow-sm transition-all"
          >
            Save & Close
          </button>
        </div>

      </div>
    </div>
  );
};
