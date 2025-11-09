import React from 'react';

const WalletOverview = ({ user, wallet }) => {
  const totalCryptoValue = wallet.holdings.reduce((sum, holding) => {
    return sum + (holding.amount * holding.price);
  }, 0);

  const recentTransactions = wallet.transactions.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Balances Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-sm text-text-secondary mb-2">SoundCoins</div>
          <div className="text-2xl font-bold text-secondary">🪙 {user.soundCoins}</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-sm text-text-secondary mb-2">Total Crypto Value</div>
          <div className="text-2xl font-bold text-text-primary">${totalCryptoValue.toFixed(2)}</div>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-bold text-text-primary mb-4">Holdings</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-text-primary">Token</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-text-primary">Amount</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-text-primary">Price</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-text-primary">Value</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-text-primary">24h Change</th>
                </tr>
              </thead>
              <tbody>
                {wallet.holdings.map((holding) => {
                  const value = holding.amount * holding.price;
                  return (
                    <tr key={holding.symbol} className="border-b hover:bg-background">
                      <td className="py-3 px-4">
                        <div className="font-semibold text-text-primary">{holding.symbol}</div>
                        <div className="text-xs text-text-secondary">{holding.name}</div>
                      </td>
                      <td className="text-right py-3 px-4 font-mono text-sm">{holding.amount}</td>
                      <td className="text-right py-3 px-4 text-sm">${holding.price.toLocaleString()}</td>
                      <td className="text-right py-3 px-4 font-semibold">${value.toFixed(2)}</td>
                      <td className={`text-right py-3 px-4 text-sm font-semibold ${
                        holding.change24hPct >= 0 ? 'text-accent-apply' : 'text-red-500'
                      }`}>
                        {holding.change24hPct >= 0 ? '+' : ''}{holding.change24hPct.toFixed(2)}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-text-primary mb-4">Recent Transactions</h2>
        {recentTransactions.length === 0 ? (
          <p className="text-text-secondary text-center py-8">No transactions yet</p>
        ) : (
          <div className="space-y-3">
            {recentTransactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-3 bg-background rounded-lg">
                <div>
                  <div className="font-medium text-text-primary">{tx.type}</div>
                  <div className="text-xs text-text-secondary">
                    {new Date(tx.ts).toLocaleString()}
                  </div>
                  {tx.meta && Object.keys(tx.meta).length > 0 && (
                    <div className="text-xs text-text-secondary mt-1">
                      {Object.entries(tx.meta).map(([key, value]) => (
                        <span key={key} className="mr-3">
                          {key}: {typeof value === 'object' ? JSON.stringify(value) : value}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletOverview;

