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
        particleCount: 40,
        spread: 45,
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
      
      <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-emerald-50 border border-emerald-200 p-3.5 sm:p-4 rounded-xl">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
              Intake Completed
            </span>
            <h1 className="text-base sm:text-lg font-bold text-emerald-950">Clinical Summary Generated</h1>
          </div>
        </div>

        <button
          onClick={handlePrint}
          className="p-1.5 px-3 rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-medium flex items-center space-x-1.5 transition-colors shadow-sm"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print Slip</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-4">
        
        <div className="bg-slate-900 p-4 sm:p-5 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-teal-500/20 border border-teal-400/30 flex items-center justify-center font-bold text-teal-300 text-base shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-base sm:text-lg font-bold">{activePatient.name}</h2>
                  <span className="px-1.5 py-0.2 rounded bg-teal-700 text-white text-[11px] font-mono">
                    {activePatient.id}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-300 mt-0.5 font-normal">
                  <span>{activePatient.age}y</span>
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
              <span className="text-xs font-mono font-medium text-teal-300">Today, 09:45 AM</span>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-5 space-y-3.5 text-xs text-slate-800">
          
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-700"></span>
              <span>Chief Complaint</span>
            </h3>
            <p className="text-sm sm:text-base font-bold text-slate-900">
              {activePatient.clinicalInfo.chiefComplaint}
            </p>
          </div>

          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-700"></span>
              <span>History of Present Illness (HPI)</span>
            </h3>
            <ul className="space-y-1 text-xs text-slate-700">
              <li className="flex items-start space-x-2">
                <span className="w-1 h-1 rounded-full bg-teal-700 mt-1.5 shrink-0"></span>
                <span>Fever duration reported: <strong>{activePatient.clinicalInfo.duration || '3 days'}</strong>.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-1 h-1 rounded-full bg-teal-700 mt-1.5 shrink-0"></span>
                <span>Recorded temperature: <strong>{activePatient.clinicalInfo.temperature || '101°F'}</strong>.</span>
              </li>
              {activePatient.clinicalInfo.associatedSymptoms.map((sym, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <span className="w-1 h-1 rounded-full bg-teal-700 mt-1.5 shrink-0"></span>
                  <span>Positive symptom: <strong>{sym}</strong>.</span>
                </li>
              ))}
              {activePatient.clinicalInfo.deniedSymptoms.map((den, i) => (
                <li key={i} className="flex items-start space-x-2 text-slate-500">
                  <span className="w-1 h-1 rounded-full bg-slate-400 mt-1.5 shrink-0"></span>
                  <span>Negative: Denied {den}.</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center space-x-1">
                <Pill className="w-3 h-3 text-indigo-600" />
                <span>Medications Reported</span>
              </h3>
              <p className="font-semibold text-slate-900">
                {activePatient.clinicalInfo.medicationsTaken.join(', ') || 'Paracetamol 650mg'}
              </p>
            </div>

            <div>
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                <span>Allergies</span>
              </h3>
              <p className="font-semibold text-slate-900">
                {activePatient.clinicalInfo.allergies || 'Not reported / No known drug allergies'}
              </p>
            </div>
          </div>

          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Existing Chronic Conditions
            </h3>
            <p className="font-semibold text-slate-700">
              {activePatient.clinicalInfo.existingConditions?.join(', ') || 'Hypertension'}
            </p>
          </div>

          <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 flex items-start space-x-2 text-xs text-amber-950">
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold">Automated intake summary — requires clinician review.</strong>
              <p className="text-amber-900 text-[11px] mt-0.5">
                This slip organizes patient-reported symptoms prior to OPD consultation. The licensed medical practitioner maintains full clinical authority.
              </p>
            </div>
          </div>

        </div>

      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5">
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <button
            onClick={() => setCurrentScreen('doctor-conversation')}
            className="flex-1 sm:flex-initial px-3.5 py-2 rounded-lg bg-white hover:bg-slate-50 text-slate-800 font-medium text-xs border border-slate-200 transition-colors flex items-center justify-center space-x-1.5 shadow-sm"
          >
            <MessageSquare className="w-3.5 h-3.5 text-teal-700" />
            <span>Transcript</span>
          </button>

          <button
            onClick={resetPatientFlow}
            className="flex-1 sm:flex-initial px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs transition-colors flex items-center justify-center space-x-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>New Patient</span>
          </button>
        </div>

        <button
          id="btn-send-to-doctor"
          onClick={handleSendToDoctor}
          className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-medium text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center space-x-2 cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
          <span>{isSent ? 'Transmitting to Doctor...' : 'Send to Doctor Dashboard'}</span>
        </button>
      </div>

    </div>
  );
};
