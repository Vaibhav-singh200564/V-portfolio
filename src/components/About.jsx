import { useEffect, useRef, useState } from "react";

/* ─── Scroll Reveal Hook ─── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ─── Animated Skill Bar ─── */
function SkillBar({ label, pct, color, delay, visible }) {
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-30px)",
        transition: `all 0.7s ease ${delay}`,
      }}
    >
      <div className="flex justify-between mb-2">
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: "0.9rem", color: "#f1f5f9", opacity: 0.85 }}>
          {label}
        </span>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "0.9rem", color }}>
          {pct}%
        </span>
      </div>
      <div
        style={{
          height: "6px",
          borderRadius: "99px",
          background: "rgba(255,255,255,0.05)",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div
          style={{
            height: "100%",
            borderRadius: "99px",
            width: visible ? `${pct}%` : "0%",
            background: `linear-gradient(90deg, ${color}, ${color}aa)`,
            boxShadow: `0 0 12px ${color}66`,
            transition: `width 1.2s cubic-bezier(0.16,1,0.3,1) ${delay}`,
          }}
        />
      </div>
    </div>
  );
}

/* ─── Info Chip ─── */
function Chip({ icon, text }) {
  return (
    <div
      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm"
      style={{
        background: "rgba(56,189,248,0.05)",
        color: "#f1f5f9",
        fontFamily: "'Syne', sans-serif",
        fontWeight: 600,
        fontSize: "0.85rem",
        backdropFilter: "blur(8px)",
        transition: "all 0.3s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(56,189,248,0.4)";
        e.currentTarget.style.color = "#e2e8f0";
        e.currentTarget.style.boxShadow = "0 0 20px rgba(56,189,248,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(56,189,248,0.15)";
        e.currentTarget.style.color = "#94a3b8";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <span>{icon}</span>
      <span>{text}</span>
    </div>
  );
}

/* ─── Floating Decorative Orb ─── */
function Orb({ size, top, left, color, delay }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        top,
        left,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: "blur(50px)",
        animation: `floatOrb 6s ease-in-out ${delay} infinite alternate`,
        opacity: 0.5,
      }}
    />
  );
}

/* ─── Timeline Item ─── */
function TimelineItem({ year, title, sub, visible, delay }) {
  return (
    <div
      className="flex gap-4"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.6s ease ${delay}`,
      }}
    >
      {/* Line + dot */}
      <div className="flex flex-col items-center">
        <div
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #38bdf8, #818cf8)",
            boxShadow: "0 0 12px rgba(56,189,248,0.6)",
            marginTop: "4px",
            flexShrink: 0,
          }}
        />
        <div style={{ width: "1px", flex: 1, background: "rgba(56,189,248,0.15)", marginTop: "4px" }} />
      </div>
      {/* Content */}
      <div className="pb-6">
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.63rem",
            color: "#38bdf8",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          {year}
        </span>
        <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.05rem", color: "#f1f5f9", margin: "4px 0 6px", lineHeight: 1.3, letterSpacing: "-0.01em" }}>
          {title}
        </h3>
        <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: "0.85rem", color: "#818cf8", opacity: 0.85, margin: 0, lineHeight: 1.6 }}>
          {sub}
        </p>
      </div>
    </div>
  );
}

/* ─── Main About Component ─── */
function About() {
  const [sectionRef, sectionVisible] = useReveal(0.05);
  const [skillsRef, skillsVisible] = useReveal(0.2);
  const [timelineRef, timelineVisible] = useReveal(0.2);

  const skills = [
    { label: "React / Next.js", pct: 90, color: "#38bdf8" },
    { label: "Node.js / Express", pct: 85, color: "#818cf8" },
    { label: "MongoDB / Mongoose", pct: 80, color: "#34d399" },
    { label: "TypeScript", pct: 72, color: "#fb923c" },
    { label: "UI / UX Design", pct: 68, color: "#f472b6" },
  ];

  const timeline = [
    {
      year: "2024 – Present",
      title: "Full Stack Developer | UI/UX Designer | Problem Solver",
      sub: "Designing and engineering scalable, high-performance MERN applications by combining clean architecture with intuitive UI/UX design. Focused on building seamless, user-centric products backed by efficient and optimized logic."
    },
    {
      year: "2023 – Present",
      title: "Data Structures & Algorithms",
      sub: "Solved 400+ problems, developing strong problem-solving intuition and mastering core data structures including arrays, linked lists, stacks, queues, trees, and graphs. Applied concepts like recursion, sliding window, and complexity optimization to write efficient, high-quality code."
    },
    {
      year: "2023",
      title: "Frontend Engineer (React Ecosystem)",
      sub: "Built dynamic and responsive interfaces using React, emphasizing reusable component architecture, performance optimization, and visually refined user experiences."
    },
    {
      year: "2023",
      title: "Started Development Journey",
      sub: "Began with HTML, CSS, and JavaScript, building a strong foundation in web development, UI/UX principles, and programming fundamentals."
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Mono:wght@300;400;500&display=swap');

        @keyframes floatOrb {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(20px, -20px) scale(1.1); }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .about-card {
          position: relative;
          background: rgba(10, 22, 40, 0.3);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.04);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.05);
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.4s ease;
          z-index: 1;
        }

        .about-card::before {
          content: "";
          position: absolute;
          inset: -2px;
          border-radius: 22px;
          background: linear-gradient(115deg, transparent 20%, rgba(56, 189, 248, 0.8) 40%, rgba(168, 85, 247, 0.9) 60%, transparent 80%);
          background-size: 300% 300%;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        
        .about-card::after {
          content: "";
          position: absolute;
          inset: 1px;
          border-radius: 19px;
          background: linear-gradient(160deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.0) 100%);
          background-color: rgba(10, 22, 40, 0.85);
          z-index: -1;
          pointer-events: none;
          transition: background-color 0.4s ease;
        }

        .about-card:hover {
          transform: translateY(-8px) rotate(-1.5deg) scale(1.03);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(56, 189, 248, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.1);
          z-index: 10;
        }
        
        .about-card:hover::after {
          background-color: rgba(15, 30, 50, 0.9);
        }

        .about-card:hover::before {
          opacity: 1;
          animation: borderGlowSweep 3s linear infinite;
        }

        .about-card:active {
          transform: translateY(2px) rotate(2deg) scale(0.97);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.02);
        }

        @keyframes borderGlowSweep {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <section
        id="about"
        ref={sectionRef}
        className="relative py-28 px-6 overflow-hidden"
        style={{ fontFamily: "'DM Mono', monospace" }}
      >
        {/* Decorative orbs */}
        <Orb size="400px" top="-100px" left="-150px" color="rgba(56,189,248,0.12)" delay="0s" />
        <Orb size="300px" top="40%" left="70%" color="rgba(129,140,248,0.1)" delay="2s" />

        {/* Rotating ring decoration */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "10%",
            right: "5%",
            width: "200px",
            height: "200px",
            border: "1px solid rgba(56,189,248,0.08)",
            borderRadius: "50%",
            animation: "spinSlow 20s linear infinite",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              right: "10px",
              bottom: "10px",
              border: "1px dashed rgba(129,140,248,0.1)",
              borderRadius: "50%",
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto">

          {/* Section Header */}
          <div
            style={{
              marginBottom: "60px",
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
              <div style={{ height: "1px", width: 32, background: "linear-gradient(90deg, transparent, #38bdf8)" }} />
              <span style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.62rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#38bdf8",
              }}>
                Get to know me
              </span>
            </div>

            <h2 style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2.2rem, 5.5vw, 3.4rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              margin: "0 0 16px",
            }}>
              <span style={{
                background: "linear-gradient(135deg, #f1f5f9 0%, #94a3b8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                About{" "}
              </span>
              <span style={{
                background: "linear-gradient(135deg, #38bdf8, #818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                Me
              </span>
            </h2>

            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "1.05rem",
              fontWeight: 400,
              color: "#e2e8f0",
              maxWidth: "480px",
              lineHeight: 1.8,
              letterSpacing: "0.01em",
            }}>
              A passionate Full Stack Developer blending elegant code, dynamic architecture, and performance to craft next-generation web applications.
            </p>
          </div>

          {/* Main Layout */}
          
          {/* Top Row: Bio & Skills */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-8">
            
            {/* LEFT: Bio & CTA */}
            <div className="flex flex-col gap-8 h-full">
              {/* Bio card */}
              <div
                className="about-card p-8 flex-1"
                style={{
                  opacity: sectionVisible ? 1 : 0,
                  transform: sectionVisible ? "translateX(0)" : "translateX(-40px)",
                  transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s",
                }}
              >
                {/* Avatar row */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "16px",
                      background: "linear-gradient(135deg, #0ea5e9, #6366f1, #c084fc)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.5rem",
                      boxShadow: "0 0 24px rgba(56,189,248,0.35)",
                      flexShrink: 0,
                    }}
                  ></div>
                  <div>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.05rem", color: "#f1f5f9", margin: "0 0 3px", lineHeight: 1.25, letterSpacing: "-0.01em" }}>
                      Vaibhav
                    </h3>
                    <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: "0.9rem", color: "#38bdf8", opacity: 0.85, margin: "0" }}>
                      Full Stack MERN Developer
                    </p>
                  </div>
                </div>

                <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, color: "#f1f5f9", opacity: 0.85, lineHeight: 1.8, fontSize: "0.9rem", marginTop: "12px", marginBottom: "12px" }}>
                  I'm a passionate{" "}
                  <span style={{ color: "#38bdf8", fontWeight: 800 }}>Full Stack Developer</span>{" "}
                  specializing in the MERN stack. I love turning ideas into fast, scalable, and beautiful web applications.
                </p>
                <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, color: "#818cf8", opacity: 0.85, lineHeight: 1.8, fontSize: "0.9rem" }}>
                  When I'm not pushing commits, I'm exploring new technologies, contributing to open source, or designing UI systems that feel alive.
                </p>

                {/* Chips */}
                <div className="flex flex-wrap gap-2 mt-8">
                  <Chip icon="📍" text="India" />
                  <Chip icon="🎓" text="B.Tech CS" />
                  <Chip icon="☕" text="Coffee Driven" />
                </div>
              </div>

              {/* CTA row */}
              <div
                className="flex gap-4 flex-wrap"
                style={{
                  opacity: sectionVisible ? 1 : 0,
                  transition: "opacity 0.8s ease 0.5s",
                }}
              >
                <a
                  href="#"
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, #0ea5e9, #6366f1)",
                    boxShadow: "0 0 24px rgba(56,189,248,0.25)",
                    color: "#fff",
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.78rem",
                    letterSpacing: "0.06em",
                    textDecoration: "none",
                  }}
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download CV
                </a>
                <a
                  href="mailto:hrithiksingh050@gmail.com"
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(56,189,248,0.2)",
                    color: "#94a3b8",
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.78rem",
                    letterSpacing: "0.06em",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(56,189,248,0.5)";
                    e.currentTarget.style.color = "#e2e8f0";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(56,189,248,0.2)";
                    e.currentTarget.style.color = "#94a3b8";
                  }}
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact Me
                </a>
              </div>
            </div>

            {/* RIGHT: Skills */}
            <div
              className="about-card p-8 flex flex-col justify-center h-full w-full"
              ref={skillsRef}
              style={{
                opacity: sectionVisible ? 1 : 0,
                transform: sectionVisible ? "translateX(0)" : "translateX(40px)",
                transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s",
              }}
            >
              <p
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#818cf8",
                  marginBottom: "28px",
                }}
              >
                ◈ &nbsp; Technical Proficiency
              </p>
              <div className="flex flex-col gap-7">
                {skills.map((s, i) => (
                  <SkillBar
                    key={s.label}
                    {...s}
                    delay={`${i * 0.12}s`}
                    visible={skillsVisible}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Middle Row: Values Cards */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            style={{
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? "translateY(0)" : "translateY(40px)",
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s",
            }}
          >
            {[
              { icon: "⚡", title: "Performance", desc: "Every ms matters. I optimize for speed and UX." },
              { icon: "🎨", title: "Clean UI", desc: "Pixel-perfect, accessible and beautiful interfaces." },
              { icon: "🔧", title: "Clean Code", desc: "Readable, maintainable and scalable architecture." },
              { icon: "🚀", title: "Shipping", desc: "From idea to production — fast and reliable delivery." },
            ].map((v, i) => (
              <div
                key={i}
                className="about-card p-6 flex flex-col items-center justify-center text-center"
              >
                <div
                  style={{
                    fontSize: "1.7rem",
                    marginBottom: "16px",
                    filter: "drop-shadow(0 0 8px rgba(56,189,248,0.4))",
                  }}
                >
                  {v.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: "1.05rem",
                    color: "#f1f5f9",
                    margin: "0 0 6px",
                    lineHeight: 1.25,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {v.title}
                </h3>
                <p style={{ 
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  color: "#818cf8",
                  opacity: 0.85,
                  margin: 0,
                  lineHeight: 1.6 
                }}>{v.desc}</p>
              </div>
            ))}
          </div>

          {/* Bottom Row: Journey Timeline */}
          <div
            className="about-card p-8 w-full"
            ref={timelineRef}
            style={{
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? "translateY(0)" : "translateY(40px)",
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s",
            }}
          >
            <p
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#38bdf8",
                marginBottom: "36px",
              }}
            >
              🚀 &nbsp; Journey
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              {timeline.map((item, i) => (
                <TimelineItem
                  key={i}
                  {...item}
                  visible={timelineVisible}
                  delay={`${i * 0.15}s`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;