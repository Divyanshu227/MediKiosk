import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  Volume2, 
  ArrowRight, 
  FileCheck2, 
  Activity, 
  Thermometer, 
  Pill, 
  User,
  Bot
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DEMO_FLOW_STEPS } from '../../data/mockData';

export const AIConversationScreen: React.FC = () => {
  const { 
    currentLanguage, 
    getLanguageDetails, 
    activePatient, 
    addMessageToActivePatient, 
    updateActiveClinicalInfo, 
    setCurrentScreen,
    speakText,
    triggerUrgentAlert 
  } = useApp();

  const [currentStepIndex, setCurrentStepIndex] = useState(1);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [manualInput, setManualInput] = useState('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const lang = getLanguageDetails(currentLanguage);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activePatient.conversation, isProcessing]);

  useEffect(() => {
    if (currentStepIndex < DEMO_FLOW_STEPS.length) {
      const step = DEMO_FLOW_STEPS[currentStepIndex];
      const langCode = currentLanguage in step.aiQuestion ? currentLanguage : 'hi';
      const q = step.aiQuestion[langCode as keyof typeof step.aiQuestion] || step.aiQuestion.hi;
      
      const lastMsg = activePatient.conversation[activePatient.conversation.length - 1];
      if (!lastMsg || lastMsg.sender !== 'ai' || lastMsg.text !== q) {
        addMessageToActivePatient({
          sender: 'ai',
          text: q,
          translation: step.title
        });
        speakText(q, currentLanguage);
      }
    }
  }, [currentStepIndex]);

  const handleSimulateSpeechResponse = () => {
    if (isListening || isProcessing) return;
    
    setIsListening(true);

    setTimeout(() => {
      setIsListening(false);
      setIsProcessing(true);

      setTimeout(() => {
        setIsProcessing(false);
        if (currentStepIndex < DEMO_FLOW_STEPS.length) {
          const step = DEMO_FLOW_STEPS[currentStepIndex];
          const langCode = currentLanguage in step.defaultPatientResponse ? currentLanguage : 'hi';
          const pResponse = step.defaultPatientResponse[langCode as keyof typeof step.defaultPatientResponse] || step.defaultPatientResponse.hi;

          addMessageToActivePatient({
            sender: 'patient',
            text: pResponse,
            translation: step.translation
          });

          if (step.clinicalExtraction) {
            updateActiveClinicalInfo(step.clinicalExtraction);
          }

          if (currentStepIndex < DEMO_FLOW_STEPS.length - 1) {
            setCurrentStepIndex(prev => prev + 1);
          } else {
            const finalAiMessage = lang.code === 'hi' 
              ? 'धन्यवाद राजेश जी। आपकी सभी स्वास्थ्य जानकारी सुरक्षित रूप से दर्ज कर ली गई है। कृपया अपनी समरी की समीक्षा करें।'
              : 'Thank you. I have organized your health information into a clinical intake summary for the physician.';
            
            addMessageToActivePatient({
              sender: 'ai',
              text: finalAiMessage,
              translation: 'Thank you. All clinical information has been organized for the physician.'
            });
            speakText(finalAiMessage, currentLanguage);
          }
        }
      }, 1200);
    }, 2000);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualInput.trim()) return;

    const userInput = manualInput;
    setManualInput('');

    if (
      userInput.toLowerCase().includes('chest pain') ||
      userInput.toLowerCase().includes('सीने में दर्द') ||
      userInput.toLowerCase().includes('heart') ||
      userInput.toLowerCase().includes('cannot breathe')
    ) {
      triggerUrgentAlert('Acute chest pain or respiratory symptoms reported.');
      return;
    }

    addMessageToActivePatient({
      sender: 'patient',
      text: userInput,
      translation: 'Patient provided response manually'
    });

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      if (currentStepIndex < DEMO_FLOW_STEPS.length - 1) {
        setCurrentStepIndex(prev => prev + 1);
      }
    }, 1000);
  };

  const totalStages = DEMO_FLOW_STEPS.length;
  const progressPercent = Math.min(100, Math.round(((currentStepIndex + 1) / totalStages) * 100));

  return (
    <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full px-4 sm:px-6 py-4 animate-fadeIn">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 flex items-center justify-center font-bold">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-slate-900 text-sm">{activePatient.name}</span>
              <span className="text-xs px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-mono font-medium">
                {activePatient.id}
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Language: <strong className="text-teal-800">{lang.name}</strong> • Age: {activePatient.age} ({activePatient.gender})
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-right">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">Intake Progress</span>
            <span className="text-xs font-bold text-teal-800">{progressPercent}% Completed</span>
          </div>
          <div className="w-24 sm:w-28 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div 
              className="h-full bg-teal-700 transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start flex-1 mb-2">
        
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-[520px] overflow-hidden">
          
          <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs font-medium text-slate-700">
            <div className="flex items-center space-x-1.5">
              <Bot className="w-4 h-4 text-teal-700" />
              <span className="font-semibold">Intake Conversation</span>
            </div>
            <span className="text-slate-400 text-[11px]">Question {currentStepIndex + 1} of {totalStages}</span>
          </div>

          <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3">
            {activePatient.conversation.map((msg) => {
              const isAi = msg.sender === 'ai';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start space-x-2 ${isAi ? '' : 'flex-row-reverse space-x-reverse'}`}
                >
                  <div className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 text-white font-bold text-xs ${
                    isAi ? 'bg-teal-800' : 'bg-slate-800'
                  }`}>
                    {isAi ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                  </div>

                  <div className={`max-w-[82%] rounded-lg p-3 text-xs sm:text-sm ${
                    isAi 
                      ? 'bg-slate-100 text-slate-900 border border-slate-200 rounded-tl-none' 
                      : 'bg-teal-700 text-white rounded-tr-none shadow-sm'
                  }`}>
                    <div className="flex items-center justify-between text-[11px] mb-1 opacity-80">
                      <span className="font-semibold">{isAi ? 'MediKiosk' : activePatient.name}</span>
                      <span className="ml-2 font-mono">{msg.timestamp}</span>
                    </div>
                    
                    <p className="font-medium leading-relaxed text-xs sm:text-sm">{msg.text}</p>
                    
                    {msg.translation && (
                      <p className={`text-[11px] mt-1 pt-1 border-t italic ${
                        isAi ? 'text-slate-500 border-slate-200' : 'text-teal-100 border-teal-600'
                      }`}>
                        Translation: "{msg.translation}"
                      </p>
                    )}

                    {isAi && (
                      <button
                        onClick={() => speakText(msg.text, currentLanguage)}
                        className="mt-1 text-[11px] font-medium text-teal-800 hover:text-teal-950 flex items-center space-x-1"
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>Replay audio</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {isListening && (
              <div className="flex items-start space-x-2 animate-fadeIn">
                <div className="w-7 h-7 rounded-md bg-slate-800 text-white flex items-center justify-center shrink-0">
                  <User className="w-3.5 h-3.5" />
                </div>
                <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg rounded-tl-none p-2.5 text-xs font-semibold flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
                  <span>Listening in {lang.name}...</span>
                </div>
              </div>
            )}

            {isProcessing && (
              <div className="flex items-start space-x-2 animate-fadeIn">
                <div className="w-7 h-7 rounded-md bg-teal-800 text-white flex items-center justify-center shrink-0">
                  <Activity className="w-3.5 h-3.5" />
                </div>
                <div className="bg-teal-50 border border-teal-200 text-teal-800 rounded-lg rounded-tl-none p-2.5 text-xs font-semibold flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-spin"></span>
                  <span>Transcribing and structuring summary...</span>
                </div>
              </div>
            )}

            <div ref={chatBottomRef} />
          </div>

          <div className="p-3 bg-slate-50 border-t border-slate-200 space-y-2">
            <div className="flex items-center gap-2">
              <button
                onClick={handleSimulateSpeechResponse}
                disabled={isListening || isProcessing}
                className={`flex-1 py-2.5 px-3.5 rounded-lg font-medium text-xs shadow-sm transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                  isListening
                    ? 'bg-red-600 text-white'
                    : isProcessing
                    ? 'bg-teal-800 text-white'
                    : 'bg-teal-700 hover:bg-teal-800 text-white'
                }`}
              >
                <Mic className="w-3.5 h-3.5" />
                <span>
                  {isListening 
                    ? 'Listening... (Speak Now)' 
                    : isProcessing 
                    ? 'Processing...' 
                    : `Tap to Speak (${lang.name})`}
                </span>
              </button>

              <button
                onClick={() => setCurrentScreen('review')}
                className="px-3.5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs shadow-sm transition-colors flex items-center space-x-1"
              >
                <span>Review</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <form onSubmit={handleManualSubmit} className="flex gap-2">
              <input
                type="text"
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value)}
                placeholder="Or type reply in English / Hindi..."
                className="flex-1 px-2.5 py-1 text-xs rounded-md border border-slate-300 focus:outline-none focus:border-teal-700 text-slate-800 bg-white"
              />
              <button
                type="submit"
                className="px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-md text-xs font-medium transition-colors"
              >
                Send
              </button>
            </form>
          </div>

        </div>

        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-3">
          
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-200">
            <div className="flex items-center space-x-1.5">
              <FileCheck2 className="w-4 h-4 text-teal-700" />
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                Information Collected
              </h3>
            </div>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
              Live Summary
            </span>
          </div>

          <div className="space-y-2 text-xs text-slate-700">
            
            <div className="p-2 rounded bg-slate-50 border border-slate-200">
              <span className="font-semibold uppercase tracking-wider text-slate-500 block mb-0.5 text-[10px]">Chief Complaint</span>
              <p className="text-xs font-bold text-slate-900">{activePatient.clinicalInfo.chiefComplaint || 'Fever and headache'}</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 rounded bg-slate-50 border border-slate-200">
                <span className="font-semibold uppercase tracking-wider text-slate-500 block mb-0.5 text-[10px]">Duration</span>
                <p className="font-semibold text-slate-900">{activePatient.clinicalInfo.duration || '3 days'}</p>
              </div>

              <div className="p-2 rounded bg-slate-50 border border-slate-200">
                <span className="font-semibold uppercase tracking-wider text-slate-500 block mb-0.5 text-[10px]">Severity</span>
                <p className="font-semibold text-amber-800">{activePatient.clinicalInfo.severity || 'Moderate'}</p>
              </div>
            </div>

            <div className="p-2 rounded bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-semibold uppercase tracking-wider text-slate-500 block mb-0.5 text-[10px]">Temperature</span>
                <span className="text-xs font-bold text-slate-900">{activePatient.clinicalInfo.temperature || '~101°F'}</span>
              </div>
              <Thermometer className="w-3.5 h-3.5 text-rose-500" />
            </div>

            <div className="p-2 rounded bg-slate-50 border border-slate-200">
              <span className="font-semibold uppercase tracking-wider text-slate-500 block mb-1 text-[10px]">Positive Symptoms</span>
              <div className="flex flex-wrap gap-1">
                {activePatient.clinicalInfo.associatedSymptoms.map((symp, i) => (
                  <span key={i} className="px-1.5 py-0.2 rounded bg-teal-50 text-teal-800 font-medium border border-teal-200 text-[10px]">
                    + {symp}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-2 rounded bg-slate-50 border border-slate-200">
              <span className="font-semibold uppercase tracking-wider text-slate-500 block mb-1 text-[10px]">Denied Symptoms</span>
              <div className="flex flex-wrap gap-1">
                {activePatient.clinicalInfo.deniedSymptoms.map((den, i) => (
                  <span key={i} className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-medium border border-slate-200 text-[10px]">
                    ✕ {den}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-2 rounded bg-slate-50 border border-slate-200 flex items-start space-x-1.5">
              <Pill className="w-3.5 h-3.5 text-indigo-600 mt-0.5 shrink-0" />
              <div>
                <span className="font-semibold uppercase tracking-wider text-slate-500 block mb-0.5 text-[10px]">Medication Taken</span>
                <p className="font-semibold text-slate-900">{activePatient.clinicalInfo.medicationsTaken.join(', ') || 'Paracetamol 650mg'}</p>
              </div>
            </div>

            <div className="p-2 rounded bg-slate-50 border border-slate-200">
              <span className="font-semibold uppercase tracking-wider text-slate-500 block mb-0.5 text-[10px]">Allergies</span>
              <p className="font-semibold text-slate-700">{activePatient.clinicalInfo.allergies || 'Not reported'}</p>
            </div>

          </div>

          <button
            onClick={() => setCurrentScreen('review')}
            className="w-full py-2 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-medium text-xs shadow-sm transition-all flex items-center justify-center space-x-1"
          >
            <span>Proceed to Review</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

        </div>

      </div>

    </div>
  );
};
