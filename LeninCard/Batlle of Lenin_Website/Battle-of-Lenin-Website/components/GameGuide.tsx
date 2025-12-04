import React, { useState } from 'react';

// --- DATA ---
const quizSteps = [
  { title: '1. Chọn thẻ', desc: 'Chọn 1 tấm thẻ bất kỳ trên bàn.' },
  { title: '2. Hiện nội dung', desc: 'Sau 3s, câu hỏi/thử thách sẽ hiện ra.' },
  { title: '3. Trả lời', desc: '20s để trả lời và ghi điểm tối đa.' },
  { title: '4. Kết thúc', desc: 'Hệ thống tổng kết khi mở hết 24 thẻ.' }
];

const matchingSteps = [
  { title: '1. Quan sát', desc: 'Ghi nhớ vị trí các thẻ bài đang mở.' },
  { title: '2. Nối thẻ', desc: 'Chọn 2 thẻ liên quan để ghép cặp.' },
  { title: '3. Hoàn thành', desc: 'Ghép tất cả các thẻ trên màn hình.' },
  { title: '4. Tổng kết', desc: 'Nhấn Kiểm tra để cho ra đáp án cuối cùng' }

];

const playHighlights = {
  quiz: [
    'Mỗi thẻ tối đa 100 điểm.',
    'Tốc độ càng nhanh = Điểm càng cao.',
    'Trả lời sai = 0 điểm thẻ đó.'
  ],
  matching: [
    'Tìm đúng cặp: +100 điểm.',
    'Tìm sai: Trừ thời gian/điểm.',
    'Hoàn thành sớm: Thưởng lớn.'
  ]
};

// --- SUB-COMPONENTS ---
const StepCard: React.FC<{ step: { title: string; desc: string }, color: string, index: number }> = ({ step, color, index }) => (
  <div className="relative group p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
    <div className={`absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm bg-gray-900 border-2 ${color === 'gold' ? 'border-brand-gold text-brand-gold' : 'border-emerald-400 text-emerald-400'}`}>
      {index + 1}
    </div>
    <h4 className={`text-lg font-bold mb-2 ${color === 'gold' ? 'text-brand-gold' : 'text-emerald-400'}`}>
      {step.title.split('. ')[1] || step.title}
    </h4>
    <p className="text-sm text-gray-300 leading-relaxed">{step.desc}</p>
  </div>
);

// --- MAIN COMPONENT ---
const GameGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'quiz' | 'matching'>('quiz');

  // Màu chủ đạo theo tab
  const accentColor = activeTab === 'quiz' ? 'text-brand-gold' : 'text-emerald-400';
  const bgAccent = activeTab === 'quiz' ? 'bg-brand-gold' : 'bg-emerald-500';
  const shadowAccent = activeTab === 'quiz' ? 'shadow-brand-gold/20' : 'shadow-emerald-500/20';

  return (
    <section className="relative w-full py-16 px-4 md:px-8 max-w-6xl mx-auto">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
         <div className={`absolute top-20 left-1/4 w-96 h-96 rounded-full blur-[100px] opacity-20 transition-colors duration-700 ${bgAccent}`}></div>
      </div>

      {/* HEADER */}
      <div className="relative z-10 text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
          Hướng Dẫn <span className={`transition-colors duration-500 ${accentColor}`}>Luật Chơi</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Nắm vững quy tắc để chinh phục bảng xếp hạng MLN131.
        </p>
      </div>

      {/* TOGGLE SWITCH (CẢI TIẾN) */}
      <div className="relative z-10 flex justify-center mb-16">
        <div className="p-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/10 inline-flex relative shadow-xl">
          {/* Active Background Pill */}
          <div 
            className={`absolute top-1.5 bottom-1.5 rounded-full transition-all duration-500 ease-out shadow-lg ${bgAccent} ${activeTab === 'quiz' ? 'left-1.5 w-[140px]' : 'left-[146px] w-[150px]'}`}
          ></div>
          
          {/* Buttons */}
          <button
            onClick={() => setActiveTab('quiz')}
            className={`relative w-[140px] py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-colors duration-300 z-10 ${activeTab === 'quiz' ? 'text-gray-900' : 'text-gray-400 hover:text-white'}`}
          >
            Quiz Game
          </button>
          <button
            onClick={() => setActiveTab('matching')}
            className={`relative w-[150px] py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-colors duration-300 z-10 ${activeTab === 'matching' ? 'text-gray-900' : 'text-gray-400 hover:text-white'}`}
          >
            Matching Game
          </button>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="relative z-10 animate-fade-in-up">
        <div className={`rounded-3xl border border-white/10 bg-[#121218]/80 backdrop-blur-xl p-8 md:p-12 shadow-2xl transition-all duration-500 ${shadowAccent}`}>
            
            {/* Intro */}
            <div className="text-center mb-10">
                <span className={`inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-white/10 mb-4 ${accentColor}`}>
                    {activeTab === 'quiz' ? 'Kiến thức & Phản xạ' : 'Trí nhớ & Tư duy'}
                </span>
                <p className="text-lg text-gray-200">
                    {activeTab === 'quiz' 
                        ? 'Lật thẻ, trả lời nhanh câu hỏi để tích lũy điểm số tối đa.' 
                        : 'Tìm và nối các cặp thẻ tương ứng trong thời gian ngắn nhất.'}
                </p>
            </div>

            {/* Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {(activeTab === 'quiz' ? quizSteps : matchingSteps).map((step, idx) => (
                    <StepCard 
                        key={idx} 
                        step={step} 
                        index={idx} 
                        color={activeTab === 'quiz' ? 'gold' : 'green'} 
                    />
                ))}
            </div>

            {/* Highlights / Rules */}
            <div className="border-t border-white/10 pt-8">
                <h4 className="text-center text-sm font-bold uppercase text-gray-400 tracking-widest mb-6">Lưu ý quan trọng</h4>
                <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                    {playHighlights[activeTab].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-sm md:text-base text-gray-300 bg-white/5 px-5 py-2 rounded-lg border border-white/5">
                            <span className={`w-2 h-2 rounded-full ${bgAccent}`}></span>
                            {item}
                        </div>
                    ))}
                </div>
            </div>

        </div>
      </div>
    </section>
  );
};

export default GameGuide;