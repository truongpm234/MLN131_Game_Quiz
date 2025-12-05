import React, { useState, useEffect } from 'react';
import MenuIcon from './icons/MenuIcon';
import XIcon from './icons/XIcon';
import ThemeToggle from './ThemeToggle';

interface NavLink {
  href: string;
  label: string;
}

interface NavbarProps {
  navigate: (page: string) => void;
  theme: string;
  toggleTheme: () => void;
}

const navLinks: NavLink[] = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'Giới thiệu' },
  { href: '#development', label: 'Phát triển' },
  { href: '#news', label: 'Nội dung' },
  { href: 'resources', label: 'Tài Nguyên' },
  { href: 'guide', label: 'Hướng dẫn' }
];

const Navbar: React.FC<NavbarProps> = ({ navigate, theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    setIsOpen(false);

    if (href.startsWith('#')) {
      const sectionId = href.substring(1);
      const element = document.getElementById(sectionId);

      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveSection(sectionId);
      } else {
        navigate('home');
        setTimeout(() => {
          const homeElement = document.getElementById(sectionId);
          if (homeElement) {
            homeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    } else {
      navigate(href);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/60 dark:bg-[rgba(6,8,15,0.75)] backdrop-blur-xl border-b border-white/10 shadow-[0_15px_30px_-20px_rgba(0,0,0,0.8)] transition-colors duration-300">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center gap-6">

          {/* Logo + Brand Name */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="group flex items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white uppercase tracking-[0.35em] transition-transform duration-300 hover:scale-[1.02]"
          >
            {/* Đã sửa: Thêm rounded-full và object-cover */}
            <img
              src="/logo/logo.png"
              alt="Đại Đồng Logo"
              className="w-12 h-12 rounded-full object-cover drop-shadow-[0_10px_20px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-110"
            />
            <span className="tracking-[0.1em]">
              Đại <span className="text-brand-gold">Đồng</span>
            </span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2 rounded-full border border-white/10 bg-white/40 dark:bg-white/5 px-3 py-1.5 backdrop-blur-xl shadow-[0_10px_30px_-20px_rgba(0,0,0,0.7)]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  activeSection === link.href.substring(1)
                    ? 'text-gray-900 dark:text-gray-50 bg-white/80 shadow-md shadow-brand-gold/30'
                    : 'text-gray-700 dark:text-gray-300 hover:text-brand-gold/90'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 dark:text-white focus:outline-none"
            >
              {isOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/90 dark:bg-[rgba(6,8,15,0.95)] backdrop-blur-xl border-t border-white/10 shadow-inner">
          <div className="flex flex-col items-center py-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`w-[85%] rounded-full px-4 py-3 text-center text-sm font-semibold transition-colors duration-300 ${
                  activeSection === link.href.substring(1)
                    ? 'bg-white/80 text-gray-900 shadow-inner'
                    : 'text-gray-700 dark:text-gray-200 hover:text-brand-gold'
                }`}
                onClick={(e) => handleLinkClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;