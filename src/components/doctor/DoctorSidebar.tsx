import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  CheckCircle2, 
  Settings, 
  UserCheck, 
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
    <aside className="w-full lg:w-60 bg-white border-r border-slate-200 flex flex-col justify-between p-4 lg:p-5 shrink-0">
      
      <div>
        <div className="p-3.5 rounded-xl bg-slate-900 text-white mb-5 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300 font-bold text-sm">
              DS
            </div>
            <div>
              <h3 className="font-bold text-sm leading-tight">Dr. Sharma</h3>
              <p className="text-xs text-teal-400">Primary Care • OPD #4</p>
            </div>
          </div>
          <div className="mt-2.5 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-300">
            <span className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>On Duty</span>
            </span>
            <span className="font-mono text-slate-400">Room 204</span>
          </div>
        </div>

        <nav className="space-y-1 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
              activeTab === 'dashboard'
                ? 'bg-teal-50 text-teal-900 font-bold border border-teal-200'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <LayoutDashboard className="w-4 h-4 text-teal-600" />
              <span>Dashboard</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('queue')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
              activeTab === 'queue'
                ? 'bg-teal-50 text-teal-900 font-bold border border-teal-200'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <Users className="w-4 h-4 text-teal-600" />
              <span>Patient Queue</span>
            </div>
            {readyCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-teal-600 text-white text-[10px] font-bold">
                {readyCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('consultations')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
              activeTab === 'consultations'
                ? 'bg-teal-50 text-teal-900 font-bold border border-teal-200'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <Calendar className="w-4 h-4 text-slate-500" />
              <span>Today's Consults</span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">12</span>
          </button>

          <button
            onClick={() => setActiveTab('completed')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
              activeTab === 'completed'
                ? 'bg-teal-50 text-teal-900 font-bold border border-teal-200'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Reviewed Intakes</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
              activeTab === 'settings'
                ? 'bg-teal-50 text-teal-900 font-bold border border-teal-200'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <Settings className="w-4 h-4 text-slate-500" />
              <span>Settings</span>
            </div>
          </button>
        </nav>
      </div>

      <div className="pt-4 border-t border-slate-200 mt-4 space-y-2">
        <button
          onClick={() => setCurrentScreen('kiosk-home')}
          className="w-full py-2.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors flex items-center justify-between"
        >
          <div className="flex items-center space-x-2">
            <UserCheck className="w-3.5 h-3.5 text-teal-600" />
            <span>Open Patient Kiosk</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        </button>

        <div className="flex items-center space-x-1.5 text-[11px] text-slate-400 px-1">
          <ShieldCheck className="w-3 h-3 text-teal-600" />
          <span>MediKiosk Clinical v2.4</span>
        </div>
      </div>

    </aside>
  );
};
