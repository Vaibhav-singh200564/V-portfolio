import { useEffect, useRef, useState } from "react";

const LINKS = [
  { label: "Home",         href: "#home" },
  { label: "About",        href: "#about" },
  { label: "Projects",     href: "#projects" },
  { label: "Skills",       href: "#skills" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact",      href: "#contact" },
];

function Navbar() {
  const [scrolled,     setScrolled]     = useState(false);
  const [active,       setActive]       = useState("home");
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [hovered,      setHovered]      = useState(null);
  const [inkStyle,     setInkStyle]     = useState({ left: 0, width: 0, opacity: 0 });
  const linkRefs       = useRef({});

  /* ── scroll + active-section tracking ── */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = LINKS.map(l => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── sliding ink underline ── */
  useEffect(() => {
    const key = hovered ?? active;
    const el  = linkRefs.current[key];
    if (el) {
      const { offsetLeft, offsetWidth } = el;
      setInkStyle({ left: offsetLeft, width: offsetWidth, opacity: 1 });
    }
  }, [hovered, active]);

  const scrollTo = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Syne:wght@400;500;600;700;800;900&family=DM+Mono:wght@300;400;500;600;700&display=swap');

        @keyframes navSlideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes logoPulse {
          0%,100% { text-shadow: 0 0 12px rgba(56,189,248,0.4); }
          50%      { text-shadow: 0 0 28px rgba(56,189,248,0.9), 0 0 50px rgba(129,140,248,0.4); }
        }
        @keyframes mobileSlide {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes dotBlink {
          0%,100% { opacity: 1; } 50% { opacity: 0.3; }
        }

        .nav-link {
          position: relative;
          font-family: 'DM Mono', monospace;
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #64748b;
          text-decoration: none;
          padding: 6px 2px;
          transition: color 0.25s ease;
          white-space: nowrap;
        }
        .nav-link:hover,
        .nav-link.active {
          color: #e2e8f0;
        }

        .github-btn {
          position: relative;
          font-family: 'DM Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #38bdf8;
          text-decoration: none;
          padding: 8px 18px;
          border-radius: 10px;
          border: 1px solid rgba(56,189,248,0.3);
          background: rgba(56,189,248,0.05);
          backdrop-filter: blur(8px);
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 7px;
          overflow: hidden;
        }
        .github-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(56,189,248,0.1), rgba(129,140,248,0.1));
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .github-btn:hover::before { opacity: 1; }
        .github-btn:hover {
          border-color: rgba(56,189,248,0.7);
          box-shadow: 0 0 20px rgba(56,189,248,0.25), inset 0 0 20px rgba(56,189,248,0.05);
          color: #fff;
          transform: translateY(-1px);
        }

        .hamburger-line {
          display: block;
          height: 1.5px;
          border-radius: 99px;
          background: #94a3b8;
          transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
          transform-origin: center;
        }
      `}</style>

      <nav
        style={{
          position:       "sticky",
          top:            0,
          zIndex:         1000,
          padding:        scrolled ? "0 clamp(16px, 5vw, 48px)" : "0 clamp(20px, 6vw, 48px)",
          height:         scrolled ? "60px" : "72px",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
          background:     scrolled
            ? "rgba(2,8,23,0.85)"
            : "rgba(2,8,23,0.6)",
          backdropFilter: "blur(20px)",
          borderBottom:   scrolled
            ? "1px solid rgba(56,189,248,0.12)"
            : "1px solid rgba(56,189,248,0.05)",
          boxShadow:      scrolled
            ? "0 8px 40px rgba(0,0,0,0.5)"
            : "none",
          transition:     "all 0.4s cubic-bezier(0.16,1,0.3,1)",
          animation:      "navSlideDown 0.6s cubic-bezier(0.16,1,0.3,1) both",
        }}
      >
        {/* ── Top gradient line ── */}
        <div style={{
          position:   "absolute",
          top:        0, left: 0, right: 0,
          height:     "1px",
          background: "linear-gradient(90deg, transparent, #38bdf8, #818cf8, #c084fc, transparent)",
          opacity:    scrolled ? 1 : 0.4,
          transition: "opacity 0.4s ease",
        }} />

        {/* ── Premium Logo ── */}
        <a
          href="#home"
          onClick={e => scrollTo(e, "#home")}
          style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}
          className="group"
          onMouseEnter={(e) => {
            const icon = e.currentTarget.querySelector('.logo-icon');
            if (icon) { icon.style.borderColor = "rgba(56,189,248,0.4)"; icon.style.boxShadow = "0 0 20px rgba(56,189,248,0.2)"; icon.style.transform = "scale(1.05)"; }
          }}
          onMouseLeave={(e) => {
            const icon = e.currentTarget.querySelector('.logo-icon');
            if (icon) { icon.style.borderColor = "rgba(255,255,255,0.08)"; icon.style.boxShadow = "none"; icon.style.transform = "scale(1)"; }
          }}
        >
          <div className="logo-icon" style={{
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(10px)",
            transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)"
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="url(#navLogoGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <defs>
                <linearGradient id="navLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#818cf8" />
                </linearGradient>
              </defs>
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "1.1rem",
            color: "#f8fafc",
            letterSpacing: "0.02em",
          }}>
            VAIBHAV<span style={{ color: "#38bdf8" }}>.</span>
          </span>
        </a>

        {/* ── Desktop Links ── */}
        <div
          className="desktop-nav"
          style={{
            display:     "flex",
            alignItems:  "center",
            gap:         "32px",
            position:    "relative",
          }}
        >
          {/* Sliding ink underline */}
          <div style={{
            position:   "absolute",
            bottom:     "-2px",
            left:       inkStyle.left,
            width:      inkStyle.width,
            height:     "1.5px",
            background: "linear-gradient(90deg, #38bdf8, #818cf8)",
            boxShadow:  "0 0 8px #38bdf8",
            borderRadius: "99px",
            opacity:    inkStyle.opacity,
            transition: "left 0.35s cubic-bezier(0.16,1,0.3,1), width 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.2s ease",
            pointerEvents: "none",
          }} />

          {LINKS.map(({ label, href }) => {
            const id = href.slice(1);
            return (
              <a
                key={id}
                ref={el => (linkRefs.current[id] = el)}
                href={href}
                className={`nav-link${active === id ? " active" : ""}`}
                onClick={e => scrollTo(e, href)}
                onMouseEnter={() => setHovered(id)}
                onMouseLeave={() => setHovered(null)}
              >
                {label}
              </a>
            );
          })}

          {/* GitHub */}
          <a
            href="https://github.com/Vaibhav-singh200564"
            target="_blank"
            rel="noreferrer"
            className="github-btn"
          >
            {/* GitHub SVG */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
            </svg>
            GitHub
          </a>
        </div>

        {/* ── Mobile Hamburger ── */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          className="mobile-menu-btn"
          aria-label="Toggle menu"
          style={{
            display:    "none",
            flexDirection: "column",
            gap:        "5px",
            background: "none",
            border:     "none",
            cursor:     "pointer",
            padding:    "6px",
          }}
        >
          <span className="hamburger-line" style={{
            width: "22px",
            transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none",
          }} />
          <span className="hamburger-line" style={{
            width: "16px",
            opacity: menuOpen ? 0 : 1,
            transform: menuOpen ? "scaleX(0)" : "none",
          }} />
          <span className="hamburger-line" style={{
            width: "22px",
            transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none",
          }} />
        </button>

        {/* ── Mobile Menu ── */}
        {menuOpen && (
          <div style={{
            position:   "absolute",
            top:        "100%",
            left:       0,
            right:      0,
            background: "rgba(2,8,23,0.97)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(56,189,248,0.15)",
            padding:    "20px 32px 28px",
            display:    "flex",
            flexDirection: "column",
            gap:        "4px",
            animation:  "mobileSlide 0.3s ease both",
          }}>
            {LINKS.map(({ label, href }, i) => {
              const id = href.slice(1);
              return (
                <a
                  key={id}
                  href={href}
                  onClick={e => scrollTo(e, href)}
                  style={{
                    fontFamily:   "'DM Mono', monospace",
                    fontSize:     "0.8rem",
                    letterSpacing:"0.1em",
                    textTransform:"uppercase",
                    color:        active === id ? "#38bdf8" : "#64748b",
                    textDecoration:"none",
                    padding:      "12px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                    display:      "flex",
                    alignItems:   "center",
                    justifyContent:"space-between",
                    animation:    `mobileSlide 0.3s ease ${i * 0.05}s both`,
                    transition:   "color 0.2s ease",
                  }}
                >
                  {label}
                  {active === id && (
                    <span style={{ color: "#38bdf8", fontSize: "0.6rem" }}>◈</span>
                  )}
                </a>
              );
            })}

            <a
              href="https://github.com/Vaibhav-singh200564"
              target="_blank"
              rel="noreferrer"
              className="github-btn"
              style={{ marginTop: "16px", justifyContent: "center" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
              </svg>
              GitHub
            </a>
          </div>
        )}
      </nav>

      {/* ── Responsive styles ── */}
      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}

export default Navbar;