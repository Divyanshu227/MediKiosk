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
      <div className="flex-1 p-6 text-center">
        <p className="text-slate-500 text-sm">No patient selected.</p>
        <button
          onClick={() => setCurrentScreen('doctor-dashboard')}
          className="mt-3 px-3 py-1.5 rounded-md bg-teal-700 text-white text-xs font-medium"
        >
          Back to Queue
        </button>
      </div>
    );
  }

  const patient = selectedDoctorPatient;
  const lang = getLanguageDetails(patient.language);

  const handleStartConsultation = () => {
    setConsultationStarted(true);
    showToast(`Consultation started in Room 204 with ${patient.name}.`);
  };

  const handleMarkReviewed = () => {
    markPatientAsReviewed(patient.id);
  };

  return (
    <div className="flex-1 p-4 sm:p-6 space-y-4 max-w-5xl mx-auto w-full animate-fadeIn">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <button
          onClick={() => setCurrentScreen('doctor-dashboard')}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-xs transition-colors shadow-sm w-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Worklist</span>
        </button>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => window.print()}
            className="p-1.5 px-3 rounded-md bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-medium flex items-center space-x-1.5 transition-colors shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Chart</span>
          </button>
          
          <button
            onClick={() => setCurrentScreen('doctor-conversation')}
            className="px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium flex items-center space-x-1.5 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-teal-700" />
            <span>View Transcript</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 flex items-center justify-center font-bold text-sm shrink-0">
              {patient.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-bold text-slate-900">{patient.name}</h1>
                <span className="px-1.5 py-0.2 rounded bg-slate-900 text-white text-[11px] font-mono">
                  {patient.id}
                </span>
                {patient.doctorReviewed ? (
                  <span className="px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-medium flex items-center space-x-1">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    <span>Reviewed</span>
                  </span>
                ) : (
                  <span className="px-1.5 py-0.2 rounded bg-teal-50 text-teal-800 border border-teal-200 text-[10px] font-medium">
                    Pending
                  </span>
                )}
              </div>
              
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-0.5">
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
              <div className="px-3.5 py-1.5 rounded-md bg-emerald-600 text-white font-medium text-xs flex items-center space-x-1.5">
                <Stethoscope className="w-3.5 h-3.5" />
                <span>In Consultation (Room 204)</span>
              </div>
            ) : (
              <button
                onClick={handleStartConsultation}
                className="px-3.5 py-1.5 rounded-md bg-teal-700 hover:bg-teal-800 text-white font-medium text-xs shadow-sm transition-colors flex items-center space-x-1.5"
              >
                <Stethoscope className="w-3.5 h-3.5" />
                <span>Begin Consultation</span>
              </button>
            )}

            {!patient.doctorReviewed && (
              <button
                onClick={handleMarkReviewed}
                className="px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-xs transition-colors flex items-center space-x-1"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Mark Reviewed</span>
              </button>
            )}
          </div>
        </div>

        <div className="space-y-4 text-slate-800 text-xs">
          
          <div className="p-3.5 rounded-lg bg-teal-50/60 border border-teal-200 space-y-1">
            <div className="flex items-center space-x-1.5">
              <FileText className="w-3.5 h-3.5 text-teal-800" />
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-teal-900">
                1. Clinical Intake Summary
              </h2>
            </div>
            <p className="text-xs text-teal-950 leading-relaxed">
              Patient presented with chief complaint of <strong>{patient.clinicalInfo.chiefComplaint}</strong> with reported duration of <strong>{patient.clinicalInfo.duration}</strong>. Severity reported as <strong>{patient.clinicalInfo.severity}</strong> with recorded temperature <strong>{patient.clinicalInfo.temperature || '~101°F'}</strong>. Patient completed voice-guided intake in {lang.name}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <h3 className="text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                <span>2. Positive Symptoms (+ Present)</span>
              </h3>
              <ul className="space-y-1 text-xs">
                {patient.clinicalInfo.associatedSymptoms.map((sym, i) => (
                  <li key={i} className="flex items-center space-x-1.5 text-slate-900 font-medium">
                    <span className="w-1 h-1 rounded-full bg-teal-700"></span>
                    <span>{sym}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <h3 className="text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                <span>Negative Symptoms (✕ Denied)</span>
              </h3>
              <ul className="space-y-1 text-xs text-slate-600">
                {patient.clinicalInfo.deniedSymptoms.map((sym, i) => (
                  <li key={i} className="flex items-center space-x-1.5">
                    <span className="w-1 h-1 rounded-full bg-slate-400"></span>
                    <span>Denied: {sym}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">
                3. Existing Conditions
              </h3>
              <p className="text-xs font-medium text-slate-900">
                {patient.clinicalInfo.existingConditions?.join(', ') || 'Hypertension'}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5 flex items-center space-x-1">
                <Pill className="w-3 h-3 text-indigo-600" />
                <span>4. Medications</span>
              </h3>
              <p className="text-xs font-medium text-slate-900">
                {patient.clinicalInfo.medicationsTaken.join(', ') || 'Paracetamol 650mg'}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">
                Allergies
              </h3>
              <p className="text-xs font-medium text-slate-900">
                {patient.clinicalInfo.allergies || 'Not reported / None known'}
              </p>
            </div>

          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
            <h3 className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
              5. Intake Transcript Excerpt
            </h3>
            <div className="text-xs text-slate-700 space-y-0.5 bg-white p-2.5 rounded border border-slate-200">
              <p className="font-medium text-slate-900">
                Patient response ({lang.name}): <span className="italic">"मुझे पिछले तीन दिन से बुखार है और सिर में काफी भारीपन और दर्द हो रहा है।"</span>
              </p>
              <p className="text-slate-500 text-[11px]">
                Translation: "Experiencing high fever for 3 days with frontal heaviness and headache. Paracetamol taken with temporary relief."
              </p>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200 space-y-0.5">
            <h3 className="text-[10px] font-bold text-amber-900 uppercase tracking-wider flex items-center space-x-1">
              <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
              <span>6. Clinician Focus Points</span>
            </h3>
            <ul className="text-xs text-amber-950 list-disc list-inside space-y-0.5">
              <li>Confirm timing of last antipyretic dose prior to physical exam.</li>
              <li>Examine throat / pharynx to evaluate for pharyngitis.</li>
              <li>Re-verify drug allergies before prescribing new antibiotics.</li>
            </ul>
          </div>

          <div className="p-3 rounded-lg bg-slate-100 border border-slate-200 text-xs text-slate-600 space-y-1.5">
            <div className="flex items-center space-x-1.5 text-slate-800 font-bold uppercase tracking-wider text-[10px]">
              <FileText className="w-3.5 h-3.5" />
              <span>7. Intake Notes & Observations</span>
            </div>
            <p className="text-[11px]">
              {patient.clinicalInfo.notes || 'Intake conducted via MediKiosk speech interface. Patient was communicative and alert.'}
            </p>
            
            <div className="pt-1.5 border-t border-slate-200 text-slate-500 text-[10px] flex items-start space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
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
