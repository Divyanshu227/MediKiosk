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
  FileText
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Patient } from '../../types';

export const DoctorDashboard: React.FC = () => {
  const { 
    patientQueue, 
    setSelectedDoctorPatient, 
    setCurrentScreen, 
    showToast 
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState<'all' | 'allopathy' | 'ayush' | 'urgent'>('all');

  const completedCount = patientQueue.filter(p => p.status === 'Complete').length;
  const readyCount = patientQueue.filter(p => p.status === 'Complete' && !p.doctorReviewed).length;
  const ayushCount = patientQueue.filter(p => p.department === 'ayush').length;
  const urgentCount = patientQueue.filter(p => p.priority === 'High' || p.priority === 'Urgent').length;

  const filteredPatients = patientQueue.filter(patient => {
    const matchesSearch = 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.tokenNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.chiefComplaint.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (filterDepartment === 'allopathy') {
      return patient.department === 'allopathy';
    }
    if (filterDepartment === 'ayush') {
      return patient.department === 'ayush';
    }
    if (filterDepartment === 'urgent') {
      return patient.priority === 'High' || patient.priority === 'Urgent';
    }
    return true;
  });

  const handleReviewPatient = (patient: Patient) => {
    setSelectedDoctorPatient(patient);
    setCurrentScreen('doctor-patient-summary');
  };

  return (
    <div className="flex-1 p-4 sm:p-6 space-y-4 max-w-7xl mx-auto w-full animate-fadeIn">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            OPD Clinical Queue & EHR Worklist
          </h1>
          <p className="text-xs text-slate-500 font-normal mt-0.5">
            Real-time pre-consultation intake summaries & digitized records • Dr. Sharma (Room 204)
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
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Routine Intake Time Saved</span>
            <Clock className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-700">7+ mins</div>
          <p className="text-[11px] text-slate-500 mt-0.5">Saved per patient consultation</p>
        </div>

        <div className="p-3.5 rounded-xl bg-teal-800 text-white shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-semibold text-teal-200 uppercase tracking-wider">Awaiting Physician</span>
            <Stethoscope className="w-4 h-4 text-teal-200" />
          </div>
          <div className="text-2xl font-bold">{readyCount}</div>
          <p className="text-[11px] text-teal-100 mt-0.5">Ready for direct examination</p>
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

            {/* Department Filter Pills */}
            <div className="flex items-center space-x-1 p-1 bg-slate-200/80 rounded-lg text-xs font-medium">
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
                Urgent ({urgentCount})
              </button>
            </div>

          </div>

        </div>

        {/* Table List */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-2.5 px-3 sm:px-4">Token & Patient</th>
                <th className="py-2.5 px-3">Dept</th>
                <th className="py-2.5 px-3">Age/Gen</th>
                <th className="py-2.5 px-3">Chief Complaint & History</th>
                <th className="py-2.5 px-3">Docs / Scans</th>
                <th className="py-2.5 px-3">Language</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">EMR Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredPatients.map((patient) => {
                const isComplete = patient.status === 'Complete';
                const isReviewed = patient.doctorReviewed;
                const isAyush = patient.department === 'ayush';
                const docsCount = patient.documents?.length || 0;

                return (
                  <tr 
                    key={patient.id} 
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                    onClick={() => handleReviewPatient(patient)}
                  >
                    
                    <td className="py-3 px-3 sm:px-4">
                      <div className="flex items-center space-x-2.5">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-900 text-white shrink-0">
                          #{patient.tokenNumber}
                        </span>
                        <div>
                          <div className="font-bold text-slate-900 text-xs flex items-center space-x-1">
                            <span>{patient.name}</span>
                            {isReviewed && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline" />
                            )}
                          </div>
                          <span className="font-mono text-[10px] text-slate-400">{patient.id}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        isAyush ? 'bg-amber-50 text-amber-900 border border-amber-200' : 'bg-teal-50 text-teal-900 border border-teal-200'
                      }`}>
                        {isAyush ? 'AYUSH' : 'Medicine'}
                      </span>
                    </td>

                    <td className="py-3 px-3 font-semibold text-slate-600">
                      {patient.age}y / {patient.gender[0]}
                    </td>

                    <td className="py-3 px-3 max-w-xs">
                      <span className="font-bold text-slate-900 block truncate">{patient.chiefComplaint}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{patient.time}</span>
                    </td>

                    <td className="py-3 px-3">
                      {docsCount > 0 ? (
                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 text-teal-800 border border-teal-200">
                          <FileText className="w-3 h-3" />
                          <span>{docsCount} files</span>
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400">None</span>
                      )}
                    </td>

                    <td className="py-3 px-3">
                      <span className="inline-flex items-center space-x-1 text-slate-600 text-[11px]">
                        <Globe className="w-3 h-3 text-teal-700" />
                        <span>{patient.languageName.split(' ')[0]}</span>
                      </span>
                    </td>

                    <td className="py-3 px-3">
                      {isReviewed ? (
                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Reviewed</span>
                        </span>
                      ) : patient.priority === 'Urgent' ? (
                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800 border border-red-200 animate-pulse">
                          <AlertTriangle className="w-3 h-3 text-red-600" />
                          <span>Emergency</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 text-teal-800 border border-teal-200">
                          <Clock className="w-3 h-3" />
                          <span>Ready</span>
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleReviewPatient(patient)}
                        className="px-3 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs shadow-2xs transition-colors inline-flex items-center space-x-1"
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

      </div>

    </div>
  );
};
