import React from 'react';
import FacebookIcon from './icons/FacebookIcon';
import DiscordIcon from './icons/DiscordIcon';
import YoutubeIcon from './icons/YoutubeIcon';

const Footer: React.FC = () => {
  return (
    <footer className="relative overflow-hidden bg-[#03040a] border-t border-white/10 text-gray-300">
      <div className="pointer-events-none absolute inset-0">
        <span className="absolute left-12 top-8 h-48 w-48 rounded-full bg-brand-gold/10 blur-3xl opacity-70"></span>
        <span className="absolute right-10 bottom-0 h-52 w-52 rounded-full bg-emerald-500/10 blur-3xl opacity-60"></span>
      </div>

      <div className="container relative mx-auto px-6 py-16">
        <div className="flex flex-col items-center text-center">
          <a
            href="#home"
            className="group mb-10 flex items-center gap-4 rounded-full border border-white/10 bg-white/5 px-6 py-3 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1"
          >
            <img
              src="/logo/logo.png"
              alt="Lenin Card Logo"
              className="h-14 w-14 object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:scale-110"
            />
            <span className="text-sm font-semibold uppercase tracking-[0.4em] text-white">
              LENIN  <span className="text-brand-gold">CARD</span>
            </span>
          </a>

          <p className="max-w-2xl text-sm text-gray-300/90">
            Chiến lược, tri thức và cảm hứng triết học – chúng tôi kiến tạo một hệ sinh thái game nơi tư duy dẫn lối mọi chiến thắng.
          </p>

          <div className="mt-10 flex items-center gap-10">
            <a href="#" aria-label="Facebook" className="rounded-full border border-white/10 bg-white/5 p-3 text-gray-200 transition-all duration-300 hover:border-brand-gold/50 hover:text-brand-gold">
              <FacebookIcon className="h-6 w-6" />
            </a>
            <a href="#" aria-label="Discord" className="rounded-full border border-white/10 bg-white/5 p-3 text-gray-200 transition-all duration-300 hover:border-brand-gold/50 hover:text-brand-gold">
              <DiscordIcon className="h-6 w-6" />
            </a>
            <a href="#" aria-label="YouTube" className="rounded-full border border-white/10 bg-white/5 p-3 text-gray-200 transition-all duration-300 hover:border-brand-gold/50 hover:text-brand-gold">
              <YoutubeIcon className="h-6 w-6" />
            </a>
          </div>

          <div className="mt-12 text-xs uppercase tracking-[0.35em] text-brand-gold/70">
            &copy; {new Date().getFullYear()} Lenin Card • All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
