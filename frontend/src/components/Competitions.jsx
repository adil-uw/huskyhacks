import React from 'react';
import CompetitionCard from './CompetitionCard';

const Competitions = ({ competitionsData, onViewDetails, historyGetter }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">Competitions</h2>
        <p className="text-text-secondary mb-6">
          Trade with seeded virtual cash. Enter with SoundCoins or real money. Highest ROI wins real prizes.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {competitionsData.map((comp) => (
            <CompetitionCard
              key={comp.id}
              comp={comp}
              onViewDetails={onViewDetails}
              historyGetter={historyGetter}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Competitions;
