import React, { useState, useRef, useEffect } from 'react';
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
  AlertTriangle,
  Clock,
  Calendar,
  ShieldCheck,
  User,
  Globe,
  AlertCircle,
  Send,
  HelpCircle,
  ExternalLink,
  Trash2,
  CheckSquare,
  Square,
  Copy,
  Edit3,
  X,
  PenTool,
  Save,
  RotateCcw,
  ArrowRight,
  Award,
  BadgeCheck,
  ChevronRight,
  Users
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { InPageFeedbackCard } from '../common/InPageFeedbackCard';
import { MedicalDocument, TimelineEvent, ClinicalInfo, Patient } from '../../types';

export const DoctorPatientSummary: React.FC = () => {
  const { 
    selectedDoctorPatient, 
    setSelectedDoctorPatient,
    patientQueue,
    activeDoctor,
    setCurrentScreen, 
    markPatientAsReviewed, 
    updateDoctorPatientClinicalInfo,
    completeAndSignConsultation,
    showToast,
    getLanguageDetails 
  } = useApp();

  const [consultationStarted, setConsultationStarted] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<MedicalDocument | null>(null);
  const [isFhirModalOpen, setIsFhirModalOpen] = useState(false);

  // Edit AI Report Modal State
  const [isEditReportOpen, setIsEditReportOpen] = useState(false);
  const [editChiefComplaint, setEditChiefComplaint] = useState('');
  const [editDuration, setEditDuration] = useState('');
  const [editSeverity, setEditSeverity] = useState('Moderate');
  const [editAssociatedSymptoms, setEditAssociatedSymptoms] = useState<string[]>([]);
  const [editDeniedSymptoms, setEditDeniedSymptoms] = useState<string[]>([]);
  const [editConditions, setEditConditions] = useState<string[]>([]);
  const [editMedications, setEditMedications] = useState<string[]>([]);
  const [editAllergies, setEditAllergies] = useState('');
  const [editTemperature, setEditTemperature] = useState('');
  const [editBloodPressure, setEditBloodPressure] = useState('');
  const [newSymptomInput, setNewSymptomInput] = useState('');
  const [newDeniedInput, setNewDeniedInput] = useState('');
  const [newConditionInput, setNewConditionInput] = useState('');
  const [newMedicationInput, setNewMedicationInput] = useState('');

  // Complete & Sign Modal State
  const [isSignModalOpen, setIsSignModalOpen] = useState(false);
  const [signDoctorName, setSignDoctorName] = useState(activeDoctor.name);
  const [signDoctorReg, setSignDoctorReg] = useState(activeDoctor.regNumber);
  const [signMethod, setSignMethod] = useState<'draw' | 'stamp'>('draw');
  const [isCertifiedChecked, setIsCertifiedChecked] = useState(true);
  const [signatureDrawn, setSignatureDrawn] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Doctor Interactive Inputs
  const [doctorClinicalNotes, setDoctorClinicalNotes] = useState(
    'Patient physically evaluated in OPD. Alert, oriented. Chest clear bilaterally, S1/S2 heard. Vital signs stable. Advised lifestyle modifications and adherence to prescribed regimen.'
  );
  const [prescriptions, setPrescriptions] = useState<string[]>([
    'Tab. Metformin 500mg - 1 Tab BD (after meals)',
    'Tab. Telmisartan 40mg - 1 Tab OD Morning'
  ]);
  const [newRx, setNewRx] = useState('');

  // Missing info checklist verification
  const [checkedGaps, setCheckedGaps] = useState<Record<string, boolean>>({});

  // Sync state when patient changes
  useEffect(() => {
    if (selectedDoctorPatient) {
      setEditChiefComplaint(selectedDoctorPatient.clinicalInfo.chiefComplaint || selectedDoctorPatient.chiefComplaint || '');
      setEditDuration(selectedDoctorPatient.clinicalInfo.duration || '3 days');
      setEditSeverity(selectedDoctorPatient.clinicalInfo.severity || 'Moderate');
      setEditAssociatedSymptoms(selectedDoctorPatient.clinicalInfo.associatedSymptoms || []);
      setEditDeniedSymptoms(selectedDoctorPatient.clinicalInfo.deniedSymptoms || []);
      setEditConditions(selectedDoctorPatient.clinicalInfo.existingConditions || []);
      setEditMedications(selectedDoctorPatient.clinicalInfo.medicationsTaken || []);
      setEditAllergies(selectedDoctorPatient.clinicalInfo.allergies || 'NKDA (No known drug allergies)');
      setEditTemperature(selectedDoctorPatient.clinicalInfo.temperature || '98.6°F');
      setEditBloodPressure(selectedDoctorPatient.clinicalInfo.bloodPressure || '120/80 mmHg');

      if (selectedDoctorPatient.doctorNotes) {
        setDoctorClinicalNotes(selectedDoctorPatient.doctorNotes);
      }
      if (selectedDoctorPatient.doctorPrescriptions && selectedDoctorPatient.doctorPrescriptions.length > 0) {
        setPrescriptions(selectedDoctorPatient.doctorPrescriptions);
      }
      if (selectedDoctorPatient.doctorReviewed) {
        setConsultationStarted(true);
      }
    }
  }, [selectedDoctorPatient]);

  if (!selectedDoctorPatient) {
    return (
      <div className="flex-1 p-8 text-center max-w-lg mx-auto my-12 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mx-auto">
          <Users className="w-7 h-7" />
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900">No Patient Selected</h2>
          <p className="text-xs text-slate-500 mt-1">
            Please choose a patient from the OPD queue to begin consultation.
          </p>
        </div>
        <button
          onClick={() => setCurrentScreen('doctor-dashboard')}
          className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition-all shadow-sm"
        >
          View Doctor Worklist Queue
        </button>
      </div>
    );
  }

  const patient = selectedDoctorPatient;
  const lang = getLanguageDetails(patient.language);
  const docs = patient.documents || [];
  const abnormalLabValues = docs.flatMap(d => d.abnormalValues || []);
  const timeline: TimelineEvent[] = patient.timelineEvents && patient.timelineEvents.length > 0
    ? patient.timelineEvents
    : docs.map((d, i) => ({
        id: `tl-${i}`,
        date: d.date,
        type: (d.type === 'lab_report' ? 'lab_report' : d.type === 'discharge_summary' ? 'procedure' : 'prescription') as TimelineEvent['type'],
        title: d.title,
        facility: d.clinicOrLab,
        summary: `Document digitized via Kiosk OCR (${d.abnormalValues?.length || 0} abnormal flags).`
      }));

  // Find next unreviewed patient in queue
  const nextPatientInQueue = patientQueue.find(p => !p.doctorReviewed && p.id !== patient.id);
  const unreviewedCount = patientQueue.filter(p => !p.doctorReviewed).length;

  const handleStartConsultation = () => {
    setConsultationStarted(true);
    showToast(`Consultation started with ${patient.name} by ${activeDoctor.name}.`);
  };

  const handleAddRx = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRx.trim()) return;
    setPrescriptions(prev => [...prev, newRx.trim()]);
    setNewRx('');
    showToast('Prescription item added.');
  };

  const handleRemoveRx = (index: number) => {
    setPrescriptions(prev => prev.filter((_, i) => i !== index));
  };

  // Open Edit AI Report Modal
  const handleOpenEditReport = () => {
    setEditChiefComplaint(patient.clinicalInfo.chiefComplaint || patient.chiefComplaint);
    setEditDuration(patient.clinicalInfo.duration || '3 days');
    setEditSeverity(patient.clinicalInfo.severity || 'Moderate');
    setEditAssociatedSymptoms([...(patient.clinicalInfo.associatedSymptoms || [])]);
    setEditDeniedSymptoms([...(patient.clinicalInfo.deniedSymptoms || [])]);
    setEditConditions([...(patient.clinicalInfo.existingConditions || [])]);
    setEditMedications([...(patient.clinicalInfo.medicationsTaken || [])]);
    setEditAllergies(patient.clinicalInfo.allergies || 'NKDA');
    setEditTemperature(patient.clinicalInfo.temperature || '98.6°F');
    setEditBloodPressure(patient.clinicalInfo.bloodPressure || '120/80 mmHg');
    setIsEditReportOpen(true);
  };

  // Save changes to AI Report
  const handleSaveReportChanges = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedClinicalInfo: Partial<ClinicalInfo> = {
      chiefComplaint: editChiefComplaint.trim(),
      duration: editDuration.trim(),
      severity: editSeverity,
      associatedSymptoms: editAssociatedSymptoms,
      deniedSymptoms: editDeniedSymptoms,
      existingConditions: editConditions,
      medicationsTaken: editMedications,
      allergies: editAllergies.trim(),
      temperature: editTemperature.trim(),
      bloodPressure: editBloodPressure.trim()
    };

    updateDoctorPatientClinicalInfo(patient.id, updatedClinicalInfo, {
      chiefComplaint: editChiefComplaint.trim()
    });

    setIsEditReportOpen(false);
  };

  // Tag helper functions
  const addTag = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, val: string, clearInput: () => void) => {
    if (!val.trim()) return;
    if (!list.includes(val.trim())) {
      setList([...list, val.trim()]);
    }
    clearInput();
  };

  const removeTag = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, index: number) => {
    setList(list.filter((_, i) => i !== index));
  };

  // Signature Canvas Handling
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    setSignatureDrawn(true);

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#0f766e';
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignatureDrawn(false);
  };

  // Complete, Sign & Auto-Load Next Patient
  const handleFinalizeAndLoadNext = () => {
    const res = completeAndSignConsultation(
      patient.id,
      doctorClinicalNotes,
      prescriptions,
      {
        doctorName: signDoctorName || activeDoctor.name,
        regNumber: signDoctorReg || activeDoctor.regNumber
      }
    );

    setIsSignModalOpen(false);

    if (res.nextPatient) {
      showToast(`✅ Consultation for ${patient.name} signed! Automatically loaded next patient: ${res.nextPatient.name} (#${res.nextPatient.tokenNumber}).`);
      setSelectedDoctorPatient(res.nextPatient);
      setConsultationStarted(false);
    } else {
      showToast(`🎉 Consultation completed for ${patient.name}! All patients in the queue have been reviewed.`);
    }
  };

  const toggleGapChecked = (gap: string) => {
    setCheckedGaps(prev => ({ ...prev, [gap]: !prev[gap] }));
  };

  const handlePushToHis = () => {
    showToast(`HL7 FHIR Bundle transmitted to Hospital EHR & ABDM Gateway by ${activeDoctor.name}.`);
  };

  const handleCopySoap = () => {
    const docName = patient.reviewedByDoctorName || activeDoctor.name;
    const docReg = patient.reviewedByDoctorReg || activeDoctor.regNumber;

    const soap = `PATIENT: ${patient.name} (${patient.id}, ${patient.age}y/${patient.gender})
TOKEN: #${patient.tokenNumber} | DEPT: ${patient.department.toUpperCase()}
ATTENDING PHYSICIAN: ${docName} (Reg: ${docReg})
CONSULTATION DATE: ${new Date().toLocaleDateString('en-GB')}

[SUBJECTIVE]
Chief Complaint: ${patient.clinicalInfo.chiefComplaint}
Duration: ${patient.clinicalInfo.duration} | Severity: ${patient.clinicalInfo.severity}
Reported Symptoms: ${patient.clinicalInfo.associatedSymptoms?.join(', ') || 'None reported'}
Denied Flags: ${patient.clinicalInfo.deniedSymptoms?.join(', ') || 'None'}
Comorbidities: ${patient.clinicalInfo.existingConditions?.join(', ') || 'None reported'}
Current Regimen: ${patient.clinicalInfo.medicationsTaken?.join(', ') || 'None reported'}
Drug Allergies: ${patient.clinicalInfo.allergies || 'NKDA'}

[OBJECTIVE]
Vitals: Temp ${patient.clinicalInfo.temperature || '98.6°F'}, Reported BP ${patient.clinicalInfo.bloodPressure || '120/80 mmHg'}
Physician Examination Notes: ${doctorClinicalNotes || 'Physical examination completed.'}
Abnormal Labs: ${abnormalLabValues.map(a => `${a.parameter}: ${a.value} ${a.unit} (${a.status})`).join('; ') || 'None flagged'}

[ASSESSMENT]
Clinical Correlation: ${patient.clinicalInfo.chiefComplaint}
Suggested Focus: ${patient.missingInformation?.join('; ') || 'Routine OPD examination'}

[PLAN]
Rx Orders:
${prescriptions.map((r, i) => `${i + 1}. ${r}`).join('\n')}

Certified & Signed by: ${docName}, ${activeDoctor.specialty} (Reg: ${docReg})
ABDM Tele-consult / OPD Gateway Certified`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(soap);
      showToast('Formatted SOAP Note with Doctor credentials copied to clipboard!');
    }
  };

  return (
    <div className="flex-1 p-3 sm:p-5 space-y-4 max-w-[1500px] mx-auto w-full animate-fadeIn">
      
      {/* Top Attending Doctor & Queue Status Banner */}
      <div className="bg-gradient-to-r from-teal-900 to-slate-900 text-white p-3 sm:p-4 rounded-2xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-teal-800/80 border border-teal-500/40 flex items-center justify-center text-teal-300 font-bold shrink-0">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-teal-300 uppercase tracking-wider">Attending Physician:</span>
              <span className="text-sm font-extrabold text-white">{activeDoctor.name}</span>
              <span className="text-[10px] font-mono bg-teal-950/80 text-teal-300 px-2 py-0.5 rounded border border-teal-700">
                Reg: {activeDoctor.regNumber}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              {activeDoctor.specialty} • {activeDoctor.roomNumber}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-xs self-start md:self-auto">
          <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 flex items-center space-x-2">
            <Users className="w-3.5 h-3.5 text-teal-300" />
            <span>Queue: <strong>{unreviewedCount} waiting</strong></span>
          </div>
          {nextPatientInQueue && (
            <button
              onClick={() => {
                setSelectedDoctorPatient(nextPatientInQueue);
                setConsultationStarted(false);
                showToast(`Switched to next patient: ${nextPatientInQueue.name}`);
              }}
              className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold flex items-center space-x-1.5 transition-all shadow-sm"
              title="Peek next patient"
            >
              <span>Next: {nextPatientInQueue.name} (#{nextPatientInQueue.tokenNumber})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Navigation Bar & Primary Consultation Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-200">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => setCurrentScreen('doctor-dashboard')}
            className="inline-flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-xs transition-colors shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Queue</span>
          </button>
          <span className="text-slate-300 hidden sm:inline">|</span>
          <span className="text-xs font-bold text-slate-900">{patient.name}</span>
          <span className="px-2 py-0.5 rounded bg-slate-900 text-white font-mono text-[10px] font-bold">
            #{patient.tokenNumber}
          </span>
          <span className="px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200 text-[10px] font-bold uppercase tracking-wider">
            {patient.department === 'ayush' ? 'AYUSH' : 'Medicine'}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Edit AI Report Action */}
          <button
            onClick={handleOpenEditReport}
            className="p-1.5 px-3 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-300 text-xs font-bold flex items-center space-x-1.5 transition-all shadow-2xs"
            title="Edit and refine AI intake findings"
          >
            <Edit3 className="w-3.5 h-3.5 text-teal-700" />
            <span>Edit AI Report</span>
          </button>

          <button
            onClick={handleCopySoap}
            className="p-1.5 px-3 rounded-lg bg-white hover:bg-teal-50 text-teal-900 border border-teal-200 text-xs font-semibold flex items-center space-x-1.5 transition-colors shadow-2xs"
            title="Copy formatted SOAP note to clipboard"
          >
            <Copy className="w-3.5 h-3.5 text-teal-700" />
            <span>Copy SOAP</span>
          </button>

          <button
            onClick={() => window.print()}
            className="p-1.5 px-3 rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-medium flex items-center space-x-1.5 transition-colors shadow-2xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Chart</span>
          </button>

          <button
            onClick={() => setCurrentScreen('doctor-conversation')}
            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-teal-700" />
            <span>Transcript ({patient.conversation?.length || 0})</span>
          </button>

          {/* Consultation Active / Start */}
          {!consultationStarted ? (
            <button
              onClick={handleStartConsultation}
              className="px-3.5 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-2xs transition-all flex items-center space-x-1.5"
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Start Consult</span>
            </button>
          ) : (
            <div className="px-3 py-1.5 rounded-lg bg-emerald-700 text-white font-bold text-xs flex items-center space-x-1.5 shadow-2xs">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Consult In Progress</span>
            </div>
          )}

          {/* Complete & Sign Action */}
          {!patient.doctorReviewed ? (
            <button
              onClick={() => setIsSignModalOpen(true)}
              className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all flex items-center space-x-1.5 border border-slate-700 animate-pulse"
            >
              <PenTool className="w-3.5 h-3.5 text-emerald-400" />
              <span>Complete & Sign Consultation</span>
            </button>
          ) : (
            <div className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold text-xs flex items-center space-x-1.5 shadow-2xs">
              <BadgeCheck className="w-4 h-4 text-emerald-600" />
              <span>Signed by {patient.reviewedByDoctorName || activeDoctor.name}</span>
            </div>
          )}
        </div>
      </div>

      {/* Signed Status Banner if completed */}
      {patient.doctorReviewed && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Consultation Finalized & Signed:</strong> Reviewed by <strong>{patient.reviewedByDoctorName || activeDoctor.name}</strong> (Reg: {patient.reviewedByDoctorReg || activeDoctor.regNumber}) on {patient.signatureTimestamp || 'Today'}. Prescription and EHR sync locked.
            </span>
          </div>
          {nextPatientInQueue && (
            <button
              onClick={() => {
                setSelectedDoctorPatient(nextPatientInQueue);
                setConsultationStarted(false);
              }}
              className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg transition-colors flex items-center space-x-1 shrink-0 ml-2"
            >
              <span>Next Patient</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      )}

      {/* 3-COLUMN CLINICAL WORKSTATION GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        
        {/* ========================================================= */}
        {/* LEFT COLUMN: Patient Identity, Vitals & Longitudinal History */}
        {/* ========================================================= */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Patient Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-white text-base shadow-sm ${
                  patient.department === 'ayush' ? 'bg-amber-700' : 'bg-teal-700'
                }`}>
                  {patient.department === 'ayush' ? <Leaf className="w-6 h-6" /> : <User className="w-6 h-6" />}
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900 leading-tight">{patient.name}</h2>
                  <p className="text-[11px] font-mono text-slate-400 mt-0.5">{patient.id}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-100">
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Demographics</span>
                <span className="font-bold text-slate-800">{patient.age}y • {patient.gender}</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Intake Language</span>
                <span className="font-bold text-teal-800 truncate block">{lang.name}</span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-semibold uppercase">ABHA Profile</span>
                <span className="px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                  Verified
                </span>
              </div>
              <div className="font-mono text-[11px] text-slate-700 font-semibold truncate">
                {patient.abhaProfile?.abhaId || '91-8273-9182-4019'}
              </div>
              <div className="text-[10px] text-slate-400 truncate">
                Address: {patient.abhaProfile?.address || 'Patna, Bihar'}
              </div>
            </div>

            {/* Vitals Check-in Card */}
            <div className="p-2.5 rounded-lg bg-teal-50/50 border border-teal-200 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-900 block">
                  Intake Vitals
                </span>
                <button
                  onClick={handleOpenEditReport}
                  className="text-[10px] text-teal-700 font-bold hover:underline flex items-center space-x-0.5"
                >
                  <Edit3 className="w-2.5 h-2.5" />
                  <span>Edit</span>
                </button>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <div className="bg-white p-1.5 rounded border border-teal-200">
                  <span className="text-[9px] text-slate-400 block">Temp</span>
                  <span className="font-bold text-slate-800 text-[11px]">
                    {patient.clinicalInfo.temperature || '98.6°F'}
                  </span>
                </div>
                <div className="bg-white p-1.5 rounded border border-teal-200">
                  <span className="text-[9px] text-slate-400 block">Reported BP</span>
                  <span className="font-bold text-slate-800 text-[11px]">{patient.clinicalInfo.bloodPressure || '138/86 mmHg'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Longitudinal Medical Timeline */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
                <Calendar className="w-3.5 h-3.5 text-teal-700" />
                <span>Health Timeline</span>
              </h3>
              <span className="text-[10px] font-mono text-slate-400 font-bold">{timeline.length} Events</span>
            </div>

            <div className="relative pl-4 space-y-3 before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {timeline.map((evt, idx) => (
                <div key={evt.id || idx} className="relative text-xs space-y-0.5">
                  <div className="absolute -left-4 top-1 w-2.5 h-2.5 rounded-full bg-teal-700 ring-2 ring-white"></div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold font-mono text-teal-800">{evt.date}</span>
                    <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-semibold uppercase text-[9px]">
                      {evt.type}
                    </span>
                  </div>
                  <div className="font-bold text-slate-900 text-[11px] leading-tight">{evt.title}</div>
                  <div className="text-[10px] text-slate-500">{evt.facility}</div>
                  {evt.summary && (
                    <div className="text-[10px] text-slate-600 leading-tight bg-slate-50 p-1.5 rounded border border-slate-200">
                      {evt.summary}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ========================================================= */}
        {/* CENTER COLUMN: Structured Summary & Clinical Orders */}
        {/* ========================================================= */}
        <div className="lg:col-span-6 space-y-4">
          
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-5">
            
            {/* Chief Complaint & HPI Header */}
            <div className="pb-4 border-b border-slate-200 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  Chief Complaint & HPI
                </span>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] text-slate-400 font-mono">Intake: {patient.intakeTimestamp}</span>
                  <button
                    onClick={handleOpenEditReport}
                    className="text-xs font-bold text-teal-700 hover:text-teal-900 bg-teal-50 hover:bg-teal-100 px-2 py-0.5 rounded border border-teal-200 flex items-center space-x-1"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Edit Report</span>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-bold text-slate-900">
                  Chief Complaint: <span className="text-teal-900 font-extrabold">{patient.clinicalInfo.chiefComplaint}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Duration</span>
                    <span className="font-bold text-slate-800">{patient.clinicalInfo.duration}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Severity</span>
                    <span className="font-bold text-slate-800">{patient.clinicalInfo.severity}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Intake Mode</span>
                    <span className="font-bold text-slate-800 capitalize">{patient.inputModality || 'Voice / Touch'}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Language</span>
                    <span className="font-bold text-teal-800">{lang.name}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Review of Systems (+ Positive & ✕ Denied) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  Review of Systems
                </span>
                <button
                  onClick={handleOpenEditReport}
                  className="text-[10px] text-teal-700 font-semibold hover:underline"
                >
                  Adjust Symptoms
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="flex items-center space-x-1.5 text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    <span>Reported Symptoms</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {patient.clinicalInfo.associatedSymptoms?.map((sym, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-white text-slate-900 border border-slate-200 text-xs font-semibold">
                        + {sym}
                      </span>
                    )) || <span className="text-slate-400 text-xs">None reported</span>}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="flex items-center space-x-1.5 text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                    <span>Excluded / Denied Flags</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {patient.clinicalInfo.deniedSymptoms?.map((sym, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-white text-slate-500 border border-slate-200 text-xs font-medium">
                        ✕ No {sym}
                      </span>
                    )) || <span className="text-slate-400 text-xs">None excluded</span>}
                  </div>
                </div>
              </div>
            </div>

            {/* Comorbidities, Current Meds, Allergies */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  Medical History & Allergies
                </span>
                <button
                  onClick={handleOpenEditReport}
                  className="text-[10px] text-teal-700 font-semibold hover:underline"
                >
                  Edit History
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Comorbidities</span>
                  <p className="font-bold text-slate-900">
                    {patient.clinicalInfo.existingConditions?.join(', ') || 'No chronic illness reported'}
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Current Regimen</span>
                  <p className="font-bold text-slate-900">
                    {patient.clinicalInfo.medicationsTaken?.join(', ') || 'None reported'}
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Drug Allergies</span>
                  <p className={`font-bold ${patient.clinicalInfo.allergies && !patient.clinicalInfo.allergies.toLowerCase().includes('none') ? 'text-red-700' : 'text-slate-800'}`}>
                    {patient.clinicalInfo.allergies || 'NKDA (No known allergies)'}
                  </p>
                </div>
              </div>
            </div>

            {/* AYUSH Dashavidha Pariksha (Rendered if AYUSH case) */}
            {patient.department === 'ayush' && patient.ayushAssessment && (
              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 flex items-center space-x-1.5">
                    <Leaf className="w-3.5 h-3.5 text-amber-700" />
                    <span>AYUSH Assessment (Dashavidha Pariksha)</span>
                  </span>
                  <span className="text-[10px] font-mono text-amber-800 font-bold">Kayachikitsa</span>
                </div>

                <div className="p-2 rounded bg-white border border-amber-200 text-amber-950 font-medium leading-relaxed text-[11px]">
                  <strong>Samprapti:</strong> {patient.ayushAssessment.sampraptiSummary}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="p-2 bg-white rounded border border-amber-200">
                    <span className="text-[9px] text-slate-400 block font-semibold">Prakriti</span>
                    <span className="font-bold text-slate-900 text-xs">{patient.ayushAssessment.prakriti}</span>
                  </div>
                  <div className="p-2 bg-white rounded border border-amber-200">
                    <span className="text-[9px] text-slate-400 block font-semibold">Agni</span>
                    <span className="font-bold text-amber-900 text-xs">{patient.ayushAssessment.agni}</span>
                  </div>
                  <div className="p-2 bg-white rounded border border-amber-200">
                    <span className="text-[9px] text-slate-400 block font-semibold">Koshtha</span>
                    <span className="font-bold text-amber-900 text-xs">{patient.ayushAssessment.koshtha}</span>
                  </div>
                  <div className="p-2 bg-white rounded border border-amber-200">
                    <span className="text-[9px] text-slate-400 block font-semibold">Sara / Sattva</span>
                    <span className="font-bold text-slate-900 text-xs">{patient.ayushAssessment.sara} / {patient.ayushAssessment.sattva}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Doctor Objective & Physical Exam Notes (Editable) */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
                <span>Physician Examination & Clinical Notes</span>
                <span className="text-[9px] text-teal-700 font-semibold font-mono">By: {activeDoctor.name}</span>
              </label>
              <textarea
                value={doctorClinicalNotes}
                onChange={(e) => setDoctorClinicalNotes(e.target.value)}
                rows={3}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white focus:outline-none focus:border-teal-700 font-sans leading-relaxed"
                placeholder="Enter physical examination findings, system-specific signs, and clinical impressions..."
              />
            </div>

            {/* Management Plan & e-Prescription */}
            <div className="space-y-3 pt-2 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-900 flex items-center space-x-1.5">
                  <Pill className="w-3.5 h-3.5 text-teal-700" />
                  <span>Management Plan & e-Prescription</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">{prescriptions.length} items ordered</span>
              </div>

              <div className="space-y-1.5">
                {prescriptions.map((rx, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                    <span className="font-semibold text-slate-900">{rx}</span>
                    <button
                      onClick={() => handleRemoveRx(idx)}
                      className="text-red-500 hover:text-red-700 p-1 transition-colors"
                      title="Remove prescription"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <form onSubmit={handleAddRx} className="flex gap-2">
                <input
                  type="text"
                  value={newRx}
                  onChange={(e) => setNewRx(e.target.value)}
                  placeholder="e.g. Tab. Azithromycin 500mg - 1 Tab OD x 3 days"
                  className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white focus:outline-none focus:border-teal-700"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-semibold flex items-center space-x-1 shadow-2xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Rx</span>
                </button>
              </form>

              {/* Quick Regimen Presets */}
              <div className="space-y-1 pt-1">
                <span className="text-[10px] text-slate-400 font-semibold uppercase block">Quick Add Regimen Presets:</span>
                <div className="flex flex-wrap gap-1">
                  {[
                    'Tab. Paracetamol 650mg TDS x 3d',
                    'Tab. Metformin 500mg BD (Post-Meal)',
                    'Tab. Telmisartan 40mg OD (Morning)',
                    'Order CBC + Dengue NS1 & Malarial Antigen',
                    'Fasting & PP Blood Sugar Review in 1 wk'
                  ].map((preset, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setPrescriptions(prev => [...prev, preset]);
                        showToast(`Added: ${preset}`);
                      }}
                      className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-teal-50 hover:text-teal-800 hover:border-teal-200 border border-slate-200 text-[10px] font-medium text-slate-700 transition-all flex items-center space-x-1 cursor-pointer"
                    >
                      <Plus className="w-2.5 h-2.5" />
                      <span>{preset}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Complete & Sign Button */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Prescribing Physician: <strong>{activeDoctor.name}</strong>
              </span>
              <button
                onClick={() => setIsSignModalOpen(true)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md flex items-center space-x-1.5 transition-all"
              >
                <PenTool className="w-4 h-4 text-emerald-400" />
                <span>Sign, Close & Load Next Patient</span>
              </button>
            </div>

          </div>

        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: Clinical Alerts, Lab Flags, Gaps & FHIR */}
        {/* ========================================================= */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Clinical Alerts / Red Flag Banner */}
          {((patient.redFlags && patient.redFlags.length > 0) || patient.priority === 'Urgent') && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-950 text-xs space-y-2 animate-pulse">
              <div className="flex items-center space-x-1.5 font-bold text-red-900">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                <span>Urgent Clinical Alert</span>
              </div>
              <p className="text-[11px] text-red-900 leading-relaxed font-semibold">
                {patient.redFlagReason || 'Acute symptoms detected. Immediate physician review recommended.'}
              </p>
            </div>
          )}

          {/* Exam Prompts & History Gaps */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-1">
                <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>Exam Prompts & History Gaps</span>
              </span>
              {patient.missingInformation && patient.missingInformation.length > 0 && (
                <button
                  onClick={() => {
                    const all: Record<string, boolean> = {};
                    patient.missingInformation?.forEach(g => { all[g] = true; });
                    setCheckedGaps(all);
                    showToast('All recommended physical checks marked complete.');
                  }}
                  className="text-[10px] font-semibold text-teal-700 hover:text-teal-900 transition-colors"
                >
                  Mark All
                </button>
              )}
            </div>

            {patient.missingInformation && patient.missingInformation.length > 0 ? (
              <div className="space-y-1.5">
                {patient.missingInformation.map((gap, i) => {
                  const isChecked = !!checkedGaps[gap];
                  return (
                    <div 
                      key={i} 
                      onClick={() => toggleGapChecked(gap)}
                      className={`p-2 rounded-lg border text-xs cursor-pointer flex items-start space-x-2 transition-all ${
                        isChecked ? 'bg-emerald-50/60 border-emerald-200 text-slate-500 line-through' : 'bg-amber-50/40 border-amber-200 text-slate-800'
                      }`}
                    >
                      {isChecked ? (
                        <CheckSquare className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <Square className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      )}
                      <span className="text-[11px] leading-tight">{gap}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-[11px] text-emerald-700 font-medium py-1">
                ✓ Comprehensive history collected with no recorded omissions.
              </div>
            )}
          </div>

          {/* Abnormal Lab Findings Gallery */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                <span>Abnormal Lab Findings</span>
              </span>
              <span className="text-[10px] font-mono text-red-700 font-bold bg-red-50 px-2 py-0.5 rounded border border-red-200">
                {abnormalLabValues.length} Flags
              </span>
            </div>

            {abnormalLabValues.length > 0 ? (
              <div className="space-y-2">
                {abnormalLabValues.map((ab, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-red-50/40 border border-red-200 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-[11px]">{ab.parameter}</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border uppercase ${
                        ab.status === 'critical' ? 'bg-red-600 text-white border-red-700 font-extrabold' : 'bg-white text-red-700 border-red-200 font-bold'
                      }`}>
                        {ab.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-700">Value: <strong className="text-red-700 font-mono text-xs">{ab.value} {ab.unit}</strong></span>
                      <span className="text-[10px] text-slate-400 font-mono">Ref: {ab.referenceRange}</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden flex">
                      <div className="bg-emerald-500 h-full w-[45%]" title="Normal range"></div>
                      <div className="bg-amber-400 h-full w-[25%]" title="Borderline"></div>
                      <div className="bg-red-500 h-full w-[30%]" title="Critical high"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-slate-500">No abnormal values flagged in scanned lab records.</p>
            )}
          </div>

          {/* Scanned Documents Gallery */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-1">
                <FileCheck2 className="w-3.5 h-3.5 text-teal-700" />
                <span>Digitized Records ({docs.length})</span>
              </span>
            </div>

            {docs.length === 0 ? (
              <p className="text-[11px] text-slate-400">No documents scanned at intake.</p>
            ) : (
              <div className="space-y-1.5">
                {docs.map((doc, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setSelectedDoc(selectedDoc?.id === doc.id ? null : doc)}
                    className={`p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                      selectedDoc?.id === doc.id ? 'bg-teal-50 border-teal-300 ring-1 ring-teal-500' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-[11px] truncate">{doc.title}</span>
                      <span className="text-[9px] font-mono text-slate-500">{doc.date}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 block mt-0.5">{doc.clinicOrLab}</span>
                    
                    {selectedDoc?.id === doc.id && (
                      <div className="mt-2 pt-2 border-t border-teal-200 space-y-1 text-[10px] font-mono text-slate-700 bg-white p-2 rounded">
                        <span className="font-bold text-teal-800 block">OCR Extracted Text ({(doc.ocrConfidence * 100).toFixed(0)}% conf):</span>
                        <div className="max-h-28 overflow-y-auto whitespace-pre-wrap leading-tight text-slate-600">
                          {doc.ocrText}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* FHIR & EMR Integration Card */}
          <div className="bg-slate-900 text-white rounded-xl p-4 shadow-sm space-y-2.5 border border-slate-800">
            <div className="flex items-center justify-between pb-1 border-b border-slate-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 flex items-center space-x-1">
                <Code2 className="w-3.5 h-3.5" />
                <span>HL7 FHIR R4 Bundle</span>
              </span>
              <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-800">
                ABDM Standard
              </span>
            </div>

            <p className="text-[11px] text-slate-300 leading-relaxed">
              Synthesized pre-consultation intake bundle containing Patient, Condition, and Observation resources ready for EHR synchronization.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => setIsFhirModalOpen(true)}
                className="flex-1 py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition-colors flex items-center justify-center space-x-1"
              >
                <Code2 className="w-3 h-3 text-teal-400" />
                <span>View JSON</span>
              </button>

              <button
                onClick={handlePushToHis}
                className="flex-1 py-1.5 px-2 bg-teal-700 hover:bg-teal-600 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center space-x-1 shadow-2xs"
              >
                <Send className="w-3 h-3" />
                <span>Push to HIS</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* In-Page Zomato-Style Doctor Clinical Precision Feedback */}
      <InPageFeedbackCard
        type="doctor"
        patientName={patient.name}
        tokenNumber={patient.tokenNumber}
        doctorName={activeDoctor.name}
        className="my-2"
        defaultExpanded={false}
      />

      {/* ========================================================= */}
      {/* MODAL 1: EDIT AI INTAKE REPORT DURING CONSULTATION */}
      {/* ========================================================= */}
      {isEditReportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            
            {/* Header */}
            <div className="p-4 bg-teal-900 text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Edit3 className="w-5 h-5 text-teal-300" />
                <div>
                  <h3 className="text-sm font-bold text-white">Edit AI Intake Report — {patient.name}</h3>
                  <p className="text-[11px] text-teal-200">Modify patient-reported symptoms, duration, vitals, and medical history</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditReportOpen(false)}
                className="p-1 rounded-lg text-teal-200 hover:text-white hover:bg-teal-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSaveReportChanges} className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs">
              
              {/* Chief Complaint */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800 block">Chief Complaint</label>
                <input
                  type="text"
                  required
                  value={editChiefComplaint}
                  onChange={(e) => setEditChiefComplaint(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-teal-700 text-xs text-slate-900 font-semibold"
                  placeholder="e.g. Acute fever, headache, body malaise"
                />
              </div>

              {/* Duration & Severity */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800 block">Duration</label>
                  <input
                    type="text"
                    value={editDuration}
                    onChange={(e) => setEditDuration(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-teal-700 text-xs"
                    placeholder="e.g. 3 days / 2 weeks"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800 block">Severity</label>
                  <select
                    value={editSeverity}
                    onChange={(e) => setEditSeverity(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-teal-700 text-xs font-semibold"
                  >
                    <option value="Mild">Mild</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Severe">Severe</option>
                    <option value="High (Febrile)">High (Febrile)</option>
                    <option value="Urgent (Acute)">Urgent (Acute)</option>
                  </select>
                </div>
              </div>

              {/* Intake Vitals */}
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 block">Temperature</label>
                  <input
                    type="text"
                    value={editTemperature}
                    onChange={(e) => setEditTemperature(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded border border-slate-300 bg-white text-xs"
                    placeholder="98.6°F"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 block">Reported BP</label>
                  <input
                    type="text"
                    value={editBloodPressure}
                    onChange={(e) => setEditBloodPressure(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded border border-slate-300 bg-white text-xs"
                    placeholder="120/80 mmHg"
                  />
                </div>
              </div>

              {/* Reported Associated Symptoms */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 block">Reported Symptoms (+ Positive)</label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {editAssociatedSymptoms.map((sym, idx) => (
                    <span key={idx} className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-900 font-semibold text-[11px]">
                      <span>+ {sym}</span>
                      <button type="button" onClick={() => removeTag(editAssociatedSymptoms, setEditAssociatedSymptoms, idx)} className="text-emerald-700 hover:text-red-700 ml-1">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSymptomInput}
                    onChange={(e) => setNewSymptomInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag(editAssociatedSymptoms, setEditAssociatedSymptoms, newSymptomInput, () => setNewSymptomInput(''));
                      }
                    }}
                    placeholder="Add symptom (e.g. Nausea, Chills)..."
                    className="flex-1 px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => addTag(editAssociatedSymptoms, setEditAssociatedSymptoms, newSymptomInput, () => setNewSymptomInput(''))}
                    className="px-3 py-1.5 bg-slate-800 text-white rounded-lg text-xs font-bold"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Excluded / Denied Symptoms */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 block">Excluded / Denied Flags (✕ Negative)</label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {editDeniedSymptoms.map((sym, idx) => (
                    <span key={idx} className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-300 text-slate-700 font-medium text-[11px]">
                      <span>✕ No {sym}</span>
                      <button type="button" onClick={() => removeTag(editDeniedSymptoms, setEditDeniedSymptoms, idx)} className="text-slate-500 hover:text-red-700 ml-1">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newDeniedInput}
                    onChange={(e) => setNewDeniedInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag(editDeniedSymptoms, setEditDeniedSymptoms, newDeniedInput, () => setNewDeniedInput(''));
                      }
                    }}
                    placeholder="Add denied flag (e.g. Chest pain, Cough)..."
                    className="flex-1 px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => addTag(editDeniedSymptoms, setEditDeniedSymptoms, newDeniedInput, () => setNewDeniedInput(''))}
                    className="px-3 py-1.5 bg-slate-800 text-white rounded-lg text-xs font-bold"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Comorbidities & Regimen */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 block">Comorbidities</label>
                  <div className="flex flex-wrap gap-1 mb-1.5">
                    {editConditions.map((cond, idx) => (
                      <span key={idx} className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-800 text-[10px]">
                        <span>{cond}</span>
                        <button type="button" onClick={() => removeTag(editConditions, setEditConditions, idx)}><X className="w-2.5 h-2.5" /></button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      value={newConditionInput}
                      onChange={(e) => setNewConditionInput(e.target.value)}
                      placeholder="Add condition (e.g. Type 2 DM)..."
                      className="flex-1 px-2 py-1 text-xs rounded border border-slate-300"
                    />
                    <button
                      type="button"
                      onClick={() => addTag(editConditions, setEditConditions, newConditionInput, () => setNewConditionInput(''))}
                      className="px-2.5 py-1 bg-slate-700 text-white rounded text-xs"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 block">Drug Allergies</label>
                  <input
                    type="text"
                    value={editAllergies}
                    onChange={(e) => setEditAllergies(e.target.value)}
                    placeholder="e.g. Penicillin, Sulfa drugs, NKDA"
                    className="w-full px-2.5 py-1.5 rounded border border-slate-300 text-xs"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditReportOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-sm flex items-center space-x-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save AI Report Changes</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: COMPLETE CONSULTATION, DIGITAL SIGNATURE & NEXT */}
      {/* ========================================================= */}
      {isSignModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden flex flex-col">
            
            {/* Modal Header */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-700 flex items-center justify-center text-white">
                  <PenTool className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold">Sign & Complete OPD Consultation</h3>
                  <p className="text-[11px] text-slate-400">Patient: {patient.name} (Token #{patient.tokenNumber})</p>
                </div>
              </div>
              <button
                onClick={() => setIsSignModalOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-5 space-y-4 text-xs bg-slate-50">
              
              {/* Doctor Details Confirmation */}
              <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Attending Physician Credentials
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-500 font-semibold block">Doctor Name</label>
                    <input
                      type="text"
                      value={signDoctorName}
                      onChange={(e) => setSignDoctorName(e.target.value)}
                      className="w-full px-2 py-1 rounded border border-slate-300 font-bold text-slate-900 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 font-semibold block">Reg. Number</label>
                    <input
                      type="text"
                      value={signDoctorReg}
                      onChange={(e) => setSignDoctorReg(e.target.value)}
                      className="w-full px-2 py-1 rounded border border-slate-300 font-mono text-slate-900 text-xs"
                    />
                  </div>
                </div>
                <p className="text-[10px] text-slate-400">
                  {activeDoctor.specialty} • {activeDoctor.roomNumber}
                </p>
              </div>

              {/* Consultation Summary Highlights */}
              <div className="p-3 bg-teal-50/60 rounded-xl border border-teal-200 text-teal-950 space-y-1">
                <div className="flex items-center justify-between font-bold">
                  <span>Dx / Chief Complaint:</span>
                  <span className="text-teal-900">{patient.clinicalInfo.chiefComplaint}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-600">
                  <span>Prescriptions Ordered:</span>
                  <span className="font-bold text-slate-800">{prescriptions.length} items</span>
                </div>
              </div>

              {/* Digital Signature Mode Switch */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 flex items-center space-x-1.5">
                    <PenTool className="w-3.5 h-3.5 text-teal-700" />
                    <span>Physician Digital Signature</span>
                  </label>
                  <div className="flex items-center space-x-1 text-[11px]">
                    <button
                      type="button"
                      onClick={() => setSignMethod('draw')}
                      className={`px-2 py-0.5 rounded font-semibold ${signMethod === 'draw' ? 'bg-teal-700 text-white' : 'bg-slate-200 text-slate-700'}`}
                    >
                      Draw Pad
                    </button>
                    <button
                      type="button"
                      onClick={() => setSignMethod('stamp')}
                      className={`px-2 py-0.5 rounded font-semibold ${signMethod === 'stamp' ? 'bg-teal-700 text-white' : 'bg-slate-200 text-slate-700'}`}
                    >
                      ABDM Seal
                    </button>
                  </div>
                </div>

                {signMethod === 'draw' ? (
                  <div className="relative bg-white rounded-xl border-2 border-dashed border-slate-300 p-2 text-center">
                    <canvas
                      ref={canvasRef}
                      width={380}
                      height={90}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      onTouchStart={startDrawing}
                      onTouchMove={draw}
                      onTouchEnd={stopDrawing}
                      className="w-full h-24 bg-white rounded cursor-crosshair touch-none"
                    />
                    {!signatureDrawn && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-slate-400 text-xs">
                        ✍️ Draw signature with mouse or touch
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={clearSignature}
                      className="absolute top-2 right-2 text-[10px] text-slate-400 hover:text-red-600 bg-slate-100 hover:bg-red-50 px-1.5 py-0.5 rounded"
                    >
                      Clear
                    </button>
                  </div>
                ) : (
                  <div className="p-3 bg-white rounded-xl border-2 border-teal-600 flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <Award className="w-6 h-6 text-teal-700" />
                      <div>
                        <p className="font-bold text-slate-900 text-xs">Verified ABDM Digital Clinician Seal</p>
                        <p className="text-[10px] font-mono text-teal-800 font-bold">{signDoctorName} ({signDoctorReg})</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      AUTHENTICATED
                    </span>
                  </div>
                )}
              </div>

              {/* Certification Checkbox */}
              <label className="flex items-start space-x-2 text-[11px] text-slate-600 cursor-pointer p-1">
                <input
                  type="checkbox"
                  checked={isCertifiedChecked}
                  onChange={(e) => setIsCertifiedChecked(e.target.checked)}
                  className="rounded border-slate-300 text-teal-700 focus:ring-teal-500 mt-0.5"
                />
                <span>
                  I certify that I have conducted this physical OPD evaluation, verified the intake history, and authorized the prescription orders.
                </span>
              </label>

              {/* Next Patient Preview Notice */}
              <div className="p-2.5 rounded-lg bg-slate-200/70 border border-slate-300 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">Auto-Load Next in Queue:</span>
                {nextPatientInQueue ? (
                  <span className="font-bold text-teal-900 bg-white px-2 py-0.5 rounded border border-slate-300">
                    {nextPatientInQueue.name} (#{nextPatientInQueue.tokenNumber})
                  </span>
                ) : (
                  <span className="font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-slate-300">
                    Queue Complete (Last Patient)
                  </span>
                )}
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsSignModalOpen(false)}
                className="px-3.5 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-xs"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={!isCertifiedChecked}
                onClick={handleFinalizeAndLoadNext}
                className="px-5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white font-bold text-xs shadow-md flex items-center space-x-1.5 transition-all"
              >
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Sign, Close & Load Next Patient</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* FHIR Modal */}
      {isFhirModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-950 text-emerald-400 rounded-2xl max-w-2xl w-full p-5 shadow-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Code2 className="w-4 h-4 text-teal-400" />
                <h3 className="text-sm font-bold text-white">HL7 FHIR R4 Clinical Bundle Payload</h3>
              </div>
              <button
                onClick={() => setIsFhirModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs font-bold px-2 py-1"
              >
                ✕
              </button>
            </div>

            <pre className="font-mono text-[11px] leading-relaxed bg-black/80 p-3 rounded-xl border border-slate-800 max-h-96 overflow-y-auto whitespace-pre-wrap text-emerald-300">
              {patient.fhirBundle?.fhirJson || JSON.stringify({
                resourceType: 'Bundle',
                type: 'document',
                id: `bundle-medikiosk-${patient.id}`,
                timestamp: new Date().toISOString(),
                patient: patient.name,
                attendingDoctor: activeDoctor.name,
                doctorReg: activeDoctor.regNumber,
                abhaId: patient.abhaProfile?.abhaId,
                department: patient.department
              }, null, 2)}
            </pre>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setIsFhirModalOpen(false)}
                className="px-4 py-1.5 bg-teal-700 text-white rounded-lg text-xs font-semibold"
              >
                Close Payload
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
