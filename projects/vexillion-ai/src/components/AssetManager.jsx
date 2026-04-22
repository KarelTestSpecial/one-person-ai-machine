import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, Video, Music, Upload, Trash2, Eye, FileText, X } from 'lucide-react';

const AssetManager = () => {
  const fileInputRef = useRef(null);
  
  // Persistence Logic: Load from LocalStorage
  const [assets, setAssets] = useState(() => {
    const saved = localStorage.getItem('vx_assets');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Hero_Banner.png', type: 'image', size: '2.4 MB', date: '2026-04-20' },
      { id: 2, name: 'Intro_Video.mp4', type: 'video', size: '45.8 MB', date: '2026-04-21' },
      { id: 3, name: 'Podcast_Ep1.mp3', type: 'audio', size: '12.1 MB', date: '2026-04-22' }
    ];
  });

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('vx_assets', JSON.stringify(assets));
  }, [assets]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const typeMap = {
      'image/': 'image',
      'video/': 'video',
      'audio/': 'audio'
    };

    let assetType = 'document';
    for (const [key, value] of Object.entries(typeMap)) {
      if (file.type.startsWith(key)) assetType = value;
    }

    const newAsset = {
      id: Date.now(),
      name: file.name,
      type: assetType,
      size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
      date: new Date().toISOString().split('T')[0]
    };

    setAssets(prev => [newAsset, ...prev]);
  };

  const removeAsset = (id) => {
    setAssets(prev => prev.filter(a => a.id !== id));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'image': return <Image className="text-cyan-400" size={20} />;
      case 'video': return <Video className="text-emerald-400" size={20} />;
      case 'audio': return <Music className="text-amber-400" size={20} />;
      default: return <FileText className="text-slate-400" size={20} />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <header className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter">Media Library</h1>
          <p className="text-slate-400 mt-2">Manage multi-channel assets for all connected sites.</p>
        </div>
        <div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            className="hidden" 
          />
          <button 
            onClick={() => fileInputRef.current.click()}
            className="flex items-center gap-2 bg-cyan-500 text-black px-6 py-3 rounded-xl font-bold hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20"
          >
            <Upload size={18} />
            Upload New Asset
          </button>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 glass-panel p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <AnimatePresence>
              {assets.map((asset) => (
                <motion.div
                  key={asset.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/5 border border-white/5 rounded-2xl p-4 group hover:border-cyan-500/30 transition-all relative"
                >
                  <div className="aspect-square bg-black/40 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
                    {getIcon(asset.type)}
                    <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/10 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => alert(`Previewing ${asset.name}`)}
                          className="p-2 bg-black/60 rounded-lg hover:text-cyan-400"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={() => removeAsset(asset.id)}
                          className="p-2 bg-black/60 rounded-lg hover:text-rose-400"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium truncate pr-4 text-slate-200">{asset.name}</p>
                    <div className="flex justify-between items-center text-[9px] text-slate-500 font-mono">
                      <span>{asset.type.toUpperCase()}</span>
                      <span>{asset.size}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {assets.length === 0 && (
              <div className="col-span-full py-20 text-center text-slate-600 italic">
                No assets in the cloud. Upload your first file to begin.
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AssetManager;
