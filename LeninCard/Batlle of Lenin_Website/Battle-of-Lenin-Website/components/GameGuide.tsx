import React from 'react';

// Reusable wrapper for each guide section
const RuleCategory: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-16">
    <h3 className="mx-auto max-w-3xl text-center text-2xl font-semibold uppercase tracking-[0.3em] text-white md:text-3xl">
      {title}
    </h3>
    <div className="mt-10 space-y-6">{children}</div>
  </div>
);

// Shared card component for consistent styling
const RuleCard: React.FC<{ title: string; badge?: string; badgeColor?: string; children: React.ReactNode }> = (
  { title, badge, badgeColor, children }
) => (
  <div className="group relative overflow-hidden rounded-[28px] border border-white/15 bg-white/10 p-8 backdrop-blur-xl shadow-[0_25px_60px_-25px_rgba(0,0,0,0.65)] transition-all duration-500 hover:-translate-y-2 hover:border-brand-gold/40 hover:shadow-brand-gold/25">
    <span className="absolute inset-0 bg-gradient-to-br from-brand-gold/15 via-transparent to-brand-gold/5 opacity-0 transition-opacity duration-500 group-hover:opacity-70"></span>
    <div className="relative mb-5 flex items-start justify-between">
      <h4 className="text-xl font-semibold text-white">{title}</h4>
      {badge && (
        <span
          className={`rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-gray-900 ${badgeColor}`}
        >
          {badge}
        </span>
      )}
    </div>
    <div className="relative space-y-3 text-sm leading-relaxed text-gray-200/85">{children}</div>
  </div>
);

const playSteps = [
  {
    title: '🔹 1. Chọn thẻ',
    description: 'Hệ thống random một người chơi để chọn 1 tấm thẻ bất kỳ trên bàn.'
  },
  {
    title: '🔹 2. Hiện nội dung thẻ',
    description: 'Sau 3 giây kể từ lúc mở, thử thách hoặc câu hỏi của thẻ sẽ được hiển thị.'
  },
  {
    title: '🔹 3. Trả lời câu hỏi',
    description: 'Người chơi có 20 giây để trả lời và ghi điểm tối đa cho thẻ đó.'
  },
  {
    title: '🔹 4. Kết thúc trò chơi',
    description: 'Khi cả 24 thẻ trên bàn đã được mở, hệ thống tổng hợp điểm và công bố Top 1 – Top 3.'
  }
];

const playHighlights = [
  'Mỗi thẻ có giá trị tối đa 100 điểm.',
  'Điểm phụ thuộc vào tốc độ trả lời (càng nhanh → điểm càng cao).',
  'Nếu trả lời sai, người chơi nhận 0 điểm cho thẻ đó.'
];

const playModes = [
  {
    title: 'Chế độ chơi đơn',
    description: 'Thi đấu một mình để ôn luyện kiến thức, rèn phản xạ trước kỳ FA25.'
  },
  {
    title: 'Thi đấu cùng bạn bè',
    description: 'Rủ đội nhóm tham gia để cùng tranh hạng và cổ vũ tinh thần cho nhau.'
  }
];

const GameGuide: React.FC = () => {
  return (
    <section id="guide" className="relative overflow-hidden bg-[#060810] py-24 text-gray-100">
      <div className="pointer-events-none absolute inset-0">
        <span className="absolute left-12 top-20 h-60 w-60 rounded-full bg-brand-gold/15 blur-3xl opacity-70"></span>
        <span className="absolute right-16 bottom-10 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl opacity-70"></span>
      </div>
      <div className="container relative mx-auto px-6">
        <div className="mb-16 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.5em] text-brand-gold/70">Guidebook</span>
          <h2 className="mt-6 text-4xl font-extrabold uppercase text-white">
            Hướng Dẫn Chơi <span className="text-brand-gold">Battle Of LeNin</span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base text-gray-300">
            Lật thẻ, trả lời nhanh và tích lũy điểm số để sẵn sàng cho hành trình FA25 tràn đầy cảm hứng.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <RuleCategory title="🎯 MỤC TIÊU">
            <RuleCard title="Lật thẻ – Ghi điểm – Tăng tốc" badge="Focus" badgeColor="bg-brand-gold/90">
              <p>Lật các thẻ bài để xem nội dung và trả lời câu hỏi tương ứng của từng thẻ.</p>
              <p>Trải nghiệm giúp bạn ôn lại kiến thức, củng cố tinh thần và chuẩn bị cho kỳ FA25 thật tốt đẹp.</p>
            </RuleCard>
          </RuleCategory>

          <RuleCategory title="🎮 CÁCH CHƠI">
            <RuleCard title="Quy trình 4 bước" badge="Flow" badgeColor="bg-emerald-400/90">
              <div className="space-y-5">
                {playSteps.map((step) => (
                  <div key={step.title}>
                    <p className="text-base font-semibold text-brand-gold">{step.title}</p>
                    <p className="mt-1 text-sm text-gray-200/80">{step.description}</p>
                  </div>
                ))}
              </div>
              <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-gray-200/85">
                {playHighlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </RuleCard>
          </RuleCategory>

          <RuleCategory title="🧩 CHẾ ĐỘ CHƠI">
            <div className="grid gap-6 md:grid-cols-2">
              {playModes.map((mode) => (
                <RuleCard key={mode.title} title={mode.title}>
                  <p>{mode.description}</p>
                </RuleCard>
              ))}
            </div>
          </RuleCategory>
        </div>
      </div>
    </section>
  );
};

export default GameGuide;
