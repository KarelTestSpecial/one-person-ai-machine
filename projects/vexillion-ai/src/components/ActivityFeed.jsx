import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ActivityFeed = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const types = ['VISIT', 'EDIT', 'PUBLISH', 'ANALYZE'];
    const paths = ['/home', '/pricing', '/blog/ai-future', '/docs/v1', '/contact'];
    
    const interval = setInterval(() => {
      const newActivity = {
        id: Math.random().toString(36).substr(2, 9),
        type: types[Math.floor(Math.random() * types.length)],
        path: paths[Math.floor(Math.random() * paths.length)],
        time: new Date().toLocaleTimeString(),
        latency: Math.floor(Math.random() * 50) + 10
      };

      setActivities(prev => [newActivity, ...prev].slice(0, 15));
    }, 100); // 10 updates per second

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-panel p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          Real-Time Traffic
          <div className="live-indicator" />
        </h3>
        <span className="text-xs font-mono text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded">10.4 UPS</span>
      </div>

      <div className="flex-1 overflow-hidden space-y-3">
        <AnimatePresence initial={false}>
          {activities.map((activity) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex items-center justify-between text-sm py-2 border-b border-white/5"
            >
              <div className="flex items-center gap-3">
                <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                  activity.type === 'VISIT' ? 'bg-blue-500/20 text-blue-400' :
                  activity.type === 'EDIT' ? 'bg-amber-500/20 text-amber-400' :
                  'bg-emerald-500/20 text-emerald-400'
                }`}>
                  {activity.type}
                </span>
                <span className="text-slate-300 font-mono truncate max-w-[120px]">{activity.path}</span>
              </div>
              <span className="text-[10px] text-slate-500">{activity.latency}ms</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ActivityFeed;
