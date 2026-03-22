import React, { useEffect, useRef } from 'react';

export default function RainEffect() {
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

    // Raindrops
    const drops = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      l: Math.random() * 20 + 10,     // length
      v: Math.random() * 8 + 6,       // velocity
      opacity: Math.random() * 0.4 + 0.1, 
      angle: 0.05 // wind slant
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 1.2;
      ctx.lineCap = 'round';

      drops.forEach(drop => {
        ctx.beginPath();
        const grad = ctx.createLinearGradient(
          drop.x, drop.y, 
          drop.x + drop.l * drop.angle, drop.y + drop.l
        );
        grad.addColorStop(0, `rgba(255, 255, 255, 0)`);
        // Cyan-ish rain drop color
        grad.addColorStop(1, `rgba(186, 230, 253, ${drop.opacity})`);
        
        ctx.strokeStyle = grad;
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x + drop.l * drop.angle, drop.y + drop.l);
        ctx.stroke();

        drop.y += drop.v;
        drop.x += drop.v * drop.angle;

        if (drop.y > canvas.height || drop.x > canvas.width) {
          drop.y = -drop.l;
          drop.x = Math.random() * canvas.width * 1.5 - (canvas.width * 0.2); 
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
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
      {/* Dark moody overlay for the rain effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(2,8,23,0.8)] via-transparent to-transparent opacity-80" />

      {/* Cloud Shapes */}
      {/* Cloud 1 */}
      <div 
        className="absolute top-[-100px] left-[-5%] w-[50vw] h-[300px] rounded-[100%] opacity-40 mix-blend-screen"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(148,163,184,0.12) 0%, transparent 70%)',
          filter: 'blur(50px)',
          animation: 'cloudAnim 25s ease-in-out infinite'
        }}
      />
      
      {/* Cloud 2 */}
      <div 
        className="absolute top-[-120px] right-[-5%] w-[60vw] h-[350px] rounded-[100%] opacity-40 mix-blend-screen"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(100,116,139,0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'cloudAnimReverse 30s ease-in-out infinite'
        }}
      />
      
      {/* Cloud 3 - Central */}
      <div 
        className="absolute top-[-80px] left-[25%] w-[50vw] h-[250px] rounded-[100%] opacity-30 mix-blend-screen"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(71,85,105,0.2) 0%, transparent 60%)',
          filter: 'blur(45px)',
          animation: 'cloudAnimCenter 20s ease-in-out infinite'
        }}
      />

      {/* Atmospheric Fog */}
      <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-[rgba(2,8,23,0.4)] to-transparent opacity-60" />

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-80" />

      <style>{`
        @keyframes cloudAnim {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(60px, 20px) scale(1.05); }
        }
        @keyframes cloudAnimReverse {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-60px, 30px) scale(1.08); }
        }
        @keyframes cloudAnimCenter {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, 10px) scale(0.95); }
        }
      `}</style>
    </div>
  );
}
