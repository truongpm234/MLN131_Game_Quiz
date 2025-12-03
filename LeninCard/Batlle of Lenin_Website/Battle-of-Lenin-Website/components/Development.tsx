import React from 'react';
import IdeaIcon from './icons/IdeaIcon';
import DesignIcon from './icons/DesignIcon';
import TestIcon from './icons/TestIcon';
import BetaIcon from './icons/BetaIcon';
import LaunchIcon from './icons/LaunchIcon';

interface TimelineItemProps {
  date: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  isLast?: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ date, title, description, icon, isLast = false }) => (
  <div className="group relative py-10 pl-10 sm:pl-36">
    {!isLast && (
      <span className="absolute left-5 sm:left-[118px] top-16 h-[calc(100%-2.5rem)] w-px bg-gradient-to-b from-brand-gold/50 via-white/15 to-transparent"></span>
    )}
    <div className="absolute left-0 sm:left-14 top-14">
      <span className="text-xs uppercase tracking-[0.35em] text-brand-gold/70">Mốc</span>
      <p className="mt-2 text-sm font-semibold text-white/90">{date}</p>
    </div>
    <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
      <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-brand-gold/40 bg-white/10 backdrop-blur-xl shadow-[0_15px_35px_-20px_rgba(0,0,0,0.7)] transition-all duration-500 group-hover:scale-110 group-hover:border-brand-gold/80">
        <span className="absolute inset-0 bg-gradient-to-br from-brand-gold/15 via-transparent to-brand-gold/5 opacity-70"></span>
        <span className="relative text-2xl text-brand-gold">{icon}</span>
      </div>
      <div className="relative flex-1 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl text-left shadow-[0_20px_55px_-25px_rgba(0,0,0,0.65)] transition-all duration-500 group-hover:-translate-y-2 group-hover:border-brand-gold/35">
        <h4 className="text-2xl font-semibold text-white">{title}</h4>
        <p className="mt-3 text-sm leading-relaxed text-gray-200/80">{description}</p>
      </div>
    </div>
  </div>
);

const Development: React.FC = () => {
  return (
    <section id="development" className="relative overflow-hidden bg-[#05070d] py-24 text-gray-100">
      <div className="pointer-events-none absolute inset-0">
        <span className="absolute left-[15%] top-12 h-64 w-64 rounded-full bg-brand-gold/15 blur-3xl opacity-60"></span>
        <span className="absolute right-[10%] bottom-20 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl opacity-70"></span>
      </div>

      <div className="container relative mx-auto px-6">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.5em] text-brand-gold/70">Lộ trình chiến lược</span>
          <h2 className="mt-6 text-4xl md:text-5xl font-extrabold text-white">
            Lộ trình <span className="text-brand-gold">Phát triển</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-300">
            Từ ý tưởng đến ngày ra mắt chính thức, mỗi mốc thời gian là một chương triết luận về sáng tạo và kỷ luật.
          </p>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-[3.2rem] top-0 hidden h-full w-px bg-gradient-to-b from-brand-gold/60 via-white/10 to-transparent sm:block"></div>
          <TimelineItem date="03/12/2025" title="Ý tưởng" description="Hình thành khái niệm “Lenin Card”, xác định triết lý cốt lõi và cấu trúc chiến lược cho trò chơi." icon={<IdeaIcon />} />
          <TimelineItem date="05/12/2025" title="Thiết kế" description="Xây dựng luật chơi, kiến trúc trải nghiệm người dùng và hệ thống nhân vật mang đậm bản sắc triết học." icon={<DesignIcon />} />
          <TimelineItem date="07/12/2025" title="Thử nghiệm nội bộ" description="Chơi thử trong nhóm nhỏ, thu thập dữ liệu phản hồi, điều chỉnh nhịp độ câu hỏi và trải nghiệm vận hành." icon={<TestIcon />} />
          <TimelineItem date="10/12/2025" title="Bản Beta" description="Mở đăng ký sớm cho cộng đồng, mời thử nghiệm và hoàn thiện hệ thống phản hồi trực tiếp." icon={<BetaIcon />} />
          <TimelineItem date="13/12/2025" title="Ra mắt chính thức" description="Phát hành bản hoàn chỉnh trên nền tảng web, giới thiệu chiến dịch lan tỏa cộng đồng tri thức." icon={<LaunchIcon />} isLast={true} />
        </div>

      </div>
    </section>
  );
};

export default Development;
