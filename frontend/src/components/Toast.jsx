import React, { useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: '✅',
    info: 'ℹ️',
    error: '❌'
  };

  const bgColors = {
    success: 'bg-accent-apply',
    info: 'bg-accent-donate',
    error: 'bg-red-500'
  };

  return (
    <div className={`fixed top-4 right-4 ${bgColors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2 animate-slide-in`}>
      <span>{icons[type]}</span>
      <span className="font-medium">{message}</span>
      <button onClick={onClose} className="ml-4 text-white hover:text-gray-200">
        ×
      </button>
    </div>
  );
};

export default Toast;

