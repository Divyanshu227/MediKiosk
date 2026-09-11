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
  FileCheck2
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
  const [filterStatus, setFilterStatus] = useState<'All' | 'Ready' | 'Completed' | 'Urgent'>('All');

  const completedCount = patientQueue.filter(p => p.status === 'Complete').length;
  const readyCount = patientQueue.filter(p => p.status === 'Complete' && !p.doctorReviewed).length;

  const filteredPatients = patientQueue.filter(patient => {
    const matchesSearch = 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.chiefComplaint.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (filterStatus === 'Ready') {
      return patient.status === 'Complete' && !patient.doctorReviewed;
    }
    if (filterStatus === 'Completed') {
      return patient.doctorReviewed;
    }
    if (filterStatus === 'Urgent') {
      return patient.priority === 'High' || patient.priority === 'Urgent';
    }
    return true;
  });

  const handleReviewPatient = (patient: Patient) => {
    setSelectedDoctorPatient(patient);
    setCurrentScreen('doctor-patient-summary');
  };

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-7 space-y-5 max-w-7xl mx-auto w-full animate-fadeIn">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Clinical Dashboard
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Live patient intake queue • Dr. Sharma (OPD Care)
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => showToast('Queue refreshed with latest kiosk intakes.')}
            className="p-2 rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold flex items-center space-x-1.5 transition-colors shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5 text-teal-600" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Patients Today</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">12</div>
          <p className="text-[11px] text-slate-500 mt-0.5">8 scheduled • 4 walk-ins</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Completed Intakes</span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
              <FileCheck2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-teal-600">{completedCount}</div>
          <p className="text-[11px] text-teal-700 mt-0.5">Structured histories captured</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Avg Intake Time</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">2m 14s</div>
          <p className="text-[11px] text-emerald-600 mt-0.5">~7 mins saved per intake</p>
        </div>

        <div className="p-4 rounded-xl bg-teal-700 text-white shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-100">Ready for Doctor</span>
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center font-bold">
              <Stethoscope className="w-4 h-4 text-white" />
            </div>
          </div>
          <div className="text-2xl font-black">{readyCount}</div>
          <p className="text-[11px] text-teal-100 mt-0.5">Summaries pre-compiled</p>
        </div>

      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        
        <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          <div className="flex items-center space-x-2.5">
            <h2 className="text-base font-bold text-slate-900">Live Patient Queue</h2>
            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-semibold font-mono">
              {filteredPatients.length} Patients
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search patient, ID, or symptom..."
                className="w-full sm:w-60 pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-teal-600 text-slate-900"
              />
            </div>

            <div className="flex items-center space-x-1 p-0.5 bg-slate-100 rounded-lg text-xs font-semibold">
              <button
                onClick={() => setFilterStatus('All')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  filterStatus === 'All' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterStatus('Ready')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  filterStatus === 'Ready' ? 'bg-white text-teal-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Ready ({readyCount})
              </button>
              <button
                onClick={() => setFilterStatus('Completed')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  filterStatus === 'Completed' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Reviewed
              </button>
            </div>

          </div>

        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4 sm:px-5">Patient</th>
                <th className="py-3 px-3">Age / Gen</th>
                <th className="py-3 px-3">Chief Complaint</th>
                <th className="py-3 px-3">Language</th>
                <th className="py-3 px-3">Intake Status</th>
                <th className="py-3 px-3">Priority</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {filteredPatients.map((patient) => {
                const isComplete = patient.status === 'Complete';
                const isReviewed = patient.doctorReviewed;

                return (
                  <tr 
                    key={patient.id} 
                    className="hover:bg-teal-50/30 transition-colors group cursor-pointer"
                    onClick={() => handleReviewPatient(patient)}
                  >
                    
                    <td className="py-3.5 px-4 sm:px-5">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs group-hover:bg-teal-600 group-hover:text-white transition-colors">
                          {patient.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-xs sm:text-sm flex items-center space-x-1">
                            <span>{patient.name}</span>
                            {isReviewed && (
                              <span title="Consultation Reviewed">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline" />
                              </span>
                            )}
                          </div>
                          <span className="font-mono text-[10px] text-slate-400">{patient.id}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-3 font-medium text-slate-600 text-xs">
                      {patient.age}y / {patient.gender[0]}
                    </td>

                    <td className="py-3.5 px-3">
                      <span className="font-semibold text-slate-900 block text-xs">{patient.chiefComplaint}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{patient.time}</span>
                    </td>

                    <td className="py-3.5 px-3">
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium text-[11px]">
                        <Globe className="w-3 h-3 text-teal-600" />
                        <span>{patient.languageName.split(' ')[0]}</span>
                      </span>
                    </td>

                    <td className="py-3.5 px-3">
                      {isComplete ? (
                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Complete</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          <Clock className="w-3 h-3" />
                          <span>In Progress</span>
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-3">
                      {patient.priority === 'High' || patient.priority === 'Urgent' ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700 border border-red-200 uppercase tracking-wider">
                          High
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600">
                          Normal
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleReviewPatient(patient)}
                        className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs shadow-sm transition-all inline-flex items-center space-x-1"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Review</span>
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
