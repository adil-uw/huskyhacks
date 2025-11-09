import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import OrderPanel from './OrderPanel';
import PositionsTable from './PositionsTable';
import CompetitionLeaderboardList from './CompetitionLeaderboardList';

const CompetitionDetailsModal = ({ 
  comp, 
  entry, 
  priceGetter, 
  historyGetter, 
  onClose, 
  onJoin, 
  onPlaceOrder, 
  onPostROI, 
  leaderboard,
  market,
  userSoundCoins
}) => {
  const [selectedSymbol, setSelectedSymbol] = useState(comp.symbolForChart || "BTC");
  const [selectedEntryMethod, setSelectedEntryMethod] = useState(
    comp.entryOptions && comp.entryOptions.length > 0 ? comp.entryOptions[0].type : null
  );
  
  const getStatusBadge = (status) => {
    const variants = {
      UPCOMING: { text: 'Upcoming', color: 'bg-gray-200 text-gray-700' },
      LIVE: { text: 'Live', color: 'bg-accent-apply text-white' },
      ENDED: { text: 'Ended', color: 'bg-gray-400 text-white' }
    };
    const variant = variants[status] || variants.UPCOMING;
    return <span className={`px-3 py-1 rounded-full text-xs font-medium ${variant.color}`}>{variant.text}</span>;
  };

  const history = historyGetter(selectedSymbol);
  const chartData = history.map(point => ({
    time: new Date(point.t).toLocaleTimeString(),
    price: point.p
  }));

  const lastPrice = priceGetter(selectedSymbol);
  const historyPrices = history.map(h => h.p);
  const high24h = historyPrices.length > 0 ? Math.max(...historyPrices) : lastPrice;
  const low24h = historyPrices.length > 0 ? Math.min(...historyPrices) : lastPrice;
  const change24h = historyPrices.length > 1 ? ((lastPrice - historyPrices[0]) / historyPrices[0]) * 100 : 0;

  const calculateROI = () => {
    if (!entry || entry.seedCash === 0) return 0;
    let positionsValue = 0;
    entry.positions.forEach(pos => {
      const mktPrice = priceGetter(pos.symbol);
      positionsValue += mktPrice * pos.qty;
    });
    const totalEquity = entry.currentCash + positionsValue;
    return ((totalEquity - entry.seedCash) / entry.seedCash) * 100;
  };

  const handlePostROI = () => {
    const roiPct = calculateROI();
    onPostROI(comp.id, { roiPct });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b p-6 z-10">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-2">{comp.title}</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-text-secondary">Sponsored by</span>
                  <span className="text-sm font-semibold text-primary">{comp.sponsorLogo} {comp.sponsor}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {getStatusBadge(comp.status)}
                <button
                  onClick={onClose}
                  className="text-text-secondary hover:text-text-primary text-2xl"
                >
                  ×
                </button>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left: Chart */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Asset</label>
                  <select
                    value={selectedSymbol}
                    onChange={(e) => setSelectedSymbol(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  >
                    {market.symbols.map(symbol => (
                      <option key={symbol} value={symbol}>{symbol}</option>
                    ))}
                  </select>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="time" 
                        tick={{ fontSize: 10 }}
                        interval="preserveStartEnd"
                      />
                      <YAxis 
                        tick={{ fontSize: 10 }}
                        domain={['auto', 'auto']}
                      />
                      <Tooltip 
                        formatter={(value) => [`$${value.toLocaleString()}`, 'Price']}
                        labelFormatter={(label) => `Time: ${label}`}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="price" 
                        stroke="#00B3B0" 
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-background rounded-lg p-3">
                    <div className="text-xs text-text-secondary mb-1">Last Price</div>
                    <div className="text-lg font-bold text-text-primary">${lastPrice.toLocaleString()}</div>
                  </div>
                  <div className="bg-background rounded-lg p-3">
                    <div className="text-xs text-text-secondary mb-1">24h Change</div>
                    <div className={`text-lg font-bold ${change24h >= 0 ? 'text-accent-apply' : 'text-red-500'}`}>
                      {change24h >= 0 ? '+' : ''}{change24h.toFixed(2)}%
                    </div>
                  </div>
                  <div className="bg-background rounded-lg p-3">
                    <div className="text-xs text-text-secondary mb-1">24h High</div>
                    <div className="text-lg font-bold text-text-primary">${high24h.toLocaleString()}</div>
                  </div>
                  <div className="bg-background rounded-lg p-3">
                    <div className="text-xs text-text-secondary mb-1">24h Low</div>
                    <div className="text-lg font-bold text-text-primary">${low24h.toLocaleString()}</div>
                  </div>
                </div>
              </div>

              {/* Right: Competition Info */}
              <div className="space-y-4">
                <div className="bg-background rounded-xl p-4">
                  <h3 className="font-bold text-text-primary mb-3">Competition Info</h3>
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-text-secondary">Entry Options:</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {comp.entryOptions.map((option, idx) => (
                          <span key={idx} className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-background text-xs font-medium">
                            {option.type === 'SOUNDCOINS' ? '🪙' : '💳'} {option.type === 'SOUNDCOINS' ? `${option.cost} SoundCoins` : `$${option.cost}`}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-text-secondary">Prize:</span>
                      <div className="font-semibold text-accent-apply mt-1">${comp.prizeUsd}</div>
                    </div>
                    
                    <div>
                      <span className="text-text-secondary">Schedule:</span>
                      <div className="mt-1">
                        <div className="text-text-primary">Starts: {new Date(comp.startsAt).toLocaleString()}</div>
                        <div className="text-text-primary">Ends: {new Date(comp.endsAt).toLocaleString()}</div>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-text-secondary">Description:</span>
                      <div className="text-text-primary mt-1">{comp.description}</div>
                    </div>
                    
                    <div>
                      <span className="text-text-secondary">Rules:</span>
                      <ul className="list-disc list-inside mt-1 space-y-1">
                        {comp.rules.map((rule, idx) => (
                          <li key={idx} className="text-text-primary text-xs">{rule}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {!entry && comp.status !== 'ENDED' && (
                    <div className="mt-4 space-y-3">
                      <div>
                        <h4 className="text-sm font-semibold text-text-primary mb-2">Choose Entry Method</h4>
                        <div className="space-y-2">
                          {comp.entryOptions.map((option, idx) => (
                            <label
                              key={idx}
                              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                                selectedEntryMethod === option.type
                                  ? 'border-primary bg-primary/5'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <input
                                type="radio"
                                name="entryMethod"
                                value={option.type}
                                checked={selectedEntryMethod === option.type}
                                onChange={() => setSelectedEntryMethod(option.type)}
                                className="w-4 h-4 text-primary"
                              />
                              <div className="flex-1">
                                <div className="font-medium text-text-primary">
                                  {option.type === 'SOUNDCOINS' ? '🪙' : '💳'} {option.type === 'SOUNDCOINS' ? `${option.cost} SoundCoins` : `$${option.cost}`}
                                </div>
                                <div className="text-xs text-text-secondary mt-0.5">
                                  {option.type === 'SOUNDCOINS' ? 'Uses your SoundCoins balance.' : 'Real money entry fee. You will be charged $' + option.cost + '.'}
                                </div>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          if (!selectedEntryMethod) {
                            return;
                          }
                          const option = comp.entryOptions.find(opt => opt.type === selectedEntryMethod);
                          if (option) {
                            onJoin(comp.id, { method: option.type, cost: option.cost });
                          }
                        }}
                        disabled={!selectedEntryMethod}
                        className="w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Join Competition
                      </button>
                    </div>
                  )}
                </div>

                {/* Account Section (if joined & LIVE) */}
                {entry && comp.status === 'LIVE' && (
                  <div className="bg-accent-apply/10 border border-accent-apply/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm font-semibold text-accent-apply">Competition Account</span>
                    </div>
                    <p className="text-xs text-text-secondary mb-4">Seeded virtual cash for trading. Entry fee was real money.</p>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Cash:</span>
                        <span className="font-semibold">${entry.currentCash.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Seed Cash:</span>
                        <span className="font-semibold">${entry.seedCash.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm border-t pt-2">
                        <span className="text-text-primary font-semibold">Current ROI:</span>
                        <span className={`font-bold ${calculateROI() >= 0 ? 'text-accent-apply' : 'text-red-500'}`}>
                          {calculateROI() >= 0 ? '+' : ''}{calculateROI().toFixed(2)}%
                        </span>
                      </div>
                    </div>

                    <PositionsTable positions={entry.positions} getPrice={priceGetter} />

                    <div className="mt-4">
                      <OrderPanel 
                        symbol={selectedSymbol}
                        onSubmit={(order) => onPlaceOrder(comp.id, order)} 
                      />
                    </div>

                    <button
                      onClick={handlePostROI}
                      className="w-full mt-4 py-2 px-4 bg-accent-donate text-white rounded-lg hover:bg-accent-donate/90 transition-colors font-medium"
                    >
                      Post ROI to Competition Leaderboard
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Per-Competition Leaderboard */}
            <div className="bg-background rounded-xl p-4">
              <h3 className="font-bold text-text-primary mb-3">Leaderboard — {comp.title}</h3>
              <CompetitionLeaderboardList entries={leaderboard} />
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white border-t p-4 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 text-text-primary rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitionDetailsModal;

