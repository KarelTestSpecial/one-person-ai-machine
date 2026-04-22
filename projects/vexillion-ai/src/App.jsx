import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ActivityFeed from './components/ActivityFeed';
import AIPredictor from './components/AIPredictor';
import { Search, Bell, User, Wifi } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen bg-[#05070a] text-slate-200 overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-black/20 backdrop-blur-md z-10">
          <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-full border border-white/5 w-96 group focus-within:border-cyan-500/50 transition-all">
            <Search size={18} className="text-slate-500 group-focus-within:text-cyan-400" />
            <input 
              type="text" 
              placeholder="Search AI metrics, drafts, or visitors..." 
              className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-600"
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
              <div className="live-indicator" />
              SYSTEM LIVE
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2.5 rounded-xl hover:bg-white/5 text-slate-400 transition-all relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-cyan-500 rounded-full border-2 border-[#05070a]" />
              </button>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-[1px]">
                <div className="w-full h-full rounded-[11px] bg-[#05070a] flex items-center justify-center overflow-hidden">
                  <User size={20} className="text-cyan-400" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            <header className="mb-10">
              <h1 className="text-3xl font-bold tracking-tight">Intelligence Dashboard</h1>
              <p className="text-slate-400 mt-2">Vexillion AI is currently analyzing 2.4k data points per second.</p>
            </header>

            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-8 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <AIPredictor />
                  <div className="glass-panel p-6 flex flex-col justify-center gap-4">
                     <p className="text-sm text-slate-400 font-medium">Node Sync Status</p>
                     <div className="flex items-end gap-3">
                        <span className="text-4xl font-bold tracking-tighter text-cyan-400">99.9%</span>
                        <span className="text-xs text-emerald-500 font-mono mb-2">OPERATIONAL</span>
                     </div>
                     <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-500 w-[99.9%] cyan-glow" />
                     </div>
                  </div>
                </div>
                
                <div className="glass-panel p-6 min-h-[300px]">
                  <h3 className="text-lg font-semibold mb-6">Draft Performance Metrics</h3>
                  <div className="space-y-4">
                    {[
                      { name: 'AI Future Trends', score: 94, status: 'PUBLISHED' },
                      { name: 'Machine Learning Basics', score: 82, status: 'DRAFT' },
                      { name: 'SaaS Architecture v4', score: 71, status: 'REVIEW' }
                    ].map((draft, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                        <span className="font-medium">{draft.name}</span>
                        <div className="flex items-center gap-6">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            draft.status === 'PUBLISHED' ? 'text-cyan-400 bg-cyan-400/10' : 'text-slate-400 bg-white/10'
                          }`}>{draft.status}</span>
                          <span className="font-mono text-cyan-400">{draft.score}/100</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-span-4">
                <ActivityFeed />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
