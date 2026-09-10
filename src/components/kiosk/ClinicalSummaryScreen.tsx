import React, { useEffect, useState } from 'react';
import { 
  CheckCircle2, 
  Send, 
  MessageSquare, 
  RotateCcw, 
  ShieldCheck, 
  Stethoscope, 
  Printer, 
  Share2, 
  Sparkles,
  FileCheck2,
  Calendar,
  Thermometer,
  Pill,
  Languages,
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
    getLanguageDetails,
    showToast
  } = useApp();

  const [isSent, setIsSent] = useState(false);
  const lang = getLanguageDetails(activePatient.language);

  // Trigger celebratory confetti on screen load
  useEffect(() => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {
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
    <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 animate-fadeIn">
      
      {/* Top Banner */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-emerald-50 border border-emerald-200 p-4 sm:p-5 rounded-3xl">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold flex-shrink-0 shadow-md shadow-emerald-600/20">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Intake Completed Successfully
            </span>
            <h1 className="text-2xl font-black text-emerald-950">Clinical Summary Ready</h1>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrint}
            className="p-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold flex items-center space-x-1.5 transition-colors shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>Print Slip</span>
          </button>
        </div>
      </div>

      {/* Main Clinical Summary Card (Doctor Ready) */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-xl overflow-hidden mb-8">
        
        {/* Card Header with Patient Identity */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 sm:p-8 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center font-bold text-teal-300 text-xl flex-shrink-0">
                <User className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center space-x-3">
                  <h2 className="text-2xl font-black">{activePatient.name}</h2>
                  <span className="px-3 py-1 rounded-full bg-teal-500 text-slate-950 text-xs font-black font-mono">
                    {activePatient.id}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 mt-1 font-medium">
                  <span>{activePatient.age} years</span>
                  <span>•</span>
                  <span>{activePatient.gender}</span>
                  <span>•</span>
                  <span>Language: <strong className="text-teal-300">{lang.name} ({lang.nativeName})</strong></span>
                  <span>•</span>
                  <span>Status: <strong className="text-emerald-400">Complete</strong></span>
                </div>
              </div>
            </div>

            <div className="text-right sm:text-right">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 block">Intake Timestamp</span>
              <span className="text-xs font-mono font-bold text-teal-300">Today, 09:45 AM</span>
            </div>
          </div>
        </div>

        {/* Structured Clinical Sections */}
        <div className="p-6 sm:p-8 space-y-6 text-sm text-slate-800">
          
          {/* Section 1: Chief Complaint */}
          <div className="border-b border-slate-100 pb-5">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-teal-600"></span>
              <span>Chief Complaint</span>
            </h3>
            <p className="text-lg font-black text-slate-900">
              {activePatient.clinicalInfo.chiefComplaint}
            </p>
          </div>

          {/* Section 2: History of Present Illness (HPI) */}
          <div className="border-b border-slate-100 pb-5">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-teal-600"></span>
              <span>History of Present Illness (HPI)</span>
            </h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 flex-shrink-0"></span>
                <span>Fever present for approximately <strong>{activePatient.clinicalInfo.duration || '3 days'}</strong>.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 flex-shrink-0"></span>
                <span>Temperature reported around <strong>{activePatient.clinicalInfo.temperature || '101°F'}</strong> with nocturnal peaks.</span>
              </li>
              {activePatient.clinicalInfo.associatedSymptoms.map((sym, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 flex-shrink-0"></span>
                  <span>Associated <strong>{sym}</strong> reported during voice intake.</span>
                </li>
              ))}
              {activePatient.clinicalInfo.deniedSymptoms.map((den, i) => (
                <li key={i} className="flex items-start space-x-2 text-slate-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0"></span>
                  <span>Negative: No {den} reported.</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3: Medications & Allergies Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-b border-slate-100 pb-5">
            <div>
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center space-x-2">
                <Pill className="w-3.5 h-3.5 text-indigo-600" />
                <span>Medications Reported</span>
              </h3>
              <p className="font-bold text-slate-900">
                {activePatient.clinicalInfo.medicationsTaken.join(', ') || 'Paracetamol 650mg'}
              </p>
            </div>

            <div>
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>Allergies</span>
              </h3>
              <p className="font-bold text-slate-900">
                {activePatient.clinicalInfo.allergies || 'Not reported / No known drug allergies'}
              </p>
            </div>
          </div>

          {/* Section 4: Existing Conditions */}
          <div className="border-b border-slate-100 pb-5">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
              Existing Chronic Conditions
            </h3>
            <p className="font-semibold text-slate-700">
              {activePatient.clinicalInfo.existingConditions?.join(', ') || 'Hypertension'}
            </p>
          </div>

          {/* Clinician Review Required Disclaimer Banner */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start space-x-3 text-xs text-amber-900">
            <ShieldCheck className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold">AI-generated intake summary — requires clinician review.</strong>
              <p className="text-amber-800 mt-0.5">
                This document structures patient-reported symptoms prior to OPD consultation. The licensed medical practitioner maintains full clinical authority.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Action CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <button
            onClick={() => setCurrentScreen('doctor-conversation')}
            className="flex-1 sm:flex-initial px-6 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border-2 border-slate-200 transition-colors flex items-center justify-center space-x-2 shadow-sm"
          >
            <MessageSquare className="w-4 h-4 text-teal-600" />
            <span>View Full Conversation</span>
          </button>

          <button
            onClick={resetPatientFlow}
            className="flex-1 sm:flex-initial px-6 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors flex items-center justify-center space-x-2"
          >
            <RotateCcw className="w-4 h-4 text-slate-500" />
            <span>Start New Patient</span>
          </button>
        </div>

        {/* PRIMARY CTA: Send to Doctor */}
        <button
          id="btn-send-to-doctor"
          onClick={handleSendToDoctor}
          className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-black text-lg shadow-xl shadow-teal-600/30 transform hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-3"
        >
          <Send className="w-5 h-5" />
          <span>{isSent ? 'Transmitting to Doctor...' : 'Send to Doctor Dashboard'}</span>
        </button>

      </div>

    </div>
  );
};
