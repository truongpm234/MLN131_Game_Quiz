import { useState, useEffect, useRef } from 'react';

// --- CẤU HÌNH DATA (GIỮ NGUYÊN) ---
const RAW_DATA = [
  // === PHẦN 1: DÂN TỘC ===
  { q: "Dân tộc là gì?", a: "Cộng đồng chính trị - xã hội có chung phương thức sinh hoạt kinh tế, lãnh thổ, nhà nước, ngôn ngữ và nét tâm lý văn hóa." },
  { q: "Đặc trưng quan trọng nhất của dân tộc là gì?", a: "Có chung phương thức sinh hoạt kinh tế." },
  { q: "Tộc người khác dân tộc như thế nào?", a: "Tộc người là cộng đồng có ngôn ngữ, văn hóa chung và ý thức tự giác tộc người, nhưng chưa có nhà nước riêng." },
  { q: "Ba đặc trưng cơ bản của tộc người là gì?", a: "Cộng đồng về ngôn ngữ, cộng đồng về văn hóa, và ý thức tự giác tộc người." },
  { q: "Xu hướng thứ nhất trong sự phát triển quan hệ dân tộc là gì?", a: "Các cộng đồng dân cư muốn tách ra để hình thành cộng đồng dân tộc độc lập." },
  { q: "Xu hướng thứ hai trong sự phát triển quan hệ dân tộc là gì?", a: "Các dân tộc muốn liên hiệp lại với nhau trên cơ sở lợi ích chung." },
  { q: "Cương lĩnh dân tộc của CN Mác-Lênin gồm những nội dung nào?", a: "Các dân tộc hoàn toàn bình đẳng, có quyền tự quyết, liên hiệp công nhân tất cả các dân tộc." },
  { q: "Quyền bình đẳng dân tộc có nghĩa là gì?", a: "Không phân biệt dân tộc lớn hay nhỏ, đều có quyền và nghĩa vụ ngang nhau trên mọi lĩnh vực." },
  { q: "Quyền tự quyết dân tộc là gì?", a: "Quyền của các dân tộc tự quyết định vận mệnh, lựa chọn chế độ chính trị và con đường phát triển." },
  { q: "Việt Nam có bao nhiêu dân tộc?", a: "54 dân tộc." },
  
  // === PHẦN 2: ĐẶC ĐIỂM DÂN TỘC VIỆT NAM ===
  { q: "Dân tộc Kinh chiếm bao nhiêu phần trăm dân số Việt Nam?", a: "85,7% dân số cả nước." },
  { q: "Đặc điểm cư trú của các dân tộc Việt Nam?", a: "Các dân tộc cư trú xen kẽ nhau, không có lãnh thổ tộc người riêng biệt." },
  { q: "Các dân tộc thiểu số VN phân bố ở đâu?", a: "Chủ yếu ở vùng biên giới, hải đảo, vùng sâu vùng xa có vị trí chiến lược quan trọng." },
  { q: "Truyền thống quý báu của các dân tộc VN là gì?", a: "Đoàn kết dân tộc, gắn bó lâu đời trong cộng đồng quốc gia thống nhất." },
  { q: "Nền văn hóa Việt Nam có đặc điểm gì?", a: "Thống nhất trong đa dạng, mỗi dân tộc có bản sắc văn hóa riêng." },
  { q: "Quan điểm của Đảng về vấn đề dân tộc là gì?", a: "Vấn đề dân tộc và đoàn kết dân tộc là vấn đề chiến lược cơ bản, lâu dài." },
  { q: "Chính sách dân tộc về chính trị là gì?", a: "Thực hiện bình đẳng, đoàn kết, tôn trọng, giúp nhau cùng phát triển giữa các dân tộc." },
  { q: "Chính sách dân tộc về kinh tế là gì?", a: "Phát triển kinh tế miền núi, vùng dân tộc thiểu số, khắc phục khoảng cách chênh lệch." },
  { q: "Chính sách dân tộc về văn hóa là gì?", a: "Giữ gìn và phát huy giá trị văn hóa truyền thống, phát triển ngôn ngữ các tộc người." },
  
  // === PHẦN 3: TÔN GIÁO ===
  { q: "Bản chất của tôn giáo là gì?", a: "Một hình thái ý thức xã hội phản ánh hư ảo hiện thực khách quan." },
  { q: "Năm tiêu chí cơ bản của tôn giáo là gì?", a: "Niềm tin siêu nhiên, hệ thống giáo thuyết, cơ sở thờ tự, tổ chức nhân sự, hệ thống tín đồ." },
  { q: "Tín ngưỡng khác tôn giáo như thế nào?", a: "Tín ngưỡng là hệ thống niềm tin đơn giản hơn, chưa có tổ chức và giáo lý hệ thống như tôn giáo." },
  { q: "Mê tín dị đoan là gì?", a: "Niềm tin mê muội vào lực lượng siêu nhiên dẫn đến hành vi cực đoan, trái đạo đức pháp luật." },
  { q: "Nguồn gốc tự nhiên của tôn giáo là gì?", a: "Do lực lượng sản xuất chưa phát triển, con người yếu đuối trước thiên nhiên nên gán sức mạnh thần bí cho tự nhiên." },
  { q: "Nguồn gốc nhận thức của tôn giáo là gì?", a: "Khoảng cách giữa 'biết' và 'chưa biết', sự tuyệt đối hóa mặt chủ thể của nhận thức con người." },
  { q: "Nguồn gốc tâm lý của tôn giáo là gì?", a: "Sự sợ hãi, lo lắng trước hiện tượng tự nhiên, xã hội hoặc mong muốn bình yên." },
  { q: "Tính lịch sử của tôn giáo thể hiện như thế nào?", a: "Tôn giáo có sự hình thành, tồn tại, phát triển và biến đổi theo điều kiện lịch sử." },
  { q: "Tính quần chúng của tôn giáo nghĩa là gì?", a: "Tôn giáo có số lượng tín đồ đông đảo và là nơi sinh hoạt văn hóa tinh thần của quần chúng." },
  { q: "Tính chính trị của tôn giáo xuất hiện khi nào?", a: "Khi xã hội đã phân chia giai cấp và có sự đối kháng về lợi ích giai cấp." },
  
  // === PHẦN 4: NGUYÊN TẮC GIẢI QUYẾT VẤN ĐỀ TÔN GIÁO ===
  { q: "Nguyên tắc thứ nhất giải quyết vấn đề tôn giáo là gì?", a: "Tôn trọng, bảo đảm quyền tự do tín ngưỡng và không tín ngưỡng của nhân dân." },
  { q: "Tự do tín ngưỡng thuộc quyền gì của con người?", a: "Quyền tự do tư tưởng của mỗi người dân." },
  { q: "Muốn khắc phục ảnh hưởng tiêu cực của tôn giáo phải làm gì?", a: "Phải gắn liền với quá trình cải tạo xã hội cũ, xây dựng xã hội mới." },
  { q: "Mặt chính trị trong vấn đề tôn giáo là gì?", a: "Phản ánh mối quan hệ giữa tiến bộ với phản tiến bộ, mâu thuẫn đối kháng về lợi ích giai cấp." },
  { q: "Mặt tư tưởng trong vấn đề tôn giáo là gì?", a: "Sự khác nhau về niềm tin giữa người có và không có tín ngưỡng, mâu thuẫn không đối kháng." },
  { q: "Tại sao cần có quan điểm lịch sử cụ thể khi giải quyết vấn đề tôn giáo?", a: "Vì tôn giáo luôn vận động và biến đổi theo điều kiện lịch sử cụ thể." },
  
  // === PHẦN 5: TÔN GIÁO Ở VIỆT NAM ===
  { q: "Việt Nam có bao nhiêu tôn giáo được công nhận?", a: "13 tôn giáo đã được công nhận tư cách pháp nhân." },
  { q: "Đặc điểm tôn giáo ở Việt Nam là gì?", a: "Đa dạng, đan xen, chung sống hòa bình và không có xung đột tôn giáo." },
  { q: "Tín đồ các tôn giáo VN có đặc điểm gì?", a: "Phần lớn là nhân dân lao động, có lòng yêu nước, tinh thần dân tộc." },
  { q: "Vai trò của chức sắc tôn giáo là gì?", a: "Truyền bá, thực hành giáo lý, quản lý tổ chức, chăm lo đời sống tâm linh tín đồ." },
  { q: "Quan điểm của Đảng về tôn giáo là gì?", a: "Tín ngưỡng, tôn giáo sẽ tồn tại lâu dài cùng dân tộc trong quá trình xây dựng CNXH." },
  { q: "Chính sách của Nhà nước về quyền tự do tín ngưỡng là gì?", a: "Tôn trọng và bảo đảm quyền tự do tín ngưỡng, theo hoặc không theo tôn giáo theo pháp luật." },
  { q: "Nội dung cốt lõi của công tác tôn giáo là gì?", a: "Công tác vận động quần chúng các tôn giáo." },
  { q: "Trách nhiệm của ai trong công tác tôn giáo?", a: "Trách nhiệm của toàn bộ hệ thống chính trị các cấp." },
  { q: "Nhà nước nghiêm cấm điều gì về tôn giáo?", a: "Lợi dụng tôn giáo để hoạt động mê tín dị đoan, trái pháp luật, chia rẽ nhân dân." },
  
  // === PHẦN 6: QUAN HỆ DÂN TỘC VÀ TÔN GIÁO ===
  { q: "Quan hệ dân tộc và tôn giáo là gì?", a: "Sự liên kết, tác động qua lại giữa dân tộc với tôn giáo trên mọi lĩnh vực." },
  { q: "Quan hệ dân tộc - tôn giáo VN được thiết lập trên cơ sở nào?", a: "Trên cơ sở cộng đồng quốc gia - dân tộc thống nhất." },
  { q: "Tín ngưỡng truyền thống VN có vai trò gì?", a: "Chi phối mạnh mẽ quan hệ dân tộc - tôn giáo, tạo nét đặc thù văn hóa Việt Nam." },
  { q: "Các hiện tượng tôn giáo mới có đặc điểm gì?", a: "Có xu hướng phát triển mạnh, tính chất mê tín khá rõ, ảnh hưởng đến đoàn kết dân tộc." },
  { q: "Các thế lực thù địch lợi dụng vấn đề dân tộc - tôn giáo để làm gì?", a: "Thực hiện 'diễn biến hòa bình', kích động ly khai, phá hoại khối đại đoàn kết." },
  { q: "4 khu vực trọng điểm dễ bị lợi dụng vấn đề dân tộc - tôn giáo?", a: "Tây Bắc, Tây Nguyên, Tây Nam Bộ và Tây duyên hải miền Trung." },
  { q: "Định hướng giải quyết quan hệ dân tộc - tôn giáo là gì?", a: "Tăng cường quan hệ tốt đẹp, củng cố đoàn kết dân tộc và đoàn kết tôn giáo." },
  { q: "Nguyên tắc khi giải quyết vấn đề tôn giáo là gì?", a: "Giải quyết vấn đề tôn giáo trên cơ sở vấn đề dân tộc, không được ly khai dân tộc." },
  { q: "Làm gì để chống lợi dụng vấn đề dân tộc - tôn giáo?", a: "Tăng cường an ninh, vận động quần chúng, vạch trần âm mưu, xử lý vi phạm pháp luật." },
  { q: "Mục tiêu cuối cùng khi giải quyết quan hệ dân tộc - tôn giáo là gì?", a: "Xây dựng nước Việt Nam dân giàu, nước mạnh, dân chủ, công bằng, văn minh." },
];

// --- LOGIC GAME & UTILS ---
const generateFullData = () => {
  let data = [...RAW_DATA];
  // Nhân bản dữ liệu để đủ cho 9 trang (9 * 7 = 63 cặp)
  while (data.length < 63) {
    data = [...data, ...RAW_DATA];
  }
  return data.slice(0, 63).map((item, index) => ({ ...item, id: index }));
};

const PAIRS_PER_PAGE = 7;
const TOTAL_PAGES = 9;

interface Card {
  id: number;
  content: string;
  type: 'question' | 'answer';
}

interface Connection {
  leftId: number;
  rightId: number;
  isCorrect?: boolean;
}

// --- MAIN COMPONENT ---
function App() {
  const [allPairs, setAllPairs] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentPairs, setCurrentPairs] = useState<any[]>([]);
  
  const [leftCards, setLeftCards] = useState<Card[]>([]);
  const [rightCards, setRightCards] = useState<Card[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<Card | null>(null);
  const [selectedRight, setSelectedRight] = useState<Card | null>(null);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [checkedConnections, setCheckedConnections] = useState<Connection[]>([]);
  const [hintedIds, setHintedIds] = useState<Set<number>>(new Set());
  const [isChecked, setIsChecked] = useState(false);
  
  const [, setUpdateTrigger] = useState(0); 
  
  const [score, setScore] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedScore = sessionStorage.getItem('dai_dong_score');
      return savedScore ? parseInt(savedScore, 10) : 0;
    }
    return 0;
  });

  const [pageScore, setPageScore] = useState(0);
  const [isPageFinished, setIsPageFinished] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);
  
  const leftRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const rightRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    sessionStorage.setItem('dai_dong_score', score.toString());
  }, [score]);

  useEffect(() => {
    const data = generateFullData();
    setAllPairs(data);
    loadPage(0, data);
    
    const handleResize = () => setUpdateTrigger(prev => prev + 1);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const loadPage = (pageIndex: number, sourceData: any[]) => {
    const start = pageIndex * PAIRS_PER_PAGE;
    const end = start + PAIRS_PER_PAGE;
    const pageData = sourceData.slice(start, end);
    
    setCurrentPairs(pageData);
    
    const questions = pageData.map(p => ({ id: p.id, content: p.q, type: 'question' as const })).sort(() => Math.random() - 0.5);
    const answers = pageData.map(p => ({ id: p.id, content: p.a, type: 'answer' as const })).sort(() => Math.random() - 0.5);
    
    setLeftCards(questions);
    setRightCards(answers);
    setConnections([]);
    setCheckedConnections([]);
    setSelectedLeft(null);
    setSelectedRight(null);
    setIsChecked(false);
    setIsPageFinished(false);
    setPageScore(0);
    setHintedIds(new Set());
  };

  const handleCardClick = (card: Card, side: 'left' | 'right') => {
    if (isChecked) return; 
    
    if (side === 'left') {
      if (selectedLeft?.id === card.id) {
        setSelectedLeft(null);
      } else {
        setSelectedLeft(card);
        if (selectedRight) {
          createConnection(card.id, selectedRight.id);
          setSelectedLeft(null);
          setSelectedRight(null);
          // SỬA ĐỔI: Xóa gợi ý khi đã nối xong (dù đúng hay sai)
          setHintedIds(new Set());
        }
      }
    } else {
      if (selectedRight?.id === card.id) {
        setSelectedRight(null);
      } else {
        setSelectedRight(card);
        if (selectedLeft) {
          createConnection(selectedLeft.id, card.id);
          setSelectedLeft(null);
          setSelectedRight(null);
          // SỬA ĐỔI: Xóa gợi ý khi đã nối xong
          setHintedIds(new Set());
        }
      }
    }
  };

  const createConnection = (leftId: number, rightId: number) => {
    const filtered = connections.filter(
      c => c.leftId !== leftId && c.rightId !== rightId
    );
    setConnections([...filtered, { leftId, rightId }]);
  };

  const handleCheck = () => {
    if (connections.length === 0) return;
    
    const checked = connections.map(conn => ({
      ...conn,
      isCorrect: conn.leftId === conn.rightId
    }));
    
    setCheckedConnections(checked);
    setIsChecked(true);
    
    // Logic tính điểm: Đúng +100, Sai không trừ
    let points = 0;
    checked.forEach(c => {
        if (c.isCorrect) points += 100;
        // else points -= 0; // Không trừ điểm nếu sai
    });

    setPageScore(points);
    // Cộng dồn vào tổng điểm
    setScore(prev => prev + points);
    
    // Chỉ hoàn thành trang nếu đúng hết
    const correctCount = checked.filter(c => c.isCorrect).length;
    if (correctCount === currentPairs.length) {
      setTimeout(() => setIsPageFinished(true), 800);
    }
  };

  const handleHint = () => {
    if (isChecked) return;
    
    // SỬA ĐỔI: Chỉ cho phép gợi ý khi đã chọn 1 câu hỏi (bên trái)
    if (!selectedLeft) {
        alert("Vui lòng chọn một câu hỏi (bên trái) để sử dụng gợi ý!");
        return;
    }

    setScore(prev => prev - 50);
    const newHintedIds = new Set(hintedIds);
    
    // SỬA ĐỔI: Logic gợi ý mới - Tìm 5 đáp án sai của câu hỏi ĐANG CHỌN để làm mờ
    const wrongAnswers = rightCards
        .filter(card => 
             card.id !== selectedLeft.id && // Không phải đáp án đúng
             !hasConnection(card.id, 'right') // Chưa bị nối
        )
        .sort(() => Math.random() - 0.5)
        .slice(0, 5);
    
    wrongAnswers.forEach(card => newHintedIds.add(card.id));
    setHintedIds(newHintedIds);
  };

  const handleNextPage = () => {
    const nextPageIndex = currentPage + 1;
    if (nextPageIndex < TOTAL_PAGES) {
      setCurrentPage(nextPageIndex);
      loadPage(nextPageIndex, allPairs);
    } else {
      setIsGameFinished(true);
    }
  };

  const handleRetryPage = () => {
    setScore(prev => prev - pageScore); 
    loadPage(currentPage, allPairs);
  };

  const handleRestart = () => {
    const newData = generateFullData();
    setAllPairs(newData);
    loadPage(0, newData);
    setCurrentPage(0);
    setIsGameFinished(false);
  };

  const renderConnections = () => {
    if (!containerRef.current) return null;
    const containerRect = containerRef.current.getBoundingClientRect();
    const linesToDraw = isChecked ? checkedConnections : connections;
    
    return (
      <svg className="absolute inset-0 pointer-events-none z-0 overflow-visible w-full h-full">
        {linesToDraw.map((conn) => {
          const leftEl = leftRefs.current[conn.leftId];
          const rightEl = rightRefs.current[conn.rightId];
          
          if (!leftEl || !rightEl) return null;
          
          const leftRect = leftEl.getBoundingClientRect();
          const rightRect = rightEl.getBoundingClientRect();
          
          const x1 = leftRect.right - containerRect.left; 
          const y1 = leftRect.top + leftRect.height / 2 - containerRect.top;
          const x2 = rightRect.left - containerRect.left;
          const y2 = rightRect.top + rightRect.height / 2 - containerRect.top;
          
          const distanceX = Math.abs(x2 - x1);
          const controlOffset = Math.min(distanceX * 0.6, 120); 

          const color = isChecked 
            ? (conn.isCorrect ? '#10b981' : '#ef4444') 
            : '#f59e0b'; 
          
          const key = `${conn.leftId}-${conn.rightId}`;

          return (
            <path
              key={key}
              d={`M ${x1} ${y1} C ${x1 + controlOffset} ${y1}, ${x2 - controlOffset} ${y2}, ${x2} ${y2}`}
              fill="none"
              stroke={color}
              strokeWidth="4"
              strokeDasharray={isChecked && !conn.isCorrect ? "8,4" : "none"}
              className="transition-all duration-300 ease-out" 
              style={{
                strokeLinecap: 'round',
                opacity: 0.9
              }}
            />
          );
        })}
      </svg>
    );
  };

  const hasConnection = (cardId: number, side: 'left' | 'right') => {
    return connections.some(c => 
      side === 'left' ? c.leftId === cardId : c.rightId === cardId
    );
  };

  const getConnectionStatus = (cardId: number, side: 'left' | 'right') => {
    if (!isChecked) return null;
    const conn = checkedConnections.find(c => 
      side === 'left' ? c.leftId === cardId : c.rightId === cardId
    );
    return conn?.isCorrect;
  };

  const HomeButton = () => (
    <a 
      href="https://homepage-swart-pi.vercel.app/" 
      className="fixed top-6 left-6 z-50 group flex items-center justify-center p-3 bg-white hover:bg-stone-50 border border-stone-200 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:border-amber-400"
      title="Về trang chủ"
    >
      <div className="bg-stone-100 p-2 rounded-full group-hover:bg-amber-100 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-600 group-hover:text-amber-600 transition-colors">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      </div>
      <span className="hidden md:block ml-3 mr-2 text-xs font-bold text-stone-600 group-hover:text-amber-700 transition-colors uppercase tracking-widest">Trang Chủ</span>
    </a>
  );

  if (isGameFinished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-[#fdfaf6] text-stone-800 overflow-hidden relative">
        <HomeButton />
        
        {/* Background Decor */}
        <div className="fixed inset-0 pointer-events-none -z-10">
           <div 
             className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-md scale-105 opacity-80"
             style={{ backgroundImage: "url('/img.jpg')" }} 
           ></div>
           <div className="absolute inset-0 bg-gradient-to-br from-[#fdfaf6]/80 via-[#fdfaf6]/60 to-[#fdfaf6]/80"></div>
        </div>
        
        <div className="relative bg-white p-12 rounded-[3rem] border border-stone-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] max-w-2xl w-full animate-fade-in-up overflow-hidden">
          
          <div className="mb-8 relative inline-block">
             <div className="absolute inset-0 bg-amber-200 blur-3xl opacity-40 animate-pulse"></div>
             <span className="relative text-8xl drop-shadow-sm">🎓</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black uppercase text-stone-800 mb-6 tracking-tight">
            Hoàn Thành Xuất Sắc!
          </h1>
          <p className="text-lg text-stone-500 mb-10 font-medium leading-relaxed">
            Bạn đã kết nối thành công {TOTAL_PAGES} trang tri thức.
          </p>
          
          <div className="bg-stone-50 rounded-[2rem] p-8 mb-10 border border-stone-100">
            <p className="text-xs uppercase tracking-[0.4em] text-stone-400 mb-3 font-bold">Tổng điểm</p>
            <p className="text-7xl font-black text-amber-500 tracking-tighter drop-shadow-sm">
              {score}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
             <a href="https://homepage-swart-pi.vercel.app/" className="px-8 py-4 rounded-full font-bold bg-white hover:bg-stone-50 text-stone-600 border border-stone-200 transition-all hover:scale-105 shadow-sm flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                Về Trang Chủ
             </a>
            <button onClick={handleRestart} className="px-10 py-4 bg-stone-800 hover:bg-stone-900 text-white font-bold rounded-full shadow-lg transition-all hover:scale-105 hover:shadow-stone-900/20 flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
              Chơi Tiếp (Giữ điểm)
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-6 px-4 md:px-8 relative bg-[#fdfaf6] text-stone-800 font-sans selection:bg-amber-100 overflow-x-hidden">
      <HomeButton />
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none -z-10">
         <div 
           className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-md scale-105 opacity-80"
           style={{ backgroundImage: "url('/img.jpg')" }} 
         ></div>
         <div className="absolute inset-0 bg-gradient-to-br from-[#fdfaf6]/80 via-[#fdfaf6]/60 to-[#fdfaf6]/80"></div>
      </div>

      {/* HEADER */}
      <header className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-center mb-10 relative z-10 gap-6 mt-16 md:mt-4 px-4">
        <div className="flex items-center gap-4 order-2 md:order-1">
          <div className="bg-white px-5 py-2.5 rounded-full border border-stone-200 shadow-sm flex items-center gap-3">
            <div className="flex gap-1">
               {Array.from({length: TOTAL_PAGES}).map((_, i) => (
                  <div key={i} className={`w-2 h-2 rounded-full transition-all ${i === currentPage ? 'bg-amber-500 scale-110' : i < currentPage ? 'bg-stone-300' : 'bg-stone-200'}`}></div>
               ))}
            </div>
            <span className="text-stone-400 text-[10px] font-bold uppercase tracking-widest pl-3 border-l border-stone-100">Trang {currentPage + 1}</span>
          </div>
        </div>
        
        <div className="text-center order-1 md:order-2">
           <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-stone-800 leading-none">
             Đại <span className="text-amber-600">Đồng</span>
           </h1>
           <div className="h-1 w-12 bg-amber-500 rounded-full mx-auto mt-2 mb-1"></div>
           <p className="text-[9px] uppercase tracking-[0.4em] text-stone-400 font-bold">Matching Card Game</p>
        </div>
        
        <div className="order-3 flex items-center gap-4">
          <div className="bg-white px-6 py-3 rounded-[2rem] border border-stone-200 shadow-sm flex flex-col items-end min-w-[120px]">
            <span className="text-[9px] uppercase text-stone-400 tracking-widest font-bold">Điểm số</span>
            <span className="text-2xl font-black text-amber-600 tracking-tighter">{score}</span>
          </div>
        </div>
      </header>

      {/* ACTION BAR */}
      <div className="w-full max-w-7xl flex flex-wrap justify-center gap-4 mb-12 relative z-20">
        <button
          onClick={handleHint}
          disabled={isChecked}
          className={`group px-6 py-3 bg-white text-indigo-600 hover:text-white font-bold rounded-full transition-all border border-indigo-100 flex items-center gap-3 shadow-sm hover:shadow-lg hover:-translate-y-1
            ${isChecked ? 'opacity-50 cursor-not-allowed grayscale' : 'hover:bg-indigo-500 hover:border-indigo-500'}`}
        >
          <span className="bg-indigo-50 text-indigo-600 p-1 rounded-full group-hover:bg-white/20 group-hover:text-white transition-colors">💡</span>
          <span>Gợi ý (-50đ)</span>
        </button>
        
        <button
          onClick={handleCheck}
          disabled={connections.length === 0 || isChecked}
          className={`group px-8 py-3 bg-stone-800 text-emerald-300 hover:text-white font-bold rounded-full transition-all border border-stone-700 flex items-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-1 scale-100
            ${connections.length === 0 || isChecked ? 'opacity-50 cursor-not-allowed grayscale' : 'hover:bg-emerald-600 hover:border-emerald-600'}`}
        >
          <span className="bg-stone-700 text-emerald-400 p-1 rounded-full group-hover:bg-white/20 group-hover:text-white transition-colors">✓</span>
          <span>Kiểm tra kết quả</span>
        </button>
      </div>

      {/* RESULTS BAR */}
      {isChecked && (
        <div className="w-full max-w-5xl mb-12 relative z-20 animate-fade-in-down px-4">
          <div className="bg-white rounded-[2.5rem] p-6 border border-stone-200 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-amber-500"></div>
            
            <div className="flex items-center gap-8 pl-6">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase text-stone-400 tracking-widest font-bold mb-1">Chính xác</span>
                <div className="flex items-baseline gap-2">
                   <span className="text-4xl font-black text-stone-800">{checkedConnections.filter(c => c.isCorrect).length}</span>
                   <span className="text-sm text-stone-500 font-bold">/ {currentPairs.length}</span>
                </div>
              </div>
              <div className="h-10 w-px bg-stone-200"></div>
              <div className="flex flex-col">
                 <span className="text-[10px] uppercase text-stone-400 tracking-widest font-bold mb-1">Thưởng</span>
                 <span className={`text-3xl font-bold ${pageScore >= 0 ? 'text-amber-600' : 'text-red-500'}`}>
                    {pageScore >= 0 ? '+' : ''}{pageScore}
                 </span>
              </div>
            </div>
            
            <div className="flex gap-3 w-full md:w-auto">
              <button 
                onClick={handleRetryPage}
                className="flex-1 md:flex-none px-6 py-3 bg-stone-50 hover:bg-stone-100 text-stone-600 font-bold rounded-full border border-stone-200 transition-all flex items-center justify-center gap-2"
              >
                <span>↺</span> Làm lại
              </button>
              <button 
                onClick={handleNextPage}
                className="flex-1 md:flex-none px-8 py-3 bg-stone-800 hover:bg-stone-900 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                {currentPage + 1 === TOTAL_PAGES ? 'Tổng Kết 🏆' : 'Tiếp Theo →'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GAME AREA */}
      <main className="w-full max-w-7xl flex-grow relative z-10 px-2" ref={containerRef}>
        
        {/* Modal Hoàn Thành Trang */}
        {isPageFinished && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
             <div className="absolute inset-0 bg-stone-900/20 backdrop-blur-sm animate-fade-in"></div>
             <div className="relative bg-white p-10 rounded-[3rem] border border-stone-100 shadow-2xl max-w-md w-full text-center animate-zoom-in overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 to-orange-500"></div>
                <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                   <div className="text-7xl drop-shadow-xl filter hover:scale-110 transition-transform cursor-default">👏</div>
                </div>
                <h2 className="text-3xl font-black text-stone-800 uppercase mt-6 mb-2">Tuyệt Vời!</h2>
                <p className="text-stone-500 mb-8 font-medium">Trang {currentPage + 1} hoàn thành.</p>
                
                <div className="bg-stone-50 rounded-[2rem] p-5 mb-8 border border-stone-100">
                  <p className="text-xs uppercase tracking-widest text-stone-400 mb-1">Điểm nhận được</p>
                  <div className={`text-5xl font-black ${pageScore >= 0 ? 'text-amber-500' : 'text-red-500'}`}>
                    {pageScore >= 0 ? '+' : ''}{pageScore}
                  </div>
                </div>

                <div className="flex gap-4">
                   <button onClick={handleRetryPage} className="flex-1 py-3.5 bg-stone-100 text-stone-500 hover:text-stone-800 rounded-full font-bold transition-colors">Làm lại</button>
                   <button onClick={handleNextPage} className="flex-1 py-3.5 bg-stone-800 hover:bg-stone-900 text-white rounded-full font-bold shadow-xl transition-all transform hover:-translate-y-1">Tiếp tục</button>
                </div>
             </div>
          </div>
        )}

        {/* Lines Layer */}
        {renderConnections()}

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-48 h-full relative z-10">
          
          {/* Cột Câu Hỏi (Trái) */}
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-4 mb-4 opacity-60">
               <div className="h-px w-12 bg-stone-300"></div>
               <h3 className="text-xs uppercase tracking-[0.3em] text-stone-400 font-bold">Câu Hỏi</h3>
               <div className="h-px w-12 bg-stone-300"></div>
            </div>
            
            {leftCards.map((card) => {
              const isSelected = selectedLeft?.id === card.id;
              const isConnected = hasConnection(card.id, 'left');
              const status = getConnectionStatus(card.id, 'left');

              return (
                <div
                  key={`q-${card.id}`}
                  ref={(el) => { leftRefs.current[card.id] = el; }}
                  onClick={() => handleCardClick(card, 'left')}
                  className={`
                    relative p-6 rounded-[2rem] border-2 cursor-pointer transition-all duration-300 group
                    min-h-[120px] flex items-center shadow-sm hover:shadow-lg
                    ${isSelected 
                      ? 'bg-amber-50 border-amber-400 scale-105 z-20 shadow-amber-200/50' 
                      : 'bg-white border-stone-100 hover:border-stone-300'}
                    ${isConnected && !isChecked ? 'bg-amber-50 border-amber-300' : ''}
                    ${status === true ? '!bg-emerald-50 !border-emerald-400' : ''}
                    ${status === false ? '!bg-red-50 !border-red-400 animate-shake' : ''}
                  `}
                >
                  {/* Connection Anchor Dot (Right Side) */}
                  <div className={`absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-white transition-colors duration-300 z-10
                    ${isSelected ? 'bg-amber-500 scale-125' : 
                      isConnected ? 'bg-amber-400' :
                      status === true ? 'bg-emerald-500' :
                      status === false ? 'bg-red-500' :
                      'bg-stone-300 group-hover:bg-stone-400'}
                  `}></div>

                  <p className="text-[15px] font-bold leading-relaxed pl-2 pr-4 text-stone-700 group-hover:text-stone-900 transition-colors">
                    {card.content}
                  </p>
                  
                  {/* Status Indicator */}
                  <div className="absolute top-4 right-4">
                     {status === true && <span className="text-emerald-500 bg-emerald-100 p-1 rounded-full text-xs font-bold block">✓</span>}
                     {status === false && <span className="text-red-500 bg-red-100 p-1 rounded-full text-xs font-bold block">✗</span>}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cột Đáp Án (Phải) */}
          <div className="space-y-6">
             <div className="flex items-center justify-center gap-4 mb-4 opacity-60">
               <div className="h-px w-12 bg-stone-300"></div>
               <h3 className="text-xs uppercase tracking-[0.3em] text-stone-400 font-bold">Đáp Án</h3>
               <div className="h-px w-12 bg-stone-300"></div>
            </div>
            {rightCards.map((card) => {
              const isSelected = selectedRight?.id === card.id;
              const isConnected = hasConnection(card.id, 'right');
              const isHinted = hintedIds.has(card.id);
              const status = getConnectionStatus(card.id, 'right');

              return (
                <div
                  key={`a-${card.id}`}
                  ref={(el) => { rightRefs.current[card.id] = el; }}
                  onClick={() => handleCardClick(card, 'right')}
                  className={`
                    relative p-6 rounded-[2rem] border-2 cursor-pointer transition-all duration-300 group
                    min-h-[120px] flex items-center justify-end text-right shadow-sm hover:shadow-lg
                    ${isSelected 
                      ? 'bg-amber-50 border-amber-400 scale-105 z-20 shadow-amber-200/50' 
                      : 'bg-white border-stone-100 hover:border-stone-300'}
                    ${isConnected && !isChecked ? 'bg-amber-50 border-amber-300' : ''}
                    ${isHinted && !isChecked ? 'opacity-40 grayscale blur-[1px]' : ''}
                    ${status === true ? '!bg-emerald-50 !border-emerald-400' : ''}
                    ${status === false ? '!bg-red-50 !border-red-400 animate-shake' : ''}
                  `}
                >
                  {/* Connection Anchor Dot (Left Side) */}
                  <div className={`absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-white transition-colors duration-300 z-10
                    ${isSelected ? 'bg-amber-500 scale-125' : 
                      isConnected ? 'bg-amber-400' :
                      status === true ? 'bg-emerald-500' :
                      status === false ? 'bg-red-500' :
                      'bg-stone-300 group-hover:bg-stone-400'}
                  `}></div>

                  <p className="text-[15px] font-medium leading-relaxed pr-2 pl-4 text-stone-600 group-hover:text-stone-800 transition-colors">
                    {card.content}
                  </p>

                  {/* Status Indicator */}
                  <div className="absolute top-4 left-4">
                     {status === true && <span className="text-emerald-500 bg-emerald-100 p-1 rounded-full text-xs font-bold block">✓</span>}
                     {status === false && <span className="text-red-500 bg-red-100 p-1 rounded-full text-xs font-bold block">✗</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* FOOTER - Wrong Answers Display */}
      {isChecked && checkedConnections.some(c => !c.isCorrect) && (
        <div className="w-full max-w-4xl mt-16 mb-10 relative z-10 animate-fade-in-up px-4">
           <div className="relative group">
              <div className="absolute inset-0 bg-red-50 blur-xl rounded-[3rem]"></div>
              <div className="relative bg-white border border-red-100 rounded-[2.5rem] p-8 shadow-xl overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 to-orange-400"></div>
                 
                 <h3 className="text-xl font-bold text-red-700 mb-8 flex items-center gap-3 uppercase tracking-wide">
                    <span className="bg-red-50 p-2 rounded-full"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></span>
                    Cần xem lại
                 </h3>
                 <div className="grid grid-cols-1 gap-4">
                    {checkedConnections
                    .filter(c => !c.isCorrect)
                    .map((conn, idx) => {
                       const question = currentPairs.find(p => p.id === conn.leftId);
                       const correctAnswer = currentPairs.find(p => p.id === conn.leftId);
                       const yourAnswer = currentPairs.find(p => p.id === conn.rightId);
                       
                       return (
                          <div key={idx} className="bg-stone-50 rounded-[2rem] p-6 border border-red-100 hover:border-red-200 transition-colors">
                             <div className="mb-4">
                                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest bg-white px-3 py-1 rounded-full shadow-sm">Câu hỏi</span>
                                <p className="text-stone-800 font-bold mt-3 text-lg">{question?.q}</p>
                             </div>
                             <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-red-50 p-5 rounded-[1.5rem] border border-red-100">
                                   <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest block mb-2">Bạn chọn</span>
                                   <p className="text-red-800 text-sm leading-relaxed font-medium">{yourAnswer?.a}</p>
                                </div>
                                <div className="bg-emerald-50 p-5 rounded-[1.5rem] border border-emerald-100">
                                   <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block mb-2">Đáp án đúng</span>
                                   <p className="text-emerald-800 text-sm leading-relaxed font-medium">{correctAnswer?.a}</p>
                                </div>
                             </div>
                          </div>
                       );
                    })}
                 </div>
              </div>
           </div>
        </div>
      )}
      
      {/* Styles for animations */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-zoom-in {
          animation: zoomIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default App;