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
    <div className="flex-1 p-4 sm:p-6 lg:p-7 space-y-5 max-w-4xl mx-auto w-full animate-fadeIn">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          onClick={() => setCurrentScreen('doctor-patient-summary')}
          className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-xs transition-colors shadow-sm w-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Summary</span>
        </button>

        <span className="text-xs font-semibold text-slate-500">
          Source: <strong className="text-slate-800">Speech-to-Text & Clinical Translation</strong>
        </span>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold shrink-0">
            <User className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-bold text-slate-900">{patient.name}</h1>
              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-mono font-semibold">
                {patient.id}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Recorded in <strong className="text-teal-800">{patient.languageName}</strong> • {conversation.length} dialogue turns
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1.5 text-xs font-medium text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
          <Clock className="w-3.5 h-3.5 text-teal-600" />
          <span>Intake Duration: ~2 mins</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
        
        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-3 border-b border-slate-100 flex items-center justify-between">
          <span>Intake Dialogue Timeline</span>
          <span>Audio & Translated Text</span>
        </div>

        <div className="space-y-4">
          {conversation.map((msg, index) => {
            const isAi = msg.sender === 'ai';
            return (
              <div 
                key={msg.id || index}
                className={`flex items-start space-x-3 ${isAi ? '' : 'flex-row-reverse space-x-reverse'}`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-white font-bold text-xs ${
                  isAi ? 'bg-teal-700' : 'bg-slate-800'
                }`}>
                  {isAi ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                <div className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm ${
                  isAi 
                    ? 'bg-slate-50 border border-slate-200 text-slate-900 rounded-tl-none' 
                    : 'bg-teal-700 text-white rounded-tr-none shadow-sm'
                }`}>
                  
                  <div className="flex items-center justify-between text-xs mb-1.5 pb-1.5 border-b border-slate-200/50">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{isAi ? 'MediKiosk Assistant' : patient.name}</span>
                      <span className="text-[11px] opacity-75 font-mono">({msg.timestamp})</span>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      <span className="text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider bg-black/10">
                        {isAi ? 'Question' : 'Patient'}
                      </span>
                      <button
                        onClick={() => speakText(msg.text, patient.language)}
                        className="p-1 rounded hover:bg-black/10 transition-colors"
                        title="Play audio transcript"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="text-sm font-semibold leading-relaxed mb-2">
                    "{msg.text}"
                  </div>

                  {msg.translation && (
                    <div className={`p-2.5 rounded-lg text-xs ${
                      isAi ? 'bg-white border border-slate-200 text-slate-700' : 'bg-teal-800/90 text-teal-100'
                    }`}>
                      <span className="font-bold uppercase tracking-wider text-[10px] block mb-0.5 opacity-75">
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
          className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs shadow-sm transition-all flex items-center space-x-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Summary</span>
        </button>

        <button
          onClick={() => setCurrentScreen('doctor-dashboard')}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-sm transition-all"
        >
          <span>Return to Queue</span>
        </button>
      </div>

    </div>
  );
};
