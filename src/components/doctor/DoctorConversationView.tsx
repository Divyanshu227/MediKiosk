import React from 'react';
import { 
  ArrowLeft, 
  User, 
  Clock, 
  Volume2, 
  Bot,
  ShieldCheck,
  Globe2,
  Mic,
  Touchpad,
  FileCheck2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DoctorConversationView: React.FC = () => {
  const { selectedDoctorPatient, activePatient, setCurrentScreen, speakText, getLanguageDetails } = useApp();

  const patient = selectedDoctorPatient || activePatient;
  const conversation = patient.conversation && patient.conversation.length > 0 ? patient.conversation : activePatient.conversation;
  const lang = getLanguageDetails(patient.language);

  return (
    <div className="flex-1 p-4 sm:p-6 space-y-4 max-w-4xl mx-auto w-full animate-fadeIn">
      
      {/* Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <button
          onClick={() => setCurrentScreen('doctor-patient-summary')}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-xs transition-colors shadow-2xs w-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Clinical Chart</span>
        </button>

        <span className="text-xs text-slate-500 flex items-center space-x-1.5">
          <FileCheck2 className="w-3.5 h-3.5 text-teal-700" />
          <span>Multilingual Intake Audit Trail</span>
        </span>
      </div>

      {/* Patient Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-teal-700 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
            <User className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-base font-bold text-slate-900">{patient.name}</h1>
              <span className="px-2 py-0.5 rounded bg-slate-900 text-white text-xs font-mono font-medium">
                {patient.id}
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-mono font-semibold">
                Token #{patient.tokenNumber}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-[11px] text-slate-500 mt-0.5">
              <span className="flex items-center space-x-1">
                <Globe2 className="w-3 h-3 text-teal-700" />
                <strong className="text-teal-900">{lang.nativeName} ({lang.name})</strong>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                {patient.inputModality === 'touch' ? (
                  <Touchpad className="w-3 h-3 text-indigo-600" />
                ) : (
                  <Mic className="w-3 h-3 text-teal-700" />
                )}
                <span>{patient.inputModality === 'touch' ? 'Touchscreen Guided' : 'Acoustic Voice Intake'}</span>
              </span>
              <span>•</span>
              <span>{conversation.length} dialogue turns</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-1.5 text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
          <Clock className="w-3.5 h-3.5 text-teal-700" />
          <span>Recorded: {patient.intakeTimestamp || 'Today, OPD Session'}</span>
        </div>
      </div>

      {/* Non-Replacement Clinical Disclaimer */}
      <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-950 text-xs flex items-start space-x-2.5">
        <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Physician Oversight Notice:</strong> This verbatim transcript is captured from the self-service terminal session for clinical reference and verification. MediKiosk does not formulate diagnoses; the attending physician retains full authority to confirm or re-interview the patient.
        </div>
      </div>

      {/* Conversation Thread */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-4">
        
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 pb-2 border-b border-slate-100 flex items-center justify-between">
          <span>Dialogue Stream</span>
          <span>Audio Playback & Clinical English Translation</span>
        </div>

        <div className="space-y-4">
          {conversation.map((msg, index) => {
            const isAi = msg.sender === 'ai';
            return (
              <div 
                key={msg.id || index}
                className={`flex items-start space-x-3 ${isAi ? '' : 'flex-row-reverse space-x-reverse'}`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-white font-bold text-xs shadow-2xs ${
                  isAi ? 'bg-teal-800' : 'bg-slate-800'
                }`}>
                  {isAi ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                <div className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm space-y-2 ${
                  isAi 
                    ? 'bg-slate-50 border border-slate-200 text-slate-900 rounded-tl-none' 
                    : 'bg-teal-700 text-white rounded-tr-none shadow-sm'
                }`}>
                  
                  <div className="flex items-center justify-between text-xs pb-1.5 border-b border-black/10">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-[11px]">{isAi ? 'MediKiosk SOCRATES Agent' : patient.name}</span>
                      <span className="text-[10px] opacity-75 font-mono">({msg.timestamp})</span>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      <span className="text-[9px] px-1.5 py-0.5 rounded font-semibold uppercase tracking-wider bg-black/10">
                        {isAi ? 'Question' : 'Response'}
                      </span>
                      <button
                        onClick={() => speakText(msg.text, patient.language)}
                        className="p-1 rounded hover:bg-black/10 transition-colors flex items-center space-x-1 text-[10px]"
                        title="Play audio transcript"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Play</span>
                      </button>
                    </div>
                  </div>

                  {/* Verbatim Local Language Speech */}
                  <div className="text-xs sm:text-sm font-medium leading-relaxed">
                    "{msg.text}"
                  </div>

                  {/* English Clinical Translation */}
                  {msg.translation && (
                    <div className={`p-2.5 rounded-xl text-xs ${
                      isAi ? 'bg-white border border-slate-200 text-slate-700' : 'bg-teal-800/90 text-teal-100 border border-teal-600/50'
                    }`}>
                      <span className="font-bold uppercase tracking-wider text-[9px] block mb-1 opacity-80">
                        Clinical English Translation:
                      </span>
                      <span className="italic leading-relaxed">"{msg.translation}"</span>
                    </div>
                  )}

                </div>

              </div>
            );
          })}
        </div>

      </div>

      <div className="flex justify-between items-center pt-2">
        <button
          onClick={() => setCurrentScreen('doctor-patient-summary')}
          className="px-4 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs shadow-2xs transition-all flex items-center space-x-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Patient Chart</span>
        </button>

        <button
          onClick={() => setCurrentScreen('doctor-dashboard')}
          className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-2xs transition-all"
        >
          <span>Return to OPD Queue</span>
        </button>
      </div>

    </div>
  );
};
