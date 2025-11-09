import React from 'react';
import WalletOverview from '../components/WalletOverview';

const Wallet = ({ user, wallet }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-text-primary mb-8">Wallet</h1>
      <WalletOverview user={user} wallet={wallet} />
    </div>
  );
};

export default Wallet;

