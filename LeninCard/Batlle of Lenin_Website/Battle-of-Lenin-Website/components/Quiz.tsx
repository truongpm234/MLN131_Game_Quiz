import React, { useState, useEffect } from 'react';
import TrophyIcon from './icons/TrophyIcon';

// Define the structure for a single quiz question
interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

// Define the possible states for the quiz component
type QuizStatus = 'idle' | 'loading' | 'active' | 'finished' | 'error';

// Sound effects for UI interactions
const SOUNDS = {
  select: 'https://cdn.pixabay.com/audio/2021/08/04/audio_0625c42559.mp3',
  next: 'https://cdn.pixabay.com/audio/2022/03/15/audio_70281b6b59.mp3',
  complete: 'https://cdn.pixabay.com/audio/2022/01/18/audio_8354c092e0.mp3',
  error: 'https://cdn.pixabay.com/audio/2021/08/04/audio_c6d132616e.mp3',
};

// Helper function to play sound safely
const playSound = (src: string) => {
  try {
    const audio = new Audio(src);
    audio.play().catch(e => console.error("Audio playback failed:", e));
  } catch (e) {
    console.error("Failed to create or play audio:", e);
  }
};

const Quiz: React.FC = () => {
  // State for the quiz flow
  const [status, setStatus] = useState<QuizStatus>('idle');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [quizMeta, setQuizMeta] = useState<{ name: string; subject: string } | null>(null);

  // State for the active quiz game
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false); // State for answer feedback
  const [score, setScore] = useState(0);

  // Effect to play sounds on status changes (finish/error)
  useEffect(() => {
    if (status === 'finished') {
      playSound(SOUNDS.complete);
    } else if (status === 'error') {
      playSound(SOUNDS.error);
    }
  }, [status]);

  // --- Helper to start a new quiz ---
  const startNewQuiz = (generatedQuestions: QuizQuestion[]) => {
    if (Array.isArray(generatedQuestions) && generatedQuestions.length > 0) {
      setQuestions(generatedQuestions);
      setCurrentQuestion(0);
      setScore(0);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setStatus('active');
    } else {
      throw new Error("Tệp không chứa dữ liệu câu hỏi hợp lệ.");
    }
  };

  // --- JSON File Upload Handler (only source) ---
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setStatus('loading');
    setError(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result;
        if (typeof text !== 'string') throw new Error("Không thể đọc tệp.");

        const data = JSON.parse(text);

        if (!data.history || !Array.isArray(data.history)) {
          throw new Error("Tệp JSON không hợp lệ. Thiếu trường 'history' hoặc không phải là một mảng.");
        }

        setQuizMeta({
          name: data.name || "Bộ đề không tên",
          subject: data.gameSubject || "Chủ đề không xác định"
        });

        const transformedQuestions: QuizQuestion[] = data.history.map((item: any, index: number) => {
          if (!item.questionContent || !item.answers || !Array.isArray(item.answers) || item.answers.length === 0) {
            throw new Error(`Dữ liệu không hợp lệ ở câu hỏi số ${index + 1}.`);
          }

          const options = item.answers.map((ans: any) => ans.content);
          const correctAnswerIndex = item.answers.findIndex((ans: any) => ans.correct === true);

          if (correctAnswerIndex === -1) {
            throw new Error(`Câu hỏi "${item.questionContent}" không có đáp án đúng nào được đánh dấu.`);
          }

          return {
            question: item.questionContent,
            options: options,
            correctAnswer: correctAnswerIndex,
          };
        });

        startNewQuiz(transformedQuestions);
      } catch (err: any) {
        console.error("Error processing JSON file:", err);
        setError(err.message || "Đã xảy ra lỗi khi xử lý tệp JSON. Vui lòng kiểm tra lại định dạng.");
        setStatus('error');
        setQuizMeta(null);
      } finally {
        // Reset file input value to allow re-uploading the same file
        event.target.value = '';
      }
    };
    reader.readAsText(file);
  };

  // --- Quiz Logic Handlers ---
  const handleAnswerOptionClick = (index: number) => {
    if (isAnswered) return; // Prevent changing answer

    playSound(SOUNDS.select);
    setSelectedAnswer(index);
    setIsAnswered(true);

    if (index === questions[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextClick = () => {
    playSound(SOUNDS.next);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setStatus('finished');
    }
  };

  const restartQuiz = () => {
    setStatus('idle');
    setQuestions([]);
    setQuizMeta(null);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
  };

  // --- Render Functions for different states ---
  const renderIdle = () => (
    <div className="w-full">
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8">Tải lên một tệp JSON để bắt đầu bài kiểm tra:</p>

      {/* Only JSON Upload */}
      <div className="bg-gray-100 dark:bg-gray-800/50 p-6 rounded-lg text-center flex flex-col items-center justify-between ring-1 ring-gray-200 dark:ring-gray-700 hover:ring-brand-green transition-all max-w-xl mx-auto">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Tải lên bộ đề có sẵn</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 min-h-[72px]">
            Sử dụng bộ câu hỏi của riêng bạn bằng cách tải lên một tệp JSON theo định dạng cho trước.
          </p>
        </div>
        <label className="bg-brand-green hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer">
          <span>Chọn tệp JSON</span>
          <input
            type="file"
            className="hidden"
            accept=".json,application/json"
            onChange={handleFileUpload}
          />
        </label>
      </div>

      <div className="mt-8 text-center text-gray-500 text-sm">
        <details className="text-left max-w-lg mx-auto mt-2 cursor-pointer">
          <summary className="hover:text-gray-800 dark:hover:text-white transition-colors">Xem định dạng tệp JSON yêu cầu</summary>
          <pre className="bg-gray-200 dark:bg-black/50 p-4 rounded-md text-xs overflow-auto mt-2 text-gray-700 dark:text-gray-300">
            <code>
{`{
  "name": "Tên bộ đề",
  "gameSubject": "Chủ đề",
  "history": [
    {
      "questionContent": "Nội dung câu hỏi của bạn...",
      "answers": [
        { "content": "Lựa chọn A", "correct": false },
        { "content": "Lựa chọn B", "correct": true },
        { "content": "Lựa chọn C", "correct": false },
        { "content": "Lựa chọn D", "correct": false }
      ]
    }
  ]
}`}
            </code>
          </pre>
        </details>
      </div>
    </div>
  );

  const renderLoading = () => (
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-brand-gold mx-auto mb-4"></div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Đang chuẩn bị câu hỏi...</h3>
      <p className="text-gray-600 dark:text-gray-400 mt-2">Vui lòng chờ trong giây lát.</p>
    </div>
  );

  const renderError = () => (
    <div className="text-center">
      <h3 className="text-2xl font-bold text-red-500 mb-4">Đã xảy ra lỗi</h3>
      <p className="text-gray-700 dark:text-gray-300 mb-8">{error}</p>
      <button
        onClick={restartQuiz}
        className="bg-brand-green hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full"
      >
        Quay lại
      </button>
    </div>
  );

  const renderFinished = () => {
    const percentage = Math.round((score / questions.length) * 100);
    let message = "Cố gắng hơn ở lần sau nhé!";
    let colorClass = 'text-gray-600 dark:text-gray-300';
    let borderColorClass = 'border-gray-400 dark:border-gray-500';

    if (percentage >= 90) {
      message = "Xuất sắc! Bạn là một bậc thầy Battle Of LeNin!";
      colorClass = 'text-brand-gold';
      borderColorClass = 'border-brand-gold';
    } else if (percentage >= 70) {
      message = "Rất tốt! Bạn đã nắm vững luật chơi.";
      colorClass = 'text-green-500 dark:text-green-400';
      borderColorClass = 'border-green-500';
    } else if (percentage >= 50) {
      message = "Khá lắm! Cần luyện tập thêm một chút.";
      colorClass = 'text-blue-500 dark:text-blue-400';
      borderColorClass = 'border-blue-500';
    }

    return (
      <div className="w-full text-center animate-fade-in-up">
        <div className={`mx-auto mb-4 w-24 h-24 flex items-center justify-center rounded-full border-4 ${borderColorClass} bg-gray-100/50 dark:bg-gray-800/50`}>
          <TrophyIcon className={`h-16 w-16 ${colorClass}`} />
        </div>

        <h2 className={`text-2xl md:text-3xl font-bold mb-3 ${colorClass}`}>{message}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Đây là kết quả bài kiểm tra của bạn.</p>

        <div className="bg-gray-100 dark:bg-gray-800/50 rounded-lg p-6 mb-8 ring-1 ring-gray-200 dark:ring-gray-700">
          <div className="flex justify-around items-center">
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 uppercase font-semibold">Điểm số</p>
              <p className={`text-4xl md:text-5xl font-black ${colorClass}`}>
                {score}
                <span className="text-2xl text-gray-500 dark:text-gray-400">/{questions.length}</span>
              </p>
            </div>
            <div className="h-16 w-px bg-gray-300 dark:bg-gray-600"></div>
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 uppercase font-semibold">Độ chính xác</p>
              <p className={`text-4xl md:text-5xl font-black ${colorClass}`}>{percentage}%</p>
            </div>
          </div>
        </div>

        <button
          onClick={restartQuiz}
          className="bg-brand-gold hover:bg-amber-600 text-gray-900 font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 ease-in-out hover:scale-105 shadow-lg shadow-brand-gold/30"
        >
          Chơi lại với bộ đề khác
        </button>
      </div>
    );
  };

  const renderActive = () => {
    if (questions.length === 0 || !questions[currentQuestion]) {
      setError("Không có dữ liệu câu hỏi hợp lệ.");
      setStatus('error');
      return null;
    }
    const currentQ = questions[currentQuestion];
    return (
      <div key={currentQuestion} className="w-full animate-question-fade-in">
        <div className="text-center mb-6">
          {quizMeta && (
            <>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{quizMeta.name}</h3>
              <p className="text-md text-brand-green mt-1">{quizMeta.subject}</p>
            </>
          )}
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              Câu hỏi {currentQuestion + 1} / {questions.length}
            </span>
            <span className="text-sm font-bold text-brand-gold">Điểm: {score}</span>
          </div>
          <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2.5">
            <div
              className="bg-brand-gold h-2.5 rounded-full"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                transition: 'width 0.4s ease-out'
              }}
            ></div>
          </div>
        </div>

        <div className="mb-6 min-h-[80px] flex items-center justify-center text-center">
          <p className="text-gray-800 dark:text-gray-200 text-lg md:text-xl font-semibold">{currentQ.question}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQ.options.map((option, index) => {
            const isCorrect = index === currentQ.correctAnswer;
            const isSelected = index === selectedAnswer;

            let buttonClass = 'p-4 rounded-lg text-left transition-all duration-200 border-2 transform';

            if (isAnswered) {
              if (isCorrect) {
                buttonClass += ' bg-green-600 border-green-500 text-white font-bold ring-2 ring-white/50 scale-105';
              } else if (isSelected && !isCorrect) {
                buttonClass += ' bg-red-700 border-red-600 text-white font-bold';
              } else {
                buttonClass += ' bg-gray-200 dark:bg-gray-800 border-gray-300 dark:border-gray-700 opacity-60 cursor-not-allowed text-gray-500';
              }
            } else {
              buttonClass += ' bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 hover:border-brand-gold hover:scale-[1.03] text-gray-700 dark:text-gray-300';
              if (isSelected) {
                buttonClass += ' ring-2 ring-brand-gold'; // Visual cue before locking in
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerOptionClick(index)}
                disabled={isAnswered}
                className={buttonClass}
              >
                <span className="font-bold mr-3">{String.fromCharCode(65 + index)}.</span>
                <span>{option}</span>
              </button>
            );
          })}
        </div>

        <div className="text-right mt-8">
          <button
            onClick={handleNextClick}
            disabled={!isAnswered}
            className="bg-brand-green hover:bg-green-700 text-white font-bold py-2 px-6 rounded-md transition-colors duration-300 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            {currentQuestion === questions.length - 1 ? 'Hoàn thành' : 'Câu tiếp theo'}
          </button>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (status) {
      case 'loading': return renderLoading();
      case 'active': return renderActive();
      case 'finished': return renderFinished();
      case 'error': return renderError();
      case 'idle':
      default: return renderIdle();
    }
  };

  return (
    <section id="quiz" className="py-20 bg-white dark:bg-dark-bg">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 dark:text-white uppercase">
            Game <span className="text-brand-gold">Quiz</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Kiểm tra sự am hiểu của bạn về thế giới Xã Hội Chủ Nghĩa</p>
        </div>

        <div className="max-w-4xl mx-auto bg-gray-50 dark:bg-gray-900/50 p-8 rounded-lg shadow-2xl ring-1 ring-gray-200 dark:ring-gray-700 min-h-[400px] flex items-center justify-center">
          {renderContent()}
        </div>
      </div>
    </section>
  );
};

export default Quiz;
