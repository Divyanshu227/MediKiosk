import React from 'react';
import { ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { currentScreen, setIsAboutModalOpen } = useApp();
  const isDoctorSide = currentScreen.startsWith('doctor-');

  return (
    <footer className="mt-auto border-t border-slate-200 bg-white/80 py-6 text-slate-500 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Trust disclaimer */}
          <div className="flex items-center space-x-2.5 text-center md:text-left">
            <ShieldCheck className="w-5 h-5 text-teal-600 flex-shrink-0" />
            <p className="text-xs text-slate-600">
              <strong className="text-slate-800 font-semibold">Clinical Decision Support:</strong> Medikiosk assists with structured patient intake. A qualified healthcare professional makes all final diagnostic & treatment decisions.
            </p>
          </div>

          {/* Quick links & Rationale */}
          <div className="flex items-center space-x-4 text-xs font-medium text-slate-500">
            <button 
              onClick={() => setIsAboutModalOpen(true)}
              className="hover:text-teal-600 transition-colors flex items-center space-x-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Technology & Feasibility</span>
            </button>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <span>Made for inclusive healthcare</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 inline fill-rose-500" />
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
};
