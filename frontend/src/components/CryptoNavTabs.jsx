import React from 'react';

const CryptoNavTabs = ({ active, onChange }) => {
  const tabs = [
    { id: 'crypto-learning', label: 'Learning Vault' },
    { id: 'crypto-wallet', label: 'Training Wallet' },
    { id: 'crypto-redeem', label: 'Redeem' }
  ];

  return (
    <div className="flex gap-2 mb-6 border-b">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-6 py-3 font-medium transition-colors ${
            active === tab.id
              ? 'border-b-2 border-secondary text-secondary'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default CryptoNavTabs;

