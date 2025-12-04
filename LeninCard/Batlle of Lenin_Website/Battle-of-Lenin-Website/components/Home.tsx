import React, { useState, useEffect } from 'react';

interface HomeProps {
  navigate: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ navigate }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20,
        y: (e.clientY / window.innerHeight) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="home" className="relative min-h-screen bg-[#0a0a0a] text-white overflow-hidden font-sans selection:bg-rose-500/30">
      
      {/* --- BACKGROUND ANIMATION --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-blue-900/20 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-rose-900/20 rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        {/* Noise Texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
      </div>

      <div className="container relative z-10 mx-auto px-6 py-12 lg:h-screen lg:flex lg:items-center">
        <div className="grid lg:grid-cols-12 gap-16 items-center w-full">
          
          {/* --- LEFT CONTENT: HEADLINE --- */}
          <div className="lg:col-span-7 space-y-10" style={{ transform: `translate(${mousePosition.x * -1}px, ${mousePosition.y * -1}px)` }}>
            
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-300">Không gian Tư duy Mới</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">
                ĐÁNH THỨC
              </span>
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 animate-gradient-x">
                TIỀM NĂNG
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed border-l-4 border-rose-500/50 pl-6">
              Chào mừng bạn đến với <strong>Đại Đồng</strong>. Không chỉ là học tập, đây là hành trình 
              <span className="text-white font-medium"> khai phóng tư duy</span>. Kết hợp lý luận sâu sắc với công nghệ gamification, 
              chúng tôi biến những khái niệm trừu tượng thành trải nghiệm sống động.
            </p>

            {/* --- ACTION BUTTONS (CHỈNH SỬA: DÙNG GRID ĐỂ ĐỀU NHAU) --- */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 w-full max-w-3xl">
              {/* Nút Quiz */}
              <a
                href="https://mln131-quiz-game.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative h-16 bg-gradient-to-r from-orange-500 to-rose-600 text-white font-bold rounded-2xl overflow-hidden shadow-lg shadow-orange-500/25 transition-all duration-300 hover:scale-105 hover:shadow-orange-500/40 flex items-center justify-center w-full"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                <span className="relative flex items-center gap-2 text-base md:text-lg whitespace-nowrap">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                  Quiz Game
                </span>
              </a>

              {/* Nút Matching */}
              <a
                href="https://lenin-matching-game.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative h-16 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-2xl overflow-hidden shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/40 flex items-center justify-center w-full"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                <span className="relative flex items-center gap-2 text-base md:text-lg whitespace-nowrap">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                  Matching Game
                </span>
              </a>

              {/* Nút Guide */}
              <button
                type="button"
                onClick={() => navigate('guide')}
                className="group relative h-16 bg-white/5 backdrop-blur-md border border-white/10 text-gray-300 font-bold rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/10 hover:text-white hover:border-white/30 hover:scale-105 flex items-center justify-center w-full"
              >
                <span className="relative flex items-center gap-2 text-base md:text-lg whitespace-nowrap">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                  Luật Chơi
                </span>
              </button>
            </div>
          </div>

          {/* --- RIGHT CONTENT: VISUALS --- */}
          <div className="lg:col-span-5 relative mt-12 lg:mt-0" style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}>
            {/* Glass Card */}
            <div className="relative z-20 bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500 rounded-full blur-[60px] opacity-40 animate-pulse"></div>
              
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center shadow-lg">
                    <span className="text-2xl">💡</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Góc Nhìn Biện Chứng</h3>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Quote of the day</p>
                  </div>
                </div>
                
                <blockquote className="text-xl font-serif italic text-gray-200 leading-relaxed">
                  "Lý luận mà không có thực tiễn là lý luận suông. Thực tiễn mà không có lý luận là thực tiễn mù quáng."
                </blockquote>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <div className="h-px w-8 bg-gray-500"></div>
                    <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Hồ Chí Minh</span>
                  </div>
                  <span className="text-4xl text-white/10 font-serif">”</span>
                </div>
              </div>
            </div>

            
          </div>
        </div>
      </div>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradientX 4s ease infinite;
        }
        @keyframes gradientX {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
};

export default Home;