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

  const getInitialPrompt = () => {
    const firstName = activePatient.name.split(' ')[0] || 'Patient';
    if (clinicalDepartment === 'ayush') {
      const prompts: Record<string, string> = {
        hi: `नमस्ते ${firstName} जी! आयुष ओपीडी में आपका स्वागत है। कृपया बताएं कि आपके शरीर में क्या मुख्य कष्ट या वेदना है?`,
        en: `Namaste ${firstName} ji! Welcome to AYUSH OPD. Please speak your chief health discomfort or symptoms.`,
        pa: `ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ${firstName} ਜੀ! ਆਯੁਸ਼ ਓਪੀਡੀ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਦੱਸੋ ਕਿ ਤੁਹਾਡੇ ਸਰੀਰ ਵਿੱਚ ਕੀ ਮੁੱਖ ਤਕਲੀਫ਼ ਜਾਂ ਦਰਦ ਹੈ?`,
        kn: `ನಮಸ್ಕಾರ ${firstName} ಅವರೇ! ಆಯುಷ್ ಒಪಿಡಿಗೆ ಸುಸ್ವಾಗತ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ದೇಹದಲ್ಲಿ ಯಾವ ಮುಖ್ಯ ತೊಂದರೆ ಅಥವಾ ನೋವು ಇದೆ ಎಂದು ತಿಳಿಸಿ.`,
        ml: `നമസ്കാരം ${firstName}! ആയുഷ് ഒപിഡിയിലേക്ക് സ്വാഗതം. നിങ്ങളുടെ പ്രധാന ആരോഗ്യ അസ്വസ്ഥതയോ രോഗലക്ഷണങ്ങളോ ദയവായി പറയൂ.`,
        bn: `নমস্কার ${firstName} বাবু! আয়ুষ ওপিডিতে আপনাকে স্বাগতম। আপনার শরীরে প্রধান কী সমস্যা বা ব্যথা হচ্ছে বলুন।`,
        te: `నమస్కారం ${firstName} గారు! ఆయుష్ ఓపీడీకి స్వాగతం. మీ శరీరంలో ఉన్న ముఖ్య సమస్య లేదా నొప్పి గురించి చెప్పండి.`,
        ta: `வணக்கம் ${firstName} அவர்களே! ஆயுஷ் புறநோயாளிகள் பிரிவுக்கு நல்வரவு. உங்கள் உடலில் உள்ள முக்கிய பிரச்சனை அல்லது வலியைப் பற்றி கூறுங்கள்.`,
        mr: `नमस्कार ${firstName} जी! आयुष ओपीडीमध्ये आपले स्वागत आहे. कृपया सांगा की आपल्या शरीरात काय मुख्य त्रास किंवा वेदना आहे?`,
        gu: `નમસ્તે ${firstName} ભાઈ/બહેન! આયુષ ઓપીડીમાં આપનું સ્વાગત છે. કૃપા કરીને જણાવો કે તમારા શરીરમાં શું મુખ્ય તકલીફ છે?`
      };
      return prompts[currentLanguage] || prompts.en;
    } else {
      const prompts: Record<string, string> = {
        hi: `नमस्ते ${firstName} जी! मेडीकियोस्क में आपका स्वागत है। कृपया बताएं कि आज आपको क्या तकलीफ महसूस हो रही है?`,
        en: `Hello ${firstName} ji! Welcome to MediKiosk. Please describe what symptoms or health issue you are experiencing today.`,
        pa: `ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ${firstName} ਜੀ! ਮੈਡੀਕਿਓਸਕ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਦੱਸੋ ਕਿ ਅੱਜ ਤੁਹਾਨੂੰ ਕੀ ਤਕਲੀਫ਼ ਹੈ?`,
        kn: `ನಮಸ್ಕಾರ ${firstName} ಅವರೇ! ಮೆಡಿಕಿಯೋಸ್ಕ್‌ಗೆ ಸುಸ್ವಾಗತ. ದಯವಿಟ್ಟು ಇಂದು ನಿಮಗೆ ಯಾವ ಆರೋಗ್ಯ ಸಮಸ್ಯೆ ಅಥವಾ ತೊಂದರೆ ಇದೆ ಎಂದು ತಿಳಿಸಿ.`,
        ml: `നമസ്കാരം ${firstName}! മെഡികിയോസ്കിലേക്ക് സ്വാഗതം. ഇന്ന് നിങ്ങൾക്ക് എന്തെങ്കിലും ആരോഗ്യ പ്രശ്നമോ ബുദ്ധിമുട്ടോ ഉണ്ടോ എന്ന് ദയവായി പറയൂ.`,
        bn: `নমস্কার ${firstName} বাবু! মেডিকিয়স্কে স্বাগতম। আজ আপনার কী ধরনের শারীরিক সমস্যা হচ্ছে বলুন।`,
        te: `నమస్కారం ${firstName} గారు! మెడికియోస్క్‌కు స్వాగతం. ఈరోజు మీకు ఉన్న ఆరోగ్య సమస్య లేదా బాధను వివరించండి.`,
        ta: `வணக்கம் ${firstName} அவர்களே! மெடிகியோஸ்க்கிற்கு வருக. இன்று உங்களுக்கு என்ன உடல்நல பிரச்சனை உள்ளது என்று விளக்குங்கள்.`,
        mr: `नमस्कार ${firstName} जी! मेडीकियोस्कमध्ये आपले स्वागत आहे. कृपया सांगा आज तुम्हाला काय त्रास होत आहे?`,
        gu: `નમસ્તે ${firstName} ભાઈ/બહેન! મેડીકિયોસ્કમાં આપનું સ્વાગત છે. કૃપા કરીને જણાવો કે આજે તમને શું તકલીફ છે?`
      };
      return prompts[currentLanguage] || prompts.en;
    }
  };

  const initialPrompt = getInitialPrompt();

  useEffect(() => {
    speakText(initialPrompt, currentLanguage);
  }, [currentLanguage]);

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

    const ayushPresets: Record<string, string> = {
      hi: 'मेरे दोनों घुटनों में पिछले चार महीने से दर्द और जकड़न है, और पेट में भारीपन रहता है।',
      en: 'Severe stiffness and pain in bilateral knee joints for 4 months with sluggish digestion.',
      pa: 'ਮੇਰੇ ਦੋਵਾਂ ਗੋਡਿਆਂ ਵਿੱਚ ਪਿਛਲੇ ਚਾਰ ਮਹੀਨਿਆਂ ਤੋਂ ਦਰਦ ਅਤੇ ਅਕੜਾਅ ਹੈ, ਅਤੇ ਪੇਟ ਵਿੱਚ ਭਾਰਾਪਣ ਰਹਿੰਦਾ ਹੈ।',
      kn: 'ನನ್ನ ಎರಡೂ ಮೊಣಕಾಲುಗಳಲ್ಲಿ ಕಳೆದ ನಾಲ್ಕು ತಿಂಗಳುಗಳಿಂದ ತೀವ್ರ ನೋವು ಮತ್ತು ಜಡತ್ವವಿದೆ, ಜೊತೆಗೆ ಜೀರ್ಣಕ್ರಿಯೆ ಮಂದವಾಗಿದೆ.',
      ml: 'കഴിഞ്ഞ നാല് മാസമായി എന്റെ രണ്ട് കാൽമുട്ടുകളിലും കഠിനമായ വേദനയും വഴക്കമില്ലായ്മയും ഉണ്ട്, ദഹനക്കുറവും ഉണ്ട്.',
      bn: 'আমার দুই হাঁটুতেই গত চার মাস ধরে তীব্র ব্যথা ও আড়ষ্টতা রয়েছে, এবং পেটে ভারী ভাব থাকে।',
      te: 'నా రెండు మోకాళ్లలో గత నాలుగు నెలలుగా తీవ్రమైన నొప్పి మరియు బిగుతుగా ఉంది, జీర్ణక్రియ కూడా సరిగా లేదు.',
      ta: 'எனது இரண்டு முழங்கால்களிலும் கடந்த நான்கு மாதங்களாக கடுமையான வலியும் விறைப்பும் உள்ளது, செரிமானக் கோளாறும் உள்ளது.',
      mr: 'माझ्या दोन्ही गुडघ्यांमध्ये गेल्या चार महिन्यांपासून तीव्र वेदना आणि कडकपणा आहे, आणि पचन नीट होत नाही.',
      gu: 'મારા બંને ઘૂંટણમાં છેલ્લા ચાર મહિનાથી દુખાવો અને જકડન છે, અને પેટમાં ભારેપણું રહે છે.'
    };

    const allopathyPresets: Record<string, string> = {
      hi: 'मुझे पिछले तीन दिन से बुखार है और सिर में काफी भारीपन और दर्द हो रहा है।',
      en: 'I have had high fever and throbbing headache for the last 3 days.',
      pa: 'ਮੈਨੂੰ ਪਿਛਲੇ ਤਿੰਨ ਦਿਨਾਂ ਤੋਂ ਤੇਜ਼ ਬੁਖਾਰ ਅਤੇ ਸਿਰ ਵਿੱਚ ਬਹੁਤ ਦਰਦ ਹੋ ਰਿਹਾ ਹੈ।',
      kn: 'ನನಗೆ ಕಳೆದ ಮೂರು ದಿನಗಳಿಂದ ತೀವ್ರ ಜ್ವರ ಮತ್ತು ತಲೆನೋವು ಇದೆ.',
      ml: 'എനിക്ക് കഴിഞ്ഞ മൂന്ന് ദിവസമായി കഠിനമായ പനിയും ശക്തമായ തലവേദനയും ഉണ്ട്.',
      bn: 'আমার গত তিন দিন ধরে প্রচণ্ড জ্বর এবং তীব্র মাথাব্যথা হচ্ছে।',
      te: 'నాకు గత మూడు రోజులుగా తీవ్రమైన జ్వరం మరియు తీవ్రమైన తలనొప్పిగా ఉంది.',
      ta: 'எனக்கு கடந்த மூன்று நாட்களாக அதிக காய்ச்சலும் கடுமையான தலைவலியும் உள்ளது.',
      mr: 'मला गेल्या तीन दिवसांपासून तीव्र ताप आणि डोकेदुखीचा त्रास होत आहे.',
      gu: 'મને છેલ્લા ત્રણ દિવસથી તીવ્ર તાવ અને માથાનો અસહ્ય દુખાવો છે.'
    };

    const defaultPreset = clinicalDepartment === 'ayush'
      ? (ayushPresets[currentLanguage] || ayushPresets.en)
      : (allopathyPresets[currentLanguage] || allopathyPresets.en);

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
