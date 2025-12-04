import React from 'react';

interface MainMenuProps {
  onStartSingle: () => void;
  onShowInstructions: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onStartSingle, onShowInstructions }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br font-sans relative overflow-hidden">
      {/* --- MAIN CARD --- */}
      <div className="relative w-full max-w-md bg-white border-4 border-black rounded-3xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 md:p-10 animate-bounce-in z-10">
        
        {/* Header Section */}
        <div className="text-center mb-10 relative">
          {/* Badge */}
          <div className="inline-block bg-[#FFD93D] border-2 border-black px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-3 hover:rotate-0 transition-transform cursor-default">
            Strategy Card Game
          </div>
          
          {/* Title */}
          <h1 className="text-6xl font-black text-black leading-none tracking-tighter drop-shadow-sm">
            QUIZ
            <span className="block text-[#FF6B6B] text-7xl" style={{ textShadow: '3px 3px 0px #000' }}>GAME</span>
          </h1>
          
          {/* Decorative shapes */}
          <div className="absolute top-10 right-0 w-6 h-6 border-4 border-black bg-[#4D96FF] rounded-full"></div>
          <div className="absolute bottom-0 left-4 w-4 h-4 border-2 border-black bg-[#FFD93D] transform rotate-45"></div>
        </div>

        {/* Buttons Section */}
        <div className="space-y-5">
          
          {/* Play Button */}
          <button
            onClick={onStartSingle}
            className="group relative w-full h-16 bg-[#6BCB77] border-4 border-black rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[6px] hover:translate-y-[6px] active:translate-x-[8px] active:translate-y-[8px] active:shadow-none transition-all duration-200 flex items-center justify-center gap-3 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12"></div>
            <span className="text-2xl font-black text-white uppercase tracking-wider relative z-10" style={{ textShadow: '2px 2px 0px #000' }}>
              Vào Trận
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white relative z-10 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>

          {/* Rules Button */}
          <button
            onClick={onShowInstructions}
            className="group relative w-full h-14 bg-[#4D96FF] border-4 border-black rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[6px] hover:translate-y-[6px] active:translate-x-[8px] active:translate-y-[8px] active:shadow-none transition-all duration-200 flex items-center justify-center gap-3"
          >
            <span className="text-lg font-black text-white uppercase tracking-wide" style={{ textShadow: '1.5px 1.5px 0px #000' }}>
              Luật Chơi
            </span>
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white drop-shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </button>

          {/* Home Button */}
          <a
            href="https://homepage-swart-pi.vercel.app/"
            className="group relative w-full h-14 bg-white border-4 border-black rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[6px] hover:translate-y-[6px] active:translate-x-[8px] active:translate-y-[8px] active:shadow-none transition-all duration-200 flex items-center justify-center gap-3"
          >
            <span className="text-lg font-black text-black uppercase tracking-wide group-hover:text-gray-700">
              Về Trang Chủ
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </a>

        </div>

        {/* Footer Text */}
        <div className="mt-10 text-center border-t-4 border-black border-dashed pt-4 opacity-60 hover:opacity-100 transition-opacity">
          <p className="text-xs font-bold text-black uppercase tracking-[0.2em]">
            Philosophy & Strategy
          </p>
        </div>

      </div>

      <style>{`
        @keyframes bounceIn {
          0% { opacity: 0; transform: scale(0.3); }
          50% { opacity: 1; transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
        .animate-bounce-in {
          animation: bounceIn 0.6s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
        }
      `}</style>
    </div>
  );
};

export default MainMenu;