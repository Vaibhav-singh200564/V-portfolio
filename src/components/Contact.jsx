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

/* ─── Premium Glass Input ─── */
function GlassField({ label, type = "text", value, onChange, multiline }) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div style={{ position: "relative", width: "100%", marginTop: "16px" }}>
      <label style={{
        position: "absolute",
        left: "16px",
        top: active ? "-10px" : "18px",
        fontSize: active ? "0.75rem" : "0.95rem",
        color: active ? "#38bdf8" : "#64748b",
        fontFamily: "'Outfit', sans-serif",
        fontWeight: active ? 500 : 300,
        background: active ? "#061022" : "transparent",
        padding: active ? "0 8px" : "0",
        borderRadius: "4px",
        pointerEvents: "none",
        transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
        zIndex: 2,
      }}>
        {label}
      </label>

      {multiline ? (
        <textarea
          rows={5}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%",
            background: focused ? "rgba(56,189,248,0.03)" : "rgba(255,255,255,0.02)",
            border: `1px solid ${focused ? "#38bdf8" : "rgba(255,255,255,0.1)"}`,
            borderRadius: "16px",
            color: "#f8fafc",
            fontFamily: "'Outfit', sans-serif",
            fontSize: "0.95rem",
            padding: "16px",
            outline: "none",
            resize: "none",
            boxShadow: focused ? "0 0 20px rgba(56,189,248,0.15), inset 0 0 10px rgba(56,189,248,0.05)" : "none",
            transition: "all 0.3s ease",
            position: "relative", zIndex: 1,
          }}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%",
            background: focused ? "rgba(56,189,248,0.03)" : "rgba(255,255,255,0.02)",
            border: `1px solid ${focused ? "#38bdf8" : "rgba(255,255,255,0.1)"}`,
            borderRadius: "16px",
            color: "#f8fafc",
            fontFamily: "'Outfit', sans-serif",
            fontSize: "0.95rem",
            padding: "16px",
            outline: "none",
            boxShadow: focused ? "0 0 20px rgba(56,189,248,0.15), inset 0 0 10px rgba(56,189,248,0.05)" : "none",
            transition: "all 0.3s ease",
            position: "relative", zIndex: 1,
          }}
        />
      )}
    </div>
  );
}

/* ─── Highly Interactive 3D Social Bento Card ─── */
function SocialBento({ icon, title, subtitle, bg, href, color, delay }) {
  const [ref, visible] = useReveal(0.1);
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
    
    // 3D Tilt calculation
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => {
    setHovered(false);
    if (cardRef.current) {
      cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    }
  };

  return (
    <div 
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.6s ease ${delay}, transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}`,
        perspective: "1000px",
        height: "100%", width: "100%",
        display: "flex"
      }}
    >
      <a
        ref={cardRef} href={href} target="_blank" rel="noreferrer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        style={{
          display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
          padding: "36px 24px", width: "100%",
          borderRadius: "32px",
          textDecoration: "none",
          background: "rgba(10, 20, 35, 0.6)",
          border: `1px solid ${hovered ? color + "80" : "rgba(255,255,255,0.08)"}`,
          boxShadow: hovered ? `0 30px 60px rgba(0,0,0,0.6), 0 0 30px ${color}30` : "0 10px 30px rgba(0,0,0,0.2)",
          transition: hovered ? "border 0.3s, box-shadow 0.3s" : "all 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
          position: "relative",
          overflow: "hidden",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Dynamic Spotlight */}
        <div style={{
          position: "absolute",
          top: mousePos.y, left: mousePos.x,
          width: "350px", height: "350px",
          background: `radial-gradient(circle at center, ${color}40 0%, transparent 60%)`,
          transform: "translate(-50%, -50%)",
          pointerEvents: "none", zIndex: 0,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
          mixBlendMode: "screen",
        }} />

        {/* Ambient Glow */}
        <div style={{
          position: "absolute", top: "0", left: "0", width: "100%", height: "100%",
          background: `radial-gradient(circle at 50% 100%, ${color}20 0%, transparent 60%)`,
          opacity: hovered ? 1 : 0.5,
          transition: "opacity 0.4s ease",
          pointerEvents: "none", zIndex: 0
        }} />

        {/* Glossy overlay */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%)",
          borderRadius: "32px", pointerEvents: "none", zIndex: 0
        }} />

        {/* Floating Icon */}
        <div style={{
          width: "72px", height: "72px", borderRadius: "24px",
          background: hovered ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.05)",
          border: hovered ? `1px solid ${color}80` : "1px solid rgba(255,255,255,0.1)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: hovered ? "#fff" : "rgba(255,255,255,0.9)", fontSize: "2rem", marginBottom: "20px",
          backdropFilter: hovered ? "blur(20px)" : "blur(10px)",
          transform: hovered ? "translateZ(40px) scale(1.15) rotate(-5deg)" : "translateZ(20px) scale(1)",
          transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          zIndex: 2,
          boxShadow: hovered ? `0 15px 30px rgba(0,0,0,0.4), inset 0 0 15px ${color}50` : "none"
        }}>
          {icon}
        </div>

        {/* Text Area */}
        <h4 style={{ 
          fontFamily: "'Syne', sans-serif", fontSize: "1.25rem", fontWeight: 800, 
          color: "#fff", margin: "0 0 4px", zIndex: 2,
          transform: hovered ? "translateZ(30px)" : "translateZ(10px)",
          transition: "all 0.4s ease"
        }}>
          {title}
        </h4>
        
        <p style={{ 
          fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", 
          color: hovered ? "#f8fafc" : "rgba(255,255,255,0.5)", 
          margin: 0, textAlign: "center", zIndex: 2,
          transform: hovered ? "translateZ(20px)" : "translateZ(5px)",
          transition: "all 0.4s ease",
          letterSpacing: "1px", textTransform: "uppercase", fontWeight: 600,
          background: hovered ? `linear-gradient(90deg, #fff, ${color})` : "none",
          WebkitBackgroundClip: hovered ? "text" : "none",
          WebkitTextFillColor: hovered ? "transparent" : "rgba(255,255,255,0.5)"
        }}>
          {subtitle}
        </p>

        {/* Arrow Action Icon */}
        <div style={{
          position: "absolute", bottom: "20px", right: "20px",
          width: "36px", height: "36px", borderRadius: "50%",
          background: `linear-gradient(135deg, ${color}, ${color}80)`,
          color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateZ(25px) translate(0,0) scale(1)" : "translate(20px, 20px) scale(0.5)",
          transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          zIndex: 2,
          boxShadow: `0 5px 15px ${color}60`
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </div>
      </a>
    </div>
  );
}


/* ─── Main Contact Component ─── */
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [ref, visible] = useReveal(0.05);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSending(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSending(false); 
        setSent(true);
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setSent(false), 4000);
      } else {
        alert("Server error: " + (data.error || "Please try again later."));
        setSending(false);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to connect to the backend server. Make sure the Node server is running on port 5000!");
      setSending(false);
    }
  };

  return (
    <section id="contact" style={{ position: "relative", padding: "120px 24px", overflow: "hidden" }}>
      
      {/* Background Decor */}
      <div style={{ position: "absolute", top: "10%", right: "-10%", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(129,140,248,0.05) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-10%", left: "-10%", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(56,189,248,0.05) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 10 }}>
        
        {/* Massive Header */}
        <div ref={ref} style={{
          textAlign: "center", marginBottom: "80px",
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)"
        }}>
          <h2 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: "clamp(3rem, 8vw, 5.5rem)",
            lineHeight: 1.1, margin: "0 0 20px",
            background: "linear-gradient(135deg, #ffffff 0%, #e2e8f0 40%, #94a3b8 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            letterSpacing: "-0.03em"
          }}>
            Ready to <span style={{ background: "linear-gradient(135deg, #38bdf8, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>collaborate?</span>
          </h2>
          <p style={{
            fontFamily: "'Outfit', sans-serif", fontSize: "1.1rem", fontWeight: 300,
            color: "#94a3b8", maxWidth: "600px", margin: "0 auto", lineHeight: 1.7
          }}>
            Whether you have a groundbreaking idea, need a technical co-founder, or just want to discuss web architecture—my inbox is always open. Let's engineer something phenomenal.
          </p>
        </div>

        {/* BENTO GRID LAYOUT */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px", direction: "rtl" }} className="contact-bento">
          
          {/* Form */}
          <div style={{
            direction: "ltr",
            background: "rgba(10, 22, 40, 0.4)",
            border: "1px solid rgba(56,189,248,0.15)",
            borderRadius: "32px",
            padding: "48px 40px",
            boxShadow: "0 20px 50px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.05)",
            backdropFilter: "blur(20px)",
          }}>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.8rem", fontWeight: 800, color: "#fff", margin: "0 0 8px" }}>Drop a Line</h3>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.95rem", color: "#64748b", margin: "0 0 32px" }}>Available for new opportunities.</p>
            
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <GlassField label="Full Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              <GlassField label="Email Address" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
              <GlassField label="How can I help you?" multiline value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
              
              <button
                type="submit"
                disabled={sending || !form.name || !form.email || !form.message}
                style={{
                  marginTop: "16px",
                  width: "100%", padding: "18px", borderRadius: "16px", border: "none",
                  background: sent ? "linear-gradient(135deg, #10b981, #34d399)" : "linear-gradient(135deg, #0ea5e9, #6366f1)",
                  color: "#fff", fontFamily: "'Syne', sans-serif", fontSize: "1rem", fontWeight: 700,
                  letterSpacing: "0.02em", cursor: (!form.name || !form.email || !form.message) ? "not-allowed" : "pointer",
                  boxShadow: sent ? "0 10px 30px rgba(16,185,129,0.3)" : "0 10px 30px rgba(56,189,248,0.25)",
                  opacity: (!form.name || !form.email || !form.message) ? 0.6 : 1,
                  transition: "all 0.3s ease",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "10px"
                }}
              >
                {sending ? "Processing..." : sent ? "✓ Message Ready" : "Send Message"}
              </button>
            </form>
          </div>

          {/* Social Bento Grid */}
          <div style={{ direction: "ltr", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", gridAutoRows: "1fr" }}>
            
            <div style={{ gridColumn: "1 / -1", display: "flex", height: "100%" }}>
              <SocialBento
                icon="✉️" title="hrithiksingh050@gmail.com" subtitle="Direct Email"
                bg="linear-gradient(145deg, rgba(56,189,248,0.1), rgba(56,189,248,0.02))" color="#38bdf8"
                href="mailto:hrithiksingh050@gmail.com" delay="0.2s"
              />
            </div>
            
            <SocialBento
              icon="📱" title="WhatsApp" subtitle="+91 70685 18219"
              bg="linear-gradient(145deg, rgba(74,222,128,0.1), rgba(74,222,128,0.02))" color="#4ade80"
              href="https://wa.me/917068518219" delay="0.3s"
            />
            
            <SocialBento
              icon={<svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>} 
              title="LinkedIn" subtitle="Network"
              bg="linear-gradient(145deg, rgba(129,140,248,0.1), rgba(129,140,248,0.02))" color="#818cf8"
              href="https://www.linkedin.com/in/vaibhavsingh200564/" delay="0.4s"
            />

            <div style={{ gridColumn: "1 / -1", display: "flex", height: "100%" }}>
              <SocialBento
                icon={<svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" /></svg>}
                title="Vaibhav-singh200564" subtitle="GitHub Profile"
                bg="linear-gradient(145deg, rgba(226,232,240,0.1), rgba(226,232,240,0.02))" color="#e2e8f0"
                href="https://github.com/Vaibhav-singh200564" delay="0.5s"
              />
            </div>
            
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-bento { grid-template-columns: 1fr !important; direction: ltr !important; }
        }
        input:-webkit-autofill, textarea:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px #061022 inset !important;
          -webkit-text-fill-color: #e2e8f0 !important;
        }
      `}</style>
    </section>
  );
}

export default Contact;