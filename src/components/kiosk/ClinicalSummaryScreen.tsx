import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Send, 
  MessageSquare, 
  RotateCcw, 
  ShieldCheck, 
  Printer, 
  Pill, 
  User, 
  QrCode, 
  FileText, 
  Activity, 
  Leaf, 
  Code2,
  Stethoscope,
  AlertTriangle,
  Clock,
  Building2,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { InPageFeedbackCard } from '../common/InPageFeedbackCard';

export const ClinicalSummaryScreen: React.FC = () => {
  const { 
    activePatient, 
    sendActivePatientToDoctor, 
    setCurrentScreen, 
    resetPatientFlow,
    getLanguageDetails,
    clinicalDepartment,
    generateFhirBundle
  } = useApp();

  const [isSent, setIsSent] = useState(false);
  const [showFhirRaw, setShowFhirRaw] = useState(false);
  const lang = getLanguageDetails(activePatient.language);
  const fhirBundle = generateFhirBundle();
  const docs = activePatient.documents || [];

  const handleSendToDoctor = () => {
    sendActivePatientToDoctor();
    setIsSent(true);
    setTimeout(() => {
      setCurrentScreen('doctor-dashboard');
    }, 1000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full px-3 sm:px-6 py-4 sm:py-6 animate-fadeIn">
      
      {/* Top Professional Confirmation Banner */}
      <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white border border-slate-200 p-3.5 sm:p-4 rounded-xl shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6 text-teal-700" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
                Step 9 of 9 • Intake Summary
              </span>
              <span className="text-xs font-mono font-bold text-slate-800">
                Token #{activePatient.tokenNumber}
              </span>
            </div>
            <h1 className="text-lg font-bold text-slate-900 mt-0.5">
              Clinical Intake Formatted & Ready for Doctor
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowFhirRaw(!showFhirRaw)}
            className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold flex items-center space-x-1.5 transition-colors shadow-2xs"
          >
            <Code2 className="w-3.5 h-3.5 text-teal-700" />
            <span>{showFhirRaw ? 'Hide FHIR' : 'FHIR R4 JSON'}</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center space-x-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Slip</span>
          </button>
        </div>
      </div>

      {/* FHIR Bundle Modal Preview */}
      {showFhirRaw && (
        <div className="mb-4 p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 space-y-2 animate-fadeIn">
          <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
            <span className="font-bold text-teal-400 font-mono">
              ABDM FHIR R4 Collection Bundle (Demo Payload)
            </span>
            <span className="text-[10px] text-slate-400">Total Entries: {fhirBundle.totalEntries}</span>
          </div>
          <pre className="font-mono text-[11px] text-emerald-400 max-h-56 overflow-y-auto whitespace-pre-wrap">
            {fhirBundle.fhirJson}
          </pre>
        </div>
      )}

      {/* Clinical Summary Card */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mb-5">
        
        {/* Header Ribbon */}
        <div className="bg-slate-900 p-4 sm:p-5 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-base font-bold tracking-tight">Hospital Outpatient Department</span>
                  <span className="text-[10px] font-bold bg-teal-800 text-teal-200 border border-teal-600 px-2 py-0.5 rounded uppercase">
                    Terminal #3 Intake
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Pre-Consultation Case Record • Attending: Dr. Sharma (Room 204)
                </p>
              </div>
            </div>

            <div className="text-right sm:border-l sm:border-slate-700 sm:pl-4">
              <div className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">Patient UHID / Token</div>
              <div className="text-base font-mono font-bold text-teal-300">
                {activePatient.id} • #{activePatient.tokenNumber}
              </div>
            </div>
          </div>
        </div>

        {/* Patient Demographics Bar */}
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center space-x-3">
            <span className="font-bold text-slate-900">{activePatient.name}</span>
            <span className="text-slate-500">{activePatient.age}y / {activePatient.gender}</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-600">Language: <strong>{lang.name}</strong></span>
          </div>
          <div className="flex items-center space-x-2 text-slate-600 font-mono text-[11px]">
            <span>ABHA: {activePatient.abhaProfile?.abhaId || 'Demo Linked'}</span>
          </div>
        </div>

        {/* Structured Clinical Summary Sections */}
        <div className="p-5 sm:p-6 space-y-4 text-xs text-slate-700">
          
          {/* 1. Chief Complaint & 2. HPI */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-3 border-b border-slate-100">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                1. Chief Complaint
              </span>
              <p className="font-bold text-slate-900 text-xs">
                {activePatient.clinicalInfo.chiefComplaint}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                2. Present Illness (HPI)
              </span>
              <p className="text-slate-700 font-medium">
                Duration: <strong className="text-slate-900">{activePatient.clinicalInfo.duration}</strong> • Severity: <strong className="text-amber-800">{activePatient.clinicalInfo.severity}</strong>
              </p>
            </div>
          </div>

          {/* 3. Positive Symptoms & 4. Negative Symptoms */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-3 border-b border-slate-100">
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center space-x-1">
                <CheckCircle2 className="w-3 h-3 text-teal-700" />
                <span>3. Positive Symptoms</span>
              </span>
              <div className="flex flex-wrap gap-1">
                {activePatient.clinicalInfo.associatedSymptoms.map((s, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200 text-[11px] font-semibold">
                    + {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300 text-slate-700 flex items-center justify-center text-[8px] font-bold">✕</span>
                <span>4. Denied / Negative Symptoms</span>
              </span>
              <div className="flex flex-wrap gap-1">
                {(activePatient.clinicalInfo.deniedSymptoms && activePatient.clinicalInfo.deniedSymptoms.length > 0
                  ? activePatient.clinicalInfo.deniedSymptoms
                  : ['No chest pain', 'No dyspnea', 'No vomiting', 'No cough']
                ).map((s, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 text-[11px] font-medium">
                    ✕ {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 5. Past Medical History, 6. Medications, 7. Allergies */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pb-3 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                5. Past Medical History
              </span>
              <p className="font-semibold text-slate-800">
                {activePatient.clinicalInfo.existingConditions.join(', ') || 'None declared'}
              </p>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                6. Current Medications
              </span>
              <p className="font-semibold text-slate-800">
                {activePatient.clinicalInfo.medicationsTaken.join(', ') || 'None taken'}
              </p>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                7. Known Drug Allergies
              </span>
              <p className="font-semibold text-slate-800">
                {activePatient.clinicalInfo.allergies || 'No known drug allergies reported'}
              </p>
            </div>
          </div>

          {/* 8. Family / Personal History & 9. Investigations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-3 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                8. Family & Personal History
              </span>
              <p className="text-slate-600">
                Non-smoker, non-alcoholic. Family history of Type 2 Diabetes noted.
              </p>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                9. Recent Investigations (Scanned Records)
              </span>
              <p className="text-slate-800 font-semibold">
                {docs.length > 0 ? `${docs.length} records processed: ${docs.map(d => d.title).join(', ')}` : 'No prior lab reports attached'}
              </p>
            </div>
          </div>

          {/* 10. Document Timeline & 11. Missing Information Gaps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-3 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                10. Document Timeline
              </span>
              <p className="text-slate-600">
                {activePatient.timelineEvents?.length || docs.length + 1} chronological events mapped.
              </p>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block mb-1 flex items-center space-x-1">
                <HelpCircle className="w-3 h-3 text-amber-700" />
                <span>11. Focus Areas & History Gaps</span>
              </span>
              <ul className="list-disc pl-4 text-slate-600 space-y-0.5 text-[11px]">
                {(activePatient.missingInformation || [
                  'In-clinic blood pressure check required',
                  'Post-prandial blood sugar verification'
                ]).map((gap, i) => (
                  <li key={i}>{gap}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* 12. Triage Priority & 13. AYUSH (if applicable) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  12. Clinical Triage Priority
                </span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase ${
                  activePatient.priority === 'Urgent' 
                    ? 'bg-red-100 text-red-800' 
                    : activePatient.priority === 'High' 
                    ? 'bg-amber-100 text-amber-900' 
                    : 'bg-teal-100 text-teal-800'
                }`}>
                  {activePatient.priority} Priority
                </span>
              </div>
              <span className="text-[11px] text-slate-500">OPD Room 204</span>
            </div>

            {clinicalDepartment === 'ayush' && activePatient.ayushAssessment ? (
              <div className="p-2.5 rounded-lg bg-amber-50/60 border border-amber-200">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 block mb-0.5">
                  13. AYUSH Dashavidha Assessment
                </span>
                <p className="text-xs font-bold text-amber-950">
                  {activePatient.ayushAssessment.prakriti} • Agni: {activePatient.ayushAssessment.agni} • Koshtha: {activePatient.ayushAssessment.koshtha}
                </p>
              </div>
            ) : (
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                    13. Clinical Department
                  </span>
                  <span className="text-xs font-bold text-slate-800">
                    General Medicine (Internal Medicine OPD)
                  </span>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Ethical Non-Diagnostic Reminder */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0" />
            <span>
              <strong>Intake Support:</strong> This summary organizes patient-reported history. Doctor conducts examination and provides diagnosis.
            </span>
          </div>
        </div>

      </div>

      {/* In-Page Zomato-Style Kiosk Experience Feedback */}
      <InPageFeedbackCard 
        type="patient"
        patientName={activePatient.name}
        tokenNumber={activePatient.tokenNumber}
        className="my-1"
        defaultExpanded={true}
      />

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <button
            onClick={() => setCurrentScreen('doctor-conversation')}
            className="px-3.5 py-2 rounded-lg bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border border-slate-200 transition-colors flex items-center space-x-1.5 shadow-2xs"
          >
            <MessageSquare className="w-3.5 h-3.5 text-teal-700" />
            <span>Audio Transcript</span>
          </button>

          <button
            onClick={resetPatientFlow}
            className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors flex items-center space-x-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset</span>
          </button>
        </div>

        <button
          id="btn-send-to-doctor"
          onClick={handleSendToDoctor}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center space-x-2 cursor-pointer"
        >
          <Send className="w-4 h-4" />
          <span>{isSent ? 'Transmitting to Workstation...' : 'Send to Doctor & Open OPD Portal'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
