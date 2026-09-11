import React, { useState } from 'react';
import { 
  X, 
  Layers, 
  Mic, 
  Cpu, 
  ShieldAlert, 
  FileText, 
  Network, 
  CheckCircle2, 
  ChevronRight, 
  Stethoscope, 
  Globe2, 
  Camera, 
  ScanLine, 
  Brain, 
  FileCode2, 
  Database,
  Info
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ArchitectureModal: React.FC = () => {
  const { isArchitectureModalOpen, setIsArchitectureModalOpen } = useApp();
  const [selectedLayer, setSelectedLayer] = useState<number>(0);

  if (!isArchitectureModalOpen) return null;

  const layers = [
    {
      id: 1,
      title: 'Layer 1: Multimodal Intake & Acquisition',
      shortTitle: '1. Multimodal Intake',
      icon: Mic,
      color: 'teal',
      badge: 'Edge & Kiosk Terminal',
      description: 'Captures unstructured natural patient history across 10 Indic languages, guided touch questionnaires, and camera-based document digitization.',
      components: [
        {
          name: 'Indic Speech Input (ASR)',
          desc: 'Acoustic-to-text pipeline supporting Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam, Punjabi & English with dialect tolerance.'
        },
        {
          name: 'Guided Touch Fallback',
          desc: 'High-contrast, large-touch interface for noisy OPD lobbies or non-verbal patients with SOCRATES anatomical symptom maps.'
        },
        {
          name: 'Optical Document Scanner & OCR',
          desc: 'Multi-resolution camera digitization for handwritten prescriptions, lab test reports, discharge summaries, and radiology slips.'
        },
        {
          name: 'ABHA & Patient Identity',
          desc: 'Instant demographic retrieval via 14-digit ABHA ID, QR scan, or mobile OTP verification.'
        }
      ]
    },
    {
      id: 2,
      title: 'Layer 2: Clinical Language & Vision Intelligence',
      shortTitle: '2. Intelligence & OCR',
      icon: Brain,
      color: 'indigo',
      badge: 'AI & Inference Engine',
      description: 'Transforms raw acoustic waveforms and document images into structured clinical entities, negation flags, and semantic transcripts.',
      components: [
        {
          name: 'Conversational SOCRATES Engine',
          desc: 'Dynamic questioning model adhering strictly to Site, Onset, Character, Radiation, Associations, Time course, Exacerbating factors, and Severity.'
        },
        {
          name: 'Clinical Named Entity Recognition (NER)',
          desc: 'Identifies symptoms, durations, medications, anatomical locations, dosages, and drug allergies from colloquial speech.'
        },
        {
          name: 'Contextual Negation Detection',
          desc: 'Accurately distinguishes between positive symptoms and denied red flags (e.g. "no chest pain", "no breathlessness").'
        },
        {
          name: 'Vision-Language OCR & Lab Normalizer',
          desc: 'Extracts lab test names, numeric values, reference bounds, and flags abnormal out-of-range clinical parameters.'
        }
      ]
    },
    {
      id: 3,
      title: 'Layer 3: Clinical Processing & Dual-Path Reasoning',
      shortTitle: '3. Clinical Processing',
      icon: Cpu,
      color: 'purple',
      badge: 'Clinical Core & Safety',
      description: 'Harmonizes unstructured history into longitudinal timelines, evaluates red flags, and supports both Allopathic and AYUSH clinical paradigms.',
      components: [
        {
          name: 'Real-Time Red Flag Triage Safety',
          desc: 'Monitors acute emergencies (chest pain, severe dyspnea, stroke signs) to halt intake and trigger nurse dispatch instantly.'
        },
        {
          name: 'Longitudinal Timeline Synthesizer',
          desc: 'Orders prior hospitalizations, past prescriptions, and lab trends into a chronological medical history graph.'
        },
        {
          name: 'Dual-Path Framework (Allopathy + AYUSH)',
          desc: 'Routes to General Medicine (SOAP schema) or AYUSH (Dashavidha Pariksha, Ahara-Vihara, Prakriti/Vikriti, Agni assessment).'
        },
        {
          name: 'Ontology Mapping',
          desc: 'Semantic mapping to ICD-10, SNOMED-CT, and NAMASTE (National AYUSH Morbidity Codes).'
        }
      ]
    },
    {
      id: 4,
      title: 'Layer 4: Output Synthesis & Presentation Layer',
      shortTitle: '4. Clinical Synthesis',
      icon: FileText,
      color: 'amber',
      badge: 'Physician Workstation & Kiosk Slip',
      description: 'Generates concise 13-section physician summaries, patient printouts, missing info checklists, and verifiable audit trails.',
      components: [
        {
          name: '13-Section Structured Summary',
          desc: 'Standardized clinical brief covering Chief Complaint, HPI, Review of Systems, Medications, Allergies, and Lab Highlights.'
        },
        {
          name: 'Information Gap & Red-Flag Alerts',
          desc: 'Explicit checklist of missing patient history elements and highlighted clinical alerts for rapid doctor review.'
        },
        {
          name: 'Verbatim Bilingual Audit Transcript',
          desc: 'Side-by-side original Indic speech transcription and English clinical translation with audio playback.'
        },
        {
          name: 'Patient Intake Token Slip',
          desc: 'Printed thermal slip with queue token, department, verified chief complaint, and doctor room routing.'
        }
      ]
    },
    {
      id: 5,
      title: 'Layer 5: Healthcare Integration & Physician Governance',
      shortTitle: '5. Interoperability & EMR',
      icon: Network,
      color: 'emerald',
      badge: 'ABDM & HIS Standards',
      description: 'Strict non-diagnostic workflow where the licensed physician reviews, edits, signs, and pushes records to hospital HIS and ABDM.',
      components: [
        {
          name: 'Physician Validation & Sign-Off',
          desc: 'Sole clinical authority: doctor reviews structured narrative, edits differential notes, issues e-Prescription, and signs chart.'
        },
        {
          name: 'HL7 FHIR R4 Bundle Generation',
          desc: 'Interoperable FHIR Bundle containing Patient, Encounter, Condition, Observation, AllergyIntolerance, and MedicationStatement resources.'
        },
        {
          name: 'ABDM / Ayushman Bharat Gateway',
          desc: 'Enables longitudinal health record sharing via ABDM consent manager and Health Information Provider (HIP) network.'
        },
        {
          name: 'Hospital Information System (HIS) API',
          desc: 'REST/HL7 bidirectional connector syncing queue wait times, doctor room status, and OPD consultation logs.'
        }
      ]
    }
  ];

  const current = layers[selectedLayer];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-slate-200 relative my-6 flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center font-bold text-white shadow-sm">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold tracking-tight">MediKiosk 5-Layer Technical Architecture</h2>
                <span className="px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 text-[10px] font-bold border border-teal-400/30">
                  SIH26047 Solution Design
                </span>
              </div>
              <p className="text-xs text-slate-300">
                End-to-end clinical intake, Indic intelligence, safety triage & ABDM/FHIR integration
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsArchitectureModalOpen(false)}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SIH Narrative Flow Banner */}
        <div className="px-5 py-2.5 bg-teal-50 border-b border-teal-200 flex items-center justify-between text-xs overflow-x-auto">
          <div className="flex items-center space-x-1.5 text-teal-950 font-semibold shrink-0">
            <span className="text-[10px] uppercase tracking-wider font-bold text-teal-800">Core Workflow:</span>
            <span className="px-2 py-0.5 rounded bg-white border border-teal-300 font-mono text-[11px]">IDENTIFY</span>
            <ChevronRight className="w-3 h-3 text-teal-500" />
            <span className="px-2 py-0.5 rounded bg-white border border-teal-300 font-mono text-[11px]">CONVERSE</span>
            <ChevronRight className="w-3 h-3 text-teal-500" />
            <span className="px-2 py-0.5 rounded bg-white border border-teal-300 font-mono text-[11px]">SCAN</span>
            <ChevronRight className="w-3 h-3 text-teal-500" />
            <span className="px-2 py-0.5 rounded bg-white border border-teal-300 font-mono text-[11px]">STRUCTURE</span>
            <ChevronRight className="w-3 h-3 text-teal-500" />
            <span className="px-2 py-0.5 rounded bg-white border border-teal-300 font-mono text-[11px]">CONSULT</span>
            <ChevronRight className="w-3 h-3 text-teal-500" />
            <span className="px-2 py-0.5 rounded bg-white border border-teal-300 font-mono text-[11px]">INTEGRATE</span>
          </div>
          <div className="text-[11px] text-teal-800 font-medium pl-3 shrink-0 hidden md:block">
            Doctor retains 100% clinical authority
          </div>
        </div>

        {/* Body Content */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
          
          {/* Layer Selector (Left Rail on Desktop, Top Scrollable Strip on Mobile) */}
          <div className="md:col-span-4 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 p-2 sm:p-3 flex md:flex-col gap-1.5 md:space-y-1.5 overflow-x-auto md:overflow-y-auto shrink-0 scrollbar-none">
            <span className="hidden md:block text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-1">
              Architecture Layers
            </span>
            {layers.map((layer, idx) => {
              const isSelected = selectedLayer === idx;
              return (
                <button
                  key={layer.id}
                  onClick={() => setSelectedLayer(idx)}
                  className={`shrink-0 min-w-[140px] md:min-w-0 md:w-full text-left p-2 sm:p-3 rounded-xl transition-all flex items-start space-x-2 sm:space-x-3 ${
                    isSelected
                      ? 'bg-white text-slate-900 shadow-sm border border-slate-200 ring-1 ring-teal-700'
                      : 'text-slate-600 hover:bg-slate-100/80 border border-transparent'
                  }`}
                >
                  <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center shrink-0 text-white font-bold text-xs ${
                    isSelected ? 'bg-teal-700' : 'bg-slate-400'
                  }`}>
                    {layer.id}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold truncate">{layer.shortTitle}</div>
                    <div className="text-[10px] text-slate-500 truncate hidden sm:block">{layer.badge}</div>
                  </div>
                  {isSelected && <ChevronRight className="w-4 h-4 text-teal-700 shrink-0 self-center hidden md:block" />}
                </button>
              );
            })}

            {/* Judging Key Note (Desktop Only) */}
            <div className="hidden md:block mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] space-y-1">
              <div className="flex items-center space-x-1 font-bold text-xs">
                <Info className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span>Judging Note</span>
              </div>
              <p className="leading-relaxed text-[10px]">
                MediKiosk strictly captures and structures history. It is engineered with guardrails to never formulate autonomous diagnoses.
              </p>
            </div>
          </div>

          {/* Layer Detail View (Right Panel) */}
          <div className="md:col-span-8 p-3.5 sm:p-5 overflow-y-auto space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-bold text-teal-800 uppercase tracking-wider">
                  {current.badge}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">{current.title}</h3>
              </div>
              <span className="px-2 py-1 rounded bg-teal-50 text-teal-800 border border-teal-200 text-xs font-mono font-bold">
                Layer 0{current.id}
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
              {current.description}
            </p>

            <div className="space-y-2.5">
              <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
                <Cpu className="w-3.5 h-3.5 text-teal-700" />
                <span>Key Subsystems & Algorithms</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {current.components.map((comp, i) => (
                  <div key={i} className="p-3 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors shadow-2xs space-y-1">
                    <div className="flex items-center space-x-1.5 font-bold text-xs text-slate-900">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span>{comp.name}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed pl-5">
                      {comp.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Interoperability Footnote */}
            <div className="p-3 rounded-xl bg-slate-900 text-slate-200 text-xs space-y-1.5">
              <div className="flex items-center space-x-1.5 text-teal-400 font-bold text-xs">
                <FileCode2 className="w-3.5 h-3.5" />
                <span>Interoperability & Clinical Standards Compliance</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed font-mono">
                Payload Format: HL7 FHIR Release 4 • Vocabularies: SNOMED CT, LOINC, ICD-10-CM, NAMASTE • Security: AES-256 at Rest, TLS 1.3 in Transit • Privacy: Consent-Artifact driven ABDM architecture.
              </p>
            </div>

          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
          <div className="text-slate-500 text-[11px]">
            TechHorizon • SIH 2026 Problem SIH26047
          </div>
          <button
            onClick={() => setIsArchitectureModalOpen(false)}
            className="px-4 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs transition-colors shadow-2xs"
          >
            Close Architecture
          </button>
        </div>

      </div>
    </div>
  );
};
