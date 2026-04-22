import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ActivityFeed from './components/ActivityFeed';
import AIPredictor from './components/AIPredictor';
import QualityAuditor from './components/QualityAuditor';
import ContentEditor from './components/ContentEditor';
import AIPredictorDetail from './components/AIPredictorDetail';
import TrafficFeedDetail from './components/TrafficFeedDetail';
import AssetManager from './components/AssetManager';
import SiteSettings from './components/SiteSettings';
import { Search, Bell, User } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editingItem, setEditingItem] = useState(null);
  
  // Persistence Logic: Load from LocalStorage
  const [content, setContent] = useState(() => {
    const saved = localStorage.getItem('vx_content');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'AI Future Trends', score: 94, status: 'PUBLISHED', lastEdit: '2h ago', content: 'AI is changing the world...' },
      { id: 2, name: 'Machine Learning Basics', score: 82, status: 'DRAFT', lastEdit: '5h ago', content: 'ML for beginners...' },
      { id: 3, name: 'SaaS Architecture v4', score: 71, status: 'REVIEW', lastEdit: '1d ago', content: 'Modern cloud patterns...' }
    ];
  });

  // Persistence Logic: Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('vx_content', JSON.stringify(content));
    // Debug: Export to window for terminal testing
    window.vx_content_api = content;
  }, [content]);

  const updateContent = (id, newContent) => {
    setContent(prev => prev.map(item => item.id === id ? { ...item, ...newContent } : item));
    setEditingItem(null);
  };

  const openEditor = (id) => {
    const item = content.find(c => c.id === id);
    setEditingItem(item);
  };

  return (
    <div className="flex h-screen bg-[#05070a] text-slate-200 overflow-hidden">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setEditingItem(null);
        }} 
      />

      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-black/20 backdrop-blur-md z-10">
          <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-full border border-white/5 w-96 group focus-within:border-cyan-500/50 transition-all">
            <Search size={18} className="text-slate-500 group-focus-within:text-cyan-400" />
            <input 
              type="text" 
              placeholder="Search content, assets, sites..." 
              className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-600"
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
              <div className="live-indicator" />
              SYSTEM LIVE
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setActiveTab('settings')}
                className="p-2.5 rounded-xl hover:bg-white/5 text-slate-400 transition-all relative"
              >
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

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto h-full">
            
            {editingItem ? (
              <ContentEditor 
                item={editingItem} 
                onSave={updateContent} 
                onBack={() => setEditingItem(null)} 
              />
            ) : (
              <>
                {activeTab === 'dashboard' && (
                  <div className="space-y-6">
                    <header className="mb-10">
                      <h1 className="text-3xl font-bold tracking-tight">Intelligence Dashboard</h1>
                      <p className="text-slate-400 mt-2">Managing {content.length} persistent content streams.</p>
                    </header>
                    <div className="grid grid-cols-12 gap-6">
                      <div className="col-span-8 space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                          <AIPredictor />
                          <div className="glass-panel p-6 flex flex-col justify-center gap-4">
                             <p className="text-sm text-slate-400 font-medium">Global Reach</p>
                             <div className="flex items-end gap-3">
                                <span className="text-4xl font-bold tracking-tighter text-cyan-400">12.8k</span>
                                <span className="text-xs text-emerald-500 font-mono mb-2">+14% WEEKLY</span>
                             </div>
                             <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-cyan-500 w-[65%] cyan-glow" />
                             </div>
                          </div>
                        </div>
                        <QualityAuditor content={content} onEdit={openEditor} />
                      </div>
                      <div className="col-span-4">
                        <ActivityFeed />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'auditor' && (
                  <div className="space-y-6">
                    <header className="mb-10 text-center">
                      <h1 className="text-4xl font-bold tracking-tighter">Content Management</h1>
                      <p className="text-slate-400 mt-2">Audit and edit your enterprise content intelligence.</p>
                    </header>
                    <QualityAuditor content={content} onUpdate={updateContent} onEdit={openEditor} detailed={true} />
                  </div>
                )}

                {activeTab === 'predictor' && <AIPredictorDetail />}
                {activeTab === 'traffic' && <TrafficFeedDetail />}
                {activeTab === 'media' && <AssetManager />}
                {activeTab === 'settings' && <SiteSettings />}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
