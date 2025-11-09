import React from 'react';

const SoundCoinsMeter = ({ coins, goal }) => {
  const percentage = Math.min((coins / goal) * 100, 100);
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-text-primary">SoundCoins Progress</h3>
        <span className="text-2xl font-bold text-secondary">🪙 {coins}</span>
      </div>
      <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-secondary to-accent-apply transition-all duration-500 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-xs text-text-secondary mt-2">Goal: 🪙 {goal}</p>
    </div>
  );
};

export default SoundCoinsMeter;

