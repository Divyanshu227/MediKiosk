import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  MessageSquare, 
  Stethoscope, 
  ShieldCheck, 
  AlertTriangle, 
  User, 
  Clock, 
  Pill, 
  Thermometer, 
  Sparkles, 
  FileText, 
  AlertCircle,
  Check,
  Languages,
  Printer
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DoctorPatientSummary: React.FC = () => {
  const { 
    selectedDoctorPatient, 
    setCurrentScreen, 
    markPatientAsReviewed, 
    showToast,
    getLanguageDetails 
  } = useApp();

  const [consultationStarted, setConsultationStarted] = useState(false);

  if (!selectedDoctorPatient) {
    return (
      <div className="flex-1 p-8 text-center">
        <p className="text-slate-500">No patient selected.</p>
        <button
          onClick={() => setCurrentScreen('doctor-dashboard')}
          className="mt-4 px-4 py-2 rounded-xl bg-teal-600 text-white text-xs font-bold"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const patient = selectedDoctorPatient;
  const lang = getLanguageDetails(patient.language);

  const handleStartConsultation = () => {
    setConsultationStarted(true);
    showToast(`Consultation in room 204 started with ${patient.name}.`);
  };

  const handleMarkReviewed = () => {
    markPatientAsReviewed(patient.id);
  };

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-6xl mx-auto w-full animate-fadeIn">
      
      {/* Top Header & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => setCurrentScreen('doctor-dashboard')}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs transition-colors shadow-sm w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Patient Queue</span>
        </button>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => window.print()}
            className="p-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold flex items-center space-x-1.5 transition-colors shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report</span>
          </button>
          
          <button
            onClick={() => setCurrentScreen('doctor-conversation')}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center space-x-1.5 transition-colors"
          >
            <MessageSquare className="w-4 h-4 text-teal-600" />
            <span>View Full Conversation</span>
          </button>
        </div>
      </div>

      {/* Patient Profile Banner */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center font-black text-xl flex-shrink-0">
              {patient.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-black text-slate-900">{patient.name}</h1>
                <span className="px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-mono font-bold">
                  {patient.id}
                </span>
                {patient.doctorReviewed ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Reviewed</span>
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200 text-xs font-bold">
                    Pending Review
                  </span>
                )}
              </div>
              
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1 font-medium">
                <span>Age: <strong className="text-slate-800">{patient.age} years</strong></span>
                <span>•</span>
                <span>Gender: <strong className="text-slate-800">{patient.gender}</strong></span>
                <span>•</span>
                <span>Native Language: <strong className="text-teal-700">{patient.languageName}</strong></span>
                <span>•</span>
                <span>Intake Time: <strong className="text-slate-800">{patient.intakeTimestamp}</strong></span>
              </div>
            </div>
          </div>

          {/* Consultation Action Button */}
          <div className="flex items-center space-x-2.5">
            {consultationStarted ? (
              <div className="px-5 py-3 rounded-2xl bg-emerald-600 text-white font-bold text-sm shadow-md flex items-center space-x-2 animate-pulse">
                <Stethoscope className="w-4 h-4" />
                <span>Consultation Active in Room 204</span>
              </div>
            ) : (
              <button
                onClick={handleStartConsultation}
                className="px-6 py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md shadow-teal-600/20 transition-all flex items-center space-x-2"
              >
                <Stethoscope className="w-4 h-4" />
                <span>Begin Doctor Consultation</span>
              </button>
            )}

            {!patient.doctorReviewed && (
              <button
                onClick={handleMarkReviewed}
                className="px-4 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors flex items-center space-x-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Mark as Reviewed</span>
              </button>
            )}
          </div>

        </div>

        {/* 7 Structured Clinical Sections */}
        <div className="pt-6 space-y-6 text-slate-800 text-sm">
          
          {/* Section 1: AI Clinical Summary */}
          <div className="p-5 rounded-2xl bg-teal-50/70 border border-teal-200 space-y-2">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-teal-700" />
              <h2 className="text-xs font-black uppercase tracking-wider text-teal-900">
                1. AI Clinical Intake Summary
              </h2>
            </div>
            <p className="text-sm font-medium text-teal-950 leading-relaxed">
              Patient presented with chief complaint of <strong>{patient.clinicalInfo.chiefComplaint}</strong> with a reported duration of <strong>{patient.clinicalInfo.duration}</strong>. Severity reported as <strong>{patient.clinicalInfo.severity}</strong> with recorded temperature <strong>{patient.clinicalInfo.temperature || '~101°F'}</strong>. Patient was communicative, responsive, and completed voice-guided intake in {lang.name}.
            </p>
          </div>

          {/* Section 2: Key Symptoms (Present & Denied) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>2. Key Symptoms Present (+ Positive)</span>
              </h3>
              <ul className="space-y-1.5 text-xs">
                {patient.clinicalInfo.associatedSymptoms.map((sym, i) => (
                  <li key={i} className="flex items-center space-x-2 text-slate-900 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
                    <span>{sym}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                <span>Negative Symptoms Denied (✕ Negative)</span>
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {patient.clinicalInfo.deniedSymptoms.map((sym, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                    <span>Denied: {sym}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Section 3 & 4: Medical History, Medications & Allergies */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider mb-2">
                3. Existing Conditions
              </h3>
              <p className="text-xs font-bold text-slate-900">
                {patient.clinicalInfo.existingConditions?.join(', ') || 'Hypertension (managed)'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                <Pill className="w-3.5 h-3.5 text-indigo-600" />
                <span>4. Medications Taken</span>
              </h3>
              <p className="text-xs font-bold text-slate-900">
                {patient.clinicalInfo.medicationsTaken.join(', ') || 'Paracetamol 650mg'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider mb-2">
                Allergies
              </h3>
              <p className="text-xs font-bold text-slate-900">
                {patient.clinicalInfo.allergies || 'Not reported / None known'}
              </p>
            </div>

          </div>

          {/* Section 5: Conversation Highlights */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider">
              5. Conversation Highlights (Speech-to-Text)
            </h3>
            <div className="text-xs text-slate-700 space-y-1 bg-white p-3 rounded-xl border border-slate-200">
              <p className="font-semibold text-slate-900">
                Patient quote ({lang.name}): <span className="italic">"मुझे पिछले तीन दिन से बुखार है और सिर में काफी भारीपन और दर्द हो रहा है।"</span>
              </p>
              <p className="text-slate-500">
                Clinical translation: "Experiencing high fever for 3 days with frontal heaviness and headache. Paracetamol taken with temporary defervescence."
              </p>
            </div>
          </div>

          {/* Section 6: Information Gaps */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1.5">
            <h3 className="text-xs font-black text-amber-800 uppercase tracking-wider flex items-center space-x-1.5">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>6. Information Gaps / Clinician Focus Points</span>
            </h3>
            <ul className="text-xs text-amber-900 list-disc list-inside space-y-1">
              <li>Confirm exact timing of last antipyretic dose prior to physical examination.</li>
              <li>Perform physical check of throat / pharynx to rule out pharyngitis.</li>
              <li>Specific drug allergy panel was verbally denied; re-verify before prescribing new antibiotics.</li>
            </ul>
          </div>

          {/* Section 7: AI Intake Notes & Prominent Disclaimer */}
          <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-600 space-y-2">
            <div className="flex items-center space-x-2 text-slate-800 font-bold uppercase tracking-wider text-[11px]">
              <FileText className="w-3.5 h-3.5" />
              <span>7. AI Intake Notes</span>
            </div>
            <p>
              {patient.clinicalInfo.notes || 'Intake conducted via Medikiosk speech assistant. Patient was calm and cooperative.'}
            </p>
            
            <div className="pt-2 border-t border-slate-200 text-slate-500 text-[11px] flex items-start space-x-2">
              <ShieldCheck className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>PROMINENT CLINICAL NOTICE:</strong> AI-generated information is intended to assist clinical workflow. The healthcare professional must independently review and make all clinical decisions.
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
