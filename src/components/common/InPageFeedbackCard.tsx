import React, { useState } from 'react';
import { 
  Star, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  MessageSquare, 
  Heart, 
  ThumbsUp, 
  Stethoscope, 
  Smartphone, 
  ChevronDown, 
  ChevronUp, 
  RotateCcw,
  BadgeCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

export interface FeedbackData {
  id: string;
  type: 'patient' | 'doctor';
  rating: number;
  tags: string[];
  comment: string;
  timestamp: string;
  targetUser?: string;
  targetToken?: string;
}

interface InPageFeedbackCardProps {
  type: 'patient' | 'doctor';
  patientName?: string;
  tokenNumber?: string;
  doctorName?: string;
  className?: string;
  defaultExpanded?: boolean;
}

const PATIENT_TAGS = [
  '✨ Easy Touchscreen UI',
  '🎙️ Great Voice & Language Support',
  '📱 Fast Mobile QR Upload',
  '⚡ Saved 30+ Mins in Queue',
  '🧾 Clear Token & Instructions',
  '🔊 Clear Audio Guidance',
  '⚠️ Voice spoke too fast',
  '⚠️ Need larger text size'
];

const DOCTOR_TAGS = [
  '🩺 Spot-on Chief Complaint',
  '📊 Accurate OCR Lab Extraction',
  '⏱️ Saved 5-10 Mins per Patient',
  '🌿 Precise AYUSH Dashavidha',
  '🛡️ Reliable Red-Flag Triage',
  '📝 Structured SOAP Summary',
  '⚠️ Need shorter summary',
  '⚠️ Missed subtle symptom detail'
];

const RATING_DESCRIPTIONS = {
  patient: [
    { label: 'Select Rating', emoji: '✨', color: 'text-slate-400' },
    { label: 'Difficult / Confusing', emoji: '😡', color: 'text-red-500' },
    { label: 'Needs Improvement', emoji: '🙁', color: 'text-orange-500' },
    { label: 'Okay / Average', emoji: '😐', color: 'text-amber-500' },
    { label: 'Smooth & Easy', emoji: '😊', color: 'text-teal-600' },
    { label: 'Super Fast & Intuitive!', emoji: '🤩', color: 'text-emerald-600' }
  ],
  doctor: [
    { label: 'Select Rating', emoji: '🩺', color: 'text-slate-400' },
    { label: 'Inaccurate / Incomplete', emoji: '😡', color: 'text-red-500' },
    { label: 'Missing Key Clinical Context', emoji: '🙁', color: 'text-orange-500' },
    { label: 'Acceptable Baseline', emoji: '😐', color: 'text-amber-500' },
    { label: 'High Clinical Precision', emoji: '😊', color: 'text-teal-600' },
    { label: 'Exceptional Summary / Saved 10+ Mins', emoji: '🤩', color: 'text-emerald-600' }
  ]
};

export const InPageFeedbackCard: React.FC<InPageFeedbackCardProps> = ({
  type,
  patientName,
  tokenNumber,
  doctorName,
  className = '',
  defaultExpanded = true
}) => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const activeRating = hoverRating !== null ? hoverRating : rating;
  const ratingInfo = RATING_DESCRIPTIONS[type][activeRating] || RATING_DESCRIPTIONS[type][0];
  const availableTags = type === 'patient' ? PATIENT_TAGS : DOCTOR_TAGS;

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(prev => prev.filter(t => t !== tag));
    } else {
      setSelectedTags(prev => [...prev, tag]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.8 },
        colors: type === 'patient' ? ['#0d9488', '#14b8a6', '#f59e0b', '#10b981'] : ['#0284c7', '#0f766e', '#6366f1', '#10b981']
      });
    } catch {
      // Ignore if confetti fails
    }

    const feedbackEntry: FeedbackData = {
      id: `fb-${Date.now()}`,
      type,
      rating,
      tags: selectedTags,
      comment: comment.trim(),
      timestamp: new Date().toISOString(),
      targetUser: type === 'patient' ? patientName : doctorName,
      targetToken: tokenNumber
    };

    try {
      const existing = JSON.parse(localStorage.getItem('medikiosk_feedback_history') || '[]');
      localStorage.setItem('medikiosk_feedback_history', JSON.stringify([feedbackEntry, ...existing]));
    } catch {
      // LocalStorage fallback
    }

    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setRating(5);
    setSelectedTags([]);
    setComment('');
  };

  return (
    <div className={`rounded-2xl border transition-all overflow-hidden ${
      type === 'patient' 
        ? 'bg-gradient-to-br from-white via-teal-50/30 to-amber-50/20 border-teal-200 shadow-sm' 
        : 'bg-gradient-to-br from-white via-slate-50 to-teal-50/30 border-slate-200 shadow-sm'
    } ${className}`}>
      
      {/* Top Header / Accordion Bar */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className={`p-3.5 sm:p-4 flex items-center justify-between cursor-pointer select-none transition-colors ${
          type === 'patient' ? 'hover:bg-teal-50/50' : 'hover:bg-slate-100/60'
        }`}
      >
        <div className="flex items-center space-x-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold shrink-0 shadow-2xs ${
            type === 'patient' ? 'bg-teal-700 text-white' : 'bg-slate-900 text-teal-300'
          }`}>
            {type === 'patient' ? <Sparkles className="w-4 h-4" /> : <Stethoscope className="w-4 h-4" />}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                type === 'patient' 
                  ? 'bg-teal-100 text-teal-800 border-teal-200' 
                  : 'bg-slate-200 text-slate-800 border-slate-300'
              }`}>
                {type === 'patient' ? 'Patient Experience Rating' : 'Physician Clinical Evaluation'}
              </span>
              {isSubmitted && (
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.2 rounded border border-emerald-200 flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Submitted</span>
                </span>
              )}
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">
              {type === 'patient' 
                ? 'How was your Kiosk Experience today?' 
                : 'Evaluate AI Clinical Intake & SOAP Synthesis'}
            </h3>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {isSubmitted ? (
            <div className="flex items-center space-x-1 text-amber-500 font-bold text-xs bg-amber-50 px-2 py-1 rounded-lg border border-amber-200">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{rating}/5</span>
            </div>
          ) : (
            <span className="text-[11px] font-semibold text-slate-400 hidden sm:inline">
              Zomato-Style 1-Tap Feedback
            </span>
          )}
          <button type="button" className="text-slate-400 hover:text-slate-600 p-1">
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expandable Body */}
      {isExpanded && (
        <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 space-y-4 animate-fadeIn">
          
          {isSubmitted ? (
            /* Post-Submission Card */
            <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 text-center space-y-2.5 animate-fadeIn">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <BadgeCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-emerald-950">
                  {type === 'patient' ? 'Thank you for your feedback!' : 'Clinical evaluation recorded!'}
                </h4>
                <p className="text-xs text-emerald-800 max-w-md mx-auto mt-0.5">
                  {type === 'patient'
                    ? 'Your rating helps our hospital improve touch kiosks, multi-language speech, and OPD queue management.'
                    : `Your assessment of AI accuracy has been logged for EMR quality benchmarking (Attending: ${doctorName || 'Senior Consultant'}).`}
                </p>
              </div>

              <div className="inline-flex items-center space-x-2 bg-white px-3 py-1.5 rounded-lg border border-emerald-200 text-xs font-bold text-emerald-900 shadow-2xs">
                <span>Rated:</span>
                <div className="flex text-amber-400">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} className={`w-3.5 h-3.5 ${s <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                  ))}
                </div>
                <span className="text-slate-500 font-normal">({ratingInfo.label})</span>
              </div>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-[11px] font-bold text-teal-700 hover:underline inline-flex items-center space-x-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Submit another review</span>
                </button>
              </div>
            </div>
          ) : (
            /* Form Body */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Zomato-Style Star Bar with Large Interactive Buttons */}
              <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col items-center justify-center space-y-2">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isFilled = star <= activeRating;
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(null)}
                        className="p-1 sm:p-1.5 transition-transform hover:scale-125 focus:outline-none"
                      >
                        <Star 
                          className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                            isFilled 
                              ? 'text-amber-400 fill-amber-400 drop-shadow-xs' 
                              : 'text-slate-200 hover:text-amber-200'
                          }`} 
                        />
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center space-x-2 text-xs font-bold">
                  <span className="text-base">{ratingInfo.emoji}</span>
                  <span className={ratingInfo.color}>{ratingInfo.label}</span>
                </div>
              </div>

              {/* Zomato-Style Multi-Select Quick Pills */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-700 block uppercase tracking-wider">
                  {type === 'patient' ? 'What stood out in your visit?' : 'Select Clinical Highlights / Feedback:'}
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {availableTags.map((tag) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                          isSelected
                            ? 'bg-teal-700 text-white border-teal-800 shadow-2xs scale-102'
                            : 'bg-white hover:bg-teal-50 text-slate-700 border-slate-200 hover:border-teal-300'
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Text Comment Area */}
              <div className="space-y-1">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-teal-700 placeholder:text-slate-400 leading-relaxed"
                  placeholder={
                    type === 'patient'
                      ? 'Tell us what you loved or how we can make this kiosk easier for you...'
                      : 'Doctor comments on AI intake accuracy, FHIR schema, or time saved in OPD...'
                  }
                />
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-slate-400">
                  {type === 'patient' 
                    ? `Linked to Token #${tokenNumber || 'A-104'} • Anonymous & Secure` 
                    : `Verified Clinician Feedback (${doctorName || 'Attending Physician'})`}
                </span>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center space-x-1.5 shadow-sm transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Rating</span>
                </button>
              </div>

            </form>
          )}

        </div>
      )}

    </div>
  );
};
