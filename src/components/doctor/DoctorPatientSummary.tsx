import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  MessageSquare, 
  Stethoscope, 
  Pill, 
  FileText, 
  Check, 
  Printer, 
  FileCheck2, 
  Leaf, 
  Code2, 
  Plus, 
  Sparkles,
  AlertTriangle 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MedicalDocument } from '../../types';

export const DoctorPatientSummary: React.FC = () => {
  const { 
    selectedDoctorPatient, 
    setCurrentScreen, 
    markPatientAsReviewed, 
    showToast,
    getLanguageDetails 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'soap' | 'ayush' | 'documents' | 'fhir' | 'rx'>('soap');
  const [consultationStarted, setConsultationStarted] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<MedicalDocument | null>(null);

  // E-Prescription State
  const [prescriptions, setPrescriptions] = useState<string[]>([
    'Tab. Paracetamol 650mg - 1 Tab TDS x 3 days (after meals)',
    'Tab. Pantoprazole 40mg - 1 Tab OD Morning x 7 days (empty stomach)'
  ]);
  const [newRx, setNewRx] = useState('');
  const [doctorClinicalNotes, setDoctorClinicalNotes] = useState(
    'Patient evaluated. Clear lung fields, throat congested with mild pharyngitis. Advised warm saline gargles and hydration.'
  );

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
  const docs = patient.documents || [];
  const abnormalCount = docs.reduce((acc, d) => acc + (d.abnormalValues?.length || 0), 0);

  const handleStartConsultation = () => {
    setConsultationStarted(true);
    showToast(`Consultation started in Room 204 with ${patient.name}.`);
  };

  const handleAddRx = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRx.trim()) return;
    setPrescriptions(prev => [...prev, newRx.trim()]);
    setNewRx('');
    showToast('Prescription item added.');
  };

  const handleFinalizeConsultation = () => {
    markPatientAsReviewed(patient.id);
    showToast(`Consultation finalized and e-Prescription saved for ${patient.name}.`);
  };

  return (
    <div className="flex-1 p-4 sm:p-6 space-y-4 max-w-6xl mx-auto w-full animate-fadeIn">
      
      {/* Navigation & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <button
          onClick={() => setCurrentScreen('doctor-dashboard')}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-xs transition-colors shadow-sm w-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Worklist Queue</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => window.print()}
            className="p-1.5 px-3 rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-medium flex items-center space-x-1.5 transition-colors shadow-2xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print EMR Chart</span>
          </button>
          
          <button
            onClick={() => setCurrentScreen('doctor-conversation')}
            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-teal-700" />
            <span>Verbatim Transcript ({patient.conversation.length} msgs)</span>
          </button>
        </div>
      </div>

      {/* Patient Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className={`w-11 h-11 rounded-lg flex items-center justify-center font-bold text-white text-base shrink-0 ${
              patient.department === 'ayush' ? 'bg-amber-700' : 'bg-teal-700'
            }`}>
              {patient.department === 'ayush' ? <Leaf className="w-6 h-6" /> : <Stethoscope className="w-6 h-6" />}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-bold text-slate-900">{patient.name}</h1>
                <span className="px-2 py-0.5 rounded bg-slate-900 text-white text-xs font-mono font-bold">
                  Token #{patient.tokenNumber}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  patient.department === 'ayush' 
                    ? 'bg-amber-50 text-amber-900 border border-amber-200' 
                    : 'bg-teal-50 text-teal-900 border border-teal-200'
                }`}>
                  {patient.department === 'ayush' ? 'AYUSH Kayachikitsa' : 'General Medicine'}
                </span>
                {patient.doctorReviewed ? (
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Consult Completed</span>
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200 text-[10px] font-bold">
                    Pending Consultation
                  </span>
                )}
              </div>
              
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-1 font-medium">
                <span>Age: <strong className="text-slate-800">{patient.age}y</strong></span>
                <span>•</span>
                <span>Gender: <strong className="text-slate-800">{patient.gender}</strong></span>
                <span>•</span>
                <span>Language: <strong className="text-teal-800">{patient.languageName}</strong></span>
                <span>•</span>
                <span>ABHA: <strong className="text-teal-800 font-mono">{patient.abhaProfile?.abhaId || 'Linked'}</strong></span>
                <span>•</span>
                <span>Arrival: <strong className="text-slate-800">{patient.intakeTimestamp}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 self-start md:self-auto">
            {consultationStarted ? (
              <div className="px-3.5 py-2 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center space-x-1.5 shadow-sm">
                <Stethoscope className="w-4 h-4" />
                <span>Consultation Active (Room 204)</span>
              </div>
            ) : (
              <button
                onClick={handleStartConsultation}
                className="px-4 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-sm transition-all flex items-center space-x-1.5"
              >
                <Stethoscope className="w-4 h-4" />
                <span>Call Patient & Start Consult</span>
              </button>
            )}

            {!patient.doctorReviewed && (
              <button
                onClick={handleFinalizeConsultation}
                className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-sm transition-colors flex items-center space-x-1"
              >
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Finalize & Sign</span>
              </button>
            )}
          </div>
        </div>

        {/* Clinical Tabs Navigation */}
        <div className="flex flex-wrap gap-1.5 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab('soap')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'soap'
                ? 'bg-teal-700 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Structured SOAP Note</span>
          </button>

          {patient.department === 'ayush' && (
            <button
              onClick={() => setActiveTab('ayush')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'ayush'
                  ? 'bg-amber-700 text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Leaf className="w-3.5 h-3.5" />
              <span>Dashavidha Pariksha (AYUSH)</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('documents')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'documents'
                ? 'bg-teal-700 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>Digitized Records ({docs.length})</span>
            {abnormalCount > 0 && (
              <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                {abnormalCount} Flags
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('rx')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'rx'
                ? 'bg-teal-700 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Pill className="w-3.5 h-3.5" />
            <span>e-Prescription & Treatment Plan</span>
          </button>

          <button
            onClick={() => setActiveTab('fhir')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'fhir'
                ? 'bg-teal-700 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>ABDM / FHIR Bundle</span>
          </button>
        </div>

        {/* Tab 1: SOAP Clinical Note */}
        {activeTab === 'soap' && (
          <div className="space-y-4 text-xs text-slate-800 animate-fadeIn">
            
            <div className="p-3.5 rounded-xl bg-teal-50/60 border border-teal-200 space-y-1">
              <div className="flex items-center space-x-1.5">
                <FileText className="w-3.5 h-3.5 text-teal-800" />
                <h2 className="text-[11px] font-bold uppercase tracking-wider text-teal-900">
                  Subjective: Chief Complaint & Present Illness
                </h2>
              </div>
              <p className="text-xs text-teal-950 leading-relaxed font-medium">
                Patient presented with chief complaint of <strong>{patient.clinicalInfo.chiefComplaint}</strong> with reported duration of <strong>{patient.clinicalInfo.duration}</strong>. Severity: <strong>{patient.clinicalInfo.severity}</strong> (Recorded Temp: <strong>{patient.clinicalInfo.temperature || 'Normal'}</strong>). Completed voice-guided intake in {lang.name}.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <h3 className="text-[10px] font-bold text-slate-600 uppercase tracking-wider flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  <span>Review of Systems (+ Positive Symptoms)</span>
                </h3>
                <ul className="space-y-1 text-xs">
                  {patient.clinicalInfo.associatedSymptoms.map((sym, i) => (
                    <li key={i} className="flex items-center space-x-1.5 text-slate-900 font-semibold">
                      <span className="w-1 h-1 rounded-full bg-teal-700"></span>
                      <span>{sym}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <h3 className="text-[10px] font-bold text-slate-600 uppercase tracking-wider flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  <span>Review of Systems (✕ Denied / Red Flags Excluded)</span>
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
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">
                  Known Comorbidities
                </h3>
                <p className="text-xs font-semibold text-slate-900">
                  {patient.clinicalInfo.existingConditions?.join(', ') || 'None reported'}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5 flex items-center space-x-1">
                  <Pill className="w-3 h-3 text-indigo-600" />
                  <span>Current Medications</span>
                </h3>
                <p className="text-xs font-semibold text-slate-900">
                  {patient.clinicalInfo.medicationsTaken.join(', ') || 'Paracetamol 650mg'}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">
                  Drug Allergies
                </h3>
                <p className="text-xs font-semibold text-red-700">
                  {patient.clinicalInfo.allergies || 'No known drug allergies'}
                </p>
              </div>
            </div>

            {/* Suggested Differential Diagnoses */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center space-x-1.5 text-slate-900 font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-teal-700" />
                <span>AI Clinical Differential Diagnostic Prompts (For Physician Evaluation)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="p-2 bg-white rounded-lg border border-slate-200">
                  <span className="font-bold text-slate-900 text-xs block">1. Acute Viral Pharyngitis / URI</span>
                  <span className="text-[10px] text-slate-500">ICD-10: J06.9 (High likelihood based on acute onset fever & headache)</span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-slate-200">
                  <span className="font-bold text-slate-900 text-xs block">2. Seasonal Acute Febrile Illness</span>
                  <span className="text-[10px] text-slate-500">ICD-10: R50.9 (Consider Dengue/Malaria NS1 antigen test if &gt; 4 days)</span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-slate-200">
                  <span className="font-bold text-slate-900 text-xs block">3. Uncontrolled Glycemia</span>
                  <span className="text-[10px] text-slate-500">HbA1c 9.4% in scanned labs; check urine ketones & fasting blood sugar</span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: AYUSH Dashavidha Pariksha */}
        {activeTab === 'ayush' && patient.ayushAssessment && (
          <div className="space-y-4 text-xs text-slate-800 animate-fadeIn">
            
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
              <div className="flex items-center space-x-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
                <Leaf className="w-4 h-4 text-amber-700" />
                <span>Ayurvedic Clinical Evaluation (दशविध परीक्षा एवं सम्प्राप्ति)</span>
              </div>
              <p className="text-xs text-amber-950 font-medium leading-relaxed">
                <strong>Samprapti Summary:</strong> {patient.ayushAssessment.sampraptiSummary}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              
              <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">1. Prakriti (Constitution)</span>
                <p className="text-xs font-bold text-slate-900">{patient.ayushAssessment.prakriti}</p>
                <p className="text-[10px] text-slate-500">Vikriti: {patient.ayushAssessment.vikriti}</p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">2. Agni (Digestive Capacity)</span>
                <p className="text-xs font-bold text-amber-900">{patient.ayushAssessment.agni} Agni</p>
                <p className="text-[10px] text-slate-500">Impaired digestion with Ama formation</p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">3. Koshtha (Bowel Nature)</span>
                <p className="text-xs font-bold text-amber-900">{patient.ayushAssessment.koshtha} Koshtha</p>
                <p className="text-[10px] text-slate-500">Hard stools / Vibandha tendency</p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">4. Sara & Samhanana</span>
                <p className="text-xs font-bold text-slate-900">{patient.ayushAssessment.sara} / {patient.ayushAssessment.samhanana}</p>
                <p className="text-[10px] text-slate-500">Sattva: {patient.ayushAssessment.sattva}</p>
              </div>

            </div>

            {/* Ahara-Vihara Assessment */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                Ahara-Vihara & Lifestyle History (आहार-विहार परीक्षण)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-semibold block">Diet & Water Intake:</span>
                  <span className="font-bold text-slate-800">{patient.ayushAssessment.aharaVihara.dietType} ({patient.ayushAssessment.aharaVihara.waterIntake})</span>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-semibold block">Sleep Pattern:</span>
                  <span className="font-bold text-slate-800">{patient.ayushAssessment.aharaVihara.sleepPattern}</span>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-semibold block">Nidana (Etiological Factors):</span>
                  <span className="font-bold text-slate-800">{patient.ayushAssessment.nidanaFactors.join(', ')}</span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Tab 3: Digitized Prior Records & Lab Intelligence */}
        {activeTab === 'documents' && (
          <div className="space-y-4 text-xs animate-fadeIn">
            
            {docs.length === 0 ? (
              <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-slate-500">
                No physical documents scanned for this patient.
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                
                {/* Left List of Docs */}
                <div className="lg:col-span-6 space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                    Scanned Medical Files ({docs.length})
                  </span>

                  {docs.map((doc, idx) => (
                    <div 
                      key={idx}
                      onClick={() => setSelectedDoc(doc)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        selectedDoc?.id === doc.id 
                          ? 'border-teal-700 bg-teal-50/40 ring-1 ring-teal-700' 
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-bold text-slate-900 text-xs">{doc.title}</h4>
                          <p className="text-[11px] text-slate-500 mt-0.5">{doc.clinicOrLab} • {doc.date}</p>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 uppercase">
                          {doc.type.replace('_', ' ')}
                        </span>
                      </div>

                      {doc.abnormalValues && doc.abnormalValues.length > 0 && (
                        <div className="mt-2.5 p-2 rounded-lg bg-red-50 border border-red-200 space-y-1">
                          <span className="text-[10px] font-bold text-red-800 flex items-center space-x-1">
                            <AlertTriangle className="w-3 h-3 text-red-600" />
                            <span>Out of Range Values Detected:</span>
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {doc.abnormalValues.map((ab, i) => (
                              <span key={i} className="text-[10px] font-bold text-red-700 bg-white border border-red-200 px-1.5 py-0.2 rounded">
                                {ab.parameter}: {ab.value} {ab.unit} ({ab.status.toUpperCase()})
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Right Raw OCR Preview */}
                <div className="lg:col-span-6 bg-slate-900 text-slate-100 rounded-xl p-4 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                    <span className="font-bold text-teal-400 flex items-center space-x-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>OCR Text & NLP Extractions ({selectedDoc ? selectedDoc.title : docs[0]?.title})</span>
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      OCR Confidence: {((selectedDoc || docs[0])?.ocrConfidence * 100).toFixed(0)}%
                    </span>
                  </div>

                  <pre className="font-mono text-[11px] leading-relaxed text-slate-300 whitespace-pre-wrap max-h-72 overflow-y-auto bg-slate-950 p-3 rounded-lg border border-slate-800">
                    {(selectedDoc || docs[0])?.ocrText}
                  </pre>
                </div>

              </div>
            )}

          </div>
        )}

        {/* Tab 4: e-Prescription & Treatment Plan */}
        {activeTab === 'rx' && (
          <div className="space-y-4 text-xs animate-fadeIn">
            
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center space-x-1.5">
                <Pill className="w-4 h-4 text-teal-700" />
                <span>e-Prescription & Drug Order (Room 204)</span>
              </h3>

              <div className="space-y-2">
                {prescriptions.map((rx, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200">
                    <span className="font-semibold text-slate-800">{rx}</span>
                    <button
                      onClick={() => setPrescriptions(prev => prev.filter((_, i) => i !== idx))}
                      className="text-red-500 hover:text-red-700 text-xs font-medium px-1.5"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <form onSubmit={handleAddRx} className="flex gap-2 pt-1">
                <input
                  type="text"
                  value={newRx}
                  onChange={(e) => setNewRx(e.target.value)}
                  placeholder="e.g. Tab. Azithromycin 500mg - 1 Tab OD x 3 days"
                  className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white focus:outline-none focus:border-teal-700"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-semibold flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Rx</span>
                </button>
              </form>
            </div>

            {/* Doctor Free-text Notes */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                Doctor Consultation Notes & Advice:
              </label>
              <textarea
                value={doctorClinicalNotes}
                onChange={(e) => setDoctorClinicalNotes(e.target.value)}
                rows={3}
                className="w-full p-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-teal-700"
              />
              <div className="flex justify-end pt-1">
                <button
                  onClick={handleFinalizeConsultation}
                  className="px-5 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-sm flex items-center space-x-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Save Consultation & Issue e-Prescription</span>
                </button>
              </div>
            </div>

          </div>
        )}

        {/* Tab 5: ABDM / FHIR Bundle */}
        {activeTab === 'fhir' && (
          <div className="space-y-3 text-xs animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-xs flex items-center space-x-1.5">
                <Code2 className="w-4 h-4 text-teal-700" />
                <span>FHIR R4 JSON Payload (Integrated with Ayushman Bharat Digital Mission)</span>
              </span>
              <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                HL7 FHIR Interoperability Standard
              </span>
            </div>

            <pre className="font-mono text-[11px] leading-relaxed text-emerald-400 bg-slate-950 p-4 rounded-xl border border-slate-800 max-h-96 overflow-y-auto whitespace-pre-wrap">
              {patient.fhirBundle?.fhirJson || JSON.stringify({
                resourceType: 'Bundle',
                id: `fhir-${patient.id}`,
                patient: patient.name,
                abhaId: patient.abhaProfile?.abhaId,
                department: patient.department
              }, null, 2)}
            </pre>
          </div>
        )}

      </div>

    </div>
  );
};
