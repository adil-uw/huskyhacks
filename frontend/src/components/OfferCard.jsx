import React from 'react';
import BadgeChip from './BadgeChip';

const OfferCard = ({ offer, onViewDetails, isRecommended = false }) => {
  const isExpiringSoon = new Date(offer.expiry) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-100">
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="text-4xl">{offer.logo}</div>
          {offer.isLocal && (
            <BadgeChip text="Local Partner" variant="success" />
          )}
        </div>
        
        <h3 className="font-semibold text-text-primary mb-1">{offer.merchant}</h3>
        <p className="text-sm text-text-secondary mb-3 line-clamp-2">{offer.headline}</p>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {offer.tags.slice(0, 2).map((tag, idx) => (
            <span key={idx} className="text-xs px-2 py-1 bg-background rounded-md text-text-secondary">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <span className={`text-xs ${isExpiringSoon ? 'text-warning font-semibold' : 'text-text-secondary'}`}>
            {isExpiringSoon ? 'Expires Soon' : `Expires ${new Date(offer.expiry).toLocaleDateString()}`}
          </span>
          {isExpiringSoon && (
            <BadgeChip text="Expiring Soon" variant="warning" />
          )}
        </div>
        
        <button
          onClick={() => onViewDetails(offer)}
          className="w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200 text-sm font-medium"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default OfferCard;

