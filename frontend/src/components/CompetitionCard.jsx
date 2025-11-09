import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const CompetitionCard = ({ comp, onViewDetails, historyGetter }) => {
  const getStatusBadge = (status) => {
    const variants = {
      UPCOMING: { text: 'Upcoming', color: 'bg-gray-200 text-gray-700' },
      LIVE: { text: 'Live', color: 'bg-accent-apply text-white' },
      ENDED: { text: 'Ended', color: 'bg-gray-400 text-white' }
    };
    const variant = variants[status] || variants.UPCOMING;
    return <span className={`px-3 py-1 rounded-full text-xs font-medium ${variant.color}`}>{variant.text}</span>;
  };

  const chartSymbol = comp.symbolForChart || "BTC";
  const history = historyGetter(chartSymbol);
  const miniChartData = history.slice(-50).map(point => ({
    price: point.p
  }));

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-text-primary mb-2">{comp.title}</h3>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs text-text-secondary">Sponsored by</span>
            <span className="text-sm font-semibold text-primary">{comp.sponsorLogo} {comp.sponsor}</span>
          </div>
          {/* Mini Chart */}
          <div className="h-16 w-full mb-3">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={miniChartData}>
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#00B3B0" 
                  strokeWidth={1.5}
                  dot={false}
                  isAnimationActive={true}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="ml-4">
          {getStatusBadge(comp.status)}
        </div>
      </div>

      <div className="space-y-2 mb-4 text-sm">
        <div>
          <span className="text-text-secondary">Entry from:</span>
          <div className="flex flex-wrap gap-2 mt-1">
            {comp.entryOptions.map((option, idx) => (
              <span key={idx} className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-background text-xs font-medium">
                {option.type === 'SOUNDCOINS' ? '🪙' : '💳'} {option.type === 'SOUNDCOINS' ? `${option.cost} SoundCoins` : `$${option.cost}`}
              </span>
            ))}
          </div>
        </div>
        <div className="flex justify-between">
          <span className="text-text-secondary">Prize:</span>
          <span className="font-medium text-accent-apply">${comp.prizeUsd}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-secondary">Starts:</span>
          <span className="font-medium">{new Date(comp.startsAt).toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-secondary">Ends:</span>
          <span className="font-medium">{new Date(comp.endsAt).toLocaleDateString()}</span>
        </div>
      </div>

      <button
        onClick={() => onViewDetails(comp.id)}
        className="w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
      >
        View Details
      </button>
    </div>
  );
};

export default CompetitionCard;

