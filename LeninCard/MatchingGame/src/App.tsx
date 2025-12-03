import { useState, useEffect, useRef } from 'react';

// Dữ liệu câu hỏi về Dân tộc và Tôn giáo trong thời kỳ quá độ lên CNXH
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

const generateFullData = () => {
  let data = [...RAW_DATA];
  while (data.length < 63) {
    data = [...data, ...RAW_DATA];
  }
  return data.slice(0, 63).map((item, index) => ({ ...item, id: index }));
};

const PAIRS_PER_PAGE = 9;
const TOTAL_PAGES = 7;

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

function App() {
  const [allPairs, setAllPairs] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentPairs, setCurrentPairs] = useState<any[]>([]);
  
  // Game State
  const [leftCards, setLeftCards] = useState<Card[]>([]);
  const [rightCards, setRightCards] = useState<Card[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<Card | null>(null);
  const [selectedRight, setSelectedRight] = useState<Card | null>(null);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [checkedConnections, setCheckedConnections] = useState<Connection[]>([]);
  const [hintedIds, setHintedIds] = useState<Set<number>>(new Set());
  const [isChecked, setIsChecked] = useState(false);
  
  // Score State
  const [score, setScore] = useState(0);
  const [pageScore, setPageScore] = useState(0);
  const [isPageFinished, setIsPageFinished] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);
  
  const leftRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const rightRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const data = generateFullData();
    setAllPairs(data);
    loadPage(0, data);
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
    if (isChecked) return; // Không cho chọn sau khi đã check
    
    if (side === 'left') {
      if (selectedLeft?.id === card.id) {
        setSelectedLeft(null);
      } else {
        setSelectedLeft(card);
        // Nếu đã chọn bên phải, tạo connection
        if (selectedRight) {
          createConnection(card.id, selectedRight.id);
          setSelectedLeft(null);
          setSelectedRight(null);
        }
      }
    } else {
      if (selectedRight?.id === card.id) {
        setSelectedRight(null);
      } else {
        setSelectedRight(card);
        // Nếu đã chọn bên trái, tạo connection
        if (selectedLeft) {
          createConnection(selectedLeft.id, card.id);
          setSelectedLeft(null);
          setSelectedRight(null);
        }
      }
    }
  };

  const createConnection = (leftId: number, rightId: number) => {
    // Xóa connection cũ nếu có
    const filtered = connections.filter(
      c => c.leftId !== leftId && c.rightId !== rightId
    );
    setConnections([...filtered, { leftId, rightId }]);
  };

  const handleCheck = () => {
    if (connections.length === 0) return;
    
    // Kiểm tra từng connection
    const checked = connections.map(conn => ({
      ...conn,
      isCorrect: conn.leftId === conn.rightId
    }));
    
    setCheckedConnections(checked);
    setIsChecked(true);
    
    // Tính điểm
    const correctCount = checked.filter(c => c.isCorrect).length;
    const points = correctCount * 100;
    setPageScore(points);
    setScore(prev => prev + points);
    
    // Kiểm tra hoàn thành trang
    if (correctCount === currentPairs.length) {
      setTimeout(() => setIsPageFinished(true), 1000);
    }
  };

  const handleHint = () => {
    if (isChecked) return;
    
    // Trừ 50 điểm
    setScore(prev => Math.max(0, prev - 50));
    
    // Tìm các đáp án sai cho mỗi câu hỏi đã chọn connection
    const newHintedIds = new Set(hintedIds);
    
    connections.forEach(conn => {
      const correctAnswerId = conn.leftId;
      // Tìm 5 đáp án sai (khác với đáp án đúng)
      const wrongAnswers = rightCards
        .filter(card => card.id !== correctAnswerId && !newHintedIds.has(card.id))
        .slice(0, 5);
      
      wrongAnswers.forEach(card => newHintedIds.add(card.id));
    });
    
    // Nếu chưa có connection nào, hint random 5 đáp án
    if (connections.length === 0 && selectedLeft) {
      const wrongAnswers = rightCards
        .filter(card => card.id !== selectedLeft.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 5);
      wrongAnswers.forEach(card => newHintedIds.add(card.id));
    }
    
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
    // Load lại trang hiện tại
    loadPage(currentPage, allPairs);
  };

  const handleRestart = () => {
    window.location.reload();
  };

  // Hàm vẽ đường nối
  const renderConnections = () => {
    if (!containerRef.current) return null;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const linesToDraw = isChecked ? checkedConnections : connections;
    
    return (
      <svg
        className="absolute inset-0 pointer-events-none z-0"
        style={{ width: '100%', height: '100%' }}
      >
        {linesToDraw.map((conn, idx) => {
          const leftEl = leftRefs.current[conn.leftId];
          const rightEl = rightRefs.current[conn.rightId];
          
          if (!leftEl || !rightEl) return null;
          
          const leftRect = leftEl.getBoundingClientRect();
          const rightRect = rightEl.getBoundingClientRect();
          
          const x1 = leftRect.right - containerRect.left;
          const y1 = leftRect.top + leftRect.height / 2 - containerRect.top;
          const x2 = rightRect.left - containerRect.left;
          const y2 = rightRect.top + rightRect.height / 2 - containerRect.top;
          
          const color = isChecked 
            ? (conn.isCorrect ? '#10b981' : '#ef4444')
            : '#f59e0b';
          
          return (
            <line
              key={idx}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={color}
              strokeWidth="3"
              strokeDasharray={isChecked && !conn.isCorrect ? "5,5" : "none"}
              className="transition-all duration-300"
            />
          );
        })}
      </svg>
    );
  };

  if (isGameFinished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="bg-gradient-to-br from-[#fdf6e3] to-amber-50 text-gray-900 p-10 rounded-3xl border-4 border-amber-600 shadow-2xl max-w-2xl animate-fade-in">
          <div className="mb-6">
            <span className="text-6xl">🏆</span>
          </div>
          <h1 className="text-4xl font-black uppercase text-[#c70000] mb-4">Hoàn thành xuất sắc!</h1>
          <p className="text-xl font-bold mb-6">Bạn đã vượt qua {TOTAL_PAGES} chặng đường tri thức.</p>
          
          <div className="bg-white/50 rounded-xl p-6 mb-8 border border-amber-300">
            <p className="text-sm uppercase tracking-widest text-gray-600">Tổng điểm đạt được</p>
            <p className="text-6xl font-black text-[#c70000] mt-2">{score}</p>
          </div>

          <div className="flex gap-4 justify-center">
            <button onClick={handleRestart} className="px-8 py-3 bg-[#c70000] text-white font-bold rounded-lg hover:bg-[#a60000] transition border-2 border-black">
              Chơi Lại
            </button>
          </div>
        </div>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4 relative overflow-hidden bg-[#05060d] text-gray-100">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(199,0,0,0.1),transparent_70%)]"></div>
      </div>

      <header className="w-full max-w-7xl flex justify-between items-center mb-8 relative z-10">
        <div className="flex items-center gap-4">
          <div className="bg-white/10 px-4 py-2 rounded-full border border-white/20 backdrop-blur-md">
            <span className="text-amber-400 font-bold">Trang {currentPage + 1}/{TOTAL_PAGES}</span>
          </div>
        </div>
        <h1 className="text-2xl md:text-3xl font-black uppercase tracking-wider text-amber-400 drop-shadow-md hidden md:block">
          Nối Thẻ Tri Thức
        </h1>
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-r from-[#c70000] to-[#990000] px-6 py-2 rounded-lg border border-red-500 shadow-lg">
            <span className="text-xs uppercase text-red-200 block">Tổng Điểm</span>
            <span className="text-2xl font-bold text-white">{score}</span>
          </div>
        </div>
      </header>

      {/* Action Buttons */}
      <div className="w-full max-w-7xl flex justify-center gap-4 mb-6 relative z-10">
        <button
          onClick={handleHint}
          disabled={isChecked}
          className={`px-6 py-3 bg-purple-600 text-white font-bold rounded-lg transition border-2 border-purple-400 flex items-center gap-2
            ${isChecked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700 hover:scale-105'}`}
        >
          💡 Gợi ý (-50 điểm)
        </button>
        
        <button
          onClick={handleCheck}
          disabled={connections.length === 0 || isChecked}
          className={`px-8 py-3 bg-green-600 text-white font-bold rounded-lg transition border-2 border-green-400 flex items-center gap-2
            ${connections.length === 0 || isChecked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700 hover:scale-105'}`}
        >
          ✓ Kiểm tra kết quả
        </button>
      </div>

      {/* Results after check */}
      {isChecked && (
        <div className="w-full max-w-7xl mb-6 relative z-10">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-green-400 font-bold text-lg">
                  ✓ Đúng: {checkedConnections.filter(c => c.isCorrect).length}/{currentPairs.length}
                </span>
                <span className="text-red-400 font-bold text-lg ml-4">
                  ✗ Sai: {checkedConnections.filter(c => !c.isCorrect).length}/{currentPairs.length}
                </span>
              </div>
              <div className="text-2xl font-bold text-amber-400">
                +{pageScore} điểm
              </div>
            </div>
            
            {/* Action buttons after check */}
            <div className="flex gap-3 mt-4">
              <button 
                onClick={handleRetryPage}
                className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg transition transform hover:scale-105 shadow-md border border-amber-600 flex items-center justify-center gap-2"
              >
                🔄 Làm lại trang này
              </button>
              <button 
                onClick={handleNextPage}
                className="flex-1 py-3 bg-[#c70000] hover:bg-[#a60000] text-white font-bold rounded-lg transition transform hover:scale-105 shadow-md border border-red-600 flex items-center justify-center gap-2"
              >
                {currentPage + 1 === TOTAL_PAGES ? '🏆 Xem kết quả' : 'Trang kế tiếp →'}
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="w-full max-w-7xl flex-grow relative z-10" ref={containerRef}>
        {isPageFinished ? (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-3xl fade-in">
            <div className="bg-[#fdf6e3] text-gray-900 p-8 rounded-2xl border-4 border-[#c70000] text-center shadow-2xl max-w-md w-full">
              <h2 className="text-3xl font-bold text-[#c70000] mb-2">Hoàn thành trang {currentPage + 1}!</h2>
              <p className="text-lg mb-4">Bạn đã nối chính xác {checkedConnections.filter(c => c.isCorrect).length}/{currentPairs.length} cặp câu hỏi.</p>
              <div className="flex justify-between items-center bg-yellow-100 p-4 rounded-lg mb-6">
                <span className="font-semibold">Điểm trang này:</span>
                <span className="text-2xl font-bold text-[#c70000]">+{pageScore}</span>
              </div>
              
              {/* Two action buttons */}
              <div className="flex gap-3">
                <button 
                  onClick={handleRetryPage}
                  className="flex-1 py-4 bg-amber-500 text-white font-bold text-lg rounded-xl hover:bg-amber-600 transition transform hover:scale-105 shadow-lg border-2 border-amber-700 flex items-center justify-center gap-2"
                >
                  🔄 Làm lại
                </button>
                <button 
                  onClick={handleNextPage}
                  className="flex-1 py-4 bg-[#c70000] text-white font-bold text-lg rounded-xl hover:bg-[#a60000] transition transform hover:scale-105 shadow-lg border-2 border-black flex items-center justify-center gap-2"
                >
                  {currentPage + 1 === TOTAL_PAGES ? '🏆 Kết quả' : 'Tiếp theo →'}
                </button>
              </div>
            </div>
          </div>
        ) : null}

        {/* Connection Lines */}
        {renderConnections()}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full relative z-10">
          {/* Cột Câu Hỏi */}
          <div className="space-y-3">
            <h3 className="text-center text-sm uppercase tracking-widest text-blue-300 mb-4 font-bold">Câu Hỏi</h3>
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
                    relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 card-hover bg-white/5 backdrop-blur-md min-h-[80px] flex items-center
                    ${isSelected ? 'selected bg-blue-500/20 border-blue-400' : 'border-white/10 hover:border-white/30'}
                    ${isConnected && !isChecked ? 'border-amber-400 bg-amber-500/10' : ''}
                    ${status === true ? 'border-green-500 bg-green-500/20' : ''}
                    ${status === false ? 'border-red-500 bg-red-500/20' : ''}
                  `}
                >
                  <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl ${
                    status === true ? 'bg-green-500' :
                    status === false ? 'bg-red-500' :
                    'bg-blue-500'
                  }`}></div>
                  <p className="text-sm md:text-base font-medium">{card.content}</p>
                  {status === true && <span className="ml-auto text-green-500 text-2xl">✓</span>}
                  {status === false && <span className="ml-auto text-red-500 text-2xl">✗</span>}
                </div>
              );
            })}
          </div>

          {/* Cột Đáp Án */}
          <div className="space-y-3">
            <h3 className="text-center text-sm uppercase tracking-widest text-green-300 mb-4 font-bold">Đáp Án</h3>
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
                    relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 card-hover bg-white/5 backdrop-blur-md min-h-[80px] flex items-center justify-end text-right
                    ${isSelected ? 'selected bg-green-500/20 border-green-400' : 'border-white/10 hover:border-white/30'}
                    ${isConnected && !isChecked ? 'border-amber-400 bg-amber-500/10' : ''}
                    ${isHinted && !isChecked ? 'opacity-30 blur-[2px]' : ''}
                    ${status === true ? 'border-green-500 bg-green-500/20' : ''}
                    ${status === false ? 'border-red-500 bg-red-500/20' : ''}
                  `}
                >
                  <div className={`absolute right-0 top-0 bottom-0 w-1 rounded-r-xl ${
                    status === true ? 'bg-green-500' :
                    status === false ? 'bg-red-500' :
                    'bg-green-500'
                  }`}></div>
                  {status === true && <span className="mr-auto text-green-500 text-2xl">✓</span>}
                  {status === false && <span className="mr-auto text-red-500 text-2xl">✗</span>}
                  <p className="text-sm md:text-base font-medium text-gray-300">{card.content}</p>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Wrong answers display after check */}
      {isChecked && checkedConnections.some(c => !c.isCorrect) && (
        <div className="w-full max-w-7xl mt-6 relative z-10">
          <div className="bg-red-900/30 backdrop-blur-md rounded-lg p-6 border border-red-500/50">
            <h3 className="text-xl font-bold text-red-400 mb-4">📝 Đáp án các câu sai:</h3>
            <div className="space-y-3">
              {checkedConnections
                .filter(c => !c.isCorrect)
                .map((conn, idx) => {
                  const question = currentPairs.find(p => p.id === conn.leftId);
                  const correctAnswer = currentPairs.find(p => p.id === conn.leftId);
                  const yourAnswer = currentPairs.find(p => p.id === conn.rightId);
                  
                  return (
                    <div key={idx} className="bg-white/5 rounded-lg p-4">
                      <p className="text-blue-300 font-semibold mb-2">❓ {question?.q}</p>
                      <p className="text-red-400 mb-1">✗ Bạn chọn: {yourAnswer?.a}</p>
                      <p className="text-green-400">✓ Đáp án đúng: {correctAnswer?.a}</p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
