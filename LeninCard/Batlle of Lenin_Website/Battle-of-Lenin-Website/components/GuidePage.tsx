import React from 'react';
import GameGuide from './GameGuide';
import Navbar from './Navbar';

interface GuidePageProps {
    navigate: (page: string) => void;
    theme: string;
    toggleTheme: () => void;
}

const GuidePage: React.FC<GuidePageProps> = ({ navigate, theme, toggleTheme }) => {
    // Luôn sử dụng dark mode background cho trang Guide để nổi bật hiệu ứng
    const bgClass = "bg-[#060810] min-h-screen text-gray-100 overflow-x-hidden font-sans selection:bg-brand-gold/30";

    return (
        <div className={bgClass}>
            <Navbar navigate={navigate} theme={theme} toggleTheme={toggleTheme} />
            
            <main className="pt-24 pb-12">
                <GameGuide />
            </main>

            <footer className="text-center py-8 text-gray-600 border-t border-white/5 bg-[#060810]">
                <p className="text-xs uppercase tracking-widest opacity-50">
                    &copy; {new Date().getFullYear()} Lenin Card Game
                </p>
            </footer>
        </div>
    );
};

export default GuidePage;