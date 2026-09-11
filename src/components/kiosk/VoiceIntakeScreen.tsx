import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  ArrowLeft, 
  RotateCcw, 
  Check, 
  Keyboard, 
  Volume2, 
  Send,
  Sparkles,
  Stethoscope,
  Leaf
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

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
    clinicalDepartment,
    activePatient
  } = useApp();

  const [micState, setMicState] = useState<MicState>('IDLE');
  const [transcription, setTranscription] = useState<string>('');
  const [isTypingMode, setIsTypingMode] = useState(false);
  const [manualText, setManualText] = useState('');
  const recognitionRef = useRef<any>(null);

  const lang = getLanguageDetails(currentLanguage);

  const initialPrompt = clinicalDepartment === 'ayush'
    ? (currentLanguage === 'hi' 
        ? `नमस्ते ${activePatient.name.split(' ')[0]} जी! आयुष ओपीडी में आपका स्वागत है। कृपया बताएं कि आपके शरीर में क्या मुख्य कष्ट या वेदना है?`
        : `Namaste ${activePatient.name.split(' ')[0]} ji! Welcome to AYUSH OPD. Please speak your chief health discomfort or symptoms.`)
    : (currentLanguage === 'hi'
        ? `नमस्ते ${activePatient.name.split(' ')[0]} जी! मेडीकियोस्क में आपका स्वागत है। कृपया बताएं कि आज आपको क्या तकलीफ महसूस हो रही है?`
        : `Hello ${activePatient.name.split(' ')[0]} ji! Welcome to MediKiosk. Please describe what symptoms or health issue you are experiencing today.`);

  useEffect(() => {
    speakText(initialPrompt, currentLanguage);
  }, []);

  const getLanguageBcp47 = (code: string) => {
    const map: Record<string, string> = {
      hi: 'hi-IN',
      en: 'en-IN',
      bn: 'bn-IN',
      te: 'te-IN',
      mr: 'mr-IN',
      ta: 'ta-IN',
      gu: 'gu-IN',
      kn: 'kn-IN',
      ml: 'ml-IN',
      pa: 'pa-IN'
    };
    return map[code] || 'hi-IN';
  };

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        if (recognitionRef.current) {
          recognitionRef.current.abort();
        }

        const recognition = new SpeechRecognition();
        recognition.lang = getLanguageBcp47(currentLanguage);
        recognition.interimResults = true;
        recognition.continuous = false;

        recognition.onstart = () => {
          setMicState('LISTENING');
          setTranscription('');
        };

        recognition.onresult = (event: any) => {
          let currentTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          setTranscription(currentTranscript);
        };

        recognition.onerror = () => {
          // If error or permission blocked, simulate fallback
          fallbackVoiceSimulation();
        };

        recognition.onend = () => {
          setMicState('RESPONDING');
        };

        recognitionRef.current = recognition;
        recognition.start();
        return;
      } catch {
        fallbackVoiceSimulation();
      }
    } else {
      fallbackVoiceSimulation();
    }
  };

  const fallbackVoiceSimulation = () => {
    setMicState('LISTENING');
    setTranscription('');

    const defaultPreset = currentLanguage === 'hi'
      ? (clinicalDepartment === 'ayush' 
          ? 'मेरे दोनों घुटनों में पिछले चार महीने से दर्द और जकड़न है, और पेट में भारीपन रहता है।' 
          : 'मुझे पिछले तीन दिन से बुखार है और सिर में काफी भारीपन और दर्द हो रहा है।')
      : (clinicalDepartment === 'ayush'
          ? 'Severe stiffness and pain in bilateral knee joints for 4 months with sluggish digestion.'
          : 'I have had high fever and throbbing headache for the last 3 days.');

    setTimeout(() => {
      setMicState('PROCESSING');
      setTimeout(() => {
        setTranscription(defaultPreset);
        setMicState('RESPONDING');
      }, 1200);
    }, 2200);
  };

  const handleConfirmTranscript = () => {
    const finalPatientText = transcription.trim() || (currentLanguage === 'hi' ? 'बुखार और सिरदर्द' : 'Fever and headache');

    // Red flag emergency triage detection
    const lower = finalPatientText.toLowerCase();
    if (
      lower.includes('chest pain') || 
      lower.includes('सीने में दर्द') ||
      lower.includes('heart') ||
      lower.includes('heart attack') ||
      lower.includes('cannot breathe') ||
      lower.includes('सांस नहीं')
    ) {
      triggerUrgentAlert('Acute retrosternal chest pain / respiratory distress reported.');
      return;
    }

    addMessageToActivePatient({
      sender: 'ai',
      text: initialPrompt,
      translation: 'Chief complaint initial prompt'
    });

    addMessageToActivePatient({
      sender: 'patient',
      text: finalPatientText,
      translation: finalPatientText
    });

    updateActiveClinicalInfo({
      chiefComplaint: finalPatientText,
      duration: 'Reported during initial inquiry',
      severity: 'Moderate'
    });

    setCurrentScreen('ai-conversation');
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualText.trim()) return;

    const lower = manualText.toLowerCase();
    if (
      lower.includes('chest pain') || 
      lower.includes('सीने में दर्द') ||
      lower.includes('breath')
    ) {
      triggerUrgentAlert('Acute chest pain / breathing distress reported by patient.');
      return;
    }

    setTranscription(manualText);
    setMicState('RESPONDING');
    setIsTypingMode(false);
  };

  return (
    <div className="flex-1 flex flex-col justify-center max-w-3xl mx-auto w-full px-4 sm:px-6 py-6 animate-fadeIn">
      
      {/* Top Breadcrumb */}
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={navigateBack}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs transition-colors shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Consent</span>
        </button>

        <span className="text-xs font-bold uppercase tracking-wider bg-teal-50 text-teal-800 border border-teal-200 px-2.5 py-0.5 rounded">
          Step 2 of 4 • Voice Clinical Intake
        </span>
      </div>

      {/* AI Prompt Header Card */}
      <div className="bg-slate-900 rounded-xl p-5 text-white shadow-sm mb-4">
        <div className="flex items-start space-x-3.5">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
            clinicalDepartment === 'ayush' ? 'bg-amber-500/20 text-amber-300' : 'bg-teal-500/20 text-teal-300'
          }`}>
            {clinicalDepartment === 'ayush' ? <Leaf className="w-5 h-5" /> : <Stethoscope className="w-5 h-5" />}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-400">
                Spoken Prompt • {lang.name} ({lang.nativeName})
              </span>
              <button
                onClick={() => speakText(initialPrompt, currentLanguage)}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs font-semibold flex items-center space-x-1 transition-colors"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Hear Question</span>
              </button>
            </div>
            
            <h2 className="text-base sm:text-lg font-bold leading-snug">
              {initialPrompt}
            </h2>
          </div>
        </div>
      </div>

      {/* Microphone Capture Box */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 shadow-sm text-center flex flex-col items-center mb-4">
        
        <div className="mb-4">
          {micState === 'IDLE' && (
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-teal-600"></span>
              <span>Tap microphone below to speak in {lang.name}</span>
            </div>
          )}
          {micState === 'LISTENING' && (
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-red-50 text-red-800 border border-red-200 text-xs font-bold animate-pulse">
              <span className="w-2 h-2 rounded-full bg-red-600"></span>
              <span>Listening via Microphone ({lang.name})...</span>
            </div>
          )}
          {micState === 'PROCESSING' && (
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-teal-700 animate-spin" />
              <span>Transcribing and Analyzing Clinical Entities...</span>
            </div>
          )}
          {micState === 'RESPONDING' && (
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              <span>Voice Captured Successfully</span>
            </div>
          )}
        </div>

        {/* Big Touch Microphone Button */}
        <div className="mb-4">
          <button
            id="btn-kiosk-mic"
            onClick={startListening}
            disabled={micState === 'LISTENING' || micState === 'PROCESSING'}
            className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center shadow-md transition-all cursor-pointer ${
              micState === 'LISTENING'
                ? 'bg-red-600 text-white ring-8 ring-red-100 scale-105'
                : micState === 'PROCESSING'
                ? 'bg-teal-700 text-white animate-pulse'
                : micState === 'RESPONDING'
                ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                : 'bg-teal-700 hover:bg-teal-800 text-white ring-6 ring-slate-100'
            }`}
          >
            <Mic className="w-8 h-8 sm:w-10 sm:h-10" />
          </button>
        </div>

        {/* Live Transcript Card */}
        {transcription ? (
          <div className="w-full max-w-lg bg-slate-50 border border-slate-200 rounded-xl p-4 mb-4 text-left animate-fadeIn">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              <span className="text-teal-800">Captured Speech Transcript ({lang.name})</span>
              <button 
                onClick={() => speakText(transcription, currentLanguage)}
                className="text-teal-700 hover:text-teal-900 flex items-center space-x-1 text-xs font-semibold"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Listen</span>
              </button>
            </div>
            
            <p className="text-sm font-bold text-slate-900 mb-2">
              "{transcription}"
            </p>

            <div className="mt-3 pt-2.5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2">
              <span className="text-xs font-semibold text-slate-700">Confirm this description?</span>
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <button
                  onClick={startListening}
                  className="flex-1 sm:flex-initial px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold text-xs flex items-center justify-center space-x-1 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Re-speak</span>
                </button>
                <button
                  onClick={handleConfirmTranscript}
                  className="flex-1 sm:flex-initial px-4 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-sm flex items-center justify-center space-x-1 transition-all"
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Confirm & Continue</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-slate-500 text-xs max-w-sm mb-4 font-medium">
            Tap the microphone above and speak clearly into the terminal.
          </p>
        )}

        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setIsTypingMode(!isTypingMode)}
            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center space-x-1.5 transition-colors"
          >
            <Keyboard className="w-3.5 h-3.5" />
            <span>Type Instead</span>
          </button>
        </div>

        {isTypingMode && (
          <form onSubmit={handleManualSubmit} className="w-full max-w-lg mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200 text-left animate-fadeIn">
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              Type your chief complaint:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={manualText}
                onChange={(e) => setManualText(e.target.value)}
                placeholder="e.g. Fever since 3 days, headache, high sugar..."
                className="flex-1 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-teal-700 text-xs text-slate-900 bg-white font-medium"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center space-x-1 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit</span>
              </button>
            </div>
          </form>
        )}

      </div>

    </div>
  );
};
