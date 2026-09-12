import React, { useState } from 'react';
import { 
  Users, 
  Clock, 
  CheckCircle2, 
  Search, 
  Stethoscope, 
  Globe, 
  RefreshCw,
  Eye,
  FileCheck2,
  AlertTriangle,
  FileText,
  Mic,
  Touchpad,
  AlertCircle,
  ShieldAlert,
  HelpCircle,
  Tag
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { InPageFeedbackCard } from '../common/InPageFeedbackCard';
import { Patient } from '../../types';

interface DoctorDashboardProps {
  activeTab?: 'dashboard' | 'queue' | 'consultations' | 'completed' | 'settings';
  setActiveTab?: (tab: 'dashboard' | 'queue' | 'consultations' | 'completed' | 'settings') => void;
}

export const DoctorDashboard: React.FC<DoctorDashboardProps> = ({ activeTab = 'dashboard', setActiveTab }) => {
  const { 
    patientQueue, 
    setSelectedDoctorPatient, 
    setCurrentScreen, 
    showToast 
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState<'all' | 'allopathy' | 'ayush' | 'urgent' | 'review'>('all');

  const completedCount = patientQueue.filter(p => p.status === 'Complete').length;
  const readyCount = patientQueue.filter(p => p.status === 'Complete' && !p.doctorReviewed).length;
  const ayushCount = patientQueue.filter(p => p.department === 'ayush').length;
  const urgentCount = patientQueue.filter(p => p.priority === 'High' || p.priority === 'Urgent' || (p.redFlags && p.redFlags.length > 0)).length;
  const needsReviewCount = patientQueue.filter(p => p.status === 'Needs Review' || (p.missingInformation && p.missingInformation.length > 0)).length;

  const filteredPatients = patientQueue.filter(patient => {
    const matchesSearch = 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.tokenNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.chiefComplaint.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (activeTab === 'queue' && patient.doctorReviewed) {
      return false;
    }
    if (activeTab === 'completed' && !patient.doctorReviewed) {
      return false;
    }

    if (filterDepartment === 'allopathy') {
      return patient.department === 'allopathy';
    }
    if (filterDepartment === 'ayush') {
      return patient.department === 'ayush';
    }
    if (filterDepartment === 'urgent') {
      return patient.priority === 'High' || patient.priority === 'Urgent' || (patient.redFlags && patient.redFlags.length > 0);
    }
    if (filterDepartment === 'review') {
      return patient.status === 'Needs Review' || (patient.missingInformation && patient.missingInformation.length > 0);
    }
    return true;
  });

  const handleReviewPatient = (patient: Patient) => {
    setSelectedDoctorPatient(patient);
    setCurrentScreen('doctor-patient-summary');
  };

  const getCaseLabel = (patientId: string) => {
    switch (patientId) {
      case 'P-1024':
        return { label: 'Case A: Returning Chronic', desc: 'Diabetes/HTN • Multi-Docs' };
      case 'P-1049':
        return { label: 'Case B: Bengali Voice Intake', desc: 'New Patient • Needs Review' };
      case 'P-1002':
        return { label: 'Case C: Acute Red-Flag Triage', desc: 'Chest Pain • Urgent Escalation' };
      case 'P-1035':
        return { label: 'Case D: AYUSH Case-Taking', desc: 'Sandhivata • Dashavidha' };
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 p-4 sm:p-6 pb-14 space-y-4 max-w-7xl mx-auto w-full animate-fadeIn min-w-0">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              OPD Clinical Queue & EHR Worklist
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 text-teal-800 border border-teal-200">
              Live Terminal Sync
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200 hidden sm:inline-block">
              Simulated Demo Worklist
            </span>
          </div>
          <p className="text-xs text-slate-500 font-normal mt-0.5">
            Real-time pre-consultation intake summaries & digitized records • Dr. Sharma (OPD Room 204)
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => showToast('Queue synced with latest terminal check-ins.')}
            className="p-1.5 px-3 rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold flex items-center space-x-1.5 transition-colors shadow-2xs"
          >
            <RefreshCw className="w-3.5 h-3.5 text-teal-700" />
            <span>Sync HIS Queue</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        
        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Total In Queue</span>
            <Users className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{patientQueue.length}</div>
          <p className="text-[11px] text-slate-500 mt-0.5">{ayushCount} AYUSH • {patientQueue.length - ayushCount} General Med</p>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Completed Intakes</span>
            <FileCheck2 className="w-4 h-4 text-teal-700" />
          </div>
          <div className="text-2xl font-bold text-teal-800">{completedCount}</div>
          <p className="text-[11px] text-teal-700 mt-0.5">Pre-visit SOAP ready</p>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Intake Time Saved</span>
            <Clock className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-700">~7 mins</div>
          <p className="text-[11px] text-slate-500 mt-0.5">Saved per consultation</p>
        </div>

        <div className="p-3.5 rounded-xl bg-teal-800 text-white shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-semibold text-teal-200 uppercase tracking-wider">Awaiting Physician</span>
            <Stethoscope className="w-4 h-4 text-teal-200" />
          </div>
          <div className="text-2xl font-bold">{readyCount}</div>
          <p className="text-[11px] text-teal-100 mt-0.5">Ready for examination</p>
        </div>

      </div>

      {/* Main Worklist Table Container */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        
        {/* Table Filter Controls */}
        <div className="p-3.5 border-b border-slate-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-slate-50/50">
          
          <div className="flex items-center space-x-2">
            <h2 className="text-sm font-bold text-slate-900">Hospital OPD Worklist</h2>
            <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-800 text-xs font-mono font-bold">
              {filteredPatients.length} Active
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search token, name, symptom..."
                className="w-full sm:w-60 pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-teal-700 text-slate-900 bg-white"
              />
            </div>

            {/* Department & Triage Filter Pills */}
            <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-200/80 rounded-lg text-xs font-medium">
              <button
                onClick={() => setFilterDepartment('all')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  filterDepartment === 'all' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All ({patientQueue.length})
              </button>
              <button
                onClick={() => setFilterDepartment('allopathy')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  filterDepartment === 'allopathy' ? 'bg-white text-teal-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Medicine
              </button>
              <button
                onClick={() => setFilterDepartment('ayush')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  filterDepartment === 'ayush' ? 'bg-amber-700 text-white shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                AYUSH ({ayushCount})
              </button>
              <button
                onClick={() => setFilterDepartment('urgent')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  filterDepartment === 'urgent' ? 'bg-red-600 text-white shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Triage / Red Flag ({urgentCount})
              </button>
              <button
                onClick={() => setFilterDepartment('review')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  filterDepartment === 'review' ? 'bg-orange-600 text-white shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Needs Review ({needsReviewCount})
              </button>
            </div>

          </div>

        </div>

        {/* Desktop Table List (>= md) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs table-fixed min-w-[940px]">
            <colgroup>
              <col className="w-[23%]" />  {/* Token & Patient */}
              <col className="w-[9%]" />   {/* Dept */}
              <col className="w-[25%]" />  {/* Chief Complaint */}
              <col className="w-[10%]" />  {/* Modality & Lang */}
              <col className="w-[9%]" />   {/* Scanned Docs */}
              <col className="w-[12%]" />  {/* Flags & Gaps */}
              <col className="w-[10%]" />  {/* Status */}
              <col className="w-[12%]" />  {/* Action */}
            </colgroup>
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-2.5 px-3 sm:px-4">Token & Patient</th>
                <th className="py-2.5 px-3">Dept</th>
                <th className="py-2.5 px-3">Chief Complaint & Intake</th>
                <th className="py-2.5 px-3">Modality & Lang</th>
                <th className="py-2.5 px-3">Scanned Docs</th>
                <th className="py-2.5 px-3">Clinical Flags & Gaps</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredPatients.map((patient) => {
                const isComplete = patient.status === 'Complete';
                const isReviewed = patient.doctorReviewed;
                const isAyush = patient.department === 'ayush';
                const docsCount = patient.documents?.length || 0;
                const abnormalDocsCount = patient.documents?.reduce((acc, d) => acc + (d.abnormalValues?.length || 0), 0) || 0;
                const hasRedFlag = (patient.redFlags && patient.redFlags.length > 0) || patient.priority === 'Urgent';
                const missingGaps = patient.missingInformation || [];
                const caseInfo = getCaseLabel(patient.id);

                return (
                  <tr 
                    key={patient.id} 
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                    onClick={() => handleReviewPatient(patient)}
                  >
                    
                    <td className="py-3 px-3 sm:px-4 overflow-hidden">
                      <div className="flex items-center space-x-2.5">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-900 text-white shrink-0">
                          #{patient.tokenNumber}
                        </span>
                        <div className="min-w-0">
                          <div className="font-bold text-slate-900 text-xs flex items-center space-x-1">
                            <span className="truncate">{patient.name}</span>
                            {isReviewed && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline shrink-0" />
                            )}
                          </div>
                          <div className="flex items-center space-x-1.5 text-[10px] text-slate-400 font-mono">
                            <span>{patient.id}</span>
                            <span>•</span>
                            <span>{patient.age}y/{patient.gender[0]}</span>
                          </div>
                          {caseInfo && (
                            <span className="inline-block mt-0.5 text-[9px] font-bold px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-800 border border-indigo-200 truncate max-w-full">
                              {caseInfo.label}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3 overflow-hidden">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        isAyush ? 'bg-amber-50 text-amber-900 border border-amber-200' : 'bg-teal-50 text-teal-900 border border-teal-200'
                      }`}>
                        {isAyush ? 'AYUSH' : 'Medicine'}
                      </span>
                    </td>

                    <td className="py-3 px-3 overflow-hidden">
                      <span className="font-bold text-slate-900 block truncate" title={patient.chiefComplaint}>
                        {patient.chiefComplaint}
                      </span>
                      <div className="flex items-center space-x-1 text-[10px] text-slate-400 font-mono mt-0.5">
                        <Clock className="w-2.5 h-2.5 shrink-0" />
                        <span>{patient.time || patient.intakeTimestamp}</span>
                      </div>
                    </td>

                    <td className="py-3 px-3 overflow-hidden">
                      <div className="space-y-0.5">
                        <div className="flex items-center space-x-1 text-slate-700 text-[11px] font-medium">
                          {patient.inputModality === 'touch' ? (
                            <Touchpad className="w-3 h-3 text-indigo-600 shrink-0" />
                          ) : (
                            <Mic className="w-3 h-3 text-teal-600 shrink-0" />
                          )}
                          <span>{patient.inputModality === 'touch' ? 'Touch' : 'Voice'}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-[10px] text-slate-400">
                          <Globe className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                          <span>{patient.languageName.split(' ')[0]}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3 overflow-hidden">
                      {docsCount > 0 ? (
                        <div>
                          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 text-teal-800 border border-teal-200">
                            <FileText className="w-3 h-3 shrink-0" />
                            <span>{docsCount} files</span>
                          </span>
                          {abnormalDocsCount > 0 && (
                            <span className="block mt-0.5 text-[9px] font-bold text-red-700">
                              {abnormalDocsCount} abnormal
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-[10px] text-slate-400">None</span>
                      )}
                    </td>

                    <td className="py-3 px-3 overflow-hidden">
                      {hasRedFlag ? (
                        <div className="w-full" title={patient.redFlagReason || 'Acute Red Flag'}>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800 border border-red-300 max-w-full overflow-hidden">
                            <AlertTriangle className="w-3 h-3 text-red-600 shrink-0" />
                            <span className="truncate">Acute Red Flag</span>
                          </span>
                          {patient.redFlagReason && (
                            <span className="block text-[9px] text-red-700 font-medium truncate mt-0.5" title={patient.redFlagReason}>
                              {patient.redFlagReason.split('(')[0].trim() || 'ACS Suspected'}
                            </span>
                          )}
                        </div>
                      ) : missingGaps.length > 0 ? (
                        <div className="w-full" title={missingGaps.join('; ')}>
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200 max-w-full overflow-hidden">
                            <HelpCircle className="w-2.5 h-2.5 text-amber-600 shrink-0" />
                            <span className="truncate">{missingGaps.length} history gaps</span>
                          </span>
                        </div>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-medium">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span>Clear Intake</span>
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-3 overflow-hidden">
                      {isReviewed ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 whitespace-nowrap">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span>Reviewed</span>
                        </span>
                      ) : patient.status === 'Needs Review' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-orange-50 text-orange-800 border border-orange-200 whitespace-nowrap">
                          <AlertCircle className="w-3 h-3 text-orange-600 shrink-0" />
                          <span>Needs Review</span>
                        </span>
                      ) : hasRedFlag ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800 border border-red-200 animate-pulse whitespace-nowrap">
                          <AlertTriangle className="w-3 h-3 text-red-600 shrink-0" />
                          <span>Emergency</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 text-teal-800 border border-teal-200 whitespace-nowrap">
                          <Clock className="w-3 h-3 text-teal-600 shrink-0" />
                          <span>SOAP Ready</span>
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-3 text-right shrink-0" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleReviewPatient(patient)}
                        className="px-2.5 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs shadow-2xs transition-colors inline-flex items-center gap-1 whitespace-nowrap cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Open Chart</span>
                      </button>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Patient Card List (< md) */}
        <div className="md:hidden divide-y divide-slate-100">
          {filteredPatients.map((patient) => {
            const isReviewed = patient.doctorReviewed;
            const isAyush = patient.department === 'ayush';
            const docsCount = patient.documents?.length || 0;
            const abnormalDocsCount = patient.documents?.reduce((acc, d) => acc + (d.abnormalValues?.length || 0), 0) || 0;
            const hasRedFlag = (patient.redFlags && patient.redFlags.length > 0) || patient.priority === 'Urgent';
            const missingGaps = patient.missingInformation || [];
            const caseInfo = getCaseLabel(patient.id);

            return (
              <div 
                key={patient.id}
                onClick={() => handleReviewPatient(patient)}
                className="p-3.5 space-y-2.5 bg-white hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-900 text-white shrink-0">
                      #{patient.tokenNumber}
                    </span>
                    <div>
                      <div className="font-bold text-slate-900 text-xs flex items-center space-x-1">
                        <span>{patient.name}</span>
                        {isReviewed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {patient.id} • {patient.age}y/{patient.gender[0]}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                      isAyush ? 'bg-amber-50 text-amber-900 border border-amber-200' : 'bg-teal-50 text-teal-900 border border-teal-200'
                    }`}>
                      {isAyush ? 'AYUSH' : 'Medicine'}
                    </span>
                    {hasRedFlag ? (
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-red-100 text-red-800 border border-red-200 animate-pulse">
                        Emergency
                      </span>
                    ) : isReviewed ? (
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        Reviewed
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-teal-50 text-teal-800 border border-teal-200">
                        Ready
                      </span>
                    )}
                  </div>
                </div>

                {caseInfo && (
                  <span className="inline-block text-[9px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-800 border border-indigo-200">
                    {caseInfo.label}
                  </span>
                )}

                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs space-y-1">
                  <div className="font-semibold text-slate-900 text-xs">
                    {patient.chiefComplaint}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-[10px] text-slate-500">
                    <span>Lang: <strong>{patient.languageName.split(' ')[0]}</strong></span>
                    <span>•</span>
                    <span>Modality: <strong>{patient.inputModality === 'touch' ? 'Touch' : 'Voice'}</strong></span>
                    {docsCount > 0 && (
                      <>
                        <span>•</span>
                        <span>Docs: <strong>{docsCount} files</strong></span>
                      </>
                    )}
                  </div>
                  {abnormalDocsCount > 0 && (
                    <div className="text-[10px] font-bold text-red-700">
                      ⚠ {abnormalDocsCount} abnormal lab values detected
                    </div>
                  )}
                  {missingGaps.length > 0 && (
                    <div className="text-[10px] font-medium text-amber-700">
                      ℹ {missingGaps.length} history gaps to verify
                    </div>
                  )}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReviewPatient(patient);
                  }}
                  className="w-full py-2 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center space-x-1.5 shadow-2xs"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Open Clinical Chart</span>
                </button>
              </div>
            );
          })}
        </div>

      </div>

      {/* Doctor OPD Quality & Clinical Summary Feedback */}
      <InPageFeedbackCard
        type="doctor"
        doctorName="OPD Clinician Workstation"
        className="mt-4"
        defaultExpanded={false}
      />

    </div>
  );
};
