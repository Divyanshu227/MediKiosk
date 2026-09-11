import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  Volume2, 
  ArrowRight, 
  ArrowLeft,
  FileCheck2, 
  Activity, 
  Pill, 
  User,
  Bot,
  Camera,
  Leaf,
  Stethoscope,
  RotateCcw,
  AlertTriangle,
  SkipForward,
  Keyboard,
  ShieldCheck,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DEMO_ALLOPATHY_FLOW_STEPS, DEMO_AYUSH_FLOW_STEPS } from '../../data/mockData';

export const AIConversationScreen: React.FC = () => {
  const { 
    currentLanguage, 
    getLanguageDetails, 
    activePatient, 
    addMessageToActivePatient, 
    updateActiveClinicalInfo,
    updateAyushAssessment,
    setCurrentScreen,
    navigateBack,
    speakText,
    triggerUrgentAlert,
    triggerRedFlagScreen,
    clinicalDepartment,
    inputModality 
  } = useApp();

  const flowSteps = clinicalDepartment === 'ayush' ? DEMO_AYUSH_FLOW_STEPS : DEMO_ALLOPATHY_FLOW_STEPS;

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [manualInput, setManualInput] = useState('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const lang = getLanguageDetails(currentLanguage);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activePatient.conversation, isProcessing]);

  useEffect(() => {
    if (currentStepIndex < flowSteps.length) {
      const step = flowSteps[currentStepIndex];
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
  }, [currentStepIndex, clinicalDepartment]);

  const advanceToNext = (patientText: string, extraction?: any, translation?: string) => {
    addMessageToActivePatient({
      sender: 'patient',
      text: patientText,
      translation: translation || 'Patient response'
    });

    if (extraction) {
      if (clinicalDepartment === 'ayush') {
        if (extraction.ayushAgni) updateAyushAssessment({ agni: extraction.ayushAgni });
        if (extraction.ayushKoshtha) updateAyushAssessment({ koshtha: extraction.ayushKoshtha });
        if (extraction.ayushPrakriti) updateAyushAssessment({ prakriti: extraction.ayushPrakriti });
      }
      updateActiveClinicalInfo(extraction);
    }

    if (currentStepIndex < flowSteps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      const finalMessages: Record<string, string> = {
        hi: 'धन्यवाद। आपका प्रारंभिक विवरण दर्ज हो गया है। अब कृपया अपने पिछले मेडिकल दस्तावेज या पर्चे स्कैन करें।',
        en: 'Thank you. Your clinical intake details are recorded. Now please scan your previous medical documents.',
        pa: 'ਧੰਨਵਾਦ। ਤੁਹਾਡਾ ਸ਼ੁਰੂਆਤੀ ਵੇਰਵਾ ਦਰਜ ਹੋ ਗਿਆ ਹੈ। ਹੁਣ ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੇ ਪਿਛਲੇ ਮੈਡੀਕਲ ਦਸਤਾਵੇਜ਼ ਜਾਂ ਪਰਚੀਆਂ ਸਕੈਨ ਕਰੋ।',
        kn: 'ಧನ್ಯವಾದಗಳು. ನಿಮ್ಮ ಪ್ರಾಥಮಿಕ ವಿವರಗಳನ್ನು ದಾಖಲಿಸಲಾಗಿದೆ. ಈಗ ದಯವಿಟ್ಟು ನಿಮ್ಮ ಹಿಂದಿನ ವೈದ್ಯಕೀಯ ದಾಖಲೆಗಳನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ.',
        ml: 'നന്ദി. നിങ്ങളുടെ പ്രാഥമിക വിവരങ്ങൾ രേഖപ്പെടുത്തിയിട്ടുണ്ട്. ഇനി നിങ്ങളുടെ പഴയ മെഡിക്കൽ രേഖകൾ സ്കാൻ ചെയ്യുക.',
        bn: 'ধন্যবাদ। আপনার প্রাথমিক বিবরণ নথিভুক্ত হয়েছে। এখন দয়া করে আপনার পূর্ববর্তী মেডিকেল নথি স্ক্যান করুন।',
        te: 'ధన్యవాదాలు. మీ ప్రాథమిక వివరాలు నమోదు చేయబడ్డాయి. ఇప్పుడు దయచేసి మీ మునుపటి వైద్య పత్రాలను స్కాన్ చేయండి.',
        ta: 'நன்றி. உங்கள் ஆரம்ப விவரங்கள் பதிவு செய்யப்பட்டுள்ளன. இப்போது உங்கள் முந்தைய மருத்துவ ஆவணங்களை ஸ்கேன் செய்யவும்.',
        mr: 'धन्यवाद. तुमचा प्राथमिक तपशील नोंदवला गेला आहे. आता कृपया तुमची जुनी वैद्यकीय कागदपत्रे स्कॅन करा.',
        gu: 'આભાર. તમારી પ્રારંભિક વિગતો નોંધાઈ ગઈ છે. હવે કૃપા કરીને તમારા જૂના તબીબી દસ્તાવેજો સ્કેન કરો.'
      };
      const finalMsg = finalMessages[currentLanguage] || finalMessages.en;
      
      addMessageToActivePatient({
        sender: 'ai',
        text: finalMsg,
        translation: 'Intake complete. Ready for medical document scanning.'
      });
      speakText(finalMsg, currentLanguage);
    }
  };

  const handleSimulateSpeechResponse = () => {
    if (isListening || isProcessing) return;
    
    setIsListening(true);

    setTimeout(() => {
      setIsListening(false);
      setIsProcessing(true);

      setTimeout(() => {
        setIsProcessing(false);
        if (currentStepIndex < flowSteps.length) {
          const step = flowSteps[currentStepIndex];
          const langCode = currentLanguage in step.defaultPatientResponse ? currentLanguage : 'hi';
          const pResponse = step.defaultPatientResponse[langCode as keyof typeof step.defaultPatientResponse] || step.defaultPatientResponse.hi;

          advanceToNext(pResponse, step.clinicalExtraction, step.translation);
        }
      }, 1200);
    }, 1800);
  };

  const handleTouchOptionSelect = (option: { text: string; clinicalVal: string }) => {
    if (isProcessing) return;

    if (option.clinicalVal.toLowerCase().includes('chest pain') || option.clinicalVal.toLowerCase().includes('urgent')) {
      triggerUrgentAlert('Acute chest pain or severe symptoms selected by patient.');
      return;
    }

    const step = flowSteps[currentStepIndex];
    advanceToNext(option.text, { ...step.clinicalExtraction, notes: option.clinicalVal }, option.clinicalVal);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualInput.trim()) return;

    const userInput = manualInput;
    setManualInput('');

    if (
      userInput.toLowerCase().includes('chest pain') ||
      userInput.toLowerCase().includes('सीने में दर्द') ||
      userInput.toLowerCase().includes('cannot breathe')
    ) {
      triggerUrgentAlert('Acute chest pain or respiratory distress symptoms reported.');
      return;
    }

    advanceToNext(userInput, { notes: userInput }, userInput);
  };

  const currentStep = flowSteps[currentStepIndex] || flowSteps[0];
  const totalStages = flowSteps.length;
  const progressPercent = Math.min(100, Math.round(((currentStepIndex + 1) / totalStages) * 100));

  return (
    <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full px-4 sm:px-6 py-4 animate-fadeIn">
      
      {/* Top Patient & Department Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-white ${
            clinicalDepartment === 'ayush' ? 'bg-amber-700' : 'bg-teal-700'
          }`}>
            {clinicalDepartment === 'ayush' ? <Leaf className="w-5 h-5" /> : <Stethoscope className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-slate-900 text-sm">{activePatient.name}</span>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono font-bold">
                Token #{activePatient.tokenNumber}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                clinicalDepartment === 'ayush' 
                  ? 'bg-amber-50 text-amber-900 border border-amber-200' 
                  : 'bg-teal-50 text-teal-900 border border-teal-200'
              }`}>
                {clinicalDepartment === 'ayush' ? 'AYUSH Kayachikitsa' : 'General Medicine'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Audio Language: <strong className="text-slate-800">{lang.name} ({lang.nativeName})</strong> • Age: {activePatient.age} ({activePatient.gender})
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

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start flex-1 mb-2">
        
        {/* Left Side: Adaptive Dialogue Stream (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-[460px] sm:h-[560px] overflow-hidden">
          
          <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs font-medium text-slate-700">
            <div className="flex items-center space-x-1.5">
              <Bot className="w-4 h-4 text-teal-700" />
              <span className="font-semibold">Step 2: Multimodal Clinical Intake Interview</span>
            </div>
            <span className="text-slate-500 text-[11px] font-medium">Question {currentStepIndex + 1} of {totalStages}</span>
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
                    isAi ? (clinicalDepartment === 'ayush' ? 'bg-amber-800' : 'bg-teal-800') : 'bg-slate-800'
                  }`}>
                    {isAi ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                  </div>

                  <div className={`max-w-[82%] rounded-lg p-3 text-xs sm:text-sm ${
                    isAi 
                      ? 'bg-slate-100 text-slate-900 border border-slate-200 rounded-tl-none' 
                      : 'bg-teal-700 text-white rounded-tr-none shadow-sm'
                  }`}>
                    <div className="flex items-center justify-between text-[11px] mb-1 opacity-80">
                      <span className="font-semibold">{isAi ? (clinicalDepartment === 'ayush' ? 'AYUSH MediKiosk' : 'MediKiosk') : activePatient.name}</span>
                      <span className="ml-2 font-mono">{msg.timestamp}</span>
                    </div>
                    
                    <p className="font-medium leading-relaxed text-xs sm:text-sm">{msg.text}</p>
                    
                    {msg.translation && (
                      <p className={`text-[11px] mt-1 pt-1 border-t italic ${
                        isAi ? 'text-slate-500 border-slate-200' : 'text-teal-100 border-teal-600'
                      }`}>
                        "{msg.translation}"
                      </p>
                    )}

                    {isAi && (
                      <button
                        onClick={() => speakText(msg.text, currentLanguage)}
                        className="mt-1.5 text-[11px] font-semibold text-teal-800 hover:text-teal-950 flex items-center space-x-1"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Replay audio ({lang.name})</span>
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
                  <span>Listening to voice in {lang.name}...</span>
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
                  <span>Transcribing your speech...</span>
                </div>
              </div>
            )}

            <div ref={chatBottomRef} />
          </div>

          {/* Touch Options & Dual-Mode Controls */}
          <div className="p-3 bg-slate-50 border-t border-slate-200 space-y-2.5">
            
            {/* Rapid Touch Choices */}
            {currentStep && currentStep.touchOptions && (
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  Quick Touch Selection (or speak via microphone):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {currentStep.touchOptions.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleTouchOptionSelect(opt)}
                      disabled={isProcessing}
                      className="p-2 text-left rounded-lg bg-white border border-slate-200 hover:border-teal-600 hover:bg-teal-50/50 text-xs font-medium text-slate-800 transition-all flex items-center justify-between group shadow-2xs"
                    >
                      <span className="line-clamp-1">{opt.text}</span>
                      <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-teal-700 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Dual Voice & Navigation Controls */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  const q = currentStep.aiQuestion[currentLanguage in currentStep.aiQuestion ? currentLanguage as keyof typeof currentStep.aiQuestion : 'hi'] || currentStep.aiQuestion.hi;
                  speakText(q, currentLanguage);
                }}
                className="px-3 py-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center space-x-1.5 transition-colors shadow-2xs"
                title="Repeat AI Question Audio"
              >
                <RotateCcw className="w-3.5 h-3.5 text-teal-700" />
                <span className="hidden sm:inline">Repeat</span>
              </button>

              <button
                type="button"
                onClick={handleSimulateSpeechResponse}
                disabled={isListening || isProcessing}
                className={`flex-1 py-2 px-3.5 rounded-lg font-bold text-xs shadow-sm transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                  isListening
                    ? 'bg-red-600 text-white animate-pulse'
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
                    ? 'Transcribing Speech...' 
                    : `Speak in ${lang.name}`}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (currentStepIndex < flowSteps.length - 1) {
                    setCurrentStepIndex(prev => prev + 1);
                  } else {
                    setCurrentScreen('document-scanner');
                  }
                }}
                className="px-3 py-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-medium flex items-center space-x-1 transition-colors"
                title="Skip to next clinical section"
              >
                <SkipForward className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Skip</span>
              </button>

              <button
                type="button"
                onClick={() => triggerRedFlagScreen('Severe acute retrosternal chest pain with left arm radiation (ACS Suspicion)')}
                className="px-3 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold flex items-center space-x-1.5 transition-colors shrink-0"
                title="Trigger Urgent Clinical Safety Demo"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                <span>Demo Red-Flag</span>
              </button>
            </div>

            {/* Quick Text Fallback Form */}
            <form onSubmit={handleManualSubmit} className="flex gap-2 pt-1">
              <div className="relative flex-1">
                <Keyboard className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={manualInput}
                  onChange={(e) => setManualInput(e.target.value)}
                  placeholder={`Or type answer in ${lang.name} / English...`}
                  className="w-full pl-8 pr-2.5 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-teal-700 text-slate-800 bg-white font-medium"
                />
              </div>
              <button
                type="submit"
                className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors shadow-2xs"
              >
                Submit
              </button>
            </form>
          </div>

        </div>

        {/* Right Side: Live Clinical Extraction & SOCRATES Ontology View (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-3">
          
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-200">
            <div className="flex items-center space-x-1.5">
              <FileCheck2 className="w-4 h-4 text-teal-700" />
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                {clinicalDepartment === 'ayush' ? 'AYUSH Intake Summary' : 'Clinical History Summary'}
              </h3>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
              Live Intake
            </span>
          </div>

          <div className="space-y-2 text-xs text-slate-700 max-h-[440px] overflow-y-auto pr-1">
            
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="font-bold uppercase tracking-wider text-slate-500 block mb-0.5 text-[10px]">
                Chief Complaint
              </span>
              <p className="text-xs font-bold text-slate-900">
                {activePatient.clinicalInfo.chiefComplaint || 'Awaiting response...'}
              </p>
            </div>

            {clinicalDepartment === 'ayush' && activePatient.ayushAssessment && (
              <div className="p-2.5 rounded-lg bg-amber-50/50 border border-amber-200 space-y-2">
                <span className="font-bold text-amber-900 text-[11px] block">
                  Ayurvedic Assessment:
                </span>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-1.5 bg-white rounded border border-amber-100">
                    <span className="text-slate-500 font-semibold block text-[10px]">Agni:</span>
                    <span className="font-bold text-amber-800">{activePatient.ayushAssessment.agni} Agni</span>
                  </div>
                  <div className="p-1.5 bg-white rounded border border-amber-100">
                    <span className="text-slate-500 font-semibold block text-[10px]">Koshtha:</span>
                    <span className="font-bold text-amber-800">{activePatient.ayushAssessment.koshtha} Koshtha</span>
                  </div>
                  <div className="p-1.5 bg-white rounded border border-amber-100 col-span-2">
                    <span className="text-slate-500 font-semibold block text-[10px]">Prakriti:</span>
                    <span className="font-bold text-slate-900">{activePatient.ayushAssessment.prakriti}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-bold uppercase tracking-wider text-slate-500 block mb-0.5 text-[10px]">Duration</span>
                <p className="font-semibold text-slate-900">{activePatient.clinicalInfo.duration || '3 days'}</p>
              </div>

              <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-bold uppercase tracking-wider text-slate-500 block mb-0.5 text-[10px]">Severity</span>
                <p className="font-semibold text-amber-800">{activePatient.clinicalInfo.severity || 'Moderate (101.4°F)'}</p>
              </div>
            </div>

            {/* Positive Symptoms */}
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="font-bold uppercase tracking-wider text-slate-500 block mb-1 text-[10px] flex items-center space-x-1">
                <CheckCircle2 className="w-3 h-3 text-teal-700" />
                <span>Reported Symptoms (+)</span>
              </span>
              <div className="flex flex-wrap gap-1">
                {activePatient.clinicalInfo.associatedSymptoms.map((symp, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-teal-50 text-teal-800 font-semibold border border-teal-200 text-[10px]">
                    + {symp}
                  </span>
                ))}
              </div>
            </div>

            {/* Negative Symptoms */}
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="font-bold uppercase tracking-wider text-slate-500 block mb-1 text-[10px] flex items-center space-x-1">
                <XCircle className="w-3 h-3 text-slate-500" />
                <span>Denied Symptoms (✕)</span>
              </span>
              <div className="flex flex-wrap gap-1">
                {(activePatient.clinicalInfo.deniedSymptoms && activePatient.clinicalInfo.deniedSymptoms.length > 0 
                  ? activePatient.clinicalInfo.deniedSymptoms 
                  : ['No chest pain', 'No dyspnea', 'No cough', 'No vomiting']
                ).map((symp, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium border border-slate-200 text-[10px]">
                    ✕ {symp}
                  </span>
                ))}
              </div>
            </div>

            {/* Medications & Allergies */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex items-start space-x-1.5">
                <Pill className="w-3.5 h-3.5 text-indigo-600 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold uppercase tracking-wider text-slate-500 block mb-0.5 text-[10px]">Medications</span>
                  <p className="font-semibold text-slate-900 text-[11px]">{activePatient.clinicalInfo.medicationsTaken.join(', ') || 'None recorded'}</p>
                </div>
              </div>

              <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-bold uppercase tracking-wider text-slate-500 block mb-0.5 text-[10px]">Allergies</span>
                <p className="font-semibold text-slate-700 text-[11px]">{activePatient.clinicalInfo.allergies || 'No known allergies'}</p>
              </div>
            </div>

          </div>

          <button
            onClick={() => setCurrentScreen('document-scanner')}
            className="w-full py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center space-x-2"
          >
            <Camera className="w-4 h-4" />
            <span>Proceed to Step 5: Document Scanner</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>

      </div>

    </div>
  );
};
