import React, { useState } from 'react';

const NewsCard: React.FC<{ date: string; title: string; tag: string; tagColor: string; link: string }> = ({
  date,
  title,
  tag,
  tagColor,
  link,
}) => (
  <a
    href={link}
    className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/10 p-8 backdrop-blur-xl shadow-[0_25px_60px_-25px_rgba(0,0,0,0.65)] transition-all duration-500 hover:-translate-y-2 hover:border-brand-gold/40 hover:shadow-brand-gold/25"
  >
    <span className="absolute inset-0 bg-gradient-to-br from-brand-gold/15 via-transparent to-brand-gold/5 opacity-0 transition-opacity duration-500 group-hover:opacity-70"></span>
    <div className="relative flex items-start justify-between">
      <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs font-semibold tracking-[0.3em] uppercase text-gray-900 ${tagColor}`}>
        {tag}
      </span>
      <p className="text-sm font-medium text-gray-200/80 whitespace-nowrap">{date}</p>
    </div>
    <h4 className="relative mt-6 text-xl font-semibold text-white transition-colors duration-300 group-hover:text-brand-gold">{title}</h4>
    <p className="relative mt-4 text-sm text-gray-300">Đọc thêm &rarr;</p>
  </a>
);

const News: React.FC = () => {
    const [email, setEmail] = useState('');

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if(email) {
            alert(`Cảm ơn bạn đã đăng ký nhận tin với email: ${email}`);
            setEmail('');
        }
    };

    return (
        <section id="news" className="relative overflow-hidden bg-[#070912] py-24 text-gray-100">
      <div className="pointer-events-none absolute inset-0">
        <span className="absolute left-8 top-16 h-56 w-56 rounded-full bg-brand-gold/15 blur-3xl opacity-70"></span>
        <span className="absolute right-12 bottom-24 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl opacity-70"></span>
      </div>

      <div className="container relative mx-auto px-6">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.5em] text-brand-gold/70">Thông điệp</span>
          <h2 className="mt-6 text-4xl md:text-5xl font-extrabold text-white">
            Tin tức &amp; <span className="text-brand-gold">Cập nhật</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-300">
            Những chuyển động mới nhất trong hành trình đưa Battle Of LeNin lan tỏa đến cộng đồng tri thức.
          </p>
        </div>

        <div className="relative mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <NewsCard link="#" date="01/10/2025" title="Chính thức mở đăng ký Beta Test, tham gia ngay để trải nghiệm sớm Battle Of LeNin!" tag="📢 Thông báo" tagColor="bg-white text-gray-900" />
          <NewsCard link="#" date="15/11/2025" title="Cập nhật giao diện mới: thêm hệ thống nhân vật đại diện cực ngầu." tag="🆕 Cập nhật" tagColor="bg-brand-gold text-gray-900" />
          <NewsCard link="#" date="01/12/2025" title="Mini game cộng đồng: Cơ hội nhận code trải nghiệm miễn phí!" tag="🎁 Sự kiện" tagColor="bg-emerald-400 text-gray-900" />
        </div>

        <div className="relative mx-auto mt-16 max-w-3xl overflow-hidden rounded-[32px] border border-white/10 bg-white/10 p-10 text-center backdrop-blur-xl shadow-[0_25px_60px_-25px_rgba(0,0,0,0.65)]">
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-gold/20 via-transparent to-brand-gold/1 opacity-80"></span>
          <div className="relative space-y-6">
            <h3 className="text-3xl font-semibold text-white">Đăng ký nhận bản tin</h3>
            <p className="text-base text-gray-300">
              Đừng bỏ lỡ bất kỳ thông báo quan trọng nào! Nhận tin tức mới nhất trực tiếp vào hộp thư của bạn.
            </p>
            <form onSubmit={handleSubscribe} className="relative flex flex-col items-center gap-4 md:flex-row md:justify-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email của bạn"
                className="w-full rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm text-white placeholder-gray-300 focus:border-brand-gold/50 focus:outline-none focus:ring-2 focus:ring-brand-gold/40"
                required
              />
              <button
                type="submit"
                className="w-full rounded-full bg-brand-gold px-8 py-3 text-sm font-semibold text-gray-900 transition-all duration-300 hover:bg-amber-400 md:w-auto"
              >
                Đăng ký ngay
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
    );
};

export default News;