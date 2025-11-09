import React from 'react';

const NavBar = ({ currentPage, onNavigate, soundCoins = 0 }) => {
  const isCryptoPage = currentPage === 'crypto-learning' || currentPage === 'crypto-wallet' || currentPage === 'crypto-redeem';
  
  return (
    <nav className="bg-primary text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <div className="text-2xl">🏦</div>
            <h1 className="text-xl font-bold">Sound Loop</h1>
            <span className="text-sm opacity-75">Sound Credit Union</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('dashboard')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentPage === 'dashboard'
                  ? 'bg-white/20 font-semibold'
                  : 'hover:bg-white/10'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => onNavigate('marketplace')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentPage === 'marketplace'
                  ? 'bg-white/20 font-semibold'
                  : 'hover:bg-white/10'
              }`}
            >
              Marketplace
            </button>
            <button
              onClick={() => onNavigate('crypto-learning')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                isCryptoPage
                  ? 'bg-white/20 font-semibold'
                  : 'hover:bg-white/10'
              }`}
            >
              Crypto
            </button>
            <button
              onClick={() => onNavigate('wallet')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentPage === 'wallet'
                  ? 'bg-white/20 font-semibold'
                  : 'hover:bg-white/10'
              }`}
            >
              Wallet
            </button>
            <button
              onClick={() => onNavigate('market')}
              className={`px-4 py-2 rounded-lg transition-colors relative ${
                currentPage === 'market'
                  ? 'bg-white/20 font-semibold'
                  : 'hover:bg-white/10'
              }`}
            >
              Market
              <span className="absolute -top-1 -right-1 text-xs bg-accent-apply text-white px-1.5 py-0.5 rounded-full font-bold">FREE</span>
            </button>
            <button
              onClick={() => onNavigate('competitions')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentPage === 'competitions'
                  ? 'bg-white/20 font-semibold'
                  : 'hover:bg-white/10'
              }`}
            >
              Competitions
            </button>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-white text-sm font-medium">
              🪙 {soundCoins}
            </div>
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-semibold">
              A
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

