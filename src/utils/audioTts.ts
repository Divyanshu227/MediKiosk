import { LanguageCode } from '../types';

/**
 * Transliterates Gurmukhi Punjabi Unicode script (U+0A00 - U+0A7F)
 * to Devanagari Hindi phonemes (U+0900 - U+097F).
 * 
 * Since all modern OS / browsers have high-quality Hindi (hi-IN) TTS engines
 * pre-installed while Punjabi (pa-IN) local voice is often missing,
 * this transliteration allows the Hindi voice engine to pronounce Punjabi words
 * with authentic phonetic precision without falling silent.
 */
export function transliterateGurmukhiToDevanagari(input: string): string {
  const map: Record<string, string> = {
    'ੳ': 'उ', 'ਅ': 'अ', 'ੲ': 'इ', 'ਸ': 'स', 'ਹ': 'ह',
    'ਕ': 'क', 'ਖ': 'ख', 'ਗ': 'ग', 'ਘ': 'घ', 'ਙ': 'ङ',
    'ਚ': 'च', 'ਛ': 'छ', 'ਜ': 'ज', 'ਝ': 'झ', 'ਞ': 'ञ',
    'ਟ': 'ट', 'ਠ': 'ठ', 'ਡ': 'ड', 'ਢ': 'ढ', 'ਣ': 'ण',
    'ਤ': 'त', 'ਥ': 'थ', 'ਦ': 'द', 'ਧ': 'ध', 'ਨ': 'न',
    'ਪ': 'प', 'ਫ': 'फ', 'ਬ': 'ब', 'ਭ': 'भ', 'ਮ': 'म',
    'ਯ': 'य', 'ਰ': 'र', 'ਲ': 'ल', 'ਲ਼': 'ळ', 'ਵ': 'व', 'ਸ਼': 'श',
    'ਖ਼': 'ख़', 'ਗ਼': 'ग़', 'ਜ਼': 'ज़', 'ਫ਼': 'फ़',
    'ਾ': 'ा', 'ਿ': 'ि', 'ੀ': 'ी', 'ੁ': 'ु', 'ੂ': 'ू',
    'ੇ': 'े', 'ੈ': 'ै', 'ੋ': 'ो', 'ੌ': 'ौ', '੍': '्',
    'ੰ': 'ं', 'ਂ': 'ं', 'ੱ': '', '਼': '़',
    'ਆ': 'आ', 'ਇ': 'इ', 'ਈ': 'ई', 'ਉ': 'उ', 'ਊ': 'ऊ', 'ਏ': 'ए', 'ਐ': 'ऐ', 'ਓ': 'ओ', 'ਔ': 'औ',
    'ੴ': 'एक ओंकार'
  };

  let result = '';
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    // Handle Adhak (ੱ) which doubles the subsequent consonant
    if (char === 'ੱ' && i + 1 < input.length) {
      const nextChar = input[i + 1];
      const mappedNext = map[nextChar] || nextChar;
      result += mappedNext + '्';
      continue;
    }
    result += map[char] !== undefined ? map[char] : char;
  }
  return result;
}

// Global reference to active HTML5 Audio instance for cancel/stop support
let currentTtsAudio: HTMLAudioElement | null = null;

export function stopAllAudio(): void {
  if (currentTtsAudio) {
    try {
      currentTtsAudio.pause();
      currentTtsAudio.currentTime = 0;
    } catch {
      // Ignore abort errors
    }
    currentTtsAudio = null;
  }

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // Ignore
    }
  }
}

/**
 * High-quality native audio stream fallback using public Google TTS stream
 */
export function playOnlineTtsAudio(
  text: string, 
  langCode: LanguageCode, 
  onStart?: () => void, 
  onEnd?: () => void
): Promise<boolean> {
  return new Promise((resolve) => {
    try {
      stopAllAudio();

      const langMap: Record<LanguageCode, string> = {
        hi: 'hi',
        en: 'en-IN',
        bn: 'bn',
        ta: 'ta',
        te: 'te',
        mr: 'mr',
        gu: 'gu',
        kn: 'kn',
        ml: 'ml',
        pa: 'pa'
      };

      const tl = langMap[langCode] || 'hi';
      const cleanText = text.trim().slice(0, 180);
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${tl}&client=tw-ob&q=${encodeURIComponent(cleanText)}`;
      
      const audio = new Audio(url);
      currentTtsAudio = audio;

      audio.onplay = () => {
        if (onStart) onStart();
      };

      audio.onended = () => {
        currentTtsAudio = null;
        if (onEnd) onEnd();
        resolve(true);
      };

      audio.onerror = () => {
        currentTtsAudio = null;
        if (onEnd) onEnd();
        resolve(false);
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          currentTtsAudio = null;
          resolve(false);
        });
      }
    } catch {
      currentTtsAudio = null;
      resolve(false);
    }
  });
}
