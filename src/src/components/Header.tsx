import React from 'react';
import { Globe, ShoppingBag, User } from 'lucide-react';

interface HeaderProps {
  onLanguageClick: () => void;
  onLoginClick: () => void;
  isLoggedIn?: boolean;
  userName?: string;
  cartCount?: number;
}

export const Header: React.FC<HeaderProps> = ({ 
  onLanguageClick, 
  onLoginClick, 
  isLoggedIn, 
  userName,
  cartCount = 0 
}) => {
  return (
    <div className="sticky top-0 z-50 w-full">
      <div className="h-20 bg-white/95 backdrop-blur-md border-b border-brand-dark/5 px-6 flex items-center justify-between shadow-sm">
        {/* Logo */}
        <div className="flex items-center gap-3">
          {/* Custom SVG Logo Mark */}
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          <span className="font-display font-bold text-3xl text-brand-dark tracking-tight">
            memocollect
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onLoginClick}
            className="flex items-center gap-2 px-4 h-12 rounded-full bg-brand-cream text-brand-dark font-medium hover:bg-brand-orange/10 transition-colors"
          >
            <User className="w-5 h-5" />
            <span>{isLoggedIn ? userName : 'Log in'}</span>
          </button>

          <button 
            onClick={onLanguageClick}
            className="w-12 h-12 rounded-full border border-brand-dark/10 flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <Globe className="w-6 h-6 text-brand-dark" />
          </button>
          
          <div className="relative">
            <div className="w-12 h-12 bg-brand-dark text-white rounded-full flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
            </div>
            {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-orange text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
                    {cartCount}
                </span>
            )}
          </div>
        </div>
      </div>
      
      {/* Banner Strip */}
      <div className="bg-brand-secondary text-white py-2 px-6 text-center text-sm font-medium animate-in slide-in-from-top-4 fade-in duration-500">
        🎉 Free shipping on all orders over €50!
      </div>
    </div>
  );
};