import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import BadgeChip from './BadgeChip';

const OfferDetailsModal = ({ offer, onClose, onApply, onDonate }) => {
  const [selectedCause, setSelectedCause] = useState('');
  const [showTerms, setShowTerms] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [qrCodeType, setQrCodeType] = useState(null); // 'apply' or 'donate'
  const [copied, setCopied] = useState(false);
  const [donateError, setDonateError] = useState('');

  if (!offer) return null;

  const isExpiringSoon = new Date(offer.expiry) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  
  // Auto-calculate donation amount based on offer value (cashback/reward percentage)
  // Assuming the offer value is a percentage, we'll use it as the donation amount
  // Or if it's a fixed amount, use that
  const donateAmount = offer.value || 5; // Use offer value or default to 5

  // Generate a unique code for this offer
  const offerCode = `SCU-${offer.id}-${offer.merchant.substring(0, 3).toUpperCase()}-${Date.now().toString().slice(-6)}`;
  
  // Generate a unique donation code
  const causeCode = selectedCause === 'Any' ? 'ANY' : selectedCause.toUpperCase();
  const donationCode = `SCU-DONATE-${causeCode}-${offer.id}-${Date.now().toString().slice(-6)}`;

  const handleApply = () => {
    setQrCodeType('apply');
    setShowQRCode(true);
    onApply(offer);
  };

  const handleCopyCode = async () => {
    const codeToCopy = qrCodeType === 'donate' ? donationCode : offerCode;
    try {
      await navigator.clipboard.writeText(codeToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDonate = () => {
    if (!selectedCause) {
      setDonateError('Please select a cause first');
      return;
    }
    setDonateError('');
    setQrCodeType('donate');
    setShowQRCode(true);
    onDonate(selectedCause, donateAmount);
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

          {!showQRCode ? (
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <button
                onClick={handleApply}
                className="flex-1 py-3 px-6 bg-accent-apply text-white rounded-lg hover:bg-accent-apply/90 transition-colors font-semibold"
              >
                🟢 Apply Now
              </button>
              <button
                onClick={handleDonate}
                disabled={!selectedCause}
                className={`flex-1 py-3 px-6 rounded-lg transition-colors font-semibold ${
                  selectedCause
                    ? 'bg-accent-donate text-white hover:bg-accent-donate/90 cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                💙 Donate to Cause
              </button>
            </div>
          ) : (
            <div className={`rounded-xl p-6 mb-4 border-2 ${
              qrCodeType === 'donate' 
                ? 'bg-gradient-to-br from-accent-donate/10 to-secondary/10 border-accent-donate/20'
                : 'bg-gradient-to-br from-accent-apply/10 to-secondary/10 border-accent-apply/20'
            }`}>
              <div className="text-center mb-4">
                {qrCodeType === 'donate' ? (
                  <>
                    <h3 className="text-xl font-bold text-text-primary mb-2">💙 Donation Setup Complete!</h3>
                    <p className="text-sm text-text-secondary mb-2">
                      Your discounted/cashback money will be sent to Sound Credit Union
                    </p>
                    <div className="inline-block px-4 py-2 bg-accent-donate/20 rounded-lg mt-2">
                      <p className="text-sm font-semibold text-accent-donate">
                        Donating to: <span className="text-primary">
                          {selectedCause === 'Any' ? 'All Causes (Your Choice)' : selectedCause}
                        </span>
                      </p>
                      <p className="text-xs text-text-secondary mt-1">
                        Amount: ${donateAmount}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-bold text-text-primary mb-2">✅ Offer Applied!</h3>
                    <p className="text-sm text-text-secondary">Show this QR code at checkout</p>
                  </>
                )}
              </div>
              
              <div className="flex flex-col items-center gap-4">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <QRCodeSVG 
                    value={qrCodeType === 'donate' ? donationCode : offerCode} 
                    size={200} 
                  />
                </div>
                
                <div className="w-full">
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    {qrCodeType === 'donate' ? 'Donation Code:' : 'Offer Code:'}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={qrCodeType === 'donate' ? donationCode : offerCode}
                      readOnly
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-white font-mono text-sm"
                    />
                    <button
                      onClick={handleCopyCode}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        copied
                          ? qrCodeType === 'donate' 
                            ? 'bg-accent-donate text-white'
                            : 'bg-accent-apply text-white'
                          : 'bg-primary text-white hover:bg-primary/90'
                      }`}
                    >
                      {copied ? '✓ Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>

                {qrCodeType === 'donate' && (
                  <div className="w-full bg-background rounded-lg p-4">
                    <p className="text-sm text-text-secondary text-center">
                      💚 Your cashback rewards (${donateAmount}) from this offer will be automatically donated to{' '}
                      {selectedCause === 'Any' ? (
                        <strong>the cause of your choice</strong>
                      ) : (
                        <>the <strong>{selectedCause}</strong> cause</>
                      )}{' '}
                      through Sound Credit Union.
                    </p>
                  </div>
                )}
                
                <button
                  onClick={onClose}
                  className="w-full py-2 px-4 bg-gray-200 text-text-primary rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {!showQRCode && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-text-primary mb-2">
                Select Cause:
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {['Any', 'Education', 'Health', 'Sports'].map((cause) => (
                  <button
                    key={cause}
                    onClick={() => {
                      setSelectedCause(cause);
                      setDonateError('');
                    }}
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
              {donateError && (
                <p className="text-sm text-red-500 mb-2">{donateError}</p>
              )}
              <div className="bg-background rounded-lg p-3">
                <p className="text-sm text-text-secondary">
                  <strong>Donation Amount:</strong> ${donateAmount} (auto-calculated from offer value)
                </p>
              </div>
            </div>
          )}

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

