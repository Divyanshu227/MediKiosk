 import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Mic, 
  Stethoscope, 
  ArrowRight, 
  ArrowLeft, 
  CheckSquare, 
  Square, 
  Lock,
  Volume2,
  FileSearch,
  Database
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ConsentScreen: React.FC = () => {
  const { setCurrentScreen, navigateBack, speakText, currentLanguage, getLanguageDetails } = useApp();
  const [consentVoice, setConsentVoice] = useState(true);
  const [consentOcr, setConsentOcr] = useState(true);
  const [consentAbha, setConsentAbha] = useState(true);

  const lang = getLanguageDetails();

  const handleReadConsentAudio = () => {
    const consentMessages: Record<string, string> = {
      hi: 'डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम 2023 के तहत, आपकी आवाज और मेडिकल दस्तावेज केवल आज के डॉक्टर परामर्श के लिए सुरक्षित रूप से संसाधित किए जाते हैं।',
      en: 'Under the Digital Personal Data Protection Act 2023, your voice and medical documents are securely processed solely for today\'s clinical consultation.',
      pa: 'ਡਿਜੀਟਲ ਪਰਸਨਲ ਡਾਟਾ ਪ੍ਰੋਟੈਕਸ਼ਨ ਐਕਟ 2023 ਦੇ ਤਹਿਤ, ਤੁਹਾਡੀ ਆਵਾਜ਼ ਅਤੇ ਮੈਡੀਕਲ ਦਸਤਾਵੇਜ਼ ਸਿਰਫ ਅੱਜ ਦੇ ਡਾਕਟਰੀ ਸਲਾਹ-ਮਸ਼ਵਰੇ ਲਈ ਸੁਰੱਖਿਅਤ ਢੰਗ ਨਾਲ ਪ੍ਰੋਸੈਸ ਕੀਤੇ ਜਾਂਦੇ ਹਨ।',
      kn: 'ಡಿಜಿಟಲ್ ವೈಯಕ್ತಿಕ ಡೇಟಾ ಸಂರಕ್ಷಣಾ ಕಾಯಿದೆ 2023 ರ ಅಡಿಯಲ್ಲಿ, ನಿಮ್ಮ ಧ್ವನಿ ಮತ್ತು ವೈದ್ಯಕೀಯ ದಾಖಲೆಗಳನ್ನು ಇಂದಿನ ವೈದ್ಯರ ಸಮಾಲೋಚನೆಗಾಗಿ ಮಾತ್ರ ಸುರಕ್ಷಿತವಾಗಿ ಸಂಸ್ಕರಿಸಲಾಗುತ್ತದೆ.',
      ml: 'ഡിജിറ്റൽ വ്യക്തിഗത ഡാറ്റ സംരക്ഷണ നിയമം 2023 പ്രകാരം, നിങ്ങളുടെ ശബ്ദവും മെഡിക്കൽ രേഖകളും ഇന്നത്തെ ഡോക്ടർ പരിശോധനയ്ക്കായി മാത്രം സുരಕ್ಷಿತമായി പ്രോസസ്സ് ചെയ്യുന്നു.',
      bn: 'ডিজিটাল ব্যক্তিগত ডেটা সুরক্ষা আইন ২০২৩ এর অধীনে, আপনার ভয়েস এবং মেডিকেল নথিগুলি কেবল আজকের ডাক্তার পরামর্শের জন্য নিরাপদে প্রক্রিয়া করা হয়।',
      te: 'డిజిటల్ వ్యక్తిగత డేటా రక్షణ చట్టం 2023 ప్రకారం, మీ వాయిస్ మరియు మెడికల్ రికార్డులు నేటి డాక్టర్ సంప్రదింపుల కోసం మాత్రమే సురಕ್ಷితంగా ప్రాసెస్ చేయబడతాయి.',
      ta: 'டிஜிட்டல் தனிநபர் தரவு பாதுகாப்பு சட்டம் 2023 இன் கீழ், உங்கள் குரல் மற்றும் மருத்துவ ஆவணங்கள் இன்றைய மருத்துவ ஆலோசனைக்காக மட்டுமே பாதுகாப்பாக செயலாக்கப்படுகின்றன.',
      mr: 'डिजिटल वैयक्तिक डेटा संरक्षण कायदा २०२३ अंतर्गत, तुमचा आवाज आणि वैद्यकीय कागदपत्रे केवळ आजच्या डॉक्टरांच्या सल्ल्यासाठी सुरक्षितपणे प्रक्रिया केली जातात.',
      gu: 'ડિજિટલ પર્સનલ ડેટા પ્રોટેક્શન એક્ટ 2023 હેઠળ, તમારો અવાજ અને તબીબી દસ્તાવેજો ફક્ત આજના ડૉક્ટર પરામર્શ માટે સુરક્ષિત રીતે પ્રક્રિયા કરવામાં આવે છે.'
    };
    const consentAudioText = consentMessages[currentLanguage] || consentMessages.hi;
    speakText(consentAudioText, currentLanguage);
  };

  const allAgreed = consentVoice && consentOcr;

  const handleStart = () => {
    if (allAgreed) {
      setCurrentScreen('ai-conversation');
    }
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

        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded">
          Step 3 of 9 • Clinical Consent
        </span>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7 shadow-sm space-y-5">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded bg-teal-50 text-teal-800 text-xs font-medium border border-teal-200 mb-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
              <span>Ethical AI & Clinical Data Governance</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Patient Consent & Intake Authorization
            </h1>
            <p className="mt-0.5 text-xs text-slate-600">
              Clear, transparent agreement before your history is captured.
            </p>
          </div>

          <button
            onClick={handleReadConsentAudio}
            className="px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 font-semibold text-xs border border-teal-200 flex items-center space-x-1.5 transition-colors self-start sm:self-auto shrink-0"
          >
            <Volume2 className="w-3.5 h-3.5 text-teal-700" />
            <span>Listen in {lang.name}</span>
          </button>
        </div>

        {/* 3 Core Trust Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="w-7 h-7 rounded-md bg-teal-100 text-teal-800 flex items-center justify-center">
              <Lock className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-xs font-bold text-slate-900">Why Data is Collected</h3>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Your health history is captured to prepare a structured briefing for the attending doctor before you enter the consultation room.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="w-7 h-7 rounded-md bg-indigo-100 text-indigo-800 flex items-center justify-center">
              <Mic className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-xs font-bold text-slate-900">How AI is Used</h3>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              AI acts solely as a natural speech transcription & history-taking structuring assistant. <strong>The AI does not diagnose.</strong>
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="w-7 h-7 rounded-md bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Stethoscope className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-xs font-bold text-slate-900">Doctor in Control</h3>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Your licensed doctor reviews, edits, and validates every finding, retaining 100% authority for all medical decisions.
            </p>
          </div>

        </div>

        {/* Clear Checkboxes */}
        <div className="space-y-2.5 pt-1">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Please confirm your consent:
          </p>

          {/* 1. Voice & Speech */}
          <div 
            onClick={() => setConsentVoice(!consentVoice)}
            className={`p-3 rounded-lg border transition-all cursor-pointer flex items-start space-x-3 ${
              consentVoice ? 'border-teal-700 bg-teal-50/30' : 'border-slate-200 bg-white'
            }`}
          >
            <div className="shrink-0 mt-0.5 text-teal-700">
              {consentVoice ? <CheckSquare className="w-4 h-4 fill-teal-700 text-white" /> : <Square className="w-4 h-4 text-slate-400" />}
            </div>
            <div>
              <label className="text-xs font-bold text-slate-900 cursor-pointer block">
                1. Voice & Speech Intake (आवाज रूपांतरण)
              </label>
              <p className="text-[11px] text-slate-600">
                Transcribes your statements in {lang.name} to prepare a structured narrative for your doctor.
              </p>
            </div>
          </div>

          {/* 2. Document OCR */}
          <div 
            onClick={() => setConsentOcr(!consentOcr)}
            className={`p-3 rounded-lg border transition-all cursor-pointer flex items-start space-x-3 ${
              consentOcr ? 'border-teal-700 bg-teal-50/30' : 'border-slate-200 bg-white'
            }`}
          >
            <div className="shrink-0 mt-0.5 text-teal-700">
              {consentOcr ? <CheckSquare className="w-4 h-4 fill-teal-700 text-white" /> : <Square className="w-4 h-4 text-slate-400" />}
            </div>
            <div>
              <label className="text-xs font-bold text-slate-900 cursor-pointer block">
                2. Document Digitization (दस्तावेज स्कैनिंग)
              </label>
              <p className="text-[11px] text-slate-600">
                Scans past prescriptions and lab reports to organize them on your timeline.
              </p>
            </div>
          </div>

          {/* 3. Patient Review Right */}
          <div 
            onClick={() => setConsentAbha(!consentAbha)}
            className={`p-3 rounded-lg border transition-all cursor-pointer flex items-start space-x-3 ${
              consentAbha ? 'border-teal-700 bg-teal-50/30' : 'border-slate-200 bg-white'
            }`}
          >
            <div className="shrink-0 mt-0.5 text-teal-700">
              {consentAbha ? <CheckSquare className="w-4 h-4 fill-teal-700 text-white" /> : <Square className="w-4 h-4 text-slate-400" />}
            </div>
            <div>
              <label className="text-xs font-bold text-slate-900 cursor-pointer block">
                3. Review & Verification (समीक्षा का अधिकार)
              </label>
              <p className="text-[11px] text-slate-600">
                You can review and confirm all details before they are transmitted to the consultation room.
              </p>
            </div>
          </div>

        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <span className="text-[11px] text-slate-500 max-w-sm">
            All data processed in accordance with the Digital Personal Data Protection (DPDP) Act 2023.
          </span>

          <div className="flex items-center space-x-2">
            <button
              onClick={navigateBack}
              className="px-4 py-2.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-xs transition-colors"
            >
              Back
            </button>

            <button
              onClick={handleStart}
              disabled={!allAgreed}
              className={`px-6 py-2.5 rounded-lg font-bold text-xs shadow-sm transition-all flex items-center space-x-1.5 ${
                allAgreed 
                  ? 'bg-teal-700 hover:bg-teal-800 text-white cursor-pointer' 
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
              }`}
            >
              <span>Give Consent & Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
