// Intelligent Audio System: Supports local audio track (/audio/birthday-bg.mp3) with automatic Web Audio synthesizer fallback

class AudioManager {
  private audioElement: HTMLAudioElement | null = null;
  private audioCtx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isPlaying: boolean = false;
  private bgSynthTimer: number | null = null;
  private currentTrack: 'bg' | 'none' = 'none';

  constructor() {
    // Audio is initialized on first user gesture
  }

  private initContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.audioElement) {
      this.audioElement.muted = this.isMuted;
    }
    if (this.isMuted) {
      this.stop();
    }
    return this.isMuted;
  }

  // Play background music (tries /audio/birthday-bg.mp3 first, falls back to ambient synth)
  public async playBackgroundMusic(): Promise<void> {
    if (this.isMuted) return;
    this.initContext();
    this.isPlaying = true;

    try {
      if (!this.audioElement) {
        this.audioElement = new Audio('/audio/birthday-bg.mp3');
        this.audioElement.loop = true;
        this.audioElement.volume = 0.4;
      }

      const playPromise = this.audioElement.play();
      if (playPromise !== undefined) {
        await playPromise;
        this.currentTrack = 'bg';
        return;
      }
    } catch {
      // Local MP3 not available or format unsupported — fall back gracefully to gentle ambient synthesizer
      this.startAmbientSynth();
    }
  }

  public pause(): void {
    this.isPlaying = false;
    if (this.audioElement) {
      this.audioElement.pause();
    }
    this.stopAmbientSynth();
  }

  public stop(): void {
    this.isPlaying = false;
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
    }
    this.stopAmbientSynth();
  }

  // Soft, warm ambient music box synthesizer (in Key of F Major: serene, nostalgic, elegant)
  private startAmbientSynth() {
    if (this.bgSynthTimer) return;
    this.initContext();

    // Chords / Arpeggio sequence: F -> Dm -> Bb -> C
    const sequence: number[] = [
      349.23, // F4
      440.00, // A4
      523.25, // C5
      698.46, // F5
      329.63, // E5
      440.00, // A4
      392.00, // G4
      523.25, // C5
      293.66, // D4
      349.23, // F4
      440.00, // A4
      587.33, // D5
      261.63, // C4
      329.63, // E4
      392.00, // G4
      523.25, // C5
    ];

    let noteIndex = 0;
    const playNext = () => {
      if (!this.isPlaying || this.isMuted) return;
      const freq = sequence[noteIndex];
      this.playChime(freq, 1.2, 0.08);
      noteIndex = (noteIndex + 1) % sequence.length;
      this.bgSynthTimer = window.setTimeout(playNext, 750);
    };

    playNext();
  }

  private stopAmbientSynth() {
    if (this.bgSynthTimer) {
      clearTimeout(this.bgSynthTimer);
      this.bgSynthTimer = null;
    }
  }

  // Play a single soft chime tone with warm resonance
  public playChime(freq: number, duration: number = 0.8, gainVal: number = 0.15) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const filter = this.audioCtx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2400, now);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(gainVal, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + duration + 0.05);
    } catch (e) {
      console.warn('Audio chime error', e);
    }
  }

  // Candle blowing sound (filtered breath noise)
  public playCandleBlow() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.audioCtx) return;

    try {
      const bufferSize = this.audioCtx.sampleRate * 0.9;
      const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.audioCtx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(520, this.audioCtx.currentTime);
      filter.Q.setValueAtTime(1.5, this.audioCtx.currentTime);

      const gain = this.audioCtx.createGain();
      const now = this.audioCtx.currentTime;
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.18);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.audioCtx.destination);

      noise.start(now);
      noise.stop(now + 0.92);

      // Sparkle chime after extinguishing
      setTimeout(() => {
        this.playCelebrationSparkle();
      }, 500);
    } catch (e) {
      console.warn('Candle blow audio error', e);
    }
  }

  // Gentle page turn / scene transition chime
  public playTransition() {
    if (this.isMuted) return;
    this.playChime(523.25, 0.4, 0.1);
    setTimeout(() => this.playChime(659.25, 0.5, 0.1), 100);
  }

  // Celebratory sparkle fanfare
  public playCelebrationSparkle() {
    if (this.isMuted) return;
    const freqs = [392.00, 523.25, 659.25, 783.99, 1046.50];
    freqs.forEach((freq, idx) => {
      setTimeout(() => {
        this.playChime(freq, 0.6, 0.14);
      }, idx * 80);
    });
  }
}

export const audioManager = new AudioManager();
