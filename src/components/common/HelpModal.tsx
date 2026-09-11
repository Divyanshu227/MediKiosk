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
      <div className="bg-white rounded-xl max-w-md w-full p-5 sm:p-6 shadow-xl border border-slate-200 relative">
        
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-md bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Kiosk Assistance</h2>
              <p className="text-[11px] text-slate-500">Instructions & hospital staff help</p>
            </div>
          </div>
          <button 
            onClick={() => {
              setIsHelpModalOpen(false);
              setNurseRequested(false);
            }}
            className="p-1 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="py-4 space-y-3">
          
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 space-y-2">
            <h3 className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">Quick Steps</h3>
            
            <div className="flex items-start space-x-2 text-xs text-slate-600">
              <div className="w-4 h-4 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 font-bold text-[10px]">1</div>
              <p>Select your native language from the 10 available regional languages.</p>
            </div>
            
            <div className="flex items-start space-x-2 text-xs text-slate-600">
              <div className="w-4 h-4 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 font-bold text-[10px]">2</div>
              <p>Tap the microphone button to speak your symptoms, or type with the keyboard.</p>
            </div>

            <div className="flex items-start space-x-2 text-xs text-slate-600">
              <div className="w-4 h-4 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 font-bold text-[10px]">3</div>
              <p>Review the summary slip and send it directly to your doctor's queue.</p>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-center">
            {nurseRequested ? (
              <div className="flex items-center justify-center space-x-2 text-emerald-800 font-semibold py-1 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Hospital attendant notified for Terminal #3.</span>
              </div>
            ) : (
              <div>
                <p className="text-xs text-amber-950 font-medium mb-2.5">
                  Need in-person physical help or wheelchair assistance?
                </p>
                <button
                  onClick={handleNurseCall}
                  className="w-full py-2 px-3 rounded-md bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs shadow-sm transition-colors flex items-center justify-center space-x-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Request Hospital Attendant</span>
                </button>
              </div>
            )}
          </div>

        </div>

        <div className="pt-2.5 border-t border-slate-200 flex justify-end">
          <button
            onClick={() => {
              setIsHelpModalOpen(false);
              setNurseRequested(false);
            }}
            className="px-4 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs transition-colors"
          >
            Back to Kiosk
          </button>
        </div>

      </div>
    </div>
  );
};
