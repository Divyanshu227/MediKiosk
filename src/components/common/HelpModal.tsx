import React, { useState } from 'react';
import { X, HelpCircle, PhoneCall, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const HelpModal: React.FC = () => {
  const { isHelpModalOpen, setIsHelpModalOpen, showToast } = useApp();
  const [nurseRequested, setNurseRequested] = useState(false);

  if (!isHelpModalOpen) return null;

  const handleNurseCall = () => {
    setNurseRequested(true);
    showToast('A hospital staff member has been notified to assist you at this terminal.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-xl border border-slate-200 relative">
        
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Kiosk Assistance</h2>
              <p className="text-xs text-slate-500">Instructions & hospital staff help</p>
            </div>
          </div>
          <button 
            onClick={() => {
              setIsHelpModalOpen(false);
              setNurseRequested(false);
            }}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-5 space-y-4">
          
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2.5">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Quick Steps</h3>
            
            <div className="flex items-start space-x-2.5 text-xs text-slate-600">
              <div className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 font-bold text-xs">1</div>
              <p>Select your native language from the 10 available regional languages.</p>
            </div>
            
            <div className="flex items-start space-x-2.5 text-xs text-slate-600">
              <div className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 font-bold text-xs">2</div>
              <p>Tap the microphone button to speak your symptoms, or use the keyboard if preferred.</p>
            </div>

            <div className="flex items-start space-x-2.5 text-xs text-slate-600">
              <div className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 font-bold text-xs">3</div>
              <p>Review the captured summary and send it directly to your doctor's queue.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-center">
            {nurseRequested ? (
              <div className="flex items-center justify-center space-x-2 text-emerald-800 font-semibold py-2 text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Hospital attendant notified for Terminal #3.</span>
              </div>
            ) : (
              <div>
                <p className="text-xs text-amber-950 font-medium mb-3">
                  Need in-person physical help or wheelchair assistance?
                </p>
                <button
                  onClick={handleNurseCall}
                  className="w-full py-2.5 px-4 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs shadow-sm transition-all flex items-center justify-center space-x-2"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Request Hospital Attendant</span>
                </button>
              </div>
            )}
          </div>

        </div>

        <div className="pt-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={() => {
              setIsHelpModalOpen(false);
              setNurseRequested(false);
            }}
            className="w-full sm:w-auto px-5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
          >
            Back to Kiosk
          </button>
        </div>

      </div>
    </div>
  );
};
