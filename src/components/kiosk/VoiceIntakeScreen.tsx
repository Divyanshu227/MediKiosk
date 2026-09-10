import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  MicOff, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  Check, 
  Keyboard, 
  Volume2, 
  Sparkles,
  AlertTriangle,
  Send,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DEMO_FLOW_STEPS } from '../../data/mockData';

type MicState = 'IDLE' | 'LISTENING' | 'PROCESSING' | 'RESPONDING';

export const VoiceIntakeScreen: React.FC = () => {
  const { 
    setCurrentScreen, 
    navigateBack, 
    currentLanguage, 
    getLanguageDetails, 
    addMessageToActivePatient,
    updateActiveClinicalInfo,
    speakText,
    triggerUrgentAlert,
    setIsHelpModalOpen
  } = useApp();

  const [micState, setMicState] = useState<MicState>('IDLE');
  const [transcription, setTranscription] = useState<string>('');
  const [isTypingMode, setIsTypingMode] = useState(false);
  const [manualText, setManualText] = useState('');
  const [stepData] = useState(DEMO_FLOW_STEPS[0]);

  const lang = getLanguageDetails(currentLanguage);
  const currentLangCode = currentLanguage in stepData.aiQuestion ? currentLanguage : 'hi';
  const localizedAiQuestion = stepData.aiQuestion[currentLangCode as keyof typeof stepData.aiQuestion] || stepData.aiQuestion.hi;
  const localizedDefaultResponse = stepData.defaultPatientResponse[currentLangCode as keyof typeof stepData.defaultPatientResponse] || stepData.defaultPatientResponse.hi;

  // Speak AI initial question on mount
  useEffect(() => {
    speakText(localizedAiQuestion, currentLanguage);
  }, []);

  const startListening = () => {
    setMicState('LISTENING');
    setTranscription('');

    // Simulate listening audio and automatic transcription
    setTimeout(() => {
      setMicState('PROCESSING');
      setTimeout(() => {
        setTranscription(localizedDefaultResponse);
        setMicState('RESPONDING');
      }, 1200);
    }, 2800);
  };

  const handleConfirmTranscript = () => {
    const finalPatientText = transcription || localizedDefaultResponse;

    // Check for urgent symptoms trigger
    if (
      finalPatientText.toLowerCase().includes('chest pain') || 
      finalPatientText.toLowerCase().includes('सीने में दर्द') ||
      finalPatientText.toLowerCase().includes('cannot breathe') ||
      finalPatientText.toLowerCase().includes('सांस नहीं')
    ) {
      triggerUrgentAlert('Acute chest pain or respiratory distress symptoms detected.');
      return;
    }

    // Record message into state
    addMessageToActivePatient({
      sender: 'ai',
      text: localizedAiQuestion,
      translation: 'What symptoms or issue are you experiencing today?'
    });

    addMessageToActivePatient({
      sender: 'patient',
      text: finalPatientText,
      translation: stepData.translation
    });

    // Extract clinical data
    updateActiveClinicalInfo({
      chiefComplaint: 'Fever and headache',
      duration: '3 days',
      severity: 'Moderate'
    });

    // Advance to interactive AI conversation screen
    setCurrentScreen('ai-conversation');
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualText.trim()) return;

    if (
      manualText.toLowerCase().includes('chest pain') || 
      manualText.toLowerCase().includes('सीने में दर्द') ||
      manualText.toLowerCase().includes('breath')
    ) {
      triggerUrgentAlert('Acute chest pain / breathing difficulty reported by patient.');
      return;
    }

    setTranscription(manualText);
    setMicState('RESPONDING');
    setIsTypingMode(false);
  };

  const handleUrgentDemoClick = () => {
    setTranscription('Mujhe severe chest pain ho raha hai aur saans lene mein bohot takleef hai (Severe chest pain & difficulty breathing).');
    setMicState('RESPONDING');
  };

  return (
    <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 animate-fadeIn">
      
      {/* Top Bar */}
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={navigateBack}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-sm transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
          Step 4 of 6 • Voice Intake
        </span>
      </div>

      {/* AI Question Bubble */}
      <div className="bg-gradient-to-r from-teal-700 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-500/30 border border-teal-300/30 text-teal-200 flex items-center justify-center font-bold flex-shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-200">
                AI Intake Assistant ({lang.name})
              </span>
              <button
                onClick={() => speakText(localizedAiQuestion, currentLanguage)}
                className="p-1.5 rounded-lg bg-teal-800/60 hover:bg-teal-700/60 text-teal-200 text-xs flex items-center space-x-1 transition-colors"
                title="Hear question again"
              >
                <Volume2 className="w-4 h-4" />
                <span className="hidden sm:inline">Listen</span>
              </button>
            </div>
            
            {/* Localized Question */}
            <h2 className="text-2xl sm:text-3xl font-black leading-snug">
              {localizedAiQuestion}
            </h2>
            <p className="text-sm text-teal-200/80 mt-2 font-medium">
              English: "What symptoms or health trouble are you feeling today?"
            </p>
          </div>
        </div>
      </div>

      {/* Main Microphone Interaction Area */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-8 shadow-md text-center flex flex-col items-center relative mb-6">
        
        {/* Status Indicator */}
        <div className="mb-6">
          {micState === 'IDLE' && (
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-slate-400"></span>
              <span>Tap the microphone and speak naturally</span>
            </div>
          )}
          {micState === 'LISTENING' && (
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-red-50 text-red-700 border border-red-200 text-xs font-bold uppercase tracking-wider animate-pulse">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
              <span>Listening to your voice... Speak now</span>
            </div>
          )}
          {micState === 'PROCESSING' && (
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-spin"></span>
              <span>Understanding your speech...</span>
            </div>
          )}
          {micState === 'RESPONDING' && (
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Speech Captured Successfully</span>
            </div>
          )}
        </div>

        {/* Circular Microphone Button */}
        <div className="relative mb-6">
          {/* Animated Waveform rings when listening */}
          {micState === 'LISTENING' && (
            <>
              <div className="absolute inset-0 rounded-full bg-teal-400/30 animate-ping"></div>
              <div className="absolute -inset-4 rounded-full border-2 border-teal-500/40 animate-pulse"></div>
            </>
          )}

          <button
            id="btn-kiosk-mic"
            onClick={startListening}
            disabled={micState === 'LISTENING' || micState === 'PROCESSING'}
            className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center shadow-2xl transition-all transform hover:scale-105 active:scale-95 ${
              micState === 'LISTENING'
                ? 'bg-gradient-to-tr from-red-600 to-rose-500 text-white shadow-red-500/40 ring-8 ring-red-100'
                : micState === 'PROCESSING'
                ? 'bg-gradient-to-tr from-teal-500 to-teal-400 text-white animate-pulse'
                : micState === 'RESPONDING'
                ? 'bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-emerald-500/30 ring-4 ring-emerald-100'
                : 'bg-gradient-to-tr from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white shadow-teal-600/40 ring-8 ring-teal-50'
            }`}
          >
            <Mic className="w-12 h-12 sm:w-14 sm:h-14" />
          </button>
        </div>

        {/* Waveform graphic when listening */}
        {micState === 'LISTENING' && (
          <div className="flex items-center justify-center space-x-2 h-12 mb-4">
            <span className="w-2 bg-teal-600 rounded-full animate-soundwave-1"></span>
            <span className="w-2 bg-teal-600 rounded-full animate-soundwave-2"></span>
            <span className="w-2 bg-teal-600 rounded-full animate-soundwave-3"></span>
            <span className="w-2 bg-teal-600 rounded-full animate-soundwave-4"></span>
            <span className="w-2 bg-teal-600 rounded-full animate-soundwave-5"></span>
            <span className="w-2 bg-teal-600 rounded-full animate-soundwave-6"></span>
            <span className="w-2 bg-teal-600 rounded-full animate-soundwave-7"></span>
          </div>
        )}

        {/* Transcription Display Area */}
        {transcription ? (
          <div className="w-full max-w-xl bg-slate-50 border-2 border-teal-200 rounded-2xl p-5 mb-6 text-left animate-fadeIn">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              <span className="text-teal-700">Live Transcription ({lang.name})</span>
              <button 
                onClick={() => speakText(transcription, currentLanguage)}
                className="text-teal-600 hover:text-teal-800 flex items-center space-x-1"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Hear</span>
              </button>
            </div>
            
            <p className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
              "{transcription}"
            </p>
            <p className="text-xs text-slate-500 italic">
              Translation: "{stepData.translation}"
            </p>

            {/* Did we hear you correctly? confirmation */}
            <div className="mt-4 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-sm font-bold text-slate-800">Did we hear you correctly?</span>
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <button
                  onClick={startListening}
                  className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-sm flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Try Again</span>
                </button>
                <button
                  onClick={handleConfirmTranscript}
                  className="flex-1 sm:flex-initial px-6 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md flex items-center justify-center space-x-1.5 transition-all"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Yes, Continue</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-slate-500 text-sm max-w-md mb-6">
            Click the microphone above to simulate speaking in your native language.
          </p>
        )}

        {/* Fallback & Emergency Quick Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          
          <button
            onClick={() => setIsTypingMode(!isTypingMode)}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center space-x-1.5 transition-colors"
          >
            <Keyboard className="w-4 h-4" />
            <span>Type Instead (Text Fallback)</span>
          </button>

          {/* Quick Demo: Chest Pain Urgent State Trigger */}
          <button
            onClick={handleUrgentDemoClick}
            className="px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold text-xs flex items-center space-x-1.5 transition-colors"
            title="Demonstrate safety intervention for acute red flag symptoms"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
            <span>Demo Urgent Symptom Trigger (Safety Alert)</span>
          </button>

        </div>

        {/* Typing Fallback Drawer */}
        {isTypingMode && (
          <form onSubmit={handleManualSubmit} className="w-full max-w-xl mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left animate-fadeIn">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Type your symptoms here:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={manualText}
                onChange={(e) => setManualText(e.target.value)}
                placeholder="e.g. Fever since 3 days and headache..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-teal-600 text-sm text-slate-900"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm flex items-center space-x-1.5 shadow-sm"
              >
                <Send className="w-4 h-4" />
                <span>Submit</span>
              </button>
            </div>
          </form>
        )}

      </div>

    </div>
  );
};
