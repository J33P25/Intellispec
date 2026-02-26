import { useState } from "react";
import {
  Home,
  BookOpen,
  Plus,
  ChevronsUpDown,
  PanelLeftClose,
  PanelLeftOpen,
  Clock,
  BrainCircuit,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Home",        icon: Home },
  { label: "UML Library", icon: BookOpen },
];

const RECENT_CHATS = [
  "Detect ambiguity in login flow",
  "Generate use case diagram",
  "Review payment SRS",
];

export default function Sidebar({ dark, activeItem, setActiveItem }) {
  const [collapsed, setCollapsed] = useState(false);
  const d = dark;

  return (
    <aside
      className={`flex flex-col h-screen sticky top-0 shrink-0 transition-all duration-300 border-r z-40 ${
        collapsed ? "w-[64px]" : "w-[240px]"
      } ${d
        ? "bg-[#12121d] border-gray-800"
        : "bg-[#f8f8f8] border-gray-200/70"
      }`}
    >
      <div className={`flex items-center h-[56px] px-4 border-b ${d ? "border-gray-800" : "border-gray-200/70"} ${collapsed ? "justify-center" : "justify-between"}`}>
        {!collapsed && (
          <div className="flex items-center">
            <BrainCircuit size={28} className="text-indigo-600" strokeWidth={2.5} />
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`p-1.5 rounded-lg transition-colors ${d ? "text-gray-500 hover:text-gray-300 hover:bg-gray-800" : "text-gray-400 hover:text-gray-700 hover:bg-gray-200/60"}`}
        >
          {collapsed
            ? <PanelLeftOpen size={18} strokeWidth={2} />
            : <PanelLeftClose size={18} strokeWidth={2} />
          }
        </button>
      </div>

      {/* === NEW CHAT button === */}
      <div className={`px-3 py-3 border-b ${d ? "border-gray-800" : "border-gray-200/70"}`}>
        <button
          className={`flex items-center gap-2 w-full rounded-xl border py-2 transition-all font-semibold text-sm group ${
            collapsed ? "justify-center px-2" : "px-3"
          } ${d
            ? "border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-gray-600"
            : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50 shadow-sm"
          }`}
        >
          <Plus size={15} strokeWidth={2.5} className="shrink-0" />
          {!collapsed && <span>New Chat</span>}
        </button>
      </div>

      {/* === NAV ITEMS === */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-0.5 scrollbar-hide">
        {NAV_ITEMS.map(({ label, icon: Icon }) => {
          const isActive = activeItem === label;
          return (
            <button
              key={label}
              onClick={() => setActiveItem(label)}
              title={collapsed ? label : ""}
              className={`flex items-center gap-3 w-full rounded-xl px-3 py-2 text-sm font-medium transition-all duration-150 group ${
                collapsed ? "justify-center" : ""
              } ${
                isActive
                  ? d
                    ? "bg-indigo-600/20 text-indigo-300"
                    : "bg-white text-indigo-600 shadow-sm"
                  : d
                    ? "text-gray-400 hover:bg-gray-800/60 hover:text-gray-200"
                    : "text-gray-600 hover:bg-white/70 hover:text-gray-900"
              }`}
            >
              <Icon
                size={17}
                strokeWidth={isActive ? 2.5 : 2}
                className={`shrink-0 transition-colors ${isActive ? (d ? "text-indigo-400" : "text-indigo-600") : ""}`}
              />
              {!collapsed && <span className="truncate">{label}</span>}
              {isActive && !collapsed && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
              )}
            </button>
          );
        })}
      </nav>

      {/* === RECENT CHATS === */}
      {!collapsed && (
        <div className={`px-3 pb-3 border-t ${d ? "border-gray-800" : "border-gray-200/70"}`}>
          <div className="flex items-center gap-1.5 pt-3 pb-2">
            <Clock size={11} className={d ? "text-gray-600" : "text-gray-400"} />
            <p className={`text-[10px] uppercase tracking-widest font-bold ${d ? "text-gray-600" : "text-gray-400"}`}>
              Recent Chats
            </p>
          </div>
          <div className="space-y-0.5">
            {RECENT_CHATS.map((chat) => (
              <button
                key={chat}
                className={`w-full text-left text-xs px-2 py-1.5 rounded-lg truncate transition-colors ${
                  d ? "text-gray-500 hover:text-gray-300 hover:bg-gray-800" : "text-gray-500 hover:text-gray-800 hover:bg-white/70"
                }`}
              >
                {chat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* === USER PROFILE === */}
      <div className={`border-t px-3 py-3 ${d ? "border-gray-800" : "border-gray-200/70"}`}>
        <button
          className={`flex items-center gap-2.5 w-full rounded-xl px-2 py-2 transition-colors group ${
            collapsed ? "justify-center" : ""
          } ${d ? "hover:bg-gray-800" : "hover:bg-white/70"}`}
        >
          <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-sm font-bold shadow-sm ${
            d ? "bg-indigo-900 text-indigo-300" : "bg-indigo-100 text-indigo-600"
          }`}>
            JD
          </div>
          {!collapsed && (
            <>
              <div className="text-left flex-1 min-w-0">
                <p className={`text-xs font-bold truncate ${d ? "text-gray-200" : "text-gray-800"}`}>Jaydeep Dileep</p>
                <p className={`text-[10px] truncate ${d ? "text-gray-600" : "text-gray-400"}`}>jaydeepdilip75@gmail.c</p>
              </div>
              <ChevronsUpDown size={14} className={`shrink-0 ${d ? "text-gray-600" : "text-gray-400"}`} />
            </>
          )}
        </button>
      </div>
    </aside>
  );
}