import React from 'react';

export const Badge = ({ children, variant = 'gray' }) => {
  const variants = {
    red: 'bg-red-50 text-red-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    gray: 'bg-gray-100 text-gray-600',
    green: 'bg-green-50 text-green-600',
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
  };

  return (
    <span className={`px-2 py-0.5 text-[11px] font-semibold rounded-md ${variants[variant] || variants.gray}`}>
      {children}
    </span>
  );
};