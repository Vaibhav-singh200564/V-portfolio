import React, { useEffect, useRef } from 'react';

export default function SolarSystem() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Planet data: distance from sun, size, speed, color, current angle
    const planets = [
      { r: 50, size: 2.5, speed: 0.008, color: '#94a3b8', angle: Math.random() * Math.PI * 2 }, // Mercury
      { r: 90, size: 4, speed: 0.006, color: '#fcd34d', angle: Math.random() * Math.PI * 2 }, // Venus
      { r: 140, size: 5.5, speed: 0.004, color: '#38bdf8', angle: Math.random() * Math.PI * 2 }, // Earth
      { r: 190, size: 4.5, speed: 0.003, color: '#f87171', angle: Math.random() * Math.PI * 2 }, // Mars
      { r: 280, size: 14, speed: 0.002, color: '#fbbf24', angle: Math.random() * Math.PI * 2 }, // Jupiter
      { r: 380, size: 11, speed: 0.0015, color: '#fde047', angle: Math.random() * Math.PI * 2, rings: true }, // Saturn
      { r: 480, size: 8, speed: 0.001, color: '#6ee7b7', angle: Math.random() * Math.PI * 2 }, // Uranus
      { r: 580, size: 7, speed: 0.0008, color: '#818cf8', angle: Math.random() * Math.PI * 2 } // Neptune
    ];

    // Background stars
    const stars = Array.from({ length: 300 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5,
      opacity: Math.random(),
      speed: Math.random() * 0.015
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // We will place the sun offset to the left or center based on screen size
      const cx = canvas.width > 768 ? canvas.width * 0.75 : canvas.width * 0.5;
      const cy = canvas.height * 0.5;

      // Draw twinkling stars
      stars.forEach(star => {
        star.opacity += star.speed;
        if (star.opacity > 1 || star.opacity < 0) star.speed *= -1;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, star.opacity)})`;
        ctx.fill();
      });

      // Draw Sun
      ctx.beginPath();
      ctx.arc(cx, cy, 35, 0, Math.PI * 2);
      ctx.fillStyle = '#fef08a';
      ctx.shadowBlur = 60;
      ctx.shadowColor = '#fbbf24';
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw Planets and Orbits
      planets.forEach(p => {
        // Orbit path
        ctx.beginPath();
        ctx.arc(cx, cy, p.r, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Calculate planet position
        p.angle += p.speed;
        const px = cx + Math.cos(p.angle) * p.r;
        const py = cy + Math.sin(p.angle) * p.r;

        // Draw Planet
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        
        ctx.shadowBlur = 15;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw Saturn's rings
        if (p.rings) {
          ctx.beginPath();
          ctx.ellipse(px, py, p.size * 2.2, p.size * 0.6, p.angle, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(253, 224, 71, 0.3)';
          ctx.lineWidth = 3;
          ctx.stroke();
        }
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[3] overflow-hidden opacity-50 mix-blend-screen">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
