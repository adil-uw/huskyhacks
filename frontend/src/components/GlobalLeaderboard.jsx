import React, { useState } from 'react';
import { usStates } from '../data/mockData';

const GlobalLeaderboard = ({ leaderboard, userName, userState }) => {
  const [selectedState, setSelectedState] = useState("USA");
  const colors = ['bg-secondary', 'bg-accent-apply', 'bg-accent-donate', 'bg-warning'];
  
  // Filter leaderboard by state
  const filteredLeaderboard = selectedState === "USA" 
    ? leaderboard 
    : leaderboard.filter(entry => entry.state === selectedState);
  
  // Sort by ROI
  const sortedLeaderboard = [...filteredLeaderboard].sort((a, b) => b.roiPct - a.roiPct);
  
  // Find user's rank
  const userRank = sortedLeaderboard.findIndex(entry => entry.userName === userName) + 1;
  const userEntry = sortedLeaderboard.find(entry => entry.userName === userName);
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-text-primary mb-2">Global Leaderboard</h2>
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <label className="text-sm font-medium text-text-primary">Filter by:</label>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-sm"
          >
            <option value="USA">🇺🇸 All USA</option>
            {usStates.map(state => (
              <option key={state.code} value={state.code}>{state.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* User's Rank Display */}
      {userEntry && (
        <div className="mb-4 p-4 bg-accent-apply/10 border-2 border-accent-apply rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-text-secondary mb-1">Your Ranking</div>
              <div className="text-2xl font-bold text-accent-apply">#{userRank}</div>
              <div className="text-sm text-text-primary mt-1">
                {selectedState === "USA" ? "Nationwide" : usStates.find(s => s.code === selectedState)?.name}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-text-secondary">Your ROI</div>
              <div className={`text-xl font-bold ${userEntry.roiPct >= 0 ? 'text-accent-apply' : 'text-red-500'}`}>
                {userEntry.roiPct >= 0 ? '+' : ''}{userEntry.roiPct.toFixed(2)}%
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard List */}
      <div className="space-y-3">
        {sortedLeaderboard.slice(0, 20).map((entry, index) => {
          const getInitials = (name) => {
            if (entry.initials) return entry.initials;
            return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
          };
          const initials = getInitials(entry.userName);
          const bgColor = colors[index % colors.length];
          const isUser = entry.userName === userName;
          
          return (
            <div
              key={entry.userName}
              className={`flex items-center gap-4 p-4 rounded-lg border ${
                isUser
                  ? 'bg-accent-apply/10 border-accent-apply'
                  : 'bg-background border-gray-200 hover:border-gray-300'
              } transition-colors`}
            >
              <div className="flex-shrink-0 w-12 text-center">
                <div className={`text-lg font-bold ${isUser ? 'text-accent-apply' : 'text-text-secondary'}`}>
                  #{index + 1}
                </div>
              </div>
              <div className="flex-shrink-0">
                {entry.avatarUrl ? (
                  <img 
                    src={entry.avatarUrl} 
                    alt={entry.userName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className={`w-12 h-12 rounded-full ${bgColor} flex items-center justify-center text-white font-bold text-sm`}>
                    {initials}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-text-primary">{entry.userName}</span>
                  {isUser && (
                    <span className="text-xs px-2 py-0.5 bg-accent-apply text-white rounded-full">You</span>
                  )}
                </div>
                <div className="text-xs text-text-secondary">
                  {entry.state && usStates.find(s => s.code === entry.state)?.name}
                </div>
              </div>
              <div className={`text-right font-bold text-lg ${
                entry.roiPct >= 0 ? 'text-accent-apply' : 'text-red-500'
              }`}>
                {entry.roiPct >= 0 ? '+' : ''}{entry.roiPct.toFixed(2)}%
              </div>
            </div>
          );
        })}
        {sortedLeaderboard.length === 0 && (
          <div className="text-center py-8 text-text-secondary">
            No entries found for {selectedState === "USA" ? "USA" : usStates.find(s => s.code === selectedState)?.name}
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalLeaderboard;

