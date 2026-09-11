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
      
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={navigateBack}
          className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-xs transition-colors shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Conversation</span>
        </button>

        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Step 5 of 6 • Patient Review
        </span>
      </div>

      <div className="text-center max-w-xl mx-auto mb-6">
        <div className="inline-flex items-center space-x-2 px-3 py-0.5 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold border border-teal-200 mb-2">
          <FileSpreadsheet className="w-3.5 h-3.5 text-teal-600" />
          <span>Intake Summary Review</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Review Recorded Details
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Confirm your recorded symptoms before sending the summary to the doctor.
        </p>
      </div>

      <div className="space-y-3.5 mb-6">
        
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold text-slate-900">{activePatient.name}</h3>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-mono font-semibold">
                  {activePatient.id}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {activePatient.age} years • {activePatient.gender} • Language: <strong className="text-teal-800">{lang.name}</strong>
              </p>
            </div>
          </div>

          <div className="text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
            Last Visit: <strong className="text-slate-800">{activePatient.lastVisit || 'First Time'}</strong>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center space-x-2 font-bold text-slate-900 text-sm">
              <Activity className="w-4 h-4 text-teal-600" />
              <span>Current Concern & Timeline</span>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-xs font-semibold text-teal-700 hover:text-teal-900 flex items-center space-x-1"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-3 pt-1">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Chief Complaint</label>
                <input
                  type="text"
                  value={editedComplaint}
                  onChange={(e) => setEditedComplaint(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium text-slate-900 focus:outline-none focus:border-teal-600"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Duration</label>
                  <input
                    type="text"
                    value={editedDuration}
                    onChange={(e) => setEditedDuration(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium text-slate-900 focus:outline-none focus:border-teal-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Medication Taken</label>
                  <input
                    type="text"
                    value={editedMedication}
                    onChange={(e) => setEditedMedication(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium text-slate-900 focus:outline-none focus:border-teal-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Known Allergies</label>
                  <input
                    type="text"
                    value={editedAllergies}
                    onChange={(e) => setEditedAllergies(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium text-slate-900 focus:outline-none focus:border-teal-600"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-1">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdits}
                  className="px-4 py-1.5 rounded-lg bg-teal-600 text-white font-semibold text-xs shadow-sm flex items-center space-x-1"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Save</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-semibold text-slate-500 uppercase tracking-wider block mb-0.5 text-[10px]">Chief Complaint</span>
                <p className="text-xs font-bold text-slate-900">{activePatient.clinicalInfo.chiefComplaint}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-semibold text-slate-500 uppercase tracking-wider block mb-0.5 text-[10px]">Duration</span>
                <p className="text-xs font-bold text-slate-900">{activePatient.clinicalInfo.duration}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-semibold text-slate-500 uppercase tracking-wider block mb-0.5 text-[10px]">Severity / Temp</span>
                <p className="text-xs font-bold text-amber-800">{activePatient.clinicalInfo.severity} ({activePatient.clinicalInfo.temperature || '~101°F'})</p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-3">
          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Symptoms Verified during Intake</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            <div className="p-3 rounded-xl bg-teal-50/70 border border-teal-200 space-y-1.5">
              <div className="flex items-center space-x-1.5 text-teal-800 font-bold text-[11px] uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                <span>Present Symptoms (+ Positive)</span>
              </div>
              <div className="space-y-1">
                {activePatient.clinicalInfo.associatedSymptoms.map((s, idx) => (
                  <div key={idx} className="text-xs text-slate-800 font-medium flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex items-center space-x-1.5 text-slate-600 font-bold text-[11px] uppercase tracking-wider">
                <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
                <span>Denied Symptoms (✕ Negative)</span>
              </div>
              <div className="space-y-1">
                {activePatient.clinicalInfo.deniedSymptoms.map((s, idx) => (
                  <div key={idx} className="text-xs text-slate-600 font-medium flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                    <span>No {s}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-0.5">Medications Reported</span>
            <p className="text-xs font-bold text-slate-900">{activePatient.clinicalInfo.medicationsTaken.join(', ') || 'None reported'}</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-0.5">Known Allergies</span>
            <p className="text-xs font-bold text-slate-900">{activePatient.clinicalInfo.allergies || 'Not reported / None known'}</p>
          </div>
        </div>

      </div>

      <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 mb-6 flex items-start space-x-2.5 text-xs text-teal-950">
        <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
        <p>
          The clinical summary is prepared from your intake conversation and presented to your physician for diagnostic review.
        </p>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleGenerateSummary}
          className="w-full sm:w-auto px-10 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-base shadow-md transition-all flex items-center justify-center space-x-2.5 cursor-pointer"
        >
          <span>Generate Clinical Summary</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
