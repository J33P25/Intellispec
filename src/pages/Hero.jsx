import { useState, useEffect, useRef } from "react";
import { FileText, ScanSearch, GitBranch } from "lucide-react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const QUICK_ACTIONS = [
  { label: "Review SRS Document",   icon: FileText,   desc: "Upload & parse your spec" },
  { label: "Detect Ambiguities",    icon: ScanSearch, desc: "Flag and resolve vague language" },
  { label: "Generate UML Diagrams", icon: GitBranch,  desc: "Auto-synthesize from requirements" },
];

const PLACEHOLDERS = [
  "Analyze my SRS for conflicts and ambiguities...",
  "Generate UML diagrams from my requirements...",
];

export default function Hero() {
  const [query, setQuery]           = useState("");
  const [dragging, setDragging]     = useState(false);
  const [dark, setDark]             = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [activeItem, setActiveItem] = useState("Home");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [typedPlaceholder, setTypedPlaceholder] = useState("");

  const iRef       = useRef(0);
  const forwardRef = useRef(true);
  const pausingRef = useRef(false);

  useEffect(() => {
    if (query) return;
    const target = PLACEHOLDERS[placeholderIndex];
    iRef.current = 0;
    forwardRef.current = true;
    pausingRef.current = false;

    const interval = setInterval(() => {
      if (pausingRef.current) return;
      const i = iRef.current;
      if (forwardRef.current) {
        setTypedPlaceholder(target.slice(0, i));
        iRef.current++;
        if (iRef.current > target.length) {
          pausingRef.current = true;
          setTimeout(() => {
            forwardRef.current = false;
            pausingRef.current = false;
          }, 1200);
        }
      } else {
        setTypedPlaceholder(target.slice(0, i));
        iRef.current--;
        if (iRef.current < 0) {
          clearInterval(interval);
          setPlaceholderIndex((p) => (p + 1) % PLACEHOLDERS.length);
        }
      }
    }, 55);

    return () => clearInterval(interval);
  }, [query, placeholderIndex]);

  const d = dark;

  return (
    <div
      className={`flex h-screen overflow-hidden font-sans transition-colors duration-500 ${
        d ? "bg-[#0c0c12] text-gray-100" : "bg-[#F7F6F3] text-gray-900"
      }`}
    >
      {/* ── SIDEBAR ── */}
      <Sidebar dark={dark} activeItem={activeItem} setActiveItem={setActiveItem} />

      {/* ── RIGHT PANE ── */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">

        {/* ── NAVBAR ── */}
        <Navbar dark={dark} setDark={setDark} />

        {/* ── SCROLLABLE BODY ── */}
        <div className="flex-1 overflow-y-auto relative">

          {/* BG blobs */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div
              className={`absolute w-[600px] h-[600px] rounded-full blur-3xl transition-colors duration-500 ${d ? "bg-indigo-800/25" : "bg-indigo-200/60"}`}
              style={{ top: "-150px", left: "-120px", animation: "blob1 9s ease-in-out infinite alternate" }}
            />
            <div
              className={`absolute w-[450px] h-[450px] rounded-full blur-3xl transition-colors duration-500 ${d ? "bg-violet-800/20" : "bg-violet-200/50"}`}
              style={{ bottom: "-100px", right: "-100px", animation: "blob2 11s ease-in-out infinite alternate" }}
            />
            <div
              className={`absolute w-[320px] h-[320px] rounded-full blur-2xl transition-colors duration-500 ${d ? "bg-fuchsia-800/15" : "bg-fuchsia-100/60"}`}
              style={{ top: "45%", left: "55%", animation: "blob3 13s ease-in-out infinite alternate" }}
            />
          </div>

          {/* Grid */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(${d ? "rgba(99,102,241,0.06)" : "rgba(99,102,241,0.07)"} 1px, transparent 1px), linear-gradient(90deg, ${d ? "rgba(99,102,241,0.06)" : "rgba(99,102,241,0.07)"} 1px, transparent 1px)`,
              backgroundSize: "56px 56px",
            }}
          />

          {/* ── MAIN CONTENT ── */}
          <main className="relative z-10 max-w-3xl mx-auto px-6 pt-14 pb-24 flex flex-col items-center text-center">

            {/* Headline */}
            <h1 className={`text-[3.2rem] font-black leading-tight tracking-tight mb-5 ${d ? "text-white" : "text-gray-900"}`}>
              How can I help with<br />
              <span className="relative inline-block mt-1">
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage: "linear-gradient(135deg, #818cf8, #a78bfa, #c084fc, #818cf8)",
                    backgroundSize: "200% 200%",
                    animation: "gradientShift 5s ease infinite",
                  }}
                >
                  your SRS requirements?
                </span>
                <svg className="absolute -bottom-1 left-0 w-full overflow-visible" height="6" viewBox="0 0 400 6" preserveAspectRatio="none">
                  <path d="M0 3 Q50 0 100 3 Q150 6 200 3 Q250 0 300 3 Q350 6 400 3" stroke="url(#sqgl)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="sqgl" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#818cf8"/>
                      <stop offset="100%" stopColor="#c084fc"/>
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>

            <p className={`text-lg max-w-xl mb-10 leading-relaxed ${d ? "text-gray-400" : "text-gray-500"}`}>
              Upload your spec. IntelliSpec detects{" "}
              <span className={`font-semibold ${d ? "text-indigo-300" : "text-indigo-600"}`}>ambiguity</span>,
              flags{" "}
              <span className={`font-semibold ${d ? "text-violet-300" : "text-violet-600"}`}>conflicts</span>,
              fills{" "}
              <span className={`font-semibold ${d ? "text-fuchsia-300" : "text-fuchsia-600"}`}>NFR gaps</span>,
              and synthesizes UML — fully explained, human-approved.
            </p>

            {/* Input card */}
            <div
              className={`w-full rounded-2xl shadow-xl border transition-all duration-300 ${
                dragging ? "scale-[1.015] ring-4 ring-indigo-500/25 border-indigo-400" : ""
              } ${d ? "bg-[#14141e] border-gray-700/70 shadow-black/50" : "bg-white border-gray-200 shadow-gray-200"}`}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                const file = e.dataTransfer.files[0];
                if (file) setQuery(`Analyzing: ${file.name}`);
              }}
            >
              <textarea
                className={`w-full resize-none outline-none text-[15px] px-6 pt-5 pb-3 rounded-t-2xl bg-transparent min-h-[96px] ${d ? "text-gray-100" : "text-gray-700"}`}
                placeholder={query ? "" : (typedPlaceholder + "▋")}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className={`flex items-center justify-between px-4 py-3 border-t rounded-b-2xl ${d ? "border-gray-700/60" : "border-gray-100"}`}>
                <label className={`flex items-center gap-1.5 text-xs cursor-pointer px-3 py-1.5 rounded-lg border font-semibold transition-all ${d ? "border-gray-700 text-gray-400 hover:text-indigo-300 hover:bg-indigo-900/30 hover:border-indigo-700/50" : "border-gray-100 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-100"}`}>
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                  </svg>
                  Upload SRS
                  <input type="file" className="hidden" accept=".pdf,.docx,.md" />
                </label>
                <button
                  className={`rounded-xl p-2.5 transition-all duration-200 ${
                    query.trim()
                      ? "bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white shadow-lg shadow-indigo-500/40"
                      : d ? "bg-gray-800 text-gray-600 cursor-not-allowed" : "bg-gray-100 text-gray-300 cursor-not-allowed"
                  }`}
                  disabled={!query.trim()}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 12V4M4 8l4-4 4 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Quick actions */}
            <div className="mt-10 w-full">
              <p className={`text-[11px] uppercase tracking-widest font-bold mb-5 ${d ? "text-gray-600" : "text-gray-400"}`}>
                Build your task
              </p>
              <div className="grid grid-cols-3 gap-3">
                {QUICK_ACTIONS.map((a, i) => {
                  const Icon = a.icon;
                  return (
                    <button
                      key={a.label}
                      onClick={() => { setQuery(a.label); setActiveCard(i); }}
                      className={`group relative flex flex-col items-start gap-2 rounded-2xl px-4 py-4 text-left transition-all duration-200 border overflow-hidden ${
                        activeCard === i ? "ring-2 ring-indigo-500/60" : ""
                      } ${d
                        ? "bg-[#14141e] border-gray-700/50 hover:border-indigo-600/50 hover:bg-[#1a1a2e]"
                        : "bg-white border-gray-100 hover:border-indigo-200 hover:shadow-lg"
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-violet-500/0 group-hover:from-indigo-500/5 group-hover:to-violet-500/5 transition-all duration-300 rounded-2xl" />
                      <div className={`relative z-10 w-9 h-9 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 ${d ? "bg-indigo-900/50 text-indigo-300" : "bg-indigo-50 text-indigo-600"}`}>
                        <Icon size={18} strokeWidth={2} />
                      </div>
                      <div className="relative z-10 text-left">
                        <p className={`text-sm font-bold leading-tight group-hover:text-indigo-500 transition-colors ${d ? "text-gray-200" : "text-gray-700"}`}>{a.label}</p>
                        <p className={`text-xs mt-1 leading-snug ${d ? "text-gray-600" : "text-gray-400"}`}>{a.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </main>
            {/* Footer */}
            <footer
            className={`relative text-center py-9 text-xl border-t transition-colors duration-300 ${
                d
                ? "bg-[#0c0c12] text-gray-500 border-gray-800"
                : "bg-[#F7F6F3] text-gray-500 border-gray-200"
            }`}
            >
            Intellispec
            </footer>
        </div>
      </div>

      <style>{`
        @keyframes blob1 { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(50px,35px) scale(1.12); } }
        @keyframes blob2 { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(-35px,-45px) scale(1.09); } }
        @keyframes blob3 { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(25px,-35px) scale(0.94); } }
        @keyframes gradientShift { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}