import React, { useState, useRef, useEffect } from 'react';
import ChatIcon from './icons/ChatIcon';
import CloseIcon from './icons/CloseIcon';
import SendIcon from './icons/SendIcon';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    sources?: any[];
}

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: 'Xin chào! Tôi là trợ lý AI. Bạn có thắc mắc gì về Triết học Mác - Lênin không?', sender: 'bot' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: 'user'
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
            const response = await fetch(`${apiUrl}/ask`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question: userMessage.text }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: data.answer,
                sender: 'bot',
                sources: data.sources
            };

            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: 'Xin lỗi, tôi đang gặp sự cố kết nối. Vui lòng thử lại sau.',
                sender: 'bot'
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 w-[350px] h-[500px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700 animate-fade-in-up">
                    {/* Header */}
                    <div className="bg-brand-gold p-4 flex justify-between items-center text-gray-900 shadow-md">
                        <div className="flex items-center gap-2">
                            <div className="bg-white/20 p-1.5 rounded-full backdrop-blur-sm">
                                <ChatIcon className="w-5 h-5 text-gray-900" />
                            </div>
                            <h3 className="font-bold text-lg">Trợ lý Lênin</h3>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="hover:bg-black/10 p-1 rounded-full transition-colors"
                        >
                            <CloseIcon className="w-6 h-6 text-gray-900" />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900/50">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${msg.sender === 'user'
                                        ? 'bg-brand-gold text-gray-900 rounded-tr-none font-medium'
                                        : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-100 dark:border-gray-600'
                                        }`}
                                >
                                    <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                                    {msg.sources && msg.sources.length > 0 && (
                                        <div className="mt-3 pt-2 border-t border-black/10 dark:border-white/10 text-xs opacity-80">
                                            <p className="font-bold mb-1 uppercase tracking-wider text-[10px]">Nguồn tham khảo:</p>
                                            <ul className="list-disc pl-4 space-y-1">
                                                {msg.sources.slice(0, 2).map((source: any, idx: number) => (
                                                    (() => {
                                                        const originalPage = source.metadata?.page_number;
                                                        const correctedPage = typeof originalPage === 'number' ? originalPage : null;
                                                        return (
                                                            <li key={idx} className="truncate">
                                                                Trang {correctedPage !== null && correctedPage > 0 ? correctedPage : '?'}: {source.page_content?.substring(0, 30)}...
                                                            </li>
                                                        );
                                                    })()
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white dark:bg-gray-700 p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 dark:border-gray-600">
                                    <div className="flex space-x-2">
                                        <div className="w-2 h-2 bg-brand-gold rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                        <div className="w-2 h-2 bg-brand-gold rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                        <div className="w-2 h-2 bg-brand-gold rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyPress}
                                placeholder="Hỏi gì đó..."
                                className="flex-1 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white rounded-full px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 text-sm transition-all"
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={isLoading || !inputValue.trim()}
                                className="bg-brand-gold hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 p-2.5 rounded-full transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
                            >
                                <SendIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
                    } transition-all duration-300 bg-brand-gold hover:bg-amber-500 text-gray-900 p-4 rounded-full shadow-[0_4px_14px_0_rgba(245,158,11,0.39)] hover:shadow-[0_6px_20px_rgba(245,158,11,0.23)] transform hover:-translate-y-1`}
            >
                <ChatIcon className="w-8 h-8" />
            </button>
        </div>
    );
};

export default Chatbot;
