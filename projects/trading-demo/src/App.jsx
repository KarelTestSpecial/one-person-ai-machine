import React, { useState, useEffect } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar 
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Activity, DollarSign, ArrowUpRight, ArrowDownRight, 
  History, Wallet, Zap, ShieldCheck, Settings as SettingsIcon, LayoutDashboard, Briefcase, BarChart3, CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PremiumShell } from './components/PremiumShell';

function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [activePair, setActivePair] = useState('BTC/USD');
  const [toast, setToast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [latency, setLatency] = useState(12);
  const [isConnected, setIsConnected] = useState(true);
  const [data, setData] = useState([
    { time: '09:00', price: 42000 },
    { time: '10:00', price: 42500 },
    { time: '11:00', price: 41800 },
    { time: '12:00', price: 43200 },
    { time: '13:00', price: 42900 },
    { time: '14:00', price: 44000 },
  ]);

  // High-Frequency Market Data Simulation (10+ updates per second)
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const last = prev[prev.length - 1];
        const nextPrice = last.price + (Math.random() - 0.5) * 50;
        return [...prev.slice(1), { ...last, price: nextPrice }];
      });
      setLatency(Math.floor(Math.random() * 5) + 10);
    }, 100); // 10 updates per second
    return () => clearInterval(interval);
  }, []);

  const [trades, setTrades] = useState([
    { id: 1, type: 'BUY', amount: '0.042 BTC', price: '$43,500', time: '12:04:12' },
    { id: 2, type: 'SELL', amount: '1.20 ETH', price: '$3,120', time: '12:03:45' },
    { id: 3, type: 'BUY', amount: '15.5 SOL', price: '$102.15', time: '12:02:10' },
  ]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleAction = (action) => {
    showToast(`Action: ${action} executed successfully.`);
  };

  // View Routing with Loading State
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const renderView = () => {
    if (isLoading) return (
      <div className="loading-container">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="spinner"></motion.div>
        <span>Accessing Nexus Data...</span>
      </div>
    );

    switch (activeTab) {
      case 'Dashboard':
        return (
          <div className="dashboard-layout">
            <div className="top-stats">
              <StatBox title="Portfolio Value" value="$124,500.42" delta="+12.4%" up icon={<DollarSign size={16}/>} />
              <StatBox title="Active Margin" value="$12,000.00" delta="1.5x Leverage" icon={<Zap size={16}/>} />
              <StatBox title="Risk Score" value="Optimal" delta="SECURED" up icon={<ShieldCheck size={16}/>} />
            </div>

            <div className="main-content-grid">
              <div className="glass-panel chart-section">
                <div className="section-header">
                  <h3><Activity size={18} /> {activePair} Market Depth</h3>
                  <div className="trading-actions">
                    <button className="buy-btn" onClick={() => handleAction('Market Buy')}>BUY</button>
                    <button className="sell-btn" onClick={() => handleAction('Market Sell')}>SELL</button>
                  </div>
                </div>
                <div className="chart-wrapper">
                  <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={data}>
                      <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00f2fe" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#00f2fe" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Tooltip contentStyle={{ background: 'rgba(10,10,12,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', backdropFilter: 'blur(10px)' }} />
                      <Area type="monotone" dataKey="price" stroke="#00f2fe" strokeWidth={3} fill="url(#chartGradient)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="glass-panel history-section">
                <div className="section-header">
                  <h3><History size={18} /> Trade History</h3>
                </div>
                <div className="trade-list">
                  {trades.map(trade => (
                    <div key={trade.id} className="trade-item">
                      <div className={`badge ${trade.type.toLowerCase()}`}>{trade.type}</div>
                      <div className="trade-info"><span className="amount">{trade.amount}</span><span className="time">{trade.time}</span></div>
                      <div className="trade-price">{trade.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'Portfolio':
        return (
          <div className="portfolio-view">
            <div className="glass-panel placeholder-view">
              <Briefcase size={48} color="#00f2fe" />
              <h2>Nexus Portfolio</h2>
              <p>Real-time asset tracking and cross-chain performance analytics.</p>
              <div className="asset-list">
                <div className="asset-row"><span>Bitcoin</span><span>1.42 BTC</span><span className="up">$61,770.00</span></div>
                <div className="asset-row"><span>Ethereum</span><span>12.5 ETH</span><span className="up">$39,000.00</span></div>
                <div className="asset-row"><span>Solana</span><span>142.0 SOL</span><span className="down">$14,500.00</span></div>
              </div>
            </div>
          </div>
        );
      case 'Settings':
        return (
          <div className="settings-view">
            <div className="glass-panel settings-form">
              <h3>Terminal Configuration</h3>
              <div className="setting-item">
                <label>API Gateway</label>
                <input type="text" placeholder="https://api.nexus-trading.com/v1" />
              </div>
              <div className="setting-item">
                <label>Risk Multiplier</label>
                <select><option>Low Risk (1.0x)</option><option>Medium (3.0x)</option><option>Aggressive (10x)</option></select>
              </div>
              <button className="save-btn" onClick={() => handleAction('Settings Update')}>Update Nexus Config</button>
            </div>
          </div>
        );
      default:
        return <div>View not found</div>;
    }
  };

  return (
    <PremiumShell 
      title={activeTab} 
      activeTab={activeTab} 
      onTabChange={setActiveTab}
      isConnected={isConnected}
      latency={latency}
    >
      {renderView()}

      {/* Premium Toast System */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="toast-container glass-panel">
            <CheckCircle2 size={18} color="#00ff88" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .dashboard-layout { display: flex; flex-direction: column; gap: 2rem; }
        .top-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .stat-box { padding: 1.5rem; }
        .stat-header { display: flex; align-items: center; gap: 8px; color: #555; font-size: 0.8rem; font-weight: 600; text-transform: uppercase; margin-bottom: 1rem; }
        .stat-value { font-size: 1.8rem; font-weight: 800; margin-bottom: 0.5rem; }
        .stat-delta { font-size: 0.85rem; font-weight: 600; color: #444; display: flex; align-items: center; gap: 4px; }
        .stat-delta.up { color: #00ff88; }

        .main-content-grid { display: grid; grid-template-columns: 1fr 320px; gap: 2rem; height: 500px; }
        .chart-section { padding: 2rem; display: flex; flex-direction: column; }
        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .trading-actions { display: flex; gap: 1rem; }
        .buy-btn, .sell-btn { padding: 0.6rem 1.5rem; border: none; border-radius: 8px; font-weight: 800; cursor: pointer; transition: transform 0.2s; }
        .buy-btn { background: #00ff88; color: #000; }
        .sell-btn { background: #ff4444; color: #fff; }
        .buy-btn:hover, .sell-btn:hover { transform: scale(1.05); }
        .chart-wrapper { flex: 1; min-height: 400px; width: 100%; position: relative; }

        .history-section { padding: 1.5rem; display: flex; flex-direction: column; }
        .trade-list { display: flex; flex-direction: column; gap: 1rem; }
        .trade-item { display: flex; align-items: center; gap: 1rem; padding: 0.8rem; background: rgba(255,255,255,0.02); border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); }
        .badge { font-size: 0.65rem; font-weight: 800; padding: 2px 8px; border-radius: 4px; }
        .badge.buy { background: rgba(0, 255, 136, 0.1); color: #00ff88; }
        .badge.sell { background: rgba(255, 68, 68, 0.1); color: #ff4444; }
        
        /* Loading & Toast */
        .loading-container { height: 400px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem; color: #444; }
        .spinner { width: 40px; height: 40px; border: 3px solid rgba(0, 242, 254, 0.1); border-top-color: #00f2fe; border-radius: 50%; }
        .toast-container { position: fixed; bottom: 40px; right: 40px; padding: 1rem 2rem; display: flex; align-items: center; gap: 1rem; border: 1px solid rgba(0, 255, 136, 0.2); z-index: 1000; box-shadow: 0 10px 40px rgba(0,0,0,0.5); }

        /* Other Views */
        .placeholder-view { padding: 4rem; text-align: center; }
        .asset-list { width: 100%; max-width: 600px; margin: 2rem auto 0; }
        .asset-row { display: flex; justify-content: space-between; padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .asset-row span.up { color: #00ff88; }
        .asset-row span.down { color: #ff4444; }

        .settings-form { padding: 3rem; max-width: 500px; margin: 0 auto; }
        .setting-item { margin-bottom: 2rem; }
        .setting-item label { display: block; color: #888; font-size: 0.8rem; margin-bottom: 0.8rem; text-transform: uppercase; }
        .setting-item input, .setting-item select { width: 100%; background: rgba(0,0,0,0.3); border: 1px solid #333; padding: 1rem; border-radius: 10px; color: #fff; outline: none; }
        .save-btn { width: 100%; background: #00f2fe; color: #000; border: none; padding: 1rem; border-radius: 10px; font-weight: 800; cursor: pointer; transition: transform 0.2s; }
        .save-btn:hover { transform: scale(1.02); }
      `}</style>
    </PremiumShell>
  );
}

function StatBox({ title, value, delta, up, icon }) {
  return (
    <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="glass-panel stat-box">
      <div className="stat-header">{icon} {title}</div>
      <div className="stat-value">{value}</div>
      <div className={`stat-delta ${up ? 'up' : ''}`}>{delta} {up && <ArrowUpRight size={14} />}</div>
    </motion.div>
  );
}

export default App;
