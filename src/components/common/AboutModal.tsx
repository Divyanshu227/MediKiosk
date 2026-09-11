import React from 'react';
import { X, Activity, Clock, ShieldCheck, Languages, Cpu, FileCheck2, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AboutModal: React.FC = () => {
  const { isAboutModalOpen, setIsAboutModalOpen } = useApp();

  if (!isAboutModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-7 shadow-xl border border-slate-200 relative my-8">
        
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-sm">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">About MediKiosk</h2>
              <p className="text-xs text-teal-700 font-medium">Multilingual Primary Care Intake System</p>
            </div>
          </div>
          <button 
            onClick={() => setIsAboutModalOpen(false)}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-5 space-y-5 text-slate-600 text-sm leading-relaxed max-h-[68vh] overflow-y-auto pr-1">
          
          <div className="p-4 rounded-xl bg-teal-50 border border-teal-200">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-teal-700 text-white rounded-lg mt-0.5">
                <FileCheck2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-teal-950 text-sm">Clinical Rationale</h3>
                <p className="text-teal-900 text-xs mt-1">
                  In busy OPD settings, medical history collection accounts for majority of diagnostic context. MediKiosk captures this structured narrative before the consultation begins so doctors can spend consultation time on examination and treatment decisions.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="w-7 h-7 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center mb-2 font-bold">
                <Clock className="w-3.5 h-3.5" />
              </div>
              <h4 className="font-bold text-slate-900 text-xs">Reduces OPD Wait Time</h4>
              <p className="text-[11px] text-slate-500 mt-1">
                Collects routine history prior to doctor consultation, making visits faster and more focused.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center mb-2 font-bold">
                <Languages className="w-3.5 h-3.5" />
              </div>
              <h4 className="font-bold text-slate-900 text-xs">10 Indian Languages</h4>
              <p className="text-[11px] text-slate-500 mt-1">
                Patients speak in their native tongue. Dialogue is translated into standardized clinical terminology.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-2 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <h4 className="font-bold text-slate-900 text-xs">Clinician in Control</h4>
              <p className="text-[11px] text-slate-500 mt-1">
                MediKiosk does not prescribe or diagnose autonomously; the attending physician makes all clinical decisions.
              </p>
            </div>

          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
              <Cpu className="w-3.5 h-3.5 text-teal-600" />
              <span>Technical Architecture</span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
                <span><strong>Speech Recognition:</strong> Indic multilingual voice input</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
                <span><strong>Voice Guidance:</strong> Localized speech synthesis output</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
                <span><strong>Clinical Extraction:</strong> Timeline, negation, and symptom parsing</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
                <span><strong>Triage Flags:</strong> Immediate alert routing for red-flag symptoms</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-100 text-xs text-slate-600 border border-slate-200 flex items-start space-x-2">
            <ShieldCheck className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
            <span>
              <strong>Note:</strong> MediKiosk is an intake and administrative aid. It does not provide autonomous clinical verdicts.
            </span>
          </div>

        </div>

        <div className="pt-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={() => setIsAboutModalOpen(false)}
            className="px-5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
