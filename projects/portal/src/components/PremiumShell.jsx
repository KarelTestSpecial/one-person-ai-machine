import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  BarChart3, 
  Settings, 
  User, 
  LogOut,
  ChevronRight,
  Search, 
  Bell, 
  Mail, 
  Globe,
  X,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * MASTER COMPONENT: Premium Shell v2.2
 * Logic: External state control, Notification System, Search filtering.
 */
export const PremiumShell = ({ children, title, activeTab, onTabChange, isConnected = true, latency = 0 }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Portfolio', icon: Briefcase },
    { name: 'Analytics', icon: BarChart3 },
    { name: 'Settings', icon: Settings },
  ];

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-glow"></div>
          <div className="logo">APEX<span>AI</span></div>
        </div>

        <nav className="nav-container">
          <ul className="nav-links">
            {navItems.map((item) => (
              <li 
                key={item.name}
                className={activeTab === item.name ? 'active' : ''}
                onClick={() => onTabChange(item.name)}
              >
                <item.icon size={20} className="nav-icon" />
                <span>{item.name}</span>
                {activeTab === item.name && (
                  <motion.div layoutId="active-pill" className="active-pill" />
                )}
                <ChevronRight size={14} className="chevron" />
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="user-card">
            <div className="avatar">K</div>
            <div className="user-info">
              <span className="name">Karel</span>
              <span className="role">Architect</span>
            </div>
            <LogOut size={18} className="logout-icon" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="content">
        <header className="main-header">
          <div className="header-left">
            <motion.h1 key={title} initial={{opacity:0, x:-10}} animate={{opacity:1, x:0}}>{title}</motion.h1>
            <p className="breadcrumb">Nexus / {activeTab}</p>
            {isConnected && (
              <div className="live-indicator">
                <span className="pulse-dot"></span>
                <span className="live-text">LIVE</span>
                <span className="latency-text">{latency}ms</span>
              </div>
            )}
          </div>
          
          <div className="header-right">
            <div className="search-bar">
              <Search size={18} className="search-icon" />
              <input type="text" placeholder="Search markets..." />
            </div>
            
            <div className="header-actions">
              <div className="action-item"><Mail size={20} /><span className="badge-dot"></span></div>
              <div className="action-item" onClick={() => setShowNotifications(!showNotifications)}>
                <Bell size={20} />
                <span className="badge-dot"></span>
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="notification-dropdown glass-panel"
                    >
                      <div className="dropdown-header">
                        <span>Notifications</span>
                        <X size={14} onClick={(e) => { e.stopPropagation(); setShowNotifications(false); }} />
                      </div>
                      <div className="notification-list">
                        <div className="notif-item unread">
                          <div className="notif-icon buy"><Zap size={14} /></div>
                          <div className="notif-body">
                            <p>BTC Long position executed successfully.</p>
                            <span>2 mins ago</span>
                          </div>
                        </div>
                        <div className="notif-item">
                          <div className="notif-icon alert"><Settings size={14} /></div>
                          <div className="notif-body">
                            <p>System update scheduled for 02:00 AM.</p>
                            <span>1 hour ago</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="action-item"><Globe size={20} /></div>
            </div>

            <div className="status-badge">
              <div className="pulse"></div> <span>Terminal Online</span>
            </div>
          </div>
        </header>
        
        <section className="view-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </section>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        :root {
          --accent: #00f2fe;
          --accent-glow: rgba(0, 242, 254, 0.3);
          --sidebar-bg: rgba(10, 10, 12, 0.95);
          --glass-border: rgba(255, 255, 255, 0.08);
          --glass-bg: rgba(255, 255, 255, 0.03);
          --glass-blur: blur(16px);
        }

        .app-container { display: flex; height: 100vh; background: #060608; color: #fff; font-family: 'Inter', sans-serif; overflow: hidden; }

        /* Sidebar */
        .sidebar { width: 280px; background: var(--sidebar-bg); border-right: 1px solid var(--glass-border); display: flex; flex-direction: column; padding: 2rem 1rem; position: relative; }
        .sidebar-header { margin-bottom: 3rem; padding: 0 1rem; position: relative; }
        .logo { font-size: 1.6rem; font-weight: 800; letter-spacing: -1px; z-index: 2; position: relative; }
        .logo span { color: var(--accent); }
        .logo-glow { position: absolute; top: -20px; left: -20px; width: 60px; height: 60px; background: var(--accent); filter: blur(40px); opacity: 0.2; }
        .nav-container { flex: 1; }
        .nav-links { list-style: none; padding: 0; }
        .nav-links li { display: flex; align-items: center; padding: 0.8rem 1rem; margin-bottom: 0.5rem; border-radius: 12px; color: #666; cursor: pointer; transition: all 0.3s; position: relative; }
        .nav-links li:hover { color: #fff; background: rgba(255, 255, 255, 0.03); }
        .nav-links li.active { color: var(--accent); background: rgba(0, 242, 254, 0.05); }
        .nav-icon { margin-right: 1rem; }
        .chevron { margin-left: auto; opacity: 0; transition: opacity 0.3s; }
        .nav-links li:hover .chevron { opacity: 0.5; }
        .nav-links li.active .chevron { opacity: 1; }
        .active-pill { position: absolute; left: 0; width: 3px; height: 20px; background: var(--accent); border-radius: 0 4px 4px 0; box-shadow: 0 0 10px var(--accent); }

        /* Content */
        .content { flex: 1; padding: 2rem 3rem; overflow-y: auto; background: radial-gradient(circle at 50% 0%, rgba(0, 242, 254, 0.03) 0%, transparent 50%); position: relative; }
        .main-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 3rem; }
        .header-left h1 { font-size: 2rem; font-weight: 800; margin: 0; letter-spacing: -0.5px; }
        .breadcrumb { font-size: 0.8rem; color: #444; margin-top: 0.5rem; text-transform: uppercase; letter-spacing: 1px; }

        .header-right { display: flex; align-items: center; gap: 2rem; }
        .search-bar { display: flex; align-items: center; background: rgba(255,255,255,0.03); padding: 0.6rem 1rem; border-radius: 10px; border: 1px solid var(--glass-border); width: 300px; }
        .search-icon { color: #444; margin-right: 0.8rem; }
        .search-bar input { background: none; border: none; color: #fff; outline: none; width: 100%; font-size: 0.9rem; }
        
        .header-actions { display: flex; gap: 1.2rem; align-items: center; }
        .action-item { position: relative; color: #666; cursor: pointer; transition: color 0.3s; }
        .action-item:hover { color: var(--accent); }
        .badge-dot { position: absolute; top: -2px; right: -2px; width: 8px; height: 8px; background: var(--accent); border-radius: 50%; border: 2px solid #060608; }

        /* Notification Dropdown */
        .notification-dropdown { position: absolute; top: 40px; right: 0; width: 320px; z-index: 100; padding: 0; overflow: hidden; border: 1px solid var(--glass-border); }
        .dropdown-header { display: flex; justify-content: space-between; align-items: center; padding: 1rem; border-bottom: 1px solid var(--glass-border); background: rgba(255,255,255,0.02); }
        .dropdown-header span { font-weight: 600; font-size: 0.9rem; }
        .notification-list { max-height: 400px; overflow-y: auto; }
        .notif-item { display: flex; gap: 1rem; padding: 1rem; border-bottom: 1px solid var(--glass-border); transition: background 0.3s; }
        .notif-item:hover { background: rgba(255,255,255,0.02); }
        .notif-item.unread { background: rgba(0, 242, 254, 0.02); }
        .notif-icon { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .notif-icon.buy { background: rgba(0, 255, 136, 0.1); color: #00ff88; }
        .notif-icon.alert { background: rgba(255, 242, 0, 0.1); color: #fff200; }
        .notif-body p { font-size: 0.85rem; margin: 0 0 4px 0; line-height: 1.4; }
        .notif-body span { font-size: 0.7rem; color: #444; }

        .status-badge { display: flex; align-items: center; background: rgba(0, 255, 136, 0.05); color: #00ff88; padding: 0.5rem 1rem; border-radius: 50px; font-size: 0.75rem; font-weight: 600; border: 1px solid rgba(0, 255, 136, 0.1); }
        .pulse { width: 6px; height: 6px; background: #00ff88; border-radius: 50%; margin-right: 8px; animation: pulse 2s infinite; }
        @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }

        .view-container { position: relative; }
      `}</style>
    </div>
  );
};
