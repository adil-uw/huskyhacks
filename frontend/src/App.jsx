import React, { useState, useEffect, useRef } from 'react';
import NavBar from './components/NavBar';
import Dashboard from './pages/Dashboard';
import Marketplace from './pages/Marketplace';
import Crypto from './pages/Crypto';
import Wallet from './pages/Wallet';
import Market from './pages/Market';
import CompetitionsPage from './pages/CompetitionsPage';
import ChatbotWidget from './components/ChatbotWidget';
import Toast from './components/Toast';
import { userData, walletData, lessonsData, redeemCatalog, marketData, practiceAccount, competitionsData, competitionsState, usStates } from './data/mockData';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [toast, setToast] = useState(null);
  const [userState, setUserState] = useState(userData);
  const [wallet, setWallet] = useState(walletData);
  const [market, setMarket] = useState(marketData);
  const [practice, setPractice] = useState(practiceAccount);
  const [competitions, setCompetitions] = useState(competitionsState);
  const [selectedCompetitionId, setSelectedCompetitionId] = useState(null);
  const tickIntervalRef = useRef(null);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const handleApplyOffer = (offer) => {
    // In a real app, this would update the backend
    console.log('Offer applied:', offer);
    // Update user state if needed
  };

  const handleDonate = (cause, amount) => {
    // In a real app, this would update the backend
    console.log('Donated:', cause, amount);
    setUserState(prev => ({
      ...prev,
      donated: prev.donated + amount
    }));
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  // Award SoundCoins
  function awardSoundCoins(amount, reason) {
    setUserState(prev => {
      const next = { ...prev, soundCoins: Math.max(0, prev.soundCoins + amount) };
      return next;
    });
    logTransaction({ type: "COIN_AWARD", meta: { amount, reason } });
    showToast("success", `🪙 +${amount} SoundCoins ${reason ? `(${reason})` : ""}`);
  }

  // Complete a lesson
  function completeLesson(lessonId) {
    setUserState(prev => {
      if (prev.lessonsCompleted[lessonId]) return prev; // already done
      const lessonsCompleted = { ...prev.lessonsCompleted, [lessonId]: true };
      const count = Object.values(lessonsCompleted).filter(Boolean).length;
      const cryptoConfidenceLevel =
        count >= 4 ? "Advanced" : count >= 2 ? "Intermediate" : "Beginner";
      return { ...prev, lessonsCompleted, cryptoConfidenceLevel };
    });
  }

  // Convert SoundCoins → mock crypto
  function convertCoinsToCrypto({ tokenSymbol, coinAmount }) {
    if (coinAmount <= 0 || userState.soundCoins < coinAmount) {
      showToast("error", "Invalid amount or insufficient SoundCoins.");
      return;
    }
    const usdValue = coinAmount * wallet.coinToUsdRate;

    setUserState(prev => ({ ...prev, soundCoins: prev.soundCoins - coinAmount }));
    setWallet(prev => {
      const next = { ...prev, holdings: prev.holdings.map(h => ({ ...h })) };
      const target = next.holdings.find(h => h.symbol === tokenSymbol);
      if (!target) return prev;
      const tokenQty = usdValue / target.price;
      target.amount = +(target.amount + tokenQty).toFixed(6);
      return next;
    });

    logTransaction({
      type: "CONVERT_TO_CRYPTO",
      meta: { token: tokenSymbol, coins: coinAmount, valueUsd: +usdValue.toFixed(2) }
    });

    showToast("success", `✅ Converted ${coinAmount} SoundCoins → ${tokenSymbol} (mock)`);
  }

  // Redeem item
  function redeemItem(itemId) {
    const item = redeemCatalog.find(r => r.id === itemId);
    if (!item) return;
    if (userState.soundCoins < item.costCoins) {
      showToast("error", "Not enough SoundCoins.");
      return;
    }
    setUserState(prev => ({ ...prev, soundCoins: prev.soundCoins - item.costCoins }));
    logTransaction({ type: "REDEEM", meta: { itemId: item.id, title: item.title, cost: item.costCoins }});
    showToast("success", `🎁 Redeemed: ${item.title}`);
  }

  // Log transaction
  function logTransaction({ type, meta }) {
    const entry = { id: Date.now().toString(), type, ts: new Date().toISOString(), meta: meta || {} };
    setWallet(prev => {
      const tx = [entry, ...prev.transactions].slice(0, 50);
      return { ...prev, transactions: tx };
    });
  }

  // Get last price for a symbol
  function getLastPrice(symbol) {
    const history = market.histories[symbol];
    if (!history || history.length === 0) return 0;
    return history[history.length - 1].p;
  }

  function getHistory(symbol) {
    return market.histories[symbol] || [];
  }

  // Price tick - updates prices every ~10s
  useEffect(() => {
    const tick = () => {
      // Update wallet holdings prices
      setWallet(prev => ({
        ...prev,
        holdings: prev.holdings.map(holding => {
          const randomDelta = (Math.random() * 0.016) - 0.008; // -0.8% to +0.8%
          const newPrice = holding.price * (1 + randomDelta);
          const newChange24h = Math.max(-2.0, Math.min(2.0, holding.change24hPct + (Math.random() * 0.4 - 0.2)));
          return { ...holding, price: +newPrice.toFixed(2), change24hPct: +newChange24h.toFixed(2) };
        })
      }));

      // Update market history and practice/competition P&L
      setMarket(prev => {
        const updated = { ...prev, histories: {} };
        Object.keys(prev.histories).forEach(symbol => {
          const history = [...prev.histories[symbol]];
          const lastPrice = history[history.length - 1]?.p || (symbol === 'BTC' ? 65000 : symbol === 'ETH' ? 3300 : 1.0);
          const randomDelta = (Math.random() * 0.016) - 0.008;
          const newPrice = lastPrice * (1 + randomDelta);
          history.push({ t: Date.now(), p: +newPrice.toFixed(2) });
          // Keep last 300 points
          updated.histories[symbol] = history.slice(-300);
        });
        
        // Update practice P&L after market update
        setPractice(prevPractice => {
          let positionsValue = 0;
          prevPractice.positions.forEach(pos => {
            const history = updated.histories[pos.symbol] || prev.histories[pos.symbol] || [];
            const mktPrice = history.length > 0 ? history[history.length - 1].p : 0;
            positionsValue += mktPrice * pos.qty;
          });
          const totalEquity = prevPractice.currentCash + positionsValue;
          const totalPnl = totalEquity - prevPractice.startingCash;
          return { ...prevPractice, totalPnl: +totalPnl.toFixed(2) };
        });

        // Update competition P&L
        setCompetitions(prevCompetitions => {
          const updatedEntries = { ...prevCompetitions.entries };
          Object.keys(updatedEntries).forEach(compId => {
            const entry = updatedEntries[compId];
            let positionsValue = 0;
            entry.positions.forEach(pos => {
              const history = updated.histories[pos.symbol] || prev.histories[pos.symbol] || [];
              const mktPrice = history.length > 0 ? history[history.length - 1].p : 0;
              positionsValue += mktPrice * pos.qty;
            });
            const totalEquity = entry.currentCash + positionsValue;
            const totalPnl = totalEquity - entry.seedCash;
            updatedEntries[compId] = { ...entry, totalPnl: +totalPnl.toFixed(2) };
          });
          return { ...prevCompetitions, entries: updatedEntries };
        });

        return updated;
      });
    };

    tickIntervalRef.current = setInterval(tick, 10000);

    return () => {
      if (tickIntervalRef.current) clearInterval(tickIntervalRef.current);
    };
  }, []);

  // Practice trading
  function practicePlaceOrder({ side, symbol, qty }) {
    const price = getLastPrice(symbol);
    if (!price) return;

    setPractice(prev => {
      const cost = price * qty;
      if (side === 'BUY') {
        if (prev.currentCash < cost) {
          showToast("error", "Insufficient cash for purchase");
          return prev;
        }
        const newCash = prev.currentCash - cost;
        const existingPos = prev.positions.find(p => p.symbol === symbol);
        let newPositions;
        if (existingPos) {
          const totalQty = existingPos.qty + qty;
          const totalCost = (existingPos.avgPrice * existingPos.qty) + cost;
          newPositions = prev.positions.map(p =>
            p.symbol === symbol
              ? { ...p, qty: totalQty, avgPrice: totalCost / totalQty }
              : p
          );
        } else {
          newPositions = [...prev.positions, { symbol, qty, avgPrice: price }];
        }
        const newFill = { id: Date.now().toString(), side, symbol, qty, price, ts: new Date().toISOString() };
        showToast("success", `✅ (Training) Filled ${side} ${qty} ${symbol} @ $${price.toLocaleString()}`);
        return {
          ...prev,
          currentCash: newCash,
          positions: newPositions,
          fills: [newFill, ...prev.fills].slice(0, 50)
        };
      } else { // SELL
        const existingPos = prev.positions.find(p => p.symbol === symbol);
        if (!existingPos || existingPos.qty < qty) {
          showToast("error", "Insufficient position to sell");
          return prev;
        }
        const proceeds = price * qty;
        const newCash = prev.currentCash + proceeds;
        let newPositions;
        if (existingPos.qty === qty) {
          newPositions = prev.positions.filter(p => p.symbol !== symbol);
        } else {
          newPositions = prev.positions.map(p =>
            p.symbol === symbol ? { ...p, qty: p.qty - qty } : p
          );
        }
        const newFill = { id: Date.now().toString(), side, symbol, qty, price, ts: new Date().toISOString() };
        showToast("success", `✅ (Training) Filled ${side} ${qty} ${symbol} @ $${price.toLocaleString()}`);
        return {
          ...prev,
          currentCash: newCash,
          positions: newPositions,
          fills: [newFill, ...prev.fills].slice(0, 50)
        };
      }
    });
  }

  function markToMarketPractice() {
    setPractice(prev => {
      let positionsValue = 0;
      prev.positions.forEach(pos => {
        const mktPrice = getLastPrice(pos.symbol);
        positionsValue += mktPrice * pos.qty;
      });
      const totalEquity = prev.currentCash + positionsValue;
      const totalPnl = totalEquity - prev.startingCash;
      return { ...prev, totalPnl: +totalPnl.toFixed(2) };
    });
  }

  // Competitions
  function joinCompetition(compId, { method, cost }) {
    const comp = competitionsData.find(c => c.id === compId);
    if (!comp) return;

    if (competitions.entries[compId]) {
      showToast("info", "You've already joined this competition");
      return;
    }

    if (method === "SOUNDCOINS") {
      if (userState.soundCoins < cost) {
        showToast("error", "Not enough SoundCoins.");
        return;
      }
      setUserState(prev => ({ ...prev, soundCoins: prev.soundCoins - cost }));
    } else if (method === "CASH") {
      // Real money transaction - in production this would charge the user's payment method
      showToast("info", `💳 Charged $${cost} entry fee`);
    }

    setCompetitions(prev => ({
      ...prev,
      entries: {
        ...prev.entries,
        [compId]: {
          entryMethod: method,
          entryCost: cost,
          seedCash: comp.seedCashUsd,
          currentCash: comp.seedCashUsd,
          positions: [],
          fills: [],
          totalPnl: 0,
          joinedAt: new Date().toISOString(),
          entryPaid: true
        }
      }
    }));

    showToast("success", `Joined ${comp.title} via ${method === "SOUNDCOINS" ? "SoundCoins" : "Cash"}`);
  }

  function competitionPlaceOrder(compId, { side, symbol, qty }) {
    const price = getLastPrice(symbol);
    if (!price) return;

    setCompetitions(prev => {
      const entry = prev.entries[compId];
      if (!entry) return prev;

      const cost = price * qty;
      if (side === 'BUY') {
        if (entry.currentCash < cost) {
          showToast("error", "Insufficient cash for purchase");
          return prev;
        }
        const newCash = entry.currentCash - cost;
        const existingPos = entry.positions.find(p => p.symbol === symbol);
        let newPositions;
        if (existingPos) {
          const totalQty = existingPos.qty + qty;
          const totalCost = (existingPos.avgPrice * existingPos.qty) + cost;
          newPositions = entry.positions.map(p =>
            p.symbol === symbol
              ? { ...p, qty: totalQty, avgPrice: totalCost / totalQty }
              : p
          );
        } else {
          newPositions = [...entry.positions, { symbol, qty, avgPrice: price }];
        }
        const newFill = { id: Date.now().toString(), side, symbol, qty, price, ts: new Date().toISOString() };
        const comp = competitionsData.find(c => c.id === compId);
        showToast("success", `🏁 [${comp?.title}] ${side} ${qty} ${symbol} @ $${price.toLocaleString()}`);
        return {
          ...prev,
          entries: {
            ...prev.entries,
            [compId]: {
              ...entry,
              currentCash: newCash,
              positions: newPositions,
              fills: [newFill, ...entry.fills].slice(0, 50)
            }
          }
        };
      } else { // SELL
        const existingPos = entry.positions.find(p => p.symbol === symbol);
        if (!existingPos || existingPos.qty < qty) {
          showToast("error", "Insufficient position to sell");
          return prev;
        }
        const proceeds = price * qty;
        const newCash = entry.currentCash + proceeds;
        let newPositions;
        if (existingPos.qty === qty) {
          newPositions = entry.positions.filter(p => p.symbol !== symbol);
        } else {
          newPositions = entry.positions.map(p =>
            p.symbol === symbol ? { ...p, qty: p.qty - qty } : p
          );
        }
        const newFill = { id: Date.now().toString(), side, symbol, qty, price, ts: new Date().toISOString() };
        const comp = competitionsData.find(c => c.id === compId);
        showToast("success", `🏁 [${comp?.title}] ${side} ${qty} ${symbol} @ $${price.toLocaleString()}`);
        return {
          ...prev,
          entries: {
            ...prev.entries,
            [compId]: {
              ...entry,
              currentCash: newCash,
              positions: newPositions,
              fills: [newFill, ...entry.fills].slice(0, 50)
            }
          }
        };
      }
    });
  }

  function markToMarketCompetition(compId) {
    setCompetitions(prev => {
      const entry = prev.entries[compId];
      if (!entry) return prev;

      let positionsValue = 0;
      entry.positions.forEach(pos => {
        const mktPrice = getLastPrice(pos.symbol);
        positionsValue += mktPrice * pos.qty;
      });
      const totalEquity = entry.currentCash + positionsValue;
      const totalPnl = totalEquity - entry.seedCash;
      return {
        ...prev,
        entries: {
          ...prev.entries,
          [compId]: { ...entry, totalPnl: +totalPnl.toFixed(2) }
        }
      };
    });
  }

  function markToMarketCompetitions() {
    Object.keys(competitions.entries).forEach(compId => {
      markToMarketCompetition(compId);
    });
  }

  function updateGlobalLeaderboard({ userName, roiPct }) {
    const getInitials = (name) => {
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };
    
    setCompetitions(prev => {
      const leaderboard = [...prev.leaderboard];
      const existingIndex = leaderboard.findIndex(entry => entry.userName === userName);
      const initials = getInitials(userName);
      const userStateCode = userState.state || "WA";
      
      if (existingIndex >= 0) {
        leaderboard[existingIndex] = { ...leaderboard[existingIndex], userName, roiPct, state: userStateCode };
      } else {
        leaderboard.push({ userName, roiPct, avatarUrl: null, initials, state: userStateCode });
      }
      leaderboard.sort((a, b) => b.roiPct - a.roiPct);
      return { ...prev, leaderboard: leaderboard.slice(0, 50) };
    });
    showToast("success", "🚀 ROI posted to Global Leaderboard");
  }

  function updateCompetitionLeaderboard(compId, { userName = userState.name, roiPct, avatarUrl, initials }) {
    const getInitials = (name) => {
      if (initials) return initials;
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };
    
    setCompetitions(prev => {
      const list = [...(prev.leaderboardByCompetition[compId] || [])];
      const existingIndex = list.findIndex(entry => entry.user === userName);
      const userInitials = getInitials(userName);
      
      if (existingIndex >= 0) {
        list[existingIndex] = { ...list[existingIndex], user: userName, roiPct, avatarUrl, initials: userInitials };
      } else {
        list.push({ user: userName, roiPct, avatarUrl: avatarUrl || null, initials: userInitials });
      }
      
      const top = list.sort((a, b) => b.roiPct - a.roiPct).slice(0, 20);
      return { 
        ...prev, 
        leaderboardByCompetition: { 
          ...prev.leaderboardByCompetition, 
          [compId]: top 
        } 
      };
    });
    showToast("success", `🏆 ROI posted to ${competitionsData.find(c => c.id === compId)?.title || 'Competition'} Leaderboard`);
  }

  const goTo = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar 
        currentPage={currentPage} 
        onNavigate={handleNavigate}
        soundCoins={userState.soundCoins}
      />
      
      <main>
        {currentPage === 'dashboard' && (
          <Dashboard
            userData={userState}
            onNavigate={handleNavigate}
            onApplyOffer={handleApplyOffer}
            onDonate={handleDonate}
            showToast={showToast}
            setPage={setCurrentPage}
            awardSoundCoins={awardSoundCoins}
          />
        )}
        {currentPage === 'marketplace' && (
          <Marketplace
            onApplyOffer={handleApplyOffer}
            onDonate={handleDonate}
            showToast={showToast}
            awardSoundCoins={awardSoundCoins}
          />
        )}
        {(currentPage === 'crypto-learning' || currentPage === 'crypto-wallet' || currentPage === 'crypto-redeem') && (
          <Crypto
            page={currentPage}
            setPage={setCurrentPage}
            user={userState}
            wallet={wallet}
            setWallet={setWallet}
            lessonsData={lessonsData}
            redeemCatalog={redeemCatalog}
            handlers={{
              completeLesson,
              awardSoundCoins,
              convertCoinsToCrypto,
              redeemItem,
              logTransaction
            }}
            showToast={showToast}
          />
        )}
        {currentPage === 'wallet' && (
          <Wallet
            user={userState}
            wallet={wallet}
          />
        )}
        {currentPage === 'market' && (
          <Market
            market={market}
            practice={practice}
            setPractice={setPractice}
            onSelectSymbol={(symbol) => setPractice(prev => ({ ...prev, selectedSymbol: symbol }))}
            onPlaceOrder={practicePlaceOrder}
            getLastPrice={getLastPrice}
          />
        )}
        {currentPage === 'competitions' && (
          <CompetitionsPage
            competitionsData={competitionsData}
            competitions={competitions}
            onJoin={joinCompetition}
            onCompOrder={competitionPlaceOrder}
            getPrice={getLastPrice}
            leaderboard={competitions.leaderboard}
            onPostResult={updateGlobalLeaderboard}
            userName={userState.name}
            market={market}
            selectedCompetitionId={selectedCompetitionId}
            setSelectedCompetitionId={setSelectedCompetitionId}
            getHistory={getHistory}
            updateCompetitionLeaderboard={updateCompetitionLeaderboard}
            userSoundCoins={userState.soundCoins}
            userState={userState.state}
          />
        )}
      </main>

      <ChatbotWidget />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default App;

