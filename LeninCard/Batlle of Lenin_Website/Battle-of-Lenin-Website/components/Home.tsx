import React from 'react';

interface HomeProps {
  navigate: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ navigate }) => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Ảnh nền chìm */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-[4000ms] animate-slow-zoom"
        style={{
          // Nếu ảnh nằm trong /public/background/background.jpg, nên dùng đường dẫn tuyệt đối:
          // backgroundImage: "url('/background/background.jpg')",
          backgroundImage: "url('background/background.jpg')",
        }}
      ></div>

      {/* Overlay gradient làm ảnh “chìm” để chữ nổi bật */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 dark:from-black/70 dark:via-black/60 dark:to-black/80"></div>

      {/* Nội dung */}
      <div className="container relative mx-auto px-6 z-10">
        {/* Decorative glows */}
        <span className="pointer-events-none absolute -left-12 top-16 h-40 w-40 rounded-full bg-brand-gold/25 blur-3xl opacity-80"></span>
        <span className="pointer-events-none absolute right-0 bottom-16 h-56 w-56 rounded-full bg-amber-500/15 blur-3xl opacity-70"></span>

        <div className="relative mx-auto max-w-6xl text-left lg:grid lg:grid-cols-[1.35fr_1fr] lg:items-center lg:gap-14">
          <div className="space-y-6 animate-fade-in-down">
            <span className="inline-flex items-center gap-2 text-xs md:text-sm tracking-[0.35em] uppercase text-brand-gold/80">
              Triết học • Chiến lược
            </span>

            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight 
              [text-shadow:0_4px_8px_rgba(0,0,0,0.6)]"
            >
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-brand-gold via-amber-300 to-amber-200">
                Lenin Card
              </span>
              <span className="block mt-4 text-4xl md:text-5xl font-semibold text-white tracking-normal">
                Chơi để chinh phục đỉnh cao tri thức!
              </span>
            </h1>

            <div className="h-1 w-24 rounded-full bg-gradient-to-r from-brand-gold/90 to-amber-400/70 shadow-lg shadow-brand-gold/40"></div>

            <p className="text-lg md:text-xl text-gray-200/90 dark:text-gray-300 max-w-2xl leading-relaxed">
              Chào mừng bạn đến với <strong>Lenin Card</strong> – nơi tri thức gặp chiến lược.
              Mỗi nước đi là một luận điểm, mỗi chiến thắng là một tuyên ngôn mới của tư duy. Khai mở
              tầm nhìn, suy luận sâu sắc và kiến tạo con đường của riêng bạn.
            </p>

            {/* Nút hành động */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://battle-of-lenin.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-gold hover:bg-amber-500 text-gray-900 font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 ease-in-out hover:scale-105 shadow-lg shadow-brand-gold/40"
              >
                🎮 Chơi ngay
              </a>

              <button
                type="button"
                onClick={() => navigate('guide')}
                className="bg-transparent border-2 border-white/80 hover:bg-white hover:text-gray-900 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 ease-in-out hover:scale-105"
              >
                📺 Xem Luật chơi
              </button>
            </div>
          </div>

          <aside className="mt-12 space-y-8 lg:mt-0 animate-fade-in-up lg:animate-delay-200">
            <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 dark:bg-white/5 backdrop-blur-xl p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.65)]">
              <span className="absolute -top-12 -right-10 h-36 w-36 rounded-full bg-brand-gold/15 blur-3xl opacity-90"></span>
              <span className="absolute -bottom-16 -left-6 h-28 w-28 rounded-full bg-emerald-500/10 blur-3xl opacity-80"></span>

              <p className="text-xs font-semibold tracking-[0.4em] uppercase text-brand-gold/70">
                Reflections
              </p>
              <blockquote className="mt-6 text-lg md:text-xl italic leading-relaxed text-gray-100">
                “Không có gì cao hơn tri thức. Mọi chiến thắng đều bắt đầu từ sự suy tư sâu sắc và kỷ
                luật của trí tuệ.”
              </blockquote>
              <div className="mt-6 flex items-center gap-3 text-sm text-gray-300/90">
                <span className="h-px flex-1 bg-white/30"></span>
                <span>Triết lý chiến lược</span>
              </div>
              <p className="mt-4 text-sm text-gray-300">
                Hãy để mỗi ván đấu trở thành một cuộc đối thoại bằng lý luận giữa bạn và đối thủ, nơi
                trí tuệ dẫn đường cho mọi quyết định.
              </p>
            </div>

            <div className="flex items-center gap-4 text-gray-200/90">
              <div className="grid h-16 w-16 place-items-center rounded-full border border-white/15 bg-gradient-to-br from-gray-900/60 to-gray-800/20 backdrop-blur-xl text-3xl">
                ♕
              </div>
              <div className="text-sm leading-relaxed">
                <p className="font-medium text-white/90 uppercase tracking-[0.25em]">Tri thức</p>
                <p>
                  Từ nền tảng triết học Marxist-Leninist đến những câu hỏi hiện đại, mỗi thử thách là
                  cơ hội để bạn bứt phá và tái định nghĩa chiến thắng.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Home;
