import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="relative overflow-hidden py-24 bg-gradient-to-br from-[#0c101b] via-[#080b12] to-[#020205] text-gray-200">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0">
        <span className="absolute left-10 top-24 h-52 w-52 rounded-full bg-brand-gold/20 blur-3xl opacity-70"></span>
        <span className="absolute right-16 bottom-12 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl opacity-60"></span>
      </div>

      <div className="container relative mx-auto px-6">
        {/* Header */}
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.5em] text-brand-gold/70">Guidebook</span>
          <h2 className="mt-6 text-4xl font-extrabold text-white md:text-5xl">
            Giới thiệu & <span className="text-brand-gold">Minh họa</span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base text-gray-300 md:text-lg">
            Khám phá câu chuyện và hình ảnh trực quan về hai chế độ chơi đầy hấp dẫn của Đại Đồng.
          </p>
        </div>

        {/* --- NỘI DUNG GIỚI THIỆU (ĐÃ SỬA LAYOUT) --- */}
        {/* Sử dụng items-stretch để 2 cột cao bằng nhau */}
        <div className="relative mt-16 mb-24 grid items-stretch gap-8 lg:grid-cols-2">
          
          {/* Cột Trái: Câu chuyện hình thành - Thêm h-full để giãn chiều cao */}
          <article className="h-full flex flex-col justify-center rounded-[2.5rem] border border-white/10 bg-white/5 p-10 backdrop-blur-xl shadow-2xl transition-all hover:border-white/20 group">
            <h3 className="text-3xl font-bold text-amber-500 mb-6 group-hover:scale-105 transition-transform origin-left">Câu chuyện hình thành</h3>
            <div className="space-y-6 text-base md:text-lg leading-relaxed text-gray-300">
              <p>
                <strong className="text-white">Đại Đồng</strong> ra đời từ mong muốn tạo nên một sân chơi nơi chiến lược, tư duy phản biện và tinh thần đồng đội được bồi đắp qua từng ván đấu.
              </p>
              <p>
                Mỗi câu hỏi là một cánh cửa mở ra chiều sâu tri thức, giúp người chơi khám phá bản thân và kết nối cộng đồng yêu chủ nghĩa Mác-Lênin bằng trải nghiệm tranh biện sống động.
              </p>
            </div>
          </article>

          {/* Cột Phải: Tầm nhìn & Sứ mệnh - Giữ nguyên Grid con */}
          <div className="grid gap-6 grid-rows-2 h-full">
            <article className="flex flex-col justify-center rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl shadow-xl transition-all hover:bg-white/[0.05]">
              <h3 className="text-xl font-bold text-amber-500 mb-3">Tầm nhìn</h3>
              <p className="text-base text-gray-300 leading-relaxed">
                Nuôi dưỡng cộng đồng học tập tương tác và sáng tạo.
              </p>
            </article>

            <article className="flex flex-col justify-center rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl shadow-xl transition-all hover:bg-white/[0.05]">
              <h3 className="text-xl font-bold text-amber-500 mb-3">Sứ mệnh</h3>
              <p className="text-base text-gray-300 leading-relaxed">
                Truyền cảm hứng nghiên cứu thông qua trải nghiệm game độc đáo, thắp lửa đam mê học hỏi.
              </p>
            </article>
          </div>
        </div>

        {/* --- KHU VỰC ẢNH DEMO --- */}
        {/* Chuyển thành grid 2 cột đều nhau để chứa 2 ảnh */}
        <div className="grid gap-10 lg:grid-cols-2 items-stretch">
          
          {/* Cột 1: Quiz Game */}
          <div className="relative animate-fade-in-up h-full">
            <div className="group relative overflow-hidden rounded-[36px] border border-white/15 bg-gradient-to-br from-white/10 via-white/5 to-white/[0.03] p-6 backdrop-blur-2xl shadow-[0_40px_100px_-40px_rgba(0,0,0,0.7)] transition-all duration-500 hover:-translate-y-2 hover:shadow-brand-gold/20 h-full flex flex-col">
              <span className="absolute inset-0 bg-gradient-to-br from-brand-gold/15 via-transparent to-brand-gold/5 opacity-60 transition-opacity duration-500 group-hover:opacity-80"></span>
              
              <div className="absolute top-8 right-8 z-10 bg-brand-gold/90 text-gray-900 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                Quiz Mode
              </div>

              {/* Thêm aspect-video để khung ảnh có tỉ lệ cố định */}
              <div className="relative w-full aspect-video rounded-[28px] overflow-hidden">
                <img
                  src="/background/LeninBattle.jpg"
                  alt="Quiz Game Interface"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              
              <div className="relative mt-6 space-y-3 text-sm text-gray-200/85 flex-grow">
                <p className="font-semibold tracking-[0.3em] uppercase text-brand-gold/80">Luật chơi nhanh</p>
                <p>Lật thẻ, chờ câu hỏi hiện ra và phản xạ nhanh trong 20s để ghi điểm tối đa.</p>
                <p className="text-xs opacity-70">Thử thách kiến thức và tốc độ.</p>
              </div>
            </div>
          </div>

          {/* Cột 2: Matching Game */}
          <div className="relative animate-fade-in-up delay-200 h-full">
             <div className="group relative overflow-hidden rounded-[36px] border border-white/15 bg-gradient-to-br from-white/10 via-white/5 to-white/[0.03] p-6 backdrop-blur-2xl shadow-[0_40px_100px_-40px_rgba(0,0,0,0.7)] transition-all duration-500 hover:-translate-y-2 hover:shadow-emerald-500/20 h-full flex flex-col">
              <span className="absolute inset-0 bg-gradient-to-br from-emerald-500/15 via-transparent to-emerald-500/5 opacity-60 transition-opacity duration-500 group-hover:opacity-80"></span>
              
              <div className="absolute top-8 right-8 z-10 bg-emerald-500/90 text-gray-900 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                Matching Mode
              </div>

              <div className="relative w-full aspect-video rounded-[28px] overflow-hidden">
                  <img
                    src="/background/matchingGame.jpg" 
                    alt="Matching Game Interface"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                  />
              </div>

              <div className="relative mt-6 space-y-3 text-sm text-gray-200/85 flex-grow">
                <p className="font-semibold tracking-[0.3em] uppercase text-emerald-400/90">Luật chơi nhanh</p>
                <p>Ghi nhớ vị trí, tìm và nối các cặp thẻ có nội dung liên quan trong thời gian ngắn nhất.</p>
                <p className="text-xs opacity-70">Thử thách trí nhớ và tư duy liên kết.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;