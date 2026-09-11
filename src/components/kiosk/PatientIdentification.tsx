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
  Leaf,
  Phone,
  User,
  MapPin,
  HeartPulse,
  KeyRound,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ClinicalDepartment, PatientRegistrationForm } from '../../types';

export const PatientIdentification: React.FC = () => {
  const { 
    setCurrentScreen, 
    navigateBack, 
    registerNewPatient,
    loginPatientByMobileOrId, 
    showToast,
    setIsHelpModalOpen,
    clinicalDepartment,
    setClinicalDepartment
  } = useApp();

  const [activeTab, setActiveTab] = useState<'register' | 'login' | 'abha_scan'>('register');
  
  // Login Form State
  const [loginQuery, setLoginQuery] = useState('P-1024');
  const [loginOtp, setLoginOtp] = useState('4829');
  const [otpSent, setOtpSent] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Registration Form State
  const [regForm, setRegForm] = useState<PatientRegistrationForm>({
    name: 'Aarav Sharma',
    age: 38,
    dob: '1988-04-12',
    gender: 'Male',
    mobile: '9876543210',
    email: 'aarav.sharma@example.com',
    address: 'B-12, Sector 62',
    district: 'Gautam Buddha Nagar',
    state: 'Uttar Pradesh',
    bloodGroup: 'O+',
    emergencyContact: '9811223344',
    emergencyRelation: 'Spouse',
    department: clinicalDepartment,
    createAbha: true,
    preferredAbhaAddress: 'aarav.sharma'
  });

  const handleSendOtp = () => {
    if (!loginQuery.trim()) {
      setLoginError('Please enter your Mobile number, Patient ID, or ABHA address.');
      return;
    }
    setOtpSent(true);
    setLoginError(null);
    showToast(`Verification OTP sent to registered mobile for ${loginQuery}.`);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = loginPatientByMobileOrId(loginQuery, loginOtp);
    if (result.success) {
      setCurrentScreen('language');
    } else {
      setLoginError(result.error || 'Authentication failed.');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regForm.name.trim() || !regForm.mobile.trim() || !regForm.age) {
      showToast('Please fill all required profile fields.');
      return;
    }

    const created = registerNewPatient({
      ...regForm,
      department: clinicalDepartment
    });

    showToast(`Profile & ABHA ID generated for ${created.name}!`);
    setCurrentScreen('language');
  };

  return (
    <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 animate-fadeIn">
      
      {/* Top Header & Navigation */}
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={navigateBack}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs transition-colors shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Terminal Home</span>
        </button>

        <span className="text-xs font-bold uppercase tracking-wider bg-teal-50 text-teal-900 border border-teal-200 px-2.5 py-0.5 rounded">
          Step 1 of 4 • Patient Check-in & Profile
        </span>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-7 shadow-sm space-y-5">
        
        {/* Department Switcher & Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Patient Identification & Registration
            </h1>
            <p className="mt-0.5 text-xs text-slate-600">
              Register a new patient profile or login with your existing Mobile / ABHA ID.
            </p>
          </div>

          {/* Department Selector */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 shrink-0">
            <button
              type="button"
              onClick={() => {
                setClinicalDepartment('allopathy');
                setRegForm(prev => ({ ...prev, department: 'allopathy' }));
              }}
              className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center space-x-1.5 transition-all ${
                clinicalDepartment === 'allopathy'
                  ? 'bg-teal-700 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>General Medicine</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setClinicalDepartment('ayush');
                setRegForm(prev => ({ ...prev, department: 'ayush' }));
              }}
              className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center space-x-1.5 transition-all ${
                clinicalDepartment === 'ayush'
                  ? 'bg-amber-700 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Leaf className="w-3.5 h-3.5" />
              <span>AYUSH / Ayurveda</span>
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab('register')}
            className={`flex-1 py-2.5 text-xs font-bold border-b-2 flex items-center justify-center space-x-2 transition-all ${
              activeTab === 'register'
                ? 'border-teal-700 text-teal-800 bg-teal-50/20'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>1. New Patient Registration Form</span>
          </button>

          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-2.5 text-xs font-bold border-b-2 flex items-center justify-center space-x-2 transition-all ${
              activeTab === 'login'
                ? 'border-teal-700 text-teal-800 bg-teal-50/20'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>2. Returning Patient Login (Mobile / ABHA)</span>
          </button>

          <button
            onClick={() => setActiveTab('abha_scan')}
            className={`flex-1 py-2.5 text-xs font-bold border-b-2 flex items-center justify-center space-x-2 transition-all ${
              activeTab === 'abha_scan'
                ? 'border-teal-700 text-teal-800 bg-teal-50/20'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>3. Scan ABHA Card</span>
          </button>
        </div>

        {/* Tab 1: New Patient Registration Form */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-4 animate-fadeIn">
            
            <div className="p-3 bg-teal-50 border border-teal-200 rounded-lg flex items-center justify-between text-xs text-teal-900">
              <span className="flex items-center space-x-1.5 font-semibold">
                <ShieldCheck className="w-4 h-4 text-teal-700" />
                <span>Ayushman Bharat Health Account (ABHA) will be automatically created & linked.</span>
              </span>
              <span className="text-[10px] bg-white border border-teal-200 px-2 py-0.5 rounded font-bold uppercase">
                ABDM Enabled
              </span>
            </div>

            {/* Demographics Row 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={regForm.name}
                    onChange={(e) => setRegForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full pl-8 pr-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-900 focus:outline-none focus:border-teal-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Age & Date of Birth *
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  <input
                    type="number"
                    required
                    min={1}
                    max={120}
                    value={regForm.age}
                    onChange={(e) => setRegForm(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
                    placeholder="Age (yrs)"
                    className="w-full px-2.5 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-900 focus:outline-none focus:border-teal-700"
                  />
                  <input
                    type="date"
                    value={regForm.dob}
                    onChange={(e) => setRegForm(prev => ({ ...prev, dob: e.target.value }))}
                    className="w-full px-2 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-900 focus:outline-none focus:border-teal-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Gender *
                </label>
                <select
                  value={regForm.gender}
                  onChange={(e) => setRegForm(prev => ({ ...prev, gender: e.target.value as any }))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-900 focus:outline-none focus:border-teal-700 bg-white"
                >
                  <option value="Male">Male (पुरुष)</option>
                  <option value="Female">Female (महिला)</option>
                  <option value="Other">Other (अन्य)</option>
                </select>
              </div>
            </div>

            {/* Contact Row 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Mobile Number (For OTP & Token) *
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={regForm.mobile}
                    onChange={(e) => setRegForm(prev => ({ ...prev, mobile: e.target.value }))}
                    placeholder="10-digit mobile"
                    className="w-full pl-8 pr-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-900 focus:outline-none focus:border-teal-700 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Blood Group
                </label>
                <div className="relative">
                  <HeartPulse className="w-3.5 h-3.5 text-rose-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={regForm.bloodGroup}
                    onChange={(e) => setRegForm(prev => ({ ...prev, bloodGroup: e.target.value }))}
                    className="w-full pl-8 pr-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-900 focus:outline-none focus:border-teal-700 bg-white"
                  >
                    <option value="A+">A Positive (A+)</option>
                    <option value="A-">A Negative (A-)</option>
                    <option value="B+">B Positive (B+)</option>
                    <option value="B-">B Negative (B-)</option>
                    <option value="O+">O Positive (O+)</option>
                    <option value="O-">O Negative (O-)</option>
                    <option value="AB+">AB Positive (AB+)</option>
                    <option value="AB-">AB Negative (AB-)</option>
                    <option value="Unknown">Unknown</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Emergency Contact
                </label>
                <input
                  type="tel"
                  value={regForm.emergencyContact}
                  onChange={(e) => setRegForm(prev => ({ ...prev, emergencyContact: e.target.value }))}
                  placeholder="Emergency phone & relation"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-900 focus:outline-none focus:border-teal-700"
                />
              </div>
            </div>

            {/* Address Row 3 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Street Address
                </label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={regForm.address}
                    onChange={(e) => setRegForm(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="House/Street/Locality"
                    className="w-full pl-8 pr-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-900 focus:outline-none focus:border-teal-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  District / City
                </label>
                <input
                  type="text"
                  value={regForm.district}
                  onChange={(e) => setRegForm(prev => ({ ...prev, district: e.target.value }))}
                  placeholder="e.g. New Delhi"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-900 focus:outline-none focus:border-teal-700"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  State
                </label>
                <input
                  type="text"
                  value={regForm.state}
                  onChange={(e) => setRegForm(prev => ({ ...prev, state: e.target.value }))}
                  placeholder="e.g. Delhi NCR / Uttar Pradesh"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-900 focus:outline-none focus:border-teal-700"
                />
              </div>
            </div>

            {/* ABHA Creation Toggle */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  Preferred ABHA Address: <span className="text-teal-800 font-mono">@{regForm.preferredAbhaAddress || 'username'}.abdm</span>
                </span>
                <p className="text-[11px] text-slate-500">
                  Allows instant synchronization of today's OPD consultation to your Government Ayushman Bharat health locker.
                </p>
              </div>

              <input
                type="text"
                value={regForm.preferredAbhaAddress}
                onChange={(e) => setRegForm(prev => ({ ...prev, preferredAbhaAddress: e.target.value }))}
                placeholder="Choose handle"
                className="px-2.5 py-1 text-xs rounded border border-slate-300 font-mono text-slate-800 bg-white"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Complete Registration & Proceed to Language</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        )}

        {/* Tab 2: Returning Patient Login */}
        {activeTab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4 max-w-lg mx-auto py-2 animate-fadeIn">
            
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                Patient ID / Registered Mobile / ABHA Address *
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={loginQuery}
                  onChange={(e) => {
                    setLoginQuery(e.target.value);
                    setLoginError(null);
                  }}
                  placeholder="e.g. P-1024, 9876543210, or rajesh.kumar54@abdm"
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 text-sm font-bold text-slate-900 focus:outline-none focus:border-teal-700"
                />
              </div>
            </div>

            {/* Quick Demo Pre-fills */}
            <div className="space-y-1">
              <span className="text-[10px] text-slate-500 font-semibold block">Quick Patient Presets:</span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setLoginQuery('P-1024');
                    setClinicalDepartment('allopathy');
                  }}
                  className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-mono border border-slate-200"
                >
                  P-1024 (Rajesh - Fever/DM)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLoginQuery('P-1035');
                    setClinicalDepartment('ayush');
                  }}
                  className="px-2 py-1 rounded bg-amber-50 hover:bg-amber-100 text-amber-900 text-[11px] font-mono border border-amber-200"
                >
                  P-1035 (Acharya - Sandhivata)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLoginQuery('P-1048');
                    setClinicalDepartment('allopathy');
                  }}
                  className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-mono border border-slate-200"
                >
                  P-1048 (Sunita - Knee Pain)
                </button>
              </div>
            </div>

            {/* OTP Verification Box */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 flex items-center space-x-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-teal-700" />
                  <span>Authentication OTP</span>
                </span>
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="text-xs font-bold text-teal-700 hover:text-teal-900"
                >
                  {otpSent ? 'Resend OTP' : 'Send OTP via SMS'}
                </button>
              </div>

              <input
                type="text"
                value={loginOtp}
                onChange={(e) => setLoginOtp(e.target.value)}
                placeholder="Enter 4-digit OTP (demo: 4829)"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-bold text-slate-900 font-mono tracking-widest text-center focus:outline-none focus:border-teal-700 bg-white"
              />
            </div>

            {loginError && (
              <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-800 text-xs font-medium flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center space-x-2"
            >
              <span>Login & Continue to Intake</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>
        )}

        {/* Tab 3: ABHA QR Scan Mode */}
        {activeTab === 'abha_scan' && (
          <div className="text-center py-8 space-y-4 max-w-md mx-auto animate-fadeIn">
            <div className="w-16 h-16 rounded-2xl bg-teal-50 border-2 border-dashed border-teal-500 text-teal-800 flex items-center justify-center mx-auto">
              <QrCode className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Hold your ABHA Card or QR to the Scanner</h3>
              <p className="text-xs text-slate-500 mt-1">
                The kiosk optical scanner will read your ABDM demographic data automatically.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                loginPatientByMobileOrId('P-1024');
                setCurrentScreen('language');
              }}
              className="px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-sm transition-all inline-flex items-center space-x-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Simulate ABHA QR Scan (Rajesh Kumar)</span>
            </button>
          </div>
        )}

        <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <span className="flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            <span>DPDP Act 2023 Compliant • Hospital OPD Terminal #3</span>
          </span>
          <button
            type="button"
            onClick={() => setIsHelpModalOpen(true)}
            className="font-semibold text-slate-600 hover:text-teal-700 inline-flex items-center space-x-1 transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Need assistance? Request nurse desk support</span>
          </button>
        </div>

      </div>

    </div>
  );
};
