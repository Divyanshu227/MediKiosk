import React from 'react';
import { 
  AlertTriangle, 
  PhoneCall, 
  ShieldAlert, 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  Stethoscope, 
  User, 
  ArrowRight,
  Activity
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const RedFlagScreen: React.FC = () => {
  const { 
    activePatient, 
    setCurrentScreen, 
    urgentReason, 
    showToast 
  } = useApp();

  const handleDispatchStaff = () => {
    showToast('URGENT DISPATCH: Emergency triage nurse dispatched to Kiosk #3.');
  };

  return (
    <div className="flex-1 flex flex-col justify-center max-w-3xl mx-auto w-full px-3 sm:px-6 py-4 sm:py-6 animate-fadeIn">
      
      {/* Top Breadcrumb */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <button
          onClick={() => setCurrentScreen('ai-conversation')}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-xs transition-colors shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Intake</span>
        </button>

        <span className="text-xs font-bold uppercase tracking-wider bg-red-100 text-red-900 border border-red-300 px-2.5 py-1 rounded flex items-center space-x-1">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-ping mr-1"></span>
          <span>Step 7 of 9 • Safety Triage Protocol</span>
        </span>
      </div>

      {/* Safety Alert Card */}
      <div className="bg-white border-2 border-red-500 rounded-2xl p-4 sm:p-8 shadow-lg space-y-5 sm:space-y-6">
        
        {/* Banner */}
        <div className="flex items-start space-x-4 pb-5 border-b border-red-100">
          <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center shrink-0 border border-red-200">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded bg-red-50 text-red-800 text-[11px] font-bold border border-red-200 mb-1">
              <ShieldAlert className="w-3 h-3 text-red-600" />
              <span>Priority Triage Interceptor Active</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Potential Urgent Symptom Detected
            </h1>
            <p className="mt-1 text-sm text-red-700 font-semibold">
              Please remain seated at the kiosk. Hospital clinical staff should review this case immediately.
            </p>
          </div>
        </div>

        {/* Clinical Transparency Notice */}
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center space-x-2.5">
          <Activity className="w-4 h-4 text-amber-700 shrink-0" />
          <p className="text-[11px] text-amber-900 leading-relaxed font-medium">
            <strong>Safety Protocol:</strong> Routine intake paused. Hospital triage team alerted for immediate assessment.
          </p>
        </div>

        {/* Triage Detail Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
              Triage Priority Level
            </span>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-1 rounded bg-red-600 text-white font-bold text-xs uppercase tracking-wide">
                Priority 1 — STAT
              </span>
              <span className="text-[11px] text-slate-600 font-medium">Immediate Clinical Review</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
              Patient Identification
            </span>
            <div className="font-bold text-slate-900">
              {activePatient.name} • Token #{activePatient.tokenNumber}
            </div>
            <div className="text-[11px] text-slate-500">
              Age: {activePatient.age} ({activePatient.gender}) • Terminal #3 (OPD Block A)
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 sm:col-span-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
              Symptom Trigger Reason (Reported by Patient)
            </span>
            <p className="font-semibold text-slate-900">
              "{urgentReason || activePatient.redFlagReason || 'Acute retrosternal crushing discomfort with radiation to left arm and diaphoresis'}"
            </p>
          </div>

        </div>

        {/* Staff Action Block */}
        <div className="p-4 rounded-xl bg-red-50/60 border border-red-200 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
              <span className="text-xs font-bold text-red-900 uppercase tracking-wide">
                Automated Actions Dispatched
              </span>
            </div>
            <span className="text-[11px] font-mono font-bold text-red-700">
              00:14 Elapsed
            </span>
          </div>

          <ul className="text-xs text-red-800 space-y-1.5 list-disc pl-4">
            <li>Red-flag priority flag raised on Doctor OPD Dashboard worklist.</li>
            <li>Emergency triage buzzer triggered at OPD Nursing Station #1.</li>
            <li>Recommended immediate clinical actions: STAT 12-lead ECG & pulse oximetry.</li>
          </ul>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
            <button
              onClick={handleDispatchStaff}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-sm flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call OPD Triage Nurse to Kiosk</span>
            </button>

            <button
              onClick={() => setCurrentScreen('review')}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors text-center"
            >
              <span>Continue Demo to Patient Review (Step 8) →</span>
            </button>
          </div>
        </div>

        {/* Non-Diagnostic Clinical Authority Footer */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Doctor retains 100% final clinical & diagnostic authority.</span>
          <button
            onClick={() => setCurrentScreen('review')}
            className="text-teal-700 hover:text-teal-900 font-bold"
          >
            Skip to Review →
          </button>
        </div>

      </div>

    </div>
  );
};
