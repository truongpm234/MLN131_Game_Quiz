import React, { useRef, useEffect } from 'react';
import { Player } from '../types';

interface DashboardProps {
  currentPlayer?: Player;
  wrongAnswers: number;
}

const avatarEmojis = ['🦁','🐲','🦊','🦉','🐯','🦄','🐼','🦸','🧙','👑','👽','🤖'];

const Dashboard: React.FC<DashboardProps> = ({ currentPlayer, wrongAnswers }) => {
  const scoreRef = useRef<HTMLDivElement>(null);
  const prevScore = useRef<number>(0);
  useEffect(() => {
    if (scoreRef.current && currentPlayer && prevScore.current !== currentPlayer.score) {
      scoreRef.current.classList.add('animate-pulse');
      setTimeout(() => scoreRef.current?.classList.remove('animate-pulse'), 700);
      prevScore.current = currentPlayer.score;
    }
  }, [currentPlayer?.score]);

  if (!currentPlayer) return null;
  const shortName = currentPlayer.name?.charAt(0)?.toUpperCase() || '?';
  const emoji = avatarEmojis[currentPlayer.name?.length % avatarEmojis.length] || '🧑';

  return (
    <div className="relative mx-auto w-full max-w-xs flex flex-col items-center bg-gradient-to-b from-[#25103d99] to-[#c7000039] via-[#1d0c2f70] rounded-[2.3rem] shadow-[0_10px_48px_0_rgba(199,0,0,0.22)] pb-4 pt-7 px-3 animate-fade-in"
      style={{minHeight: 340}}
    >
      {/* Badge title */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-black/70 px-4 py-0.5 rounded-full text-xs font-bold tracking-widest text-yellow-300 border-2 border-yellow-200/80 shadow">Lượt chơi của</div>
      {/* Avatar icon */}
      <div className="relative z-10 mt-3 mb-1">
        <div className="w-24 h-24 rounded-full border-4 border-yellow-300 bg-black/80 flex items-center justify-center text-[3rem] shadow-2xl "
          style={{boxShadow: '0 0 32px #ffde70, 0 0 0 6px #fff8e058'}}>
          <span>{emoji}</span>
        </div>
        <div className="absolute right-0 bottom-1 w-10 h-10 bg-gradient-to-br from-yellow-200 via-yellow-500 to-orange-400 border-2 border-white rounded-full flex items-center justify-center shadow-xl text-2xl font-bold -mr-4 -mb-4">
          <span>👑</span>
        </div>
      </div>
      {/* Tên nổi bật viền sáng ngang */}
      <div className="w-full flex justify-center mt-3 mb-1">
        <span className="px-5 py-1 rounded-full bg-black/70 border-2 border-yellow-300 text-lg font-extrabold tracking-wide text-yellow-200 drop-shadow-xl shadow-yellow-200/10" style={{letterSpacing: 1}}>
          {currentPlayer.name}
        </span>
      </div>
      {/* Điểm và sai nằm ngang, phối card */}
      <div className="mt-6 w-full flex items-end justify-center gap-8 select-none">
        {/* Wrong answers */}
        <div className="flex flex-col items-center gap-1">
          <div className="bg-rose-700/90 border-2 border-rose-300 rounded-full w-12 h-12 flex flex-col items-center justify-center text-rose-100 font-black text-xl shadow-sm">
            <span className="-mb-1">🧨</span>
            <span>{wrongAnswers}</span>
          </div>
          <span className="text-xs text-rose-100 uppercase mt-1 font-semibold tracking-wider">Sai</span>
        </div>
        {/* Score */}
        <div className="flex flex-col items-center gap-1">
          <div ref={scoreRef} className="relative bg-gradient-to-br from-yellow-100 via-yellow-400 to-orange-400 border-4 border-yellow-300 rounded-full w-16 h-16 flex items-center justify-center text-yellow-900 font-extrabold text-4xl shadow-xl transition-all">
            {currentPlayer.score}
            <span className="absolute top-1 right-1 text-lg">🔥</span>
          </div>
          <span className="text-xs text-yellow-100 uppercase mt-1 font-bold tracking-wider">Điểm</span>
        </div>
      </div>
      {/* Bottom glow effect or pattern */}
      <div className="pointer-events-none absolute left-1/2 bottom-0 -translate-x-1/2 w-40 h-10 blur-2xl bg-gradient-to-r from-yellow-400/40 via-[#c70000]/70 to-yellow-200/30 opacity-60"/>
    </div>
  );
};

export default Dashboard;