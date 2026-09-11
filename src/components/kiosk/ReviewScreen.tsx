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
  FileSpreadsheet
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ReviewScreen: React.FC = () => {
  const { activePatient, updateActiveClinicalInfo, setCurrentScreen, navigateBack, getLanguageDetails } = useApp();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedComplaint, setEditedComplaint] = useState(activePatient.clinicalInfo.chiefComplaint);
  const [editedDuration, setEditedDuration] = useState(activePatient.clinicalInfo.duration);
  const [editedMedication, setEditedMedication] = useState(activePatient.clinicalInfo.medicationsTaken.join(', '));
  const [editedAllergies, setEditedAllergies] = useState(activePatient.clinicalInfo.allergies);

  const lang = getLanguageDetails(activePatient.language);

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
    <div className="flex-1 flex flex-col justify-center max-w-3xl mx-auto w-full px-4 sm:px-6 py-6 animate-fadeIn">
      
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={navigateBack}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-xs transition-colors shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Conversation</span>
        </button>

        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Step 5 of 6 • Patient Review
        </span>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm mb-4">
        
        <div className="mb-4 pb-3 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded bg-teal-50 text-teal-800 text-xs font-medium border border-teal-200 mb-1">
              <FileSpreadsheet className="w-3.5 h-3.5 text-teal-700" />
              <span>Intake Review / विवरण जांच</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Review Recorded Symptoms
            </h1>
          </div>

          <div className="text-xs text-slate-500">
            Language: <strong className="text-teal-800">{lang.name}</strong>
          </div>
        </div>

        <div className="space-y-3">
          
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 flex items-center justify-center font-bold shrink-0">
                <User className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-sm font-bold text-slate-900">{activePatient.name}</h3>
                  <span className="px-1.5 py-0.2 rounded bg-slate-200 text-slate-700 text-xs font-mono font-medium">
                    {activePatient.id}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  {activePatient.age} years • {activePatient.gender}
                </p>
              </div>
            </div>

            <div className="text-[11px] text-slate-600 bg-white px-2.5 py-1 rounded border border-slate-200">
              Last Visit: <strong className="text-slate-800">{activePatient.lastVisit || 'First Time'}</strong>
            </div>
          </div>

          <div className="p-3.5 rounded-lg border border-slate-200 space-y-2.5 bg-white">
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
              <div className="flex items-center space-x-1.5 font-bold text-slate-900 text-xs uppercase tracking-wider">
                <Activity className="w-3.5 h-3.5 text-teal-700" />
                <span>Primary Symptoms & Timeline</span>
              </div>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-xs font-medium text-teal-700 hover:text-teal-900 flex items-center space-x-1"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Edit Details</span>
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-2.5 pt-1">
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">Chief Complaint</label>
                  <input
                    type="text"
                    value={editedComplaint}
                    onChange={(e) => setEditedComplaint(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-md border border-slate-300 text-xs font-medium text-slate-900 focus:outline-none focus:border-teal-700"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">Duration</label>
                    <input
                      type="text"
                      value={editedDuration}
                      onChange={(e) => setEditedDuration(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-md border border-slate-300 text-xs font-medium text-slate-900 focus:outline-none focus:border-teal-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">Medications</label>
                    <input
                      type="text"
                      value={editedMedication}
                      onChange={(e) => setEditedMedication(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-md border border-slate-300 text-xs font-medium text-slate-900 focus:outline-none focus:border-teal-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">Allergies</label>
                    <input
                      type="text"
                      value={editedAllergies}
                      onChange={(e) => setEditedAllergies(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-md border border-slate-300 text-xs font-medium text-slate-900 focus:outline-none focus:border-teal-700"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-1.5 pt-1">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 font-medium text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEdits}
                    className="px-3 py-1 rounded-md bg-teal-700 text-white font-medium text-xs shadow-sm flex items-center space-x-1"
                  >
                    <Check className="w-3 h-3" />
                    <span>Save</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
                  <span className="font-semibold text-slate-500 uppercase tracking-wider block mb-0.5 text-[10px]">Chief Complaint</span>
                  <p className="text-xs font-bold text-slate-900">{activePatient.clinicalInfo.chiefComplaint}</p>
                </div>
                <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
                  <span className="font-semibold text-slate-500 uppercase tracking-wider block mb-0.5 text-[10px]">Duration</span>
                  <p className="text-xs font-bold text-slate-900">{activePatient.clinicalInfo.duration}</p>
                </div>
                <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
                  <span className="font-semibold text-slate-500 uppercase tracking-wider block mb-0.5 text-[10px]">Severity / Temp</span>
                  <p className="text-xs font-bold text-amber-800">{activePatient.clinicalInfo.severity} ({activePatient.clinicalInfo.temperature || '~101°F'})</p>
                </div>
              </div>
            )}
          </div>

          <div className="p-3.5 rounded-lg border border-slate-200 space-y-2 bg-white">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Symptoms Verified</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-2.5 rounded bg-teal-50/50 border border-teal-200 space-y-1">
                <div className="flex items-center space-x-1 text-teal-900 font-bold text-[10px] uppercase tracking-wider">
                  <CheckCircle2 className="w-3 h-3 text-teal-700" />
                  <span>Present Symptoms (+ Positive)</span>
                </div>
                <div className="space-y-0.5">
                  {activePatient.clinicalInfo.associatedSymptoms.map((s, idx) => (
                    <div key={idx} className="text-xs text-slate-800 font-medium flex items-center space-x-1.5">
                      <span className="w-1 h-1 rounded-full bg-teal-700"></span>
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-2.5 rounded bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center space-x-1 text-slate-600 font-bold text-[10px] uppercase tracking-wider">
                  <AlertCircle className="w-3 h-3 text-slate-400" />
                  <span>Denied Symptoms (✕ Negative)</span>
                </div>
                <div className="space-y-0.5">
                  {activePatient.clinicalInfo.deniedSymptoms.map((s, idx) => (
                    <div key={idx} className="text-xs text-slate-600 font-medium flex items-center space-x-1.5">
                      <span className="w-1 h-1 rounded-full bg-slate-400"></span>
                      <span>No {s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-0.5">Medications Reported</span>
              <p className="text-xs font-bold text-slate-900">{activePatient.clinicalInfo.medicationsTaken.join(', ') || 'None reported'}</p>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-0.5">Known Allergies</span>
              <p className="text-xs font-bold text-slate-900">{activePatient.clinicalInfo.allergies || 'Not reported / None known'}</p>
            </div>
          </div>

        </div>

      </div>

      <div className="p-3 rounded-lg bg-teal-50 border border-teal-200 mb-4 flex items-start space-x-2 text-xs text-teal-950">
        <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
        <p>
          This summary will be compiled into the OPD intake record and sent to your consulting physician.
        </p>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleGenerateSummary}
          className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-medium text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
        >
          <span>Generate Summary Slip</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
