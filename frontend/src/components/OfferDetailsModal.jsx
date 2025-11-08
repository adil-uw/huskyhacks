import React, { useState } from 'react';
import BadgeChip from './BadgeChip';

const OfferDetailsModal = ({ offer, onClose, onApply, onDonate }) => {
  const [selectedCause, setSelectedCause] = useState('');
  const [showTerms, setShowTerms] = useState(false);
  const [donateAmount, setDonateAmount] = useState(5);

  if (!offer) return null;

  const isExpiringSoon = new Date(offer.expiry) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const handleApply = () => {
    onApply(offer);
    onClose();
  };

  const handleDonate = () => {
    if (selectedCause) {
      onDonate(selectedCause, donateAmount);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="text-5xl">{offer.logo}</div>
              <div>
                <h2 className="text-2xl font-bold text-text-primary">{offer.merchant}</h2>
                <p className="text-text-secondary">{offer.headline}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-text-secondary hover:text-text-primary text-2xl"
            >
              ×
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <BadgeChip text={offer.category} variant="info" />
            {offer.isLocal && <BadgeChip text="Local Partner" variant="success" />}
            {isExpiringSoon && <BadgeChip text="Expiring Soon" variant="warning" />}
            {offer.tags.map((tag, idx) => (
              <span key={idx} className="text-xs px-2 py-1 bg-background rounded-md text-text-secondary">
                {tag}
              </span>
            ))}
          </div>

          <div className="mb-4">
            <p className="text-sm text-text-secondary mb-2">
              <strong>Expires:</strong> {new Date(offer.expiry).toLocaleDateString()}
            </p>
            <p className="text-text-primary">{offer.details}</p>
          </div>

          {offer.isLocal && (
            <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4 mb-4">
              <p className="text-sm text-secondary font-medium">
                💚 By using this offer, you support Seattle small businesses.
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <button
              onClick={handleApply}
              className="flex-1 py-3 px-6 bg-accent-apply text-white rounded-lg hover:bg-accent-apply/90 transition-colors font-semibold"
            >
              🟢 Apply Now
            </button>
            <button
              onClick={handleDonate}
              className="flex-1 py-3 px-6 bg-accent-donate text-white rounded-lg hover:bg-accent-donate/90 transition-colors font-semibold"
            >
              💙 Donate to Cause
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-text-primary mb-2">
              Select Cause:
            </label>
            <div className="flex gap-2 mb-2">
              {['Education', 'Health', 'Sports'].map((cause) => (
                <button
                  key={cause}
                  onClick={() => setSelectedCause(cause)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCause === cause
                      ? 'bg-accent-donate text-white'
                      : 'bg-background text-text-secondary hover:bg-gray-200'
                  }`}
                >
                  {cause}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm text-text-secondary">Amount: $</label>
              <input
                type="number"
                value={donateAmount}
                onChange={(e) => setDonateAmount(Number(e.target.value))}
                min="1"
                className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </div>
          </div>

          <div className="border-t pt-4">
            <button
              onClick={() => setShowTerms(!showTerms)}
              className="text-sm text-secondary font-medium hover:underline"
            >
              {showTerms ? 'Hide' : 'Show'} Terms & Conditions
            </button>
            {showTerms && (
              <div className="mt-2 p-4 bg-background rounded-lg text-xs text-text-secondary">
                <p>
                  This offer is subject to terms and conditions. Cashback will be automatically applied
                  after purchase when Auto-Apply is enabled. Offer valid until expiration date.
                  {offer.isLocal && ' Local partner offers support Seattle-area businesses.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferDetailsModal;

