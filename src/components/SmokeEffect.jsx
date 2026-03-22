import { useEffect, useRef } from "react";

const SmokeEffect = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create smoke particles (puffs)
    const puffCount = 40; // Number of smoke puffs
    const puffs = [];

    for (let i = 0; i < puffCount; i++) {
        puffs.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.3 + 0.5, // Flow direction (mostly rightwards)
            vy: (Math.random() - 0.5) * 0.2 - 0.1, // Slight upward drift
            radius: Math.random() * 150 + 100, // Large, soft puffy circles
            alpha: Math.random() * 0.05 + 0.01 // Very translucent
        });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < puffs.length; i++) {
        let p = puffs[i];
        
        // Draw the puff using a radial gradient
        const gradient = ctx.createRadialGradient(p.x, p.y, p.radius * 0.1, p.x, p.y, p.radius);
        // Use a misty/smoky white/cyan color
        gradient.addColorStop(0, `rgba(100, 150, 255, ${p.alpha})`);
        gradient.addColorStop(0.5, `rgba(80, 120, 220, ${p.alpha * 0.5})`);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Move the puff
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around the screen for continuous flow
        if (p.x - p.radius > canvas.width) p.x = -p.radius;
        if (p.x + p.radius < 0) p.x = canvas.width + p.radius;
        if (p.y - p.radius > canvas.height) p.y = -p.radius;
        if (p.y + p.radius < 0) p.y = canvas.height + p.radius;
      }
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 mix-blend-screen" style={{ opacity: 0.6 }}>
      <canvas ref={canvasRef} className="w-full h-full" style={{ filter: 'blur(10px)' }} />
    </div>
  );
};

export default SmokeEffect;
