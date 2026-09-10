import React, { useState } from 'react';
import { X, HelpCircle, PhoneCall, Mic, FileText, CheckCircle2, UserCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const HelpModal: React.FC = () => {
  const { isHelpModalOpen, setIsHelpModalOpen, showToast } = useApp();
  const [nurseRequested, setNurseRequested] = useState(false);

  if (!isHelpModalOpen) return null;

  const handleNurseCall = () => {
    setNurseRequested(true);
    showToast('A hospital staff member has been notified and is coming to assist you.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">How Can We Help You?</h2>
              <p className="text-xs text-slate-500">Assistance for using Medikiosk</p>
            </div>
          </div>
          <button 
            onClick={() => {
              setIsHelpModalOpen(false);
              setNurseRequested(false);
            }}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-6 space-y-4">
          
          {/* Guide Steps */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/70 space-y-3">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Quick Instructions</h3>
            
            <div className="flex items-start space-x-3 text-sm text-slate-600">
              <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center flex-shrink-0 font-bold text-xs">1</div>
              <p>Select your native language from the 10 available Indian languages.</p>
            </div>
            
            <div className="flex items-start space-x-3 text-sm text-slate-600">
              <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center flex-shrink-0 font-bold text-xs">2</div>
              <p>Tap the big round microphone button and describe your symptoms normally.</p>
            </div>

            <div className="flex items-start space-x-3 text-sm text-slate-600">
              <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center flex-shrink-0 font-bold text-xs">3</div>
              <p>Review the collected health summary and send it directly to your doctor's screen.</p>
            </div>
          </div>

          {/* Nurse Assistance Button */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-center">
            {nurseRequested ? (
              <div className="flex items-center justify-center space-x-2 text-emerald-700 font-semibold py-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 animate-bounce" />
                <span>Hospital attendant dispatched to Kiosk #3!</span>
              </div>
            ) : (
              <div>
                <p className="text-sm text-amber-900 font-medium mb-3">
                  Need in-person physical help or wheelchair assistance?
                </p>
                <button
                  onClick={handleNurseCall}
                  className="w-full py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call Hospital Attendant to Kiosk</span>
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Close */}
        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={() => {
              setIsHelpModalOpen(false);
              setNurseRequested(false);
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-all"
          >
            Back to Kiosk
          </button>
        </div>

      </div>
    </div>
  );
};
