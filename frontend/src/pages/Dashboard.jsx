import React, { useState, useRef, useEffect } from 'react';
import { recommendedPerks, activePerks } from '../data/mockData';
import { SavingsGauge, ImpactProgress } from '../components/ScoreMeters';
import SoundCoinsMeter from '../components/SoundCoinsMeter';
import CryptoQuickStart from '../components/CryptoQuickStart';
import BadgeChip from '../components/BadgeChip';
import OfferCard from '../components/OfferCard';
import ToggleSwitch from '../components/ToggleSwitch';
import OfferDetailsModal from '../components/OfferDetailsModal';
import ImpactReportModal from '../components/ImpactReportModal';

const Dashboard = ({ userData, onNavigate, onApplyOffer, onDonate, showToast, setPage, awardSoundCoins }) => {
  const [autoApply, setAutoApply] = useState(true);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showImpactModal, setShowImpactModal] = useState(false);
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleViewDetails = (offer) => {
    setSelectedOffer(offer);
  };

  const handleApply = (offer) => {
    onApplyOffer(offer);
    showToast('✅ Offer applied successfully!', 'success');
  };

  const handleDonate = (cause, amount) => {
    onDonate(cause, amount);
    showToast(`❤️ Donated $${amount} to Local ${cause} Fund.`, 'info');
  };

  const checkScrollButtons = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', checkScrollButtons);
      window.addEventListener('resize', checkScrollButtons);
      return () => {
        carousel.removeEventListener('scroll', checkScrollButtons);
        window.removeEventListener('resize', checkScrollButtons);
      };
    }
  }, []);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome & Impact Summary Card */}
      <div className="bg-gradient-to-br from-primary to-primary/80 text-white rounded-2xl p-6 md:p-8 mb-8 shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">
          Welcome back, {userData.name}! 👋
        </h1>
        <p className="text-lg md:text-xl mb-6 opacity-90">
          You saved <span className="font-bold">${userData.saved}</span> and donated <span className="font-bold">${userData.donated}</span> this month.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <SavingsGauge value={userData.saved} target={userData.targets.saved} />
          <ImpactProgress value={userData.donated} target={userData.targets.impact} />
        </div>

        <div className="mb-6">
          <SoundCoinsMeter coins={userData.soundCoins} goal={userData.targets.soundCoins} />
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {userData.badges.map((badge, idx) => (
            <BadgeChip key={idx} text={badge} variant="success" />
          ))}
        </div>

        <button
          onClick={() => setShowImpactModal(true)}
          className="bg-white text-primary px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          View Impact Report
        </button>
      </div>

      {/* Crypto Quick Start */}
      <CryptoQuickStart
        onStartLesson={() => setPage('crypto-learning')}
        onOpenWallet={() => setPage('crypto-wallet')}
        onRedeem={() => setPage('crypto-redeem')}
      />

      {/* Personalized Perks Carousel */}
      <div className="mb-8 relative">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-text-primary">Recommended for You</h2>
          <div className="flex gap-2">
            <button
              onClick={scrollLeft}
              disabled={!canScrollLeft}
              className={`p-2 rounded-full shadow-md transition-all ${
                canScrollLeft
                  ? 'bg-white text-primary hover:bg-gray-100 cursor-pointer'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              aria-label="Scroll left"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={scrollRight}
              disabled={!canScrollRight}
              className={`p-2 rounded-full shadow-md transition-all ${
                canScrollRight
                  ? 'bg-white text-primary hover:bg-gray-100 cursor-pointer'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              aria-label="Scroll right"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        <div 
          ref={carouselRef}
          className="w-full overflow-x-auto pb-4 scrollbar-hide"
          onScroll={checkScrollButtons}
        >
          <div className="flex gap-4" style={{ width: 'max-content' }}>
            {recommendedPerks.map((offer) => (
              <div key={offer.id} className="flex-shrink-0 w-80">
                <OfferCard
                  offer={offer}
                  onViewDetails={handleViewDetails}
                  isRecommended={true}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active & Expiring Perks List */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-xl font-bold text-text-primary mb-4">Active & Expiring Perks</h2>
        <div className="space-y-4">
          {activePerks.map((perk) => (
            <div
              key={perk.id}
              className="flex items-center justify-between p-4 bg-background rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl">{perk.logo}</div>
                <div>
                  <h3 className="font-semibold text-text-primary">{perk.merchant}</h3>
                  <p className="text-sm text-text-secondary">{perk.headline}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <BadgeChip
                  text={perk.status}
                  variant={perk.status === 'Expiring Soon' ? 'warning' : 'success'}
                />
                <button
                  onClick={() => handleViewDetails(perk)}
                  className="text-secondary hover:underline text-sm font-medium"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Auto-Apply Cashback Toggle */}
      <div className="mb-8">
        <ToggleSwitch
          enabled={autoApply}
          onChange={() => setAutoApply(!autoApply)}
          label="Auto-Apply Cashback"
          subtext="Automatically apply rewards after purchases."
          tooltip="When enabled, cashback rewards will be automatically applied to your account after eligible purchases. No action required!"
        />
      </div>

      {/* Explore More Perks Button */}
      <div className="text-center">
        <button
          onClick={() => onNavigate('marketplace')}
          className="bg-gradient-to-r from-secondary to-accent-apply text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-shadow"
        >
          Explore More Perks →
        </button>
      </div>

      {/* Modals */}
      {selectedOffer && (
        <OfferDetailsModal
          offer={selectedOffer}
          onClose={() => setSelectedOffer(null)}
          onApply={handleApply}
          onDonate={handleDonate}
          onAwardCoins={awardSoundCoins}
        />
      )}

      {showImpactModal && (
        <ImpactReportModal
          userData={userData}
          onClose={() => setShowImpactModal(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;

