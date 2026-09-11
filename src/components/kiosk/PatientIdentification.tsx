import React, { useState } from 'react';
import { 
  UserCheck, 
  UserPlus, 
  ArrowRight, 
  ArrowLeft, 
  Search, 
  AlertCircle, 
  CheckCircle2, 
  Calendar,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PatientIdentification: React.FC = () => {
  const { 
    setCurrentScreen, 
    navigateBack, 
    loadExistingPatient, 
    setActivePatient,
    showToast,
    setIsHelpModalOpen
  } = useApp();

  const [inputPatientId, setInputPatientId] = useState('P-1024');
  const [selectedMode, setSelectedMode] = useState<'existing' | 'new'>('existing');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [matchedPatientInfo, setMatchedPatientInfo] = useState<{
    name: string;
    age: number;
    gender: string;
    lastVisit: string;
  } | null>({
    name: 'Rajesh Kumar',
    age: 54,
    gender: 'Male',
    lastVisit: '18 Aug 2026'
  });

  const demoPatientIds = ['P-1024', 'P-1048', 'P-1082', 'P-1091', 'P-1103'];

  const handleIdChange = (val: string) => {
    setInputPatientId(val);
    setErrorMessage(null);

    const upper = val.toUpperCase().trim();
    if (upper === 'P-1024') {
      setMatchedPatientInfo({ name: 'Rajesh Kumar', age: 54, gender: 'Male', lastVisit: '18 Aug 2026' });
    } else if (upper === 'P-1048') {
      setMatchedPatientInfo({ name: 'Sunita Devi', age: 67, gender: 'Female', lastVisit: '04 Jul 2026' });
    } else if (upper === 'P-1082') {
      setMatchedPatientInfo({ name: 'Arjun Patel', age: 31, gender: 'Male', lastVisit: 'First Visit' });
    } else if (upper === 'P-1091') {
      setMatchedPatientInfo({ name: 'Meena Rao', age: 45, gender: 'Female', lastVisit: '12 Jan 2026' });
    } else if (upper === 'P-1103') {
      setMatchedPatientInfo({ name: 'Amit Singh', age: 40, gender: 'Male', lastVisit: '22 May 2026' });
    } else {
      setMatchedPatientInfo(null);
    }
  };

  const handleContinueExisting = () => {
    if (!inputPatientId.trim()) {
      setErrorMessage('Please enter a valid Patient ID.');
      return;
    }

    const success = loadExistingPatient(inputPatientId);
    if (success) {
      showToast(`Welcome back, ${matchedPatientInfo?.name || 'Patient'}!`);
      setCurrentScreen('language');
    } else {
      setErrorMessage('Patient ID not found. Check the ID or continue as a new patient.');
    }
  };

  const handleContinueNew = () => {
    const newId = `P-${Math.floor(1000 + Math.random() * 9000)}`;
    setActivePatient(prev => ({
      ...prev,
      id: newId,
      name: 'New Patient',
      age: 45,
      gender: 'Male',
      lastVisit: 'First Registration',
      conversation: []
    }));
    showToast(`New Patient Profile created with ID: ${newId}`);
    setCurrentScreen('language');
  };

  return (
    <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 animate-fadeIn">
      
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={navigateBack}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-xs transition-colors shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Step 1 of 6 • Patient Check-in
        </span>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7 shadow-sm mb-4">
        <div className="mb-5">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Patient Identification
          </h1>
          <p className="mt-0.5 text-xs sm:text-sm text-slate-600">
            Select check-in method to continue to language preference.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          
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
                <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  Returning
                </span>
              </div>

              <h2 className="text-base font-bold text-slate-900 mb-0.5">Existing Patient ID</h2>
              <p className="text-slate-600 text-xs mb-3">
                Enter your hospital Patient ID to retrieve medical history.
              </p>

              <div className="space-y-1.5 mb-2.5">
                <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider">
                  Patient ID / पहचान संख्या
                </label>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={inputPatientId}
                    onChange={(e) => handleIdChange(e.target.value)}
                    placeholder="e.g. P-1024"
                    className="w-full pl-8 pr-3 py-2 rounded-lg border border-slate-300 focus:border-teal-700 focus:outline-none text-sm font-bold text-slate-900 uppercase placeholder:normal-case placeholder:text-slate-400 placeholder:font-normal"
                  />
                </div>

                <div className="flex items-center flex-wrap gap-1 pt-0.5">
                  <span className="text-[10px] text-slate-500 font-medium mr-1">Demo:</span>
                  {demoPatientIds.map((id) => (
                    <button
                      key={id}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleIdChange(id);
                      }}
                      className={`px-1.5 py-0.5 text-[11px] font-mono rounded border transition-colors ${
                        inputPatientId.toUpperCase() === id 
                          ? 'bg-teal-700 text-white border-teal-700 font-semibold' 
                          : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                      }`}
                    >
                      {id}
                    </button>
                  ))}
                </div>
              </div>

              {matchedPatientInfo && (
                <div className="p-2.5 rounded-lg bg-teal-50 border border-teal-200 text-xs space-y-0.5 mb-3">
                  <div className="flex items-center space-x-1 text-teal-900 font-semibold text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-700" />
                    <span>Patient Record Found</span>
                  </div>
                  <div className="font-bold text-slate-900 text-xs">{matchedPatientInfo.name}</div>
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
              className="w-full py-2.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-medium text-xs shadow-sm transition-all flex items-center justify-center space-x-1.5 mt-1"
            >
              <span>Continue as {matchedPatientInfo ? matchedPatientInfo.name.split(' ')[0] : 'Existing Patient'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

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
                  New
                </span>
              </div>

              <h2 className="text-base font-bold text-slate-900 mb-0.5">New Patient Registration</h2>
              <p className="text-slate-600 text-xs mb-3 leading-relaxed">
                First time at this hospital? We'll create a temporary intake ID for today's OPD visit.
              </p>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1 mb-3">
                <span className="text-[11px] font-semibold text-slate-700 block">
                  Intake Process:
                </span>
                <ul className="text-xs text-slate-600 space-y-0.5 list-disc list-inside">
                  <li>Select your native language</li>
                  <li>Describe current fever, pain, or symptoms</li>
                  <li>Review summary slip sent to doctor</li>
                </ul>
              </div>
            </div>

            <button
              onClick={handleContinueNew}
              className="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs shadow-sm transition-all flex items-center justify-center space-x-1.5 mt-1"
            >
              <span>Register as New Patient</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        <div className="pt-3 border-t border-slate-100 text-center">
          <button
            onClick={() => setIsHelpModalOpen(true)}
            className="text-xs font-medium text-slate-500 hover:text-teal-700 inline-flex items-center space-x-1 transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Don't know your Patient ID? Request hospital assistance</span>
          </button>
        </div>
      </div>

    </div>
  );
};
