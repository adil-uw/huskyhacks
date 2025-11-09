import React from 'react';

const PositionsTable = ({ positions, getPrice }) => {
  if (positions.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-text-primary mb-4">Positions</h3>
        <p className="text-text-secondary text-center py-8">No open positions</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-bold text-text-primary mb-4">Positions</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 text-sm font-semibold text-text-primary">Symbol</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-text-primary">Quantity</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-text-primary">Avg Price</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-text-primary">Market Price</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-text-primary">Value</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-text-primary">Unrealized P/L</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((pos) => {
                const mktPrice = getPrice(pos.symbol);
                const value = mktPrice * pos.qty;
                const unrealizedPnl = (mktPrice - pos.avgPrice) * pos.qty;
                return (
                  <tr key={pos.symbol} className="border-b hover:bg-background">
                    <td className="py-3 px-4 font-semibold text-text-primary">{pos.symbol}</td>
                    <td className="text-right py-3 px-4 font-mono text-sm">{pos.qty}</td>
                    <td className="text-right py-3 px-4 text-sm">${pos.avgPrice.toLocaleString()}</td>
                    <td className="text-right py-3 px-4 text-sm">${mktPrice.toLocaleString()}</td>
                    <td className="text-right py-3 px-4 font-semibold">${value.toFixed(2)}</td>
                    <td className={`text-right py-3 px-4 font-semibold ${
                      unrealizedPnl >= 0 ? 'text-accent-apply' : 'text-red-500'
                    }`}>
                      {unrealizedPnl >= 0 ? '+' : ''}${unrealizedPnl.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PositionsTable;

