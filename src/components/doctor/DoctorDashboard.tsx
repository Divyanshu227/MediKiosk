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
    <div className="flex-1 p-4 sm:p-6 space-y-4 max-w-7xl mx-auto w-full animate-fadeIn">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            OPD Clinical Queue
          </h1>
          <p className="text-xs text-slate-500 font-normal mt-0.5">
            Real-time patient intake summaries • Dr. Sharma (Room 204)
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => showToast('Queue refreshed with latest kiosk intakes.')}
            className="p-1.5 px-2.5 rounded-md bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-medium flex items-center space-x-1.5 transition-colors shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5 text-teal-700" />
            <span>Refresh Queue</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        
        <div className="p-3.5 rounded-lg bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Patients Today</span>
            <Users className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold text-slate-900">12</div>
          <p className="text-[11px] text-slate-500 mt-0.5">8 scheduled • 4 walk-ins</p>
        </div>

        <div className="p-3.5 rounded-lg bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Completed Intakes</span>
            <FileCheck2 className="w-4 h-4 text-teal-700" />
          </div>
          <div className="text-2xl font-bold text-teal-800">{completedCount}</div>
          <p className="text-[11px] text-teal-700 mt-0.5">Pre-intake forms ready</p>
        </div>

        <div className="p-3.5 rounded-lg bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Avg Intake Time</span>
            <Clock className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold text-slate-900">2m 14s</div>
          <p className="text-[11px] text-emerald-700 mt-0.5">~7 mins saved per patient</p>
        </div>

        <div className="p-3.5 rounded-lg bg-teal-800 text-white shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-semibold text-teal-200 uppercase tracking-wider">Ready for Review</span>
            <Stethoscope className="w-4 h-4 text-teal-200" />
          </div>
          <div className="text-2xl font-bold">{readyCount}</div>
          <p className="text-[11px] text-teal-100 mt-0.5">Awaiting doctor evaluation</p>
        </div>

      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        
        <div className="p-3.5 border-b border-slate-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-slate-50/50">
          
          <div className="flex items-center space-x-2">
            <h2 className="text-sm font-bold text-slate-900">Patient Worklist</h2>
            <span className="px-1.5 py-0.2 rounded bg-slate-200 text-slate-700 text-[11px] font-mono font-medium">
              {filteredPatients.length}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search name, ID, symptom..."
                className="w-full sm:w-56 pl-7 pr-2.5 py-1 text-xs rounded-md border border-slate-300 focus:outline-none focus:border-teal-700 text-slate-900 bg-white"
              />
            </div>

            <div className="flex items-center space-x-1 p-0.5 bg-slate-200/70 rounded-md text-xs font-medium">
              <button
                onClick={() => setFilterStatus('All')}
                className={`px-2 py-0.5 rounded transition-colors ${
                  filterStatus === 'All' ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterStatus('Ready')}
                className={`px-2 py-0.5 rounded transition-colors ${
                  filterStatus === 'Ready' ? 'bg-white text-teal-900 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Ready ({readyCount})
              </button>
              <button
                onClick={() => setFilterStatus('Completed')}
                className={`px-2 py-0.5 rounded transition-colors ${
                  filterStatus === 'Completed' ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Reviewed
              </button>
            </div>

          </div>

        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-2.5 px-3 sm:px-4">Patient</th>
                <th className="py-2.5 px-3">Age/Gen</th>
                <th className="py-2.5 px-3">Chief Complaint</th>
                <th className="py-2.5 px-3">Language</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Priority</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredPatients.map((patient) => {
                const isComplete = patient.status === 'Complete';
                const isReviewed = patient.doctorReviewed;

                return (
                  <tr 
                    key={patient.id} 
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                    onClick={() => handleReviewPatient(patient)}
                  >
                    
                    <td className="py-2.5 px-3 sm:px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-7 h-7 rounded bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                          {patient.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 text-xs flex items-center space-x-1">
                            <span>{patient.name}</span>
                            {isReviewed && (
                              <CheckCircle2 className="w-3 h-3 text-emerald-600 inline" />
                            )}
                          </div>
                          <span className="font-mono text-[10px] text-slate-400">{patient.id}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-2.5 px-3 font-medium text-slate-600">
                      {patient.age}y / {patient.gender[0]}
                    </td>

                    <td className="py-2.5 px-3">
                      <span className="font-medium text-slate-900 block">{patient.chiefComplaint}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{patient.time}</span>
                    </td>

                    <td className="py-2.5 px-3">
                      <span className="inline-flex items-center space-x-1 text-slate-600 text-[11px]">
                        <Globe className="w-3 h-3 text-teal-700" />
                        <span>{patient.languageName.split(' ')[0]}</span>
                      </span>
                    </td>

                    <td className="py-2.5 px-3">
                      {isComplete ? (
                        <span className="inline-flex items-center space-x-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          <span>Complete</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-amber-50 text-amber-800 border border-amber-200">
                          <Clock className="w-2.5 h-2.5" />
                          <span>In Progress</span>
                        </span>
                      )}
                    </td>

                    <td className="py-2.5 px-3">
                      {patient.priority === 'High' || patient.priority === 'Urgent' ? (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800 border border-red-200">
                          High
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.5 rounded text-[10px] text-slate-600 bg-slate-100">
                          Normal
                        </span>
                      )}
                    </td>

                    <td className="py-2.5 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleReviewPatient(patient)}
                        className="px-2.5 py-1 rounded bg-teal-700 hover:bg-teal-800 text-white font-medium text-xs shadow-sm transition-colors inline-flex items-center space-x-1"
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
