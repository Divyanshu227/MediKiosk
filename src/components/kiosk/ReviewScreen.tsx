import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Edit3, 
  Check, 
  User, 
  Calendar, 
  Activity, 
  Thermometer, 
  Pill, 
  AlertCircle, 
  ShieldCheck, 
  CheckCircle2,
  FileSpreadsheet,
  Sparkles
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
    <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 animate-fadeIn">
      
      {/* Top Header */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={navigateBack}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-sm transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Conversation</span>
        </button>

        <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
          Step 5 of 6 • Patient Review
        </span>
      </div>

      {/* Heading */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider border border-teal-200 mb-3">
          <FileSpreadsheet className="w-4 h-4 text-teal-600" />
          <span>Intake Summary Review</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Review your information
        </h1>
        <p className="mt-2 text-base text-slate-600">
          Please confirm your details below. You can make adjustments before we generate the doctor's clinical summary.
        </p>
      </div>

      {/* Structured Review Cards Container */}
      <div className="space-y-4 mb-8">
        
        {/* Card 1: Patient Demographics */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold flex-shrink-0">
              <User className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-bold text-slate-900">{activePatient.name}</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-mono font-bold">
                  {activePatient.id}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {activePatient.age} years • {activePatient.gender} • Language: <strong className="text-teal-700">{lang.name} ({lang.nativeName})</strong>
              </p>
            </div>
          </div>

          <div className="text-xs text-slate-600 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200">
            Last Visit: <strong className="text-slate-800">{activePatient.lastVisit || 'First Time'}</strong>
          </div>
        </div>

        {/* Card 2: Current Concern & Duration */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2 font-bold text-slate-900 text-base">
              <Activity className="w-5 h-5 text-teal-600" />
              <span>Current Concern & Timeline</span>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center space-x-1"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Fields</span>
              </button>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Chief Complaint</label>
                <input
                  type="text"
                  value={editedComplaint}
                  onChange={(e) => setEditedComplaint(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:outline-none focus:border-teal-600"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Duration</label>
                  <input
                    type="text"
                    value={editedDuration}
                    onChange={(e) => setEditedDuration(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:outline-none focus:border-teal-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Medication Taken</label>
                  <input
                    type="text"
                    value={editedMedication}
                    onChange={(e) => setEditedMedication(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:outline-none focus:border-teal-600"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdits}
                  className="px-5 py-2 rounded-xl bg-teal-600 text-white font-bold text-xs shadow-sm flex items-center space-x-1"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="font-bold text-slate-500 uppercase tracking-wider block mb-1">Chief Complaint</span>
                <p className="text-sm font-bold text-slate-900">{activePatient.clinicalInfo.chiefComplaint}</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="font-bold text-slate-500 uppercase tracking-wider block mb-1">Duration</span>
                <p className="text-sm font-bold text-slate-900">{activePatient.clinicalInfo.duration}</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="font-bold text-slate-500 uppercase tracking-wider block mb-1">Severity / Temp</span>
                <p className="text-sm font-bold text-amber-700">{activePatient.clinicalInfo.severity} ({activePatient.clinicalInfo.temperature || '~101°F'})</p>
              </div>
            </div>
          )}
        </div>

        {/* Card 3: Symptoms (Present & Denied) */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
          <h4 className="font-bold text-slate-900 text-sm">Symptoms Verified during Voice Intake</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Present */}
            <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 space-y-2">
              <div className="flex items-center space-x-1.5 text-teal-800 font-bold text-xs uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>Present Symptoms (+ Positive)</span>
              </div>
              <div className="space-y-1">
                {activePatient.clinicalInfo.associatedSymptoms.map((s, idx) => (
                  <div key={idx} className="text-xs text-slate-800 font-medium flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Denied */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center space-x-1.5 text-slate-600 font-bold text-xs uppercase tracking-wider">
                <AlertCircle className="w-4 h-4 text-slate-400" />
                <span>Denied Symptoms (✕ Negative)</span>
              </div>
              <div className="space-y-1">
                {activePatient.clinicalInfo.deniedSymptoms.map((s, idx) => (
                  <div key={idx} className="text-xs text-slate-600 font-medium flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                    <span>No {s}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Card 4: Medications & Allergies */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Medications Taken</span>
            <p className="text-sm font-bold text-slate-900">{activePatient.clinicalInfo.medicationsTaken.join(', ') || 'None reported'}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Known Allergies</span>
            <p className="text-sm font-bold text-slate-900">{activePatient.clinicalInfo.allergies || 'Not reported / None known'}</p>
          </div>
        </div>

      </div>

      {/* Clinical Disclaimer Note */}
      <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 mb-8 flex items-start space-x-3 text-xs text-teal-900">
        <ShieldCheck className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
        <p>
          The clinical summary is synthesized directly from your responses during this intake session and will be presented to your physician for diagnostic review.
        </p>
      </div>

      {/* Primary Action Button */}
      <div className="flex justify-center">
        <button
          onClick={handleGenerateSummary}
          className="w-full sm:w-auto px-12 py-5 rounded-2xl bg-gradient-to-r from-teal-600 via-teal-500 to-teal-600 hover:from-teal-700 hover:to-teal-700 text-white font-black text-xl shadow-xl shadow-teal-600/30 transform hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-3"
        >
          <Sparkles className="w-6 h-6 animate-spin" />
          <span>Generate Clinical Summary</span>
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>

    </div>
  );
};
