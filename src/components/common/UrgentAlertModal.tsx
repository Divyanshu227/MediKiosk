import React, { useState } from 'react';
import { AlertTriangle, PhoneCall, ShieldAlert, CheckCircle2, Stethoscope, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const UrgentAlertModal: React.FC = () => {
  const { isUrgentAlertOpen, setIsUrgentAlertOpen, urgentReason, setCurrentScreen, showToast } = useApp();
  const [staffCalled, setStaffCalled] = useState(false);

  if (!isUrgentAlertOpen) return null;

  const handleCallStaff = () => {
    setStaffCalled(true);
    showToast('URGENT: Emergency ER triage team notified for Kiosk #3!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-red-950/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-4 border-red-500 relative">
        
        {/* Urgent Badge Header */}
        <div className="flex items-center space-x-3 pb-4 border-b border-red-100">
          <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 animate-bounce">
            <ShieldAlert className="w-8 h-8 stroke-[2.5]" />
          </div>
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-red-600 text-white mb-1">
              Priority Clinical Safety Alert
            </span>
            <h2 className="text-xl font-black text-red-900 leading-tight">Urgent Attention Required</h2>
          </div>
        </div>

        {/* Body Content */}
        <div className="py-6 space-y-4">
          
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-900 text-sm">
            <p className="font-bold text-base mb-1">
              IMPORTANT: Your symptoms may require urgent medical attention.
            </p>
            <p className="text-xs text-red-700">
              Reason detected: <span className="font-semibold italic">{urgentReason}</span>
            </p>
          </div>

          <p className="text-slate-700 text-sm font-medium">
            Please seek immediate direct assistance from the hospital triage staff or proceed directly to the Emergency Care desk.
          </p>

          {/* Action buttons */}
          <div className="space-y-3 pt-2">
            
            {staffCalled ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center space-x-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 animate-pulse" />
                <div>
                  <h4 className="font-bold text-sm">Emergency Staff Alerted!</h4>
                  <p className="text-xs text-emerald-700">Please remain at the kiosk. An ER triage nurse is arriving immediately.</p>
                </div>
              </div>
            ) : (
              <button
                onClick={handleCallStaff}
                className="w-full py-4 px-6 rounded-2xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-black text-base shadow-lg shadow-red-600/30 transition-all flex items-center justify-center space-x-2"
              >
                <PhoneCall className="w-5 h-5 animate-pulse" />
                <span>Call Emergency Healthcare Staff Now</span>
              </button>
            )}

            <button
              onClick={() => {
                setIsUrgentAlertOpen(false);
                setStaffCalled(false);
                setCurrentScreen('doctor-dashboard');
              }}
              className="w-full py-3 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all flex items-center justify-center space-x-2"
            >
              <Stethoscope className="w-4 h-4 text-teal-400" />
              <span>Continue Only with Healthcare Professional (Doctor View)</span>
            </button>

            <button
              onClick={() => {
                setIsUrgentAlertOpen(false);
                setStaffCalled(false);
              }}
              className="w-full py-2.5 px-4 text-slate-500 hover:text-slate-800 text-xs font-semibold transition-colors"
            >
              Dismiss (Return to intake)
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};
