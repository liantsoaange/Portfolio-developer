import React from 'react';

interface BadgeProps {
  id?: string;
  children: React.ReactNode;
  variant?: 'emerald' | 'blue' | 'purple' | 'amber' | 'rose' | 'slate' | 'info';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ id, children, variant = 'slate', className = '' }) => {
  const styles = {
    emerald: 'bg-brand-green/10 text-brand-green border-brand-green/25',
    blue: 'bg-brand-green/10 text-brand-green border-brand-green/25',
    purple: 'bg-brand-gold/15 text-brand-brown border-brand-gold/30',
    amber: 'bg-[#ebdcb9]/25 text-brand-brown border-[#ebdcb9]/45',
    rose: 'bg-[#ebdcb9]/15 text-brand-brown border-[#ebdcb9]/30',
    slate: 'bg-stone-100 text-brand-brown border-stone-200/60',
    info: 'bg-brand-green/10 text-brand-green border-brand-green/25',
  };

  return (
    <span
      id={id}
      className={`inline-flex items-center px-2.5 py-1 rounded-xl text-caption font-sans font-semibold border ${styles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
