import React from 'react';
import { 
  ArrowLeft, 
  User, 
  Clock, 
  Volume2, 
  Bot
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DoctorConversationView: React.FC = () => {
  const { selectedDoctorPatient, activePatient, setCurrentScreen, speakText } = useApp();

  const patient = selectedDoctorPatient || activePatient;
  const conversation = patient.conversation.length > 0 ? patient.conversation : activePatient.conversation;

  return (
    <div className="flex-1 p-4 sm:p-6 space-y-4 max-w-4xl mx-auto w-full animate-fadeIn">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <button
          onClick={() => setCurrentScreen('doctor-patient-summary')}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-xs transition-colors shadow-sm w-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Summary</span>
        </button>

        <span className="text-xs text-slate-500">
          Source: <strong className="text-slate-800">Speech-to-Text & Clinical Translation</strong>
        </span>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 flex items-center justify-center font-bold text-xs shrink-0">
            <User className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-base font-bold text-slate-900">{patient.name}</h1>
              <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 text-xs font-mono font-medium">
                {patient.id}
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Recorded in <strong className="text-teal-800">{patient.languageName}</strong> • {conversation.length} dialogue turns
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1.5 text-xs text-slate-600 bg-slate-50 px-2.5 py-1 rounded border border-slate-200">
          <Clock className="w-3.5 h-3.5 text-teal-700" />
          <span>Intake Duration: ~2 mins</span>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-4 sm:p-5 shadow-sm space-y-3">
        
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 pb-2 border-b border-slate-100 flex items-center justify-between">
          <span>Intake Dialogue Timeline</span>
          <span>Audio & Translated Text</span>
        </div>

        <div className="space-y-3">
          {conversation.map((msg, index) => {
            const isAi = msg.sender === 'ai';
            return (
              <div 
                key={msg.id || index}
                className={`flex items-start space-x-2.5 ${isAi ? '' : 'flex-row-reverse space-x-reverse'}`}
              >
                <div className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 text-white font-bold text-xs ${
                  isAi ? 'bg-teal-800' : 'bg-slate-800'
                }`}>
                  {isAi ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                </div>

                <div className={`max-w-[85%] rounded-lg p-3 text-xs sm:text-sm ${
                  isAi 
                    ? 'bg-slate-50 border border-slate-200 text-slate-900 rounded-tl-none' 
                    : 'bg-teal-700 text-white rounded-tr-none shadow-sm'
                }`}>
                  
                  <div className="flex items-center justify-between text-xs mb-1 pb-1 border-b border-slate-200/50">
                    <div className="flex items-center space-x-1.5">
                      <span className="font-semibold text-[11px]">{isAi ? 'MediKiosk' : patient.name}</span>
                      <span className="text-[10px] opacity-75 font-mono">({msg.timestamp})</span>
                    </div>

                    <div className="flex items-center space-x-1">
                      <span className="text-[9px] px-1 py-0.2 rounded font-semibold uppercase tracking-wider bg-black/10">
                        {isAi ? 'Question' : 'Patient'}
                      </span>
                      <button
                        onClick={() => speakText(msg.text, patient.language)}
                        className="p-0.5 rounded hover:bg-black/10 transition-colors"
                        title="Play audio transcript"
                      >
                        <Volume2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <div className="text-xs sm:text-sm font-medium leading-relaxed mb-1.5">
                    "{msg.text}"
                  </div>

                  {msg.translation && (
                    <div className={`p-2 rounded text-[11px] ${
                      isAi ? 'bg-white border border-slate-200 text-slate-700' : 'bg-teal-800/80 text-teal-100'
                    }`}>
                      <span className="font-semibold uppercase tracking-wider text-[9px] block mb-0.5 opacity-75">
                        English Translation:
                      </span>
                      "{msg.translation}"
                    </div>
                  )}

                </div>

              </div>
            );
          })}
        </div>

      </div>

      <div className="flex justify-between items-center pt-1">
        <button
          onClick={() => setCurrentScreen('doctor-patient-summary')}
          className="px-3.5 py-1.5 rounded-md bg-teal-700 hover:bg-teal-800 text-white font-medium text-xs shadow-sm transition-all flex items-center space-x-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Chart</span>
        </button>

        <button
          onClick={() => setCurrentScreen('doctor-dashboard')}
          className="px-3.5 py-1.5 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs shadow-sm transition-all"
        >
          <span>Return to Queue</span>
        </button>
      </div>

    </div>
  );
};
