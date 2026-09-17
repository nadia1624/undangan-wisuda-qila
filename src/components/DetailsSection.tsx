"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock, MapPin, Sparkles, HelpCircle } from "lucide-react";

export default function DetailsSection() {
  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any },
    },
  };

  const details = [
    {
      icon: <Clock className="w-6 h-6 text-gold" />,
      title: "Ceremony Schedule",
      subtitle: "Tanggal & Waktu",
      content: (
        <div className="space-y-3 font-sans text-sm text-[#3F1116]/80">
          <div>
            <span className="font-semibold font-serif text-base text-[#3F1116] block">
              Saturday, 19th September 2026
            </span>
            <span className="text-xs uppercase tracking-wider text-[#3F1116] font-bold">
              Prosesi Kelulusan
            </span>
          </div>
          <div className="h-[1px] bg-gold/30 w-full" />
          <div className="space-y-2 text-xs">
            <div>
              <p className="font-bold text-[#3F1116]">08:00 - 12:00 WIB</p>
              <p className="text-[10px] text-[#3F1116]/75">Upacara Wisuda Resmi</p>
            </div>
            <div>
              <p className="font-bold text-[#3F1116]">13:00 - 15:00 WIB</p>
              <p className="text-[10px] text-[#3F1116]/75">Sesi Undangan & Foto Bersama</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      icon: <MapPin className="w-6 h-6 text-gold" />,
      title: "Auditorium Universitas Andalas",
      subtitle: "Lokasi Wisuda",
      content: (
        <div className="space-y-3 font-sans text-sm text-[#3F1116]/80">
          <div>
            <span className="font-semibold font-serif text-base text-[#3F1116] block">
              Auditorium Unand
            </span>
            <span className="text-xs uppercase tracking-wider text-[#3F1116] font-bold">
              Universitas Andalas
            </span>
          </div>
          <div className="h-[1px] bg-gold/30 w-full" />
          <p className="text-xs leading-relaxed text-[#3F1116]/80">
            Kampus Limau Manis, Kec. Pauh, Kota Padang, Sumatera Barat 25163, Indonesia.
          </p>
        </div>
      ),
    },
    {
      icon: <Sparkles className="w-6 h-6 text-gold" />,
      title: "Muted Tone",
      subtitle: "Dress Code Palette",
      content: (
        <div className="space-y-3 font-sans text-sm text-[#3F1116]/80">
          <div>
            <span className="font-semibold font-serif text-base text-[#3F1116] block">
              Muted Tone Attire
            </span>
            <span className="text-xs uppercase tracking-wider text-[#3F1116] font-bold">
              Rekomendasi Busana
            </span>
          </div>
          <div className="h-[1px] bg-gold/30 w-full" />
          <p className="text-xs leading-relaxed text-[#3F1116]/80">
            Kami sangat mengapresiasi jika para tamu undangan dapat mengenakan busana bernuansa muted tone yang elegan:
          </p>
          <div className="flex flex-col gap-1.5 mt-2">
            <span className="bg-[#FAF6F0] border border-[#3F1116]/30 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider text-[#3F1116] font-bold shadow-xs flex items-center justify-between">
              <span>Sage + Cream</span>
              <span className="w-3 h-3 rounded-full border border-black/10 bg-[#9CAF88]" />
            </span>
            <span className="bg-[#FAF6F0] border border-[#3F1116]/30 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider text-[#3F1116] font-bold shadow-xs flex items-center justify-between">
              <span>Dusty Pink + Mocha</span>
              <span className="w-3 h-3 rounded-full border border-black/10 bg-[#C48B9F]" />
            </span>
            <span className="bg-[#FAF6F0] border border-[#3F1116]/30 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider text-[#3F1116] font-bold shadow-xs flex items-center justify-between">
              <span>Mauve + Taupe</span>
              <span className="w-3 h-3 rounded-full border border-black/10 bg-[#9E7B88]" />
            </span>
            <span className="bg-[#FAF6F0] border border-[#3F1116]/30 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider text-[#3F1116] font-bold shadow-xs flex items-center justify-between">
              <span>Muted Terracotta + Beige</span>
              <span className="w-3 h-3 rounded-full border border-black/10 bg-[#C87D65]" />
            </span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="py-20 px-4 md:py-28 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="font-accent text-3xl sm:text-4xl text-[#3F1116] block mb-2 font-medium">
            Details of Ceremony
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl tracking-wide uppercase text-gold-text-foil font-bold">
            Event Information
          </h2>
          <div className="w-16 h-[1px] bg-gold/50 mx-auto mt-4" />
        </div>

        {/* Details Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {details.map((detail, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass-card glass-card-hover p-6 sm:p-8 rounded-xl relative flex flex-col sm:flex-row gap-5 items-start text-left"
            >
              {/* Gold Ornamented Icon */}
              <div className="w-12 h-12 rounded-full border border-gold/50 flex items-center justify-center bg-pearl flex-shrink-0 shadow-sm relative">
                <div className="absolute inset-1 rounded-full border border-gold/20" />
                {detail.icon}
              </div>

              {/* Text content */}
              <div className="flex-1 space-y-2">
                <div>
                  <p className="text-[10px] uppercase font-sans tracking-widest text-[#3F1116]/70 font-bold">
                    {detail.subtitle}
                  </p>
                  <h3 className="font-serif text-lg font-bold text-[#3F1116]">
                    {detail.title}
                  </h3>
                </div>
                <div>{detail.content}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
