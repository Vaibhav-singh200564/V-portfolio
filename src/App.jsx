import { useEffect, useRef, useState } from "react";
import About from "./components/About";
import Project from "./components/Project";
import Navbar from "./components/Navbar";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Certificates from "./components/Certificates";
import HeroAvatar from './components/HeroAvatar';
import RainEffect from './components/RainEffect';
import SolarSystem from './components/SolarSystem';
import CodingStats from './components/CodingStats';
import CodingActivity from './components/CodingActivity';
import SmokeEffect from './components/SmokeEffect';

/* ─── Floating Particle Canvas ─── */
function ParticleCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.4,
      dx: (Math.random() - 0.5) * 0.35, dy: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.5 + 0.15,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(56,189,248,${0.12 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56,189,248,${p.alpha})`;
        ctx.fill();
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ opacity: 0.7 }} />;
}

/* ─── Typewriter ─── */
function TypewriterText({ words }) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = words[wordIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplay(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) setTimeout(() => setDeleting(true), 1400);
        else setCharIdx(c => c + 1);
      } else {
        setDisplay(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) { setDeleting(false); setWordIdx(w => (w + 1) % words.length); setCharIdx(0); }
        else setCharIdx(c => c - 1);
      }
    }, deleting ? 55 : 90);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words]);
  return (
    <span className="text-cyan-400">
      {display}<span className="animate-pulse text-cyan-300">|</span>
    </span>
  );
}

/* ─── Scroll Reveal ─── */
function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, visible];
}



/* ─── Stats Counter ─── */
function StatCard({ value, label, delay }) {
  const [ref, visible] = useScrollReveal();
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const end = parseInt(value);
    const step = Math.ceil(end / 40);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); } else setCount(start);
    }, 35);
    return () => clearInterval(timer);
  }, [visible, value]);
  return (
    <div ref={ref} className="flex flex-col items-center"
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: `all 0.6s ease ${delay}` }}>
      <span className="text-3xl lg:text-4xl font-black"
        style={{ background: "linear-gradient(135deg, #38bdf8, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        {count}+
      </span>
      <span className="text-xs text-slate-400 mt-1 tracking-wider uppercase">{label}</span>
    </div>
  );
}

/* ─── Hero ─── */
function HeroSection() {
  const [ref, visible] = useScrollReveal(0.05);
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <section id="home" ref={ref} className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)", filter: "blur(40px)", animation: "pulse 4s ease-in-out infinite" }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(129,140,248,0.08) 0%, transparent 70%)", filter: "blur(40px)", animation: "pulse 5s ease-in-out infinite reverse" }} />

      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 w-full max-w-6xl mx-auto z-10" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)" }}>

        {/* Left Content */}
        <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start pl-0 lg:pl-4">

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mt-5 mb-4 leading-none tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
            Hi, I'm{" "}
            <span style={{ background: "linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #c084fc 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", filter: "drop-shadow(0 0 30px rgba(56,189,248,0.4))" }}>
              Vaibhav
            </span>{" "}
          </h1>

          <h2 className="text-lg md:text-2xl text-slate-300 mb-5 font-light" style={{ fontFamily: "'DM Mono', monospace" }}>
            <TypewriterText words={["Software Developer", "UI/UX Designer"]} />
          </h2>

          <p className="max-w-lg text-slate-400 mb-8 leading-relaxed md:mx-0 mx-auto"
            style={{ opacity: visible ? 1 : 0, transition: "opacity 1.2s ease 0.3s", letterSpacing: "0.01em", fontFamily: "'Outfit', sans-serif", fontSize: "1.025rem", fontWeight: 300 }}>
            I specialize in engineering <span className="text-cyan-400" style={{ fontWeight: 500 }}>blazing-fast</span>, highly interactive web applications that leave a lasting impression. 
            From conceptual design to seamless deployment, I transform <span className="text-purple-400" style={{ fontWeight: 500 }}>bold visions</span> into pixel-perfect reality.
          </p>

          <div className="flex gap-4 justify-center md:justify-start flex-wrap w-full md:w-auto">
            <button onClick={() => scrollTo("projects")}
              className="bouncy-btn group relative px-6 md:px-8 py-3 rounded-xl font-semibold text-sm tracking-wide overflow-hidden"
              style={{ background: "linear-gradient(135deg, #0ea5e9, #6366f1)", boxShadow: "0 0 30px rgba(56,189,248,0.3), 0 4px 20px rgba(0,0,0,0.4)", fontFamily: "'DM Mono', monospace" }}>
              <span className="relative z-10 flex items-center gap-2">
                View Projects
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>

            <button onClick={() => scrollTo("contact")}
              className="bouncy-btn-reverse group px-6 md:px-8 py-3 rounded-xl font-semibold text-sm tracking-wide"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(56,189,248,0.25)", color: "#94a3b8", fontFamily: "'DM Mono', monospace", backdropFilter: "blur(10px)", transition: "border-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(56,189,248,0.6)"; e.currentTarget.style.color = "#e2e8f0"; e.currentTarget.style.boxShadow = "0 0 20px rgba(56,189,248,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(56,189,248,0.25)"; e.currentTarget.style.color = "#94a3b8"; e.currentTarget.style.boxShadow = "none"; }}>
              Contact Me →
            </button>
          </div>
        </div>

        {/* Right Side Avatar */}
        <div className="flex-shrink-0 flex justify-center md:justify-end md:pr-8 mb-8 md:mb-0 relative z-10">
          <HeroAvatar />
        </div>

      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 z-10" style={{ animation: "bounce 2s ease-in-out infinite" }}>
        <span className="text-xs tracking-widest uppercase font-medium">Scroll</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}

/* ─── Section Wrapper ─── */
function RevealSection({ children, id }) {
  const [ref, visible] = useScrollReveal(0.05);
  return (
    <div id={id} ref={ref}
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(50px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)" }}>
      {children}
    </div>
  );
}

/* ─── Glow Divider ─── */
function GlowDivider() {
  return (
    <div className="flex items-center justify-center py-4 px-8">
      <div className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, rgba(56,189,248,0.2), transparent)" }} />
      <div className="mx-4 w-2 h-2 rounded-full" style={{ background: "#38bdf8", boxShadow: "0 0 10px #38bdf8" }} />
      <div className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, rgba(56,189,248,0.2), transparent)" }} />
    </div>
  );
}

/* ─── Footer ─── */
function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const NAV = ["home", "about", "projects", "skills", "certificates", "contact"];
  const SOCIALS = [
    { href: "https://github.com/Vaibhav-singh200564", color: "#e2e8f0", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" /></svg> },
    { href: "https://www.linkedin.com/in/vaibhavsingh200564/", color: "#818cf8", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg> },
    { href: "mailto:hrithiksingh050@gmail.com", color: "#38bdf8", icon: <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
    { href: "https://wa.me/917068518219", color: "#4ade80", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg> },
  ];

  return (
    <footer style={{ 
      borderTop: "1px solid rgba(56,189,248,0.15)", 
      padding: "80px 24px 40px", 
      position: "relative", 
      overflow: "hidden",
      background: "radial-gradient(ellipse at center top, rgba(56,189,248,0.04) 0%, transparent 60%)"
    }}>
      {/* Top Laser Border Glow */}
      <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: "2px", background: "linear-gradient(90deg, transparent, #38bdf8, #818cf8, transparent)", opacity: 0.6, boxShadow: "0 0 20px #38bdf8" }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        
        {/* Top Grid Area */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
          gap: "48px", 
          marginBottom: "64px" 
        }}>
          
          {/* Brand & Bio Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            
            <div style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }} onClick={() => scrollTo("home")}>
              <div style={{
                width: "44px", height: "44px", borderRadius: "12px",
                background: "linear-gradient(135deg, rgba(56,189,248,0.1), rgba(129,140,248,0.1))",
                border: "1px solid rgba(56,189,248,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 20px rgba(56,189,248,0.15)"
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="url(#footLogoGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <defs>
                    <linearGradient id="footLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#818cf8" />
                    </linearGradient>
                  </defs>
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.45rem", color: "#f8fafc", letterSpacing: "0.02em" }}>
                Vaibhav<span style={{ color: "#38bdf8" }}>.</span>
              </span>
            </div>
            
            {/* The Specific Bio Request */}
            <p style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.85rem",
              color: "#94a3b8",
              lineHeight: 1.8,
              maxWidth: "350px",
              marginTop: "8px"
            }}>
              Software developer crafting innovative solutions & sharing knowledge.
            </p>
            
            {/* Socials Under Bio */}
            <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
              {SOCIALS.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noreferrer"
                  style={{ width: "38px", height: "38px", borderRadius: "10px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b", textDecoration: "none", transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)" }}
                  onMouseEnter={e => { e.currentTarget.style.color = s.color; e.currentTarget.style.borderColor = `${s.color}60`; e.currentTarget.style.boxShadow = `0 6px 16px ${s.color}25`; e.currentTarget.style.transform = "translateY(-4px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "#64748b"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>
                  {s.icon}
                </a>
              ))}
            </div>

          </div>

          {/* Quick Links Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "#f1f5f9", letterSpacing: "0.05em" }}>Quick Links</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {NAV.map(link => (
                <button key={link} onClick={() => scrollTo(link)}
                  style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Mono', monospace", fontSize: "0.80rem", letterSpacing: "0.05em", textTransform: "capitalize", color: "#64748b", transition: "all 0.2s ease", padding: 0, textAlign: "left", width: "max-content", display: "flex", alignItems: "center", gap: "6px" }}
                  onMouseEnter={e => { e.currentTarget.style.color = "#38bdf8"; e.currentTarget.style.transform = "translateX(5px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "#64748b"; e.currentTarget.style.transform = "translateX(0)"; }}>
                  <span style={{ color:"#38bdf850" }}>▹</span> {link}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Faded Horizontal Divider */}
        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)", marginBottom: "32px", width: "100%" }} />

        {/* Bottom Credits Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: "#94a3b8", letterSpacing: "0.02em", margin: 0 }}>
            Built with <span style={{ color: "#38bdf8", fontWeight: 500 }}>React.js</span>, <span style={{ color: "#38bdf8", fontWeight: 500 }}>Tailwind CSS</span>, and <span style={{ color: "#818cf8", fontWeight: 500 }}>Love</span>.
          </p>
          
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: "#64748b", letterSpacing: "0.05em", margin: 0 }}>
            © {new Date().getFullYear()} <span style={{ color: "#f8fafc", fontWeight: 500 }}>Vaibhav</span>. All rights reserved.
          </p>

        </div>

      </div>
    </footer>
  );
}

/* ─── App ─── */
function App() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500&family=Syne:wght@400;700;800;900&family=DM+Mono:wght@300;400;500&display=swap');
        * { box-sizing: border-box; }
        :root { --bg-primary: #020817; --bg-secondary: #0a1628; --accent-cyan: #38bdf8; --accent-purple: #818cf8; }
        body { background: var(--bg-primary); font-family: 'DM Mono', monospace; margin: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #020817; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(#38bdf8, #818cf8); border-radius: 99px; }
        body::before { content: ''; position: fixed; inset: 0; background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px); pointer-events: none; z-index: 9999; }
        @keyframes pulse { 0%,100%{opacity:0.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.05)} }
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)} }

        .bouncy-btn { transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) !important; }
        .bouncy-btn:hover { transform: translateY(-3px) rotate(-3deg) scale(1.05) !important; }
        .bouncy-btn:active { transform: translateY(2px) rotate(4deg) scale(0.9) !important; }
        
        .bouncy-btn-reverse { transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) !important; }
        .bouncy-btn-reverse:hover { transform: translateY(-3px) rotate(3deg) scale(1.05) !important; }
        .bouncy-btn-reverse:active { transform: translateY(2px) rotate(-4deg) scale(0.9) !important; }
      `}</style>

      <div className="relative min-h-screen text-white"
        style={{ background: "linear-gradient(135deg, #020817 0%, #0a1628 50%, #020817 100%)" }}>

        <SmokeEffect />
        <ParticleCanvas />
        <SolarSystem />
        <RainEffect />

        <div className="fixed top-0 left-0 right-0 h-px z-50"
          style={{ background: "linear-gradient(to right, transparent, #38bdf8, #818cf8, #c084fc, transparent)" }} />

        <div className="relative z-40"><Navbar /></div>

        <main className="relative z-10">
          <HeroSection />
          <GlowDivider />
          <RevealSection id="about"><About /></RevealSection>
          <GlowDivider />
          <RevealSection id="projects"><Project /></RevealSection>
          <GlowDivider />
          <RevealSection id="skills"><Skills /></RevealSection>
          <GlowDivider />
          <RevealSection id="certificates"><Certificates /></RevealSection>
          <GlowDivider />
          <RevealSection id="stats"><CodingStats /></RevealSection>
          <GlowDivider />
          <RevealSection id="activity"><CodingActivity /></RevealSection>
          <GlowDivider />
          <RevealSection id="contact"><Contact /></RevealSection>
          <GlowDivider />
          <Footer />
        </main>
      </div>
    </>
  );
}

export default App;