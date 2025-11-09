import React from 'react';

const CryptoQuickStart = ({ onStartLesson, onOpenWallet, onRedeem }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
      <h2 className="text-xl font-bold text-text-primary mb-4">Crypto Quick Start</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={onStartLesson}
          className="px-4 py-3 bg-gradient-to-r from-secondary to-accent-apply text-white rounded-lg font-medium hover:opacity-90 transition-all text-center"
        >
          📚 Start Lesson
        </button>
        <button
          onClick={onOpenWallet}
          className="px-4 py-3 bg-gradient-to-r from-accent-donate to-secondary text-white rounded-lg font-medium hover:opacity-90 transition-all text-center"
        >
          💼 Open Wallet
        </button>
        <button
          onClick={onRedeem}
          className="px-4 py-3 bg-gradient-to-r from-accent-apply to-accent-donate text-white rounded-lg font-medium hover:opacity-90 transition-all text-center"
        >
          🎁 Redeem
        </button>
      </div>
    </div>
  );
};

export default CryptoQuickStart;

