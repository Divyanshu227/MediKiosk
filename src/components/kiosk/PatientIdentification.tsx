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
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PatientIdentification: React.FC = () => {
  const { 
    setCurrentScreen, 
    navigateBack, 
    loadExistingPatient, 
    activePatient, 
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

    // Mock search lookup
    if (val.toUpperCase() === 'P-1024') {
      setMatchedPatientInfo({ name: 'Rajesh Kumar', age: 54, gender: 'Male', lastVisit: '18 Aug 2026' });
    } else if (val.toUpperCase() === 'P-1048') {
      setMatchedPatientInfo({ name: 'Sunita Devi', age: 67, gender: 'Female', lastVisit: '04 Jul 2026' });
    } else if (val.toUpperCase() === 'P-1082') {
      setMatchedPatientInfo({ name: 'Arjun Patel', age: 31, gender: 'Male', lastVisit: 'First Visit' });
    } else if (val.toUpperCase() === 'P-1091') {
      setMatchedPatientInfo({ name: 'Meena Rao', age: 45, gender: 'Female', lastVisit: '12 Jan 2026' });
    } else if (val.toUpperCase() === 'P-1103') {
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
    <div className="flex-1 flex flex-col justify-center max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 animate-fadeIn">
      
      {/* Back Button */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={navigateBack}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-sm transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
          Step 1 of 6 • Patient Check-in
        </span>
      </div>

      {/* Heading */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Let's get you checked in
        </h1>
        <p className="mt-2 text-base text-slate-600">
          Select whether you have visited this hospital before or are starting fresh today.
        </p>
      </div>

      {/* Two Large Choice Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        
        {/* CARD 1: Existing Patient */}
        <div 
          onClick={() => setSelectedMode('existing')}
          className={`p-6 sm:p-8 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
            selectedMode === 'existing' 
              ? 'border-teal-600 bg-white shadow-xl shadow-teal-600/10 ring-2 ring-teal-500/20' 
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
                <UserCheck className="w-8 h-8" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                Fast Track
              </span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-2">Existing Patient</h2>
            <p className="text-slate-600 text-sm mb-6">
              Use your Patient ID to retrieve your basic information and past records.
            </p>

            {/* Patient ID Input */}
            <div className="space-y-3 mb-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Enter Patient ID / मरीज पहचान संख्या
              </label>
              <div className="relative">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={inputPatientId}
                  onChange={(e) => handleIdChange(e.target.value)}
                  placeholder="e.g. P-1024"
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-slate-200 focus:border-teal-600 focus:outline-none text-lg font-bold text-slate-900 uppercase placeholder:normal-case placeholder:text-slate-400 placeholder:font-normal"
                />
              </div>

              {/* Demo quick chips */}
              <div className="flex items-center flex-wrap gap-1.5 pt-1">
                <span className="text-xs text-slate-600 font-medium mr-1">Demo IDs:</span>
                {demoPatientIds.map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleIdChange(id);
                    }}
                    className={`px-2.5 py-1 text-xs font-mono rounded-lg border transition-colors ${
                      inputPatientId.toUpperCase() === id 
                        ? 'bg-teal-600 text-white border-teal-600 font-bold' 
                        : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    {id}
                  </button>
                ))}
              </div>
            </div>

            {/* Matched Patient Preview */}
            {matchedPatientInfo && (
              <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 text-sm space-y-1 mb-6 animate-fadeIn">
                <div className="flex items-center space-x-1.5 text-teal-800 font-bold text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  <span>Patient Record Found</span>
                </div>
                <div className="text-base font-bold text-slate-900">{matchedPatientInfo.name}</div>
                <div className="text-xs text-slate-600 flex items-center space-x-3">
                  <span>Age: {matchedPatientInfo.age}</span>
                  <span>•</span>
                  <span>Gender: {matchedPatientInfo.gender}</span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Last Visit: {matchedPatientInfo.lastVisit}</span>
                  </span>
                </div>
              </div>
            )}

            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center space-x-2 mb-4">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}
          </div>

          <button
            onClick={handleContinueExisting}
            className="w-full py-4 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-base shadow-md transition-all flex items-center justify-center space-x-2 mt-4"
          >
            <span>Continue as {matchedPatientInfo ? matchedPatientInfo.name.split(' ')[0] : 'Existing Patient'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* CARD 2: New Patient */}
        <div 
          onClick={() => setSelectedMode('new')}
          className={`p-6 sm:p-8 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
            selectedMode === 'new' 
              ? 'border-teal-600 bg-white shadow-xl shadow-teal-600/10 ring-2 ring-teal-500/20' 
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                <UserPlus className="w-8 h-8" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                New Registration
              </span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-2">New Patient</h2>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
              First time at this clinic or hospital? Start a new consultation profile in seconds.
            </p>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 mb-6">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>What we will do next:</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                <li>Select your native speaking language</li>
                <li>Describe current fever, pain, or health issues</li>
                <li>AI organizes your clinical history for the doctor</li>
              </ul>
            </div>
          </div>

          <button
            onClick={handleContinueNew}
            className="w-full py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-base shadow-md transition-all flex items-center justify-center space-x-2 mt-4"
          >
            <span>Continue as New Patient</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>

      {/* Need Help Footer */}
      <div className="text-center">
        <button
          onClick={() => setIsHelpModalOpen(true)}
          className="text-xs font-semibold text-slate-500 hover:text-teal-600 inline-flex items-center space-x-1 transition-colors"
        >
          <HelpCircle className="w-4 h-4" />
          <span>Don't know your Patient ID? Click for assistance</span>
        </button>
      </div>

    </div>
  );
};
