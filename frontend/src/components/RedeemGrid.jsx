import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const RedeemGrid = ({ items, onRedeem, userCoins }) => {
  const [showQR, setShowQR] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleRedeem = (item) => {
    if (item.type === 'DISCOUNT') {
      const code = `SCU-REDEEM-${item.id}-${Date.now().toString().slice(-6)}`;
      setShowQR({ item, code });
      onRedeem(item.id); // Redeem immediately when showing QR
    } else {
      onRedeem(item.id);
    }
  };

  const handleCopy = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const typeIcons = {
    DISCOUNT: '🎫',
    LESSON_PACK: '📚',
    RAFFLE: '🎲',
    IMPACT: '💚'
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-100"
          >
            <div className="p-5">
              <div className="text-4xl mb-3">{typeIcons[item.type] || '🎁'}</div>
              <h3 className="font-semibold text-text-primary mb-2">{item.title}</h3>
              <p className="text-sm text-text-secondary mb-4">{item.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-secondary">
                  🪙 {item.costCoins} SoundCoins
                </span>
                <button
                  onClick={() => handleRedeem(item)}
                  disabled={userCoins < item.costCoins}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    userCoins >= item.costCoins
                      ? 'bg-accent-apply text-white hover:bg-accent-apply/90'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Redeem
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showQR && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowQR(null)}>
          <div className="bg-white rounded-xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-text-primary mb-2">🎁 Redeemed!</h3>
              <p className="text-sm text-text-secondary">{showQR.item.title}</p>
            </div>
            
            <div className="flex flex-col items-center gap-4">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <QRCodeSVG value={showQR.code} size={200} />
              </div>
              
              <div className="w-full">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Redemption Code:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={showQR.code}
                    readOnly
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-white font-mono text-sm"
                  />
                  <button
                    onClick={() => handleCopy(showQR.code)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      copied
                        ? 'bg-accent-apply text-white'
                        : 'bg-primary text-white hover:bg-primary/90'
                    }`}
                  >
                    {copied ? '✓ Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
              
              <button
                onClick={() => setShowQR(null)}
                className="w-full py-2 px-4 bg-gray-200 text-text-primary rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RedeemGrid;

