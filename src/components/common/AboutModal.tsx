import React from 'react';
import { X, Activity, Clock, ShieldCheck, Languages, Brain, Cpu, FileCheck2, HeartHandshake } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AboutModal: React.FC = () => {
  const { isAboutModalOpen, setIsAboutModalOpen } = useApp();

  if (!isAboutModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-600 to-teal-400 text-white flex items-center justify-center shadow-md">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">About MEDIKIOSK</h2>
              <p className="text-xs text-teal-600 font-semibold uppercase tracking-wider">AI-Powered Multilingual Primary Care Assistant</p>
            </div>
          </div>
          <button 
            onClick={() => setIsAboutModalOpen(false)}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="py-6 space-y-6 text-slate-600 text-sm leading-relaxed max-h-[70vh] overflow-y-auto pr-1">
          
          {/* Key Clinical Rationale Highlight */}
          <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-teal-600 text-white rounded-xl mt-0.5">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-teal-900 text-base">The 70–80% Clinical Insight</h3>
                <p className="text-teal-800 text-xs sm:text-sm mt-1">
                  Clinical research demonstrates that <strong>70% to 80% of diagnostic value</strong> is established directly from a thorough, well-conducted medical history. Medikiosk captures this essential clinical narrative before the doctor meets the patient.
                </p>
              </div>
            </div>
          </div>

          {/* Three Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center mb-2 font-bold">
                <Clock className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Reduces OPD Burden</h4>
              <p className="text-xs text-slate-500 mt-1">
                Compresses routine intake time from 8-12 minutes down to under 2 minutes of doctor review, enabling high-quality consultations.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center mb-2 font-bold">
                <Languages className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Inclusive Multilingual</h4>
              <p className="text-xs text-slate-500 mt-1">
                Patients speak freely in their native Indian language. AI translates and standardizes symptoms into structured medical terms.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2 font-bold">
                <Brain className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Doctor in Control</h4>
              <p className="text-xs text-slate-500 mt-1">
                Medikiosk never prescribes or diagnoses. It organizes symptoms and red flags so the human physician remains the ultimate decision maker.
              </p>
            </div>

          </div>

          {/* Technology Feasibility Stack */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-teal-600" />
              <span>Technology Feasibility</span>
            </h3>
            <p className="text-xs text-slate-600">
              Medikiosk integrates mature, battle-tested AI components built for Indian healthcare conditions:
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                <span><strong>ASR:</strong> Indic speech recognition with dialect handling</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                <span><strong>TTS:</strong> Natural localized speech synthesis for audio prompts</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                <span><strong>Clinical NLP:</strong> Conversational history extraction & negation detection</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                <span><strong>Safety Triage:</strong> Immediate red flag & urgent escalation triggers</span>
              </div>
            </div>
          </div>

          {/* Clinical Disclaimer */}
          <div className="p-3.5 rounded-xl bg-slate-100 text-xs text-slate-600 border border-slate-200 flex items-start space-x-2">
            <ShieldCheck className="w-4 h-4 text-slate-600 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Ethical Notice:</strong> Medikiosk is designed as an administrative and structured intake assistant. It strictly adheres to healthcare safety protocols and does not provide autonomous clinical verdicts.
            </span>
          </div>

        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={() => setIsAboutModalOpen(false)}
            className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-all shadow-sm"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
