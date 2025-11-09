import React from 'react';

const CompetitionLeaderboardList = ({ entries }) => {
  const colors = ['bg-secondary', 'bg-accent-apply', 'bg-accent-donate', 'bg-warning'];
  
  return (
    <div className="space-y-2">
      {entries.slice(0, 10).map((entry, index) => {
        const getInitials = (name) => {
          if (entry.initials) return entry.initials;
          return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
        };
        const initials = getInitials(entry.user);
        const bgColor = colors[index % colors.length];
        
        return (
          <div
            key={entry.user}
            className="flex items-center gap-3 p-3 rounded-lg border bg-background border-gray-200 hover:border-gray-300 transition-colors"
          >
            <div className="flex-shrink-0">
              {entry.avatarUrl ? (
                <img 
                  src={entry.avatarUrl} 
                  alt={entry.user}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className={`w-10 h-10 rounded-full ${bgColor} flex items-center justify-center text-white font-bold text-xs`}>
                  {initials}
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-text-primary text-sm">{entry.user}</div>
              <div className="text-xs text-text-secondary">ROI</div>
            </div>
            <div className={`text-right font-bold ${
              entry.roiPct >= 0 ? 'text-accent-apply' : 'text-red-500'
            }`}>
              {entry.roiPct >= 0 ? '+' : ''}{entry.roiPct.toFixed(2)}%
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CompetitionLeaderboardList;

