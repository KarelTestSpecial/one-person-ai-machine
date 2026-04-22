import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, TrendingUp, BarChart, Globe, Zap } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const data = [
  { name: 'Mon', trend: 400 },
  { name: 'Tue', trend: 600 },
  { name: 'Wed', trend: 500 },
  { name: 'Thu', trend: 900 },
  { name: 'Fri', trend: 1200 },
  { name: 'Sat', trend: 1500 },
  { name: 'Sun', trend: 1800 },
];

const AIPredictorDetail = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tighter">AI Intelligence Engine</h1>
        <p className="text-slate-400 mt-2">Predicting market shifts and content opportunities.</p>
      </header>

      <div className="grid grid-cols-12 gap-6">
        {/* Main Chart */}
        <div className="col-span-8 glass-panel p-8 min-h-[400px] flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-bold">Trend Prediction</h3>
              <p className="text-xs text-slate-500">Predicted growth for "Agentic Workflows" over 7 days.</p>
            </div>
            <div className="bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-xl">
              <span className="text-cyan-400 font-bold">+184% Forecast</span>
            </div>
          </div>
          
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00FFFF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00FFFF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ background: '#0f141c', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#00FFFF' }}
                />
                <Area type="monotone" dataKey="trend" stroke="#00FFFF" fillOpacity={1} fill="url(#colorTrend)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sidebar Metrics */}
        <div className="col-span-4 space-y-6">
          <div className="glass-panel p-6">
            <h4 className="text-sm font-bold mb-4 flex items-center gap-2">
              <Globe size={16} className="text-cyan-400" />
              Hot Regions
            </h4>
            <div className="space-y-4">
              {[
                { r: 'North America', v: '84%' },
                { r: 'European Union', v: '72%' },
                { r: 'Southeast Asia', v: '45%' }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-xs text-slate-300">{item.r}</span>
                  <span className="text-xs font-mono text-cyan-400">{item.v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-6 bg-cyan-500/5 border-cyan-500/20">
             <h4 className="text-sm font-bold mb-4 flex items-center gap-2">
              <Zap size={16} className="text-cyan-400" fill="currentColor" />
              Next Action
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Based on the 1,800% growth forecast, the AI recommends initializing a **Deep Dive on Agentic Systems** immediately.
            </p>
            <button 
              onClick={() => alert('Vexillion Intelligence: Post Workspace Initialized')}
              className="w-full mt-4 py-2.5 bg-cyan-500 text-black rounded-xl font-bold text-xs hover:bg-cyan-400 transition-all"
            >
              Initialize Post
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AIPredictorDetail;
