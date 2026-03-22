import { useEffect, useRef, useState } from "react";

const CERTS = [
  {
    id: 1,
    title: "Build Generative AI Apps",
    subtitle: "No Code",
    issuer: "Infosys Springboard",
    category: "AI",
    num: "01",
    link: "https://infyspringboard.onwingspan.com/public-assets/infosysheadstart/cert/lex_auth_014157683688415232146/1-a83ed5ea-40b7-42c1-98cc-1193a1750c01.pdf",
    color: "#38bdf8",
    colorDim: "rgba(56,189,248,0.07)",
    colorBorder: "rgba(56,189,248,0.18)",
    colorGlow: "rgba(56,189,248,0.22)",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Computational Theory",
    subtitle: "Automata",
    issuer: "Infosys Springboard",
    category: "CS Theory",
    num: "02",
    link: "https://infyspringboard.onwingspan.com/public-assets/infosysheadstart/cert/lex_auth_0135015511562403847605/1-1b2243ba-eef7-4192-a528-9283d0f0cdeb.pdf",
    color: "#a78bfa",
    colorDim: "rgba(167,139,250,0.07)",
    colorBorder: "rgba(167,139,250,0.18)",
    colorGlow: "rgba(167,139,250,0.22)",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7a3 3 0 013-3h10a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7zm5 3h6M9 14h6" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Cloud Computing",
    subtitle: "NPTEL Certification",
    issuer: "NPTEL",
    category: "Cloud",
    num: "03",
    link: "https://drive.google.com/file/d/1FBFOYiyW5_8CX2wGrOtwvLSCndIQCcOn/view?usp=sharing",
    color: "#fb923c",
    colorDim: "rgba(251,146,60,0.07)",
    colorBorder: "rgba(251,146,60,0.18)",
    colorGlow: "rgba(251,146,60,0.22)",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Peer to Peer Protocols",
    subtitle: "& Local Area Networks",
    issuer: "University of Colorado · Coursera",
    category: "Networking",
    num: "04",
    link: "https://www.coursera.org/account/accomplishments/verify/3CFQEA5AR7FB",
    color: "#34d399",
    colorDim: "rgba(52,211,153,0.07)",
    colorBorder: "rgba(52,211,153,0.18)",
    colorGlow: "rgba(52,211,153,0.22)",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
      </svg>
    ),
  },
  {
    id: 5,
    title: "Bits & Bytes of",
    subtitle: "Computer Networking",
    issuer: "Google · Coursera",
    category: "Networking",
    num: "05",
    link: "https://www.coursera.org/account/accomplishments/verify/JQUPHRA7Z6L5",
    color: "#38bdf8",
    colorDim: "rgba(56,189,248,0.07)",
    colorBorder: "rgba(56,189,248,0.18)",
    colorGlow: "rgba(56,189,248,0.22)",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
  },
  {
    id: 6,
    title: "Introduction to",
    subtitle: "Hardware & OS",
    issuer: "IBM · Coursera",
    category: "Systems",
    num: "06",
    link: "https://www.coursera.org/account/accomplishments/verify/MK53EJCDYOLN",
    color: "#f472b6",
    colorDim: "rgba(244,114,182,0.07)",
    colorBorder: "rgba(244,114,182,0.18)",
    colorGlow: "rgba(244,114,182,0.22)",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
        <rect x="2" y="3" width="20" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    id: 7,
    title: "Object Oriented",
    subtitle: "Programming · 72 Hours",
    issuer: "LPU · iamneo Platform",
    category: "Programming",
    num: "07",
    link: "https://drive.google.com/file/d/1cVsnkk61ARqwTC-5CAHvartqmra489q9/view?usp=sharing",
    color: "#fbbf24",
    colorDim: "rgba(251,191,36,0.07)",
    colorBorder: "rgba(251,191,36,0.18)",
    colorGlow: "rgba(251,191,36,0.22)",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    id: 8,
    title: "Java Programming",
    subtitle: "Core to Advanced",
    issuer: "iamneo Platform",
    category: "Programming",
    num: "08",
    link: "https://drive.google.com/file/d/1-ZvBAL9rQwrZ_tp8FxVuGuiKfvPnhoZd/view?usp=sharing",
    color: "#f97316",
    colorDim: "rgba(249,115,22,0.07)",
    colorBorder: "rgba(249,115,22,0.18)",
    colorGlow: "rgba(249,115,22,0.22)",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 9,
    title: "Data Structures",
    subtitle: "& Algorithms",
    issuer: "iamneo Platform",
    category: "DSA",
    num: "09",
    link: "https://drive.google.com/file/d/15lfCupbdDSJkvSVIyG5W23zdVpT5BJ1u/view?usp=sharing",
    color: "#e879f9",
    colorDim: "rgba(232,121,249,0.07)",
    colorBorder: "rgba(232,121,249,0.18)",
    colorGlow: "rgba(232,121,249,0.22)",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
];

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function CertCard({ cert, index }) {
  const [ref, inView] = useInView(0.08);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(40px) scale(0.97)",
        transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${index * 0.08}s, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${index * 0.08}s`,
      }}
    >
      <a
        href={cert.link}
        target="_blank"
        rel="noreferrer"
        style={{ textDecoration: "none", display: "block", height: "100%" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          style={{
            position: "relative",
            borderRadius: "18px",
            border: `1px solid ${hovered ? cert.color : cert.colorBorder}`,
            background: "rgba(8,18,34,0.75)",
            backdropFilter: "blur(16px)",
            padding: "28px 26px 24px",
            overflow: "hidden",
            transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
            boxShadow: hovered
              ? `0 24px 64px ${cert.colorGlow}, 0 0 0 1px ${cert.colorBorder}, inset 0 1px 0 rgba(255,255,255,0.04)`
              : "0 2px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.02)",
            transform: hovered ? "translateY(-6px)" : "translateY(0)",
            cursor: "pointer",
            height: "100%",
          }}
        >
          {/* Radial glow */}
          <div style={{
            position: "absolute", top: -30, right: -30, width: 160, height: 160,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${cert.colorGlow} 0%, transparent 70%)`,
            opacity: hovered ? 1 : 0.4,
            transition: "opacity 0.35s ease",
            pointerEvents: "none",
          }} />

          {/* Top colored line */}
          <div style={{
            position: "absolute", top: 0, left: "20%", right: "20%", height: "1px",
            background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)`,
            opacity: hovered ? 0.9 : 0.25,
            transition: "opacity 0.35s ease",
          }} />

          {/* Number watermark */}
          <div style={{
            position: "absolute", bottom: -12, right: 14,
            fontFamily: "'Syne', sans-serif",
            fontWeight: 900,
            fontSize: "5.5rem",
            color: cert.color,
            opacity: 0.045,
            lineHeight: 1,
            userSelect: "none",
            pointerEvents: "none",
            letterSpacing: "-0.04em",
          }}>
            {cert.num}
          </div>

          {/* Top row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <div style={{
              width: 42, height: 42, borderRadius: "12px",
              background: cert.colorDim,
              border: `1px solid ${cert.colorBorder}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: cert.color,
              transition: "box-shadow 0.3s ease",
              boxShadow: hovered ? `0 0 20px ${cert.colorGlow}` : "none",
            }}>
              {cert.icon}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.58rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: cert.color,
                background: cert.colorDim,
                border: `1px solid ${cert.colorBorder}`,
                borderRadius: "99px",
                padding: "3px 10px",
              }}>
                {cert.category}
              </span>
              <div style={{
                color: hovered ? cert.color : "rgba(100,116,139,0.35)",
                transition: "color 0.3s, transform 0.3s",
                transform: hovered ? "translate(2px,-2px)" : "translate(0,0)",
              }}>
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </div>
          </div>

          {/* Title */}
          <h3 style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "1.05rem",
            color: "#f1f5f9",
            margin: "0 0 3px",
            lineHeight: 1.25,
            letterSpacing: "-0.01em",
          }}>
            {cert.title}
          </h3>
          <p style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 600,
            fontSize: "0.9rem",
            color: cert.color,
            margin: "0 0 16px",
            opacity: 0.85,
          }}>
            {cert.subtitle}
          </p>

          {/* Divider */}
          <div style={{ height: "1px", background: "rgba(255,255,255,0.05)", margin: "0 0 14px" }} />

          {/* Issuer */}
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <svg width="11" height="11" fill="none" stroke={cert.color} strokeWidth="2" viewBox="0 0 24 24" style={{ opacity: 0.6, flexShrink: 0 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            <span style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.63rem",
              letterSpacing: "0.06em",
              color: "#475569",
              textTransform: "uppercase",
            }}>
              {cert.issuer}
            </span>
          </div>
        </div>
      </a>
    </div>
  );
}

export default function Certificates() {
  const [titleRef, titleInView] = useInView(0.1);

  return (
    <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 24px" }}>

      {/* Header */}
      <div
        ref={titleRef}
        style={{
          marginBottom: "60px",
          opacity: titleInView ? 1 : 0,
          transform: titleInView ? "translateY(0)" : "translateY(30px)",
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
            Verified Credentials
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
            Certificates &{" "}
          </span>
          <span style={{
            background: "linear-gradient(135deg, #38bdf8, #818cf8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Achievements
          </span>
        </h2>

        <p style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.9rem",
          color: "#94a3b8",
          maxWidth: "480px",
          lineHeight: 1.8,
          letterSpacing: "0.02em",
        }}>
          A curated collection of courses across AI, cloud, networking, systems & programming — each one sharpening a new edge.
        </p>
      </div>

      {/* Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))",
        gap: "20px",
      }}>
        {CERTS.map((cert, i) => (
          <CertCard key={cert.id} cert={cert} index={i} />
        ))}
      </div>

      {/* Footer count */}
      <div style={{ marginTop: "48px", display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ height: "1px", flex: 1, background: "rgba(255,255,255,0.04)" }} />
        <span style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.75rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#64748b",
        }}>
          {CERTS.length} certificates earned
        </span>
        <div style={{ height: "1px", flex: 1, background: "rgba(255,255,255,0.04)" }} />
      </div>
    </section>
  );
}