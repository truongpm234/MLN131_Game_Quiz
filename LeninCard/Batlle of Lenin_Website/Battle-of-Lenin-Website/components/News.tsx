import React, { useState } from 'react';

const NewsCard: React.FC<{ title: string; tag: string; tagColor: string; link: string }> = ({
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
    </div>
    <h4 className="relative mt-6 text-xl font-semibold text-white transition-colors duration-300 group-hover:text-brand-gold">{title}</h4>
    
  </a>
);

const News: React.FC = () => {
    return (
        <section id="news" className="relative overflow-hidden bg-[#070912] py-24 text-gray-100">
      <div className="pointer-events-none absolute inset-0">
        <span className="absolute left-8 top-16 h-56 w-56 rounded-full bg-brand-gold/15 blur-3xl opacity-70"></span>
        <span className="absolute right-12 bottom-24 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl opacity-70"></span>
      </div>

      <div className="container relative mx-auto px-6">
        <div className="text-center">
          
          <h2 className="mt-6 text-4xl md:text-5xl font-extrabold text-white">
            Vấn đề dân tộc và tôn giáo trong thời kỳ quá độ lên chủ nghĩa xã hội  
          </h2>
          
        </div>

        <div className="relative mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <NewsCard link="#"  title="Khái niệm & Đặc trưng cơ bản về Dân tộc 
 
" tag="📢 Phần I:" tagColor="bg-white text-gray-900" />
          <NewsCard link="#"  title="Chủ nghĩa Mác - Lênin về Dân tộc " tag="🆕 Phần II:" tagColor="bg-brand-gold text-gray-900" />
          <NewsCard link="#"  title="Dân tộc và quan hệ dân tộc ở Việt Nam

" tag="🎁 Phần III:" tagColor="bg-emerald-400 text-gray-900" />
        </div>

        {/* Phần I */}
        <div className="relative mx-auto mt-16 max-w-4xl overflow-hidden rounded-[32px] border border-white/10 bg-white/10 p-10 backdrop-blur-xl shadow-[0_25px_60px_-25px_rgba(0,0,0,0.65)]">
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-gold/20 via-transparent to-brand-gold/1 opacity-80"></span>
          <div className="relative space-y-6">
            <h3 className="text-2xl md:text-3xl font-semibold text-white text-center">Phần I: Khái niệm & Đặc trưng cơ bản về Dân tộc</h3>
            
            <div className="space-y-4 text-left">
              <div>
                <h4 className="text-lg font-semibold text-brand-gold mb-2">I-1. Khái niệm</h4>
                <p className="text-sm text-gray-300 mb-2">Dân tộc (nation/ethnic group) được hiểu theo 2 nghĩa:</p>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-300 ml-4">
                  <li>Cộng đồng dân cư ổn định, có lãnh thổ, kinh tế thống nhất, ngôn ngữ chung, văn hóa – tâm lý chung và nhà nước riêng → khái niệm về quốc gia dân tộc.</li>
                  <li>Cộng đồng người có chung nguồn gốc, ngôn ngữ, phong tục, văn hóa, ý thức tự nhận mình thuộc về cộng đồng đó → khái niệm về tộc người/nhóm sắc tộc.</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-brand-gold mb-2">I-2. Đặc trưng cơ bản</h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-300 ml-4">
                  <li><strong>Cộng đồng về lãnh thổ</strong> (đối với dân tộc – quốc gia).</li>
                  <li><strong>Cộng đồng về kinh tế:</strong> có sự liên kết bền vững trong hoạt động sản xuất, sinh hoạt vật chất.</li>
                  <li><strong>Cộng đồng về ngôn ngữ:</strong> là công cụ giao tiếp chung trong cộng đồng.</li>
                  <li><strong>Cộng đồng về văn hóa, tâm lý và ý thức dân tộc:</strong> hình thành bản sắc riêng, đoàn kết nội bộ và phân biệt với cộng đồng khác.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Phần II */}
        <div className="relative mx-auto mt-16 max-w-4xl overflow-hidden rounded-[32px] border border-white/10 bg-white/10 p-10 backdrop-blur-xl shadow-[0_25px_60px_-25px_rgba(0,0,0,0.65)]">
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-gold/20 via-transparent to-brand-gold/1 opacity-80"></span>
          <div className="relative space-y-6">
            <h3 className="text-2xl md:text-3xl font-semibold text-white text-center">Phần II: Chủ nghĩa Mác – Lênin về Dân tộc</h3>
            
            <div className="space-y-4 text-left">
              <div>
                <h4 className="text-lg font-semibold text-brand-gold mb-2">Nội dung chính</h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-300 ml-4">
                  <li>Dân tộc là sản phẩm của lịch sử, hình thành cùng sự phát triển của phương thức sản xuất.</li>
                  <li>Trong chủ nghĩa xã hội, vấn đề dân tộc phải được giải quyết trên nguyên tắc:
                    <ul className="list-circle list-inside ml-6 mt-2 space-y-1">
                      <li>Bình đẳng giữa các dân tộc</li>
                      <li>Đoàn kết giữa các dân tộc</li>
                      <li>Tôn trọng quyền tự quyết chính đáng của các dân tộc</li>
                    </ul>
                  </li>
                  <li>Khi xóa bỏ áp bức giai cấp, sẽ tạo điều kiện căn bản để xóa bỏ áp bức dân tộc, nhưng không đồng nghĩa rằng khác biệt văn hóa bị xóa bỏ — mà phải bảo tồn bản sắc dân tộc trong sự thống nhất quốc gia.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Phần III */}
        <div className="relative mx-auto mt-16 max-w-4xl overflow-hidden rounded-[32px] border border-white/10 bg-white/10 p-10 backdrop-blur-xl shadow-[0_25px_60px_-25px_rgba(0,0,0,0.65)]">
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-gold/20 via-transparent to-brand-gold/1 opacity-80"></span>
          <div className="relative space-y-6">
            <h3 className="text-2xl md:text-3xl font-semibold text-white text-center">Phần III: Dân tộc và quan hệ dân tộc ở Việt Nam</h3>
            
            <div className="space-y-4 text-left">
              <div>
                <h4 className="text-lg font-semibold text-brand-gold mb-2">III-1. Đặc điểm dân tộc ở Việt Nam</h4>
                <p className="text-sm text-gray-300 mb-2">Việt Nam là quốc gia đa dân tộc, trong đó:</p>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-300 ml-4">
                  <li>Dân tộc Kinh chiếm đa số, các dân tộc thiểu số chiếm tỷ lệ nhỏ hơn</li>
                  <li>Các dân tộc có bản sắc văn hóa, ngôn ngữ, phong tục khác nhau</li>
                  <li>Cư trú phân tán và xen kẽ giữa các dân tộc, chủ yếu ở miền núi, cao nguyên, vùng biên giới, vùng sâu – vùng xa</li>
                  <li>Trình độ phát triển không đồng đều giữa các dân tộc do điều kiện lịch sử và địa lý</li>
                </ul>
                <p className="text-sm text-gray-300 mt-2">Quan hệ dân tộc mang đặc trưng: Đoàn kết – gắn bó – tương trợ, ý thức dân tộc luôn gắn với ý thức cộng đồng quốc gia.</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-brand-gold mb-2">III-2. Quan điểm của Đảng, Nhà nước</h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-300 ml-4">
                  <li>Kiên định nguyên tắc bình đẳng, đoàn kết, tôn trọng, giúp nhau cùng phát triển</li>
                  <li>Xây dựng khối đại đoàn kết toàn dân tộc là chiến lược lâu dài</li>
                  <li>Phát triển đi đôi với giữ gìn bản sắc văn hóa dân tộc, không đồng hóa, không chia rẽ</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-brand-gold mb-2">III-3. Chính sách</h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-300 ml-4">
                  <li>Ưu tiên phát triển kinh tế, giáo dục, y tế, hạ tầng ở vùng dân tộc thiểu số</li>
                  <li>Hỗ trợ bảo tồn ngôn ngữ, văn hóa, phong tục, tín ngưỡng</li>
                  <li>Củng cố an ninh chính trị vùng dân tộc, đặc biệt khu vực biên giới</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    );
};

export default News;