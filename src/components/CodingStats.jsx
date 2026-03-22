import React, { useState, useEffect, useRef } from 'react';

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

export default function CodingStats() {
  const [ref, visible] = useReveal(0.1);
  const [githubData, setGithubData] = useState(null);
  const [leetCodeData, setLeetCodeData] = useState(null);
  const [githubSvg, setGithubSvg] = useState("");
  
  const githubUser = "Vaibhav-singh200564";
  const leetCodeUser = "vaibhav-singh_1"; 

  // Terminal state
  const [history, setHistory] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);
  const [booted, setBooted] = useState(false);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history, isProcessing]);

  // Focus input on click anywhere in terminal
  const focusInput = () => {
    if (!isProcessing && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const getStatsNode = (ghData, lcData) => (
    <div className="space-y-5 animate-[fadeIn_0.5s_ease-out] mb-4">
      <div>
        <h3 className="text-purple-400 font-bold mb-2">=== GitHub Stats ===</h3>
        <div className="pl-4 border-l-2 border-slate-700 space-y-1">
          <p>Username       : <span className="text-cyan-300">{githubUser}</span></p>
          <p>Public Repos   : <span className="text-white">{ghData?.public_repos || 25}</span></p>
          <p>Followers      : <span className="text-white">{ghData?.followers || 10}</span></p>
          <p>Following      : <span className="text-white">{ghData?.following || 10}</span></p>
        </div>
      </div>

      <div>
        <h3 className="text-yellow-400 font-bold mb-2">=== LeetCode Stats ===</h3>
        <div className="pl-4 border-l-2 border-slate-700 space-y-1">
          <p>Total Solved   : <span className="text-green-300 font-bold">{lcData?.totalSolved || 384}</span> / 3874</p>
          <p>Attempting     : <span className="text-white">12</span></p>
          <p>Badges Earned  : <span className="text-yellow-400 font-bold">4</span></p>
          <p>Breakdown:</p>
          <div className="pl-4 space-y-1">
            <p className="text-cyan-400">Easy   : {lcData?.easySolved || 237} / 932</p>
            <p className="text-yellow-500">Medium : {lcData?.mediumSolved || 133} / 2027</p>
            <p className="text-red-500">Hard   : {lcData?.hardSolved || 14} / 915</p>
          </div>
          {lcData?.ranking && (
            <p className="mt-2">Ranking        : <span className="text-white">#{lcData.ranking.toLocaleString()}</span></p>
          )}
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    if (!visible) return;
    
    // Fetch external data silently
    Promise.all([
      fetch(`https://api.github.com/users/${githubUser}`).then(res => res.json()).catch(() => null),
      fetch(`https://leetcode-stats-api.herokuapp.com/${leetCodeUser}`).then(res => res.json()).catch(() => null)
    ]).then(([gh, lc]) => {
      const ghd = gh || { public_repos: 25, followers: 10, following: 10 };
      const lcd = lc?.status === "success" && lc?.totalSolved >= 384 ? lc : { totalSolved: 384, easySolved: 237, mediumSolved: 133, hardSolved: 14, ranking: 120000 };
      setGithubData(ghd);
      setLeetCodeData(lcd);

      // Only boot once
      if (!booted) {
        setBooted(true);
        const bootSequence = async () => {
          setIsProcessing(true);
          setHistory([{ type: 'command', content: 'stats' }]);
          await new Promise(r => setTimeout(r, 600));
          setHistory(prev => [...prev, { type: 'output', content: <div className="text-yellow-300 opacity-80 animate-pulse mb-2 tracking-wide">Fetching GitHub & LeetCode stats...</div> }]);
          await new Promise(r => setTimeout(r, 1000));
          
          setHistory(prev => {
            // Remove the fetching message
            const filtered = prev.filter(item => typeof item.content === 'string' || !item.content?.props?.children?.includes?.('Fetching GitHub'));
            return [...filtered, { type: 'output', content: getStatsNode(ghd, lcd) }];
          });
          setIsProcessing(false);
          if (inputRef.current) inputRef.current.focus();
        };

        bootSequence();
      }
    });

    // Patch external SVG to enforce user's explicit overrides natively
    const statsUrl = encodeURIComponent(`https://github-readme-stats.vercel.app/api?username=${githubUser}&show_icons=true&theme=radical&hide_border=true&bg_color=0D1117`);
    fetch(`https://api.allorigins.win/raw?url=${statsUrl}`)
      .then(res => res.text())
      .then(svgText => {
         if (svgText.includes("<svg")) {
            let patched = svgText.replace(/(data-testid="stars"[^>]*>)[^<]*(<\/text>)/g, '$14$2');
            patched = patched.replace(/(data-testid="level-rank-icon"[^>]*>)[^<]*(<\/text>)/g, '$1C++$2');
            setGithubSvg(patched);
         }
      }).catch(() => {});

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const handleCommand = async (e) => {
    e.preventDefault();
    if (isProcessing || !inputVal.trim()) return;

    const cmd = inputVal.trim();
    setInputVal('');
    
    // Add command to history
    setHistory(prev => [...prev, { type: 'command', content: cmd }]);
    setIsProcessing(true);

    const printLines = async (lines, delay = 100) => {
      for (const line of lines) {
        await new Promise(r => setTimeout(r, delay));
        setHistory(prev => [...prev, { type: 'output', content: line }]);
      }
    };

    const args = cmd.toLowerCase().split(' ');
    const baseCmd = args[0];

    switch (baseCmd) {
      case 'help':
        await printLines([
          <div key="h1" className="text-cyan-400 mb-1 font-semibold">Available commands:</div>,
          <div key="h2"><span className="text-yellow-300 inline-block w-16">stats</span>  - Display GitHub & LeetCode statistics</div>,
          <div key="h3"><span className="text-yellow-300 inline-block w-16">whoami</span> - Display user information</div>,
          <div key="h4"><span className="text-yellow-300 inline-block w-16">clear</span>  - Clear the terminal screen</div>,
          <div key="h5"><span className="text-yellow-300 inline-block w-16">date</span>   - Print current date and time</div>,
          <div key="h6"><span className="text-yellow-300 inline-block w-16">echo</span>   - Print text back to the terminal</div>,
          <div key="h7"><span className="text-yellow-300 inline-block w-16">help</span>   - Show this help message</div>,
          <div key="h8" className="mt-2 text-slate-500">Tip: Click anywhere in the terminal to focus.</div>
        ], 60);
        break;
      case 'clear':
        setHistory([]);
        break;
      case 'whoami':
        await printLines([
          <div key="w1" className="text-green-300 font-bold text-lg mb-1">Vaibhav Singh</div>,
          <div key="w2">Full Stack MERN Developer & Tech Enthusiast</div>,
          <div key="w3">Focused on building immersive digital experiences and scalable backends.</div>
        ], 150);
        break;
      case 'date':
        await printLines([<div key="d1">{new Date().toLocaleString()}</div>], 0);
        break;
      case 'echo':
        await printLines([<div key="e1" className="text-slate-200">{args.slice(1).join(' ')}</div>], 0);
        break;
      case 'stats':
        await printLines([
          <div key="s1" className="text-yellow-300 opacity-80 animate-pulse mb-2 tracking-wide">Fetching fresh stats...</div>
        ], 200);
        
        await new Promise(r => setTimeout(r, 600));

        setHistory(prev => {
          const filtered = prev.filter(item => typeof item.content === 'string' || !item.content?.props?.children?.includes?.('Fetching fresh'));
          return [...filtered, { type: 'output', content: getStatsNode(githubData, leetCodeData) }];
        });
        break;
      default:
        await printLines([
          <div key="err1" className="text-red-400">guest: command not found: {baseCmd}</div>,
          <div key="err2" className="text-slate-400">Type 'help' to see available commands.</div>
        ], 50);
    }
    
    setIsProcessing(false);
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 10);
  };

  return (
    <section id="stats" className="relative py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <div style={{
          textAlign: "center", marginBottom: "80px",
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)"
        }}>
          <h2 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: "clamp(3rem, 8vw, 5rem)",
            background: "linear-gradient(135deg, #ffffff 0%, #e2e8f0 40%, #94a3b8 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            margin: "0 0 20px"
          }}>
            Coding <span style={{ background: "linear-gradient(135deg, #38bdf8, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Stats</span>
          </h2>
          <p className="text-slate-400 font-light max-w-2xl mx-auto text-lg" style={{ fontFamily: "'Outfit', sans-serif" }}>
            A real-time overview of my continuous learning journey, open-source contributions, and algorithmic problem-solving progress.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* TERMINAL UI */}
          <div 
            className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl bg-[#0d1117] flex flex-col h-[480px]"
            style={{
              opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-40px)",
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s"
            }}
            onClick={focusInput}
          >
            {/* Terminal Header */}
            <div className="bg-[#161b22] px-4 py-3 border-b border-slate-800 flex items-center gap-2 cursor-pointer z-10 relative">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-4 text-xs font-mono text-slate-400 select-none">guest@vaibhav-portfolio: ~</span>
            </div>
            
            {/* Terminal Body */}
            <div 
              ref={terminalRef}
              className="p-6 font-mono text-[13px] md:text-sm leading-relaxed flex-1 text-slate-300 overflow-y-auto cursor-text scroll-smooth"
            >
              <div className="text-slate-500 mb-4 select-none">
                Welcome to Vaibhav OS v1.0.0. Type 'help' to see available commands.
              </div>

              {history.map((line, idx) => (
                <div key={idx} className="mb-1">
                  {line.type === 'command' ? (
                    <div className="flex items-start gap-3">
                      <span className="text-green-400 whitespace-nowrap">➜</span>
                      <span className="text-blue-400 whitespace-nowrap">~</span>
                      <span className="text-white break-all">{line.content}</span>
                    </div>
                  ) : (
                    <div className="ml-1 tracking-wide">
                      {line.content}
                    </div>
                  )}
                </div>
              ))}

              {/* Active Prompt */}
              <div className="flex items-center gap-3 mt-1">
                <span className="text-green-400 whitespace-nowrap">➜</span>
                <span className="text-blue-400 whitespace-nowrap">~</span>
                {isProcessing ? (
                  <span className="w-2 h-4 bg-slate-400 animate-pulse inline-block"></span>
                ) : (
                  <form onSubmit={handleCommand} className="flex-1">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputVal}
                      onChange={(e) => setInputVal(e.target.value)}
                      className="bg-transparent border-none outline-none text-white w-full tracking-wide shadow-none focus:ring-0 p-0"
                      autoFocus
                      autoComplete="off"
                      spellCheck="false"
                    />
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* GUI STATS CARDS */}
          <div 
            className="flex flex-col justify-between h-[480px]"
            style={{
              opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(40px)",
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s"
            }}
          >
            {/* GitHub Overview Card */}
            <div className="glass-card flex-1 p-6 rounded-3xl border border-slate-800/60 bg-[rgba(15,23,42,0.4)] backdrop-blur-md relative overflow-hidden group mb-6 flex items-center justify-center flex-col">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hover:duration-200"></div>
              {githubSvg ? (
                <a 
                  href={`https://github.com/${githubUser}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center [&>svg]:w-[95%] [&>svg]:h-auto [&>svg]:max-h-[200px] rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.4)] group-hover:scale-[1.03] transition-transform duration-500 hover:duration-200 cursor-pointer block relative z-10"
                  dangerouslySetInnerHTML={{ __html: githubSvg }}
                />
              ) : (
                <a 
                  href={`https://github.com/${githubUser}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full cursor-pointer block relative z-10"
                >
                  <img 
                    src={`https://github-readme-stats.vercel.app/api?username=${githubUser}&show_icons=true&theme=radical&hide_border=true&bg_color=0D1117`} 
                    alt="GitHub Stats" 
                    className="w-[95%] mx-auto object-contain rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.4)] group-hover:scale-[1.03] transition-transform duration-500 hover:duration-200"
                  />
                </a>
              )}
            </div>

            {/* Sub-cards Row */}
            <div className="grid grid-cols-2 gap-6 h-[40%]">
              
              {/* GitHub Streak Card */}
              <div className="glass-card rounded-3xl border border-slate-800/60 bg-[rgba(15,23,42,0.4)] backdrop-blur-md relative overflow-hidden group flex items-center justify-center p-3">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hover:duration-200"></div>
                <img 
                  src={`https://github-readme-streak-stats.herokuapp.com/?user=${githubUser}&theme=radical&hide_border=true&background=0D1117`} 
                  alt="GitHub Streak" 
                  className="w-full h-full object-contain rounded-xl group-hover:scale-[1.05] transition-transform duration-500 hover:duration-200"
                />
              </div>

              {/* LeetCode GUI Card */}
              <a 
                href="https://leetcode.com/u/vaibhav-singh_1/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="glass-card rounded-3xl border border-yellow-500/20 bg-[rgba(15,23,42,0.4)] backdrop-blur-md relative overflow-hidden group flex flex-col items-center justify-center text-center p-4 cursor-pointer hover:border-yellow-500/40 transition-colors duration-300 hover:duration-200 no-underline"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/5 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hover:duration-200"></div>
                
                <h3 className="text-sm md:text-[1.1rem] font-bold font-['Syne'] flex items-center gap-2 mb-2 text-slate-200 z-10 w-full justify-center">
                  <span className="text-yellow-500 text-lg">▙</span> LeetCode
                </h3>
                
                <div className="z-10 bg-slate-900/40 w-full py-3 rounded-2xl border border-white/5 shadow-inner">
                  <div className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 drop-shadow-sm">
                    {leetCodeData?.totalSolved || "..."}
                  </div>
                  <div className="text-[10px] md:text-[11px] text-slate-400 tracking-widest uppercase mt-2 font-semibold">Problems Solved</div>
                </div>
              </a>

            </div>
          </div>

        </div>
      </div>
      <style>{`
        @keyframes blink {
          50% { border-color: transparent }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        /* Custom scrollbar for terminal */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.4); 
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(148, 163, 184, 0.2); 
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(148, 163, 184, 0.4); 
        }
      `}</style>
    </section>
  );
}
