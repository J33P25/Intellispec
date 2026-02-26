import { Moon, Sun } from "lucide-react";

const NAV_LINKS = ["Pricing"];

export default function Navbar({ dark, setDark }) {
  const d = dark;

  return (
    <nav
      className={`flex items-center justify-between px-8 py-4 border-b backdrop-blur-md sticky top-0 z-50 transition-colors duration-300 ${
        d
          ? "bg-[#0c0c12]/85 border-gray-800"
          : "bg-white/80 border-gray-100"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <span className={`font-extrabold tracking-tight text-xl ${d ? "text-white" : "text-gray-900"}`}>
          IntelliSpec
        </span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-5">
        {NAV_LINKS.map((l) => (
          <a
            key={l}
            href="#"
            className={`text-sm font-medium transition-colors hover:text-indigo-500 ${d ? "text-gray-400" : "text-gray-500"}`}
          >
            {l}
          </a>
        ))}

        {/* Dark / Light toggle */}
        <button
          onClick={() => setDark(!d)}
          title="Toggle theme"
          className={`relative w-[52px] h-7 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
            d ? "bg-indigo-600" : "bg-gray-200"
          }`}
        >
          <span
            className={`absolute top-[3px] w-[21px] h-[21px] rounded-full bg-white shadow flex items-center justify-center transition-all duration-300 ${
              d ? "left-[28px]" : "left-[3px]"
            }`}
          >
            {d
              ? <Moon size={12} className="text-indigo-600" strokeWidth={2.5} />
              : <Sun size={12} className="text-yellow-500" strokeWidth={2.5} />
            }
          </span>
        </button>

        <button className={`text-sm border rounded-xl px-4 py-1.5 transition-colors font-semibold ${
          d
            ? "border-gray-700 text-gray-300 hover:bg-gray-800"
            : "border-gray-200 text-gray-600 hover:bg-gray-50"
        }`}>
          Sign in
        </button>
        <button className="text-sm bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white rounded-xl px-4 py-1.5 transition-all font-semibold shadow-lg shadow-indigo-500/30">
          Get Started
        </button>
      </div>
    </nav>
  );
}