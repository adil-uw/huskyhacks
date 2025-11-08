import React, { useState } from 'react';
import NavBar from './components/NavBar';
import Dashboard from './pages/Dashboard';
import Marketplace from './pages/Marketplace';
import ChatbotWidget from './components/ChatbotWidget';
import Toast from './components/Toast';
import { userData } from './data/mockData';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [toast, setToast] = useState(null);
  const [userState, setUserState] = useState(userData);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
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

  return (
    <div className="min-h-screen bg-background">
      <NavBar currentPage={currentPage} onNavigate={handleNavigate} />
      
      <main>
        {currentPage === 'dashboard' && (
          <Dashboard
            userData={userState}
            onNavigate={handleNavigate}
            onApplyOffer={handleApplyOffer}
            onDonate={handleDonate}
            showToast={showToast}
          />
        )}
        {currentPage === 'marketplace' && (
          <Marketplace
            onApplyOffer={handleApplyOffer}
            onDonate={handleDonate}
            showToast={showToast}
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

