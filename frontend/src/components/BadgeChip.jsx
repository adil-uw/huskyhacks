import React from 'react';

const BadgeChip = ({ text, variant = 'default' }) => {
  const variants = {
    default: 'bg-secondary/10 text-secondary',
    success: 'bg-accent-apply/10 text-accent-apply',
    warning: 'bg-warning/10 text-warning',
    info: 'bg-accent-donate/10 text-accent-donate'
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${variants[variant]}`}>
      {text}
    </span>
  );
};

export default BadgeChip;

