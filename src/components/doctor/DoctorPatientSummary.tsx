import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  MessageSquare, 
  Stethoscope, 
  ShieldCheck, 
  Pill, 
  FileText, 
  AlertCircle,
  Check,
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
    showToast(`Consultation started in room 204 with ${patient.name}.`);
  };

  const handleMarkReviewed = () => {
    markPatientAsReviewed(patient.id);
  };

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-7 space-y-5 max-w-5xl mx-auto w-full animate-fadeIn">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          onClick={() => setCurrentScreen('doctor-dashboard')}
          className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-xs transition-colors shadow-sm w-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Queue</span>
        </button>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => window.print()}
            className="p-2 rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold flex items-center space-x-1.5 transition-colors shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Slip</span>
          </button>
          
          <button
            onClick={() => setCurrentScreen('doctor-conversation')}
            className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-teal-600" />
            <span>View Transcript</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-800 border border-teal-200 flex items-center justify-center font-black text-lg shrink-0">
              {patient.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="flex items-center space-x-2.5">
                <h1 className="text-xl font-bold text-slate-900">{patient.name}</h1>
                <span className="px-2 py-0.5 rounded bg-slate-900 text-white text-xs font-mono font-semibold">
                  {patient.id}
                </span>
                {patient.doctorReviewed ? (
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Reviewed</span>
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200 text-xs font-semibold">
                    Pending
                  </span>
                )}
              </div>
              
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-0.5 font-medium">
                <span>Age: <strong className="text-slate-800">{patient.age}y</strong></span>
                <span>•</span>
                <span>Gender: <strong className="text-slate-800">{patient.gender}</strong></span>
                <span>•</span>
                <span>Language: <strong className="text-teal-800">{patient.languageName}</strong></span>
                <span>•</span>
                <span>Intake: <strong className="text-slate-800">{patient.intakeTimestamp}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {consultationStarted ? (
              <div className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-xs shadow-sm flex items-center space-x-1.5">
                <Stethoscope className="w-4 h-4" />
                <span>Consultation Active (Room 204)</span>
              </div>
            ) : (
              <button
                onClick={handleStartConsultation}
                className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs shadow-sm transition-all flex items-center space-x-1.5"
              >
                <Stethoscope className="w-4 h-4" />
                <span>Begin Consultation</span>
              </button>
            )}

            {!patient.doctorReviewed && (
              <button
                onClick={handleMarkReviewed}
                className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors flex items-center space-x-1"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Mark Reviewed</span>
              </button>
            )}
          </div>

        </div>

        <div className="pt-5 space-y-4 text-slate-800 text-xs">
          
          <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200 space-y-1.5">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-teal-700" />
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-teal-900">
                1. Clinical Intake Summary
              </h2>
            </div>
            <p className="text-xs font-medium text-teal-950 leading-relaxed">
              Patient presented with chief complaint of <strong>{patient.clinicalInfo.chiefComplaint}</strong> with reported duration of <strong>{patient.clinicalInfo.duration}</strong>. Severity reported as <strong>{patient.clinicalInfo.severity}</strong> with recorded temperature <strong>{patient.clinicalInfo.temperature || '~101°F'}</strong>. Patient completed voice-guided intake in {lang.name}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>2. Positive Symptoms (+ Present)</span>
              </h3>
              <ul className="space-y-1 text-xs">
                {patient.clinicalInfo.associatedSymptoms.map((sym, i) => (
                  <li key={i} className="flex items-center space-x-2 text-slate-900 font-semibold">
                    <span className="w-1 h-1 rounded-full bg-teal-600"></span>
                    <span>{sym}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                <span>Negative Symptoms (✕ Denied)</span>
              </h3>
              <ul className="space-y-1 text-xs text-slate-600">
                {patient.clinicalInfo.deniedSymptoms.map((sym, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <span className="w-1 h-1 rounded-full bg-slate-400"></span>
                    <span>Denied: {sym}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                3. Existing Conditions
              </h3>
              <p className="text-xs font-semibold text-slate-900">
                {patient.clinicalInfo.existingConditions?.join(', ') || 'Hypertension'}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center space-x-1">
                <Pill className="w-3.5 h-3.5 text-indigo-600" />
                <span>4. Medications Taken</span>
              </h3>
              <p className="text-xs font-semibold text-slate-900">
                {patient.clinicalInfo.medicationsTaken.join(', ') || 'Paracetamol 650mg'}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Allergies
              </h3>
              <p className="text-xs font-semibold text-slate-900">
                {patient.clinicalInfo.allergies || 'Not reported / None known'}
              </p>
            </div>

          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <h3 className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
              5. Intake Transcript Excerpt
            </h3>
            <div className="text-xs text-slate-700 space-y-1 bg-white p-2.5 rounded-lg border border-slate-200">
              <p className="font-medium text-slate-900">
                Patient response ({lang.name}): <span className="italic">"मुझे पिछले तीन दिन से बुखार है और सिर में काफी भारीपन और दर्द हो रहा है।"</span>
              </p>
              <p className="text-slate-500 text-[11px]">
                Translation: "Experiencing high fever for 3 days with frontal heaviness and headache. Paracetamol taken with temporary relief."
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1">
            <h3 className="text-[11px] font-bold text-amber-900 uppercase tracking-wider flex items-center space-x-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>6. Clinician Focus Points</span>
            </h3>
            <ul className="text-xs text-amber-900 list-disc list-inside space-y-0.5">
              <li>Confirm timing of last antipyretic dose prior to physical exam.</li>
              <li>Examine throat / pharynx to evaluate for pharyngitis.</li>
              <li>Re-verify drug allergies before prescribing new antibiotics.</li>
            </ul>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 space-y-2">
            <div className="flex items-center space-x-1.5 text-slate-800 font-bold uppercase tracking-wider text-[11px]">
              <FileText className="w-3.5 h-3.5" />
              <span>7. Intake Notes & Observations</span>
            </div>
            <p className="text-[11px]">
              {patient.clinicalInfo.notes || 'Intake conducted via MediKiosk speech interface. Patient was communicative and alert.'}
            </p>
            
            <div className="pt-2 border-t border-slate-200 text-slate-500 text-[11px] flex items-start space-x-2">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
              <span>
                <strong>Clinical Notice:</strong> Pre-intake information is intended to assist consultation workflow. The healthcare professional maintains full clinical authority.
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
