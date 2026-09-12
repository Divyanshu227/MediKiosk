import React, { useState, useRef, useEffect } from 'react';
import { 
  FileText, 
  Upload, 
  Camera, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Trash2, 
  ArrowRight, 
  ArrowLeft, 
  Activity, 
  FileCheck2,
  Calendar,
  Building2,
  Eye,
  RefreshCw,
  Plus,
  Edit,
  Video,
  X,
  QrCode,
  Smartphone,
  ScanLine,
  Wifi,
  Copy,
  Check,
  Layers,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SAMPLE_SCAN_TEMPLATES } from '../../data/mockData';
import { MedicalDocument, DocumentType } from '../../types';

export const DocumentScannerScreen: React.FC = () => {
  const { 
    activePatient, 
    setCurrentScreen, 
    simulateOcrScan, 
    isOcrScanning, 
    removeDocument,
    addScannedDocument
  } = useApp();

  const [activeTab, setActiveTab] = useState<'qr_mobile' | 'kiosk_hardware' | 'presets'>('qr_mobile');
  const [selectedDocForPreview, setSelectedDocForPreview] = useState<MedicalDocument | null>(
    activePatient.documents.length > 0 ? activePatient.documents[0] : null
  );

  // Kiosk Session State
  const [sessionCode] = useState('MK-8824-OPD');
  const [isCopied, setIsCopied] = useState(false);
  const [mobileSyncNotice, setMobileSyncNotice] = useState<string | null>(null);
  const [showMobileSimulator, setShowMobileSimulator] = useState(false);

  // Kiosk Hardware Camera / Webcam State
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Manual Form State
  const [showManualForm, setShowManualForm] = useState(false);
  const [manualTitle, setManualTitle] = useState('');
  const [manualType, setManualType] = useState<DocumentType>('lab_report');
  const [manualClinic, setManualClinic] = useState('Apollo Diagnostics / City Hospital');
  const [manualDate, setManualDate] = useState('Today');
  const [manualParam, setManualParam] = useState('');
  const [manualVal, setManualVal] = useState('');
  const [manualRef, setManualRef] = useState('');

  // Mobile Simulator state
  const [simDocTitle, setSimDocTitle] = useState('');
  const [simDocType, setSimDocType] = useState<DocumentType>('prescription');
  const [isSimUploading, setIsSimUploading] = useState(false);

  useEffect(() => {
    if (activePatient.documents.length > 0 && !selectedDocForPreview) {
      setSelectedDocForPreview(activePatient.documents[0]);
    }
  }, [activePatient.documents, selectedDocForPreview]);

  const triggerMobileSyncNotice = (docName: string) => {
    setMobileSyncNotice(`📲 Received "${docName}" from Mobile Phone! Processing OCR...`);
    setTimeout(() => {
      setMobileSyncNotice(null);
    }, 4500);
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(`https://medikiosk.health/upload?s=${sessionCode}`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleScanPreset = async (templateId: string) => {
    await simulateOcrScan(templateId);
    const found = SAMPLE_SCAN_TEMPLATES.find(t => t.id === templateId);
    if (found) {
      setSelectedDocForPreview(found);
      triggerMobileSyncNotice(found.title);
    }
  };

  const handleDirectFileUpload = (e: React.ChangeEvent<HTMLInputElement>, source: 'Mobile' | 'Kiosk Terminal' = 'Mobile') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newDoc: MedicalDocument = {
      id: `doc-up-${Date.now()}`,
      title: file.name.replace(/\.[^/.]+$/, ''),
      type: file.name.toLowerCase().includes('presc') ? 'prescription' : 'lab_report',
      date: new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date()),
      clinicOrLab: source === 'Mobile' ? 'Uploaded via Patient Smartphone (QR Sync)' : 'Kiosk Terminal USB/Slot',
      ocrConfidence: 0.96,
      ocrText: `SYNCED RECORD: ${file.name}\nSource: ${source} Upload\nTimestamp: ${new Date().toLocaleTimeString()}\nOCR Status: High Confidence Entity Extraction Completed.\nClinical Summary: Patient document scanned and linked to ABHA profile.`,
      entities: [
        { type: 'investigation', text: file.name, confidence: 0.96 }
      ],
      abnormalValues: [],
      isUploadedByPatient: true
    };

    addScannedDocument(newDoc);
    setSelectedDocForPreview(newDoc);
    triggerMobileSyncNotice(newDoc.title);
  };

  const handleSimulatedMobileUpload = (presetName?: string, type: DocumentType = 'prescription') => {
    setIsSimUploading(true);

    setTimeout(() => {
      setIsSimUploading(false);
      setShowMobileSimulator(false);

      const title = presetName || simDocTitle || 'Mobile Prescription Photo';
      const newDoc: MedicalDocument = {
        id: `doc-mob-${Date.now()}`,
        title: title,
        type: type,
        date: 'Today',
        clinicOrLab: 'Uploaded via Smartphone (QR Session MK-8824)',
        ocrConfidence: 0.95,
        ocrText: `MOBILE PHONE SYNC [Session: ${sessionCode}]:\nDocument: ${title}\nCaptured via: Patient Smartphone Camera\nOCR Pipeline: Auto-enhanced, deskewed & parsed.\nEntities: Meds & Diagnoses parsed for clinical intake.`,
        entities: [
          { type: 'medication', text: type === 'prescription' ? 'Metformin 500mg BD' : 'HbA1c Lab Panel', confidence: 0.95 },
          { type: 'diagnosis', text: 'Type 2 Diabetes Mellitus', confidence: 0.93 }
        ],
        abnormalValues: type === 'lab_report' ? [
          {
            parameter: 'Fasting Plasma Glucose',
            value: '184',
            unit: 'mg/dL',
            referenceRange: '70-100',
            status: 'high',
            date: 'Today'
          }
        ] : [],
        isUploadedByPatient: true
      };

      addScannedDocument(newDoc);
      setSelectedDocForPreview(newDoc);
      triggerMobileSyncNotice(title);
      setSimDocTitle('');
    }, 1200);
  };

  const startWebcam = async () => {
    setIsWebcamActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch {
      // If camera blocked in browser environment, keep UI ready
    }
  };

  const captureWebcamSnapshot = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    setIsWebcamActive(false);

    const newDoc: MedicalDocument = {
      id: `doc-kiosk-tray-${Date.now()}`,
      title: `Kiosk Tray Scan - Physical Document`,
      type: 'prescription',
      date: 'Today',
      clinicOrLab: 'Kiosk Optical Bed #2',
      ocrConfidence: 0.94,
      ocrText: `KIOSK OPTICAL TRAY SCAN:\nPhysical document scanned on terminal glass bed.\nRx: Tab. Paracetamol 650mg SOS, Tab. Pantoprazole 40mg OD\nAdv: Low sodium diet, follow-up in 2 weeks.`,
      entities: [
        { type: 'medication', text: 'Paracetamol 650mg', confidence: 0.96 },
        { type: 'medication', text: 'Pantoprazole 40mg', confidence: 0.94 }
      ],
      abnormalValues: [],
      isUploadedByPatient: true
    };

    addScannedDocument(newDoc);
    setSelectedDocForPreview(newDoc);
    triggerMobileSyncNotice('Kiosk Tray Document');
  };

  const handleManualAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualTitle.trim()) return;

    const isAbnormal = parseFloat(manualVal) > (parseFloat(manualRef.split('-')[1]) || 100);

    const newDoc: MedicalDocument = {
      id: `doc-man-${Date.now()}`,
      title: manualTitle,
      type: manualType,
      date: manualDate,
      clinicOrLab: manualClinic,
      ocrConfidence: 1.0,
      ocrText: `MANUAL RECORD: ${manualTitle}\nFacility: ${manualClinic}\nDate: ${manualDate}\nParameter: ${manualParam}: ${manualVal} (Ref: ${manualRef})`,
      entities: [
        { type: 'investigation', text: `${manualParam}: ${manualVal}`, confidence: 1.0 }
      ],
      abnormalValues: manualParam && manualVal ? [
        {
          parameter: manualParam,
          value: manualVal,
          unit: 'mg/dL',
          referenceRange: manualRef || 'Normal',
          status: isAbnormal ? 'high' : 'high',
          date: manualDate
        }
      ] : [],
      isUploadedByPatient: true
    };

    addScannedDocument(newDoc);
    setSelectedDocForPreview(newDoc);
    setShowManualForm(false);
    setManualTitle('');
    setManualParam('');
    setManualVal('');
    triggerMobileSyncNotice(manualTitle);
  };

  const docs = activePatient.documents || [];
  const totalAbnormal = docs.reduce((acc, d) => acc + (d.abnormalValues?.length || 0), 0);
  const totalEntities = docs.reduce((acc, d) => acc + (d.entities?.length || 0), 0);

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-4 space-y-5 sm:space-y-6 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 text-teal-800 border border-teal-200 uppercase tracking-wide">
            Step 5 of 9 • Kiosk Document Digitizer
          </span>
          <h1 className="text-xl font-bold text-slate-900 mt-1 flex items-center space-x-2">
            <span>Medical Document Scanner</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 flex items-center space-x-1">
              <QrCode className="w-3 h-3" />
              <span>Mobile QR Sync</span>
            </span>
          </h1>
          <p className="text-xs text-slate-500">
            Scan the on-screen QR code with your smartphone to upload prescriptions or reports, or use the physical kiosk tray.
          </p>
        </div>

        <div className="flex items-center space-x-2 self-start sm:self-auto">
          <button
            onClick={() => setCurrentScreen('ai-conversation')}
            className="px-3.5 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-xs flex items-center space-x-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
          <button
            onClick={() => setCurrentScreen('timeline')}
            className="px-4 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center space-x-1.5 shadow-sm transition-colors"
          >
            <span>View Timeline</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Live Sync Notification Toast */}
      {mobileSyncNotice && (
        <div className="bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-md flex items-center justify-between text-xs font-bold animate-bounce">
          <div className="flex items-center space-x-2">
            <Smartphone className="w-4 h-4 animate-pulse" />
            <span>{mobileSyncNotice}</span>
          </div>
          <span className="bg-emerald-800 text-emerald-100 px-2 py-0.5 rounded text-[10px] uppercase">Live Sync</span>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Kiosk Upload Hub */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-4">
            
            {/* Mode Tabs */}
            <div className="flex items-center p-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-600">
              <button
                onClick={() => setActiveTab('qr_mobile')}
                className={`flex-1 py-1.5 px-2 rounded-md flex items-center justify-center space-x-1.5 transition-all ${
                  activeTab === 'qr_mobile' 
                    ? 'bg-white text-teal-800 shadow-2xs' 
                    : 'hover:text-slate-900'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Phone QR Upload</span>
              </button>
              <button
                onClick={() => setActiveTab('kiosk_hardware')}
                className={`flex-1 py-1.5 px-2 rounded-md flex items-center justify-center space-x-1.5 transition-all ${
                  activeTab === 'kiosk_hardware' 
                    ? 'bg-white text-teal-800 shadow-2xs' 
                    : 'hover:text-slate-900'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Kiosk Tray Scanner</span>
              </button>
              <button
                onClick={() => setActiveTab('presets')}
                className={`flex-1 py-1.5 px-2 rounded-md flex items-center justify-center space-x-1.5 transition-all ${
                  activeTab === 'presets' 
                    ? 'bg-white text-teal-800 shadow-2xs' 
                    : 'hover:text-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Presets</span>
              </button>
            </div>

            {/* TAB 1: PHONE QR UPLOAD (PRIMARY KIOSK FLOW) */}
            {activeTab === 'qr_mobile' && (
              <div className="space-y-4 animate-fadeIn">
                
                {/* QR Code Container with Scanner Frame */}
                <div className="relative bg-gradient-to-b from-teal-50/60 to-slate-50 p-4 rounded-xl border border-teal-200/80 flex flex-col items-center text-center">
                  
                  {/* Status beacon */}
                  <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-bold text-emerald-800 mb-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>Kiosk Session Live • Waiting for scans</span>
                  </div>

                  {/* High-Tech QR Graphic */}
                  <div className="relative p-3 bg-white rounded-xl shadow-sm border border-slate-200">
                    {/* SVG QR Code Illustration */}
                    <svg
                      className="w-40 h-40 sm:w-44 sm:h-44"
                      viewBox="0 0 200 200"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Background */}
                      <rect width="200" height="200" rx="12" fill="white" />
                      
                      {/* Corner 1: Top-Left */}
                      <rect x="20" y="20" width="46" height="46" rx="6" fill="#0f766e" />
                      <rect x="26" y="26" width="34" height="34" rx="4" fill="white" />
                      <rect x="32" y="32" width="22" height="22" rx="3" fill="#0f766e" />
                      
                      {/* Corner 2: Top-Right */}
                      <rect x="134" y="20" width="46" height="46" rx="6" fill="#0f766e" />
                      <rect x="140" y="26" width="34" height="34" rx="4" fill="white" />
                      <rect x="146" y="32" width="22" height="22" rx="3" fill="#0f766e" />
                      
                      {/* Corner 3: Bottom-Left */}
                      <rect x="20" y="134" width="46" height="46" rx="6" fill="#0f766e" />
                      <rect x="26" y="140" width="34" height="34" rx="4" fill="white" />
                      <rect x="32" y="146" width="22" height="22" rx="3" fill="#0f766e" />

                      {/* Pattern Matrix Pixels */}
                      <g fill="#1e293b">
                        <rect x="76" y="24" width="8" height="8" rx="2" />
                        <rect x="92" y="24" width="16" height="8" rx="2" />
                        <rect x="116" y="24" width="8" height="8" rx="2" />
                        <rect x="76" y="40" width="16" height="8" rx="2" />
                        <rect x="100" y="40" width="8" height="8" rx="2" />
                        <rect x="116" y="40" width="8" height="8" rx="2" />
                        <rect x="84" y="56" width="8" height="8" rx="2" />
                        <rect x="100" y="56" width="24" height="8" rx="2" />

                        {/* Mid section */}
                        <rect x="24" y="76" width="8" height="16" rx="2" />
                        <rect x="40" y="76" width="16" height="8" rx="2" />
                        <rect x="64" y="76" width="8" height="8" rx="2" />
                        <rect x="80" y="76" width="24" height="8" rx="2" />
                        <rect x="112" y="76" width="8" height="16" rx="2" />
                        <rect x="128" y="76" width="16" height="8" rx="2" />
                        <rect x="152" y="76" width="24" height="8" rx="2" />

                        <rect x="24" y="100" width="16" height="8" rx="2" />
                        <rect x="48" y="92" width="8" height="24" rx="2" />
                        <rect x="64" y="100" width="16" height="8" rx="2" />
                        <rect x="88" y="92" width="8" height="16" rx="2" />
                        <rect x="104" y="100" width="16" height="8" rx="2" />
                        <rect x="128" y="92" width="8" height="24" rx="2" />
                        <rect x="144" y="100" width="24" height="8" rx="2" />

                        <rect x="24" y="116" width="8" height="8" rx="2" />
                        <rect x="40" y="116" width="16" height="8" rx="2" />
                        <rect x="64" y="116" width="8" height="8" rx="2" />
                        <rect x="80" y="116" width="32" height="8" rx="2" />
                        <rect x="120" y="116" width="8" height="8" rx="2" />
                        <rect x="136" y="116" width="16" height="8" rx="2" />
                        <rect x="160" y="116" width="16" height="8" rx="2" />

                        {/* Bottom-right section */}
                        <rect x="76" y="134" width="8" height="16" rx="2" />
                        <rect x="92" y="134" width="24" height="8" rx="2" />
                        <rect x="124" y="134" width="16" height="8" rx="2" />
                        <rect x="148" y="134" width="8" height="24" rx="2" />
                        <rect x="164" y="134" width="16" height="8" rx="2" />

                        <rect x="76" y="158" width="16" height="8" rx="2" />
                        <rect x="100" y="150" width="8" height="24" rx="2" />
                        <rect x="116" y="158" width="16" height="8" rx="2" />
                        <rect x="140" y="158" width="8" height="16" rx="2" />
                        <rect x="156" y="158" width="24" height="8" rx="2" />

                        <rect x="76" y="174" width="24" height="8" rx="2" />
                        <rect x="108" y="174" width="8" height="8" rx="2" />
                        <rect x="124" y="174" width="24" height="8" rx="2" />
                        <rect x="156" y="174" width="8" height="8" rx="2" />
                        <rect x="172" y="174" width="8" height="8" rx="2" />
                      </g>

                      {/* Center Hospital Badge */}
                      <circle cx="100" cy="100" r="16" fill="white" stroke="#0f766e" strokeWidth="2.5" />
                      <path d="M100 92 V108 M92 100 H108" stroke="#0f766e" strokeWidth="3" strokeLinecap="round" />
                    </svg>

                    {/* Laser scanning line animation */}
                    <div className="absolute inset-x-3 top-3 h-0.5 bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.8)] animate-bounce opacity-80" />
                  </div>

                  {/* Session PIN info */}
                  <div className="mt-3 flex items-center space-x-2">
                    <span className="text-[11px] text-slate-500 font-medium">Session ID:</span>
                    <span className="text-xs font-mono font-bold bg-white px-2 py-0.5 rounded border border-slate-300 text-slate-800">
                      {sessionCode}
                    </span>
                    <button
                      onClick={handleCopyLink}
                      className="p-1 text-slate-400 hover:text-teal-700 rounded hover:bg-white"
                      title="Copy Mobile Upload Link"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Step list for patient */}
                  <div className="mt-3 text-left w-full space-y-1.5 bg-white/80 p-2.5 rounded-lg border border-teal-100 text-[11px] text-slate-600">
                    <p className="font-bold text-slate-800 text-xs flex items-center space-x-1">
                      <ScanLine className="w-3.5 h-3.5 text-teal-700" />
                      <span>How to upload from your smartphone:</span>
                    </p>
                    <ol className="list-decimal list-inside space-y-0.5 text-slate-600 pl-0.5">
                      <li>Point your phone camera at this QR code.</li>
                      <li>Open the link to launch the instant upload page.</li>
                      <li>Snap photos of prescriptions or attach PDF lab tests.</li>
                      <li>Documents sync to this kiosk screen automatically!</li>
                    </ol>
                  </div>

                  {/* Simulator & Direct Trigger Buttons */}
                  <div className="mt-3.5 flex flex-col sm:flex-row items-center gap-2 w-full">
                    <button
                      onClick={() => setShowMobileSimulator(true)}
                      className="w-full sm:flex-1 py-2 px-3 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-sm flex items-center justify-center space-x-1.5 transition-all"
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>Simulate Mobile Upload</span>
                    </button>

                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={(e) => handleDirectFileUpload(e, 'Mobile')}
                      accept="image/*,application/pdf"
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full sm:w-auto py-2 px-3 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center space-x-1 shadow-2xs"
                      title="Direct file pick for testing"
                    >
                      <Upload className="w-3 h-3 text-slate-500" />
                      <span>Upload File</span>
                    </button>
                  </div>

                </div>

              </div>
            )}

            {/* TAB 2: KIOSK PHYSICAL TRAY SCANNER (HARDWARE) */}
            {activeTab === 'kiosk_hardware' && (
              <div className="space-y-3 animate-fadeIn">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2">
                  <div className="flex items-center space-x-2 font-bold text-slate-800">
                    <Camera className="w-4 h-4 text-teal-700" />
                    <span>Physical Document Optical Bed</span>
                  </div>
                  <p className="text-[11px]">
                    Place your physical prescription card or lab sheet face down on the kiosk glass scanner bed below the screen.
                  </p>
                </div>

                {isWebcamActive ? (
                  <div className="rounded-xl overflow-hidden bg-black relative border-2 border-teal-600">
                    <video ref={videoRef} autoPlay playsInline className="w-full h-48 object-cover" />
                    <div className="absolute bottom-3 inset-x-0 flex items-center justify-center space-x-2">
                      <button
                        onClick={captureWebcamSnapshot}
                        className="px-4 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-md flex items-center space-x-1.5"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>Capture Kiosk Scan</span>
                      </button>
                      <button
                        onClick={() => setIsWebcamActive(false)}
                        className="px-3 py-2 rounded-lg bg-slate-800 text-white font-semibold text-xs"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-5 rounded-xl bg-slate-50 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-center space-y-2.5">
                    <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center">
                      <ScanLine className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Kiosk Hardware Optical Scanner</p>
                      <p className="text-[11px] text-slate-500">Auto-deskew & OCR text extraction enabled</p>
                    </div>
                    <button
                      onClick={startWebcam}
                      className="px-4 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center space-x-1.5 shadow-sm"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Activate Kiosk Camera / Bed</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: PRESETS & MANUAL ENTRY */}
            {activeTab === 'presets' && (
              <div className="space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Sample Clinical Documents
                  </span>
                  <button
                    onClick={() => setShowManualForm(!showManualForm)}
                    className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center space-x-1"
                  >
                    <Edit className="w-3 h-3" />
                    <span>{showManualForm ? 'Close' : 'Manual Entry'}</span>
                  </button>
                </div>

                {showManualForm ? (
                  <form onSubmit={handleManualAdd} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5 text-xs">
                    <div className="flex items-center justify-between font-bold text-slate-800 text-[11px]">
                      <span>Manual Record Input</span>
                      <button type="button" onClick={() => setShowManualForm(false)}><X className="w-3.5 h-3.5" /></button>
                    </div>
                    <input
                      type="text"
                      required
                      value={manualTitle}
                      onChange={(e) => setManualTitle(e.target.value)}
                      placeholder="Document / Test Title (e.g. Lipid Profile)"
                      className="w-full px-2.5 py-1.5 rounded border border-slate-300 bg-white"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={manualParam}
                        onChange={(e) => setManualParam(e.target.value)}
                        placeholder="Parameter (e.g. HbA1c)"
                        className="w-full px-2.5 py-1.5 rounded border border-slate-300 bg-white"
                      />
                      <input
                        type="text"
                        value={manualVal}
                        onChange={(e) => setManualVal(e.target.value)}
                        placeholder="Value (e.g. 9.4%)"
                        className="w-full px-2.5 py-1.5 rounded border border-slate-300 bg-white font-bold"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-1.5 bg-teal-700 hover:bg-teal-800 text-white rounded font-bold text-xs"
                    >
                      Attach Record to Kiosk
                    </button>
                  </form>
                ) : (
                  <div className="space-y-2">
                    {SAMPLE_SCAN_TEMPLATES.map(tpl => (
                      <button
                        key={tpl.id}
                        onClick={() => handleScanPreset(tpl.id)}
                        disabled={isOcrScanning}
                        className="w-full text-left p-2.5 rounded-lg border border-slate-200 hover:border-teal-500 hover:bg-teal-50/50 transition-all flex items-center justify-between group"
                      >
                        <div className="flex items-center space-x-2.5">
                          <FileText className="w-4 h-4 text-slate-400 group-hover:text-teal-700 shrink-0" />
                          <div>
                            <p className="text-xs font-semibold text-slate-800 group-hover:text-teal-900 line-clamp-1">
                              {tpl.title}
                            </p>
                            <p className="text-[10px] text-slate-500">
                              {tpl.clinicOrLab} • {tpl.date}
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-teal-700 bg-white border border-teal-200 px-2 py-0.5 rounded shrink-0 flex items-center space-x-1">
                          <Plus className="w-3 h-3" />
                          <span>Add</span>
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {isOcrScanning && (
              <div className="w-full py-2.5 px-3 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center space-x-2 text-teal-800 text-xs font-bold animate-pulse">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Running clinical OCR & medical NER parser...</span>
              </div>
            )}

          </div>

          {/* Scanned Badge Summary */}
          <div className="bg-slate-900 text-white rounded-xl p-4 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Digitized Documents</span>
              <span className="font-bold text-teal-400">{docs.length} files attached</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Extracted Clinical Entities</span>
              <span className="font-bold text-emerald-400">{totalEntities} entities</span>
            </div>
            {totalAbnormal > 0 && (
              <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800">
                <span className="text-red-300 font-medium flex items-center space-x-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                  <span>Abnormal Lab Flags</span>
                </span>
                <span className="font-bold text-red-400">{totalAbnormal} flagged out-of-range</span>
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Record Timeline & OCR text */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-teal-700" />
                  <span>Chronological Medical Record Timeline</span>
                </h2>
                <p className="text-[11px] text-slate-500">
                  Automatically ordered and structured for physician review
                </p>
              </div>

              {docs.length > 0 && (
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{docs.length} Active Files</span>
                </span>
              )}
            </div>

            {docs.length === 0 ? (
              <div className="text-center py-12 px-4 rounded-xl bg-slate-50 border border-dashed border-slate-200 space-y-3">
                <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center mx-auto">
                  <Smartphone className="w-6 h-6 text-teal-700" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">No medical records uploaded yet</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                    Scan the QR code with your mobile phone or click "Simulate Mobile Upload" to test the instant sync.
                  </p>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => setShowMobileSimulator(true)}
                    className="py-2 px-4 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs transition-colors inline-flex items-center space-x-1.5 shadow-sm"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Open Mobile Simulator</span>
                  </button>
                  <button
                    onClick={() => handleScanPreset(SAMPLE_SCAN_TEMPLATES[0].id)}
                    className="py-2 px-3 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold text-xs"
                  >
                    <span>Load Sample Report</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                
                <div className="space-y-3">
                  {docs.map((doc) => {
                    const isSelected = selectedDocForPreview?.id === doc.id;
                    const isFromMobile = doc.clinicOrLab?.toLowerCase().includes('phone') || doc.clinicOrLab?.toLowerCase().includes('mobile') || doc.clinicOrLab?.toLowerCase().includes('qr');

                    return (
                      <div 
                        key={doc.id}
                        className={`rounded-xl border transition-all p-4 ${
                          isSelected 
                            ? 'border-teal-600 bg-teal-50/30 ring-1 ring-teal-600' 
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          
                          <div className="flex items-start space-x-3">
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 font-bold ${
                              isFromMobile ? 'bg-teal-100 text-teal-800' : 'bg-slate-100 text-slate-700'
                            }`}>
                              {isFromMobile ? <Smartphone className="w-5 h-5" /> : <FileCheck2 className="w-5 h-5" />}
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <h4 className="text-xs font-bold text-slate-900">{doc.title}</h4>
                                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 uppercase">
                                  {doc.type.replace('_', ' ')}
                                </span>
                                {isFromMobile && (
                                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-teal-100 text-teal-800 flex items-center space-x-0.5">
                                    <Smartphone className="w-2.5 h-2.5" />
                                    <span>Phone Sync</span>
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-500 flex items-center space-x-3 mt-0.5">
                                <span className="flex items-center space-x-1">
                                  <Building2 className="w-3 h-3 text-slate-400" />
                                  <span>{doc.clinicOrLab}</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                  <Calendar className="w-3 h-3 text-slate-400" />
                                  <span>{doc.date}</span>
                                </span>
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 self-end sm:self-auto">
                            <button
                              onClick={() => setSelectedDocForPreview(doc)}
                              className={`px-2.5 py-1 rounded text-xs font-bold flex items-center space-x-1 transition-colors ${
                                isSelected 
                                  ? 'bg-teal-700 text-white' 
                                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                              }`}
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View OCR</span>
                            </button>
                            <button
                              onClick={() => removeDocument(doc.id)}
                              className="p-1 rounded text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                              title="Delete document"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                        </div>

                        {/* Abnormal Values Callout */}
                        {doc.abnormalValues && doc.abnormalValues.length > 0 && (
                          <div className="mt-3 p-2.5 rounded-lg bg-red-50 border border-red-200 space-y-1.5">
                            <div className="flex items-center space-x-1.5 text-red-900 text-xs font-bold">
                              <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                              <span>Critical / Out of Range Lab Parameters</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                              {doc.abnormalValues.map((ab, i) => (
                                <div key={i} className="flex items-center justify-between p-1.5 bg-white rounded border border-red-100">
                                  <span className="font-semibold text-slate-800">{ab.parameter}</span>
                                  <span className="font-bold text-red-700 bg-red-100 px-1.5 py-0.2 rounded">
                                    {ab.value} {ab.unit} ({ab.status.toUpperCase()})
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Extracted Entities Chips */}
                        {doc.entities && doc.entities.length > 0 && (
                          <div className="mt-2.5 flex flex-wrap gap-1.5">
                            {doc.entities.map((ent, i) => (
                              <span 
                                key={i} 
                                className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-800 border border-slate-200"
                              >
                                <span className="font-bold text-slate-500 uppercase">{ent.type}:</span>
                                <span>{ent.text}</span>
                              </span>
                            ))}
                          </div>
                        )}

                      </div>
                    );
                  })}
                </div>

                {/* Selected Document OCR Raw Inspector */}
                {selectedDocForPreview && (
                  <div className="mt-4 p-4 rounded-xl bg-slate-900 text-slate-100 space-y-2 border border-slate-800">
                    <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                      <span className="font-bold text-teal-400 flex items-center space-x-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>OCR Extracted Text ({selectedDocForPreview.title})</span>
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        Confidence: {(selectedDocForPreview.ocrConfidence * 100).toFixed(0)}%
                      </span>
                    </div>
                    <pre className="font-mono text-[11px] leading-relaxed text-slate-300 whitespace-pre-wrap max-h-48 overflow-y-auto bg-slate-950 p-3 rounded-lg border border-slate-800">
                      {selectedDocForPreview.ocrText}
                    </pre>
                  </div>
                )}

              </div>
            )}

          </div>

          {/* Bottom Navigation */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setCurrentScreen('ai-conversation')}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-xs flex items-center space-x-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to AI Intake</span>
            </button>

            <button
              onClick={() => setCurrentScreen('timeline')}
              className="px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center space-x-2 shadow-sm transition-all"
            >
              <span>View Longitudinal Timeline (Step 6)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

      {/* MOBILE COMPANION UPLOAD SIMULATOR MODAL */}
      {showMobileSimulator && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-300 max-w-sm w-full overflow-hidden flex flex-col">
            
            {/* Phone Top Notch / Status Bar */}
            <div className="bg-slate-900 text-white px-4 py-2 flex items-center justify-between text-[11px] font-mono">
              <span className="font-bold flex items-center space-x-1">
                <Smartphone className="w-3.5 h-3.5 text-teal-400" />
                <span>Patient Phone Portal</span>
              </span>
              <div className="flex items-center space-x-2 text-slate-400">
                <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                <span>Session: {sessionCode}</span>
                <button 
                  onClick={() => setShowMobileSimulator(false)}
                  className="text-slate-400 hover:text-white ml-2"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Mobile View Content */}
            <div className="p-4 space-y-4 bg-slate-50">
              <div className="text-center space-y-1">
                <div className="inline-flex p-2 bg-teal-100 text-teal-800 rounded-full">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">MediKiosk Mobile Uploader</h3>
                <p className="text-[11px] text-slate-500">
                  Connected securely to Kiosk Terminal #{sessionCode}
                </p>
              </div>

              {/* Quick Actions */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-700">Quick Upload Presets:</label>
                <div className="grid grid-cols-1 gap-2">
                  <button
                    disabled={isSimUploading}
                    onClick={() => handleSimulatedMobileUpload('Dr. Lal Pathlabs - Comprehensive Blood Panel', 'lab_report')}
                    className="p-2.5 rounded-lg bg-white border border-slate-200 hover:border-teal-600 hover:bg-teal-50 text-left flex items-center justify-between text-xs group"
                  >
                    <div>
                      <p className="font-bold text-slate-800 group-hover:text-teal-900">Dr. Lal Pathlabs Blood Report</p>
                      <p className="text-[10px] text-slate-500">HbA1c, Fasting Glucose, Creatinine</p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-teal-700" />
                  </button>

                  <button
                    disabled={isSimUploading}
                    onClick={() => handleSimulatedMobileUpload('AIIMS New Delhi - Prior OPD Prescription', 'prescription')}
                    className="p-2.5 rounded-lg bg-white border border-slate-200 hover:border-teal-600 hover:bg-teal-50 text-left flex items-center justify-between text-xs group"
                  >
                    <div>
                      <p className="font-bold text-slate-800 group-hover:text-teal-900">AIIMS Medicine Prescription</p>
                      <p className="text-[10px] text-slate-500">Amlodipine 5mg, Pantoprazole 40mg</p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-teal-700" />
                  </button>
                </div>
              </div>

              {/* Custom Upload on Phone */}
              <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2.5">
                <span className="text-[11px] font-bold text-slate-700">Or Capture / Upload Custom File:</span>
                <input
                  type="text"
                  value={simDocTitle}
                  onChange={(e) => setSimDocTitle(e.target.value)}
                  placeholder="Document Name (e.g. ECG Slip / Scan)"
                  className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-300"
                />
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSimDocType('prescription')}
                    className={`py-1 rounded text-[11px] font-bold border ${
                      simDocType === 'prescription' ? 'bg-teal-50 border-teal-600 text-teal-800' : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    Prescription
                  </button>
                  <button
                    type="button"
                    onClick={() => setSimDocType('lab_report')}
                    className={`py-1 rounded text-[11px] font-bold border ${
                      simDocType === 'lab_report' ? 'bg-teal-50 border-teal-600 text-teal-800' : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    Lab Report
                  </button>
                </div>
                <button
                  disabled={isSimUploading}
                  onClick={() => handleSimulatedMobileUpload()}
                  className="w-full py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg font-bold text-xs flex items-center justify-center space-x-1.5 shadow-sm"
                >
                  {isSimUploading ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Syncing to Kiosk...</span>
                    </>
                  ) : (
                    <>
                      <Camera className="w-3.5 h-3.5" />
                      <span>Snap & Sync to Kiosk</span>
                    </>
                  )}
                </button>
              </div>

            </div>

            {/* Footer */}
            <div className="p-3 bg-slate-100 text-center border-t border-slate-200">
              <p className="text-[10px] text-slate-500">
                Encrypted via ABDM Health Information Exchange Protocol
              </p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
