import React, { useState } from 'react';
import { ArrowRight, Mail, Heart, Copy, Check, Feather } from 'lucide-react';
import { SITE_CONFIG } from '../../config/content';
import { audioManager } from '../../utils/audio';

interface Scene8LetterProps {
  onContinue: () => void;
}

export const Scene8Letter: React.FC<Scene8LetterProps> = ({ onContinue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleOpenLetter = () => {
    audioManager.playCelebrationSparkle();
    setIsOpen(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(SITE_CONFIG.letter.content);
    setCopied(true);
    audioManager.playChime(800, 0.4, 0.1);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center px-4 py-20 overflow-hidden bg-gradient-to-b from-champagne/20 via-ivory to-champagne/20 text-warmCharcoal">
      {/* Background delicate ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-dustyRose/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto w-full">
        {!isOpen ? (
          /* SEALED ENVELOPE INITIAL STATE */
          <div className="flex flex-col items-center text-center animate-fade-in">
            <span className="inline-block text-xs uppercase tracking-widest font-serif font-semibold text-antiqueGold mb-3">
              — A Secret Keepsake —
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl text-deepPlum font-bold tracking-tight mb-8">
              "{SITE_CONFIG.letter.teaser}"
            </h2>

            {/* Vintage Sealed Envelope Visual */}
            <div
              onClick={handleOpenLetter}
              className="group cursor-pointer relative w-full max-w-md aspect-[16/10] bg-gradient-to-br from-[#FAF7F2] to-[#EAE1D3] rounded-2xl shadow-2xl border-2 border-champagne p-6 flex flex-col items-center justify-center transition-all duration-500 hover:scale-103 hover:border-antiqueGold"
            >
              <div className="absolute inset-0 border border-white/40 rounded-2xl pointer-events-none" />
              <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-champagne/50 to-transparent pointer-events-none" />

              {/* Antique Gold Wax Seal Stamp */}
              <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-antiqueGold via-[#DFC38E] to-antiqueGold shadow-xl border-2 border-ivory flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <div className="w-16 h-16 rounded-full border border-dashed border-deepPlum/30 flex flex-col items-center justify-center">
                  <Heart className="w-5 h-5 text-deepPlum fill-deepPlum" />
                  <span className="text-[9px] uppercase tracking-widest font-bold text-deepPlum mt-0.5">
                    Batparss
                  </span>
                </div>
              </div>

              <p className="mt-4 font-serif text-deepPlum text-base sm:text-lg font-medium tracking-wide">
                Strictly for: Mahima
              </p>
              <p className="text-xs text-dustyRose font-sans mt-0.5">
                [Tap to break wax seal & open]
              </p>
            </div>

            <div className="mt-8">
              <button
                onClick={handleOpenLetter}
                className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-deepPlum text-ivory font-sans text-sm font-semibold tracking-wide shadow-lg shadow-deepPlum/20 hover:bg-warmCharcoal hover:scale-105 transition-all"
              >
                <Mail className="w-4 h-4 text-antiqueGold" />
                <span>{SITE_CONFIG.letter.openButton}</span>
              </button>
            </div>
          </div>
        ) : (
          /* UNFOLDED WARM IVORY PARCHMENT LETTER */
          <div className="relative bg-[#FAF7F2] rounded-3xl p-6 sm:p-12 shadow-2xl border-2 border-champagne animate-fade-up">
            {/* Corner Decorative flourishes */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-champagne/50 to-transparent rounded-bl-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-dustyRose/15 to-transparent rounded-tr-full pointer-events-none" />

            {/* Letter Header Bar */}
            <div className="flex items-center justify-between border-b border-champagne pb-4 mb-8">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-deepPlum text-ivory flex items-center justify-center">
                  <Feather className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-deepPlum text-sm sm:text-base">
                    From Batparss with Love
                  </h4>
                  <p className="text-xs text-mutedMauve">For Mahima • Birthday 2026</p>
                </div>
              </div>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-champagne/40 hover:bg-champagne text-deepPlum text-xs font-medium transition-all"
                title="Copy letter text"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-dustyRose" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Handwritten / Editorial Letter Text */}
            <div className="relative z-10 whitespace-pre-line font-bengali text-base sm:text-lg text-deepPlum/90 leading-relaxed space-y-4">
              {SITE_CONFIG.letter.content}
            </div>

            {/* Letter Footer */}
            <div className="mt-10 pt-6 border-t border-champagne/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-dustyRose font-serif italic">
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>Handcrafted by the Batparss Gang</span>
              </div>

              <button
                onClick={() => {
                  audioManager.playTransition();
                  onContinue();
                }}
                className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-deepPlum text-ivory font-sans text-xs sm:text-sm font-semibold tracking-wide shadow-md hover:bg-warmCharcoal hover:scale-105 transition-all"
              >
                <span>{SITE_CONFIG.letter.buttonText}</span>
                <ArrowRight className="w-4 h-4 text-antiqueGold group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
