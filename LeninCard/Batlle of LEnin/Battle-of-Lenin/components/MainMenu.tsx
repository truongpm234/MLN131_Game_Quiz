import React from 'react';

interface MainMenuProps {
  onStartSingle: () => void;
  onShowInstructions: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onStartSingle, onShowInstructions }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Main Card Container - Bo tròn, có viền gradient */}
      <div className="relative w-full max-w-md bg-gradient-to-br from-zinc-950 via-neutral-900 to-zinc-950 rounded-[2.5rem] shadow-[0_0_60px_rgba(234,88,12,0.4),0_0_100px_rgba(234,88,12,0.2)] overflow-hidden animate-fade-in-up border-2 border-transparent" style={{
        borderImage: 'linear-gradient(to bottom, rgba(234,88,12,0.8), rgba(234,179,8,0.6), rgba(234,88,12,0.8)) 1'
      }}>
        
        {/* Decorative Top Gradient Bar */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-600 via-yellow-500 to-orange-600"></div>

        <div className="p-8 md:p-10 flex flex-col items-center text-center relative">
          
          {/* Subtle glow effect behind content */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-orange-600/10 rounded-full blur-[100px] pointer-events-none"></div>
          
          {/* Logo / Title Area */}
          <div className="mb-8 relative z-10">
            <span className="block text-xs font-bold tracking-[0.5em] text-orange-500/90 mb-3 uppercase">Trò chơi trí tuệ</span>
            <h1 className="text-6xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
              ĐẠI <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 drop-shadow-[0_0_30px_rgba(234,179,8,0.5)]">ĐỒNG</span>
            </h1>
          </div>

          {/* Buttons Area */}
          <div className="w-full space-y-4 relative z-10">
            
            {/* Button: Vào Trận */}
            <button
              onClick={onStartSingle}
              className="group relative w-full h-16 rounded-2xl bg-gradient-to-r from-red-700 via-red-600 to-red-700 hover:from-red-600 hover:via-red-500 hover:to-red-600 text-white font-black text-xl uppercase tracking-wider shadow-[0_8px_25px_rgba(220,38,38,0.4)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_35px_rgba(220,38,38,0.6)] flex items-center justify-center gap-3 overflow-hidden border border-red-500/30"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-300"><path d="M8 5v14l11-7z"/></svg>
                Vào Trận
              </span>
            </button>

            {/* Button: Luật Chơi */}
            <button
              onClick={onShowInstructions}
              className="group w-full h-14 rounded-2xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white font-bold text-lg uppercase tracking-wide border border-white/20 hover:border-white/40 transition-all duration-300 flex items-center justify-center gap-3 hover:shadow-[0_4px_20px_rgba(255,255,255,0.1)]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:text-orange-400 transition-colors">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              Luật Chơi
            </button>

            {/* Decorative Divider */}
            <div className="py-3 flex items-center gap-4 w-full">
              <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent flex-1"></div>
              <div className="flex gap-1.5">
                <div className="w-1 h-1 rounded-full bg-orange-500/60"></div>
                <div className="w-1 h-1 rounded-full bg-yellow-500/60"></div>
                <div className="w-1 h-1 rounded-full bg-orange-500/60"></div>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent flex-1"></div>
            </div>

            {/* Button: Về Trang Chủ */}
            
              <a href="https://homepage-swart-pi.vercel.app/" className="group w-full h-14 rounded-2xl bg-gradient-to-r from-neutral-800/80 to-neutral-900/80 hover:from-neutral-700/90 hover:to-neutral-800/90 text-gray-400 hover:text-white font-bold text-base border border-white/10 hover:border-white/25 shadow-lg transition-all duration-300 flex items-center justify-center gap-3 hover:-translate-y-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:text-orange-400 transition-colors">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              Về Trang Chủ
            </a>

          </div>
        </div>
        
        {/* Decorative Bottom */}
        <div className="p-4 bg-gradient-to-t from-black/60 to-transparent border-t border-white/5">
          <p className="text-[10px] text-gray-500 uppercase tracking-[0.25em] font-semibold">Philosophy & Strategy Game</p>
        </div>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(30px) scale(0.95); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default MainMenu;