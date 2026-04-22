import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, Link as LinkIcon, ShieldCheck, Zap, Server, RefreshCw, Copy, CheckCircle, Trash2, Plus } from 'lucide-react';

const SiteSettings = () => {
  // Persistence Logic: API Key
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem('vx_api_key') || 'vx_live_772183_karel_prod_a9f2';
  });

  // Persistence Logic: Connected Sites
  const [sites, setSites] = useState(() => {
    const saved = localStorage.getItem('vx_connected_sites');
    return saved ? JSON.parse(saved) : [
      { name: 'Karel Portfolio', url: 'https://karel.test', status: 'Connected' },
      { name: 'Smart.be Portal', url: 'https://smart.be/integration', status: 'Standby' }
    ];
  });

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    localStorage.setItem('vx_api_key', apiKey);
  }, [apiKey]);

  useEffect(() => {
    localStorage.setItem('vx_connected_sites', JSON.stringify(sites));
  }, [sites]);

  const generateKey = () => {
    const newKey = `vx_live_${Math.random().toString(36).substring(2, 15)}_${Math.random().toString(36).substring(2, 15)}`;
    setApiKey(newKey);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const removeSite = (index) => {
    setSites(prev => prev.filter((_, i) => i !== index));
  };

  const addSite = () => {
    const name = prompt('Site Name:');
    const url = prompt('Site URL:');
    if (name && url) {
      setSites(prev => [...prev, { name, url, status: 'Connected' }]);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <header className="mb-10 flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter">Site Connectivity</h1>
          <p className="text-slate-400 mt-2">Manage API hooks and headless distribution channels.</p>
        </div>
        <div className="flex items-center gap-2 bg-amber-500/10 text-amber-400 px-4 py-2 rounded-xl border border-amber-500/20 text-xs font-mono">
          <Zap size={14} />
          LOCAL DEVELOPMENT MODE
        </div>
      </header>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8 space-y-6">
          <div className="glass-panel p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold flex items-center gap-3">
                <Globe className="text-cyan-400" size={20} />
                Production Channels
              </h3>
              <button 
                onClick={addSite}
                className="flex items-center gap-2 text-xs bg-cyan-500/10 text-cyan-400 px-3 py-1.5 rounded-lg border border-cyan-500/20 hover:bg-cyan-500/20 transition-all"
              >
                <Plus size={14} /> Add Site
              </button>
            </div>
            <div className="space-y-4">
              {sites.map((site, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-black/40 rounded-lg flex items-center justify-center">
                      <Server size={18} className="text-slate-500" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">{site.name}</p>
                      <p className="text-[10px] text-slate-500 font-mono">{site.url}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      site.status === 'Connected' ? 'text-emerald-400 bg-emerald-400/10' : 'text-amber-400 bg-amber-400/10'
                    }`}>{site.status}</span>
                    <button 
                      onClick={() => removeSite(i)}
                      className="p-2 text-slate-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-8 border-cyan-500/10">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <LinkIcon className="text-cyan-400" size={20} />
              Integration Guide
            </h3>
            <div className="bg-black/60 rounded-xl p-5 font-mono text-[11px] text-cyan-300 relative group border border-white/5">
              <pre className="overflow-x-auto">
{`const response = await fetch('http://localhost:5175/api/v1/content', {
  headers: {
    'Authorization': 'Bearer ${apiKey}',
    'X-Project-ID': 'VX-8492'
  }
});
const content = await response.json();`}
              </pre>
              <button 
                onClick={copyToClipboard}
                className="absolute top-4 right-4 p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all text-slate-400"
              >
                {copied ? <CheckCircle size={14} className="text-emerald-400" /> : <Copy size={14} />}
              </button>
            </div>
          </div>
        </div>

        <div className="col-span-4 space-y-6">
          <div className="glass-panel p-6 border-cyan-500/20">
            <h4 className="text-sm font-bold text-cyan-400 mb-4 flex items-center gap-2">
              <ShieldCheck size={16} />
              Master API Key
            </h4>
            <div className="p-3 bg-black/40 rounded-lg font-mono text-[10px] text-cyan-500 break-all border border-cyan-500/10 mb-4">
              {apiKey}
            </div>
            <button 
              onClick={generateKey}
              className="w-full py-2.5 bg-white/5 border border-white/10 rounded-xl text-slate-300 hover:text-cyan-400 hover:border-cyan-500/30 transition-all flex items-center justify-center gap-2 text-xs font-bold"
            >
              <RefreshCw size={14} />
              Regenerate Master Key
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SiteSettings;
