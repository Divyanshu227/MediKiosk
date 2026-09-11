import { Language, Patient, MedicalDocument, AyushAssessment } from '../types';

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

export const SAMPLE_SCAN_TEMPLATES: MedicalDocument[] = [
  {
    id: 'doc-template-1',
    title: 'Dr. Lal Pathlabs - Comprehensive Blood Panel',
    type: 'lab_report',
    date: '12 Aug 2026',
    clinicOrLab: 'Dr. Lal PathLabs, Delhi Central',
    ocrConfidence: 0.96,
    ocrText: `DR. LAL PATHLABS - PATIENT REPORT
Patient: Rajesh Kumar | Age/Sex: 54/M | Ref: Dr. A. K. Sharma
Test Name | Observed Value | Unit | Reference Range
------------------------------------------------------
HbA1c (Glycated Hb)   : 9.4  [HIGH] %       (4.0 - 5.6)
Fasting Plasma Glucose : 214  [HIGH] mg/dL   (70 - 99)
Post-Prandial Glucose  : 288  [HIGH] mg/dL   (100 - 140)
Serum Creatinine       : 1.42 [HIGH] mg/dL   (0.70 - 1.20)
Total Cholesterol      : 238  [HIGH] mg/dL   (125 - 200)
Serum Triglycerides    : 260  [HIGH] mg/dL   (30 - 150)
Hemoglobin             : 13.8        g/dL    (13.0 - 17.0)`,
    entities: [
      { type: 'investigation', text: 'HbA1c: 9.4% (Severely Uncontrolled)', confidence: 0.98, date: '12 Aug 2026' },
      { type: 'investigation', text: 'Fasting Blood Sugar: 214 mg/dL', confidence: 0.97, date: '12 Aug 2026' },
      { type: 'investigation', text: 'Serum Creatinine: 1.42 mg/dL', confidence: 0.95, date: '12 Aug 2026' },
      { type: 'diagnosis', text: 'Type 2 Diabetes Mellitus with Dyslipidemia', confidence: 0.94 }
    ],
    abnormalValues: [
      { parameter: 'HbA1c', value: '9.4', unit: '%', referenceRange: '4.0 - 5.6', status: 'critical', date: '12 Aug 2026' },
      { parameter: 'Fasting Blood Sugar', value: '214', unit: 'mg/dL', referenceRange: '70 - 99', status: 'high', date: '12 Aug 2026' },
      { parameter: 'Serum Creatinine', value: '1.42', unit: 'mg/dL', referenceRange: '0.7 - 1.2', status: 'high', date: '12 Aug 2026' },
      { parameter: 'Total Cholesterol', value: '238', unit: 'mg/dL', referenceRange: '125 - 200', status: 'high', date: '12 Aug 2026' }
    ]
  },
  {
    id: 'doc-template-2',
    title: 'AIIMS New Delhi - Prior OPD Prescription',
    type: 'prescription',
    date: '14 May 2026',
    clinicOrLab: 'AIIMS New Delhi - Department of Medicine',
    ocrConfidence: 0.91,
    ocrText: `ALL INDIA INSTITUTE OF MEDICAL SCIENCES, NEW DELHI
OPD Registration No: 2026-MED-89421
Patient: Rajesh Kumar, 54/M
Dx: Essential Hypertension, Dyspepsia
Rx:
1. Tab. Amlodipine 5mg - 1 Tab OD Morning (x 90 days)
2. Tab. Pantoprazole 40mg - 1 Tab OD Before Breakfast (x 14 days)
3. Tab. Paracetamol 650mg - 1 Tab SOS for fever/pain
Adv: Low sodium diet, 30 min daily brisk walking. Review in 3 months with BP chart.`,
    entities: [
      { type: 'medication', text: 'Amlodipine 5mg OD', confidence: 0.96, date: '14 May 2026' },
      { type: 'medication', text: 'Pantoprazole 40mg OD', confidence: 0.94, date: '14 May 2026' },
      { type: 'diagnosis', text: 'Essential Hypertension', confidence: 0.95 }
    ],
    abnormalValues: []
  },
  {
    id: 'doc-template-3',
    title: 'Apollo Hospital - Discharge Summary (Knee Arthroscopy)',
    type: 'discharge_summary',
    date: '19 Nov 2025',
    clinicOrLab: 'Apollo Hospitals - Orthopedics Dept',
    ocrConfidence: 0.94,
    ocrText: `APOLLO HOSPITALS - DISCHARGE SUMMARY
UHID: APL-9821039 | Patient: Sunita Devi, 67/F
Admitted: 17-Nov-2025 | Discharged: 19-Nov-2025
Procedure: Right Knee Diagnostic Arthroscopy & Debridement
Findings: Severe medial compartment joint space narrowing (Grade 3 Kellgren-Lawrence).
Allergies noted: Penicillin group drugs (rash).
Discharge Meds:
1. Tab. Calcium + Vit D3 500mg OD
2. Tab. Paracetamol 650mg SOS
Adv: Quadriceps isometric exercises, avoid cross-legged sitting.`,
    entities: [
      { type: 'procedure', text: 'Right Knee Diagnostic Arthroscopy', confidence: 0.97, date: '17 Nov 2025' },
      { type: 'allergy', text: 'Penicillin (Allergic Rash)', confidence: 0.99 },
      { type: 'medication', text: 'Calcium + Vit D3 500mg OD', confidence: 0.93 }
    ],
    abnormalValues: []
  }
];

export const INITIAL_PATIENTS: Patient[] = [
  {
    id: 'P-1024',
    tokenNumber: 'A-104',
    name: 'Rajesh Kumar',
    age: 54,
    gender: 'Male',
    department: 'allopathy',
    language: 'hi',
    languageName: 'Hindi (हिन्दी)',
    chiefComplaint: 'Fever, severe headache and high blood sugar',
    status: 'Complete',
    priority: 'High',
    time: '09:45 AM',
    lastVisit: '14 May 2026',
    intakeTimestamp: 'Today, 09:45 AM',
    doctorReviewed: false,
    abhaProfile: {
      abhaId: 'rajesh.kumar54@abdm',
      abhaNumber: '91-4829-1039-4821',
      name: 'Rajesh Kumar',
      gender: 'Male',
      dob: '14-06-1972',
      mobile: '+91 98765 43210',
      address: 'House 42, Sector 14, Rohini, New Delhi 110085',
      isLinked: true,
      kycVerified: true
    },
    clinicalInfo: {
      chiefComplaint: 'Fever and throbbing headache for 3 days',
      duration: '3 days',
      severity: 'Moderate to High (Temp 101.4°F)',
      temperature: '101.4°F',
      associatedSymptoms: ['Throbbing frontal headache', 'Body malaise', 'Polyuria (increased urination)'],
      deniedSymptoms: ['Cough', 'Chest pain', 'Shortness of breath', 'Neck stiffness', 'Vomiting'],
      medicationsTaken: ['Paracetamol 650mg (last night)', 'Amlodipine 5mg OD (Hypertension)'],
      allergies: 'No known drug allergies reported',
      existingConditions: ['Type 2 Diabetes Mellitus (Uncontrolled)', 'Hypertension'],
      notes: 'Patient feels hot to touch. Alert and oriented. Recent blood report shows HbA1c 9.4%.'
    },
    documents: [
      SAMPLE_SCAN_TEMPLATES[0],
      SAMPLE_SCAN_TEMPLATES[1]
    ],
    fhirBundle: {
      resourceType: 'Bundle',
      id: 'fhir-bundle-p1024',
      type: 'collection',
      timestamp: '2026-09-11T09:45:00+05:30',
      totalEntries: 4,
      fhirJson: JSON.stringify({
        resourceType: 'Bundle',
        type: 'collection',
        entry: [
          { resource: { resourceType: 'Patient', id: 'P-1024', name: [{ text: 'Rajesh Kumar' }], gender: 'male', birthDate: '1972-06-14' } },
          { resource: { resourceType: 'Condition', code: { text: 'Fever with Headache (R50.9)' }, clinicalStatus: { coding: [{ code: 'active' }] } } },
          { resource: { resourceType: 'Observation', code: { text: 'Body Temperature' }, valueQuantity: { value: 101.4, unit: 'degF' } } },
          { resource: { resourceType: 'Observation', code: { text: 'HbA1c' }, valueQuantity: { value: 9.4, unit: '%' }, interpretation: [{ text: 'High' }] } }
        ]
      }, null, 2)
    },
    conversation: [
      {
        id: 'msg-1',
        sender: 'ai',
        text: 'नमस्ते राजेश जी। मेडीकियोस्क में आपका स्वागत है। कृपया बताएं कि आज आपको क्या परेशानी महसूस हो रही है?',
        translation: 'Hello Rajesh ji. Welcome to MediKiosk. Please tell us what problem you are experiencing today?',
        timestamp: '09:41 AM'
      },
      {
        id: 'msg-2',
        sender: 'patient',
        text: 'मुझे पिछले तीन दिन से तेज बुखार है और सिर में काफी भारीपन और दर्द हो रहा है। पेशाब भी बार-बार आ रहा है।',
        translation: 'I have had a high fever for the last three days, a heavy headache, and frequent urination.',
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
        text: 'हाँ, लगभग तीन दिन पहले शुरू हुआ था। कल रात नापा तो करीब 101.4 डिग्री था।',
        translation: 'Yes, it started about three days ago. When measured last night, it was around 101.4 degrees.',
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
        text: 'मैंने कल रात एक पैरासिटामोल ली थी। बीपी के लिए एमलोडिपिन लेता हूँ। किसी दवा से एलर्जी नहीं है।',
        translation: 'I took one paracetamol last night. I take Amlodipine for BP. No drug allergies.',
        timestamp: '09:44 AM'
      },
      {
        id: 'msg-9',
        sender: 'ai',
        text: 'धन्यवाद राजेश जी। मैंने आपकी पूरी जानकारी और आपके पुराने लैब टेस्ट स्कैन को व्यवस्थित कर दिया है।',
        translation: 'Thank you Rajesh ji. I have organized your complete information and your scanned prior lab tests for the physician.',
        timestamp: '09:45 AM'
      }
    ]
  },
  {
    id: 'P-1035',
    tokenNumber: 'AY-201',
    name: 'Acharya Rameshwar Prasad',
    age: 62,
    gender: 'Male',
    department: 'ayush',
    language: 'hi',
    languageName: 'Hindi (हिन्दी)',
    chiefComplaint: 'Sandhivata (Bilateral knee & lumbar joint pain) with Mandagni',
    status: 'Complete',
    priority: 'Normal',
    time: '09:30 AM',
    lastVisit: '10 Feb 2026',
    intakeTimestamp: 'Today, 09:30 AM',
    doctorReviewed: false,
    abhaProfile: {
      abhaId: 'rameshwar.ayush@abdm',
      abhaNumber: '91-3312-8841-9021',
      name: 'Rameshwar Prasad',
      gender: 'Male',
      dob: '02-03-1964',
      mobile: '+91 94150 11223',
      address: 'D-12, Lanka, Varanasi, Uttar Pradesh 221005',
      isLinked: true,
      kycVerified: true
    },
    clinicalInfo: {
      chiefComplaint: 'Sandhivata - severe stiffness and swelling in both knee joints',
      duration: '4 months (aggravated in rainy/cold season)',
      severity: 'VAS 7/10 with crepitus on movement',
      associatedSymptoms: ['Morning stiffness > 45 mins', 'Aruchi (loss of appetite)', 'Vibandha (constipation)', 'Adhmana (abdominal bloating)'],
      deniedSymptoms: ['Fever', 'Trauma', 'Chest tightness', 'Skin lesions'],
      medicationsTaken: ['Yograj Guggulu 2 tabs BD', 'Mahanarayan Taila local massage'],
      allergies: 'No known allergies',
      existingConditions: ['Chronic Sandhivata (Osteoarthritis)', 'Mild Dyspepsia'],
      notes: 'Classical Vata-Kapha presentation. Sluggish bowel movements (Krura Koshtha) with impaired digestive fire (Mandagni).'
    },
    ayushAssessment: {
      prakriti: 'Vata-Kapha',
      vikriti: 'Vata Pradhana Tridosha Prakopa with Ama formation',
      agni: 'Manda',
      koshtha: 'Krura',
      sara: 'Madhyama',
      samhanana: 'Medium',
      satmya: 'Katu-Tikta Rasa Satmya',
      sattva: 'Madhyama (Moderate)',
      aharaShakti: 'Abhyavaharana & Jarana (High/Moderate/Low)',
      vyayamaShakti: 'Low',
      aharaVihara: {
        dietType: 'Vegetarian',
        mealTiming: 'Irregular',
        waterIntake: '1.2 Liters / day (Cold water consumption)',
        sleepPattern: 'Disturbed due to joint stiffness, 5-6 hours/night',
        stressLevel: 'Moderate'
      },
      nidanaFactors: ['Heavy cold food (Sheetahara)', 'Day sleep (Divasvapna)', 'Dry windy climate exposure'],
      sampraptiSummary: 'Vata Dosha localizing in Sandhi (joints) with Ama association leading to Sandhishoola and Stambha.'
    },
    documents: [
      {
        id: 'doc-ayush-1',
        title: 'BHU Ayurveda OPD - Previous Treatment Card',
        type: 'prescription',
        date: '10 Feb 2026',
        clinicOrLab: 'Sir Sunderlal Hospital, IMS BHU Varanasi',
        ocrConfidence: 0.93,
        ocrText: `FACULTY OF AYURVEDA, IMS BHU - KAYACHIKITSA OPD
Reg: AY-2026-BHU-4412 | Pt: Rameshwar Prasad, 62/M
Vyadhi: Sandhivata (Both Janu Sandhi)
Chikitsa:
1. Yograj Guggulu 2 Vati BD with Ushnodaka
2. Dashamoola Kwatha 20ml BD before meals
3. Mahanarayana Taila Abhyanga followed by Nadi Sweda
Pathya-Apathya: Avoid Dadhi, Sheetajala, Mashadi. Take warm light meals.`,
        entities: [
          { type: 'diagnosis', text: 'Sandhivata (Bilateral Knee Osteoarthritis)', confidence: 0.96 },
          { type: 'medication', text: 'Yograj Guggulu 2 Vati BD', confidence: 0.95 },
          { type: 'medication', text: 'Dashamoola Kwatha 20ml BD', confidence: 0.92 }
        ],
        abnormalValues: []
      }
    ],
    conversation: [
      {
        id: 'msg-ay-1',
        sender: 'ai',
        text: 'नमस्ते आचार्य जी। आयुष ओपीडी मेडीकियोस्क में आपका स्वागत है। कृपया अपने स्वास्थ्य की स्थिति और जोड़ों के दर्द के बारे में बताएं।',
        translation: 'Namaste Acharya ji. Welcome to AYUSH OPD MediKiosk. Please tell us about your health condition and joint pain.',
        timestamp: '09:25 AM'
      },
      {
        id: 'msg-ay-2',
        sender: 'patient',
        text: 'मेरे दोनों घुटनों में पिछले चार महीने से बहुत तेज दर्द और जकड़न है। सुबह उठते ही चला नहीं जाता। पेट में भी भारीपन और कब्ज रहता है।',
        translation: 'I have severe pain and stiffness in both knees for the last 4 months. Cannot walk in the morning. Also having stomach heaviness and constipation.',
        timestamp: '09:26 AM'
      },
      {
        id: 'msg-ay-3',
        sender: 'ai',
        text: 'क्या आपको भूख खुलकर लगती है (अग्नि की स्थिति) और पेट साफ होने में कैसी स्थिति है (कोष्ठ)?',
        translation: 'Do you feel a good appetite (state of Agni) and what is your bowel movement status (Koshtha)?',
        timestamp: '09:27 AM'
      },
      {
        id: 'msg-ay-4',
        sender: 'patient',
        text: 'भूख बहुत कम लगती है, खाना पचने में बहुत समय लगता है। पेट साफ होने में बहुत जोर लगाना पड़ता है, दो-तीन दिन में एक बार होता है।',
        translation: 'Appetite is very sluggish, food takes long to digest. Bowel movements are hard, once in 2-3 days.',
        timestamp: '09:28 AM'
      },
      {
        id: 'msg-ay-5',
        sender: 'ai',
        text: 'क्या आप कोई आयुर्वेदिक दवा या तेल इस्तेमाल कर रहे हैं? और खान-पान में ठंडा पानी या भारी भोजन लेते हैं?',
        translation: 'Are you taking any Ayurvedic medicine or oil? And in your diet do you take cold water or heavy foods?',
        timestamp: '09:29 AM'
      },
      {
        id: 'msg-ay-6',
        sender: 'patient',
        text: 'योगराज गुग्गुलु ले रहा हूँ और महानारायण तेल लगाता हूँ। ठंडा पानी पीने की आदत है।',
        translation: 'Taking Yograj Guggulu and applying Mahanarayana oil. Accustomed to drinking cold water.',
        timestamp: '09:29 AM'
      }
    ]
  },
  {
    id: 'P-1048',
    tokenNumber: 'A-108',
    name: 'Sunita Devi',
    age: 67,
    gender: 'Female',
    department: 'allopathy',
    language: 'hi',
    languageName: 'Hindi (हिन्दी)',
    chiefComplaint: 'Bilateral knee joint pain & difficulty climbing stairs',
    status: 'Complete',
    priority: 'Normal',
    time: '09:20 AM',
    lastVisit: '19 Nov 2025',
    intakeTimestamp: 'Today, 09:20 AM',
    doctorReviewed: false,
    abhaProfile: {
      abhaId: 'sunita.devi67@abdm',
      abhaNumber: '91-8821-4902-1144',
      name: 'Sunita Devi',
      gender: 'Female',
      dob: '28-09-1959',
      mobile: '+91 98112 33445',
      address: 'Flat 302, Green Park Extension, New Delhi 110016',
      isLinked: true,
      kycVerified: true
    },
    clinicalInfo: {
      chiefComplaint: 'Bilateral knee joint pain & stiffness',
      duration: '3 weeks (worsened over past 4 days)',
      severity: 'Severe on standing or climbing stairs (VAS 7/10)',
      associatedSymptoms: ['Morning stiffness (~30 mins)', 'Mild swelling in right knee'],
      deniedSymptoms: ['Fever', 'Trauma/fall', 'Numbness in toes', 'Skin redness'],
      medicationsTaken: ['Calcium + Vit D3 500mg daily'],
      allergies: 'Penicillin allergy (skin rash)',
      existingConditions: ['Known Osteoarthritis (diagnosed 2024)', 'Type 2 Diabetes'],
      notes: 'Requires support to stand up. Walking with a mild limp. Prior arthroscopy in 2025.'
    },
    documents: [
      SAMPLE_SCAN_TEMPLATES[2]
    ],
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
      }
    ]
  },
  {
    id: 'P-1002',
    tokenNumber: 'EMERGENCY-01',
    name: 'Vikramaditya Sharma',
    age: 58,
    gender: 'Male',
    department: 'allopathy',
    language: 'hi',
    languageName: 'Hindi (हिन्दी)',
    chiefComplaint: 'CRITICAL: Acute retrosternal chest pain with left arm radiation',
    status: 'Urgent',
    priority: 'Urgent',
    time: '08:30 AM',
    lastVisit: 'First Visit',
    intakeTimestamp: 'Today, 08:30 AM',
    doctorReviewed: false,
    clinicalInfo: {
      chiefComplaint: 'Severe retrosternal crushing chest pain radiating to left jaw and shoulder',
      duration: '45 minutes (sudden onset at rest)',
      severity: 'Extremely severe (VAS 9/10)',
      associatedSymptoms: ['Cold diaphoresis (profuse sweating)', 'Shortness of breath (Dyspnea)', 'Severe anxiety / feeling of impending doom'],
      deniedSymptoms: ['Trauma', 'Fever', 'Abdominal pain'],
      medicationsTaken: ['Sorbitrate 5mg sublingual taken 10 min ago with partial relief'],
      allergies: 'No known drug allergies',
      existingConditions: ['Heavy smoker (20 pack-years)', 'Hyperlipidemia'],
      notes: 'TRIAGE PRIORITY 1 EMERGENCY: High suspicion of Acute Coronary Syndrome (STEMI / NSTEMI). STAT 12-lead ECG and Cardiology call required.'
    },
    documents: [],
    conversation: [
      {
        id: 'msg-em-1',
        sender: 'ai',
        text: 'नमस्ते विक्रम जी। आप क्या तकलीफ महसूस कर रहे हैं?',
        translation: 'Namaste Vikram ji. What discomfort are you experiencing?',
        timestamp: '08:28 AM'
      },
      {
        id: 'msg-em-2',
        sender: 'patient',
        text: 'सीने के बीच में बहुत तेज दबाव और दर्द हो रहा है जैसे कोई पत्थर रख दिया हो! दर्द बाएं हाथ और जबड़े तक जा रहा है और बहुत पसीना आ रहा है।',
        translation: 'Severe pressure and pain in center of chest like a heavy stone! Pain radiating to left arm and jaw with heavy sweating.',
        timestamp: '08:29 AM'
      },
      {
        id: 'msg-em-3',
        sender: 'ai',
        text: 'आपातकालीन अलर्ट: आपके लक्षण तत्काल चिकित्सीय ध्यान (Emergency Triage) की मांग करते हैं। नर्स को तुरंत सूचित किया जा रहा है।',
        translation: 'EMERGENCY ALERT: Your symptoms require immediate medical attention. Triage team alerted.',
        timestamp: '08:30 AM',
        isUrgent: true
      }
    ]
  }
];

export const DEMO_ALLOPATHY_FLOW_STEPS = [
  {
    stage: 1,
    title: 'Chief Complaint (मुख्य शिकायत)',
    category: 'Onset & Primary Problem',
    aiQuestion: {
      hi: 'नमस्ते! आपको आज किस मुख्य समस्या या तकलीफ के लिए डॉक्टर से मिलना है?',
      en: 'Hello! What primary symptom or health issue are you seeking consultation for today?',
      bn: 'নমস্কার! আজ আপনার কী প্রধান সমস্যা বা উপসর্গ দেখা দিচ্ছে?',
      te: 'నమస్కారం! ఈరోజు మీరు ఏ ముఖ్యమైన సమస్య కోసం డాక్టర్‌ను సంప్రదిస్తున్నారు?',
      mr: 'नमस्कार! आज तुम्हाला कोणत्या मुख्य समस्येसाठी सल्ला हवा आहे?',
      gu: 'નમસ્તે! આજે તમને કઈ મુખ્ય તકલીફ અથવા લક્ષણ માટે મદદ જોઈએ છે?',
      ta: 'வணக்கம்! இன்று நீங்கள் என்ன முக்கிய பிரச்சனைக்காக வந்துள்ளீர்கள்?',
      kn: 'ನಮಸ್ಕಾರ! ಇಂದು ನೀವು ಯಾವ ಮುಖ್ಯ ಸಮಸ್ಯೆಗೆ ವೈದ್ಯರನ್ನು ಭೇಟಿ ಮಾಡಲು ಬಂದಿದ್ದೀರಿ?',
      ml: 'നമസ്കാരം! ഇന്ന് നിങ്ങൾക്ക് എന്ത് പ്രധാന പ്രശ്നത്തിനാണ് ഡോക്ടറെ കാണേണ്ടത്?',
      pa: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਅੱਜ ਤੁਹਾਨੂੰ ਕਿਸ ਮੁੱਖ ਸਮੱਸਿਆ ਲਈ ਡਾਕਟਰ ਨੂੰ ਮਿਲਣਾ ਹੈ?'
    },
    touchOptions: [
      { text: 'बुखार एवं सिरदर्द (Fever & Headache)', clinicalVal: 'Fever and headache' },
      { text: 'पेट में दर्द या उल्टी (Stomach Pain & Nausea)', clinicalVal: 'Abdominal pain and nausea' },
      { text: 'जोड़ों व घुटनों में दर्द (Joint & Knee Pain)', clinicalVal: 'Bilateral knee joint pain' },
      { text: 'खांसी एवं जुकाम (Cough & Cold)', clinicalVal: 'Persistent cough and throat pain' }
    ],
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
    translation: 'I have had fever and headache for three days.',
    clinicalExtraction: { chiefComplaint: 'Fever and throbbing headache', duration: '3 days' }
  },
  {
    stage: 2,
    title: 'SOCRATES: Time & Progression (अवधि एवं उतार-चढ़ाव)',
    category: 'Timeline',
    aiQuestion: {
      hi: 'यह तकलीफ कब से है और क्या यह लगातार बनी रहती है या बीच-बीच में ठीक होकर फिर आती है?',
      en: 'Since when do you have this and is it continuous or does it come and go?',
      bn: 'এই সমস্যা কতদিন ধরে এবং এটা কি একটানা থাকে নাকি ওঠানামা করে?',
      te: 'ఈ సమస్య ఎప్పటి నుండి ఉంది, నిరంతరం ఉంటుందా లేదా తగ్గి పెరుగుతుందా?',
      mr: 'हा त्रास कधीपासून आहे आणि तो सतत राहतो की कमी-जास्त होतो?',
      gu: 'આ તકલીફ ક્યારથી છે અને શું તે સતત રહે છે કે ઉતરે-ચઢે છે?',
      ta: 'இந்த பிரச்சனை எத்தனை நாட்களாக உள்ளது, தொடர்ந்து இருக்கிறதா?',
      kn: 'ಈ ತೊಂದರೆ ಯಾವಾಗ ಪ್ರಾರಂಭವಾಯಿತು ಮತ್ತು ಸತತವಾಗಿ ಇರುತ್ತದೆಯೇ?',
      ml: 'ഈ അസുഖം എത്ര ദിവസമായി ഉണ്ട്, ഇത് തുടർച്ചയായിട്ടാണോ?',
      pa: 'ਇਹ ਤਕਲੀਫ ਕਦੋਂ ਤੋਂ ਹੈ ਅਤੇ ਇਹ ਲਗਾਤਾਰ ਹੈ ਜਾਂ ਚੜ੍ਹਦੀ-ਉਤਰਦੀ ਹੈ?'
    },
    touchOptions: [
      { text: '3 दिन से, रात में बढ़ जाता है (3 days, worse at night)', clinicalVal: '3 days, nocturnal worsening' },
      { text: '1 सप्ताह से लगातार (1 week continuous)', clinicalVal: '1 week continuous' },
      { text: 'आज सुबह से अचानक (Sudden onset today)', clinicalVal: 'Sudden onset today' },
      { text: '1 महीने से पुराना दर्द (Chronic > 1 month)', clinicalVal: 'Chronic > 1 month' }
    ],
    defaultPatientResponse: {
      hi: 'लगभग तीन दिन से है, रात में थोड़ा ज्यादा बढ़ जाता है।',
      en: 'For about three days, it increases slightly at night.',
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
    clinicalExtraction: { duration: '3 days (nocturnal exacerbation)' }
  },
  {
    stage: 3,
    title: 'SOCRATES: Severity & Character (तीव्रता व तापमान)',
    category: 'Severity',
    aiQuestion: {
      hi: 'क्या आपने थर्मामीटर से बुखार नापा था? और दर्द की तीव्रता (1 से 10 के पैमाने पर) कितनी है?',
      en: 'Did you measure your temperature with a thermometer? How severe is the pain on a scale of 1 to 10?',
      bn: 'আপনি কি থার্মোমিটার দিয়ে তাপমাত্রা মেপেছেন? ব্যথার তীব্রতা কেমন?',
      te: 'మీరు థర్మామీటర్‌తో ఉష్ణోగ్రత కొలిచారా? నొప్పి తీవ్రత ఎంత?',
      mr: 'तुम्ही थर्मामीटरने तापमान मोजले आहे का? वेदना किती तीव्र आहे?',
      gu: 'શું તમે થર્મોમીટરથી તાપમાન માપ્યું છે? દુખાવો કેટલો તીવ્ર છે?',
      ta: 'தெர்மோமீட்டரில் காய்ச்சல் அளந்தீர்களா? வலி அளவு எவ்வளவு?',
      kn: 'ನೀವು ಥರ್ಮಾಮೀಟರ್‌ನಿಂದ ತಾಪಮಾನ ಅಳೆದಿದ್ದೀರಾ? ನೋವಿನ ತೀವ್ರತೆ ಎಷ್ಟು?',
      ml: 'നിങ്ങൾ തെർമോമീറ്റർ ഉപയോഗിച്ച് താപനില അളന്നോ? വേദന എത്രത്തോളമുണ്ട്?',
      pa: 'ਕੀ ਤੁਸੀਂ ਥਰਮਾਮੀਟਰ ਨਾਲ ਤਾਪਮਾਨ ਮਾਪਿਆ ਸੀ? ਦਰਦ ਕਿੰਨਾ ਤੇਜ਼ ਹੈ?'
    },
    touchOptions: [
      { text: '101°F - मध्यम बुखार व सिर भारी (101°F Moderate)', clinicalVal: '101.4°F Moderate' },
      { text: '103°F - बहुत तेज बुखार व कंपकंपी (103°F High with Chills)', clinicalVal: '103.0°F High with Chills' },
      { text: 'हल्का हरारत / 99°F (Low grade 99°F)', clinicalVal: 'Low grade 99°F' },
      { text: 'तापमान नहीं नापा (Not measured)', clinicalVal: 'Not measured' }
    ],
    defaultPatientResponse: {
      hi: 'हाँ, कल रात नापा था तो 101.4 डिग्री था। सिर में तेज धड़कन जैसा दर्द है।',
      en: 'Yes, measured last night, it was around 101.4°F. Throbbing headache.',
      bn: 'হ্যাঁ, কাল রাতে মেপেছিলাম, ১০১.৪ ডিগ্রি ছিল।',
      te: 'అవును, నిన్న రాత్రి కొలిస్తే 101.4°F ఉంది.',
      mr: 'होय, काल रात्री मोजले तेव्हा 101.4°F होते.',
      gu: 'હા, ગઈકાલે રાત્રે માપ્યું ત્યારે 101.4°F હતું.',
      ta: 'ஆம், நேற்று இரவு அளந்தபோது 101.4°F இருந்தது.',
      kn: 'ಹೌದು, ನಿನ್ನೆ ರಾತ್ರಿ ಅಳೆದಾಗ 101.4°F ಇತ್ತು.',
      ml: 'അതെ, ഇന്നലെ രാത്രി അളന്നപ്പോൾ 101.4°F ഉണ്ടായിരുന്നു.',
      pa: 'ਹਾਂਜੀ, ਕੱਲ੍ਹ ਰਾਤ ਮਾਪਿਆ ਸੀ ਤਾਂ 101.4°F ਸੀ।'
    },
    translation: 'Yes, measured last night, it was around 101.4°F with throbbing headache.',
    clinicalExtraction: { temperature: '101.4°F', severity: 'Moderate (VAS 6/10)' }
  },
  {
    stage: 4,
    title: 'Review of Systems & Red Flags (अन्य लक्षण व खतरे की जांच)',
    category: 'Systemic Review',
    aiQuestion: {
      hi: 'क्या आपको सांस लेने में तकलीफ, सीने में दर्द, गर्दन में अकड़न, या उल्टी/दस्त जैसी कोई समस्या है?',
      en: 'Do you have shortness of breath, chest pain, neck stiffness, or vomiting/diarrhea?',
      bn: 'আপনার কি শ্বাসকষ্ট, বুকে ব্যথা, ঘাড় শক্ত হওয়া বা বমি হচ্ছে?',
      te: 'మీకు శ్వాస ఆడకపోవడం, ఛాతీ నొప్పి, మెడ పట్టేయడం లేదా వాంతులు ఉన్నాయా?',
      mr: 'तुम्हाला श्वास घेण्यास त्रास, छातीत दुखणे, मान ताठरणे किंवा उलट्या होत आहेत का?',
      gu: 'શું તમને શ્વાસ લેવામાં તકલીફ, છાતીમાં દુખાવો કે ઉલટી થાય છે?',
      ta: 'உங்களுக்கு மூச்சுத் திணறல், நெஞ்சு வலி அல்லது வாந்தி உள்ளதா?',
      kn: 'ನಿಮಗೆ ಉಸಿರಾಟದ ತೊಂದರೆ, ಎದೆನೋವು ಅಥವಾ ವಾಂತಿ ಇದೆಯೇ?',
      ml: 'നിങ്ങൾക്ക് ശ്വാസതടസ്സമോ നെഞ്ചുവേദനയോ ഛർദ്ദിയോ ഉണ്ടോ?',
      pa: 'ਕੀ ਤੁਹਾਨੂੰ ਸਾਹ ਲੈਣ ਵਿੱਚ ਤਕਲੀਫ, ਛਾਤੀ ਵਿੱਚ ਦਰਦ ਜਾਂ ਉਲਟੀ ਆ ਰਹੀ ਹੈ?'
    },
    touchOptions: [
      { text: 'इनमें से कुछ नहीं (No red flags)', clinicalVal: 'None of these' },
      { text: 'सीने में दर्द या भारीपन (Chest pain - Urgent Alert)', clinicalVal: 'Chest pain' },
      { text: 'सांस लेने में भारी तकलीफ (Severe Dyspnea)', clinicalVal: 'Severe breathlessness' },
      { text: 'उल्टी और दस्त (Vomiting & Diarrhea)', clinicalVal: 'Vomiting and loose motions' }
    ],
    defaultPatientResponse: {
      hi: 'नहीं, सीने में दर्द या सांस की दिक्कत नहीं है। बस सिर भारी है और बदन टूट रहा है।',
      en: 'No, no chest pain or breathing issues. Just heavy head and body ache.',
      bn: 'না, বুকে ব্যথা বা শ্বাসকষ্ট নেই। শুধু মাথা ভারী।',
      te: 'లేదు, ఛాతీ నొప్పి లేదా శ్వాస సమస్యలు లేవు.',
      mr: 'नाही, छातीत दुखणे किंवा श्वास घेण्यास त्रास नाही.',
      gu: 'ના, છાતીમાં દુખાવો કે શ્વાસની તકલીફ નથી.',
      ta: 'இல்லை, நெஞ்சு வலி அல்லது மூச்சு பிரச்சனை இல்லை.',
      kn: 'ಇಲ್ಲ, ಎದೆನೋವು ಅಥವಾ ಉಸಿರಾಟದ ತೊಂದರೆ ಇಲ್ಲ.',
      ml: 'ഇല്ല, നെഞ്ചുവേദനയോ ശ്വാസതടസ്സമോ ഇല്ല.',
      pa: 'ਨਹੀਂ ਜੀ, ਛਾਤੀ ਵਿੱਚ ਦਰਦ ਜਾਂ ਸਾਹ ਦੀ ਦਿੱਕਤ ਨਹੀਂ ਹੈ।'
    },
    translation: 'No red flag symptoms (no chest pain, dyspnea, or neck stiffness).',
    clinicalExtraction: { 
      associatedSymptoms: ['Throbbing frontal headache', 'Body malaise'],
      deniedSymptoms: ['Chest pain', 'Shortness of breath', 'Neck stiffness', 'Vomiting'] 
    }
  },
  {
    stage: 5,
    title: 'Medications, Allergies & Comorbidities (दवाइयां एवं एलर्जी)',
    category: 'Drug & Medical History',
    aiQuestion: {
      hi: 'क्या आपने कोई दवा ली है? क्या आपको बीपी, शुगर है या किसी दवा से कोई एलर्जी है?',
      en: 'Have you taken any medication? Do you have BP, Diabetes, or any drug allergies?',
      bn: 'আপনি কি কোনো ওষুধ খেয়েছেন? প্রেসার, সুগার বা কোনো অ্যালার্জি আছে?',
      te: 'మీరు ఏవైనా మందులు తీసుకున్నారా? బీపీ, షుగర్ లేదా అలర్జీలు ఉన్నాయా?',
      mr: 'तुम्ही कोणते औषध घेतले आहे का? बीपी/शुगर किंवा कोणत्याही औषधाची ॲलर्जी आहे का?',
      gu: 'શું તમે કોઈ દવા લીધી છે? બીપી, ડાયાબિટીસ કે કોઈ દવાની એલર્જી છે?',
      ta: 'ஏதேனும் மருந்து எடுத்தீர்களா? பிபி, சர்க்கரை அல்லது மருந்து அலர்ஜி உள்ளதா?',
      kn: 'ಯಾವುದಾದರೂ ಔಷಧಿ ತೆಗೆದುಕೊಂಡಿದ್ದೀರಾ? ಬಿಪಿ, ಸಕ್ಕರೆ ಕಾಯಿಲೆ ಅಥವಾ ಅಲರ್ಜಿ ಇದೆಯೇ?',
      ml: 'എന്തെങ്കിലും മരുന്ന് കഴിച്ചോ? പ്രഷർ, പ്രമേഹം അല്ലെങ്കിൽ അലർജി ഉണ്ടോ?',
      pa: 'ਕੀ ਕੋਈ ਦਵਾਈ ਲਈ ਹੈ? ਬੀਪੀ, ਸ਼ੂਗਰ ਜਾਂ ਕੋਈ ਦਵਾਈ ਦੀ ਐਲਰਜੀ ਹੈ?'
    },
    touchOptions: [
      { text: 'पैरासिटामोल ली थी, बीपी/शुगर है (Paracetamol taken, has HTN/DM)', clinicalVal: 'Paracetamol 650mg, HTN/DM on Amlodipine' },
      { text: 'कोई दवा नहीं ली, कोई बीमारी नहीं (No prior meds or conditions)', clinicalVal: 'No meds, no conditions' },
      { text: 'पेनिसिलिन से एलर्जी है (Penicillin Allergy)', clinicalVal: 'Penicillin allergy' },
      { text: 'दमा/अस्थमा का मरीज (Asthma Patient)', clinicalVal: 'Known Asthmatic' }
    ],
    defaultPatientResponse: {
      hi: 'कल रात एक पैरासिटामोल 650mg ली थी। मुझे ब्लड प्रेशर और शुगर है, एमलोडिपिन लेता हूँ। कोई एलर्जी नहीं है।',
      en: 'Took Paracetamol 650mg last night. I have Hypertension and Diabetes, on Amlodipine. No allergies.',
      bn: 'কাল রাতে প্যারাসিটামল খেয়েছি। প্রেশার আর সুগার আছে, অ্যামলোডিপিন খাই।',
      te: 'నిన్న రాత్రి పారాసిటమాల్ తీసుకున్నాను. బీపీ మరియు షుగర్ ఉన్నాయి.',
      mr: 'काल रात्री पॅरासिटामॉल घेतली. मला बीपी आणि मधुमेह आहे.',
      gu: 'ગઈકાલે પેરાસિટામોલ લીધી હતી. બીપી અને ડાયાબિટીસ છે.',
      ta: 'பாராசிட்டமால் சாப்பிட்டேன். பிபி, சர்க்கரை உள்ளது.',
      kn: 'ನಿನ್ನೆ ಪ್ಯಾರಾಸಿಟಮಾಲ್ ತೆಗೆದುಕೊಂಡೆ. ಬಿಪಿ ಮತ್ತು ಸಕ್ಕರೆ ಕಾಯಿಲೆ ಇದೆ.',
      ml: 'പാരസെറ്റമോൾ കഴിച്ചു. പ്രഷറും ഷുഗറും ഉണ്ട്.',
      pa: 'ਕੱਲ੍ਹ ਪੈਰਾਸੀਟਾਮੋਲ ਲਈ ਸੀ। ਬੀਪੀ ਅਤੇ ਸ਼ੂਗਰ ਹੈ ਜੀ।'
    },
    translation: 'Took Paracetamol 650mg. Known Diabetes & Hypertension (on Amlodipine). No allergies.',
    clinicalExtraction: {
      medicationsTaken: ['Paracetamol 650mg (last night)', 'Amlodipine 5mg OD'],
      allergies: 'No known drug allergies',
      existingConditions: ['Type 2 Diabetes Mellitus', 'Essential Hypertension']
    }
  }
];

export const DEMO_AYUSH_FLOW_STEPS = [
  {
    stage: 1,
    title: 'Pradhana Vedana (Chief Complaint & Location)',
    category: 'AYUSH Mukhya Lakshana',
    aiQuestion: {
      hi: 'नमस्ते! आयुष विभाग में आपका स्वागत है। कृपया बताएं कि आपके शरीर में क्या मुख्य कष्ट या वेदना है?',
      en: 'Namaste! Welcome to AYUSH OPD. Please describe your chief bodily complaint or pain.',
      bn: 'নমস্কার! আয়ুষ বিভাগে আপনাকে স্বাগতম। আপনার প্রধান শারীরিক সমস্যাটি জানান।',
      te: 'నమస్కారం! ఆయుష్ విభాగానికి స్వాగతం. మీ ప్రధాన సమస్య ఏమిటి?',
      mr: 'नमस्कार! आयुष विभागात आपले स्वागत आहे. आपल्याला काय मुख्य त्रास होत आहे?',
      gu: 'નમસ્તે! આયુષ વિભાગમાં આપનું સ્વાગત છે. તમારી મુખ્ય તકલીફ જણાવો.',
      ta: 'வணக்கம்! ஆயுஷ் பிரிவிற்கு நல்வரவு. உங்கள் முக்கிய பிரச்சனை என்ன?',
      kn: 'ನಮಸ್ಕಾರ! ಆಯುಷ್ ವಿಭಾಗಕ್ಕೆ ಸುಸ್ವಾಗತ. ನಿಮ್ಮ ಮುಖ್ಯ ತೊಂದರೆ ತಿಳಿಸಿ.',
      ml: 'നമസ്കാരം! ആയുഷ് വിഭാഗത്തിലേക്ക് സ്വാഗതം. നിങ്ങളുടെ പ്രധാന അസുഖം എന്താണ്?',
      pa: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਆਯੁਸ਼ ਵਿਭਾਗ ਵਿੱਚ ਜੀ ਆਇਆਂ ਨੂੰ। ਮੁੱਖ ਤਕਲੀਫ ਬਾਰੇ ਦੱਸੋ।'
    },
    touchOptions: [
      { text: 'संधिवात / घुटनों में दर्द व अकड़न (Joint Pain & Stiffness)', clinicalVal: 'Sandhivata (Joint pain & stiffness)' },
      { text: 'अम्लपित्त / गैस व जलन (Hyperacidity & Dyspepsia)', clinicalVal: 'Amlapitta (Hyperacidity & Gastritis)' },
      { text: 'कास व श्वास / पुरानी खांसी (Chronic Cough / Asthma)', clinicalVal: 'Kasa & Shwasa (Respiratory issues)' },
      { text: 'त्वचा विकार / खुजली (Skin Disorders / Twak Roga)', clinicalVal: 'Kushtha / Twak Roga (Dermatological)' }
    ],
    defaultPatientResponse: {
      hi: 'मेरे दोनों घुटनों और कमर में बहुत दर्द और जकड़न रहती है। चलने-फिरने में बड़ी तकलीफ है।',
      en: 'Severe pain and stiffness in both knees and lumbar region. Hard to walk.',
      bn: 'আমার দুই হাঁটু ও কোমরে খুব ব্যথা ও শক্তভাব থাকে।',
      te: 'నా రెండు మోకాళ్లు మరియు నడుము చాలా నొప్పిగా మరియు పట్టేసినట్లు ఉంటుంది.',
      mr: 'माझ्या दोन्ही गुडघ्यांत आणि कमरेत खूप वेदना व ताठरता आहे.',
      gu: 'મારા બંને ઘૂંટણ અને કમરમાં ખૂબ દુખાવો અને અકડાઈ રહે છે.',
      ta: 'எனது இரண்டு முழங்கால்கள் மற்றும் இடுப்பில் கடுமையான வலி மற்றும் விறைப்பு உள்ளது.',
      kn: 'ನನ್ನ ಎರಡೂ ಮೊಣಕಾಲು ಮತ್ತು ಸೊಂಟದಲ್ಲಿ ತೀವ್ರ ನೋವು ಇದೆ.',
      ml: 'എന്റെ രണ്ട് മുട്ടുകളിലും ഇടുപ്പിലും കഠിനമായ വേദനയും മുറുക്കവുമുണ്ട്.',
      pa: 'ਮੇਰੇ ਦੋਵੇਂ ਗੋਡਿਆਂ ਅਤੇ ਕਮਰ ਵਿੱਚ ਬਹੁਤ ਦਰਦ ਅਤੇ ਅਕੜਾਅ ਰਹਿੰਦਾ ਹੈ।'
    },
    translation: 'Severe joint pain and stiffness in bilateral knees and lower back.',
    clinicalExtraction: { chiefComplaint: 'Sandhivata (Bilateral knee & lumbar joint pain)', duration: '4 months' }
  },
  {
    stage: 2,
    title: 'Agni & Koshtha Pariksha (पाचन शक्ति व कोष्ठ की स्थिति)',
    category: 'Dashavidha Pariksha',
    aiQuestion: {
      hi: 'आपकी भूख (अग्नि) कैसी है और पेट साफ (कोष्ठ) रोज आराम से होता है या कब्ज रहता है?',
      en: 'How is your digestive fire (Agni) and are your bowel movements (Koshtha) regular or constipated?',
      bn: 'আপনার খিদে কেমন এবং পেট কি রোজ পরিষ্কার হয় নাকি কোষ্ঠকাঠিন্য আছে?',
      te: 'మీ ఆకలి ఎలా ఉంది మరియు మల విసర్జన సాఫీగా జరుగుతుందా లేదా మలబద్ధకం ఉందా?',
      mr: 'तुमची भूक कशी आहे आणि पोट रोज व्यवस्थित साफ होते की बद्धकोष्ठता आहे?',
      gu: 'તમારી ભૂખ કેવી છે અને પેટ રોજ સાફ આવે છે કે કબજિયાત રહે છે?',
      ta: 'உங்கள் பசி எப்படி உள்ளது এবং மலச்சிக்கல் பிரச்சனை உள்ளதா?',
      kn: 'ನಿಮ್ಮ ಹಸಿವು ಹೇಗಿದೆ ಮತ್ತು ಮಲಬದ್ಧತೆ ಇದೆಯೇ?',
      ml: 'നിങ്ങളുടെ വിശപ്പ് എങ്ങനെയുണ്ട്, മലബന്ധം ഉണ്ടോ?',
      pa: 'ਤੁਹਾਡੀ ਭੁੱਖ ਕਿਵੇਂ ਹੈ ਅਤੇ ਕੀ ਕਬਜ਼ ਰਹਿੰਦੀ ਹੈ?'
    },
    touchOptions: [
      { text: 'मंदाग्नि + क्रूर कोष्ठ (Sluggish Digestion + Constipation)', clinicalVal: 'Mandagni & Krura Koshtha' },
      { text: 'समाग्नि + मध्यम कोष्ठ (Normal Digestion & Regular Bowel)', clinicalVal: 'Samagni & Madhya Koshtha' },
      { text: 'तीक्ष्णाग्नि + मृदु कोष्ठ (High Appetite + Loose Stool tendency)', clinicalVal: 'Tikshnagni & Mridu Koshtha' },
      { text: 'विषमाग्नि (Irregular Digestion with Gas & Bloating)', clinicalVal: 'Vishamagni with Adhmana' }
    ],
    defaultPatientResponse: {
      hi: 'भूख बहुत मंद है, खाना देर से पचता है और दो-तीन दिन में एक बार बहुत जोर लगाने पर पेट साफ होता है।',
      en: 'Appetite is very low (Mandagni), food digests slowly, bowel evacuation once in 2-3 days (Krura Koshtha).',
      bn: 'খিদে খুব কম, খাবার হজম হতে অনেক সময় লাগে আর কোষ্ঠকাঠিন্য আছে।',
      te: 'ఆకలి చాలా తక్కువగా ఉంటుంది, మలబద్ధకం ఎక్కువగా ఉంది.',
      mr: 'भूक खूप मंद आहे, अन्न पचायला वेळ लागतो आणि बद्धकोष्ठता आहे.',
      gu: 'ભૂખ બહુ ઓછી લાગે છે અને પેટ સાફ થવામાં કબજિયાત રહે છે.',
      ta: 'பசி மிகவும் குறைவாக உள்ளது மற்றும் கடுமையான மலச்சிக்கல் உள்ளது.',
      kn: 'ಹಸಿವು ಕಡಿಮೆ ಇದೆ ಮತ್ತು ಮಲಬದ್ಧತೆ ಇದೆ.',
      ml: 'വിശപ്പ് വളരെ കുറവാണ്, മലബന്ധം ഉണ്ട്.',
      pa: 'ਭੁੱਖ ਬਹੁਤ ਘੱਟ ਲੱਗਦੀ ਹੈ ਅਤੇ ਕਬਜ਼ ਰਹਿੰਦੀ ਹੈ।'
    },
    translation: 'Sluggish digestion (Mandagni) with hard constipation (Krura Koshtha).',
    clinicalExtraction: {
      ayushAgni: 'Manda',
      ayushKoshtha: 'Krura',
      associatedSymptoms: ['Mandagni (Impaired digestion)', 'Vibandha (Constipation)', 'Adhmana (Bloating)']
    }
  },
  {
    stage: 3,
    title: 'Ahara-Vihara & Prakriti (आहार-विहार, निद्रा व प्रकृति)',
    category: 'Ahara-Vihara Assessment',
    aiQuestion: {
      hi: 'आपका खान-पान (शाकाहारी/मांसाहारी), ठंडा पानी पीने की आदत, और रात की नींद कैसी रहती है?',
      en: 'What is your diet (Veg/Non-Veg), cold water habits, and how is your nighttime sleep?',
      bn: 'আপনার খাদ্যাভ্যাস কেমন, ঠান্ডা জল খান কিনা এবং রাতের ঘুম কেমন হয়?',
      te: 'మీ ఆహారపు అలవాట్లు, చల్లని నీరు తాగే అలవాటు మరియు నిద్ర ఎలా ఉంటుంది?',
      mr: 'तुमचा आहार, थंड पाणी पिण्याची सवय आणि रात्रीची झोप कशी असते?',
      gu: 'તમારો આહાર, ઠંડુ પાણી પીવાની ટેવ અને રાત્રે ઊંઘ કેવી આવે છે?',
      ta: 'உங்கள் உணவு பழக்கம் மற்றும் இரவு தூக்கம் எப்படி உள்ளது?',
      kn: 'ನಿಮ್ಮ ಆಹಾರ ಪದ್ಧತಿ ಮತ್ತು ರಾತ್ರಿ ನಿದ್ರೆ ಹೇಗಿದೆ?',
      ml: 'നിങ്ങളുടെ ഭക്ഷണരീതിയും രാത്രി ഉറക്കവും എങ്ങനെയുണ്ട്?',
      pa: 'ਤੁਹਾਡਾ ਖਾਣ-ਪੀਣ ਅਤੇ ਰਾਤ ਦੀ ਨੀਂਦ ਕਿਵੇਂ ਹੈ?'
    },
    touchOptions: [
      { text: 'शाकाहारी + ठंडा जल + दर्द के कारण टूटी नींद (Veg + Cold water + Disturbed sleep)', clinicalVal: 'Vegetarian, Cold water, Disturbed sleep' },
      { text: 'नियमित सादा भोजन + अच्छी नींद (Regular plain diet + Sound sleep)', clinicalVal: 'Sattvic diet, 7h sleep' },
      { text: 'तला-भुना / मसालेदार भोजन + अनिद्रा (Oily/Spicy diet + Insomnia)', clinicalVal: 'Vidahi Ahara, Anidra' },
      { text: 'अनियमित भोजन का समय (Irregular meal timings)', clinicalVal: 'Vishamashana' }
    ],
    defaultPatientResponse: {
      hi: 'शुद्ध शाकाहारी हूँ। ठंडा पानी पीने की आदत है और जोड़ों के दर्द की वजह से रात में करवट बदलते नींद टूटती है।',
      en: 'Vegetarian. Drink refrigerated water. Sleep gets disturbed due to joint aches.',
      bn: 'নিরামিষাশী। ঠান্ডা জল খাই আর ব্যথার জন্য রাতে ভালো ঘুম হয় না।',
      te: 'శాకాహారిని. చల్లని నీరు తాగుతాను మరియు నొప్పి వల్ల నిద్ర సరిగ్గా పట్టదు.',
      mr: 'शाकाहारी आहे. थंड पाणी पिण्याची सवय आणि वेदनेमुळे झोपमोड होते.',
      gu: 'શાકાહારી છું. ઠંડુ પાણી પીવું છું અને દુખાવાને લીધੇ ઊંઘ બરાબર આવતી નથી.',
      ta: 'சைவ உணவு. குளிர் நீர் பழக்கம் மற்றும் வலியால் தூக்கம் கெடுகிறது.',
      kn: 'ಸಸ್ಯಾಹಾರಿ. ತಣ್ಣೀರು ಕುಡಿಯುತ್ತೇನೆ ಮತ್ತು ನೋವಿನಿಂದ ನಿದ್ರೆ ಸರಿಯಾಗಿ ಬರುವುದಿಲ್ಲ.',
      ml: 'സസ്യാഹാരിയാണ്. തണുത്ത വെള്ളം കുടിക്കാറുണ്ട്, വേദന കാരണം ഉറക്കം കുറവാണ്.',
      pa: 'ਸ਼ਾਕਾਹਾਰੀ ਹਾਂ ਜੀ। ਠੰਡਾ ਪਾਣੀ ਪੀਂਦਾ ਹਾਂ ਅਤੇ ਦਰਦ ਕਰਕੇ ਨੀਂਦ ਨਹੀਂ ਆਉਂਦੀ।'
    },
    translation: 'Vegetarian diet, cold water habits (Sheetahara), sleep disrupted by joint stiffness.',
    clinicalExtraction: {
      ayushPrakriti: 'Vata-Kapha',
      medicationsTaken: ['Yograj Guggulu 2 tabs BD', 'Mahanarayan Taila local application']
    }
  }
];

// Alias for backwards compatibility
export const DEMO_FLOW_STEPS = DEMO_ALLOPATHY_FLOW_STEPS;
