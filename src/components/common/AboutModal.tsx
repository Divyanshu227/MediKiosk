import React from 'react';
import { X, Activity, Clock, ShieldCheck, Languages, Cpu, FileCheck2, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AboutModal: React.FC = () => {
  const { isAboutModalOpen, setIsAboutModalOpen } = useApp();

  if (!isAboutModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-xl max-w-xl w-full p-5 sm:p-6 shadow-xl border border-slate-200 relative my-6">
        
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-200">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-700 text-white flex items-center justify-center shadow-sm">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">About MediKiosk</h2>
              <p className="text-[11px] text-teal-800 font-medium">Multilingual Primary Care Intake Terminal</p>
            </div>
          </div>
          <button 
            onClick={() => setIsAboutModalOpen(false)}
            className="p-1 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="py-4 space-y-3.5 text-slate-600 text-xs leading-relaxed max-h-[65vh] overflow-y-auto pr-1">
          
          <div className="p-3 rounded-lg bg-teal-50 border border-teal-200">
            <div className="flex items-start space-x-2.5">
              <div className="p-1.5 bg-teal-700 text-white rounded mt-0.5 shrink-0">
                <FileCheck2 className="w-3.5 h-3.5" />
              </div>
              <div>
                <h3 className="font-bold text-teal-950 text-xs">Clinical Intake Rationale</h3>
                <p className="text-teal-900 text-[11px] mt-0.5 leading-relaxed">
                  In high-volume hospital outpatient departments, thorough medical history collection establishes the majority of diagnostic value. MediKiosk captures this structured narrative before the patient enters the consultation room.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <div className="w-6 h-6 rounded bg-teal-100 text-teal-800 flex items-center justify-center mb-1.5 font-bold">
                <Clock className="w-3 h-3" />
              </div>
              <h4 className="font-bold text-slate-900 text-xs">Reduces OPD Wait Time</h4>
              <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">
                Captures routine intake before the doctor visit.
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <div className="w-6 h-6 rounded bg-indigo-100 text-indigo-800 flex items-center justify-center mb-1.5 font-bold">
                <Languages className="w-3 h-3" />
              </div>
              <h4 className="font-bold text-slate-900 text-xs">10 Indian Languages</h4>
              <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">
                Patients speak freely in their native tongue.
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <div className="w-6 h-6 rounded bg-emerald-100 text-emerald-800 flex items-center justify-center mb-1.5 font-bold">
                <CheckCircle2 className="w-3 h-3" />
              </div>
              <h4 className="font-bold text-slate-900 text-xs">Clinician in Control</h4>
              <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">
                Physicians evaluate and decide all treatments.
              </p>
            </div>

          </div>

          <div className="space-y-1.5">
            <h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
              <Cpu className="w-3.5 h-3.5 text-teal-700" />
              <span>Technical Components</span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
              <div className="p-2 rounded bg-slate-50 border border-slate-200 flex items-center space-x-2">
                <span className="w-1 h-1 rounded-full bg-teal-700"></span>
                <span className="text-[11px]"><strong>Speech Input:</strong> Indic multilingual voice recognition</span>
              </div>
              <div className="p-2 rounded bg-slate-50 border border-slate-200 flex items-center space-x-2">
                <span className="w-1 h-1 rounded-full bg-teal-700"></span>
                <span className="text-[11px]"><strong>Voice Output:</strong> Localized speech synthesis prompts</span>
              </div>
              <div className="p-2 rounded bg-slate-50 border border-slate-200 flex items-center space-x-2">
                <span className="w-1 h-1 rounded-full bg-teal-700"></span>
                <span className="text-[11px]"><strong>Extraction:</strong> Structured timelines & negation parsing</span>
              </div>
              <div className="p-2 rounded bg-slate-50 border border-slate-200 flex items-center space-x-2">
                <span className="w-1 h-1 rounded-full bg-teal-700"></span>
                <span className="text-[11px]"><strong>Red-Flag Triage:</strong> Immediate ER alert triggers</span>
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded bg-slate-100 text-slate-600 border border-slate-200 flex items-start space-x-2 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-600 shrink-0 mt-0.5" />
            <span>
              <strong>Notice:</strong> MediKiosk is an administrative and intake tool. It does not provide autonomous medical diagnosis or prescription.
            </span>
          </div>

        </div>

        <div className="pt-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={() => setIsAboutModalOpen(false)}
            className="px-4 py-1.5 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
