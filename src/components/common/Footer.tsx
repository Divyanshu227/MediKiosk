import React from 'react';
import { 
  ShieldCheck, 
  Info, 
  AlertTriangle, 
  Layers, 
  HeartHandshake, 
  Lock, 
  CheckCircle2, 
  HelpCircle,
  Eye,
  Activity,
  Stethoscope,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getRouteDetails } from '../../routes';
import { ScreenType } from '../../types';

export const Footer: React.FC = () => {
  const { 
    currentScreen,
    setCurrentScreen,
    setIsAboutModalOpen, 
    setIsArchitectureModalOpen,
    setIsAccessibilityModalOpen,
    setIsHelpModalOpen,
    triggerRedFlagScreen,
    clinicalDepartment,
    activeDoctor
  } = useApp();

  const isDoctorMode = currentScreen.startsWith('doctor-');
  const route = getRouteDetails(currentScreen);

  // Kiosk Journey Steps for quick navigation and orientation
  const KIOSK_STEPS: { id: ScreenType; label: string; step: number }[] = [
    { id: 'patient-id', label: 'ID & ABHA', step: 1 },
    { id: 'language', label: 'Language', step: 2 },
    { id: 'consent', label: 'Consent', step: 3 },
    { id: 'voice-intake', label: 'Mic Check', step: 4 },
    { id: 'ai-conversation', label: 'Case-Taking', step: 5 },
    { id: 'document-scanner', label: 'OCR Scanner', step: 6 },
    { id: 'timeline', label: 'Timeline', step: 7 },
    { id: 'review', label: 'Verify', step: 8 },
    { id: 'clinical-summary', label: 'Summary & Slip', step: 9 },
  ];

  /* -------------------------------------------------------------
   * DOCTOR WORKSTATION FOOTER: Sleek, compact clinical status bar
   * ------------------------------------------------------------- */
  if (isDoctorMode) {
    return (
      <footer className="mt-auto border-t border-slate-200 bg-white/95 backdrop-blur-sm text-slate-600 text-xs py-2.5 px-4 sm:px-6 shadow-sm z-30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
          {/* Left: HIS & Attending Info */}
          <div className="flex flex-wrap items-center gap-2 text-slate-600">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              HIS Gateway Active
            </span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span className="font-medium text-slate-700 flex items-center gap-1">
              <Stethoscope className="w-3.5 h-3.5 text-teal-600" />
              {activeDoctor.name} ({activeDoctor.regNumber})
            </span>
            <span className="text-slate-300 hidden md:inline">•</span>
            <span className="text-slate-500 hidden md:inline">
              OPD Room {activeDoctor.roomNumber} ({activeDoctor.department})
            </span>
            <span className="text-slate-300 hidden lg:inline">•</span>
            <span className="text-slate-500 hidden lg:inline">
              HL7 FHIR v4.0.1 Ready
            </span>
          </div>

          {/* Right: Quick Doctor Actions & Modals */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsArchitectureModalOpen(true)}
              className="px-2.5 py-1 rounded-md text-slate-600 hover:text-teal-700 hover:bg-slate-100 font-medium transition-colors flex items-center gap-1 text-[11px]"
              title="View Technical Architecture & Data Flow"
            >
              <Layers className="w-3.5 h-3.5 text-teal-600" />
              <span className="hidden sm:inline">Architecture</span>
            </button>

            <button
              onClick={() => setIsAboutModalOpen(true)}
              className="px-2.5 py-1 rounded-md text-slate-600 hover:text-teal-700 hover:bg-slate-100 font-medium transition-colors flex items-center gap-1 text-[11px]"
              title="View Smart India Hackathon 2026 Details"
            >
              <Info className="w-3.5 h-3.5 text-teal-600" />
              <span>SIH #26047</span>
            </button>

            <button
              onClick={() => setCurrentScreen('kiosk-home')}
              className="px-2.5 py-1 rounded-md bg-teal-50 hover:bg-teal-100 text-teal-800 font-semibold border border-teal-200 transition-colors flex items-center gap-1 text-[11px]"
            >
              <span>Kiosk Mode</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </footer>
    );
  }

  /* -------------------------------------------------------------
   * PATIENT KIOSK FOOTER: Comprehensive, Reassuring, Guided
   * ------------------------------------------------------------- */
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white text-slate-600 text-xs">
      {/* Top Emergency Ribbon */}
      <div className="bg-gradient-to-r from-red-50 via-amber-50 to-red-50 border-b border-red-100/80 px-4 py-2 text-slate-700">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center space-x-2">
            <span className="p-1 rounded-full bg-red-100 text-red-600 shrink-0">
              <AlertTriangle className="w-3.5 h-3.5" />
            </span>
            <p className="text-[11px] sm:text-xs">
              <strong className="text-red-700 font-semibold">Emergency Triage Notice:</strong> If you feel acute chest pressure, extreme breathlessness, severe bleeding, or trauma, alert hospital staff immediately or press Emergency.
            </p>
          </div>
          <button
            onClick={() => triggerRedFlagScreen('Patient reported severe acute symptoms during intake')}
            className="shrink-0 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-[11px] shadow-sm transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Activity className="w-3 h-3 animate-pulse" />
            <span>Emergency Alert</span>
          </button>
        </div>
      </div>

      {/* Interactive Kiosk Stepper (Visible during multi-step flow) */}
      {route.stepNumber && (
        <div className="bg-slate-50 border-b border-slate-200/80 py-2.5 px-4 overflow-x-auto scrollbar-none">
          <div className="max-w-7xl mx-auto flex items-center justify-between min-w-[720px] text-[11px]">
            <div className="flex items-center gap-1 font-semibold text-slate-700 shrink-0 mr-3">
              <span className="w-2 h-2 rounded-full bg-teal-600"></span>
              <span>Intake Progress:</span>
            </div>
            <div className="flex items-center gap-1.5 flex-1 justify-between">
              {KIOSK_STEPS.map((step) => {
                const isActive = currentScreen === step.id;
                const isPast = (route.stepNumber || 0) > step.step;
                return (
                  <button
                    key={step.id}
                    onClick={() => setCurrentScreen(step.id)}
                    className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-teal-600 text-white font-bold shadow-xs'
                        : isPast
                        ? 'text-teal-800 bg-teal-50/80 font-medium hover:bg-teal-100'
                        : 'text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 font-normal'
                    }`}
                  >
                    <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-semibold ${
                      isActive ? 'bg-white text-teal-700' : isPast ? 'bg-teal-200 text-teal-900' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {step.step}
                    </span>
                    <span>{step.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          
          {/* Col 1: Legal Non-Diagnostic Notice */}
          <div className="flex items-start space-x-2.5">
            <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <div className="text-[11px] leading-relaxed text-slate-600">
              <strong className="text-slate-800 font-semibold">Assistive Medical Intake:</strong> MediKiosk prepares standardized clinical intake summaries for doctor review. It does not provide medical diagnoses or prescribe medications autonomously.
            </div>
          </div>

          {/* Col 2: Compliance & Standards Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200 font-medium text-[11px]">
              <CheckCircle2 className="w-3 h-3 text-teal-600" />
              ABDM (M1-M3)
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200 font-medium text-[11px]">
              <Lock className="w-3 h-3 text-teal-600" />
              DPDP Act 2023
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200 font-medium text-[11px]">
              <HeartHandshake className="w-3 h-3 text-teal-600" />
              HL7 FHIR R4
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-teal-50 text-teal-800 border border-teal-200 font-medium text-[11px] capitalize">
              {clinicalDepartment} Track
            </span>
          </div>

          {/* Col 3: Quick Modal Triggers & Help Links */}
          <div className="flex items-center justify-center md:justify-end gap-3 text-slate-600 font-medium">
            <button
              onClick={() => setIsAccessibilityModalOpen(true)}
              className="hover:text-teal-700 transition-colors flex items-center gap-1 text-[11px] cursor-pointer"
              title="Accessibility: High Contrast, Font Size, TTS"
            >
              <Eye className="w-3.5 h-3.5 text-teal-600" />
              <span>Accessibility</span>
            </button>
            <span className="text-slate-300">•</span>
            <button
              onClick={() => setIsHelpModalOpen(true)}
              className="hover:text-teal-700 transition-colors flex items-center gap-1 text-[11px] cursor-pointer"
              title="Help & Assisted Mode"
            >
              <HelpCircle className="w-3.5 h-3.5 text-teal-600" />
              <span>Assistance</span>
            </button>
            <span className="text-slate-300">•</span>
            <button 
              onClick={() => setIsArchitectureModalOpen(true)}
              className="hover:text-teal-700 transition-colors flex items-center gap-1 text-[11px] cursor-pointer"
              title="Technical Architecture & Pipeline"
            >
              <Layers className="w-3.5 h-3.5 text-teal-600" />
              <span className="hidden sm:inline">Architecture</span>
            </button>
            <span className="text-slate-300">•</span>
            <button 
              onClick={() => setIsAboutModalOpen(true)}
              className="hover:text-teal-700 transition-colors flex items-center gap-1 text-[11px] cursor-pointer"
              title="About MediKiosk (SIH26047)"
            >
              <Info className="w-3.5 h-3.5 text-teal-600" />
              <span>SIH #26047</span>
            </button>
          </div>

        </div>

        {/* Bottom copyright & Hospital reference */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-400">
          <div>MediKiosk v2.4 • Smart India Hackathon 2026 Prototype • Team TechHorizon</div>
          <div className="flex items-center gap-3 mt-1 sm:mt-0">
            <span>Terminal: OPD Kiosk #3</span>
            <span>•</span>
            <span>Route: <code className="text-teal-700 bg-teal-50 px-1 py-0.5 rounded font-mono">{route.canonicalHash}</code></span>
          </div>
        </div>
      </div>
    </footer>
  );
};
