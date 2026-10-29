import React, { useState, useEffect, useRef } from 'react';
import { Flame, Sparkles, Mic, MicOff, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SITE_CONFIG } from '../../config/content';
import { audioManager } from '../../utils/audio';

interface Scene2CakeProps {
  onContinue: () => void;
}

export const Scene2Cake: React.FC<Scene2CakeProps> = ({ onContinue }) => {
  // 3 Candles: true = lit, false = extinguished
  const [candles, setCandles] = useState<boolean[]>([true, true, true]);
  const [isAllBlown, setIsAllBlown] = useState<boolean>(false);
  const [isMicListening, setIsMicListening] = useState<boolean>(false);
  const [micStatus, setMicStatus] = useState<string | null>(null);

  const audioStreamRef = useRef<MediaStream | null>(null);
  const micIntervalRef = useRef<number | null>(null);

  const allOut = candles.every((c) => !c);

  useEffect(() => {
    if (allOut && !isAllBlown) {
      setIsAllBlown(true);
      audioManager.playCelebrationSparkle();

      // Confetti burst with refined luxury palette (gold, blush, ivory, plum)
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#C6A56B', '#C88F91', '#F8F4EE', '#A78B9A', '#E8D8C5'],
      });

      stopMic();
    }
  }, [allOut, isAllBlown]);

  useEffect(() => {
    return () => {
      stopMic();
    };
  }, []);

  const handleCandleClick = (index: number) => {
    if (!candles[index]) return;
    audioManager.playCandleBlow();
    setCandles((prev) => {
      const next = [...prev];
      next[index] = false;
      return next;
    });
  };

  const handleBlowAll = () => {
    audioManager.playCandleBlow();
    setCandles([false, false, false]);
  };

  const toggleMic = async () => {
    if (isMicListening) {
      stopMic();
      return;
    }

    try {
      setMicStatus(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioStreamRef.current = stream;

      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      const source = ctx.createMediaStreamSource(stream);
      source.connect(analyser);

      const buffer = new Uint8Array(analyser.frequencyBinCount);
      setIsMicListening(true);
      setMicStatus('Listening: Blow gently into your microphone!');

      micIntervalRef.current = window.setInterval(() => {
        analyser.getByteFrequencyData(buffer);
        let sum = 0;
        for (let i = 0; i < buffer.length; i++) sum += buffer[i];
        const average = sum / buffer.length;

        if (average > 55) {
          handleBlowAll();
        }
      }, 100);
    } catch {
      setMicStatus('Microphone permission not granted. Use the button below!');
      setIsMicListening(false);
    }
  };

  const stopMic = () => {
    if (micIntervalRef.current) {
      clearInterval(micIntervalRef.current);
      micIntervalRef.current = null;
    }
    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach((track) => track.stop());
      audioStreamRef.current = null;
    }
    setIsMicListening(false);
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center px-4 py-16 overflow-hidden bg-gradient-to-b from-warmCharcoal via-deepPlum to-warmCharcoal text-ivory">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-dustyRose/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center text-center">
        {/* Instruction Header */}
        {!isAllBlown ? (
          <div className="space-y-2 mb-8 animate-fade-in">
            <span className="inline-block text-antiqueGold text-xs uppercase tracking-widest font-serif font-medium">
              — The Birthday Tradition —
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-ivory font-semibold tracking-tight">
              {SITE_CONFIG.cake.instruction}
            </h2>
            <p className="font-bengali text-champagne/80 text-base sm:text-lg">
              {SITE_CONFIG.cake.subInstruction}
            </p>
          </div>
        ) : (
          <div className="space-y-3 mb-8 animate-fade-up">
            <span className="inline-block px-3 py-1 rounded-full bg-antiqueGold/20 border border-antiqueGold/40 text-antiqueGold text-xs uppercase tracking-widest font-serif font-semibold">
              WISH CAST TO THE STARS
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-ivory font-bold tracking-tight">
              {SITE_CONFIG.cake.revealedTitle}
            </h2>
            <p className="font-sans text-champagne/90 text-sm sm:text-base font-medium">
              {SITE_CONFIG.cake.revealedSubtitle}
            </p>
          </div>
        )}

        {/* 3D-Styled Ivory & Gold Birthday Cake */}
        <div className="relative w-80 h-72 sm:w-96 sm:h-80 flex flex-col items-center justify-end my-4 select-none">
          {/* Candle Flames & Wicks */}
          <div className="flex items-end justify-center gap-10 sm:gap-14 mb-[-4px] z-20">
            {candles.map((isLit, idx) => (
              <div
                key={idx}
                onClick={() => handleCandleClick(idx)}
                className="flex flex-col items-center cursor-pointer group"
                title={isLit ? 'Tap to blow out this candle' : 'Blown out'}
              >
                {/* Flame or Smoke */}
                <div className="h-10 flex items-end justify-center relative">
                  {isLit ? (
                    <div className="relative animate-flame">
                      <div className="w-3.5 h-6 bg-gradient-to-t from-dustyRose via-antiqueGold to-yellow-100 rounded-full blur-[0.5px] shadow-[0_0_14px_#C6A56B]" />
                      <div className="absolute inset-x-0.5 bottom-0.5 top-2 bg-gradient-to-t from-white to-amber-200 rounded-full" />
                      <div className="absolute -inset-2 bg-antiqueGold/30 rounded-full blur-md" />
                    </div>
                  ) : (
                    <div className="relative">
                      <div className="w-2 h-7 bg-ivory/40 rounded-full blur-[2px] animate-smoke" />
                      <div className="w-1 h-2.5 bg-warmCharcoal/80 mx-auto" />
                    </div>
                  )}
                </div>

                {/* Candle Body */}
                <div className="w-3.5 h-14 bg-gradient-to-b from-ivory via-champagne to-ivory rounded-t-sm shadow-md border-x border-champagne flex flex-col justify-around py-1">
                  <div className="w-full h-0.5 bg-antiqueGold/40" />
                  <div className="w-full h-0.5 bg-antiqueGold/40" />
                </div>
              </div>
            ))}
          </div>

          {/* Cake Top Tier (Ivory & Blush) */}
          <div className="relative z-10 w-44 sm:w-52 h-16 bg-gradient-to-r from-ivory via-[#FFFDF9] to-ivory rounded-t-2xl shadow-xl border-t-2 border-champagne flex flex-col justify-between overflow-hidden">
            {/* Delicate Blush Drips */}
            <div className="flex justify-around items-start w-full">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-6 h-3.5 bg-dustyRose/70 rounded-b-full shadow-inner" />
              ))}
            </div>
            {/* Restrained Gold Accents */}
            <div className="flex justify-center items-center pb-2">
              <span className="font-serif italic text-xs tracking-widest text-deepPlum/70">
                Mahima
              </span>
            </div>
          </div>

          {/* Cake Bottom Tier */}
          <div className="relative z-0 w-64 sm:w-72 h-20 bg-gradient-to-r from-champagne via-ivory to-champagne rounded-t-xl shadow-2xl border-t-2 border-antiqueGold/50 flex flex-col justify-between -mt-1 overflow-hidden">
            {/* Scallops */}
            <div className="flex justify-around items-start w-full">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-7 h-3 bg-mutedMauve/40 rounded-b-full" />
              ))}
            </div>
            {/* Antique Gold Trim Band */}
            <div className="w-full h-3 bg-antiqueGold/30 border-y border-antiqueGold/40 flex items-center justify-around px-4">
              {[...Array(10)].map((_, i) => (
                <span key={i} className="w-1 h-1 bg-antiqueGold rounded-full" />
              ))}
            </div>
          </div>

          {/* Porcelain Cake Stand */}
          <div className="relative -z-10 w-80 sm:w-96 h-5 bg-gradient-to-r from-champagne via-ivory to-champagne rounded-full shadow-[0_12px_30px_rgba(0,0,0,0.6)] border-b-2 border-antiqueGold/40 flex items-center justify-center -mt-1">
            <div className="w-64 h-1 bg-antiqueGold/30 rounded-full" />
          </div>
        </div>

        {/* Controls */}
        {!isAllBlown ? (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6 w-full max-w-sm">
            <button
              onClick={handleBlowAll}
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-dustyRose to-antiqueGold text-ivory font-sans text-sm font-semibold shadow-lg hover:shadow-xl hover:scale-102 transition-all"
            >
              <Flame className="w-4 h-4" />
              <span>Blow Out Candles</span>
            </button>

            <button
              onClick={toggleMic}
              className={`px-4 py-3 rounded-full border text-xs font-medium transition-all flex items-center gap-1.5 ${
                isMicListening
                  ? 'bg-antiqueGold/20 border-antiqueGold text-antiqueGold animate-pulse'
                  : 'bg-warmCharcoal/60 border-champagne/30 text-champagne hover:bg-warmCharcoal'
              }`}
              title="Blow using your device microphone"
            >
              {isMicListening ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              <span>{isMicListening ? 'Listening...' : 'Use Mic'}</span>
            </button>
          </div>
        ) : (
          <div className="mt-8 animate-fade-up">
            <button
              onClick={() => {
                audioManager.playTransition();
                onContinue();
              }}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-ivory text-deepPlum font-sans text-sm font-semibold tracking-wide shadow-xl hover:bg-champagne hover:scale-105 transition-all"
            >
              <span>{SITE_CONFIG.cake.continueButton}</span>
              <ArrowRight className="w-4 h-4 text-dustyRose" />
            </button>
          </div>
        )}

        {micStatus && (
          <p className="text-xs text-antiqueGold/80 mt-2 font-sans">
            {micStatus}
          </p>
        )}
      </div>
    </section>
  );
};
