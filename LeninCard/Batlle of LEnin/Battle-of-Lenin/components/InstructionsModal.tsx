import React from "react";

interface InstructionsModalProps {
  onClose: () => void;
}

const InstructionsModal: React.FC<InstructionsModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4 transition-opacity duration-300">
      <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-2xl w-full max-w-xl lg:max-w-3xl text-gray-800 relative max-h-[90vh] overflow-y-auto transform scale-100 transition-transform duration-300 border-t-8 border-indigo-600">
        <h2 className="text-4xl font-extrabold mb-6 text-center text-indigo-700 tracking-wider">
          📚 HƯỚNG DẪN TRÒ CHƠI
        </h2>
        <hr className="mb-6 border-indigo-200" />
        <div className="space-y-8 text-left">
          <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500">
            <h3 className="font-extrabold text-2xl text-indigo-700 flex items-center mb-2">
              <span className="text-3xl mr-2">🎯</span> MỤC TIÊU
            </h3>
            <p className="text-lg">
              Mục tiêu chính là lật các thẻ bài, trả lời **câu hỏi tương ứng**
              để ôn lại kiến thức, củng cố tinh thần, và chuẩn bị thật tốt cho
              **môn MLN131**.
            </p>
          </div>
          <div>
            <h3 className="font-extrabold text-2xl text-indigo-700 flex items-center mb-4">
              <span className="text-3xl mr-2">🎮</span> CÁCH CHƠI ĐƠN
            </h3>

            <ol className="space-y-4 text-lg">
              <li className="flex items-start">
                <span className="flex-shrink-0 bg-indigo-600 text-white w-8 h-8 flex items-center justify-center rounded-full font-bold mr-3 shadow-md">
                  1
                </span>
                <div>
                  <h4 className="font-bold text-xl text-gray-900">
                    Chọn Thẻ Ngẫu Nhiên
                  </h4>
                  <p className="text-gray-600">
                    Người chơi sẽ **chọn một thẻ bài bất kỳ** trên bàn.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 bg-indigo-600 text-white w-8 h-8 flex items-center justify-center rounded-full font-bold mr-3 shadow-md">
                  2
                </span>
                <div>
                  <h4 className="font-bold text-xl text-gray-900">
                    Hiện Thử Thách/Câu Hỏi
                  </h4>
                  <p className="text-gray-600">
                    Sau khi thẻ được lật, **hệ thống sẽ hiển thị thử thách/câu
                    hỏi** của thẻ sau 3 giây.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 bg-indigo-600 text-white w-8 h-8 flex items-center justify-center rounded-full font-bold mr-3 shadow-md">
                  3
                </span>
                <div>
                  <h4 className="font-bold text-xl text-gray-900">
                    Cơ Chế Tính Điểm
                  </h4>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-gray-600">
                    <li>Thời gian trả lời: **20 giây** cho mỗi câu hỏi.</li>
                    <li>Giá trị thẻ: Tối đa **100 điểm**.</li>
                    <li>
                      Điểm thưởng: **Phụ thuộc vào tốc độ trả lời** (trả lời
                      càng nhanh, điểm càng cao).
                    </li>
                    <li>Trả lời sai: Nhận **0 điểm** cho thẻ đó.</li>
                  </ul>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 bg-indigo-600 text-white w-8 h-8 flex items-center justify-center rounded-full font-bold mr-3 shadow-md">
                  4
                </span>
                <div>
                  <h4 className="font-bold text-xl text-gray-900">
                    Kết Thúc Ván Chơi
                  </h4>
                  <p className="text-gray-600">
                    Hệ thống tổng hợp điểm sau khi **18 thẻ** trên bàn được mở
                    hết.
                  </p>
                </div>
              </li>
            </ol>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
            <h3 className="font-extrabold text-2xl text-yellow-800 flex items-center">
              <span className="text-3xl mr-2">💡</span> CHẾ ĐỘ HIỆN TẠI
            </h3>
            <p className="text-lg font-semibold text-yellow-700 ml-9">
              Chỉ hỗ trợ **Chơi Đơn (Single Player)**.
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-8 w-full max-w-xs mx-auto block px-8 py-3 bg-indigo-600 text-white font-extrabold text-lg rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
        >
          TÔI ĐÃ HIỂU!
        </button>
      </div>
    </div>
  );
};

export default InstructionsModal;
