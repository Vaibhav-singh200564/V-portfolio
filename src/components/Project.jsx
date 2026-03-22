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

/* ─── Project Data ─── */
const PROJECTS = [
  {
    id: 1,
    title: "Hospital Management System",
    tagline: "Healthcare, reimagined digitally",
    description:
      "Full-stack healthcare platform for managing patients, appointments, medical records, and secure authentication. Built with scalability and real hospital workflows in mind.",
    tech: ["React", "Node.js", "Express", "MongoDB", "JWT", "REST API"],
    category: "Full Stack",
    color: "#38bdf8",
    gradient: "linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)",
    icon: "🏥",
    stats: [
      { label: "Modules", value: "8+" },
      { label: "APIs", value: "20+" },
      { label: "Roles", value: "3" },
    ],
    github: "https://github.com/Vaibhav-singh200564",
    live: "#",
    featured: true,
  },
  {
    id: 2,
    title: "E-Commerce Web App",
    tagline: "Shop smarter, sell faster",
    description:
      "Complete online shopping platform with cart system, smooth checkout flow, and a powerful admin panel for full product lifecycle management.",
    tech: ["PHP", "MySQL", "JavaScript", "Bootstrap", "AJAX"],
    category: "Web App",
    color: "#818cf8",
    gradient: "linear-gradient(135deg, #6366f1 0%, #c084fc 100%)",
    icon: "🛒",
    stats: [
      { label: "Pages", value: "12+" },
      { label: "Features", value: "15+" },
      { label: "Admin", value: "✓" },
    ],
    github: "https://github.com/Vaibhav-singh200564",
    live: "#",
    featured: false,
  },
  {
    id: 3,
    title: "AdmissionSathi",
    tagline: "Your college journey, guided",
    description:
      "College exploration and counseling platform with smart filtering, secure authentication, and a dynamic backend helping students find the right institution.",
    tech: ["PHP", "MySQL", "JavaScript", "HTML/CSS"],
    category: "Platform",
    color: "#34d399",
    gradient: "linear-gradient(135deg, #10b981 0%, #38bdf8 100%)",
    icon: "🎓",
    stats: [
      { label: "Colleges", value: "50+" },
      { label: "Filters", value: "10+" },
      { label: "Users", value: "Live" },
    ],
    github: "https://github.com/Vaibhav-singh200564",
    live: "#",
    featured: false,
  },
];

const CATEGORIES = ["All", "Full Stack", "Web App", "Platform"];

/* ─── Tech Pill ─── */
function TechPill({ label, color }) {
  return (
    <span style={{
      fontFamily: "'DM Mono', monospace",
      fontSize: "0.62rem",
      letterSpacing: "0.08em",
      padding: "3px 10px",
      borderRadius: "99px",
      background: `${color}12`,
      border: `1px solid ${color}30`,
      color: color,
      whiteSpace: "nowrap",
    }}>
      {label}
    </span>
  );
}

/* ─── Project Card ─── */
function ProjectCard({ project, index, visible }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? `translateY(${hovered ? "-12px" : "0"})`
          : "translateY(50px)",
        transition: visible
          ? `transform 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.8s ease ${index * 0.15}s, background-color 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease`
          : `opacity 0.8s ease ${index * 0.15}s, transform 0.8s ease ${index * 0.15}s`,
        cursor: "pointer",
        position: "relative",
        borderRadius: "20px",
        background: hovered ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${hovered ? project.color + "45" : "rgba(255,255,255,0.06)"}`,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: hovered
          ? `0 24px 60px rgba(0,0,0,0.5), 0 0 50px ${project.color}18`
          : "0 4px 20px rgba(0,0,0,0.3)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* Top glow line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px",
        background: project.gradient,
        opacity: hovered ? 1 : 0.3,
        transition: "opacity 0.3s ease",
      }} />

      {/* Radial hover glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(circle at 50% 0%, ${project.color}09 0%, transparent 65%)`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.4s ease",
        pointerEvents: "none",
      }} />

      {/* Featured badge */}
      {project.featured && (
        <div style={{
          position: "absolute", top: "16px", right: "16px",
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.55rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          padding: "4px 12px",
          borderRadius: "99px",
          background: "linear-gradient(135deg, #0ea5e9, #6366f1)",
          color: "#fff",
          boxShadow: "0 0 16px rgba(56,189,248,0.45)",
          zIndex: 1,
        }}>★ Featured</div>
      )}

      <div style={{ padding: "28px", display: "flex", flexDirection: "column", flex: 1 }}>
        {/* Icon + title */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", marginBottom: "16px" }}>
          <div style={{
            width: "52px", height: "52px",
            borderRadius: "14px",
            background: project.gradient,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.5rem", flexShrink: 0,
            boxShadow: `0 0 22px ${project.color}35`,
            transform: hovered ? "scale(1.1) rotate(-5deg)" : "scale(1) rotate(0)",
            transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
          }}>{project.icon}</div>
          <div style={{ flex: 1 }}>
            <span style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: project.color,
              display: "block",
              marginBottom: "4px",
            }}>{project.category}</span>
            <h3 style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "1.05rem",
              color: "#e2e8f0",
              lineHeight: 1.2,
              margin: 0,
            }}>{project.title}</h3>
          </div>
        </div>

        {/* Tagline */}
        <p style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.7rem",
          color: project.color,
          opacity: 0.8,
          letterSpacing: "0.06em",
          marginBottom: "10px",
        }}>// {project.tagline}</p>

        {/* Description */}
        <p style={{
          color: "#64748b",
          fontSize: "0.82rem",
          lineHeight: 1.75,
          marginBottom: "18px",
          fontFamily: "'DM Mono', monospace",
        }}>{project.description}</p>

        {/* Stats */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "8px",
          marginBottom: "18px",
          padding: "14px",
          borderRadius: "12px",
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.04)",
        }}>
          {project.stats.map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "1rem",
                color: project.color,
                lineHeight: 1,
              }}>{s.value}</div>
              <div style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.58rem",
                color: "#475569",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginTop: "4px",
              }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tech pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "22px" }}>
          {project.tech.map(t => <TechPill key={t} label={t} color={project.color} />)}
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "10px", marginTop: "auto" }}>
          <a href={project.github} target="_blank" rel="noreferrer"
            className="bouncy-btn"
            style={{
              flex: 1, display: "flex", alignItems: "center",
              justifyContent: "center", gap: "7px",
              padding: "10px", borderRadius: "10px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#94a3b8",
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.68rem", letterSpacing: "0.08em",
              textDecoration: "none",
              transition: "border-color 0.25s ease, color 0.25s ease",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = `${project.color}50`; e.currentTarget.style.color = "#e2e8f0"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#94a3b8"; }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
            </svg>
            Code
          </a>
          <a href={project.live} target="_blank" rel="noreferrer"
            className="bouncy-btn-reverse"
            style={{
              flex: 1, display: "flex", alignItems: "center",
              justifyContent: "center", gap: "7px",
              padding: "10px", borderRadius: "10px",
              background: project.gradient,
              color: "#fff",
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.68rem", letterSpacing: "0.08em",
              textDecoration: "none",
              boxShadow: `0 0 20px ${project.color}28`,
              transition: "box-shadow 0.25s ease",
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 35px ${project.color}55`; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = `0 0 20px ${project.color}28`; }}
          >
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Live Demo
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── Filter Pill ─── */
function FilterPill({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      fontFamily: "'DM Mono', monospace",
      fontSize: "0.68rem",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      padding: "8px 20px",
      borderRadius: "99px",
      border: active ? "1px solid rgba(56,189,248,0.6)" : "1px solid rgba(255,255,255,0.08)",
      background: active
        ? "linear-gradient(135deg, rgba(14,165,233,0.15), rgba(99,102,241,0.15))"
        : "rgba(255,255,255,0.02)",
      color: active ? "#38bdf8" : "#475569",
      cursor: "pointer",
      transition: "all 0.25s ease",
      boxShadow: active ? "0 0 20px rgba(56,189,248,0.15)" : "none",
    }}
      onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = "rgba(56,189,248,0.3)"; e.currentTarget.style.color = "#94a3b8"; } }}
      onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#475569"; } }}
    >
      {label}
    </button>
  );
}

/* ─── Main ─── */
function Projects() {
  const [sectionRef, sectionVisible] = useReveal(0.05);
  const [cardsRef, cardsVisible] = useReveal(0.05);
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All"
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeFilter);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Mono:wght@300;400;500&display=swap');
        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes floatOrb {
          from { transform: translate(0,0) scale(1); }
          to   { transform: translate(15px,-20px) scale(1.08); }
        }
      `}</style>

      <section id="projects" ref={sectionRef} style={{
        position: "relative",
        padding: "100px 24px",
        overflow: "hidden",
        fontFamily: "'DM Mono', monospace",
      }}>
        {/* Orbs */}
        <div style={{ position:"absolute", top:"10%", right:"-100px", width:"400px", height:"400px", borderRadius:"50%", background:"radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)", filter:"blur(50px)", animation:"floatOrb 7s ease-in-out infinite alternate", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:"10%", left:"-80px", width:"350px", height:"350px", borderRadius:"50%", background:"radial-gradient(circle, rgba(56,189,248,0.07) 0%, transparent 70%)", filter:"blur(50px)", animation:"floatOrb 9s ease-in-out 2s infinite alternate-reverse", pointerEvents:"none" }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          {/* Header */}
          <div style={{
            textAlign: "center", marginBottom: "56px",
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}>
            <p style={{ fontSize:"0.65rem", letterSpacing:"0.28em", textTransform:"uppercase", color:"#38bdf8", marginBottom:"12px" }}>
              ◈ &nbsp; What I've Built
            </p>
            <h2 style={{
              fontFamily:"'Syne', sans-serif", fontWeight:900,
              fontSize:"clamp(2.5rem, 6vw, 4.5rem)", lineHeight:1, margin:"0 0 16px",
              background:"linear-gradient(135deg, #f1f5f9 20%, #38bdf8 55%, #818cf8 100%)",
              backgroundSize:"200% 200%",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
              animation:"gradientShift 6s ease infinite",
            }}>My Projects</h2>
            <p style={{ color:"#475569", fontSize:"0.85rem", maxWidth:"480px", margin:"0 auto 8px", lineHeight:1.8 }}>
              Real-world applications built with passion, precision, and purpose.
            </p>
            <div style={{
              height:"2px", width: sectionVisible ? "80px" : "0px",
              background:"linear-gradient(90deg, #38bdf8, #818cf8)",
              borderRadius:"99px", boxShadow:"0 0 12px #38bdf8",
              margin:"16px auto 0", transition:"width 1s ease 0.4s",
            }} />
          </div>

          {/* Filters */}
          <div style={{
            display:"flex", justifyContent:"center", flexWrap:"wrap", gap:"10px", marginBottom:"48px",
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s ease 0.2s",
          }}>
            {CATEGORIES.map(cat => (
              <FilterPill key={cat} label={cat} active={activeFilter === cat} onClick={() => setActiveFilter(cat)} />
            ))}
          </div>

          {/* Cards */}
          <div ref={cardsRef} style={{
            display:"grid",
            gridTemplateColumns:"repeat(auto-fit, minmax(340px, 1fr))",
            gap:"24px",
            alignItems:"stretch",
          }}>
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} visible={cardsVisible} />
            ))}
          </div>

          {/* Bottom CTA */}
          <div style={{ textAlign:"center", marginTop:"64px", opacity: sectionVisible ? 1 : 0, transition:"opacity 0.8s ease 0.6s" }}>
            <p style={{ color:"#334155", fontSize:"0.78rem", fontFamily:"'DM Mono', monospace", letterSpacing:"0.08em", marginBottom:"18px" }}>
              // more coming soon...
            </p>
            <a
              href="https://github.com/Vaibhav-singh200564"
              target="_blank" rel="noreferrer"
              style={{
                display:"inline-flex", alignItems:"center", gap:"8px",
                padding:"12px 28px", borderRadius:"12px",
                background:"rgba(255,255,255,0.02)",
                border:"1px solid rgba(56,189,248,0.2)",
                color:"#64748b",
                fontFamily:"'DM Mono', monospace",
                fontSize:"0.72rem", letterSpacing:"0.1em", textTransform:"uppercase",
                textDecoration:"none", transition:"all 0.3s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(56,189,248,0.5)"; e.currentTarget.style.color="#38bdf8"; e.currentTarget.style.boxShadow="0 0 24px rgba(56,189,248,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(56,189,248,0.2)"; e.currentTarget.style.color="#64748b"; e.currentTarget.style.boxShadow="none"; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
              </svg>
              View All on GitHub
            </a>
          </div>

        </div>
      </section>
    </>
  );
}

export default Projects;