"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, Phone, Car, Heart } from "lucide-react";

export default function LocationSection() {
  const graduationDate = new Date("2026-09-19T08:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = graduationDate - Date.now();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [graduationDate]);

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="py-20 px-4 md:py-28 relative bg-[#EFE6DA]/40 paper-texture">
      {/* Intricate Gold Divider line top & bottom */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="glass-card max-w-2xl mx-auto p-6 sm:p-8 rounded-2xl border border-gold/30 shadow-md text-center mb-20"
        >
          <span className="font-accent text-2xl text-[#3F1116] block mb-1 font-medium">
            Counting the Days
          </span>
          <h3 className="font-serif text-lg tracking-widest text-[#3F1116] uppercase mb-6 font-bold">
            The Graduation Countdown
          </h3>

          <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-md mx-auto">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="flex flex-col items-center">
                <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full border border-gold/50 bg-[#FAF6F0] flex flex-col items-center justify-center shadow-inner relative">
                  {/* Small inner ring */}
                  <div className="absolute inset-1 rounded-full border border-gold/15 pointer-events-none" />
                  <span className="font-serif text-lg sm:text-2xl font-bold text-gold-text-foil">
                    {String(value).padStart(2, "0")}
                  </span>
                </div>
                <span className="text-[10px] uppercase font-sans tracking-widest mt-2.5 text-[#3F1116]/80 font-bold">
                  {unit}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Map and Details Block */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          {/* Left: Venue Address and Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <motion.div variants={itemVariants}>
              <span className="font-accent text-3xl text-[#3F1116] block mb-1 font-medium">
                Directions
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#3F1116] uppercase tracking-wide font-bold">
                Venue Location
              </h2>
              <div className="w-16 h-[1px] bg-gold/50 mt-3" />
            </motion.div>

            {/* Address Card */}
            <motion.div
              variants={itemVariants}
              className="glass-card p-6 rounded-xl border border-gold/25 flex gap-4"
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#3F1116]/10 flex items-center justify-center text-[#3F1116] z-10 relative">
                  <MapPin className="w-5 h-5" />
                </div>
                {/* Pulsing Pin Ring */}
                <div className="absolute top-0 left-0 w-10 h-10 bg-[#3F1116]/20 rounded-full animate-ping pointer-events-none" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-base text-[#3F1116]">Auditorium Universitas Andalas</h4>
                <p className="font-sans text-xs text-[#3F1116]/80 mt-1 leading-relaxed">
                  Gedung Auditorium, Kampus Limau Manis, Universitas Andalas, Pauh, Kota Padang, Sumatera Barat.
                </p>
              </div>
            </motion.div>

            {/* Parking info */}
            <motion.div
              variants={itemVariants}
              className="glass-card p-6 rounded-xl border border-gold/25 flex gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-[#3F1116]/10 flex items-center justify-center text-[#3F1116] flex-shrink-0">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-base text-[#3F1116]">Area Parkir</h4>
                <p className="font-sans text-xs text-[#3F1116]/80 mt-1 leading-relaxed">
                  Area parkir tersedia di pelataran Gedung Auditorium Universitas Andalas (Unand).
                </p>
              </div>
            </motion.div>

            {/* Contact Person */}
            <motion.div
              variants={itemVariants}
              className="glass-card p-6 rounded-xl border border-gold/25 flex gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-[#3F1116]/10 flex items-center justify-center text-[#3F1116] flex-shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-base text-[#3F1116]">Kontak RSVP</h4>
                <p className="font-sans text-xs text-[#3F1116]/80 mt-1">
                  Aqila Ahda Rayhaani:{" "}
                  <a
                    href="https://wa.me/6281284286376"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#3F1116] hover:underline"
                  >
                    +62 812-8428-6376
                  </a>
                </p>
              </div>
            </motion.div>

            {/* Navigation Button */}
            <motion.div variants={itemVariants} className="pt-2">
              <a
                href="https://maps.google.com/?q=Auditorium+Universitas+Andalas"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#3F1116] text-[#F5ECE1] rounded-full font-serif text-sm tracking-wider hover:bg-[#2A090D] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer font-bold"
              >
                <Navigation className="w-4 h-4 text-gold-light" />
                Navigate with Google Maps
              </a>
            </motion.div>
          </div>

          {/* Right: Map Embed Frame (7 cols) */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-7 h-[300px] sm:h-[450px] w-full rounded-2xl overflow-hidden border-2 border-gold p-2 bg-[#FAF6F0] shadow-lg relative"
          >
            <div className="w-full h-full rounded-xl overflow-hidden relative">
              <iframe
                title="Auditorium Universitas Andalas Map"
                src="https://maps.google.com/maps?q=Auditorium%20Universitas%20Andalas&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 absolute inset-0 filter saturate-90 contrast-95"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
