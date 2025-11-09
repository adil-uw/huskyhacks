import React, { useState } from 'react';
import PriceChart from './PriceChart';
import OrderPanel from './OrderPanel';
import PositionsTable from './PositionsTable';

const MarketDashboard = ({ market, practice, onSelectSymbol, onPlaceOrder, getLastPrice }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const selectedHistory = market.histories[practice.selectedSymbol] || [];
  const lastPrice = getLastPrice(practice.selectedSymbol);
  const historyPrices = selectedHistory.map(h => h.p);
  const high24h = historyPrices.length > 0 ? Math.max(...historyPrices) : lastPrice;
  const low24h = historyPrices.length > 0 ? Math.min(...historyPrices) : lastPrice;
  const change24h = historyPrices.length > 1 ? ((lastPrice - historyPrices[0]) / historyPrices[0]) * 100 : 0;

  let positionsValue = 0;
  practice.positions.forEach(pos => {
    const mktPrice = getLastPrice(pos.symbol);
    positionsValue += mktPrice * pos.qty;
  });
  const totalEquity = practice.currentCash + positionsValue;

  const top3Symbols = market.symbols.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Training Mode Header */}
      <div className="bg-gradient-to-r from-accent-apply/10 to-secondary/10 rounded-xl p-4 border-2 border-accent-apply/20">
        <h2 className="text-xl font-bold text-text-primary mb-1">Training Mode (Free)</h2>
        <p className="text-sm text-text-secondary">Practice trading with virtual USD. No SoundCoins required.</p>
      </div>

      {/* Asset Selector */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-text-primary">Asset</label>
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Dropdown */}
          <div className="relative flex-1">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-left flex items-center justify-between hover:border-secondary transition-colors shadow-sm"
            >
              <span className="font-medium text-text-primary">{practice.selectedSymbol}</span>
              <svg className={`w-5 h-5 text-text-secondary transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {dropdownOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)}></div>
                <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {market.symbols.map((symbol) => (
                    <button
                      key={symbol}
                      onClick={() => {
                        onSelectSymbol(symbol);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-background transition-colors ${
                        practice.selectedSymbol === symbol ? 'bg-secondary/10 font-semibold' : ''
                      }`}
                    >
                      {symbol}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          
          {/* Quick Select Pills (Top 3) */}
          <div className="flex gap-2">
            {top3Symbols.map((symbol) => (
              <button
                key={symbol}
                onClick={() => onSelectSymbol(symbol)}
                className={`px-4 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  practice.selectedSymbol === symbol
                    ? 'bg-secondary text-white'
                    : 'bg-white text-text-secondary hover:bg-gray-100 shadow-sm'
                }`}
              >
                {symbol}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Price Chart */}
      <PriceChart data={selectedHistory} />

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="text-sm text-text-secondary mb-1">Last Price</div>
          <div className="text-xl font-bold text-text-primary">${lastPrice.toLocaleString()}</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="text-sm text-text-secondary mb-1">24h Change</div>
          <div className={`text-xl font-bold ${change24h >= 0 ? 'text-accent-apply' : 'text-red-500'}`}>
            {change24h >= 0 ? '+' : ''}{change24h.toFixed(2)}%
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="text-sm text-text-secondary mb-1">24h High</div>
          <div className="text-xl font-bold text-text-primary">${high24h.toLocaleString()}</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="text-sm text-text-secondary mb-1">24h Low</div>
          <div className="text-xl font-bold text-text-primary">${low24h.toLocaleString()}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Order Panel */}
        <OrderPanel symbol={practice.selectedSymbol} onSubmit={onPlaceOrder} />

        {/* Equity Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-text-primary mb-4">Practice Account</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-text-secondary">Cash USD</span>
              <span className="font-semibold">${practice.currentCash.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Positions Value</span>
              <span className="font-semibold">${positionsValue.toFixed(2)}</span>
            </div>
            <div className="border-t pt-3 flex justify-between">
              <span className="text-text-primary font-semibold">Total Equity</span>
              <span className="font-bold text-lg">${totalEquity.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Total P&L</span>
              <span className={`font-semibold ${practice.totalPnl >= 0 ? 'text-accent-apply' : 'text-red-500'}`}>
                {practice.totalPnl >= 0 ? '+' : ''}${practice.totalPnl.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Positions Table */}
      <PositionsTable positions={practice.positions} getPrice={getLastPrice} />
    </div>
  );
};

export default MarketDashboard;

