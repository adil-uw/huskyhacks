import React, { useState, useEffect, useRef } from 'react';
import CryptoNavTabs from '../components/CryptoNavTabs';
import LessonCard from '../components/LessonCard';
import LessonModal from '../components/LessonModal';
import ConvertPanel from '../components/ConvertPanel';
import RedeemGrid from '../components/RedeemGrid';

const Crypto = ({ page, setPage, user, wallet, setWallet, lessonsData, redeemCatalog, handlers, showToast }) => {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const priceIntervalRef = useRef(null);
  const priceUpdateIntervalRef = useRef(null);

  // Price simulation for Training Wallet
  useEffect(() => {
    if (page === 'crypto-wallet') {
      // Update prices every 10 seconds
      priceIntervalRef.current = setInterval(() => {
        setWallet(prev => {
          const updated = { ...prev, holdings: prev.holdings.map(holding => {
            const randomDelta = (Math.random() * 0.016) - 0.008; // -0.008 to +0.008
            const newPrice = holding.price * (1 + randomDelta);
            const newChange24h = Math.max(-2.0, Math.min(2.0, holding.change24hPct + (Math.random() * 0.4 - 0.2)));
            return { ...holding, price: +newPrice.toFixed(2), change24hPct: +newChange24h.toFixed(2) };
          })};
          return updated;
        });
      }, 10000);

      // Log price update transaction every 60 seconds
      priceUpdateIntervalRef.current = setInterval(() => {
        handlers.logTransaction({
          type: "PRICE_UPDATE_NOTE",
          meta: { note: "Prices updated for education" }
        });
      }, 60000);
    }

    return () => {
      if (priceIntervalRef.current) clearInterval(priceIntervalRef.current);
      if (priceUpdateIntervalRef.current) clearInterval(priceUpdateIntervalRef.current);
    };
  }, [page, setWallet, handlers]);

  const handlePassQuiz = (lessonId, rewardCoins) => {
    handlers.completeLesson(lessonId);
    handlers.awardSoundCoins(rewardCoins, "Lesson");
    showToast("success", `🎓 +${rewardCoins} SoundCoins earned`);
  };

  const handleRedeem = (itemId) => {
    handlers.redeemItem(itemId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-text-primary mb-8">Crypto Learning & Wallet</h1>
      
      <CryptoNavTabs active={page} onChange={setPage} />

      {page === 'crypto-learning' && (
        <div>
          <div className="mb-6">
            <p className="text-text-secondary">
              Learn about cryptocurrency and blockchain technology. Complete lessons to earn SoundCoins!
            </p>
            <p className="text-sm text-text-secondary mt-2">
              Confidence Level: <span className="font-semibold text-primary">{user.cryptoConfidenceLevel}</span>
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessonsData.map((lesson) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                completed={user.lessonsCompleted[lesson.id]}
                onOpen={setSelectedLesson}
              />
            ))}
          </div>
        </div>
      )}

      {page === 'crypto-wallet' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold text-text-primary mb-4">Portfolio</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-text-primary">Token</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-text-primary">Holdings</th>
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

          <ConvertPanel
            wallet={wallet}
            userCoins={user.soundCoins}
            onConvert={handlers.convertCoinsToCrypto}
          />

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-text-primary mb-4">Recent Transactions</h2>
            {wallet.transactions.length === 0 ? (
              <p className="text-text-secondary text-center py-8">No transactions yet</p>
            ) : (
              <div className="space-y-3">
                {wallet.transactions.slice(0, 10).map((tx) => (
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
      )}

      {page === 'crypto-redeem' && (
        <div>
          <div className="mb-6">
            <p className="text-text-secondary">
              Redeem your SoundCoins for discounts, lessons, raffle entries, and impact donations.
            </p>
            <p className="text-sm text-text-secondary mt-2">
              Available: <span className="font-semibold text-secondary">🪙 {user.soundCoins} SoundCoins</span>
            </p>
          </div>
          <RedeemGrid
            items={redeemCatalog}
            onRedeem={handleRedeem}
            userCoins={user.soundCoins}
          />
        </div>
      )}

      {selectedLesson && (
        <LessonModal
          lesson={selectedLesson}
          completed={user.lessonsCompleted[selectedLesson.id]}
          onClose={() => setSelectedLesson(null)}
          onPassQuiz={handlePassQuiz}
        />
      )}
    </div>
  );
};

export default Crypto;

