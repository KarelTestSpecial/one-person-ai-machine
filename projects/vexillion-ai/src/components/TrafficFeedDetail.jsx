import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, MapPin, ArrowUpRight, Monitor, Smartphone } from 'lucide-react';

const TrafficFeedDetail = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const locations = ['Brussels, BE', 'Ghent, BE', 'New York, US', 'London, UK', 'Tokyo, JP', 'Berlin, DE', 'Paris, FR'];
    const devices = [Monitor, Smartphone];

    const interval = setInterval(() => {
      const newSession = {
        id: Math.random(),
        location: locations[Math.floor(Math.random() * locations.length)],
        device: devices[Math.floor(Math.random() * devices.length)],
        time: new Date().toLocaleTimeString(),
        ip: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.X.X`
      };
      setSessions(prev => [newSession, ...prev].slice(0, 10));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6"
    >
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tighter">Global Traffic Ops</h1>
        <p className="text-slate-400 mt-2">Monitoring live interactions across the Vexillion network.</p>
      </header>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 glass-panel p-8">
          <div className="flex justify-between items-center mb-10">
             <div className="flex items-center gap-4">
               <div className="live-indicator" />
               <span className="font-bold">Live Session Feed</span>
             </div>
             <div className="flex gap-8">
               <div className="text-center">
                 <p className="text-[10px] text-slate-500 uppercase tracking-widest">Active Users</p>
                 <p className="text-2xl font-bold text-cyan-400">1,429</p>
               </div>
               <div className="text-center">
                 <p className="text-[10px] text-slate-500 uppercase tracking-widest">Avg. Latency</p>
                 <p className="text-2xl font-bold text-emerald-400">14ms</p>
               </div>
             </div>
          </div>

          <div className="space-y-3">
            <AnimatePresence initial={false}>
              {sessions.map((session) => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all"
                >
                  <div className="flex items-center gap-6">
                    <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400">
                      <session.device size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{session.location}</p>
                      <p className="text-[10px] font-mono text-slate-500">{session.ip}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <span className="text-[10px] font-mono text-slate-500">{session.time}</span>
                    <ArrowUpRight size={14} className="text-emerald-400" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TrafficFeedDetail;
