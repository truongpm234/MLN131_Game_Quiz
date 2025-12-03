import React from 'react';
import Resources from './Resources';
import Navbar from './Navbar';

interface ResourcesPageProps {
    navigate: (page: string) => void;
    theme: string;
    toggleTheme: () => void;
}

const ResourcesPage: React.FC<ResourcesPageProps> = ({ navigate, theme, toggleTheme }) => {
    const pageClasses =
        theme === 'light'
            ? "min-h-screen font-sans bg-gradient-to-br from-[#f3f1ea] via-[#efe9dd] to-[#e4dcc7] text-gray-900"
            : "min-h-screen font-sans bg-gradient-to-br from-[#090b14] via-[#05060d] to-[#010104] text-gray-100";

    return (
        <div className={pageClasses}>
            <Navbar navigate={navigate} theme={theme} toggleTheme={toggleTheme} />
            <main>
                <Resources />
            </main>
             <footer className="text-center py-8 text-gray-500 dark:text-gray-500">
                &copy; {new Date().getFullYear()} Lenin Card. All rights reserved.
            </footer>
        </div>
    );
};

export default ResourcesPage;