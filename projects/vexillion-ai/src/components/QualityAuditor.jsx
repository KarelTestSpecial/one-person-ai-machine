import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Check, X, ShieldAlert, Award, FileEdit } from 'lucide-react';

const QualityAuditor = ({ content, onUpdate, onEdit, detailed = false }) => {
  const [editingId, setEditingId] = useState(null);
  const [tempData, setTempData] = useState({});

  const startEdit = (item) => {
    setEditingId(item.id);
    setTempData(item);
  };

  const saveEdit = () => {
    onUpdate(editingId, tempData);
    setEditingId(null);
  };

  return (
    <div className={`glass-panel p-6 ${detailed ? 'min-h-[500px]' : ''}`}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          {detailed ? 'Content Inventory' : 'Draft Performance Metrics'}
          {detailed && <span className="text-xs font-normal text-slate-500 ml-2">Total: {content.length} Items</span>}
        </h3>
        {!detailed && (
           <button 
             onClick={() => alert('Feature coming soon: Batch Export')}
             className="text-xs text-cyan-400 hover:underline"
           >
             Batch Export
           </button>
        )}
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {content.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl border transition-all duration-300 ${
                editingId === item.id 
                  ? 'bg-cyan-500/5 border-cyan-500/30 ring-1 ring-cyan-500/20' 
                  : 'bg-white/5 border-white/5 hover:border-white/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  {editingId === item.id ? (
                    <input
                      type="text"
                      value={tempData.name}
                      onChange={(e) => setTempData({ ...tempData, name: e.target.value })}
                      className="bg-black/40 border border-cyan-500/30 rounded px-2 py-1 text-sm w-full outline-none text-cyan-400 font-medium"
                      autoFocus
                    />
                  ) : (
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-slate-200">{item.name}</span>
                      {item.score > 90 && <Award size={14} className="text-amber-400" />}
                    </div>
                  )}
                  
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-[10px] text-slate-500 font-mono">Last Edit: {item.lastEdit}</span>
                    {detailed && (
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                        item.status === 'PUBLISHED' ? 'text-emerald-400 bg-emerald-400/10' : 
                        item.status === 'REVIEW' ? 'text-amber-400 bg-amber-400/10' : 'text-slate-400 bg-white/10'
                      }`}>
                        {item.status}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-6 ml-4">
                  <div className="text-right hidden sm:block">
                    <div className="flex items-center gap-1">
                       <span className={`text-sm font-bold font-mono ${item.score > 80 ? 'text-cyan-400' : 'text-slate-400'}`}>
                         {item.score}%
                       </span>
                    </div>
                    <div className="w-16 h-1 bg-white/5 rounded-full mt-1 overflow-hidden">
                       <div className="h-full bg-cyan-500" style={{ width: `${item.score}%` }} />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {editingId === item.id ? (
                      <>
                        <button onClick={saveEdit} className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-all">
                          <Check size={16} />
                        </button>
                        <button onClick={() => setEditingId(null)} className="p-1.5 bg-rose-500/20 text-rose-400 rounded-lg hover:bg-rose-500/30 transition-all">
                          <X size={16} />
                        </button>
                      </>
                    ) : (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => onEdit(item.id)} 
                          className="p-1.5 bg-cyan-500/10 text-cyan-400 rounded-lg hover:bg-cyan-500/20 transition-all flex items-center gap-2 px-3"
                        >
                          <FileEdit size={14} />
                          <span className="text-[10px] font-bold uppercase">Workspace</span>
                        </button>
                        {detailed && (
                          <button onClick={() => startEdit(item)} className="p-1.5 bg-white/5 text-slate-400 rounded-lg hover:bg-white/10 hover:text-slate-200 transition-all">
                            <Edit2 size={16} />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {detailed && (
        <button 
          onClick={() => alert('Feature coming soon: New Stream Initialization')}
          className="w-full mt-6 py-3 border border-dashed border-white/10 rounded-xl text-slate-500 hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all flex items-center justify-center gap-2 text-sm font-medium"
        >
          + Initialize New Content Stream
        </button>
      )}
    </div>
  );
};

export default QualityAuditor;
