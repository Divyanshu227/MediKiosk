import React, { useState } from 'react';
import { 
  X, 
  Stethoscope, 
  Lock, 
  ShieldCheck, 
  ArrowRight, 
  AlertCircle,
  Building2,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DoctorLoginModal: React.FC = () => {
  const { 
    isDoctorLoginModalOpen, 
    setIsDoctorLoginModalOpen, 
    loginDoctor, 
    activeDoctor,
    setCurrentScreen 
  } = useApp();

  const [regNumber, setRegNumber] = useState('MCI-48201');
  const [pin, setPin] = useState('1234');
  const [error, setError] = useState<string | null>(null);

  if (!isDoctorLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginDoctor(regNumber, pin);
    if (success) {
      setCurrentScreen('doctor-dashboard');
    } else {
      setError('Invalid Medical Council ID or PIN. (Demo PIN: 1234)');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative">
        
        {/* Close Button */}
        <button
          onClick={() => setIsDoctorLoginModalOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 pb-4 border-b border-slate-100">
          <div className="w-11 h-11 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 flex items-center justify-center font-bold shrink-0">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-teal-50 text-teal-800 border border-teal-200 px-2 py-0.5 rounded">
              Physician & Staff Auth
            </span>
            <h2 className="text-base font-bold text-slate-900 mt-0.5">Doctor EMR Login</h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="py-4 space-y-3.5">
          
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
              Medical Registration Number (NMC / State Council)
            </label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={regNumber}
                onChange={(e) => {
                  setRegNumber(e.target.value);
                  setError(null);
                }}
                placeholder="e.g. MCI-48201 or DMC-9821"
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-xs font-bold text-slate-900 uppercase focus:outline-none focus:border-teal-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
              EMR Access PIN / Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError(null);
                }}
                placeholder="Enter PIN (demo: 1234)"
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:border-teal-700"
              />
            </div>
          </div>

          {error && (
            <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-800 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1">
            <div className="flex items-center space-x-1.5 font-bold text-slate-800">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
              <span>Attending Physician Session</span>
            </div>
            <p>Dr. Alok K. Sharma • MD (Internal Med) • OPD Room 204</p>
          </div>

          <div className="pt-2 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsDoctorLoginModalOpen(false)}
              className="px-4 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-sm flex items-center space-x-1.5"
            >
              <span>Authenticate & Open Queue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
