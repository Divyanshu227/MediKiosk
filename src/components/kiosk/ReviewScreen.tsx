import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Edit3, 
  Check, 
  User, 
  Activity, 
  AlertCircle, 
  ShieldCheck, 
  CheckCircle2, 
  FileSpreadsheet,
  FileText,
  AlertTriangle,
  Leaf,
  Stethoscope
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ReviewScreen: React.FC = () => {
  const { 
    activePatient, 
    updateActiveClinicalInfo, 
    setCurrentScreen, 
    navigateBack, 
    getLanguageDetails,
    clinicalDepartment 
  } = useApp();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedComplaint, setEditedComplaint] = useState(activePatient.clinicalInfo.chiefComplaint);
  const [editedDuration, setEditedDuration] = useState(activePatient.clinicalInfo.duration);
  const [editedMedication, setEditedMedication] = useState(activePatient.clinicalInfo.medicationsTaken.join(', '));
  const [editedAllergies, setEditedAllergies] = useState(activePatient.clinicalInfo.allergies);

  const lang = getLanguageDetails(activePatient.language);
  const docs = activePatient.documents || [];
  const abnormalCount = docs.reduce((acc, d) => acc + (d.abnormalValues?.length || 0), 0);

  const handleSaveEdits = () => {
    updateActiveClinicalInfo({
      chiefComplaint: editedComplaint,
      duration: editedDuration,
      medicationsTaken: editedMedication.split(',').map(s => s.trim()).filter(Boolean),
      allergies: editedAllergies
    });
    setIsEditing(false);
  };

  const handleGenerateSummary = () => {
    setCurrentScreen('clinical-summary');
  };

  return (
    <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 animate-fadeIn">
      
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={() => setCurrentScreen('document-scanner')}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-xs transition-colors shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Document Scanner</span>
        </button>

        <span className="text-xs font-semibold uppercase tracking-wider bg-teal-50 text-teal-800 border border-teal-200 px-2.5 py-0.5 rounded">
          Step 4 of 4 • Final Patient Verification
        </span>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm space-y-4">
        
        {/* Header Title */}
        <div className="pb-3 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded bg-teal-50 text-teal-800 text-xs font-medium border border-teal-200 mb-1">
              <FileSpreadsheet className="w-3.5 h-3.5 text-teal-700" />
              <span>Full Intake & Document Synthesis</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Review Recorded Clinical History
            </h1>
          </div>

          <div className="flex items-center space-x-2 text-xs text-slate-500">
            <span className="font-mono bg-slate-100 px-2 py-0.5 rounded font-bold text-slate-800">
              Token #{activePatient.tokenNumber}
            </span>
            <span>•</span>
            <span>{lang.name} Intake</span>
          </div>
        </div>

        {/* Patient Profile Card */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white shrink-0 ${
              clinicalDepartment === 'ayush' ? 'bg-amber-700' : 'bg-teal-700'
            }`}>
              {clinicalDepartment === 'ayush' ? <Leaf className="w-5 h-5" /> : <User className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-bold text-slate-900">{activePatient.name}</h3>
                <span className="text-xs px-2 py-0.5 rounded bg-white text-slate-700 font-mono border border-slate-200 font-medium">
                  {activePatient.id}
                </span>
                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded uppercase ${
                  clinicalDepartment === 'ayush' ? 'bg-amber-100 text-amber-900' : 'bg-teal-100 text-teal-900'
                }`}>
                  {clinicalDepartment === 'ayush' ? 'AYUSH OPD' : 'General Medicine'}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5">
                {activePatient.age} years • {activePatient.gender} • ABHA: {activePatient.abhaProfile?.abhaId || 'Linked via ABDM'}
              </p>
            </div>
          </div>

          <div className="text-[11px] text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
            ABDM Status: <strong className="text-emerald-700">KYC Verified ✓</strong>
          </div>
        </div>

        {/* Clinical History Section with Edit Button */}
        <div className="p-4 rounded-xl border border-slate-200 space-y-3 bg-white">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center space-x-1.5 font-bold text-slate-900 text-xs uppercase tracking-wider">
              <Activity className="w-3.5 h-3.5 text-teal-700" />
              <span>1. Presenting Complaint & History of Present Illness</span>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-xs font-semibold text-teal-700 hover:text-teal-900 flex items-center space-x-1 transition-colors"
              >
                <Edit3 className="w-3 h-3" />
                <span>Edit Details</span>
              </button>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-3 pt-1">
              <div>
                <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">Chief Complaint</label>
                <input
                  type="text"
                  value={editedComplaint}
                  onChange={(e) => setEditedComplaint(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium text-slate-900 focus:outline-none focus:border-teal-700"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">Duration</label>
                  <input
                    type="text"
                    value={editedDuration}
                    onChange={(e) => setEditedDuration(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium text-slate-900 focus:outline-none focus:border-teal-700"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">Medications</label>
                  <input
                    type="text"
                    value={editedMedication}
                    onChange={(e) => setEditedMedication(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium text-slate-900 focus:outline-none focus:border-teal-700"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">Allergies</label>
                  <input
                    type="text"
                    value={editedAllergies}
                    onChange={(e) => setEditedAllergies(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium text-slate-900 focus:outline-none focus:border-teal-700"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-1">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-medium text-xs"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdits}
                  className="px-4 py-1.5 rounded-lg bg-teal-700 text-white font-medium text-xs shadow-sm flex items-center space-x-1"
                >
                  <Check className="w-3 h-3" />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-semibold text-slate-500 uppercase tracking-wider block mb-0.5 text-[10px]">Chief Complaint</span>
                <p className="text-xs font-bold text-slate-900">{activePatient.clinicalInfo.chiefComplaint}</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-semibold text-slate-500 uppercase tracking-wider block mb-0.5 text-[10px]">Duration & Onset</span>
                <p className="text-xs font-bold text-slate-900">{activePatient.clinicalInfo.duration}</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-semibold text-slate-500 uppercase tracking-wider block mb-0.5 text-[10px]">Severity / Vitals</span>
                <p className="text-xs font-bold text-amber-800">{activePatient.clinicalInfo.severity} ({activePatient.clinicalInfo.temperature || '~101°F'})</p>
              </div>
            </div>
          )}
        </div>

        {/* AYUSH Assessment Breakdown if applicable */}
        {clinicalDepartment === 'ayush' && activePatient.ayushAssessment && (
          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-2.5">
            <div className="flex items-center space-x-2 text-amber-900 font-bold text-xs uppercase tracking-wider pb-1 border-b border-amber-200">
              <Leaf className="w-4 h-4 text-amber-700" />
              <span>2. Dashavidha Pariksha & Ayurvedic Assessment</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="p-2.5 bg-white rounded-lg border border-amber-100">
                <span className="font-semibold text-slate-500 text-[10px] block">Agni (Digestive Fire):</span>
                <span className="font-bold text-amber-900">{activePatient.ayushAssessment.agni} Agni</span>
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-amber-100">
                <span className="font-semibold text-slate-500 text-[10px] block">Koshtha (Bowel Nature):</span>
                <span className="font-bold text-amber-900">{activePatient.ayushAssessment.koshtha} Koshtha</span>
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-amber-100">
                <span className="font-semibold text-slate-500 text-[10px] block">Prakriti / Constitution:</span>
                <span className="font-bold text-amber-900">{activePatient.ayushAssessment.prakriti}</span>
              </div>
            </div>
          </div>
        )}

        {/* Digitized Documents Summary */}
        <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2.5">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
            <div className="flex items-center space-x-1.5 font-bold text-slate-900 text-xs uppercase tracking-wider">
              <FileText className="w-3.5 h-3.5 text-teal-700" />
              <span>{clinicalDepartment === 'ayush' ? '3.' : '2.'} Scanned Prior Documents & Timeline</span>
            </div>
            <span className="text-xs font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded">
              {docs.length} Documents Attached
            </span>
          </div>

          {docs.length === 0 ? (
            <p className="text-xs text-slate-500 italic py-1">
              No prior medical documents attached for this visit.
            </p>
          ) : (
            <div className="space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {docs.map((doc, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900 line-clamp-1">{doc.title}</p>
                      <p className="text-[10px] text-slate-500">{doc.clinicOrLab} • {doc.date}</p>
                    </div>
                    {doc.abnormalValues && doc.abnormalValues.length > 0 && (
                      <span className="text-[10px] font-bold text-red-700 bg-red-100 px-1.5 py-0.5 rounded shrink-0 flex items-center space-x-1">
                        <AlertTriangle className="w-3 h-3" />
                        <span>{doc.abnormalValues.length} Flags</span>
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Consent & ABDM Sync Callout */}
        <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 flex items-start space-x-2.5 text-xs text-teal-950">
          <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-xs">ABDM & DPDP Act 2023 Digital Clinical Summary</p>
            <p className="text-[11px] text-teal-800 mt-0.5">
              This structured clinical record will be automatically formatted and transferred into the Doctor's EMR consultation queue.
            </p>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            onClick={() => setCurrentScreen('document-scanner')}
            className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 font-medium text-xs flex items-center justify-center space-x-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Add More Documents</span>
          </button>

          <button
            onClick={handleGenerateSummary}
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs shadow-sm transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <span>Generate Official OPD Token & Summary</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
