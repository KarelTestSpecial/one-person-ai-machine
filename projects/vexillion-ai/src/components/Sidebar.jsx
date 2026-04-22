import React from 'react';
import { 
  LayoutDashboard, 
  Cpu, 
  Activity, 
  FileText, 
  Settings, 
  LogOut,
  Zap,
  Image as ImageIcon
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'auditor', label: 'Content Manager', icon: FileText },
    { id: 'media', label: 'Media Library', icon: ImageIcon },
    { id: 'predictor', label: 'AI Predictor', icon: Cpu },
    { id: 'traffic', label: 'Traffic Feed', icon: Activity },
  ];

  return (
    <aside className="w-64 h-full glass-panel border-y-0 border-l-0 rounded-none flex flex-col">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center cyan-glow">
          <Zap className="text-black" size={24} fill="currentColor" />
        </div>
        <span className="font-bold text-xl tracking-tight">VEXILLION</span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
              activeTab === item.id 
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5 space-y-2">
        <button 
          onClick={() => setActiveTab('settings')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
            activeTab === 'settings' 
              ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
          }`}
        >
          <Settings size={20} />
          <span className="font-medium">Site Settings</span>
        </button>
        <button 
          onClick={() => alert('Vexillion Session: Terminated.')}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-rose-400 hover:text-rose-300 hover:bg-rose-500/5 transition-all"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
