import React from 'react';
import { Github, Twitter, Instagram, Linkedin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-neon-green rounded flex items-center justify-center">
            <div className="w-3 h-3 bg-dark-bg rounded-sm rotate-45" />
          </div>
          <span className="text-xl font-bold">Habito</span>
        </div>

        <div className="flex items-center gap-8 text-sm text-white/40">
          <a href="#" className="hover:text-neon-green transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-neon-green transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-neon-green transition-colors">Contact</a>
        </div>

        <div className="flex items-center gap-4">
          {[Twitter, Instagram, Github, Linkedin].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-neon-green hover:text-dark-bg hover:border-neon-green transition-all"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
      <div className="text-center mt-8 text-xs text-white/20">
        © 2026 Habito. All rights reserved. Built for the disciplined.
      </div>
    </footer>
  );
};
