import React, { useState, useMemo } from 'react';
import { offersData } from '../data/mockData';
import FilterBar from '../components/FilterBar';
import OfferCard from '../components/OfferCard';
import OfferDetailsModal from '../components/OfferDetailsModal';

const Marketplace = ({ onApplyOffer, onDonate, showToast }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSort, setSelectedSort] = useState('Highest Value');
  const [activeTab, setActiveTab] = useState('Recommended');
  const [selectedOffer, setSelectedOffer] = useState(null);

  const filteredOffers = useMemo(() => {
    let filtered = [...offersData];

    // Filter by tab
    if (activeTab === 'Local Partners') {
      filtered = filtered.filter(offer => offer.isLocal);
    } else if (activeTab === 'Recommended') {
      // Show first 6 as recommended
      filtered = filtered.slice(0, 6);
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(offer =>
        offer.merchant.toLowerCase().includes(query) ||
        offer.headline.toLowerCase().includes(query) ||
        offer.category.toLowerCase().includes(query) ||
        offer.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(offer => offer.category === selectedCategory);
    }

    // Sort
    if (selectedSort === 'Highest Value') {
      filtered.sort((a, b) => b.value - a.value);
    } else if (selectedSort === 'Expiring Soon') {
      filtered.sort((a, b) => new Date(a.expiry) - new Date(b.expiry));
    } else if (selectedSort === 'Near Me') {
      // Mock: prioritize local partners
      filtered.sort((a, b) => (b.isLocal ? 1 : 0) - (a.isLocal ? 1 : 0));
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedSort, activeTab]);

  const handleViewDetails = (offer) => {
    setSelectedOffer(offer);
  };

  const handleApply = (offer) => {
    onApplyOffer(offer);
    // Toast will be shown by the modal after QR code is displayed
  };

  const handleDonate = (cause, amount) => {
    onDonate(cause, amount);
    showToast(`❤️ Donated $${amount} to Local ${cause} Fund.`, 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-text-primary mb-8">Marketplace</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b">
        {['Recommended', 'Local Partners', 'All Perks'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === tab
                ? 'border-b-2 border-secondary text-secondary'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filter Bar */}
      <FilterBar
        onSearch={setSearchQuery}
        onCategoryChange={setSelectedCategory}
        onSortChange={setSelectedSort}
        selectedCategory={selectedCategory}
        selectedSort={selectedSort}
      />

      {/* Offer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOffers.map((offer) => (
          <OfferCard
            key={offer.id}
            offer={offer}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {filteredOffers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text-secondary">No perks found. Try adjusting your filters.</p>
        </div>
      )}

      {/* Modal */}
      {selectedOffer && (
        <OfferDetailsModal
          offer={selectedOffer}
          onClose={() => setSelectedOffer(null)}
          onApply={handleApply}
          onDonate={handleDonate}
        />
      )}
    </div>
  );
};

export default Marketplace;

