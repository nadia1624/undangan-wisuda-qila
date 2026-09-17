"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { MailOpen } from "lucide-react";

interface EnvelopeLandingProps {
  onOpen: () => void;
  guestName: string;
}

export default function EnvelopeLanding({ onOpen, guestName }: EnvelopeLandingProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpened, setIsOpened] = useState(false); // When animation completes
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const envelopeRef = useRef<HTMLDivElement>(null);

  // Mouse tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isOpen || !envelopeRef.current) return;
    const rect = envelopeRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Tilt ranges
    setRotateX(-y * 0.05); // Tilt vertical
    setRotateY(x * 0.05);  // Tilt horizontal
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  // Launch golden and maroon confetti sparkles
  const fireConfetti = () => {
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ["#3F1116", "#D4AF37", "#FEEFDC", "#FFFDF9"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ["#3F1116", "#D4AF37", "#FEEFDC", "#FFFDF9"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const handleOpenEnvelope = () => {
    if (isOpen) return;
    setIsOpen(true);
    
    // Play open sequence
    setTimeout(() => {
      // Trigger confetti
      fireConfetti();
      // Start audio after user interaction
      onOpen();
    }, 1200);

    setTimeout(() => {
      setIsOpened(true);
    }, 2200);
  };

  return (
    <AnimatePresence>
      {!isOpened && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#F5ECE1] satin-bg px-4 py-8"
          exit={{ opacity: 0, y: -50, filter: "blur(10px)" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Decorative Floral Ornaments Background */}
          <div className="absolute inset-0 pointer-events-none opacity-15 flex justify-between p-4 sm:p-12">
            <div className="w-48 h-48 border-l border-t border-gold rounded-tl-full" />
            <div className="w-48 h-48 border-r border-t border-gold rounded-tr-full" />
            <div className="absolute bottom-12 left-12 w-48 h-48 border-l border-b border-gold rounded-bl-full" />
            <div className="absolute bottom-12 right-12 w-48 h-48 border-r border-b border-gold rounded-br-full" />
          </div>

          {/* Heading Above Envelope */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-center mb-8 z-10 select-none"
          >
            <p className="font-serif text-sm tracking-[0.25em] text-[#3F1116] uppercase mb-2 font-bold">
              Graduation Invitation
            </p>
            <h1 className="font-serif text-2xl sm:text-4xl font-light text-[#3F1116] italic">
              Aqila Ahda Rayhaani, S.P
            </h1>
            {guestName && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-4 font-sans text-sm text-[#3F1116]/80"
              >
                Exclusive invitation for: <span className="font-serif italic text-base font-semibold text-gold-text-foil">{guestName}</span>
              </motion.div>
            )}
          </motion.div>

          {/* Realistic Envelope Area */}
          <motion.div
            ref={envelopeRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleOpenEnvelope}
            style={{
              transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
              transformStyle: "preserve-3d",
            }}
            animate={
              isOpen
                ? { y: 60, scale: 0.95 }
                : { y: [0, -8, 0], rotate: [0, 0.5, 0] }
            }
            transition={
              isOpen
                ? { duration: 0.8, ease: "easeInOut" }
                : { repeat: Infinity, duration: 5, ease: "easeInOut" }
            }
            className="relative w-full max-w-[340px] h-[220px] sm:max-w-[460px] sm:h-[300px] rounded-lg bg-[#E8DCCF] shadow-[0_20px_50px_rgba(63,17,22,0.25)] border border-[#3F1116]/30 flex items-center justify-center cursor-pointer transition-shadow hover:shadow-[0_30px_60px_rgba(63,17,22,0.35)] z-20"
          >
            {/* Inner Shadow & Paper texture */}
            <div className="absolute inset-0 rounded-lg overflow-hidden paper-texture border border-[#D5C2AC]" />

            {/* Back Flap Cover (Pocket Background) */}
            <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-[#DFCEBA] rounded-b-lg border-t border-gold/30 z-0" />

            {/* Ribbon - Left & Right (tied around) */}
            <motion.div
              animate={isOpen ? { x: -200, opacity: 0 } : { x: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute left-0 w-[45%] h-6 bg-[#3F1116] shadow-md z-30 flex items-center justify-end"
            >
              <div className="w-1.5 h-full bg-gold/50" />
            </motion.div>
            <motion.div
              animate={isOpen ? { x: 200, opacity: 0 } : { x: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute right-0 w-[45%] h-6 bg-[#3F1116] shadow-md z-30 flex items-center justify-start"
            >
              <div className="w-1.5 h-full bg-gold/50" />
            </motion.div>

            {/* Vertical Ribbon Loop */}
            <motion.div
              animate={isOpen ? { y: -200, opacity: 0 } : { y: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute top-0 bottom-0 w-6 bg-[#3F1116] shadow-md z-30"
            >
              <div className="h-full w-[2px] mx-auto bg-gold/50" />
            </motion.div>

            {/* Invitation Card sliding out */}
            <motion.div
              initial={{ y: 0, scale: 0.9 }}
              animate={isOpen ? { y: -150, scale: 1.05, zIndex: 10 } : { y: 0, scale: 0.9 }}
              transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-[5%] w-[90%] h-[90%] bg-[#FAF6F0] rounded border border-[#D5C2AC] p-6 shadow-md z-10 flex flex-col justify-between text-center select-none"
            >
              <div className="border border-gold-light p-4 h-full flex flex-col justify-between bg-[#FAF6F0]">
                <span className="font-serif italic text-xs text-gold tracking-widest uppercase font-semibold">
                  Class of 2026
                </span>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#3F1116] tracking-wide">
                    INVITATION
                  </h3>
                  <p className="font-sans text-[10px] uppercase text-[#3F1116]/75 tracking-widest mt-1 font-medium">
                    Graduation Celebration
                  </p>
                </div>
                <p className="font-accent text-xl text-[#3F1116]">Aqila Ahda Rayhaani</p>
              </div>
            </motion.div>

            {/* Triangular side pockets (left & right folds) */}
            <div 
              className="absolute left-0 bottom-0 w-0 h-0 border-l-[170px] border-b-[110px] sm:border-l-[230px] sm:border-b-[150px] border-l-[#DCC7B0] border-b-transparent z-20"
              style={{ borderBottomColor: "rgba(220,199,176,0.98)" }}
            />
            <div 
              className="absolute right-0 bottom-0 w-0 h-0 border-r-[170px] border-b-[110px] sm:border-r-[230px] sm:border-b-[150px] border-r-[#DCC7B0] border-b-transparent z-20"
              style={{ borderBottomColor: "rgba(220,199,176,0.98)" }}
            />

            {/* Bottom triangular flap */}
            <div 
              className="absolute bottom-0 left-0 right-0 w-0 h-0 border-b-[110px] sm:border-b-[150px] border-l-[170px] border-r-[170px] sm:border-l-[230px] sm:border-r-[230px] border-l-transparent border-r-transparent border-b-[#D5BEA4] z-20"
            />

            <motion.div
              style={{
                transformOrigin: "top center",
                transformStyle: "preserve-3d",
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                borderBottom: "1px solid rgba(212,175,55,0.4)"
              }}
              animate={isOpen ? { rotateX: -180, zIndex: 0 } : { rotateX: 0, zIndex: 25 }}
              transition={{ duration: 1.0, delay: 0.4, ease: "easeInOut" }}
              className="absolute top-0 left-0 right-0 h-[50%] bg-[#CFB79B] shadow-inner rounded-t-lg z-25"
            />

            {/* Wax Seal - Gold & Maroon foil circular badge */}
            <motion.div
              animate={
                isOpen
                  ? { scale: 0, rotate: 120, opacity: 0 }
                  : { scale: [1, 1.05, 1] }
              }
              transition={
                isOpen
                  ? { duration: 0.5, ease: "easeInOut" }
                  : { repeat: Infinity, duration: 3, ease: "easeInOut" }
              }
              className="absolute z-40 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center cursor-pointer shadow-[0_5px_15px_rgba(63,17,22,0.4)]"
              style={{
                background: "radial-gradient(circle, #4F161C 0%, #3F1116 70%, #200609 100%)",
                border: "2px solid #D4AF37",
              }}
            >
              {/* Inner seal monogram */}
              <div className="w-[85%] h-[85%] rounded-full border border-gold/70 flex flex-col items-center justify-center text-[#F5ECE1] select-none">
                <span className="font-accent text-3xl font-bold leading-none mt-1 text-gold-light">A</span>
                <span className="text-[7px] font-sans tracking-widest font-semibold uppercase leading-none text-[#F5ECE1]">
                  OPEN
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Tap instructions below envelope */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mt-10 z-10 flex flex-col items-center justify-center cursor-pointer"
            onClick={handleOpenEnvelope}
          >
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="flex items-center gap-2 bg-[#FAF6F0] backdrop-blur-md px-5 py-2.5 rounded-full border border-[#3F1116]/30 shadow-sm text-xs font-sans tracking-widest uppercase text-[#3F1116] font-semibold hover:bg-[#FAF6F0] transition-colors"
            >
              <MailOpen className="w-3.5 h-3.5 text-[#3F1116]" />
              Tap Wax Seal to Open
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
