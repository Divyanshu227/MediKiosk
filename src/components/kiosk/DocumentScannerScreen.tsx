import React, { useState } from 'react';
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
  Plus
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SAMPLE_SCAN_TEMPLATES } from '../../data/mockData';
import { MedicalDocument } from '../../types';

export const DocumentScannerScreen: React.FC = () => {
  const { 
    activePatient, 
    setCurrentScreen, 
    simulateOcrScan, 
    isOcrScanning, 
    removeDocument 
  } = useApp();

  const [selectedDocForPreview, setSelectedDocForPreview] = useState<MedicalDocument | null>(
    activePatient.documents.length > 0 ? activePatient.documents[0] : null
  );

  const handleScanSample = async (templateId: string) => {
    await simulateOcrScan(templateId);
    // Auto preview latest
    const found = SAMPLE_SCAN_TEMPLATES.find(t => t.id === templateId);
    if (found) setSelectedDocForPreview(found);
  };

  const docs = activePatient.documents || [];
  const totalAbnormal = docs.reduce((acc, d) => acc + (d.abnormalValues?.length || 0), 0);
  const totalEntities = docs.reduce((acc, d) => acc + (d.entities?.length || 0), 0);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-teal-50 text-teal-800 border border-teal-200 uppercase tracking-wide">
              Step 3 of 4 • Document AI
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Bhashini & Indic-OCR Engine
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900">
            Medical Document Digitization & OCR Intelligence
          </h1>
          <p className="text-xs text-slate-600">
            Scan or upload your previous doctor prescriptions, laboratory reports, or hospital discharge summaries.
          </p>
        </div>

        <div className="flex items-center space-x-2 self-start sm:self-auto">
          <button
            onClick={() => setCurrentScreen('ai-conversation')}
            className="px-3.5 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 font-medium text-xs flex items-center space-x-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
          <button
            onClick={() => setCurrentScreen('review')}
            className="px-4 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs flex items-center space-x-1.5 shadow-sm transition-colors"
          >
            <span>Continue to Review</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Grid: Upload & Scanner Panel on Left, Digitized OCR Intelligence on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Upload / Scanner Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Scan Capture Box */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                <Camera className="w-4 h-4 text-teal-700" />
                <span>Kiosk Document Scanner</span>
              </h2>
              <span className="text-[11px] text-teal-700 font-semibold bg-teal-50 px-2 py-0.5 rounded">
                High-Res OCR Active
              </span>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Place document on scanner glass or upload file</p>
                <p className="text-[11px] text-slate-500">Supports Hindi, English, printed & handwritten scripts</p>
              </div>
              
              {isOcrScanning ? (
                <div className="w-full py-2.5 px-3 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center space-x-2 text-teal-800 text-xs font-semibold animate-pulse">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Processing OCR & Extracting Clinical Entities...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2 pt-1 w-full">
                  <button
                    onClick={() => handleScanSample(SAMPLE_SCAN_TEMPLATES[0].id)}
                    className="flex-1 py-2 px-3 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs transition-colors flex items-center justify-center space-x-1.5"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Scan New Document</span>
                  </button>
                </div>
              )}
            </div>

            {/* Quick Demo Scan Templates */}
            <div className="space-y-2 pt-1">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Quick Demo: Instant Scan Presets
              </p>
              <div className="space-y-1.5">
                {SAMPLE_SCAN_TEMPLATES.map(tpl => (
                  <button
                    key={tpl.id}
                    onClick={() => handleScanSample(tpl.id)}
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
                    <span className="text-[10px] font-bold text-teal-700 bg-white border border-teal-200 px-2 py-0.5 rounded shadow-2xs shrink-0 flex items-center space-x-1">
                      <Plus className="w-3 h-3" />
                      <span>Scan</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Scanned Docs Badge Summary */}
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

        {/* Right Column: Digitized Medical Timeline & OCR Intelligence (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-teal-700" />
                  <span>Chronological Medical Record Timeline</span>
                </h2>
                <p className="text-[11px] text-slate-500">
                  Automatically extracted and structured for physician review
                </p>
              </div>

              {docs.length > 0 && (
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{docs.length} Active Records</span>
                </span>
              )}
            </div>

            {docs.length === 0 ? (
              <div className="text-center py-12 px-4 rounded-xl bg-slate-50 border border-dashed border-slate-200 space-y-3">
                <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center mx-auto">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">No medical documents scanned yet</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                    You can scan your prior lab reports, prescriptions, or discharge slips now, or continue directly to doctor review.
                  </p>
                </div>
                <button
                  onClick={() => handleScanSample(SAMPLE_SCAN_TEMPLATES[0].id)}
                  className="py-2 px-4 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs transition-colors inline-flex items-center space-x-1.5"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Scan Sample Blood Report</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                
                {/* Document List */}
                <div className="space-y-3">
                  {docs.map((doc, idx) => {
                    const isSelected = selectedDocForPreview?.id === doc.id;

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
                            <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 text-teal-800 flex items-center justify-center shrink-0 mt-0.5">
                              <FileCheck2 className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <h4 className="text-xs font-bold text-slate-900">{doc.title}</h4>
                                <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 uppercase">
                                  {doc.type.replace('_', ' ')}
                                </span>
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
                              className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center space-x-1 transition-colors ${
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
                              <span>Critical / Abnormal Parameters Detected</span>
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
                        <span>OCR Extracted Text & NLP Analysis ({selectedDocForPreview.title})</span>
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

          {/* Bottom Action Bar */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setCurrentScreen('ai-conversation')}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-medium text-xs flex items-center space-x-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Voice Intake</span>
            </button>

            <button
              onClick={() => setCurrentScreen('review')}
              className="px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center space-x-2 shadow-sm transition-all"
            >
              <span>Review Complete Intake (Step 4)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
