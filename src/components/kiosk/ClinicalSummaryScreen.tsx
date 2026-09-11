import React, { useEffect, useState } from 'react';
import { 
  CheckCircle2, 
  Send, 
  MessageSquare, 
  RotateCcw, 
  ShieldCheck, 
  Printer, 
  Pill, 
  User 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';

export const ClinicalSummaryScreen: React.FC = () => {
  const { 
    activePatient, 
    sendActivePatientToDoctor, 
    setCurrentScreen, 
    resetPatientFlow,
    getLanguageDetails
  } = useApp();

  const [isSent, setIsSent] = useState(false);
  const lang = getLanguageDetails(activePatient.language);

  useEffect(() => {
    try {
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  }, []);

  const handleSendToDoctor = () => {
    sendActivePatientToDoctor();
    setIsSent(true);
    setTimeout(() => {
      setCurrentScreen('doctor-dashboard');
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex-1 flex flex-col justify-center max-w-3xl mx-auto w-full px-4 sm:px-6 py-6 animate-fadeIn">
      
      <div className="mb-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-emerald-50 border border-emerald-200 p-4 rounded-2xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0 shadow-sm">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
              Intake Completed
            </span>
            <h1 className="text-xl font-bold text-emerald-950">Clinical Summary Ready</h1>
          </div>
        </div>

        <button
          onClick={handlePrint}
          className="p-2 rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold flex items-center space-x-1.5 transition-colors shadow-sm"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print Slip</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
        
        <div className="bg-slate-900 p-5 sm:p-6 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center font-bold text-teal-300 text-lg shrink-0">
                <User className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center space-x-2.5">
                  <h2 className="text-xl font-bold">{activePatient.name}</h2>
                  <span className="px-2 py-0.5 rounded bg-teal-600 text-white text-xs font-bold font-mono">
                    {activePatient.id}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300 mt-0.5 font-medium">
                  <span>{activePatient.age} years</span>
                  <span>•</span>
                  <span>{activePatient.gender}</span>
                  <span>•</span>
                  <span>Language: <strong className="text-teal-300">{lang.name}</strong></span>
                  <span>•</span>
                  <span>Status: <strong className="text-emerald-400">Complete</strong></span>
                </div>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Timestamp</span>
              <span className="text-xs font-mono font-bold text-teal-300">Today, 09:45 AM</span>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-6 space-y-4 text-xs text-slate-800">
          
          <div className="border-b border-slate-100 pb-3.5">
            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
              <span>Chief Complaint</span>
            </h3>
            <p className="text-base font-bold text-slate-900">
              {activePatient.clinicalInfo.chiefComplaint}
            </p>
          </div>

          <div className="border-b border-slate-100 pb-3.5">
            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
              <span>History of Present Illness (HPI)</span>
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li className="flex items-start space-x-2">
                <span className="w-1 h-1 rounded-full bg-teal-600 mt-1.5 shrink-0"></span>
                <span>Fever present for approximately <strong>{activePatient.clinicalInfo.duration || '3 days'}</strong>.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-1 h-1 rounded-full bg-teal-600 mt-1.5 shrink-0"></span>
                <span>Recorded temperature around <strong>{activePatient.clinicalInfo.temperature || '101°F'}</strong>.</span>
              </li>
              {activePatient.clinicalInfo.associatedSymptoms.map((sym, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <span className="w-1 h-1 rounded-full bg-teal-600 mt-1.5 shrink-0"></span>
                  <span>Associated <strong>{sym}</strong> reported during voice intake.</span>
                </li>
              ))}
              {activePatient.clinicalInfo.deniedSymptoms.map((den, i) => (
                <li key={i} className="flex items-start space-x-2 text-slate-500">
                  <span className="w-1 h-1 rounded-full bg-slate-400 mt-1.5 shrink-0"></span>
                  <span>Negative: No {den} reported.</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-slate-100 pb-3.5">
            <div>
              <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center space-x-1.5">
                <Pill className="w-3 h-3 text-indigo-600" />
                <span>Medications Reported</span>
              </h3>
              <p className="font-bold text-slate-900">
                {activePatient.clinicalInfo.medicationsTaken.join(', ') || 'Paracetamol 650mg'}
              </p>
            </div>

            <div>
              <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                <span>Allergies</span>
              </h3>
              <p className="font-bold text-slate-900">
                {activePatient.clinicalInfo.allergies || 'Not reported / No known drug allergies'}
              </p>
            </div>
          </div>

          <div className="border-b border-slate-100 pb-3.5">
            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Existing Conditions
            </h3>
            <p className="font-semibold text-slate-700">
              {activePatient.clinicalInfo.existingConditions?.join(', ') || 'Hypertension'}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-start space-x-2.5 text-xs text-amber-950">
            <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold">Automated intake summary — requires clinician review.</strong>
              <p className="text-amber-900 text-[11px] mt-0.5">
                This document structures patient-reported symptoms prior to OPD consultation. The licensed medical practitioner maintains full clinical authority.
              </p>
            </div>
          </div>

        </div>

      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center space-x-2.5 w-full sm:w-auto">
          <button
            onClick={() => setCurrentScreen('doctor-conversation')}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs border border-slate-200 transition-colors flex items-center justify-center space-x-1.5 shadow-sm"
          >
            <MessageSquare className="w-3.5 h-3.5 text-teal-600" />
            <span>Full Conversation</span>
          </button>

          <button
            onClick={resetPatientFlow}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center space-x-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>New Patient</span>
          </button>
        </div>

        <button
          id="btn-send-to-doctor"
          onClick={handleSendToDoctor}
          className="w-full sm:w-auto px-8 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
        >
          <Send className="w-4 h-4" />
          <span>{isSent ? 'Transmitting to Doctor...' : 'Send to Doctor Dashboard'}</span>
        </button>
      </div>

    </div>
  );
};
