import { useEffect, useRef, useState } from 'react';

export const SpaceAmbientAudio = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);

  useEffect(() => {
    // Create audio context for ambient space sounds
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Create oscillator for deep space ambient tone
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const filterNode = audioContext.createBiquadFilter();
    
    // Configure the ambient sound
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(60, audioContext.currentTime); // Low frequency
    
    // Add subtle frequency modulation for space-like effect
    const lfo = audioContext.createOscillator();
    const lfoGain = audioContext.createGain();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.1, audioContext.currentTime); // Very slow modulation
    lfoGain.gain.setValueAtTime(5, audioContext.currentTime);
    
    // Filter for atmospheric effect
    filterNode.type = 'lowpass';
    filterNode.frequency.setValueAtTime(200, audioContext.currentTime);
    filterNode.Q.setValueAtTime(1, audioContext.currentTime);
    
    // Volume control
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 2);
    
    // Connect the audio graph
    lfo.connect(lfoGain);
    lfoGain.connect(oscillator.frequency);
    oscillator.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Start the ambient sound
    lfo.start();
    oscillator.start();
    
    setIsPlaying(true);
    
    // Cleanup function
    return () => {
      try {
        oscillator.stop();
        lfo.stop();
        audioContext.close();
      } catch (error) {
        console.log('Audio cleanup completed');
      }
    };
  }, [volume]);

  // Handle user interaction to start audio (required by browsers)
  const handleUserInteraction = () => {
    if (!isPlaying) {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContext.resume();
    }
  };

  useEffect(() => {
    // Add click listener to start audio on first user interaction
    document.addEventListener('click', handleUserInteraction, { once: true });
    document.addEventListener('keydown', handleUserInteraction, { once: true });
    
    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setVolume(volume > 0 ? 0 : 0.3)}
        className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
        title={volume > 0 ? "Mute ambient sound" : "Unmute ambient sound"}
      >
        {volume > 0 ? (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L5.5 14H3a1 1 0 01-1-1V7a1 1 0 011-1h2.5l2.883-2.793a1 1 0 011.617.793zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L5.5 14H3a1 1 0 01-1-1V7a1 1 0 011-1h2.5l2.883-2.793a1 1 0 011.617.793zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default SpaceAmbientAudio;
