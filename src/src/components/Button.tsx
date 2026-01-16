import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  isLoading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading = false, 
  icon, 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "relative overflow-hidden rounded-xl font-display font-bold text-lg transition-all duration-300 ease-out active:scale-95 flex items-center justify-center gap-3";
  
  // Kiosk touch target size (min 60px height)
  const sizeStyles = "h-16 px-8";

  const variants = {
    primary: "bg-gradient-to-br from-brand-orange to-brand-secondary text-white shadow-lg shadow-brand-orange/30 hover:shadow-brand-orange/50 hover:brightness-110",
    secondary: "bg-white text-brand-dark border border-brand-dark/10 shadow-soft hover:bg-brand-cream",
    outline: "border-2 border-brand-orange text-brand-orange hover:bg-brand-orange/10",
    ghost: "text-brand-dark hover:bg-black/5",
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button 
      className={`${baseStyles} ${sizeStyles} ${variants[variant]} ${widthClass} ${className} ${isLoading ? 'opacity-80 cursor-wait' : ''}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-6 h-6 animate-spin" />
      ) : (
        <>
          {icon && <span className="w-6 h-6">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};