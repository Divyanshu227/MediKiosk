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
      <div className="bg-white rounded-xl max-w-md w-full p-5 sm:p-6 shadow-xl border border-slate-200 relative">
        
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-md bg-teal-50 text-teal-800 flex items-center justify-center font-bold">
              <Type className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Accessibility Settings</h2>
              <p className="text-[11px] text-slate-500">Visual, text, and voice adjustments</p>
            </div>
          </div>
          <button 
            onClick={() => setIsAccessibilityModalOpen(false)}
            className="p-1 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="py-4 space-y-2.5">
          
          <div 
            onClick={() => updateAccessibility({ largeText: !accessibility.largeText })}
            className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
              accessibility.largeText 
                ? 'border-teal-700 bg-teal-50/40' 
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <div className="w-7 h-7 rounded bg-slate-100 flex items-center justify-center text-slate-700">
                <Type className="w-3.5 h-3.5" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-900">Larger Text Mode</h3>
                <p className="text-[11px] text-slate-500">Increases font sizes and touch targets</p>
              </div>
            </div>
            <div className={`w-4 h-4 rounded flex items-center justify-center border ${
              accessibility.largeText ? 'bg-teal-700 border-teal-700 text-white' : 'border-slate-300'
            }`}>
              {accessibility.largeText && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
          </div>

          <div 
            onClick={() => updateAccessibility({ highContrast: !accessibility.highContrast })}
            className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
              accessibility.highContrast 
                ? 'border-teal-700 bg-teal-50/40' 
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <div className="w-7 h-7 rounded bg-slate-100 flex items-center justify-center text-slate-700">
                <Contrast className="w-3.5 h-3.5" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-900">High Contrast Mode</h3>
                <p className="text-[11px] text-slate-500">High contrast styling for vision clarity</p>
              </div>
            </div>
            <div className={`w-4 h-4 rounded flex items-center justify-center border ${
              accessibility.highContrast ? 'bg-teal-700 border-teal-700 text-white' : 'border-slate-300'
            }`}>
              {accessibility.highContrast && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
          </div>

          <div 
            onClick={() => updateAccessibility({ voiceGuidance: !accessibility.voiceGuidance })}
            className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
              accessibility.voiceGuidance 
                ? 'border-teal-700 bg-teal-50/40' 
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <div className="w-7 h-7 rounded bg-slate-100 flex items-center justify-center text-slate-700">
                <Volume2 className="w-3.5 h-3.5" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-900">Voice Guidance</h3>
                <p className="text-[11px] text-slate-500">Speaks instructions and questions aloud</p>
              </div>
            </div>
            <div className={`w-4 h-4 rounded flex items-center justify-center border ${
              accessibility.voiceGuidance ? 'bg-teal-700 border-teal-700 text-white' : 'border-slate-300'
            }`}>
              {accessibility.voiceGuidance && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
          </div>

          <div 
            onClick={() => updateAccessibility({ reduceMotion: !accessibility.reduceMotion })}
            className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
              accessibility.reduceMotion 
                ? 'border-teal-700 bg-teal-50/40' 
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <div className="w-7 h-7 rounded bg-slate-100 flex items-center justify-center text-slate-700">
                <Sliders className="w-3.5 h-3.5" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-900">Reduce Motion</h3>
                <p className="text-[11px] text-slate-500">Disables animations and pulsing effects</p>
              </div>
            </div>
            <div className={`w-4 h-4 rounded flex items-center justify-center border ${
              accessibility.reduceMotion ? 'bg-teal-700 border-teal-700 text-white' : 'border-slate-300'
            }`}>
              {accessibility.reduceMotion && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
          </div>

        </div>

        <div className="pt-2.5 border-t border-slate-200 flex justify-end">
          <button
            onClick={() => setIsAccessibilityModalOpen(false)}
            className="px-4 py-1.5 rounded-md bg-teal-700 hover:bg-teal-800 text-white font-medium text-xs shadow-sm transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
