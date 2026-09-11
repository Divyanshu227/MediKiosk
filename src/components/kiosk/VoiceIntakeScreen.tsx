import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  ArrowLeft, 
  RotateCcw, 
  Check, 
  Keyboard, 
  Volume2, 
  AlertTriangle,
  Send
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
    triggerUrgentAlert
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

  useEffect(() => {
    speakText(localizedAiQuestion, currentLanguage);
  }, []);

  const startListening = () => {
    setMicState('LISTENING');
    setTranscription('');

    setTimeout(() => {
      setMicState('PROCESSING');
      setTimeout(() => {
        setTranscription(localizedDefaultResponse);
        setMicState('RESPONDING');
      }, 1200);
    }, 2500);
  };

  const handleConfirmTranscript = () => {
    const finalPatientText = transcription || localizedDefaultResponse;

    if (
      finalPatientText.toLowerCase().includes('chest pain') || 
      finalPatientText.toLowerCase().includes('सीने में दर्द') ||
      finalPatientText.toLowerCase().includes('cannot breathe') ||
      finalPatientText.toLowerCase().includes('सांस नहीं')
    ) {
      triggerUrgentAlert('Acute chest pain or respiratory distress symptoms detected.');
      return;
    }

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

    updateActiveClinicalInfo({
      chiefComplaint: 'Fever and headache',
      duration: '3 days',
      severity: 'Moderate'
    });

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
    <div className="flex-1 flex flex-col justify-center max-w-3xl mx-auto w-full px-4 sm:px-6 py-6 animate-fadeIn">
      
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={navigateBack}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-xs transition-colors shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Step 4 of 6 • Voice Intake
        </span>
      </div>

      <div className="bg-slate-900 rounded-xl p-5 text-white shadow-sm mb-4">
        <div className="flex items-start space-x-3">
          <div className="w-9 h-9 rounded-lg bg-teal-500/20 border border-teal-400/30 text-teal-300 flex items-center justify-center shrink-0">
            <Volume2 className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-teal-400">
                Prompt ({lang.name})
              </span>
              <button
                onClick={() => speakText(localizedAiQuestion, currentLanguage)}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs flex items-center space-x-1 transition-colors"
                title="Hear question again"
              >
                <Volume2 className="w-3 h-3" />
                <span>Replay</span>
              </button>
            </div>
            
            <h2 className="text-lg sm:text-xl font-bold leading-snug">
              {localizedAiQuestion}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Translation: "What symptoms or health trouble are you feeling today?"
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 shadow-sm text-center flex flex-col items-center mb-4">
        
        <div className="mb-4">
          {micState === 'IDLE' && (
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
              <span>Tap microphone below and speak</span>
            </div>
          )}
          {micState === 'LISTENING' && (
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-red-50 text-red-800 border border-red-200 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
              <span>Listening to voice in {lang.name}...</span>
            </div>
          )}
          {micState === 'PROCESSING' && (
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-teal-50 text-teal-800 border border-teal-200 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-spin"></span>
              <span>Transcribing speech...</span>
            </div>
          )}
          {micState === 'RESPONDING' && (
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              <span>Speech Captured</span>
            </div>
          )}
        </div>

        <div className="mb-4">
          <button
            id="btn-kiosk-mic"
            onClick={startListening}
            disabled={micState === 'LISTENING' || micState === 'PROCESSING'}
            className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center shadow-sm transition-all cursor-pointer ${
              micState === 'LISTENING'
                ? 'bg-red-600 text-white ring-4 ring-red-100'
                : micState === 'PROCESSING'
                ? 'bg-teal-700 text-white animate-pulse'
                : micState === 'RESPONDING'
                ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                : 'bg-teal-700 hover:bg-teal-800 text-white ring-4 ring-slate-100'
            }`}
          >
            <Mic className="w-8 h-8 sm:w-10 sm:h-10" />
          </button>
        </div>

        {micState === 'LISTENING' && (
          <div className="flex items-center justify-center space-x-1.5 h-6 mb-3">
            <span className="w-1 bg-teal-700 rounded-full animate-soundwave-1"></span>
            <span className="w-1 bg-teal-700 rounded-full animate-soundwave-2"></span>
            <span className="w-1 bg-teal-700 rounded-full animate-soundwave-3"></span>
            <span className="w-1 bg-teal-700 rounded-full animate-soundwave-4"></span>
            <span className="w-1 bg-teal-700 rounded-full animate-soundwave-5"></span>
          </div>
        )}

        {transcription ? (
          <div className="w-full max-w-lg bg-slate-50 border border-slate-200 rounded-lg p-3.5 mb-4 text-left animate-fadeIn">
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              <span className="text-teal-800">Transcription ({lang.name})</span>
              <button 
                onClick={() => speakText(transcription, currentLanguage)}
                className="text-teal-700 hover:text-teal-900 flex items-center space-x-1 text-xs font-medium"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Listen</span>
              </button>
            </div>
            
            <p className="text-sm sm:text-base font-bold text-slate-900 mb-1">
              "{transcription}"
            </p>
            <p className="text-xs text-slate-500 italic">
              Translation: "{stepData.translation}"
            </p>

            <div className="mt-3 pt-2.5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2">
              <span className="text-xs font-medium text-slate-700">Confirm transcription:</span>
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <button
                  onClick={startListening}
                  className="flex-1 sm:flex-initial px-2.5 py-1 rounded-md bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-medium text-xs flex items-center justify-center space-x-1 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Re-record</span>
                </button>
                <button
                  onClick={handleConfirmTranscript}
                  className="flex-1 sm:flex-initial px-3.5 py-1 rounded-md bg-teal-700 hover:bg-teal-800 text-white font-medium text-xs shadow-sm flex items-center justify-center space-x-1 transition-all"
                >
                  <Check className="w-3 h-3 stroke-[3]" />
                  <span>Confirm</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-slate-500 text-xs max-w-sm mb-4">
            Click the microphone above to record your response in {lang.name}.
          </p>
        )}

        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setIsTypingMode(!isTypingMode)}
            className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs flex items-center space-x-1.5 transition-colors"
          >
            <Keyboard className="w-3.5 h-3.5" />
            <span>Type Instead</span>
          </button>

          <button
            onClick={handleUrgentDemoClick}
            className="px-2.5 py-1 rounded-md bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-medium text-xs flex items-center space-x-1.5 transition-colors"
            title="Demonstrate safety intervention for acute red flag symptoms"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
            <span>Test Red-Flag / ER Trigger</span>
          </button>
        </div>

        {isTypingMode && (
          <form onSubmit={handleManualSubmit} className="w-full max-w-lg mt-3 p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-left animate-fadeIn">
            <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Enter symptoms text:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={manualText}
                onChange={(e) => setManualText(e.target.value)}
                placeholder="e.g. Fever since 3 days and headache..."
                className="flex-1 px-2.5 py-1.5 rounded-md border border-slate-300 focus:outline-none focus:border-teal-700 text-xs text-slate-900"
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-md bg-teal-700 hover:bg-teal-800 text-white font-medium text-xs flex items-center space-x-1 shadow-sm"
              >
                <Send className="w-3 h-3" />
                <span>Submit</span>
              </button>
            </div>
          </form>
        )}

      </div>

    </div>
  );
};
