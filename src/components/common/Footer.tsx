import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { setIsAboutModalOpen } = useApp();

  return (
    <footer className="mt-auto border-t border-slate-200 bg-white py-5 text-slate-500 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          
          <div className="flex items-center space-x-2 text-center md:text-left">
            <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
            <p className="text-slate-600">
              <strong className="text-slate-800 font-semibold">Clinical Decision Support:</strong> MediKiosk structures patient intake data. Attending healthcare professionals make all final diagnostic and treatment decisions.
            </p>
          </div>

          <div className="flex items-center space-x-3 font-medium text-slate-500">
            <button 
              onClick={() => setIsAboutModalOpen(true)}
              className="hover:text-teal-700 transition-colors flex items-center space-x-1"
            >
              <Info className="w-3.5 h-3.5 text-teal-600" />
              <span>Project Details & Clinical Rationale</span>
            </button>
            <span>•</span>
            <span>OPD Intake Assistant</span>
          </div>

        </div>
      </div>
    </footer>
  );
};
