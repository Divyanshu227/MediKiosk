import { Language, Patient } from '../types';

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', greeting: 'नमस्ते', flag: '🇮🇳', samplePrompt: 'मुझे तीन दिन से बुखार है और सिर में दर्द हो रहा है।' },
  { code: 'en', name: 'English', nativeName: 'English', greeting: 'Hello', flag: '🌐', samplePrompt: 'I have had a fever and headache for three days.' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', greeting: 'নমস্কার', flag: '🇮🇳', samplePrompt: 'আমার তিন দিন ধরে জ্বর এবং মাথা ব্যথা করছে।' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', greeting: 'నమస్కారం', flag: '🇮🇳', samplePrompt: 'నాకు మూడు రోజులుగా జ్వరం మరియు తలనొప్పిగా ఉంది.' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', greeting: 'नमस्कार', flag: '🇮🇳', samplePrompt: 'मला तीन दिवसांपासून ताप आणि डोकेदुखी आहे.' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', greeting: 'வணக்கம்', flag: '🇮🇳', samplePrompt: 'எனக்கு மூன்று நாட்களாக காய்ச்சலும் தலைவலியும் உள்ளது.' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', greeting: 'નમસ્તે', flag: '🇮🇳', samplePrompt: 'મને ત્રણ દિવસથી તાવ અને માથાનો દુખાવો છે.' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', greeting: 'ನಮಸ್ಕಾರ', flag: '🇮🇳', samplePrompt: 'ನನಗೆ ಮೂರು ದಿನಗಳಿಂದ ಜ್ವರ ಮತ್ತು ತಲೆನೋವು ಇದೆ.' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', greeting: 'നമസ്കാരം', flag: '🇮🇳', samplePrompt: 'എനിക്ക് മൂന്ന് ദിവസമായി പനിയും തലവേദനയും ഉണ്ട്.' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', greeting: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ', flag: '🇮🇳', samplePrompt: 'ਮੈਨੂੰ ਤਿੰਨ ਦਿਨਾਂ ਤੋਂ ਬੁਖਾਰ ਅਤੇ ਸਿਰਦਰਦ ਹੈ।' },
];

export const INITIAL_PATIENTS: Patient[] = [
  {
    id: 'P-1024',
    name: 'Rajesh Kumar',
    age: 54,
    gender: 'Male',
    language: 'hi',
    languageName: 'Hindi (हिन्दी)',
    chiefComplaint: 'Fever and headache',
    status: 'Complete',
    priority: 'Normal',
    time: '09:45 AM',
    lastVisit: '18 Aug 2026',
    intakeTimestamp: 'Today, 09:45 AM',
    doctorReviewed: false,
    clinicalInfo: {
      chiefComplaint: 'Fever and headache',
      duration: '3 days',
      severity: 'Moderate (Temperature ~101°F)',
      temperature: '101.2°F',
      associatedSymptoms: ['Headache (frontal)', 'Mild body fatigue'],
      deniedSymptoms: ['Cough', 'Chest pain', 'Breathing difficulty', 'Vomiting', 'Loose motions'],
      medicationsTaken: ['Paracetamol 650mg (1 tablet taken yesterday night)'],
      allergies: 'Not reported / No known drug allergies',
      existingConditions: ['Hypertension (managed with Amlodipine 5mg)'],
      notes: 'Patient feels hot to touch. Appears alert and oriented. Symptoms started after mild exhaustion.'
    },
    conversation: [
      {
        id: 'msg-1',
        sender: 'ai',
        text: 'नमस्ते राजेश जी। मेडीकियोस्क में आपका स्वागत है। कृपया बताएं कि आज आपको क्या परेशानी महसूस हो रही है?',
        translation: 'Hello Rajesh ji. Welcome to Medikiosk. Please tell us what problem you are experiencing today?',
        timestamp: '09:41 AM'
      },
      {
        id: 'msg-2',
        sender: 'patient',
        text: 'मुझे पिछले तीन दिन से तेज बुखार है और सिर में काफी भारीपन और दर्द हो रहा है।',
        translation: 'I have had a high fever for the last three days and a heavy headache.',
        timestamp: '09:41 AM'
      },
      {
        id: 'msg-3',
        sender: 'ai',
        text: 'आपको बुखार कितने दिनों से है और क्या आपने थर्मामीटर से तापमान मापा है?',
        translation: 'How many days have you had the fever and have you measured temperature with a thermometer?',
        timestamp: '09:42 AM'
      },
      {
        id: 'msg-4',
        sender: 'patient',
        text: 'हाँ, लगभग तीन दिन पहले शुरू हुआ था। कल रात नापा तो करीब 101 डिग्री था।',
        translation: 'Yes, it started about three days ago. When measured last night, it was around 101 degrees.',
        timestamp: '09:42 AM'
      },
      {
        id: 'msg-5',
        sender: 'ai',
        text: 'क्या आपको खांसी, सांस लेने में तकलीफ, सीने में दर्द, या उल्टी/दस्त जैसी कोई समस्या भी है?',
        translation: 'Are you also experiencing cough, breathing difficulty, chest pain, or vomiting/loose motions?',
        timestamp: '09:43 AM'
      },
      {
        id: 'msg-6',
        sender: 'patient',
        text: 'नहीं, इनमें से कुछ भी नहीं है। बस सिरदर्द और हल्की कमजोरी है।',
        translation: 'No, none of these. Just headache and mild weakness.',
        timestamp: '09:43 AM'
      },
      {
        id: 'msg-7',
        sender: 'ai',
        text: 'क्या आपने इस बुखार के लिए कोई दवा ली है? और क्या आपको किसी दवा से एलर्जी है?',
        translation: 'Have you taken any medicine for this fever? And do you have any allergies?',
        timestamp: '09:44 AM'
      },
      {
        id: 'msg-8',
        sender: 'patient',
        text: 'मैंने कल रात एक पैरासिटामोल ली थी। किसी दवा से एलर्जी नहीं है।',
        translation: 'I took one paracetamol last night. No drug allergies.',
        timestamp: '09:44 AM'
      },
      {
        id: 'msg-9',
        sender: 'ai',
        text: 'धन्यवाद राजेश जी। मैंने आपकी पूरी जानकारी व्यवस्थित कर ली है और डॉक्टर साहब के लिए समरी तैयार कर दी है।',
        translation: 'Thank you Rajesh ji. I have organized your complete information and prepared the clinical summary for the doctor.',
        timestamp: '09:45 AM'
      }
    ]
  },
  {
    id: 'P-1048',
    name: 'Sunita Devi',
    age: 67,
    gender: 'Female',
    language: 'hi',
    languageName: 'Hindi (हिन्दी)',
    chiefComplaint: 'Bilateral knee joint pain',
    status: 'Complete',
    priority: 'Normal',
    time: '09:20 AM',
    lastVisit: '04 Jul 2026',
    intakeTimestamp: 'Today, 09:20 AM',
    doctorReviewed: false,
    clinicalInfo: {
      chiefComplaint: 'Bilateral knee joint pain & stiffness',
      duration: '3 weeks (worsened over past 4 days)',
      severity: 'Severe on standing or climbing stairs (VAS 7/10)',
      associatedSymptoms: ['Morning stiffness (~30 mins)', 'Mild swelling in right knee'],
      deniedSymptoms: ['Fever', 'Trauma/fall', 'Numbness in toes', 'Skin redness'],
      medicationsTaken: ['Calcium supplement daily', 'Ayurvedic joint oil (local application)'],
      allergies: 'No known allergies',
      existingConditions: ['Known Osteoarthritis (diagnosed 2024)', 'Type 2 Diabetes'],
      notes: 'Requires support to stand up. Walking with a mild limp. No recent falls reported.'
    },
    conversation: [
      {
        id: 'msg-1',
        sender: 'ai',
        text: 'नमस्ते सुनीता जी। कृपया अपनी तकलीफ के बारे में बताएं।',
        translation: 'Hello Sunita ji. Please tell us about your discomfort.',
        timestamp: '09:15 AM'
      },
      {
        id: 'msg-2',
        sender: 'patient',
        text: 'मेरे दोनों घुटनों में बहुत दर्द रहता है, खासकर सीधे पैर में। चलने-फिरने में बड़ी तकलीफ होती है।',
        translation: 'I have severe pain in both knees, especially right leg. Finding it very difficult to walk.',
        timestamp: '09:16 AM'
      },
      {
        id: 'msg-3',
        sender: 'ai',
        text: 'यह दर्द कब से बढ़ गया है और क्या सुबह उठने पर जकड़न होती है?',
        translation: 'How long has this pain worsened and do you have stiffness upon waking?',
        timestamp: '09:17 AM'
      },
      {
        id: 'msg-4',
        sender: 'patient',
        text: 'लगभग तीन हफ्तों से है, पिछले चार दिनों में ज्यादा बढ़ गया है। सुबह उठने पर आधा घंटा अकड़न रहती है।',
        translation: 'For about three weeks, worsened in the last 4 days. Morning stiffness lasts about half an hour.',
        timestamp: '09:18 AM'
      }
    ]
  },
  {
    id: 'P-1082',
    name: 'Arjun Patel',
    age: 31,
    gender: 'Male',
    language: 'gu',
    languageName: 'Gujarati (ગુજરાતી)',
    chiefComplaint: 'Abdominal pain (right lower quadrant)',
    status: 'In Progress',
    priority: 'Normal',
    time: '10:02 AM',
    lastVisit: 'First Visit',
    intakeTimestamp: 'Today, 10:02 AM',
    doctorReviewed: false,
    clinicalInfo: {
      chiefComplaint: 'Abdominal pain (Right lower quadrant)',
      duration: '8 hours',
      severity: 'Sharp, cramping (VAS 6/10)',
      associatedSymptoms: ['Mild nausea', 'Loss of appetite'],
      deniedSymptoms: ['High fever', 'Vomiting', 'Diarrhea', 'Hematuria'],
      medicationsTaken: ['Antacid sachet (Eno) — no relief'],
      allergies: 'Allergic to Sulfa drugs',
      existingConditions: ['None reported'],
      notes: 'Pain started around navel and shifted to right lower abdomen.'
    },
    conversation: [
      {
        id: 'msg-1',
        sender: 'ai',
        text: 'નમસ્તે અર્જુનભાઈ. તમને પેટમાં ક્યાં દુખાવો થાય છે?',
        translation: 'Hello Arjunbhai. Where in your abdomen are you feeling pain?',
        timestamp: '10:00 AM'
      },
      {
        id: 'msg-2',
        sender: 'patient',
        text: 'સવારથી પેટની જમણી બાજુ નીચે ખૂબ જ દુખાવો થાય છે અને ઉબકા આવે છે.',
        translation: 'Since morning having sharp pain in right lower abdomen and feeling nauseated.',
        timestamp: '10:01 AM'
      }
    ]
  },
  {
    id: 'P-1091',
    name: 'Meena Rao',
    age: 45,
    gender: 'Female',
    language: 'te',
    languageName: 'Telugu (తెలుగు)',
    chiefComplaint: 'Persistent dry cough and throat irritation',
    status: 'Complete',
    priority: 'Needs Review',
    time: '08:50 AM',
    lastVisit: '12 Jan 2026',
    intakeTimestamp: 'Today, 08:50 AM',
    doctorReviewed: false,
    clinicalInfo: {
      chiefComplaint: 'Dry irritating cough',
      duration: '5 days',
      severity: 'Moderate, worse at night',
      associatedSymptoms: ['Throat irritation', 'Mild nocturnal wheezing'],
      deniedSymptoms: ['High fever', 'Hemoptysis (blood in sputum)', 'Chest tightness'],
      medicationsTaken: ['Cough lozenges', 'Asthalin inhaler SOS'],
      allergies: 'Dust and pollen allergy',
      existingConditions: ['Mild bronchial asthma'],
      notes: 'Known asthmatic patient. Cough is dry with nighttime sleep disruption.'
    },
    conversation: [
      {
        id: 'msg-1',
        sender: 'ai',
        text: 'నమస్కారం మీనా గారు. మీకు ఎప్పటి నుంచి దగ్గు ఉంది?',
        translation: 'Hello Meena garu. Since when do you have this cough?',
        timestamp: '08:45 AM'
      },
      {
        id: 'msg-2',
        sender: 'patient',
        text: 'ఐదు రోజుల నుంచి పొడి దగ్గు వస్తోంది. రాత్రి వేళలో నిద్ర పట్టడం లేదు.',
        translation: 'Having dry cough since 5 days. Unable to sleep during nighttime.',
        timestamp: '08:46 AM'
      }
    ]
  },
  {
    id: 'P-1103',
    name: 'Amit Singh',
    age: 40,
    gender: 'Male',
    language: 'pa',
    languageName: 'Punjabi (ਪੰਜਾਬੀ)',
    chiefComplaint: 'Lower back ache radiating to left hip',
    status: 'Complete',
    priority: 'Normal',
    time: '08:15 AM',
    lastVisit: '22 May 2026',
    intakeTimestamp: 'Today, 08:15 AM',
    doctorReviewed: true,
    clinicalInfo: {
      chiefComplaint: 'Lower lumbar back pain',
      duration: '2 weeks',
      severity: 'Dull ache, aggravated by prolonged sitting',
      associatedSymptoms: ['Mild stiffness in morning'],
      deniedSymptoms: ['Numbness in foot', 'Loss of bladder control', 'Fever'],
      medicationsTaken: ['Ibuprofen 400mg as needed'],
      allergies: 'None reported',
      existingConditions: ['Sedentary occupation (Driver)'],
      notes: 'No red flags detected. Straight leg raise test to be performed by clinician.'
    },
    conversation: [
      {
        id: 'msg-1',
        sender: 'ai',
        text: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਅਮਿਤ ਜੀ। ਤੁਹਾਡੀ ਪਿੱਠ ਵਿੱਚ ਦਰਦ ਕਦੋਂ ਤੋਂ ਹੈ?',
        translation: 'Sat Sri Akal Amit ji. Since when do you have back pain?',
        timestamp: '08:10 AM'
      },
      {
        id: 'msg-2',
        sender: 'patient',
        text: 'ਦੋ ਹਫਤੇ ਹੋ ਗਏ ਜੀ, ਲੰਬਾ ਸਮਾਂ ਬੈਠਣ ਤੇ ਲੱਕ ਦੇ ਹੇਠਲੇ ਹਿੱਸੇ ਵਿੱਚ ਦਰਦ ਰਹਿੰਦਾ ਹੈ।',
        translation: 'It has been two weeks, pain in lower back after sitting for long periods.',
        timestamp: '08:12 AM'
      }
    ]
  }
];

export const DEMO_FLOW_STEPS = [
  {
    stage: 1,
    title: 'Chief Complaint',
    aiQuestion: {
      hi: 'नमस्ते राजेश जी! आपको आज किस समस्या के लिए मदद चाहिए?',
      en: 'Hello Rajesh ji! What symptoms or issue are you experiencing today?',
      bn: 'নমস্কার রাজেশ বাবু! আজ আপনার কী সমস্যা হচ্ছে?',
      te: 'నమస్కారం రాజేష్ గారు! ఈరోజు మీకు ఎలాంటి సమస్య ఉంది?',
      mr: 'नमस्कार राजेश जी! आज तुम्हाला काय त्रास होत आहे?',
      gu: 'નમસ્તે રાજેશભાઈ! તમને આજે શું તકલીફ છે?',
      ta: 'வணக்கம் ராஜேஷ் அவர்களே! இன்று உங்களுக்கு என்ன பிரச்சனை?',
      kn: 'ನಮಸ್ಕಾರ ರಾಜೇಶ್ ಅವರೇ! ಇಂದು ನಿಮಗೆ ಏನು ತೊಂದರೆಯಾಗಿದೆ?',
      ml: 'നമസ്കാരം രാജേഷ് ജി! ഇന്ന് നിങ്ങൾക്ക് എന്താണ് അസ്വസ്ഥത?',
      pa: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਰਾਜੇਸ਼ ਜੀ! ਅੱਜ ਤੁਹਾਨੂੰ ਕੀ ਤਕਲੀਫ ਹੈ?'
    },
    defaultPatientResponse: {
      hi: 'मुझे तीन दिन से बुखार है और सिर में दर्द हो रहा है।',
      en: 'I have had a fever and headache for three days.',
      bn: 'আমার তিন দিন ধরে জ্বর এবং মাথা ব্যথা করছে।',
      te: 'నాకు మూడు రోజులుగా జ్వరం మరియు తలనొప్పిగా ఉంది.',
      mr: 'मला तीन दिवसांपासून ताप आणि डोकेदुखी आहे.',
      gu: 'મને ત્રણ દિવસથી તાવ અને માથાનો દુખાવો છે.',
      ta: 'எனக்கு மூன்று நாட்களாக காய்ச்சலும் தலைவலியும் உள்ளது.',
      kn: 'ನನಗೆ ಮೂರು ದಿನಗಳಿಂದ ಜ್ವರ ಮತ್ತು ತಲೆನೋವು ಇದೆ.',
      ml: 'എനിക്ക് മൂന്ന് ദിവസമായി പനിയും തലവേദനയും ഉണ്ട്.',
      pa: 'ਮੈਨੂੰ ਤਿੰਨ ਦਿਨਾਂ ਤੋਂ ਬੁਖਾਰ ਅਤੇ ਸਿਰਦਰਦ ਹੈ।'
    },
    translation: 'I have had fever and a headache for three days.',
    clinicalExtraction: { chiefComplaint: 'Fever and headache', duration: '3 days' }
  },
  {
    stage: 2,
    title: 'Duration & Onset',
    aiQuestion: {
      hi: 'आपको बुखार कब से है और क्या यह लगातार बना हुआ है या उतरता-चढ़ता है?',
      en: 'How long have you had the fever and does it stay continuous or come and go?',
      bn: 'আপনার জ্বর কতদিন ধরে এবং এটা কি একটানা থাকে না ওঠানামা করে?',
      te: 'మీకు జ్వరం ఎప్పటి నుండి ఉంది, అది స్థిరంగా ఉంటుందా లేదా తగ్గి పెరుగుతుందా?',
      mr: 'तुम्हाला ताप कधीपासून आहे आणि तो सतत राहतो की कमी-जास्त होतो?',
      gu: 'તમને તાવ ક્યારથી છે અને શું તે સતત રહે છે કે ઉતરે-ચઢે છે?',
      ta: 'உங்களுக்கு காய்ச்சல் எத்தனை நாட்களாக உள்ளது, தொடர்ந்து இருக்கிறதா?',
      kn: 'ನಿಮಗೆ ಜ್ವರ ಯಾವಾಗ ಪ್ರಾರಂಭವಾಯಿತು ಮತ್ತು ಸತತವಾಗಿ ಇರುತ್ತದೆಯೇ?',
      ml: 'നിങ്ങൾക്ക് പനി എത്ര ദിവസമായി ഉണ്ട്, അത് തുടർച്ചയായിട്ടാണോ?',
      pa: 'ਤੁਹਾਨੂੰ ਬੁਖਾਰ ਕਦੋਂ ਤੋਂ ਹੈ ਅਤੇ ਇਹ ਲਗਾਤਾਰ ਹੈ ਜਾਂ ਚੜ੍ਹਦਾ-ਉਤਰਦਾ ਹੈ?'
    },
    defaultPatientResponse: {
      hi: 'लगभग तीन दिन से है, रात में थोड़ा ज्यादा बढ़ जाता है।',
      en: 'For about three days, it gets a bit higher at night.',
      bn: 'প্রায় তিন দিন ধরে, রাতের দিকে একটু বেড়ে যায়।',
      te: 'సుమారు మూడు రోజుల నుండి, రాత్రిపూట కొంచెం ఎక్కువవుతుంది.',
      mr: 'सुमारे तीन दिवसांपासून आहे, रात्री थोडा जास्त वाढतो.',
      gu: 'આશરે ત્રણ દિવસથી છે, રાત્રે થોડો વધી જાય છે.',
      ta: 'சுமார் மூன்று நாட்களாக, இரவில் சற்று அதிகமாகிறது.',
      kn: 'ಸುಮಾರು ಮೂರು ದಿನಗಳಿಂದ, ರಾತ್ರಿ ವೇಳೆ ಸ್ವಲ್ಪ ಹೆಚ್ಚಾಗುತ್ತದೆ.',
      ml: 'ഏകദേശം മൂന്ന് ദിവസമായി, രാത്രിയിൽ കുറച്ചുകൂടി കൂടുന്നുണ്ട്.',
      pa: 'ਲਗਭਗ ਤਿੰਨ ਦਿਨਾਂ ਤੋਂ ਹੈ, ਰਾਤ ਵੇਲੇ ਥੋੜ੍ਹਾ ਵੱਧ ਜਾਂਦਾ ਹੈ।'
    },
    translation: 'For about three days, it increases slightly at night.',
    clinicalExtraction: { duration: '3 days (nocturnal elevation)' }
  },
  {
    stage: 3,
    title: 'Severity & Temperature',
    aiQuestion: {
      hi: 'क्या आपने थर्मामीटर से अपना तापमान मापा है? कितना था?',
      en: 'Have you measured your temperature with a thermometer? How much was it?',
      bn: 'আপনি কি থার্মোমিটার দিয়ে তাপমাত্রা মেপেছেন? কত ছিল?',
      te: 'మీరు థర్మామీటర్‌తో ఉష్ణోగ్రత కొలిచారా? ఎంత ఉంది?',
      mr: 'तुम्ही थर्मामीटरने तापमान मोजले आहे का? किती होते?',
      gu: 'શું તમે થર્મોમીટરથી તાપમાન માપ્યું છે? કેટલું હતું?',
      ta: 'நீங்கள் தெர்மோமீட்டரில் காய்ச்சல் அளவை பார்த்தீர்களா? எவ்வளவு இருந்தது?',
      kn: 'ನೀವು ಥರ್ಮಾಮೀಟರ್‌ನಿಂದ ತಾಪಮಾನ ಅಳೆದಿದ್ದೀರಾ? ಎಷ್ಟಿತ್ತು?',
      ml: 'നിങ്ങൾ തെർമോമീറ്റർ ഉപയോഗിച്ച് താപനില അളന്നോ? എത്രയായിരുന്നു?',
      pa: 'ਕੀ ਤੁਸੀਂ ਥਰਮਾਮੀਟਰ ਨਾਲ ਤਾਪਮਾਨ ਮਾਪਿਆ ਸੀ? ਕਿੰਨਾ ਸੀ?'
    },
    defaultPatientResponse: {
      hi: 'हाँ, कल रात नापा था तो लगभग 101 डिग्री फारेनहाइट था।',
      en: 'Yes, measured last night, it was around 101°F.',
      bn: 'হ্যাঁ, কাল রাতে মেপেছিলাম, প্রায় ১০১ ডিগ্রি ছিল।',
      te: 'అవును, నిన్న రాత్రి కొలిస్తే దాదాపు 101°F ఉంది.',
      mr: 'होय, काल रात्री मोजले तेव्हा सुमारे 101°F होते.',
      gu: 'હા, ગઈકાલે રાત્રે માપ્યું ત્યારે લગભગ 101°F હતું.',
      ta: 'ஆம், நேற்று இரவு அளந்தபோது சுமார் 101°F இருந்தது.',
      kn: 'ಹೌದು, ನಿನ್ನೆ ರಾತ್ರಿ ಅಳೆದಾಗ ಸುಮಾರು 101°F ಇತ್ತು.',
      ml: 'അതെ, ഇന്നലെ രാത്രി അളന്നപ്പോൾ ഏകദേശം 101°F ഉണ്ടായിരുന്നു.',
      pa: 'ਹਾਂਜੀ, ਕੱਲ੍ਹ ਰਾਤ ਮਾਪਿਆ ਸੀ ਤਾਂ ਲਗਭਗ 101°F ਸੀ।'
    },
    translation: 'Yes, measured last night, it was around 101°F.',
    clinicalExtraction: { temperature: '101.0°F (Moderate)', severity: 'Moderate' }
  },
  {
    stage: 4,
    title: 'Associated & Negative Symptoms',
    aiQuestion: {
      hi: 'क्या आपको खांसी, सांस लेने में परेशानी, सीने में दर्द या उल्टी हो रही है?',
      en: 'Are you experiencing cough, breathing difficulty, chest pain, or vomiting?',
      bn: 'আপনার কি কাশি, শ্বাসকষ্ট, বুকে ব্যথা বা বমি হচ্ছে?',
      te: 'మీకు దగ్గు, శ్వాస తీసుకోవడంలో ఇబ్బంది, ఛాతీ నొప్పి లేదా వాంతులు ఉన్నాయా?',
      mr: 'तुम्हाला खोकला, श्वास घेण्यास त्रास, छातीत दुखणे किंवा उलट्या होत आहेत का?',
      gu: 'શું તમને ખાંસી, શ્વાસ લેવામાં તકલીફ, છાતીમાં દુખાવો કે ઉલટી થાય છે?',
      ta: 'உங்களுக்கு இருமல், மூச்சுத் திணறல், நெஞ்சு வலி அல்லது வாந்தி உள்ளதா?',
      kn: 'ನಿಮಗೆ ಕೆಮ್ಮು, ಉಸಿರಾಟದ ತೊಂದರೆ, ಎದೆನೋವು ಅಥವಾ ವಾಂತಿ ಇದೆಯೇ?',
      ml: 'നിങ്ങൾക്ക് ചുമയോ ശ്വാസതടസ്സമോ നെഞ്ചുവേദനയോ ഛർദ്ദിയോ ഉണ്ടോ?',
      pa: 'ਕੀ ਤੁਹਾਨੂੰ ਖੰਘ, ਸਾਹ ਲੈਣ ਵਿੱਚ ਤਕਲੀਫ, ਛਾਤੀ ਵਿੱਚ ਦਰਦ ਜਾਂ ਉਲਟੀ ਆ ਰਹੀ ਹੈ?'
    },
    defaultPatientResponse: {
      hi: 'नहीं, इनमें से कुछ नहीं है। बस सिर भारी है और बदन में हल्का दर्द है।',
      en: 'No, none of these. Just heavy head and mild body ache.',
      bn: 'না, এগুলোর কিছু নেই। শুধু মাথা ভারী আর হালকা শরীর ব্যথা।',
      te: 'లేదు, వీటిలో ఏమీ లేవు. కేవలం తలనొప్పి, ఒళ్లు నొప్పులు మాత్రమే ఉన్నాయి.',
      mr: 'नाही, यापैकी काहीही नाही. फक्त डोके जड आहे आणि थोडे अंगदुखी आहे.',
      gu: 'ના, આમાંથી કંઈ નથી. બસ માથું ભારે છે અને થોડો શરીરનો દુખાવો છે.',
      ta: 'இல்லை, இவற்றில் எதுவும் இல்லை. தலைபாரம் மற்றும் உடம்பு வலி மட்டுமே.',
      kn: 'ಇಲ್ಲ, ಇವುಗಳಲ್ಲಿ ಯಾವುದೂ ಇಲ್ಲ. ಕೇವಲ ತಲೆ ಭಾರ ಮತ್ತು ಮೈ ಕೈ ನೋವು.',
      ml: 'ഇല്ല, ഇതൊന്നുമില്ല. തലവേദനയും ചെറിയ ശരീരവേദനയും മാത്രം.',
      pa: 'ਨਹੀਂ ਜੀ, ਇਹਨਾਂ ਵਿੱਚੋਂ ਕੁਝ ਨਹੀਂ। ਬਸ ਸਿਰ ਭਾਰੀ ਹੈ ਅਤੇ ਹਲਕਾ ਸਰੀਰ ਦਰਦ ਹੈ।'
    },
    translation: 'No, none of these. Just headache and mild body fatigue.',
    clinicalExtraction: { 
      associatedSymptoms: ['Headache (frontal)', 'Mild body ache'],
      deniedSymptoms: ['Cough', 'Chest pain', 'Breathing difficulty', 'Vomiting'] 
    }
  },
  {
    stage: 5,
    title: 'Medications Taken',
    aiQuestion: {
      hi: 'क्या आपने इस परेशानी के लिए कोई दवा या घरेलू उपचार लिया है?',
      en: 'Have you taken any medication or remedy for this problem?',
      bn: 'আপনি কি এই সমস্যার জন্য কোনো ওষুধ খেয়েছেন?',
      te: 'మీరు ఈ సమస్య కోసం ఏదైనా మందులు తీసుకున్నారా?',
      mr: 'तुम्ही या त्रासासाठी कोणते औषध घेतले आहे का?',
      gu: 'શું તમે આ તકલીફ માટે કોઈ દવા લીધી છે?',
      ta: 'இந்த பிரச்சனைக்கு நீங்கள் ஏதேனும் மருந்து உட்கொண்டீர்களா?',
      kn: 'ಈ ಸಮಸ್ಯೆಗೆ ನೀವು ಯಾವುದಾದರೂ ಮಾತ್ರೆ ತೆಗೆದುಕೊಂಡಿದ್ದೀರಾ?',
      ml: 'ഈ അസുഖത്തിന് നിങ്ങൾ എന്തെങ്കിലും മരുന്ന് കഴിച്ചിരുന്നോ?',
      pa: 'ਕੀ ਤੁਸੀਂ ਇਸ ਤਕਲੀਫ ਲਈ ਕੋਈ ਦਵਾਈ ਲਈ ਹੈ?'
    },
    defaultPatientResponse: {
      hi: 'हाँ, मैंने कल रात एक पैरासिटामोल 650mg ली थी, जिससे थोड़ा आराम मिला था।',
      en: 'Yes, I took one Paracetamol 650mg last night which gave temporary relief.',
      bn: 'হ্যাঁ, কাল রাতে একটা প্যারাসিটামল খেয়েছিলাম, একটু আরাম হয়েছিল।',
      te: 'అవును, నిన్న రాత్రి ఒక పారాసిటమాల్ తీసుకున్నాను, కొద్దిగా ఉపశమనం కలిగింది.',
      mr: 'होय, काल रात्री मी एक पॅरासिटामॉल घेतली होती, थोडा आराम मिळाला.',
      gu: 'હા, ગઈકાલે રાત્રે પેરાસિટામોલ લીધી હતી, થોડો આરામ થયો હતો.',
      ta: 'ஆம், நேற்று இரவு பாராசிட்டமால் மாத்திரை சாப்பிட்டேன், சற்று நிம்மதியாக இருந்தது.',
      kn: 'ಹೌದು, ನಿನ್ನೆ ರಾತ್ರಿ ಪ್ಯಾರಾಸಿಟಮಾಲ್ ತೆಗೆದುಕೊಂಡೆ, ಸ್ವಲ್ಪ ಉಪಶಮನವಾಯಿತು.',
      ml: 'അതെ, ഇന്നലെ രാത്രി പാരസെറ്റമോൾ കഴിച്ചു, കുറച്ച് ആശ്വാസം തോന്നി.',
      pa: 'ਹਾਂਜੀ, ਕੱਲ੍ਹ ਰਾਤ ਇੱਕ ਪੈਰਾਸੀਟਾਮੋਲ ਲਈ ਸੀ, ਥੋੜ੍ਹਾ ਆਰਾਮ ਮਿਲਿਆ ਸੀ।'
    },
    translation: 'Yes, took Paracetamol 650mg last night with temporary relief.',
    clinicalExtraction: { medicationsTaken: ['Paracetamol 650mg'] }
  },
  {
    stage: 6,
    title: 'Allergies & History',
    aiQuestion: {
      hi: 'क्या आपको किसी दवा या खाने से कोई एलर्जी है? और क्या आप बीपी/शुगर की दवा लेते हैं?',
      en: 'Do you have any known allergies to medicines? Do you take medications for BP/Diabetes?',
      bn: 'আপনার কি কোনো ওষুধে অ্যালার্জি আছে? প্রেসার বা সুগারের ওষুধ খান?',
      te: 'మీకు ఏదైనా మందుల వల్ల అలర్జీ ఉందా? బీపీ లేదా షుగర్ మందులు వాడుతున్నారా?',
      mr: 'तुम्हाला कोणत्याही औषधाची ॲलर्जी आहे का? बीपी/शुगरचे औषध घेता का?',
      gu: 'શું તમને કોઈ દવાની એલર્જી છે? બીપી કે ડાયાબિટીસની દવા લો છો?',
      ta: 'உங்களுக்கு மருந்து அலர்ஜி ஏதேனும் உள்ளதா? பிபி/சர்க்கரை மாத்திரை சாப்பிடுகிறீர்களா?',
      kn: 'ನಿಮಗೆ ಯಾವುದಾದರೂ ಮಾತ್ರೆ ಅಲರ್ಜಿ ಇದೆಯೇ? ಬಿಪಿ ಅಥವಾ ಶುಗರ್ ಔಷಧಿ ತೆಗೆದುಕೊಳ್ಳುತ್ತಿದ್ದೀರಾ?',
      ml: 'മരുന്നുകളോട് അലർജി ഉണ്ടോ? പ്രഷർ അല്ലെങ്കിൽ പ്രമേഹത്തിന് മരുന്ന് കഴിക്കുന്നുണ്ടോ?',
      pa: 'ਕੀ ਤੁਹਾਨੂੰ ਕਿਸੇ ਦਵਾਈ ਤੋਂ ਐਲਰਜੀ ਹੈ? ਬੀਪੀ ਜਾਂ ਸ਼ੂਗਰ ਦੀ ਦਵਾਈ ਲੈਂਦੇ ਹੋ?'
    },
    defaultPatientResponse: {
      hi: 'एलर्जी कोई नहीं है। मैं ब्लड प्रेशर के लिए एमलोडिपिन लेता हूँ।',
      en: 'No allergies. I take Amlodipine for high blood pressure.',
      bn: 'অ্যালার্জি নেই। প্রেশারের জন্য অ্যামলোডিপিন খাই।',
      te: 'అలర్జీ ఏమీ లేదు. బీపీ కోసం ఆమ్లోడిపైన్ వాడుతున్నాను.',
      mr: 'ॲलर्जी काही नाही. रक्तदाबासाठी ॲम्लोडिपिन घेतो.',
      gu: 'કોઈ એલર્જી નથી. બીપી માટે એમ્લોડિપિન લઉં છું.',
      ta: 'அலர்ஜி ஏதும் இல்லை. பிபிக்கு ஆம்லோடிபின் மாத்திரை சாப்பிடுகிறேன்.',
      kn: 'ಅಲರ್ಜಿ ಇಲ್ಲ. ಬಿಪಿಗೆ ಆಮ್ಲೋಡಿಪಿನ್ ತೆಗೆದುಕೊಳ್ಳುತ್ತೇನೆ.',
      ml: 'അലർജി ഒന്നുമില്ല. പ്രഷറിന് ആംലോഡിപിൻ കഴിക്കുന്നുണ്ട്.',
      pa: 'ਕੋਈ ਐਲਰਜੀ ਨਹੀਂ ਹੈ ਜੀ। ਬੀਪੀ ਲਈ ਐਮਲੋਡੀਪੀਨ ਲੈਂਦਾ ਹਾਂ।'
    },
    translation: 'No known allergies. Takes Amlodipine for hypertension.',
    clinicalExtraction: { 
      allergies: 'Not reported / No known drug allergies',
      existingConditions: ['Hypertension (on Amlodipine)'] 
    }
  },
  {
    stage: 7,
    title: 'Final Clarifications',
    aiQuestion: {
      hi: 'क्या कोई और जरूरी बात है जो आप डॉक्टर साहब को बताना चाहते हैं?',
      en: 'Is there anything else important you would like to share with the doctor?',
      bn: 'ডাক্তারবাবুকে জানানোর মতো আর কোনো প্রয়োজনীয় কথা আছে কি?',
      te: 'డాక్టర్ గారికి తెలియజేయడానికి ఇంకేమైనా ముఖ్యమైన విషయం ఉందా?',
      mr: 'डॉक्टरांना सांगण्यासारखी आणखी काही महत्त्वाची गोष्ट आहे का?',
      gu: 'ડોક્ટર સાહેબને જણાવવા જેવી બીજી કોઈ મહત્વની વાત છે?',
      ta: 'மருத்துவரிடம் தெரிவிக்க வேண்டிய வேறு ஏதேனும் விஷயம் உள்ளதா?',
      kn: 'ವೈದ್ಯರಿಗೆ ತಿಳಿಸಲು ಬೇರೆ ಯಾವುದಾದರೂ ಮುಖ್ಯ ವಿಷಯವಿದೆಯೇ?',
      ml: 'ഡോക്ടറോട് പറയാൻ വേറെ എന്തെങ്കിലും പ്രധാന കാര്യങ്ങൾ ഉണ്ടോ?',
      pa: 'ਕੀ ਕੋਈ ਹੋਰ ਜ਼ਰੂਰੀ ਗੱਲ ਹੈ ਜੋ ਤੁਸੀਂ ਡਾਕਟਰ ਸਾਹਿਬ ਨੂੰ ਦੱਸਣਾ ਚਾਹੁੰਦੇ ਹੋ?'
    },
    defaultPatientResponse: {
      hi: 'बस यही सब है। मुझे उम्मीद है कि डॉक्टर साहब देखकर जल्दी ठीक कर देंगे।',
      en: 'That is all. I hope the doctor can review this soon.',
      bn: 'এটুকুই। আশা করি ডাক্তারবাবু দেখে দ্রুত সুস্থ করে দেবেন।',
      te: 'ఇంతేనండి. డాక్టర్ గారు చూసి త్వరగా నయం చేస్తారని ఆశిస్తున్నాను.',
      mr: 'फक्त एवढेच आहे. डॉक्टर लवकर तपासून औषध देतील अशी आशा आहे.',
      gu: 'બસ આટલું જ છે. આશા છે કે ડોક્ટર સાહેબ જલ્દી સારવાર કરશે.',
      ta: 'அவ்வளவுதான். மருத்துவர் விரைவில் பார்த்து சரிசெய்வார் என நம்புகிறேன்.',
      kn: 'ಇಷ್ಟೇ ವಿಷಯ. ವೈದ್ಯರು ಬೇಗ ನೋಡಿ ಗುಣಪಡಿಸುತ್ತಾರೆ ಎಂದು ನಂಬಿದ್ದೇನೆ.',
      ml: 'ഇത്രയുമേ ഉള്ളൂ. ഡോക്ടർ കണ്ട് ഉടൻ ശരിയാക്കുമെന്ന് പ്രതീക്ഷിക്കുന്നു.',
      pa: 'ਬਸ ਇਹੋ ਹੈ ਜੀ। ਉਮੀਦ ਹੈ ਡਾਕਟਰ ਸਾਹਿਬ ਜਲਦੀ ਦੇਖ ਲੈਣਗੇ।'
    },
    translation: 'That is all. Looking forward to consultation.',
    clinicalExtraction: { notes: 'Intake fully conducted in native language via voice interface.' }
  }
];
