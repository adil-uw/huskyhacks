import React from 'react';

const NavBar = ({ currentPage, onNavigate }) => {
  return (
    <nav className="bg-primary text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <div className="text-2xl">🏦</div>
            <h1 className="text-xl font-bold">Perks & Impact</h1>
            <span className="text-sm opacity-75">Sound Credit Union</span>
          </div>

          <div className="flex items-center gap-6">
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

