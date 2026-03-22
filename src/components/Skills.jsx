import { useEffect, useRef, useState } from "react";

/* ─── Scroll Reveal ─── */
function useReveal(threshold = 0.1) {
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

/* ─── Skills Data ─── */
const CATEGORIES = [
  {
    id: "frontend",
    label: "Frontend",
    icon: "🎨",
    color: "#38bdf8",
    gradient: "linear-gradient(135deg, #0ea5e9, #6366f1)",
    skills: [
      { name: "HTML",        level: 95, icon: "🌐" },
      { name: "CSS",         level: 90, icon: "🎨" },
      { name: "JavaScript",  level: 88, icon: "⚡" },
      { name: "React",       level: 85, icon: "⚛️" },
      { name: "Tailwind CSS",level: 82, icon: "🌊" },
      { name: "Bootstrap",   level: 80, icon: "🅱️" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: "⚙️",
    color: "#818cf8",
    gradient: "linear-gradient(135deg, #6366f1, #c084fc)",
    skills: [
      { name: "Node.js",     level: 82, icon: "🟢" },
      { name: "Express.js",  level: 80, icon: "🚂" },
      { name: "PHP",         level: 75, icon: "🐘" },
      { name: "MongoDB",     level: 78, icon: "🍃" },
      { name: "MySQL",       level: 76, icon: "🗄️" },
    ],
  },
  {
    id: "languages",
    label: "Languages",
    icon: "💻",
    color: "#34d399",
    gradient: "linear-gradient(135deg, #10b981, #38bdf8)",
    skills: [
      { name: "JavaScript",  level: 88, icon: "⚡" },
      { name: "Python",      level: 72, icon: "🐍" },
      { name: "C++",         level: 70, icon: "🔧" },
      { name: "C",           level: 68, icon: "©️" },
      { name: "Java",        level: 65, icon: "☕" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    icon: "🛠️",
    color: "#fb923c",
    gradient: "linear-gradient(135deg, #f97316, #f59e0b)",
    skills: [
      { name: "Git",         level: 85, icon: "🌿" },
      { name: "GitHub",      level: 85, icon: "🐙" },
      { name: "VS Code",     level: 92, icon: "💙" },
      { name: "Postman",     level: 78, icon: "📮" },
    ],
  },
];

const ALL_SKILLS = [
  { name: "HTML",        level: 95, icon: "🌐", color: "#f97316" },
  { name: "CSS",         level: 90, icon: "🎨", color: "#38bdf8" },
  { name: "JavaScript",  level: 88, icon: "⚡", color: "#fbbf24" },
  { name: "React",       level: 85, icon: "⚛️", color: "#38bdf8" },
  { name: "Tailwind CSS",level: 82, icon: "🌊", color: "#06b6d4" },
  { name: "Bootstrap",   level: 80, icon: "🅱️", color: "#818cf8" },
  { name: "Node.js",     level: 82, icon: "🟢", color: "#4ade80" },
  { name: "Express.js",  level: 80, icon: "🚂", color: "#94a3b8" },
  { name: "PHP",         level: 75, icon: "🐘", color: "#818cf8" },
  { name: "MongoDB",     level: 78, icon: "🍃", color: "#4ade80" },
  { name: "MySQL",       level: 76, icon: "🗄️", color: "#38bdf8" },
  { name: "Python",      level: 72, icon: "🐍", color: "#fbbf24" },
  { name: "C++",         level: 70, icon: "🔧", color: "#c084fc" },
  { name: "C",           level: 68, icon: "©️", color: "#94a3b8" },
  { name: "Java",        level: 65, icon: "☕", color: "#fb923c" },
  { name: "Git",         level: 85, icon: "🌿", color: "#f97316" },
  { name: "GitHub",      level: 85, icon: "🐙", color: "#e2e8f0" },
  { name: "VS Code",     level: 92, icon: "💙", color: "#38bdf8" },
  { name: "Postman",     level: 78, icon: "📮", color: "#f97316" },
];

/* ─── Skill Card ─── */
function SkillCard({ skill, index, visible, color }) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setTilt({ x, y });
  };

  const accentColor = color || skill.color || "#38bdf8";

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
      onMouseMove={handleMouseMove}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? `perspective(600px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateY(${hovered ? "-6px" : "0"})`
          : "translateY(40px) scale(0.95)",
        transition: visible
          ? `opacity 0.5s ease ${index * 0.05}s, transform 0.15s ease`
          : `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s`,
        position: "relative",
        borderRadius: "16px",
        background: hovered ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${hovered ? accentColor + "50" : "rgba(255,255,255,0.06)"}`,
        backdropFilter: "blur(10px)",
        boxShadow: hovered
          ? `0 16px 40px rgba(0,0,0,0.4), 0 0 30px ${accentColor}18`
          : "0 2px 12px rgba(0,0,0,0.2)",
        cursor: "default",
        overflow: "hidden",
        padding: "20px 16px 16px",
      }}
    >
      {/* Top glow */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px",
        background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
        opacity: hovered ? 1 : 0.2,
        transition: "opacity 0.3s ease",
      }} />

      {/* Radial bg glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(circle at 50% 0%, ${accentColor}10 0%, transparent 70%)`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.3s ease",
        pointerEvents: "none",
      }} />

      {/* Icon */}
      <div style={{
        fontSize: "1.8rem",
        textAlign: "center",
        marginBottom: "10px",
        transform: hovered ? "scale(1.15) translateY(-2px)" : "scale(1)",
        transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
        filter: hovered ? `drop-shadow(0 0 10px ${accentColor}80)` : "none",
      }}>
        {skill.icon}
      </div>

      {/* Name */}
      <p style={{
        fontFamily: "'Syne', sans-serif",
        fontWeight: 700,
        fontSize: "0.82rem",
        color: hovered ? "#e2e8f0" : "#94a3b8",
        textAlign: "center",
        marginBottom: "12px",
        transition: "color 0.25s ease",
        letterSpacing: "0.02em",
      }}>
        {skill.name}
      </p>

      {/* Level bar */}
      <div style={{
        height: "3px",
        borderRadius: "99px",
        background: "rgba(255,255,255,0.05)",
        overflow: "hidden",
        marginBottom: "6px",
      }}>
        <div style={{
          height: "100%",
          borderRadius: "99px",
          width: visible ? `${skill.level}%` : "0%",
          background: `linear-gradient(90deg, ${accentColor}, ${accentColor}80)`,
          boxShadow: `0 0 8px ${accentColor}60`,
          transition: `width 1.2s cubic-bezier(0.16,1,0.3,1) ${index * 0.05 + 0.3}s`,
        }} />
      </div>

      {/* Level label */}
      <p style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: "0.6rem",
        color: hovered ? accentColor : "#334155",
        textAlign: "center",
        letterSpacing: "0.1em",
        transition: "color 0.25s ease",
      }}>
        {skill.level}%
      </p>
    </div>
  );
}

/* ─── Category Tab ─── */
function CategoryTab({ cat, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "10px 20px",
        borderRadius: "12px",
        border: active ? `1px solid ${cat.color}55` : "1px solid rgba(255,255,255,0.06)",
        background: active
          ? `linear-gradient(135deg, ${cat.color}, ${cat.color}dd)`
          : "rgba(255,255,255,0.03)",
        color: active ? "#000000" : "#64748b",
        fontWeight: active ? 700 : 500,
        fontFamily: "'DM Mono', monospace",
        fontSize: "0.68rem",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        cursor: "pointer",
        transition: "all 0.25s ease",
        boxShadow: active ? `0 0 20px ${cat.color}18` : "none",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={e => {
        if (!active) {
          e.currentTarget.style.borderColor = `${cat.color}35`;
          e.currentTarget.style.color = "#94a3b8";
        }
      }}
      onMouseLeave={e => {
        if (!active) {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
          e.currentTarget.style.color = "#475569";
        }
      }}
    >
      <span>{cat.icon}</span>
      {cat.label}
    </button>
  );
}

/* ─── Orbit Ring Visual ─── */
function OrbitRing() {
  return (
    <div style={{
      position: "absolute",
      top: "50%", left: "50%",
      transform: "translate(-50%, -50%)",
      width: "600px", height: "600px",
      pointerEvents: "none",
      zIndex: 0,
    }}>
      {[600, 460, 320].map((size, i) => (
        <div key={i} style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: `${size}px`, height: `${size}px`,
          borderRadius: "50%",
          border: `1px solid rgba(56,189,248,${0.04 + i * 0.02})`,
          animation: `spin${i} ${20 + i * 8}s linear infinite`,
        }} />
      ))}
      <style>{`
        @keyframes spin0 { from{transform:translate(-50%,-50%) rotate(0deg)} to{transform:translate(-50%,-50%) rotate(360deg)} }
        @keyframes spin1 { from{transform:translate(-50%,-50%) rotate(0deg)} to{transform:translate(-50%,-50%) rotate(-360deg)} }
        @keyframes spin2 { from{transform:translate(-50%,-50%) rotate(0deg)} to{transform:translate(-50%,-50%) rotate(360deg)} }
      `}</style>
    </div>
  );
}

/* ─── Skill Typewriter ─── */
function SkillTypewriter({ text, delayIndex }) {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delayIndex * 300);
    return () => clearTimeout(startTimer);
  }, [delayIndex]);

  useEffect(() => {
    if (!started) return;
    let timer;
    const typeSpeed = isDeleting ? 30 : 90;
    
    timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(text.substring(0, displayText.length + 1));
        if (displayText === text) {
          timer = setTimeout(() => setIsDeleting(true), 4000);
        }
      } else {
        setDisplayText(text.substring(0, displayText.length - 1));
        if (displayText === "") {
          setIsDeleting(false);
          timer = setTimeout(() => {}, 500); // short pause before retyping
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, text, started]);

  return (
    <span style={{ display: "inline-block", minWidth: "115px" }}>
      {displayText}
      <span style={{ opacity: 0.7, animation: "glowPulse 1s infinite" }}>|</span>
    </span>
  );
}

/* ─── Main Skills Component ─── */
function Skills() {
  const [sectionRef, sectionVisible] = useReveal(0.05);
  const [gridRef, gridVisible] = useReveal(0.05);
  const [activeTab, setActiveTab] = useState("all");

  const currentCat = CATEGORIES.find(c => c.id === activeTab);
  const displaySkills = activeTab === "all"
    ? ALL_SKILLS
    : currentCat?.skills.map(s => ({ ...s, color: currentCat.color })) || [];

  const activeColor = currentCat?.color || "#38bdf8";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Mono:wght@300;400;500&display=swap');
        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes floatUp {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }
        @keyframes runningStripes {
          from { background-position: 0 0; }
          to { background-position: 28px 0; }
        }
        .running-stripes {
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(
            -45deg,
            rgba(255, 255, 255, 0.2),
            rgba(255, 255, 255, 0.2) 10px,
            transparent 10px,
            transparent 20px
          );
          background-size: 28.28px 100%;
          animation: runningStripes 0.7s linear infinite;
        }
        @keyframes energyRun {
          0% { transform: translateX(-150%); }
          100% { transform: translateX(250%); }
        }
        .running-beam {
          position: absolute;
          top: 0; left: 0; bottom: 0; width: 70%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
          animation: energyRun 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>

      <section
        id="skills"
        ref={sectionRef}
        style={{
          position: "relative",
          padding: "100px 24px",
          overflow: "hidden",
          fontFamily: "'DM Mono', monospace",
        }}
      >
        {/* Background orbs */}
        <div style={{
          position:"absolute", top:"20%", left:"-120px",
          width:"500px", height:"500px", borderRadius:"50%",
          background:"radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%)",
          filter:"blur(60px)", pointerEvents:"none",
          animation:"glowPulse 5s ease-in-out infinite",
        }} />
        <div style={{
          position:"absolute", bottom:"10%", right:"-100px",
          width:"400px", height:"400px", borderRadius:"50%",
          background:"radial-gradient(circle, rgba(129,140,248,0.06) 0%, transparent 70%)",
          filter:"blur(60px)", pointerEvents:"none",
          animation:"glowPulse 7s ease-in-out 1s infinite",
        }} />

        <div style={{ maxWidth:"1100px", margin:"0 auto", position:"relative", zIndex:1 }}>

          {/* ── Header ── */}
          <div style={{
            textAlign:"center", marginBottom:"56px",
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}>
            <p style={{
              fontSize:"0.65rem", letterSpacing:"0.28em",
              textTransform:"uppercase", color:"#38bdf8", marginBottom:"12px",
            }}>◈ &nbsp; What I Work With</p>

            <h2 style={{
              fontFamily:"'Syne', sans-serif", fontWeight:900,
              fontSize:"clamp(2.5rem, 6vw, 4.5rem)", lineHeight:1,
              margin:"0 0 16px",
              background:"linear-gradient(135deg, #f1f5f9 20%, #38bdf8 55%, #818cf8 100%)",
              backgroundSize:"200% 200%",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
              animation:"gradientShift 6s ease infinite",
            }}>My Skills</h2>

            <p style={{
              color:"#475569", fontSize:"0.85rem",
              maxWidth:"460px", margin:"0 auto 8px", lineHeight:1.8,
            }}>
              Technologies I use to bring ideas to life — from pixels to servers.
            </p>

            <div style={{
              height:"2px", width: sectionVisible ? "80px" : "0px",
              background:"linear-gradient(90deg, #38bdf8, #818cf8)",
              borderRadius:"99px", boxShadow:"0 0 12px #38bdf8",
              margin:"16px auto 0", transition:"width 1s ease 0.4s",
            }} />
          </div>

          {/* ── Tabs ── */}
          <div style={{
            display:"flex", justifyContent:"center",
            flexWrap:"wrap", gap:"10px", marginBottom:"48px",
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "translateY(0)" : "translateY(20px)",
            transition:"all 0.7s ease 0.25s",
          }}>
            {/* All tab */}
            <button
              onClick={() => setActiveTab("all")}
              style={{
                display:"flex", alignItems:"center", gap:"8px",
                padding:"10px 20px", borderRadius:"12px",
                border: activeTab === "all" ? "1px solid rgba(56,189,248,0.55)" : "1px solid rgba(255,255,255,0.06)",
                background: activeTab === "all"
                  ? "linear-gradient(135deg, rgba(56,189,248,0.15), rgba(99,102,241,0.1))"
                  : "rgba(255,255,255,0.02)",
                color: activeTab === "all" ? "#38bdf8" : "#475569",
                fontFamily:"'DM Mono', monospace",
                fontSize:"0.68rem", letterSpacing:"0.1em", textTransform:"uppercase",
                cursor:"pointer", transition:"all 0.25s ease",
                boxShadow: activeTab === "all" ? "0 0 20px rgba(56,189,248,0.15)" : "none",
              }}
            >
              ✦ All ({ALL_SKILLS.length})
            </button>

            {CATEGORIES.map(cat => (
              <CategoryTab
                key={cat.id}
                cat={cat}
                active={activeTab === cat.id}
                onClick={() => setActiveTab(cat.id)}
              />
            ))}
          </div>

          {/* ── Active category description ── */}
          {activeTab !== "all" && currentCat && (
            <div style={{
              textAlign:"center", marginBottom:"32px",
              opacity: sectionVisible ? 1 : 0,
              transition:"opacity 0.5s ease",
            }}>
              <div style={{
                display:"inline-flex", alignItems:"center", gap:"10px",
                padding:"10px 24px", borderRadius:"99px",
                background:`${currentCat.color}10`,
                border:`1px solid ${currentCat.color}25`,
              }}>
                <span style={{ fontSize:"1.1rem" }}>{currentCat.icon}</span>
                <span style={{
                  fontFamily:"'DM Mono', monospace", fontSize:"0.7rem",
                  color: currentCat.color, letterSpacing:"0.1em",
                }}>
                  {currentCat.skills.length} skills in {currentCat.label}
                </span>
              </div>
            </div>
          )}

          {/* ── Skills Grid ── */}
          <div
            ref={gridRef}
            style={{
              display:"grid",
              gridTemplateColumns:"repeat(auto-fill, minmax(130px, 1fr))",
              gap:"14px",
            }}
          >
            {displaySkills.map((skill, i) => (
              <SkillCard
                key={`${activeTab}-${skill.name}`}
                skill={skill}
                index={i}
                visible={gridVisible}
                color={skill.color}
              />
            ))}
          </div>

          {/* ── Overall proficiency bar ── */}
          <div style={{
            marginTop:"64px",
            padding:"28px 32px",
            borderRadius:"20px",
            background:"rgba(255,255,255,0.02)",
            border:"1px solid rgba(255,255,255,0.05)",
            backdropFilter:"blur(10px)",
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "translateY(0)" : "translateY(20px)",
            transition:"all 0.8s ease 0.5s",
          }}>
            <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:"28px" }}>
              {[
                { label:"Frontend",       pct:88, color:"#38bdf8" },
                { label:"Backend",        pct:79, color:"#818cf8" },
                { label:"Database",       pct:77, color:"#34d399" },
                { label:"Problem Solving",pct:82, color:"#fb923c" },
              ].map((item, i) => (
                <div key={i} style={{ flex:"1", minWidth:"180px" }}>
                  <div style={{
                    display:"flex", justifyContent:"space-between",
                    marginBottom:"10px",
                  }}>
                    <span style={{
                      fontFamily:"'Syne', sans-serif",
                      fontWeight: 600,
                      fontSize:"0.85rem", color:"#e2e8f0",
                    }}><SkillTypewriter text={item.label} delayIndex={i} /></span>
                    <span style={{
                      fontFamily:"'Syne', sans-serif",
                      fontWeight: 800,
                      fontSize:"0.85rem", color: item.color,
                    }}>{item.pct}%</span>
                  </div>
                  <div style={{
                    height:"10px", borderRadius:"99px",
                    background:"rgba(0,0,0,0.2)",
                    overflow:"hidden",
                    border:"1px solid rgba(255,255,255,0.06)",
                    boxShadow:"inset 0 2px 4px rgba(0,0,0,0.4)"
                  }}>
                    <div style={{
                      height:"100%", borderRadius:"99px",
                      width: sectionVisible ? `${item.pct}%` : "0%",
                      backgroundColor: item.color,
                      boxShadow:`0 0 16px ${item.color}90`,
                      transition:`width 1.4s cubic-bezier(0.16,1,0.3,1) ${0.6 + i * 0.1}s`,
                      position: "relative",
                      overflow: "hidden"
                    }}>
                      {/* Active computing diagonal stripes */}
                      <div className="running-stripes" />
                      {/* Sweeping laser energy flare */}
                      <div className="running-beam" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

export default Skills;