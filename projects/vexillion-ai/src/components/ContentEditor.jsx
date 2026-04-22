import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, ArrowLeft, Zap, FileText } from 'lucide-react';

const ContentEditor = ({ item, onSave, onBack }) => {
  const [title, setTitle] = useState(item.name);
  const [text, setText] = useState(item.content || `This is the workspace for ${item.name}. \n\nStart writing your AI-optimized content here...`);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      onSave(item.id, { name: title, content: text, lastEdit: 'Just now' });
      setIsSaving(false);
    }, 800);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col h-full space-y-6"
    >
      <div className="flex justify-between items-center">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-all">
          <ArrowLeft size={18} />
          Back to Inventory
        </button>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-cyan-500 text-black px-6 py-2.5 rounded-xl font-bold hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50"
        >
          {isSaving ? 'Processing...' : <><Save size={18} /> Save & Optimize</>}
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6 flex-1 min-h-0">
        {/* Editor Area */}
        <div className="col-span-8 flex flex-col space-y-4">
          <div className="glass-panel p-6 flex-1 flex flex-col bg-black/40">
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-transparent border-none outline-none text-2xl font-bold text-slate-100 mb-6 placeholder:text-slate-700"
              placeholder="Post Title..."
            />

            <textarea 
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none resize-none font-mono text-sm leading-relaxed text-slate-300 placeholder:text-slate-800"
              placeholder="Write your content..."
            />
          </div>
        </div>

        {/* AI Sidebar */}
        <div className="col-span-4 space-y-6">
          <div className="glass-panel p-6 border-cyan-500/20">
            <h4 className="text-sm font-bold text-cyan-400 mb-4 flex items-center gap-2">
              <Zap size={14} fill="currentColor" />
              Real-Time AI Audit
            </h4>
            <div className="space-y-4">
              <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                <p className="text-xs text-slate-500 mb-1">Readability Score</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-400">OPTIMAL</span>
                  <span className="font-mono text-[10px]">8.4 Grade</span>
                </div>
              </div>
              <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                <p className="text-xs text-slate-500 mb-1">SEO Potential</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-cyan-400">HIGH</span>
                  <span className="font-mono text-[10px]">92/100</span>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 opacity-60">
             <h4 className="text-sm font-bold text-slate-400 mb-4 flex items-center gap-2">
              <FileText size={14} />
              Metadata
            </h4>
            <div className="space-y-2 text-[10px] font-mono text-slate-500">
              <div className="flex justify-between"><span>Status:</span> <span className="text-slate-300">{item.status}</span></div>
              <div className="flex justify-between"><span>Words:</span> <span className="text-slate-300">{text.split(/\s+/).length}</span></div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContentEditor;
