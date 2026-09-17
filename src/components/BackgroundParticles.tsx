"use client";

import React, { useEffect, useRef } from "react";

interface Sparkle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
}

export default function BackgroundParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Sparkle[] = [];
    const maxParticles = 50;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Track mouse for wind influence
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Initialize gold sparkle particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3.5 + 1.5,
        speedX: Math.random() * 1.0 - 0.5,
        speedY: Math.random() * 0.8 + 0.4,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        opacity: Math.random() * 0.6 + 0.2,
      });
    }

    const drawGoldSparkle = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      opacity: number
    ) => {
      context.save();
      const grad = context.createRadialGradient(x, y, 0, x, y, size * 2.2);
      grad.addColorStop(0, `rgba(255, 245, 200, ${opacity})`);
      grad.addColorStop(0.35, `rgba(212, 175, 55, ${opacity * 0.7})`);
      grad.addColorStop(1, "rgba(212, 175, 55, 0)");

      context.fillStyle = grad;
      context.beginPath();
      context.arc(x, y, size * 2.2, 0, Math.PI * 2);
      context.fill();
      context.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth mouse interpolation
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      particles.forEach((p) => {
        p.y += p.speedY;
        const windX = 0.15 + (mouse.x - canvas.width / 2) * 0.0002;
        p.x += p.speedX + windX;
        p.rotation += p.rotationSpeed;

        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
          p.speedY = Math.random() * 0.8 + 0.4;
          p.speedX = Math.random() * 1.0 - 0.5;
          p.opacity = Math.random() * 0.6 + 0.2;
        }
        if (p.x > canvas.width + 20) {
          p.x = -20;
        } else if (p.x < -20) {
          p.x = canvas.width + 20;
        }

        drawGoldSparkle(ctx, p.x, p.y, p.size, p.opacity);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      {/* Warm Golden Glow ambient blurs */}
      <div className="absolute top-[10%] left-[20%] h-80 w-80 rounded-full bg-[#D4AF37]/10 blur-[100px] animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-[20%] right-[15%] h-96 w-96 rounded-full bg-[#D4AF37]/10 blur-[120px] animate-pulse-slow pointer-events-none delay-2000" />
      <div className="absolute top-[60%] left-[-10%] h-72 w-72 rounded-full bg-[#D4AF37]/8 blur-[90px] animate-pulse-slow pointer-events-none" />

      {/* Main falling particles canvas */}
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
