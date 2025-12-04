import React, { useState } from 'react';

interface LobbyProps {
  onStartGame: (playerNames: string[]) => void;
  onReturnToMenu: () => void;
  isLoading: boolean;
  error: string | null;
}

const FONT_FAMILY = "font-serif";

const Lobby: React.FC<LobbyProps> = ({ onStartGame, onReturnToMenu, isLoading, error }) => {
  const [username, setUsername] = useState('');
  const [confirmedName, setConfirmedName] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleConfirm = () => {
    if (!username.trim()) {
      setMessage('Vui lòng nhập username để tiếp tục.');
      setConfirmedName(null);
      return;
    }
    setConfirmedName(username.trim());
    setMessage('Đã xác nhận! Bạn có thể vào phòng chơi.');
  };

  const handleEdit = () => {
    setConfirmedName(null);
    setMessage(null);
  };

  const handleEnterRoom = () => {
    const playerName = confirmedName ?? username.trim();
    if (!playerName) {
      setMessage('Vui lòng xác nhận username trước khi vào phòng.');
      return;
    }
    onStartGame([playerName]);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-8 px-2">
      <div className="relative w-full max-w-lg bg-white/90 border-4 border-black md:rounded-3xl rounded-xl p-6 md:p-11 shadow-2xl flex flex-col items-center space-y-8 overflow-hidden">
        {/* Decor shadow */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-4/5 h-16 rounded-full blur-xl bg-yellow-100/80 opacity-40 -z-0" />
        {/* Title */}
        <h1
          className={`text-4xl md:text-5xl font-extrabold tracking-tight text-[#c70000] drop-shadow-lg text-center mb-7 mt-2 select-none ${FONT_FAMILY}`}
          style={{ fontFamily: `'Roboto Slab', Times New Roman, serif` }}
        >
          ĐĂNG NHẬP TRẬN ĐẤU
        </h1>
        {/* Step 1: Username */}
        <div className="w-full text-center flex flex-col gap-2 md:gap-4 mb-3">
          <div className="flex flex-col items-center">
            <span className="text-[2.2rem] leading-tight font-black text-gray-400 tracking-widest opacity-80" style={{ fontFamily: "inherit", letterSpacing: '2px' }}>BƯỚC 1</span>
            <span className="text-lg md:text-2xl font-bold text-gray-800 font-serif tracking-wider mt-2 mb-1" style={{ fontFamily: "inherit" }}>
              Nhập tên chiến binh của bạn
            </span>
          </div>
          <p className="text-md md:text-lg text-gray-700" style={{ fontFamily: "inherit" }}>
            Đây sẽ là biệt danh <span className="text-[#c70000] font-semibold">hiển thị suốt trận đấu</span>. Bạn có thể chỉnh lại trước khi xác nhận.
          </p>
        </div>
        {/* Input form hero */}
        <div className="w-full flex flex-col items-center mb-4">
          <div className="rounded-2xl bg-gradient-to-r from-[#fbe7a0]/80 to-white/95 w-full shadow-xl py-6 px-6 flex flex-col gap-4 border-2 border-yellow-300">
            <label htmlFor="username" className={`block text-2xl font-bold text-black mb-3 ${FONT_FAMILY}` } style={{ fontFamily: "inherit" }}>
              Username
            </label>
            <div className="flex flex-col md:flex-row flex-wrap gap-2 w-full items-stretch md:items-center">
              <input
                id="username"
                type="text"
                value={confirmedName ?? username}
                onChange={(e) => !confirmedName && setUsername(e.target.value)}
                placeholder="Ví dụ: LeninMaster"
                className={`flex-grow px-5 py-3 rounded-xl border-2 border-black text-black text-2xl font-mono outline-none transition-all duration-200 ${confirmedName ? 'bg-gray-200/50' : ''}`}
                disabled={!!confirmedName}
                onKeyDown={(e) => e.key === 'Enter' && !confirmedName && handleConfirm()}
                autoFocus
                style={{ fontFamily: 'Roboto Mono, Menlo, Courier, monospace' }}
              />
              {confirmedName ? (
                <button
                  onClick={handleEdit}
                  className={`min-w-[110px] px-6 md:px-8 h-12 md:h-14 whitespace-nowrap text-base md:text-xl font-bold bg-gray-700 text-white rounded-2xl border-2 border-black shadow hover:scale-105 hover:bg-gray-800 transition-all ${FONT_FAMILY}`}
                  tabIndex={0}
                  style={{ fontFamily: "inherit" }}
                >
                  Đổi tên
                </button>
              ) : (
                <button
                  onClick={handleConfirm}
                  className={`min-w-[110px] px-6 md:px-8 h-12 md:h-14 whitespace-nowrap text-base md:text-2xl font-black bg-yellow-300 text-[#c70000] rounded-2xl border-2 border-yellow-600 shadow hover:scale-110 hover:bg-yellow-400 transition-all ${FONT_FAMILY}`}
                  tabIndex={0}
                  style={{ fontFamily: "inherit" }}
                >
                  Xác nhận
                </button>
              )}
            </div>
            {/* Message block */}
            <div className="min-h-[2.8rem] flex items-center justify-center mt-2" style={{ fontFamily: "inherit" }}>
              {message && (
                <span className="text-green-700 text-xl font-bold flex items-center gap-2 animate-pulse">
                  ✓ {message}
                </span>
              )}
              {error && (
                <span className="text-red-600 text-xl font-bold animate-pulse">
                  {error}
                </span>
              )}
            </div>
          </div>
        </div>
        {/* Step 2: Vào phòng chơi */}
        <div className="w-full flex flex-col items-center mt-2 mb-1">
          <span className="text-[1.6rem] leading-tight font-extrabold text-yellow-800/80 tracking-widest opacity-90" style={{ fontFamily: "inherit", letterSpacing: '2px' }}>BƯỚC 2</span>
          <span className="text-xl md:text-2xl font-bold text-black tracking-wide mt-1 mb-2 ${FONT_FAMILY}" style={{ fontFamily: "inherit" }}>Vào phòng chơi</span>
          <p className="text-gray-700 mb-5" style={{ fontFamily: "inherit" }}>Sau khi xác nhận tên, nhấn vào nút dưới để bắt đầu trận đấu!</p>
        </div>
        {/* Action button block (Vào phòng/Menu) */}
        <div className="flex flex-col md:flex-row w-full gap-5 md:gap-6 mt-2 z-10">
          <button
            onClick={onReturnToMenu}
            className={`w-full h-14 text-2xl rounded-2xl bg-gradient-to-r from-black via-gray-700 to-gray-800 text-white font-bold border-2 border-black shadow-lg hover:bg-gray-900 hover:scale-105 transition-all duration-150 ${FONT_FAMILY}`}
            style={{ fontFamily: "inherit" }}
          >
            Về Menu Chính
          </button>
          <button
            onClick={handleEnterRoom}
            disabled={!confirmedName || isLoading}
            className={`w-full h-14 text-2xl rounded-2xl bg-gradient-to-r from-[#f8c400] to-[#c70000] font-extrabold shadow-lg border-2 border-[#c70000] text-white tracking-wide
              hover:scale-105 hover:brightness-110 transition-all
              disabled:from-yellow-300 disabled:to-[#e17070] disabled:bg-yellow-300/80 disabled:text-gray-200 disabled:border-gray-300 disabled:cursor-not-allowed ${FONT_FAMILY}`}
            style={{ fontFamily: "inherit" }}
          >
            {isLoading ? (
              <svg className="animate-spin h-8 w-8 mx-auto" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              'Vào Phòng Chơi'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Lobby;
