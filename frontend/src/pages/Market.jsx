import React from 'react';
import MarketDashboard from '../components/MarketDashboard';

const Market = ({ market, practice, setPractice, onSelectSymbol, onPlaceOrder, getLastPrice }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-text-primary mb-8">Market</h1>
      <MarketDashboard
        market={market}
        practice={practice}
        onSelectSymbol={onSelectSymbol}
        onPlaceOrder={onPlaceOrder}
        getLastPrice={getLastPrice}
      />
    </div>
  );
};

export default Market;

