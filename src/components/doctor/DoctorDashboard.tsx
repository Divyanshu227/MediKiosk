import React, { useState } from 'react';
import { 
  Users, 
  Clock, 
  CheckCircle2, 
  Search, 
  Stethoscope, 
  Sparkles, 
  Globe, 
  RefreshCw,
  Eye
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
    <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full animate-fadeIn">
      
      {/* Top Welcome & Notification Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Medikiosk Clinical Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Real-time AI structured intake queue • Dr. Sharma (OPD Care)
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => showToast('Queue refreshed with latest kiosk intakes.')}
            className="p-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold flex items-center space-x-1.5 transition-colors shadow-sm"
          >
            <RefreshCw className="w-4 h-4 text-teal-600" />
            <span>Refresh Queue</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Patients Today */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Patients Today</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">12</div>
          <p className="text-[11px] text-slate-500 mt-1 font-medium">8 scheduled • 4 walk-ins</p>
        </div>

        {/* Card 2: AI Intakes Completed */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">AI Intakes Completed</span>
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-teal-600">{completedCount}</div>
          <p className="text-[11px] text-teal-700 mt-1 font-medium">100% structured history captured</p>
        </div>

        {/* Card 3: Average Intake Time */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Avg Intake Time</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">2m 14s</div>
          <p className="text-[11px] text-emerald-600 mt-1 font-medium">Saved ~7.5 mins per patient</p>
        </div>

        {/* Card 4: Ready for Consultation */}
        <div className="p-5 rounded-3xl bg-gradient-to-tr from-teal-600 to-teal-700 text-white shadow-md shadow-teal-600/20">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-100">Ready for Doctor</span>
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center font-bold">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="text-3xl font-black">{readyCount}</div>
          <p className="text-[11px] text-teal-100 mt-1 font-medium">Clinical summaries pre-compiled</p>
        </div>

      </div>

      {/* Patient Queue Section */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        
        {/* Table Controls & Filter Bar */}
        <div className="p-4 sm:p-6 border-b border-slate-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          <div className="flex items-center space-x-3">
            <h2 className="text-lg font-bold text-slate-900">Live Patient Queue</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold font-mono">
              {filteredPatients.length} Patients
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search patient, ID, or symptom..."
                className="w-full sm:w-64 pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-teal-600 text-slate-900"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex items-center space-x-1.5 p-1 bg-slate-100 rounded-xl text-xs font-bold">
              <button
                onClick={() => setFilterStatus('All')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  filterStatus === 'All' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterStatus('Ready')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  filterStatus === 'Ready' ? 'bg-white text-teal-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Ready ({readyCount})
              </button>
              <button
                onClick={() => setFilterStatus('Completed')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  filterStatus === 'Completed' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Reviewed
              </button>
            </div>

          </div>

        </div>

        {/* Patient Queue Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-black uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-4 sm:px-6">Patient</th>
                <th className="py-3.5 px-3">Age / Gen</th>
                <th className="py-3.5 px-4">Chief Complaint</th>
                <th className="py-3.5 px-3">Language</th>
                <th className="py-3.5 px-3">AI Intake Status</th>
                <th className="py-3.5 px-3">Priority</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {filteredPatients.map((patient) => {
                const isComplete = patient.status === 'Complete';
                const isReviewed = patient.doctorReviewed;

                return (
                  <tr 
                    key={patient.id} 
                    className="hover:bg-teal-50/40 transition-colors group cursor-pointer"
                    onClick={() => handleReviewPatient(patient)}
                  >
                    
                    {/* Patient Column */}
                    <td className="py-4 px-4 sm:px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs group-hover:bg-teal-600 group-hover:text-white transition-colors">
                          {patient.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm flex items-center space-x-1.5">
                            <span>{patient.name}</span>
                            {isReviewed && (
                              <span title="Consultation Reviewed">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline" />
                              </span>
                            )}
                          </div>
                          <span className="font-mono text-[11px] text-slate-400">{patient.id}</span>
                        </div>
                      </div>
                    </td>

                    {/* Age / Gender */}
                    <td className="py-4 px-3 font-medium text-slate-600">
                      {patient.age}y / {patient.gender[0]}
                    </td>

                    {/* Chief Complaint */}
                    <td className="py-4 px-4">
                      <span className="font-bold text-slate-900 block">{patient.chiefComplaint}</span>
                      <span className="text-[11px] text-slate-400 font-mono">{patient.time}</span>
                    </td>

                    {/* Language */}
                    <td className="py-4 px-3">
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold text-[11px]">
                        <Globe className="w-3 h-3 text-teal-600" />
                        <span>{patient.languageName.split(' ')[0]}</span>
                      </span>
                    </td>

                    {/* AI Intake Badge */}
                    <td className="py-4 px-3">
                      {isComplete ? (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Complete</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          <Clock className="w-3 h-3 animate-spin" />
                          <span>In Progress</span>
                        </span>
                      )}
                    </td>

                    {/* Priority Badge */}
                    <td className="py-4 px-3">
                      {patient.priority === 'High' || patient.priority === 'Urgent' ? (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-red-100 text-red-700 border border-red-200 uppercase tracking-wider">
                          High
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600">
                          Normal
                        </span>
                      )}
                    </td>

                    {/* Action Button */}
                    <td className="py-4 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleReviewPatient(patient)}
                        className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-sm transition-all inline-flex items-center space-x-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
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
