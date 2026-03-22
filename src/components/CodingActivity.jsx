import React from 'react';

// Scroll reveal hook
function useReveal(threshold = 0.1) {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

export default function CodingActivity() {
  const [ref, visible] = useReveal(0.1);
  const githubUser = "Vaibhav-singh200564";

  return (
    <section id="activity" className="relative py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <div style={{
          textAlign: "center", marginBottom: "64px",
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)"
        }}>
          <h2 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: "clamp(2.5rem, 5vw, 4rem)",
            background: "linear-gradient(135deg, #ffffff 0%, #e2e8f0 40%, #94a3b8 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            margin: "0 0 16px"
          }}>
            Coding Activity & <span style={{ background: "linear-gradient(135deg, #38bdf8, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Consistency</span>
          </h2>
        </div>

        <div className="flex flex-col gap-10">
          
          {/* GitHub Activity Card */}
          <div 
            className="group relative p-6 md:p-10 rounded-3xl border border-slate-700/50 bg-[#0d1117] backdrop-blur-xl transition-all duration-500 hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(56,189,248,0.1)] overflow-hidden flex flex-col items-center"
            style={{
              opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s"
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="w-full flex justify-start">
              <h3 className="text-2xl font-bold font-['Syne'] flex items-center gap-3 mb-8 relative z-10 text-slate-200">
                 <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" /></svg>
                 GitHub Contributions
              </h3>
            </div>
            
            <div className="w-full relative z-10 flex my-4 justify-center">
              <img 
                src={`https://github-readme-activity-graph.vercel.app/graph?username=${githubUser}&theme=react-dark&hide_border=true&bg_color=0D1117&color=38bdf8`}
                alt="GitHub Activity Graph" 
                className="w-full h-auto object-contain rounded-xl drop-shadow-lg"
              />
            </div>
            
            <p className="text-center text-sm text-slate-500 mt-6 font-['DM_Mono'] tracking-wide">Daily coding activity over the past year</p>
          </div>

          {/* LeetCode Activity Card */}
          <div 
            className="group relative p-6 md:p-10 rounded-3xl border border-slate-700/50 bg-[#0d1117] backdrop-blur-xl transition-all duration-500 hover:border-yellow-500/40 hover:shadow-[0_0_30px_rgba(234,179,8,0.1)] overflow-hidden"
            style={{
              opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s"
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="w-full flex justify-start">
              <h3 className="text-2xl font-bold font-['Syne'] flex items-center gap-3 mb-8 relative z-10 text-slate-200">
                 <span className="text-yellow-500 text-3xl">▙</span> LeetCode Activity
              </h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 relative z-10 w-full max-w-5xl mx-auto mt-4">
              
              <div className="flex flex-col items-center justify-center bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-700/50 hover:bg-slate-800/60 transition-colors shadow-lg">
                  <span className="text-yellow-400 font-black text-4xl md:text-5xl mb-3">730</span>
                  <span className="text-slate-400 text-xs tracking-widest uppercase font-['DM_Mono'] text-center">Submissions</span>
              </div>
              
              <div className="flex flex-col items-center justify-center bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-700/50 hover:bg-slate-800/60 transition-colors shadow-lg">
                  <span className="text-orange-400 font-black text-4xl md:text-5xl mb-3">277</span>
                  <span className="text-slate-400 text-xs tracking-widest uppercase font-['DM_Mono'] text-center">Active Days</span>
              </div>
              
              <div className="flex flex-col items-center justify-center bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-700/50 hover:bg-slate-800/60 transition-colors shadow-lg">
                  <span className="text-red-400 font-black text-4xl md:text-5xl mb-3">71</span>
                  <span className="text-slate-400 text-xs tracking-widest uppercase font-['DM_Mono'] text-center">Max Streak</span>
              </div>

              <div className="flex flex-col items-center justify-center bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-700/50 hover:bg-slate-800/60 transition-colors shadow-lg">
                  <span className="text-cyan-400 font-black text-4xl md:text-5xl mb-3">4</span>
                  <span className="text-slate-400 text-xs tracking-widest uppercase font-['DM_Mono'] text-center">Badges Earned</span>
              </div>
              
            </div>
            
          </div>

        </div>
      </div>
    </section>
  );
}
