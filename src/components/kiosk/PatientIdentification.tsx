import React, { useState } from 'react';
import { 
  UserCheck, 
  UserPlus, 
  ArrowRight, 
  ArrowLeft, 
  Search, 
  AlertCircle, 
  Calendar,
  HelpCircle,
  QrCode,
  ShieldCheck,
  Stethoscope,
  Leaf
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ClinicalDepartment } from '../../types';

export const PatientIdentification: React.FC = () => {
  const { 
    setCurrentScreen, 
    navigateBack, 
    loadExistingPatient, 
    setActivePatient,
    showToast,
    setIsHelpModalOpen,
    clinicalDepartment,
    setClinicalDepartment
  } = useApp();

  const [inputPatientId, setInputPatientId] = useState('P-1024');
  const [selectedMode, setSelectedMode] = useState<'existing' | 'new' | 'abha'>('existing');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [matchedPatientInfo, setMatchedPatientInfo] = useState<{
    name: string;
    age: number;
    gender: string;
    lastVisit: string;
    dept: string;
    abhaId?: string;
  } | null>({
    name: 'Rajesh Kumar',
    age: 54,
    gender: 'Male',
    lastVisit: '14 May 2026',
    dept: 'General Medicine',
    abhaId: 'rajesh.kumar54@abdm'
  });

  const demoPresets = [
    { id: 'P-1024', name: 'Rajesh Kumar', dept: 'allopathy' as ClinicalDepartment, label: 'Allopathy: Fever & DM' },
    { id: 'P-1035', name: 'Rameshwar Prasad', dept: 'ayush' as ClinicalDepartment, label: 'AYUSH: Sandhivata (Joints)' },
    { id: 'P-1002', name: 'Vikram Sharma', dept: 'allopathy' as ClinicalDepartment, label: 'Emergency: Chest Pain' }
  ];

  const handleIdChange = (val: string) => {
    setInputPatientId(val);
    setErrorMessage(null);

    const upper = val.toUpperCase().trim();
    if (upper === 'P-1024') {
      setMatchedPatientInfo({ name: 'Rajesh Kumar', age: 54, gender: 'Male', lastVisit: '14 May 2026', dept: 'General Medicine', abhaId: 'rajesh.kumar54@abdm' });
      setClinicalDepartment('allopathy');
    } else if (upper === 'P-1035') {
      setMatchedPatientInfo({ name: 'Acharya Rameshwar Prasad', age: 62, gender: 'Male', lastVisit: '10 Feb 2026', dept: 'AYUSH Kayachikitsa', abhaId: 'rameshwar.ayush@abdm' });
      setClinicalDepartment('ayush');
    } else if (upper === 'P-1002') {
      setMatchedPatientInfo({ name: 'Vikramaditya Sharma', age: 58, gender: 'Male', lastVisit: 'First Visit', dept: 'Emergency / Triage', abhaId: 'vikram.sharma@abdm' });
      setClinicalDepartment('allopathy');
    } else if (upper === 'P-1048') {
      setMatchedPatientInfo({ name: 'Sunita Devi', age: 67, gender: 'Female', lastVisit: '19 Nov 2025', dept: 'Orthopedics / Medicine', abhaId: 'sunita.devi67@abdm' });
      setClinicalDepartment('allopathy');
    } else {
      setMatchedPatientInfo(null);
    }
  };

  const handleContinueExisting = () => {
    if (!inputPatientId.trim()) {
      setErrorMessage('Please enter a valid Patient ID or ABHA ID.');
      return;
    }

    const success = loadExistingPatient(inputPatientId);
    if (success) {
      showToast(`Welcome back, ${matchedPatientInfo?.name || 'Patient'}!`);
      setCurrentScreen('language');
    } else {
      setErrorMessage('Patient ID not found. Check the ID or register as new.');
    }
  };

  const handleContinueNew = () => {
    const newId = `P-${Math.floor(1000 + Math.random() * 9000)}`;
    const token = clinicalDepartment === 'ayush' ? `AY-${Math.floor(200 + Math.random() * 100)}` : `A-${Math.floor(100 + Math.random() * 100)}`;
    
    setActivePatient(prev => ({
      ...prev,
      id: newId,
      tokenNumber: token,
      name: 'New Patient',
      department: clinicalDepartment,
      lastVisit: 'First Registration',
      conversation: []
    }));
    showToast(`New Patient Profile created with Token: #${token}`);
    setCurrentScreen('language');
  };

  return (
    <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 animate-fadeIn">
      
      {/* Navigation Header */}
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={navigateBack}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-xs transition-colors shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-bold uppercase tracking-wider bg-teal-50 text-teal-800 border border-teal-200 px-2.5 py-0.5 rounded">
            Step 1 of 4 • Identification & ABHA
          </span>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7 shadow-sm space-y-5">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Patient Identification & Department Selection
            </h1>
            <p className="mt-0.5 text-xs text-slate-600">
              Check in using your ABHA ID, Hospital Patient ID, or register for today's OPD.
            </p>
          </div>

          {/* Department Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 shrink-0">
            <button
              onClick={() => setClinicalDepartment('allopathy')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                clinicalDepartment === 'allopathy'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>General Medicine</span>
            </button>
            <button
              onClick={() => setClinicalDepartment('ayush')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                clinicalDepartment === 'ayush'
                  ? 'bg-amber-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Leaf className="w-3.5 h-3.5" />
              <span>AYUSH / Ayurveda</span>
            </button>
          </div>
        </div>

        {/* Check-in Modes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Option 1: Existing Patient ID or ABHA */}
          <div 
            onClick={() => setSelectedMode('existing')}
            className={`p-4 sm:p-5 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
              selectedMode === 'existing' 
                ? 'border-teal-700 bg-teal-50/20' 
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center font-bold">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div className="flex items-center space-x-1 text-[10px] font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
                  <ShieldCheck className="w-3 h-3" />
                  <span>ABDM Linked</span>
                </div>
              </div>

              <h2 className="text-base font-bold text-slate-900 mb-0.5">ABHA / Hospital Patient ID</h2>
              <p className="text-slate-600 text-xs mb-3">
                Enter your ABHA address or Patient ID to fetch past records.
              </p>

              <div className="space-y-1.5 mb-2.5">
                <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider">
                  Patient ID / ABHA Address
                </label>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={inputPatientId}
                    onChange={(e) => handleIdChange(e.target.value)}
                    placeholder="e.g. P-1024 or user@abdm"
                    className="w-full pl-8 pr-3 py-2 rounded-lg border border-slate-300 focus:border-teal-700 focus:outline-none text-sm font-bold text-slate-900 placeholder:normal-case placeholder:text-slate-400 placeholder:font-normal"
                  />
                </div>

                {/* Quick Demo Presets */}
                <div className="space-y-1 pt-1">
                  <span className="text-[10px] text-slate-500 font-medium block">Quick Demo Scenarios:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {demoPresets.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleIdChange(preset.id);
                        }}
                        className={`px-2 py-1 text-[11px] rounded border transition-all text-left flex items-center space-x-1.5 ${
                          inputPatientId.toUpperCase() === preset.id 
                            ? 'bg-teal-700 text-white border-teal-700 font-semibold' 
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <span className="font-mono font-bold">{preset.id}</span>
                        <span>({preset.label})</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {matchedPatientInfo && (
                <div className="p-3 rounded-lg bg-teal-50 border border-teal-200 text-xs space-y-1 my-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-xs">{matchedPatientInfo.name}</span>
                    <span className="text-[10px] font-bold text-teal-800 bg-white border border-teal-200 px-1.5 py-0.2 rounded">
                      {matchedPatientInfo.dept}
                    </span>
                  </div>
                  <div className="text-slate-600 flex items-center space-x-2 text-[11px]">
                    <span>{matchedPatientInfo.age}y</span>
                    <span>•</span>
                    <span>{matchedPatientInfo.gender}</span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>Last: {matchedPatientInfo.lastVisit}</span>
                    </span>
                  </div>
                  {matchedPatientInfo.abhaId && (
                    <div className="text-[10px] text-teal-800 font-mono flex items-center space-x-1 pt-0.5">
                      <ShieldCheck className="w-3 h-3 text-teal-700" />
                      <span>ABHA: {matchedPatientInfo.abhaId}</span>
                    </div>
                  )}
                </div>
              )}

              {errorMessage && (
                <div className="p-2 rounded bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center space-x-1.5 mb-2">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>

            <button
              onClick={handleContinueExisting}
              className="w-full py-2.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-medium text-xs shadow-sm transition-all flex items-center justify-center space-x-1.5 mt-2"
            >
              <span>Continue as {matchedPatientInfo ? matchedPatientInfo.name.split(' ')[0] : 'Patient'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Option 2: New Registration */}
          <div 
            onClick={() => setSelectedMode('new')}
            className={`p-4 sm:p-5 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
              selectedMode === 'new' 
                ? 'border-teal-700 bg-teal-50/20' 
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-800 flex items-center justify-center font-bold">
                  <UserPlus className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  First Visit
                </span>
              </div>

              <h2 className="text-base font-bold text-slate-900 mb-0.5">New Patient Check-in</h2>
              <p className="text-slate-600 text-xs mb-3 leading-relaxed">
                First time at this hospital? We'll create an instant OPD intake token for your consultation.
              </p>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5 mb-3">
                <span className="text-[11px] font-semibold text-slate-700 block">
                  Intake Workflow:
                </span>
                <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                  <li>Choose your preferred Indian language</li>
                  <li>Record symptoms via voice or touchscreen</li>
                  <li>Scan prior prescriptions or lab reports</li>
                  <li>Get printed OPD Token & pre-briefed doctor review</li>
                </ul>
              </div>
            </div>

            <button
              onClick={handleContinueNew}
              className="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs shadow-sm transition-all flex items-center justify-center space-x-1.5 mt-2"
            >
              <span>Register New Patient</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <span className="flex items-center space-x-1">
            <QrCode className="w-3.5 h-3.5 text-teal-600" />
            <span>ABDM ABHA QR Scanner ready at Terminal</span>
          </span>
          <button
            onClick={() => setIsHelpModalOpen(true)}
            className="font-medium text-slate-600 hover:text-teal-700 inline-flex items-center space-x-1 transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Need assistance? Request nurse desk support</span>
          </button>
        </div>

      </div>

    </div>
  );
};
