import React from 'react';
import CheckIcon from './icons/CheckIcon';

const ValueCard: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-xl shadow-[0_25px_60px_-20px_rgba(0,0,0,0.6)] transition-all duration-500 hover:-translate-y-2 hover:border-brand-gold/40 hover:shadow-brand-gold/30">
    <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-60 bg-gradient-to-br from-brand-gold/20 via-transparent to-brand-gold/10" />
    <div className="relative flex items-start gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gold/90 text-gray-900 shadow-lg shadow-brand-gold/40">
        <CheckIcon />
      </div>
      <div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-gray-200/80">{description}</p>
      </div>
    </div>
  </div>
);

const About: React.FC = () => {
  return (
    <section id="about" className="relative overflow-hidden py-24 bg-gradient-to-br from-[#0c101b] via-[#080b12] to-[#020205] text-gray-200">
      <div className="pointer-events-none absolute inset-0">
        <span className="absolute left-10 top-24 h-52 w-52 rounded-full bg-brand-gold/20 blur-3xl opacity-70"></span>
        <span className="absolute right-16 bottom-12 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl opacity-60"></span>
      </div>

      <div className="container relative mx-auto px-6">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.5em] text-brand-gold/70">Guidebook</span>
          <h2 className="mt-6 text-4xl font-extrabold text-white md:text-5xl">
            Hướng Dẫn Chơi <span className="text-brand-gold">Lenin Card</span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base text-gray-300 md:text-lg">
            Nắm rõ mục tiêu, cách chơi và chế độ thi đấu để tận hưởng hành trình ôn luyện FA25 đầy cảm hứng.
          </p>
        </div>

        <div className="relative mt-16 grid items-center gap-14 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-10">
            <article className="rounded-[32px] border border-white/10 bg-white/5 p-10 backdrop-blur-xl shadow-[0_30px_80px_-25px_rgba(0,0,0,0.7)]">
              <h3 className="text-2xl font-semibold text-brand-gold">Câu chuyện hình thành</h3>
              <p className="mt-4 text-base leading-relaxed text-gray-200/85">
                <strong>Lenin Card</strong> ra đời từ mong muốn tạo nên một sân chơi nơi chiến lược, tư duy phản biện và tinh
                thần đồng đội được bồi đắp qua từng ván đấu.
              </p>
              <p className="mt-4 text-base leading-relaxed text-gray-200/85">
                Mỗi câu hỏi là một cánh cửa mở ra chiều sâu tri thức, giúp người chơi khám phá bản thân và kết nối cộng đồng
                yêu chủ nghĩa Mác-Lênin bằng trải nghiệm tranh biện sống động.
              </p>
            </article>

            <div className="grid gap-6 md:grid-cols-2">
              <article className="rounded-[28px] border border-white/10 bg-white/[0.08] p-8 backdrop-blur-xl shadow-[0_20px_50px_-25px_rgba(0,0,0,0.65)]">
                <h3 className="text-xl font-semibold text-brand-gold">Tầm nhìn</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-200/80">
                  Nuôi dưỡng cộng đồng học tập tương tác, đưa Lenin Card trở thành biểu tượng của trò chơi chiến lược trí
                  tuệ tại Việt Nam.
                </p>
              </article>

              <article className="rounded-[28px] border border-white/10 bg-white/[0.06] p-8 backdrop-blur-xl shadow-[0_20px_50px_-25px_rgba(0,0,0,0.65)]">
                <h3 className="text-xl font-semibold text-brand-gold">Sứ mệnh</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-200/80">
                  Truyền cảm hứng nghiên cứu và tranh biện thông qua trải nghiệm game nhập vai độc đáo, thắp lửa đam mê học hỏi
                  của thế hệ trẻ.
                </p>
              </article>
            </div>
          </div>

          <div className="relative">
            <div className="group relative overflow-hidden rounded-[36px] border border-white/15 bg-gradient-to-br from-white/10 via-white/5 to-white/[0.03] p-6 backdrop-blur-2xl shadow-[0_40px_100px_-40px_rgba(0,0,0,0.7)]">
              <span className="absolute inset-0 bg-gradient-to-br from-brand-gold/15 via-transparent to-brand-gold/5 opacity-60 transition-opacity duration-500 group-hover:opacity-80"></span>
              <img
                src="/background/LeninBattle.jpg"
                alt="Lenin Card Game Board"
                className="relative w-full rounded-[28px] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="relative mt-6 space-y-3 text-sm text-gray-200/85">
                <p className="font-semibold tracking-[0.3em] uppercase text-brand-gold/80">Hướng dẫn nhanh</p>
                <p>
                  “Lật thẻ, chờ 3 giây để thử thách lộ diện, sau đó phản xạ thật nhanh để ghi trọn 100 điểm.”
                </p>
                <p>
                  Trận đấu kết thúc khi 24 thẻ được mở – khoảnh khắc hệ thống công bố Top 1, Top 2, Top 3 đầy kịch tính.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
