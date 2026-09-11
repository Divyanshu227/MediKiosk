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
    <>
      {/* Mobile Top Navigation (< lg) */}
      <div className="lg:hidden bg-white border-b border-slate-200 p-2.5 shadow-2xs">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-teal-700 text-white flex items-center justify-center font-bold text-xs shrink-0">
              DS
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <h3 className="font-bold text-xs text-slate-900 leading-none">Dr. Sharma</h3>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              </div>
              <span className="text-[10px] text-slate-500">OPD Room 204 • On Duty</span>
            </div>
          </div>

          <button
            onClick={() => setCurrentScreen('kiosk-home')}
            className="py-1 px-2 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] transition-colors flex items-center space-x-1"
          >
            <UserCheck className="w-3 h-3 text-teal-700" />
            <span>Kiosk</span>
          </button>
        </div>

        {/* Horizontal Scrollable Tabs */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium flex items-center space-x-1.5 transition-colors ${
              activeTab === 'dashboard'
                ? 'bg-teal-700 text-white font-bold shadow-2xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('queue')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium flex items-center space-x-1.5 transition-colors ${
              activeTab === 'queue'
                ? 'bg-teal-700 text-white font-bold shadow-2xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Queue</span>
            {readyCount > 0 && (
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                activeTab === 'queue' ? 'bg-white text-teal-900' : 'bg-teal-700 text-white'
              }`}>
                {readyCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('consultations')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium flex items-center space-x-1.5 transition-colors ${
              activeTab === 'consultations'
                ? 'bg-teal-700 text-white font-bold shadow-2xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Consults</span>
          </button>

          <button
            onClick={() => setActiveTab('completed')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium flex items-center space-x-1.5 transition-colors ${
              activeTab === 'completed'
                ? 'bg-teal-700 text-white font-bold shadow-2xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Reviewed</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium flex items-center space-x-1.5 transition-colors ${
              activeTab === 'settings'
                ? 'bg-teal-700 text-white font-bold shadow-2xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* Desktop Vertical Sidebar (>= lg) */}
      <aside className="hidden lg:flex w-56 bg-white border-r border-slate-200 flex-col justify-between p-4 shrink-0 sticky top-14 sm:top-16 self-start max-h-[calc(100vh-3.5rem)] sm:max-h-[calc(100vh-4rem)] overflow-y-auto">
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
    </>
  );
};
