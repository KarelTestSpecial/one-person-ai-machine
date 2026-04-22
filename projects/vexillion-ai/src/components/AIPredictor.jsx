import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, BarChart2, Globe } from 'lucide-react';

const AIPredictor = () => {
  const [loading, setLoading] = useState(true);
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPredictions([
        { topic: 'Generative UI Patterns', growth: '+142%', confidence: '98%', region: 'Global' },
        { topic: 'Agentic Workflows', growth: '+89%', confidence: '94%', region: 'US/EU' },
        { topic: 'Privacy-First LLMs', growth: '+67%', confidence: '91%', region: 'Global' },
      ]);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="glass-panel p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
          <TrendingUp size={20} />
        </div>
        <h3 className="text-lg font-semibold">AI Content Predictor</h3>
      </div>

      {loading ? (
        <div className="space-y-4 py-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-16 bg-white/5 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {predictions.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between group hover:border-cyan-500/30 transition-all cursor-pointer"
            >
              <div>
                <p className="text-sm font-medium text-slate-200">{p.topic}</p>
                <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-500 font-mono">
                  <Globe size={10} /> {p.region}
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-cyan-400">{p.growth}</p>
                <p className="text-[10px] text-slate-500 font-mono">Conf: {p.confidence}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AIPredictor;
