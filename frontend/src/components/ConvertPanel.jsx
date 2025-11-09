import React, { useState } from 'react';

const ConvertPanel = ({ wallet, userCoins, onConvert }) => {
  const [selectedToken, setSelectedToken] = useState('BTC');
  const [coinAmount, setCoinAmount] = useState('');

  const handleConvert = () => {
    const amount = Number(coinAmount);
    if (amount > 0 && amount <= userCoins) {
      onConvert({ tokenSymbol: selectedToken, coinAmount: amount });
      setCoinAmount('');
    }
  };

  const usdValue = coinAmount ? Number(coinAmount) * wallet.coinToUsdRate : 0;
  const selectedHolding = wallet.holdings.find(h => h.symbol === selectedToken);
  const tokenQty = selectedHolding && usdValue > 0 ? (usdValue / selectedHolding.price).toFixed(6) : '0';

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-bold text-text-primary mb-4">Convert SoundCoins to Crypto</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Select Token
          </label>
          <select
            value={selectedToken}
            onChange={(e) => setSelectedToken(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
          >
            {wallet.holdings.map((holding) => (
              <option key={holding.symbol} value={holding.symbol}>
                {holding.symbol} - {holding.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            SoundCoins Amount
          </label>
          <input
            type="number"
            value={coinAmount}
            onChange={(e) => setCoinAmount(e.target.value)}
            min="1"
            max={userCoins}
            placeholder={`Max: ${userCoins}`}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
          />
          <p className="text-xs text-text-secondary mt-1">
            Available: 🪙 {userCoins} SoundCoins
          </p>
        </div>

        {coinAmount && Number(coinAmount) > 0 && (
          <div className="bg-background rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-text-secondary">🪙 {coinAmount} SoundCoins</span>
              <span className="text-lg">→</span>
              <span className="text-sm font-semibold text-text-primary">${usdValue.toFixed(2)} USD</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-secondary">≈</span>
              <span className="text-sm font-semibold text-accent-apply">
                {tokenQty} {selectedToken}
              </span>
            </div>
          </div>
        )}

        <button
          onClick={handleConvert}
          disabled={!coinAmount || Number(coinAmount) <= 0 || Number(coinAmount) > userCoins}
          className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
            coinAmount && Number(coinAmount) > 0 && Number(coinAmount) <= userCoins
              ? 'bg-accent-apply text-white hover:bg-accent-apply/90'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Convert
        </button>
      </div>
    </div>
  );
};

export default ConvertPanel;

