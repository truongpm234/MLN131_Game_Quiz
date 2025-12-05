import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Development from './components/Development';
import News from './components/News';
import Contact from './components/Contact';
import Footer from './components/Footer';
import GuidePage from './components/GuidePage';
import QuizPage from './components/QuizPage';
import ResourcesPage from './components/ResourcesPage';
import Chatbot from './components/Chatbot';

const App: React.FC = () => {
  const [page, setPage] = useState('home');
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = window.localStorage.getItem('theme');
      if (storedTheme) {
        return storedTheme;
      }
      // Default to system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark'; // Default for SSR or environments without localStorage
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const navigate = (pageName: string) => {
    setPage(pageName);
    window.scrollTo(0, 0); // Scroll to top on page change
  };

  const mainClasses =
    theme === 'light'
      ? 'min-h-screen bg-gradient-to-br from-[#f3f1ea] via-[#efe9dd] to-[#e4dcc7] text-gray-900'
      : 'min-h-screen bg-gradient-to-br from-[#090b14] via-[#05060d] to-[#010104] text-gray-100';

  if (page === 'guide') {
    return (
      <>
        <GuidePage navigate={navigate} theme={theme} toggleTheme={toggleTheme} />
        <Chatbot />
      </>
    );
  }

  if (page === 'quiz') {
    return (
      <>
        <QuizPage navigate={navigate} theme={theme} toggleTheme={toggleTheme} />
        <Chatbot />
      </>
    );
  }

  if (page === 'resources') {
    return (
      <>
        <ResourcesPage navigate={navigate} theme={theme} toggleTheme={toggleTheme} />
        <Chatbot />
      </>
    );
  }

  return (
    <div className={mainClasses}>
      <Navbar navigate={navigate} theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Home navigate={navigate} />
        <About />
        <Development />
        <News />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default App;