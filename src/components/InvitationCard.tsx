"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Award } from "lucide-react";

interface InvitationCardProps {
  guestName: string;
}

export default function InvitationCard({ guestName }: InvitationCardProps) {
  // Reveal animations configs
  const cardVariants: any = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1] as any,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="w-full flex items-center justify-center py-16 px-4 md:py-24 relative overflow-hidden">
      {/* Background Ribbon Draping (Decorative graphic element) */}
      <div className="absolute top-[-5%] left-[-10%] w-[35%] h-[35%] opacity-15 pointer-events-none animate-float select-none">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#3F1116]">
          <path d="M10 80 C 40 10, 60 10, 100 80 C 150 150, 180 80, 200 120" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M15 90 C 45 20, 65 20, 105 90 C 155 160, 185 90, 205 130" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" fill="none" />
        </svg>
      </div>

      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="glass-card paper-texture max-w-[650px] w-full p-8 sm:p-12 md:p-16 rounded-2xl shadow-2xl relative gold-border text-center overflow-hidden"
      >
        {/* Intricate Inner Border */}
        <div className="absolute inset-4 rounded-xl border border-gold/25 pointer-events-none" />
        <div className="absolute inset-5 rounded-xl border border-gold/10 pointer-events-none" />

        {/* Top Ornament */}
        <motion.div variants={itemVariants} className="flex justify-center mb-6 z-10 relative">
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-8 bg-gold/50"></span>
            <span className="font-serif italic text-xs tracking-[0.3em] text-[#3F1116] uppercase font-bold">
              Class of 2026
            </span>
            <span className="h-[1px] w-8 bg-gold/50"></span>
          </div>
        </motion.div>

        {/* Quote */}
        <motion.p
          variants={itemVariants}
          className="font-serif italic text-sm text-[#3F1116]/85 max-w-md mx-auto leading-relaxed mb-8"
        >
          "The knowledge that you have emerged wiser and stronger from setbacks means that you are, ever after, secure in your ability to survive."
          <span className="block text-[10px] font-sans uppercase tracking-widest text-gold mt-2 font-bold">
            — J.K. Rowling —
          </span>
        </motion.p>

        {/* Graduate Portrait inside Luxury Frame */}
        <motion.div
          variants={itemVariants}
          className="relative w-56 h-72 sm:w-64 sm:h-84 mx-auto mb-8 z-10"
        >
          {/* Top Hanging Bow SVG decoration */}
          <div className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 w-16 h-11 z-20 pointer-events-none">
            <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#3F1116]">
              {/* Ribbon Bow */}
              <path d="M50 40 C35 25, 20 25, 20 40 C20 55, 35 55, 50 40" fill="currentColor"/>
              <path d="M50 40 C65 25, 80 25, 80 40 C80 55, 65 55, 50 40" fill="currentColor"/>
              {/* Bow Center */}
              <circle cx="50" cy="40" r="5" fill="#D4AF37"/>
              {/* Bow Tails */}
              <path d="M48 42 C40 55, 30 65, 25 70" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
              <path d="M52 42 C60 55, 70 65, 75 70" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          </div>

          {/* Arched Gold Frame */}
          <div className="absolute inset-0 rounded-t-full rounded-b-lg border-2 border-gold p-1.5 shadow-[0_10px_25px_rgba(63,17,22,0.25)] bg-[#FAF6F0]">
            <div className="w-full h-full rounded-t-full rounded-b bg-[#EFE6DA] overflow-hidden relative">
              <img
                src="/foto.jpeg"
                alt="Aqila Ahda Rayhaani, S.P"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3F1116]/15 to-transparent pointer-events-none" />
            </div>
          </div>
        </motion.div>

        {/* Graduate Info */}
        <motion.div variants={itemVariants} className="mb-6 relative z-10">
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#3F1116] tracking-wide mb-1.5 font-semibold">
            Aqila Ahda Rayhaani, S.P
          </h2>
          <div className="flex items-center justify-center gap-1.5 text-xs text-[#3F1116]/85 font-sans tracking-wide font-medium">
            <Award className="w-3.5 h-3.5 text-gold" />
            <span>Bachelor of Agriculture</span>
          </div>
          <p className="font-sans text-xs text-[#3F1116]/70 uppercase tracking-[0.15em] mt-2 font-medium">
            Universitas Andalas
          </p>
        </motion.div>

        {/* Decorative Divider */}
        <motion.div variants={itemVariants} className="w-24 mx-auto mb-8 relative z-10">
          <svg viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-gold">
            <path d="M0 10 L40 10 C45 10, 48 5, 50 5 C52 5, 55 10, 60 10 L100 10" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="50" cy="5" r="2" fill="currentColor" />
          </svg>
        </motion.div>

        {/* Guest Greeting Box */}
        {guestName && (
          <motion.div
            variants={itemVariants}
            className="mb-8 p-5 bg-[#EFE6DA] border border-gold/30 rounded-xl max-w-md mx-auto relative z-10 shadow-xs"
          >
            <p className="font-sans text-xs uppercase text-[#3F1116]/70 tracking-wider mb-1 font-semibold">
              Cordial Invitation For
            </p>
            <p className="font-accent text-3xl text-[#3F1116] leading-none py-1">
              {guestName}
            </p>
            <p className="font-sans text-[10px] text-[#3F1116]/80 mt-1">
              To witness and celebrate this milestone event.
            </p>
          </motion.div>
        )}

        {/* Event Snapshot */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 mt-8 py-6 border-t border-b border-gold/30 relative z-10"
        >
          <div className="flex items-center gap-3 text-left">
            <Calendar className="w-5 h-5 text-[#3F1116] flex-shrink-0" />
            <div>
              <p className="font-serif text-sm font-bold text-[#3F1116]">Saturday, 19th Sept 2026</p>
              <p className="font-sans text-xs text-[#3F1116]/75">1:00 PM - 3:00 PM WIB</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-left">
            <MapPin className="w-5 h-5 text-[#3F1116] flex-shrink-0" />
            <div>
              <p className="font-serif text-sm font-bold text-[#3F1116]">Auditorium Universitas Andalas</p>
              <p className="font-sans text-xs text-[#3F1116]/75">Kampus Limau Manis, Padang</p>
            </div>
          </div>
        </motion.div>

        {/* Ribbon Lace Corner Graphic */}
        <div className="absolute bottom-[-15px] right-[-15px] w-20 h-20 opacity-35 select-none pointer-events-none">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-gold">
            <path d="M0 100 Q 50 50, 100 0" stroke="currentColor" strokeWidth="0.5" />
            <path d="M20 100 Q 60 60, 100 20" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
            <circle cx="50" cy="50" r="1.5" fill="currentColor" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}
