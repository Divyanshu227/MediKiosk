import React from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  User, 
  Globe, 
  Clock, 
  CheckCircle2, 
  Volume2, 
  FileText,
  Stethoscope
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DoctorConversationView: React.FC = () => {
  const { selectedDoctorPatient, activePatient, currentScreen, setCurrentScreen, getLanguageDetails, speakText } = useApp();

  const patient = selectedDoctorPatient || activePatient;
  const lang = getLanguageDetails(patient.language);

  // If conversation is empty, fallback to patient's recorded conversation
  const conversation = patient.conversation.length > 0 ? patient.conversation : activePatient.conversation;

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl mx-auto w-full animate-fadeIn">
      
      {/* Top Header & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => setCurrentScreen('doctor-patient-summary')}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs transition-colors shadow-sm w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Clinical Summary</span>
        </button>

        <div className="flex items-center space-x-3">
          <span className="text-xs font-semibold text-slate-500">
            Transcript Source: <strong className="text-slate-800">Indic ASR + LLM Extraction</strong>
          </span>
        </div>
      </div>

      {/* Patient Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold flex-shrink-0">
            <User className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold text-slate-900">{patient.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-mono font-bold">
                {patient.id}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Dialogue recorded in <strong className="text-teal-700">{patient.languageName}</strong> • {conversation.length} utterances
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-600 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200">
          <Clock className="w-4 h-4 text-teal-600" />
          <span>Intake Duration: 2 mins 14 secs</span>
        </div>
      </div>

      {/* Timeline Chat Messages */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        
        <div className="text-xs font-black uppercase tracking-wider text-slate-400 pb-3 border-b border-slate-100 flex items-center justify-between">
          <span>Complete Verbatim Intake Timeline</span>
          <span>Audio & Translated Text</span>
        </div>

        <div className="space-y-6">
          {conversation.map((msg, index) => {
            const isAi = msg.sender === 'ai';
            return (
              <div 
                key={msg.id || index}
                className={`flex items-start space-x-4 ${isAi ? '' : 'flex-row-reverse space-x-reverse'}`}
              >
                {/* Speaker Avatar */}
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 text-white font-bold text-xs shadow-sm ${
                  isAi ? 'bg-gradient-to-tr from-teal-600 to-teal-500' : 'bg-slate-800'
                }`}>
                  {isAi ? <Sparkles className="w-5 h-5" /> : <User className="w-5 h-5" />}
                </div>

                {/* Chat Bubble with original Indic script & English Translation */}
                <div className={`max-w-[85%] rounded-3xl p-5 text-sm shadow-sm ${
                  isAi 
                    ? 'bg-slate-50 border border-slate-200/90 text-slate-900 rounded-tl-none' 
                    : 'bg-teal-700 text-white rounded-tr-none'
                }`}>
                  
                  {/* Meta header */}
                  <div className="flex items-center justify-between text-xs mb-2 pb-2 border-b border-slate-200/50">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold">{isAi ? 'Medikiosk AI Assistant' : patient.name}</span>
                      <span className="text-[11px] opacity-75 font-mono">({msg.timestamp})</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider bg-black/10">
                        {isAi ? 'Question' : 'Response'}
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

                  {/* Native Script Text */}
                  <div className="text-base font-semibold leading-relaxed mb-2">
                    "{msg.text}"
                  </div>

                  {/* English Translation */}
                  {msg.translation && (
                    <div className={`p-3 rounded-xl text-xs font-medium ${
                      isAi ? 'bg-white border border-slate-200 text-slate-700' : 'bg-teal-800/80 text-teal-100'
                    }`}>
                      <span className="font-bold uppercase tracking-wider text-[10px] block mb-0.5 opacity-75">
                        Clinical English Translation:
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

      {/* Footer Navigation */}
      <div className="flex justify-between items-center pt-2">
        <button
          onClick={() => setCurrentScreen('doctor-patient-summary')}
          className="px-6 py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Summary Report</span>
        </button>

        <button
          onClick={() => setCurrentScreen('doctor-dashboard')}
          className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all"
        >
          <span>Return to Dashboard Queue</span>
        </button>
      </div>

    </div>
  );
};
