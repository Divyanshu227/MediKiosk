import React, { useEffect, useState } from 'react';
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
  Code2
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
    clinicalDepartment,
    generateFhirBundle
  } = useApp();

  const [isSent, setIsSent] = useState(false);
  const [showFhirRaw, setShowFhirRaw] = useState(false);
  const lang = getLanguageDetails(activePatient.language);
  const fhirBundle = generateFhirBundle();

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

  const docs = activePatient.documents || [];

  return (
    <div className="flex-1 flex flex-col justify-center max-w-3xl mx-auto w-full px-4 sm:px-6 py-6 animate-fadeIn">
      
      {/* Top Success Banner */}
      <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-emerald-50 border border-emerald-200 p-3.5 sm:p-4 rounded-xl">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
              Pre-Consultation Intake Ready
            </span>
            <h1 className="text-base sm:text-lg font-bold text-emerald-950">
              OPD Token #{activePatient.tokenNumber} Generated
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowFhirRaw(!showFhirRaw)}
            className="p-1.5 px-3 rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold flex items-center space-x-1.5 transition-colors shadow-2xs"
          >
            <Code2 className="w-3.5 h-3.5 text-teal-700" />
            <span>{showFhirRaw ? 'Hide FHIR' : 'View FHIR JSON'}</span>
          </button>
          <button
            onClick={handlePrint}
            className="p-1.5 px-3 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold flex items-center space-x-1.5 transition-colors shadow-2xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Token Slip</span>
          </button>
        </div>
      </div>

      {/* FHIR Bundle Modal Preview */}
      {showFhirRaw && (
        <div className="mb-4 p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 space-y-2 animate-fadeIn">
          <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
            <span className="font-bold text-teal-400 font-mono">
              ABDM FHIR Resource Bundle (HL7 FHIR R4)
            </span>
            <span className="text-[10px] text-slate-400">Total Entries: {fhirBundle.totalEntries}</span>
          </div>
          <pre className="font-mono text-[11px] text-emerald-400 max-h-48 overflow-y-auto whitespace-pre-wrap">
            {fhirBundle.fhirJson}
          </pre>
        </div>
      )}

      {/* Official OPD Token Slip Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-4">
        
        {/* Slip Header */}
        <div className="bg-slate-900 p-4 sm:p-5 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-lg bg-teal-500/20 border border-teal-400/30 flex items-center justify-center font-bold text-teal-300 text-base shrink-0">
                <QrCode className="w-6 h-6 text-teal-400" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-base sm:text-lg font-bold">{activePatient.name}</h2>
                  <span className="px-2 py-0.5 rounded bg-teal-700 text-white text-xs font-mono font-bold">
                    #{activePatient.tokenNumber}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-300 mt-0.5 font-normal">
                  <span>{activePatient.age}y</span>
                  <span>•</span>
                  <span>{activePatient.gender}</span>
                  <span>•</span>
                  <span>Dept: <strong className="text-teal-300">{clinicalDepartment === 'ayush' ? 'AYUSH Kayachikitsa' : 'General Medicine'}</strong></span>
                  <span>•</span>
                  <span>Language: <strong className="text-teal-300">{lang.name}</strong></span>
                </div>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 block">ABDM Sync</span>
              <span className="text-xs font-mono font-semibold text-emerald-400">
                {activePatient.abhaProfile?.abhaId || 'Linked via ABHA'}
              </span>
            </div>
          </div>
        </div>

        {/* Slip Content Sections */}
        <div className="p-4 sm:p-5 space-y-3.5 text-xs text-slate-800">
          
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center space-x-1.5">
              <Activity className="w-3.5 h-3.5 text-teal-700" />
              <span>Chief Presenting Complaint</span>
            </h3>
            <p className="text-sm font-bold text-slate-900">
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
                <span>Duration / Onset: <strong>{activePatient.clinicalInfo.duration || '3 days'}</strong>.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-1 h-1 rounded-full bg-teal-700 mt-1.5 shrink-0"></span>
                <span>Severity / Temperature: <strong>{activePatient.clinicalInfo.severity} ({activePatient.clinicalInfo.temperature || '~101°F'})</strong>.</span>
              </li>
              {activePatient.clinicalInfo.associatedSymptoms.map((sym, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <span className="w-1 h-1 rounded-full bg-teal-700 mt-1.5 shrink-0"></span>
                  <span>Positive symptoms: <strong>{sym}</strong>.</span>
                </li>
              ))}
            </ul>
          </div>

          {/* AYUSH Assessment Callout if active */}
          {clinicalDepartment === 'ayush' && activePatient.ayushAssessment && (
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-[10px] font-bold text-amber-800 uppercase tracking-wider mb-1 flex items-center space-x-1.5">
                <Leaf className="w-3.5 h-3.5 text-amber-700" />
                <span>Dashavidha Pariksha Highlights</span>
              </h3>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="p-2 bg-amber-50/50 rounded border border-amber-200">
                  <span className="text-[10px] text-slate-500 block">Agni:</span>
                  <span className="font-bold text-amber-900">{activePatient.ayushAssessment.agni}</span>
                </div>
                <div className="p-2 bg-amber-50/50 rounded border border-amber-200">
                  <span className="text-[10px] text-slate-500 block">Koshtha:</span>
                  <span className="font-bold text-amber-900">{activePatient.ayushAssessment.koshtha}</span>
                </div>
                <div className="p-2 bg-amber-50/50 rounded border border-amber-200">
                  <span className="text-[10px] text-slate-500 block">Prakriti:</span>
                  <span className="font-bold text-amber-900">{activePatient.ayushAssessment.prakriti}</span>
                </div>
              </div>
            </div>
          )}

          {/* Scanned Prior Docs & Abnormal Flags */}
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center space-x-1.5">
              <FileText className="w-3.5 h-3.5 text-teal-700" />
              <span>Prior Medical Documents & Timeline</span>
            </h3>
            {docs.length > 0 ? (
              <p className="text-xs font-semibold text-slate-800">
                {docs.length} prior files digitized ({docs.map(d => d.title).join('; ')})
              </p>
            ) : (
              <p className="text-xs text-slate-500 italic">No prior physical files attached.</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center space-x-1">
                <Pill className="w-3 h-3 text-indigo-600" />
                <span>Medications Reported</span>
              </h3>
              <p className="font-semibold text-slate-900">
                {activePatient.clinicalInfo.medicationsTaken.join(', ') || 'None reported'}
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

          <div className="p-3 rounded-lg bg-teal-50 border border-teal-200 flex items-start space-x-2 text-xs text-teal-950">
            <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold">Pushed to Hospital Information System (HIS) via FHIR API.</strong>
              <p className="text-teal-900 text-[11px] mt-0.5">
                The doctor will see this complete structured history before you step into the OPD room.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5">
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <button
            onClick={() => setCurrentScreen('doctor-conversation')}
            className="flex-1 sm:flex-initial px-3.5 py-2 rounded-lg bg-white hover:bg-slate-50 text-slate-800 font-medium text-xs border border-slate-200 transition-colors flex items-center justify-center space-x-1.5 shadow-sm"
          >
            <MessageSquare className="w-3.5 h-3.5 text-teal-700" />
            <span>View Transcript</span>
          </button>

          <button
            onClick={resetPatientFlow}
            className="flex-1 sm:flex-initial px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs transition-colors flex items-center justify-center space-x-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Next Patient</span>
          </button>
        </div>

        <button
          id="btn-send-to-doctor"
          onClick={handleSendToDoctor}
          className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center space-x-2 cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
          <span>{isSent ? 'Transmitting to EMR...' : 'Open Doctor Consultation Portal (Step 5)'}</span>
        </button>
      </div>

    </div>
  );
};
