import React from 'react';
import LinkIcon from './icons/LinkIcon';

const quizResources = [
    { title: "MLN131 FE Full", url: "https://quizlet.com/vn/1111069962/mln131-fe-flash-cards/" },
];

const ResourceCard: React.FC<{ title: string; url: string }> = ({ title, url }) => (
    <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-start gap-5 overflow-hidden rounded-[28px] border border-white/10 bg-white/10 p-6 backdrop-blur-xl shadow-[0_20px_50px_-25px_rgba(0,0,0,0.6)] transition-all duration-500 hover:-translate-y-2 hover:border-brand-gold/40 hover:shadow-brand-gold/25"
    >
        <span className="absolute inset-0 bg-gradient-to-br from-brand-gold/15 via-transparent to-brand-gold/5 opacity-0 transition-opacity duration-500 group-hover:opacity-70"></span>
        <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gold/90 text-gray-900 shadow-lg shadow-brand-gold/40 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
            <LinkIcon />
        </div>
        <div className="relative">
            <h4 className="text-lg font-semibold text-white transition-colors duration-300 group-hover:text-brand-gold">{title}</h4>
            <p className="mt-2 text-sm text-gray-300 break-all">{url}</p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                Truy cập &rarr;
            </p>
        </div>
    </a>
);

const Resources: React.FC = () => {
    return (
    <section id="resources" className="relative overflow-hidden bg-[#060810] py-24 text-gray-100">
        <div className="pointer-events-none absolute inset-0">
            <span className="absolute left-10 top-16 h-56 w-56 rounded-full bg-brand-gold/15 blur-3xl opacity-70"></span>
            <span className="absolute right-20 bottom-12 h-60 w-60 rounded-full bg-emerald-500/10 blur-3xl opacity-70"></span>
        </div>

        <div className="container relative mx-auto px-6">
            <div className="text-center">
                <span className="text-xs font-semibold uppercase tracking-[0.5em] text-brand-gold/70">Knowledge Vault</span>
                <h2 className="mt-6 text-4xl md:text-5xl font-extrabold text-white">
                    Nguồn Dữ Liệu &amp; <span className="text-brand-gold">Tài Nguyên</span>
                </h2>
                <p className="mx-auto mt-4 max-w-3xl text-base text-gray-300">
                    Kho tư liệu được tuyển chọn để nuôi dưỡng tinh thần triết học và chiến lược của Lenin Card.
                </p>
            </div>

            <div className="relative mx-auto mt-16 max-w-4xl">
                <div>
                    <h3 className="text-center text-2xl font-semibold text-brand-gold uppercase tracking-[0.3em]">Dữ liệu câu hỏi Quiz</h3>
                    <p className="mx-auto mt-6 max-w-3xl text-center text-sm text-gray-300">
                        Tất cả dữ liệu câu hỏi trong game "Lenin Card" được tham khảo từ các bộ đề công khai, được tuyển lọc và phân loại kỹ lưỡng nhằm tạo ra trải nghiệm đa chiều và uyên thâm.
                    </p>
                    <div className="mt-8 grid gap-6">
                        {quizResources.map((link, index) => (
                            <ResourceCard key={`quiz-${index}`} title={link.title} url={link.url} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </section>
    );
};

export default Resources;
