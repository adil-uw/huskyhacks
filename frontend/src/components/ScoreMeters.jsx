import React from 'react';

export const SavingsGauge = ({ value, target }) => {
  const percentage = Math.min((value / target) * 100, 100);
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-text-primary">Savings Gauge</h3>
        <span className="text-2xl font-bold text-accent-apply">${value}</span>
      </div>
      <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-accent-apply to-secondary transition-all duration-500 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-xs text-text-secondary mt-2">Target: ${target}</p>
    </div>
  );
};

export const ImpactProgress = ({ value, target }) => {
  const percentage = Math.min((value / target) * 100, 100);
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-text-primary">Community Impact</h3>
        <span className="text-2xl font-bold text-accent-donate">${value}</span>
      </div>
      <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-accent-donate to-secondary transition-all duration-500 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-xs text-text-secondary mt-2">Goal: ${target}</p>
    </div>
  );
};

