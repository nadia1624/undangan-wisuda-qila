"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Music } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AudioPlayerProps {
  playSignal: boolean;
}

export default function AudioPlayer({ playSignal }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showVolume, setShowVolume] = useState(false);
  const [audioSrc, setAudioSrc] = useState("/landslide.mpeg");
  const audioRef = useRef<HTMLAudioElement>(null);

  // Play automatically when landing envelope opens or when source falls back
  useEffect(() => {
    if (playSignal && audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.log("Autoplay was blocked or failed:", e);
      });
    }
  }, [playSignal, audioSrc]);

  const handleAudioError = () => {
    console.warn("Local audio not found. Falling back to default theme.");
    // Fallback MP3 that always works online
    setAudioSrc("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3");
  };

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleMuteUnmute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const current = audioRef.current.currentTime;
    const total = audioRef.current.duration || 0;
    setCurrentTime(current);
    setProgress(total > 0 ? (current / total) * 100 : 0);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration || 0);
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || duration === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = clickX / width;
    audioRef.current.currentTime = percentage * duration;
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Hidden HTML5 Audio */}
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onError={handleAudioError}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={playSignal ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        className="glass-card flex items-center gap-3.5 px-4 py-2.5 rounded-full border border-gold/30 shadow-lg select-none max-w-[280px] sm:max-w-[320px]"
      >
        {/* Album Art Thumbnail (spinning vinyl) */}
        <div className="relative flex-shrink-0">
          <motion.div
            animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
            transition={
              isPlaying
                ? { repeat: Infinity, duration: 12, ease: "linear" }
                : { duration: 0.5 }
            }
            className="w-10 h-10 rounded-full bg-[#3F1116] border border-gold/50 flex items-center justify-center shadow-md overflow-hidden relative"
          >
            {/* Elegant style inside thumbnail */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#3F1116] to-[#D4AF37] opacity-40" />
            <Music className="w-5 h-5 text-[#F5ECE1] z-10" />
            {/* Core vinyl hole */}
            <div className="w-2.5 h-2.5 bg-[#F5ECE1] rounded-full border border-gold/40 z-20" />
          </motion.div>
        </div>

        {/* Track Title and Controls */}
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5 justify-between">
            <span className="font-serif italic text-xs font-semibold text-[#3F1116] truncate w-[110px]" title="Landslide - Fleetwood Mac">
              Landslide - Fleetwood Mac
            </span>
            <div className="flex items-center gap-1">
              {/* Play / Pause button */}
              <button
                onClick={handlePlayPause}
                className="w-7 h-7 rounded-full flex items-center justify-center bg-[#3F1116]/10 border border-gold/30 hover:bg-[#3F1116]/20 transition-colors text-[#3F1116] cursor-pointer"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 pl-0.5" />}
              </button>

              {/* Mute button */}
              <button
                onClick={handleMuteUnmute}
                className="w-7 h-7 rounded-full flex items-center justify-center bg-[#3F1116]/10 border border-gold/30 hover:bg-[#3F1116]/20 transition-colors text-[#3F1116] cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Progress Bar & Timer */}
          <div className="flex items-center gap-2 mt-1">
            <div
              onClick={handleProgressBarClick}
              className="h-1 bg-[#3F1116]/20 rounded-full w-[90px] sm:w-[130px] cursor-pointer relative overflow-hidden"
            >
              <div
                className="h-full bg-[#3F1116] rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[9px] font-sans text-[#3F1116]/70 font-medium">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
