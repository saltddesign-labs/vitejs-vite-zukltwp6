import React from 'react';
import { QrCode, Globe } from 'lucide-react';
import { Button } from '../components/Button';

interface StartScreenProps {
  onStart: () => void;
  onLanguage: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart, onLanguage }) => {
  return (
    <div className="relative h-full w-full flex flex-col items-center justify-between p-12 bg-gradient-to-b from-brand-cream to-white overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-20 right-[-100px] w-[500px] h-[500px] rounded-full bg-brand-orange/5 blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-[-100px] w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-3xl" />

      {/* Header Logo */}
      <div className="w-full pt-8 animate-in slide-in-from-top-10 duration-700">
        <div className="flex items-center gap-4">
          <svg width="60" height="60" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 5C22.7614 5 25 7.23858 25 10C25 12.7614 22.7614 15 20 15C17.2386 15 15 12.7614 15 10C15 7.23858 17.2386 5 20 5Z" fill="#FF3C02"/>
            <path d="M20 25C22.7614 25 25 27.2386 25 30C25 32.7614 22.7614 35 20 35C17.2386 35 15 32.7614 15 30C15 27.2386 17.2386 25 20 25Z" fill="#FF3C02"/>
            <path d="M30 15C32.7614 15 35 17.2386 35 20C35 22.7614 32.7614 25 30 25C27.2386 25 25 22.7614 25 20C25 17.2386 27.2386 15 30 15Z" fill="#FF3C02"/>
            <path d="M10 15C12.7614 15 15 17.2386 15 20C15 22.7614 12.7614 25 10 25C7.23858 25 5 22.7614 5 20C5 17.2386 7.23858 15 10 15Z" fill="#FF3C02"/>
            <path d="M27.0711 7.92893C29.0237 9.88155 29.0237 13.0474 27.0711 15C25.1184 16.9526 21.9526 16.9526 20 15C21.9526 13.0474 25.1184 9.88155 27.0711 7.92893Z" fill="#FF3C02"/>
            <path d="M12.9289 7.92893C10.9763 9.88155 10.9763 13.0474 12.9289 15C14.8816 16.9526 18.0474 16.9526 20 15C18.0474 13.0474 14.8816 9.88155 12.9289 7.92893Z" fill="#FF3C02"/>
            <path d="M27.0711 32.0711C29.0237 30.1184 29.0237 26.9526 27.0711 25C25.1184 23.0474 21.9526 23.0474 20 25C21.9526 26.9526 25.1184 30.1184 27.0711 32.0711Z" fill="#FF3C02"/>
            <path d="M12.9289 32.0711C10.9763 30.1184 10.9763 26.9526 12.9289 25C14.8816 23.0474 18.0474 23.0474 20 25C18.0474 26.9526 14.8816 30.1184 12.9289 32.0711Z" fill="#FF3C02"/>
            <circle cx="20" cy="20" r="4" fill="#FF3C02"/>
          </svg>
          <span className="font-display font-bold text-4xl text-brand-dark tracking-tight">memocollect</span>
        </div>
      </div>

      {/* Hero Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center max-w-2xl z-10">
        <h1 className="font-display font-bold text-[72px] leading-[1.1] text-brand-dark mb-6 animate-in zoom-in-50 duration-700 delay-100">
          Create Your <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-purple-600">
            Perfect Memory
          </span>
        </h1>
        <p className="font-sans text-2xl text-brand-dark/60 mb-12 animate-in slide-in-from-bottom-8 duration-700 delay-200">
          Touch to begin your personalized souvenir journey
        </p>
        
        <div className="animate-in slide-in-from-bottom-12 duration-700 delay-300">
            <Button 
                onClick={onStart}
                className="w-80 h-24 text-2xl rounded-2xl shadow-xl shadow-brand-orange/40 hover:scale-105 active:scale-95"
            >
                Start Creating
            </Button>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="w-full flex justify-between items-end animate-in fade-in duration-1000 delay-500">
        {/* QR Card */}
        <div className="bg-white p-6 rounded-3xl shadow-soft flex flex-col items-center gap-4 border border-brand-dark/5">
          <div className="w-32 h-32 bg-brand-dark/5 rounded-xl flex items-center justify-center">
            <QrCode className="w-16 h-16 text-brand-dark/80" />
          </div>
          <span className="font-sans font-medium text-brand-dark text-lg">Scan to Login</span>
        </div>

        {/* Language */}
        <button 
          onClick={onLanguage}
          className="flex items-center gap-3 bg-white px-6 py-4 rounded-full shadow-soft border border-brand-dark/5 active:scale-95 transition-transform"
        >
          <Globe className="w-6 h-6 text-brand-dark" />
          <span className="font-sans font-semibold text-xl text-brand-dark">English</span>
        </button>
      </div>
    </div>
  );
};