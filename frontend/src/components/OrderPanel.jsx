import React, { useState } from 'react';

const OrderPanel = ({ symbol, onSubmit }) => {
  const [side, setSide] = useState('BUY');
  const [qty, setQty] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const quantity = Number(qty);
    if (quantity > 0) {
      onSubmit({ side, symbol, qty: quantity });
      setQty('');
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-bold text-text-primary mb-4">Place Order</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Side</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setSide('BUY')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                side === 'BUY'
                  ? 'bg-accent-apply text-white'
                  : 'bg-background text-text-secondary hover:bg-gray-200'
              }`}
            >
              BUY
            </button>
            <button
              type="button"
              onClick={() => setSide('SELL')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                side === 'SELL'
                  ? 'bg-red-500 text-white'
                  : 'bg-background text-text-secondary hover:bg-gray-200'
              }`}
            >
              SELL
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Quantity</label>
          <input
            type="number"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            min="0"
            step="0.000001"
            placeholder="0.00"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 px-6 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold"
        >
          Submit Order
        </button>
        <p className="text-xs text-text-secondary text-center mt-2">
          Practice order — fills at last price using virtual USD.
        </p>
      </form>
    </div>
  );
};

export default OrderPanel;

