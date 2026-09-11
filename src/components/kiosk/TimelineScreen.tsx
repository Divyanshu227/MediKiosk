import React from 'react';
import { 
  Clock, 
  ArrowRight, 
  ArrowLeft, 
  FileText, 
  Activity, 
  AlertTriangle, 
  Pill, 
  Calendar, 
  Building2, 
  CheckCircle2, 
  ShieldCheck,
  FileCheck2,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TimelineEvent } from '../../types';

export const TimelineScreen: React.FC = () => {
  const { 
    activePatient, 
    setCurrentScreen, 
    navigateBack,
    triggerRedFlagScreen 
  } = useApp();

  // If patient has explicit timeline events, use them; otherwise construct from scanned docs + today
  const events: TimelineEvent[] = activePatient.timelineEvents && activePatient.timelineEvents.length > 0 
    ? activePatient.timelineEvents 
    : [
        ...(activePatient.documents || []).map((doc, idx) => ({
          id: `tl-gen-${idx}`,
          date: doc.date || 'Past Record',
          type: doc.type === 'prescription' ? ('prescription' as const) : ('lab_report' as const),
          title: doc.title,
          facility: doc.clinicOrLab || 'External Facility',
          summary: doc.entities?.map(e => e.text).join(' • ') || doc.ocrText.slice(0, 100),
          tags: doc.abnormalValues?.map(a => `${a.parameter}: ${a.value} ${a.unit}`) || [],
          isAbnormal: (doc.abnormalValues && doc.abnormalValues.length > 0)
        })),
        {
          id: 'tl-today-intake',
          date: 'Today (OPD Intake)',
          type: 'intake' as const,
          title: 'MediKiosk Pre-Consultation Intake',
          facility: 'OPD Terminal #3',
          summary: `${activePatient.clinicalInfo.chiefComplaint} (Duration: ${activePatient.clinicalInfo.duration || 'Acute'})`,
          tags: ['Active Consultation', 'Voice Recorded']
        }
      ];

  const getEventBadge = (type: string, isAbnormal?: boolean) => {
    if (isAbnormal) {
      return {
        bg: 'bg-red-50 text-red-800 border-red-200',
        dot: 'bg-red-600',
        label: 'Abnormal Lab Finding'
      };
    }
    switch (type) {
      case 'prescription':
        return { bg: 'bg-indigo-50 text-indigo-800 border-indigo-200', dot: 'bg-indigo-600', label: 'Prescription' };
      case 'lab_report':
        return { bg: 'bg-amber-50 text-amber-800 border-amber-200', dot: 'bg-amber-600', label: 'Laboratory' };
      case 'intake':
        return { bg: 'bg-teal-50 text-teal-800 border-teal-200', dot: 'bg-teal-600', label: 'Today Intake' };
      default:
        return { bg: 'bg-slate-50 text-slate-800 border-slate-200', dot: 'bg-slate-600', label: 'Medical Event' };
    }
  };

  return (
    <div className="flex-1 max-w-4xl mx-auto w-full px-3 sm:px-6 py-4 sm:py-8 space-y-5 sm:space-y-6 animate-fadeIn">
      
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-200">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setCurrentScreen('document-scanner')}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-xs transition-colors shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-teal-50 text-teal-900 border border-teal-200 px-2 py-0.5 rounded">
            Step 6 of 9 • Longitudinal Timeline
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => triggerRedFlagScreen('Sudden retrosternal crushing chest discomfort with left arm radiation (ACS Alert)')}
            className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold flex items-center space-x-1.5 transition-colors"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
            <span>Demo Red-Flag</span>
          </button>

          <button
            onClick={() => setCurrentScreen('review')}
            className="px-3.5 sm:px-4 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center space-x-1.5 shadow-sm transition-colors"
          >
            <span>Continue to Review</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Timeline Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-8 shadow-sm space-y-5 sm:space-y-6">
        
        {/* Banner */}
        <div className="pb-4 border-b border-slate-100">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded bg-teal-50 text-teal-800 text-xs font-semibold mb-2 border border-teal-200">
            <Sparkles className="w-3.5 h-3.5 text-teal-700" />
            <span>Chronological Health Record</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Patient Health Timeline
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Patient: <strong className="text-slate-800">{activePatient.name}</strong> ({activePatient.age}y/{activePatient.gender}) • Token #{activePatient.tokenNumber}
          </p>
        </div>

        {/* Timeline Visualization */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-teal-200 space-y-6 my-2">
          {events.map((event, idx) => {
            const badge = getEventBadge(event.type, event.isAbnormal);
            const isLatest = idx === events.length - 1;

            return (
              <div key={event.id} className="relative group">
                
                {/* Timeline Dot Marker */}
                <div className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 border-white ${
                  event.isAbnormal ? 'bg-red-600 ring-4 ring-red-100' : isLatest ? 'bg-teal-700 ring-4 ring-teal-100' : 'bg-slate-400'
                }`}></div>

                {/* Event Card */}
                <div className={`p-4 rounded-xl border transition-all ${
                  event.isAbnormal 
                    ? 'border-red-200 bg-red-50/20 shadow-xs' 
                    : isLatest 
                    ? 'border-teal-300 bg-teal-50/20 shadow-xs' 
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-bold text-slate-700 flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{event.date}</span>
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${badge.bg}`}>
                        {badge.label}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-500 font-medium flex items-center space-x-1">
                      <Building2 className="w-3 h-3 text-slate-400" />
                      <span>{event.facility}</span>
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 mb-1">
                    {event.title}
                  </h3>
                  
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {event.summary}
                  </p>

                  {/* Highlighted Clinical Tags */}
                  {event.tags && event.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2.5 pt-2 border-t border-slate-100">
                      {event.tags.map((tag, tIdx) => (
                        <span 
                          key={tIdx}
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                            tag.includes('9.4%') || tag.includes('Critical') || tag.includes('214')
                              ? 'bg-red-50 text-red-800 border-red-200'
                              : 'bg-slate-100 text-slate-700 border-slate-200'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                </div>

              </div>
            );
          })}
        </div>

        {/* Clinical Value Callout */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start space-x-3 text-xs text-slate-700">
          <FileCheck2 className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-slate-900">Why the Longitudinal Timeline Matters to Attending Doctors</h4>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Instead of rifling through a folder of loose prescriptions, the physician immediately sees prior antihypertensive regimens (Amlodipine 5mg), recent glycemic deterioration (HbA1c 9.4%), and today's acute febrile complaint in exact chronological context.
            </p>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <button
            onClick={() => setCurrentScreen('document-scanner')}
            className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-xs transition-colors"
          >
            ← Back to Document Scanner
          </button>

          <button
            onClick={() => setCurrentScreen('review')}
            className="px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center space-x-2 shadow-sm transition-all"
          >
            <span>Proceed to Step 8: Patient Review</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
