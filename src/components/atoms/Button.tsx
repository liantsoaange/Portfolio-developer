import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'className'> {
  id?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  id,
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const baseStyle = 'inline-flex items-center justify-center font-sans font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-green/40 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer';
  
  const variants = {
    primary: 'bg-brand-green hover:bg-[#4b5a4f] active:bg-[#3d4a41] text-white font-semibold shadow-sm shadow-brand-green/10',
    secondary: 'bg-[#ede9e2] hover:bg-[#e2ddd3] active:bg-[#d5cfc2] text-brand-brown border border-[#ebdcb9]/50',
    outline: 'border border-brand-brown/30 hover:bg-[#ede9e2]/35 active:bg-[#ede9e2]/60 text-brand-brown',
    ghost: 'hover:bg-[#ede9e2]/25 text-brand-brown/70 hover:text-brand-brown',
    danger: 'bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-semibold',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-caption',
    md: 'px-4 py-2 text-body',
    lg: 'px-6 py-3 text-body',
    icon: 'p-2 rounded-lg',
  };

  return (
    <motion.button
      id={id}
      type="button"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};
