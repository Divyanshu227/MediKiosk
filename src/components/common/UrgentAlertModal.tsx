import React, { useState } from 'react';
import { PhoneCall, ShieldAlert, CheckCircle2, Stethoscope } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const UrgentAlertModal: React.FC = () => {
  const { isUrgentAlertOpen, setIsUrgentAlertOpen, urgentReason, setCurrentScreen, showToast } = useApp();
  const [staffCalled, setStaffCalled] = useState(false);

  if (!isUrgentAlertOpen) return null;

  const handleCallStaff = () => {
    setStaffCalled(true);
    showToast('Emergency triage team notified for Terminal #3.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border-2 border-red-500 relative">
        
        <div className="flex items-center space-x-3 pb-4 border-b border-red-100">
          <div className="w-11 h-11 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-6 h-6 stroke-[2]" />
          </div>
          <div>
            <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-red-100 text-red-800 border border-red-200 mb-0.5">
              Priority Clinical Safety Alert
            </span>
            <h2 className="text-lg font-bold text-red-950">Immediate Medical Attention Required</h2>
          </div>
        </div>

        <div className="py-5 space-y-4">
          
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs">
            <p className="font-bold text-sm mb-1">
              Your reported symptoms indicate a potential medical emergency.
            </p>
            <p className="text-red-700">
              Trigger symptom: <span className="font-semibold">{urgentReason}</span>
            </p>
          </div>

          <p className="text-slate-700 text-xs leading-relaxed">
            Please seek direct in-person evaluation immediately at the Emergency / Triage counter.
          </p>

          <div className="space-y-2.5 pt-1">
            
            {staffCalled ? (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center space-x-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="font-bold text-xs">Triage Staff Alerted</h4>
                  <p className="text-[11px] text-emerald-700">Please stay at the kiosk. A triage nurse is on the way.</p>
                </div>
              </div>
            ) : (
              <button
                onClick={handleCallStaff}
                className="w-full py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center space-x-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Emergency Triage Staff</span>
              </button>
            )}

            <button
              onClick={() => {
                setIsUrgentAlertOpen(false);
                setStaffCalled(false);
                setCurrentScreen('doctor-dashboard');
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors flex items-center justify-center space-x-2"
            >
              <Stethoscope className="w-4 h-4 text-teal-400" />
              <span>Switch to Doctor View</span>
            </button>

            <button
              onClick={() => {
                setIsUrgentAlertOpen(false);
                setStaffCalled(false);
              }}
              className="w-full py-2 px-4 text-slate-500 hover:text-slate-800 text-xs font-medium transition-colors text-center"
            >
              Dismiss and continue intake
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};
