import React, { useState } from 'react';
import FacebookIcon from './icons/FacebookIcon';
import DiscordIcon from './icons/DiscordIcon';
import { GoogleGenAI } from '@google/genai';


const Contact: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [error, setError] = useState('');


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!name || !email) return;

        setLoading(true);
        setResponseMessage('');
        setError('');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            const prompt = `Một người dùng tên là "${name}" với email "${email}" vừa đăng ký trải nghiệm sớm trò chơi "Lenin Card" của chúng tôi. Hãy soạn một email xác nhận thân thiện và chuyên nghiệp gửi cho họ. Cảm ơn họ đã quan tâm, xác nhận rằng họ đã được ghi danh vào danh sách chờ bản Beta, và cho họ biết rằng chúng tôi sẽ sớm liên hệ lại với thông tin chi tiết. Phản hồi phải hoàn toàn bằng tiếng Việt. Bắt đầu bằng lời chào đến ${name}.`;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });

            setResponseMessage(response.text);
            setName('');
            setEmail('');
        } catch (err) {
            console.error("Error calling Gemini API:", err);
            setError('Rất tiếc, đã có lỗi xảy ra trong quá trình đăng ký. Vui lòng thử lại sau.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="relative overflow-hidden bg-[#05060d] py-24 text-gray-100">
      <div className="pointer-events-none absolute inset-0">
        <span className="absolute left-4 top-20 h-60 w-60 rounded-full bg-brand-gold/15 blur-3xl opacity-70"></span>
        <span className="absolute right-10 bottom-0 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl opacity-70"></span>
      </div>

      <div className="container relative mx-auto px-6">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.5em] text-brand-gold/70">Kết nối</span>
          <h2 className="mt-6 text-4xl md:text-5xl font-extrabold text-white">
            Đăng ký &amp; <span className="text-brand-gold">Liên hệ</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-300">
            Gửi đăng ký trải nghiệm sớm hoặc liên lạc trực tiếp với đội ngũ phát triển để cùng lan tỏa giá trị triết học của Lenin Card.
          </p>
        </div>

        <div className="relative mx-auto mt-16 max-w-5xl overflow-hidden rounded-[32px] border border-white/10 bg-white/10 p-10 backdrop-blur-xl shadow-[0_30px_80px_-35px_rgba(0,0,0,0.75)]">
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-gold/20 via-transparent to-brand-gold/10 opacity-80"></span>
          <div className="relative grid gap-12 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h3 className="text-2xl font-semibold text-white">Đăng ký trải nghiệm sớm</h3>
                <span className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-gold/70">
                  Phiên bản beta
                </span>
              </div>
              <p className="mt-4 text-sm text-gray-300/90">
                Điền thông tin để đứng trong hàng ngũ tiên phong khám phá những phiên bản mới nhất của Lenin Card.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold/70">
                    Tên của bạn
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder-gray-400 focus:border-brand-gold/60 focus:outline-none focus:ring-2 focus:ring-brand-gold/40"
                    required
                    disabled={loading}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold/70">
                    Email liên hệ
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder-gray-400 focus:border-brand-gold/60 focus:outline-none focus:ring-2 focus:ring-brand-gold/40"
                    required
                    disabled={loading}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-brand-gold py-3 text-sm font-semibold text-gray-900 transition-all duration-300 hover:bg-amber-400 disabled:cursor-not-allowed disabled:bg-gray-400/80"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <svg className="h-5 w-5 animate-spin text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Đang xử lý...</span>
                    </div>
                  ) : (
                    'Đăng ký ngay'
                  )}
                </button>
              </form>

              {responseMessage && (
                <div className="mt-6 rounded-2xl border border-emerald-400/40 bg-emerald-400/10 p-5 text-sm text-emerald-200 backdrop-blur-xl">
                  <h4 className="font-semibold uppercase tracking-[0.3em] text-emerald-200">Đăng ký thành công!</h4>
                  <p className="whitespace-pre-wrap mt-3">{responseMessage}</p>
                </div>
              )}
              {error && (
                <div className="mt-6 rounded-2xl border border-red-500/40 bg-red-500/10 p-5 text-sm text-red-200 backdrop-blur-xl">
                  <h4 className="font-semibold uppercase tracking-[0.3em] text-red-200">Lỗi!</h4>
                  <p className="mt-3">{error}</p>
                </div>
              )}
            </div>

            <div className="space-y-10">
              <div className="rounded-[28px] border border-white/10 bg-white/8 p-8 backdrop-blur-xl shadow-[0_25px_60px_-25px_rgba(0,0,0,0.6)]">
                <h3 className="text-xl font-semibold text-white">Thông tin liên hệ</h3>
                <p className="mt-2 text-sm text-gray-300/85">
                  Chúng tôi luôn sẵn sàng lắng nghe các đề xuất, hợp tác và phản hồi từ cộng đồng.
                </p>
                <div className="mt-6 space-y-4 text-sm text-gray-200">
                  <p>
                    <strong className="text-brand-gold/80">📧 Email:</strong>
                    <a href="mailto:Chuongnn12.work@gmail.com" className="ml-2 text-brand-gold hover:underline">
                      Chuongnn12.work@gmail.com
                    </a>
                  </p>
                  <a href="https://www.facebook.com/meiinamm/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-200 hover:text-brand-gold transition-colors">
                    <FacebookIcon className="h-5 w-5 text-brand-gold" />
                    <span>Facebook Lenin Card</span>
                  </a>
                  <a href="https://discord.gg/gtg2XhRu" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-200 hover:text-brand-gold transition-colors">
                    <DiscordIcon className="h-5 w-5 text-brand-gold" />
                    <span>Cộng đồng Discord</span>
                  </a>
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-[0_25px_60px_-25px_rgba(0,0,0,0.6)]">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-gold/70">Nhắn gửi</p>
                <p className="mt-4 text-sm italic text-gray-300">
                  “Mọi cuộc cách mạng tư duy đều bắt đầu bằng một lời mời gọi.” Hãy tham gia để kiến tạo thế hệ người chơi mới – kiên định, hiểu biết và đầy cảm hứng.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    );
};

export default Contact;