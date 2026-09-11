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
    <aside className="w-full lg:w-56 bg-white border-r border-slate-200 flex flex-col justify-between p-4 shrink-0">
      
      <div>
        <div className="p-3 rounded-lg bg-slate-900 text-white mb-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded bg-teal-600 text-white flex items-center justify-center font-bold text-xs">
              DS
            </div>
            <div>
              <h3 className="font-bold text-xs leading-tight">Dr. Sharma</h3>
              <p className="text-[11px] text-teal-400">Primary Care • OPD #4</p>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-300">
            <span className="flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>On Duty</span>
            </span>
            <span className="font-mono text-slate-400">Room 204</span>
          </div>
        </div>

        <nav className="space-y-0.5 text-xs font-medium">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors ${
              activeTab === 'dashboard'
                ? 'bg-teal-50 text-teal-900 font-semibold border border-teal-200'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center space-x-2">
              <LayoutDashboard className="w-3.5 h-3.5 text-teal-700" />
              <span>Dashboard</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('queue')}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors ${
              activeTab === 'queue'
                ? 'bg-teal-50 text-teal-900 font-semibold border border-teal-200'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Users className="w-3.5 h-3.5 text-teal-700" />
              <span>Patient Queue</span>
            </div>
            {readyCount > 0 && (
              <span className="px-1.5 py-0.2 rounded bg-teal-700 text-white text-[10px] font-bold">
                {readyCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('consultations')}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors ${
              activeTab === 'consultations'
                ? 'bg-teal-50 text-teal-900 font-semibold border border-teal-200'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>Consultations</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">12</span>
          </button>

          <button
            onClick={() => setActiveTab('completed')}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors ${
              activeTab === 'completed'
                ? 'bg-teal-50 text-teal-900 font-semibold border border-teal-200'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Reviewed Intakes</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors ${
              activeTab === 'settings'
                ? 'bg-teal-50 text-teal-900 font-semibold border border-teal-200'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Settings className="w-3.5 h-3.5 text-slate-500" />
              <span>Settings</span>
            </div>
          </button>
        </nav>
      </div>

      <div className="pt-3 border-t border-slate-200 mt-4 space-y-2">
        <button
          onClick={() => setCurrentScreen('kiosk-home')}
          className="w-full py-2 px-2.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-xs transition-colors flex items-center justify-between"
        >
          <div className="flex items-center space-x-2">
            <UserCheck className="w-3.5 h-3.5 text-teal-700" />
            <span>Open Patient Kiosk</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        </button>

        <div className="flex items-center space-x-1.5 text-[10px] text-slate-400 px-1">
          <ShieldCheck className="w-3 h-3 text-teal-700" />
          <span>MediKiosk Clinical v2.4</span>
        </div>
      </div>

    </aside>
  );
};
