import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  CheckCircle2, 
  Settings, 
  Stethoscope, 
  UserCheck, 
  Clock, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface DoctorSidebarProps {
  activeTab: 'dashboard' | 'queue' | 'consultations' | 'completed' | 'settings';
  setActiveTab: (tab: 'dashboard' | 'queue' | 'consultations' | 'completed' | 'settings') => void;
}

export const DoctorSidebar: React.FC<DoctorSidebarProps> = ({ activeTab, setActiveTab }) => {
  const { setCurrentScreen, patientQueue } = useApp();

  const readyCount = patientQueue.filter(p => p.status === 'Complete' && !p.doctorReviewed).length;

  return (
    <aside className="w-full lg:w-64 bg-white border-r border-slate-200 flex flex-col justify-between p-4 lg:p-6 shrink-0">
      
      <div>
        {/* Doctor Profile Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-tr from-slate-900 to-slate-800 text-white mb-6 shadow-md">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300 font-black text-lg">
              DS
            </div>
            <div>
              <h3 className="font-bold text-sm leading-tight">Dr. Sharma</h3>
              <p className="text-xs text-teal-400 font-medium">Primary Care • OPD #4</p>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-300">
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Available</span>
            </span>
            <span className="font-mono text-slate-400">Room 204</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5 text-sm font-semibold">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors ${
              activeTab === 'dashboard'
                ? 'bg-teal-50 text-teal-800 font-bold border border-teal-200/80'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center space-x-3">
              <LayoutDashboard className="w-4 h-4 text-teal-600" />
              <span>Dashboard</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('queue')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors ${
              activeTab === 'queue'
                ? 'bg-teal-50 text-teal-800 font-bold border border-teal-200/80'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Users className="w-4 h-4 text-teal-600" />
              <span>Patient Queue</span>
            </div>
            {readyCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-teal-600 text-white text-[11px] font-bold">
                {readyCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('consultations')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors ${
              activeTab === 'consultations'
                ? 'bg-teal-50 text-teal-800 font-bold border border-teal-200/80'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Calendar className="w-4 h-4 text-slate-500" />
              <span>Today's Consultations</span>
            </div>
            <span className="text-xs text-slate-400 font-mono">12</span>
          </button>

          <button
            onClick={() => setActiveTab('completed')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors ${
              activeTab === 'completed'
                ? 'bg-teal-50 text-teal-800 font-bold border border-teal-200/80'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Completed Intakes</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors ${
              activeTab === 'settings'
                ? 'bg-teal-50 text-teal-800 font-bold border border-teal-200/80'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Settings className="w-4 h-4 text-slate-500" />
              <span>Settings</span>
            </div>
          </button>
        </nav>
      </div>

      {/* Switch to Kiosk Button in Sidebar */}
      <div className="pt-6 border-t border-slate-200 mt-6 space-y-3">
        <button
          onClick={() => setCurrentScreen('kiosk-home')}
          className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors flex items-center justify-between"
        >
          <div className="flex items-center space-x-2">
            <UserCheck className="w-4 h-4 text-teal-600" />
            <span>Open Patient Kiosk</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <div className="flex items-center space-x-1.5 text-[11px] text-slate-400 px-1">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
          <span>Medikiosk Clinical v2.4</span>
        </div>
      </div>

    </aside>
  );
};
