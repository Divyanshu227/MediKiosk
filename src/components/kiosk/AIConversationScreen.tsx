import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  Send, 
  Volume2, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw, 
  FileCheck2, 
  Activity, 
  Thermometer, 
  Pill, 
  ShieldCheck,
  Languages,
  User
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

  const [currentStepIndex, setCurrentStepIndex] = useState(1); // 0 was chief complaint, now at stage 2 (Duration)
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [manualInput, setManualInput] = useState('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const lang = getLanguageDetails(currentLanguage);

  // Auto-scroll chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activePatient.conversation, isProcessing]);

  // Initial stage prompt on arrival
  useEffect(() => {
    if (currentStepIndex < DEMO_FLOW_STEPS.length) {
      const step = DEMO_FLOW_STEPS[currentStepIndex];
      const langCode = currentLanguage in step.aiQuestion ? currentLanguage : 'hi';
      const q = step.aiQuestion[langCode as keyof typeof step.aiQuestion] || step.aiQuestion.hi;
      
      // Check if message already exists
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

          // Add patient reply
          addMessageToActivePatient({
            sender: 'patient',
            text: pResponse,
            translation: step.translation
          });

          // Apply extracted clinical fields
          if (step.clinicalExtraction) {
            updateActiveClinicalInfo(step.clinicalExtraction);
          }

          // Advance to next question stage
          if (currentStepIndex < DEMO_FLOW_STEPS.length - 1) {
            setCurrentStepIndex(prev => prev + 1);
          } else {
            // Completed all stages! Add final AI concluding message
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
      }, 1400);
    }, 2200);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualInput.trim()) return;

    const userInput = manualInput;
    setManualInput('');

    // Urgent symptom check
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
    }, 1200);
  };

  // Calculate completion percentage
  const totalStages = DEMO_FLOW_STEPS.length;
  const progressPercent = Math.min(100, Math.round(((currentStepIndex + 1) / totalStages) * 100));

  return (
    <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 animate-fadeIn">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-slate-900 text-base">{activePatient.name}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono font-bold">
                {activePatient.id}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Speaking in: <strong className="text-teal-700">{lang.name} ({lang.nativeName})</strong> • Age: {activePatient.age} ({activePatient.gender})
            </p>
          </div>
        </div>

        {/* Clinical History Progress */}
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Clinical History</span>
            <span className="text-sm font-black text-teal-700">{progressPercent}% Complete</span>
          </div>
          <div className="w-28 sm:w-36 h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div 
              className="h-full bg-gradient-to-r from-teal-500 to-teal-600 transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start flex-1 mb-4">
        
        {/* LEFT / MAIN: Conversation Chat Interface (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col h-[580px] overflow-hidden">
          
          {/* Chat Header */}
          <div className="px-6 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-600">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>Medikiosk AI Clinical Intake Dialogue</span>
            </div>
            <span className="text-slate-400">Step {currentStepIndex + 1} of {totalStages}</span>
          </div>

          {/* Chat Messages Timeline */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
            {activePatient.conversation.map((msg) => {
              const isAi = msg.sender === 'ai';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start space-x-3 ${isAi ? '' : 'flex-row-reverse space-x-reverse'}`}
                >
                  {/* Avatar */}
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-bold text-xs ${
                    isAi ? 'bg-gradient-to-tr from-teal-600 to-teal-500' : 'bg-slate-800'
                  }`}>
                    {isAi ? <Sparkles className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>

                  {/* Bubble */}
                  <div className={`max-w-[80%] rounded-2xl p-4 text-sm ${
                    isAi 
                      ? 'bg-slate-100 text-slate-900 border border-slate-200/80 rounded-tl-none' 
                      : 'bg-teal-600 text-white rounded-tr-none shadow-md shadow-teal-600/10'
                  }`}>
                    <div className="flex items-center justify-between text-[11px] mb-1 opacity-80">
                      <span className="font-bold">{isAi ? 'Medikiosk AI' : activePatient.name}</span>
                      <span className="ml-2 font-mono">{msg.timestamp}</span>
                    </div>
                    
                    <p className="font-medium text-base leading-relaxed">{msg.text}</p>
                    
                    {msg.translation && (
                      <p className={`text-xs mt-1.5 pt-1.5 border-t italic ${
                        isAi ? 'text-slate-500 border-slate-200' : 'text-teal-100 border-teal-500/60'
                      }`}>
                        Translation: "{msg.translation}"
                      </p>
                    )}

                    {isAi && (
                      <button
                        onClick={() => speakText(msg.text, currentLanguage)}
                        className="mt-2 text-xs font-semibold text-teal-700 hover:text-teal-900 flex items-center space-x-1"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Replay Audio</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Listening / Processing Animation in chat */}
            {isListening && (
              <div className="flex items-start space-x-3 animate-fadeIn">
                <div className="w-9 h-9 rounded-xl bg-slate-800 text-white flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4" />
                </div>
                <div className="bg-red-50 border border-red-200 text-red-800 rounded-2xl rounded-tl-none p-4 text-xs font-bold flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
                  <span>Listening to your speech in {lang.name}...</span>
                </div>
              </div>
            )}

            {isProcessing && (
              <div className="flex items-start space-x-3 animate-fadeIn">
                <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 animate-spin" />
                </div>
                <div className="bg-teal-50 border border-teal-200 text-teal-800 rounded-2xl rounded-tl-none p-3.5 text-xs font-bold flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-teal-600 animate-bounce"></span>
                  <span>Understanding response & extracting clinical facts...</span>
                </div>
              </div>
            )}

            <div ref={chatBottomRef} />
          </div>

          {/* Bottom Voice / Text Input Controller */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3">
            
            <div className="flex items-center gap-3">
              {/* Central Voice Button */}
              <button
                onClick={handleSimulateSpeechResponse}
                disabled={isListening || isProcessing}
                className={`flex-1 py-3.5 px-4 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2 ${
                  isListening
                    ? 'bg-red-600 text-white animate-pulse'
                    : isProcessing
                    ? 'bg-teal-700 text-white'
                    : 'bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white'
                }`}
              >
                <Mic className={`w-5 h-5 ${isListening ? 'animate-bounce' : ''}`} />
                <span>
                  {isListening 
                    ? 'Listening... (Speak Now)' 
                    : isProcessing 
                    ? 'Extracting Clinical Facts...' 
                    : `Tap to Speak (${lang.name})`}
                </span>
              </button>

              {/* Review CTA when stages advance */}
              <button
                onClick={() => setCurrentScreen('review')}
                className="px-5 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all flex items-center space-x-1.5"
              >
                <span>Review & Finish</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick manual typing fallback */}
            <form onSubmit={handleManualSubmit} className="flex gap-2">
              <input
                type="text"
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value)}
                placeholder="Or type reply in English / Hindi..."
                className="flex-1 px-4 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-teal-600 text-slate-800 bg-white"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-bold transition-colors"
              >
                Send
              </button>
            </form>

          </div>

        </div>

        {/* RIGHT: Live "INFORMATION COLLECTED" Summary Panel (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border-2 border-teal-600/30 p-6 shadow-lg shadow-teal-600/5 space-y-5">
          
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center space-x-2">
              <FileCheck2 className="w-5 h-5 text-teal-600" />
              <h3 className="font-black text-slate-900 text-base tracking-tight uppercase">
                Information Collected
              </h3>
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200">
              Live Structured AI
            </span>
          </div>

          <div className="space-y-3.5 text-xs text-slate-700">
            
            {/* Chief Complaint */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="font-bold uppercase tracking-wider text-slate-600 block mb-1">Chief Complaint</span>
              <p className="text-sm font-bold text-slate-900">{activePatient.clinicalInfo.chiefComplaint || 'Fever and headache'}</p>
            </div>

            {/* Duration & Severity */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="font-bold uppercase tracking-wider text-slate-600 block mb-1">Duration</span>
                <p className="font-semibold text-slate-900">{activePatient.clinicalInfo.duration || '3 days'}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="font-bold uppercase tracking-wider text-slate-600 block mb-1">Severity</span>
                <p className="font-semibold text-amber-700">{activePatient.clinicalInfo.severity || 'Moderate'}</p>
              </div>
            </div>

            {/* Temperature */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="font-bold uppercase tracking-wider text-slate-600 block mb-0.5">Recorded Temperature</span>
                <span className="text-sm font-bold text-slate-900">{activePatient.clinicalInfo.temperature || '~101°F'}</span>
              </div>
              <Thermometer className="w-5 h-5 text-rose-500" />
            </div>

            {/* Associated Symptoms */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="font-bold uppercase tracking-wider text-slate-600 block mb-1">Associated Symptoms</span>
              <div className="flex flex-wrap gap-1.5">
                {activePatient.clinicalInfo.associatedSymptoms.map((symp, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 font-semibold border border-teal-200 text-[11px]">
                    + {symp}
                  </span>
                ))}
              </div>
            </div>

            {/* Negative / Denied Symptoms */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="font-bold uppercase tracking-wider text-slate-600 block mb-1">Negative Symptoms (Denied)</span>
              <div className="flex flex-wrap gap-1.5">
                {activePatient.clinicalInfo.deniedSymptoms.map((den, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-semibold border border-slate-200 text-[11px]">
                    ✕ {den}
                  </span>
                ))}
              </div>
            </div>

            {/* Medications Taken */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start space-x-2">
              <Pill className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-bold uppercase tracking-wider text-slate-600 block mb-0.5">Medication Taken</span>
                <p className="font-semibold text-slate-900">{activePatient.clinicalInfo.medicationsTaken.join(', ') || 'Paracetamol 650mg'}</p>
              </div>
            </div>

            {/* Allergies */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="font-bold uppercase tracking-wider text-slate-600 block mb-0.5">Allergies</span>
              <p className="font-semibold text-slate-700">{activePatient.clinicalInfo.allergies || 'Not reported'}</p>
            </div>

          </div>

          {/* Action button */}
          <button
            onClick={() => setCurrentScreen('review')}
            className="w-full py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2"
          >
            <span>Proceed to Review Information</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>

      </div>

    </div>
  );
};
