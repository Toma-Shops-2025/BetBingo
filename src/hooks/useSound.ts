import { useState, useEffect, useCallback } from 'react';

interface SoundConfig {
  volume: number;
  enabled: boolean;
}

interface Sound {
  id: string;
  url: string;
  volume?: number;
}

const useSound = () => {
  const [sounds, setSounds] = useState<Map<string, HTMLAudioElement>>(new Map());
  const [config, setConfig] = useState<SoundConfig>({
    volume: 0.5,
    enabled: true
  });

  // Predefined sounds
  const soundLibrary: Sound[] = [
    { id: 'numberCalled', url: '/sounds/number-called.mp3' },
    { id: 'bingo', url: '/sounds/bingo.mp3' },
    { id: 'win', url: '/sounds/win.mp3' },
    { id: 'lose', url: '/sounds/lose.mp3' },
    { id: 'click', url: '/sounds/click.mp3' },
    { id: 'notification', url: '/sounds/notification.mp3' },
    { id: 'chat', url: '/sounds/chat.mp3' },
    { id: 'achievement', url: '/sounds/achievement.mp3' }
  ];

  // Initialize sounds
  useEffect(() => {
    const audioElements = new Map<string, HTMLAudioElement>();
    
    soundLibrary.forEach(sound => {
      const audio = new Audio(sound.url);
      audio.volume = config.volume;
      audio.preload = 'auto';
      audioElements.set(sound.id, audio);
    });

    setSounds(audioElements);

    return () => {
      audioElements.forEach(audio => {
        audio.pause();
        audio.src = '';
      });
    };
  }, []);

  // Update volume for all sounds
  useEffect(() => {
    sounds.forEach(audio => {
      audio.volume = config.volume;
    });
  }, [config.volume, sounds]);

  const playSound = useCallback((soundId: string) => {
    if (!config.enabled) return;

    const audio = sounds.get(soundId);
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(error => {
        console.warn('Failed to play sound:', error);
      });
    }
  }, [config.enabled, sounds]);

  const stopSound = useCallback((soundId: string) => {
    const audio = sounds.get(soundId);
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [sounds]);

  const stopAllSounds = useCallback(() => {
    sounds.forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
  }, [sounds]);

  const setVolume = useCallback((volume: number) => {
    setConfig(prev => ({ ...prev, volume: Math.max(0, Math.min(1, volume)) }));
  }, []);

  const toggleSound = useCallback(() => {
    setConfig(prev => ({ ...prev, enabled: !prev.enabled }));
  }, []);

  const setSoundEnabled = useCallback((enabled: boolean) => {
    setConfig(prev => ({ ...prev, enabled }));
  }, []);

  return {
    playSound,
    stopSound,
    stopAllSounds,
    setVolume,
    toggleSound,
    setSoundEnabled,
    volume: config.volume,
    enabled: config.enabled
  };
};

export default useSound; 