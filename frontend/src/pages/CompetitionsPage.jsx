import React from 'react';
import Competitions from '../components/Competitions';
import CompetitionDetailsModal from '../components/CompetitionDetailsModal';
import GlobalLeaderboard from '../components/GlobalLeaderboard';

const CompetitionsPage = ({ 
  competitionsData, 
  competitions, 
  onJoin, 
  onCompOrder, 
  getPrice, 
  leaderboard, 
  onPostResult, 
  userName, 
  market,
  selectedCompetitionId,
  setSelectedCompetitionId,
  getHistory,
  updateCompetitionLeaderboard,
  userSoundCoins,
  userState
}) => {
  const selectedComp = selectedCompetitionId 
    ? competitionsData.find(c => c.id === selectedCompetitionId)
    : null;
  
  const entry = selectedComp ? competitions.entries[selectedComp.id] : null;
  const compLeaderboard = selectedComp 
    ? (competitions.leaderboardByCompetition[selectedComp.id] || [])
    : [];

  const handleViewDetails = (compId) => {
    setSelectedCompetitionId(compId);
  };

  const handleCloseModal = () => {
    setSelectedCompetitionId(null);
  };

  const handleJoin = (compId, { method, cost }) => {
    onJoin(compId, { method, cost });
  };

  const handlePostROI = (compId, { roiPct }) => {
    updateCompetitionLeaderboard(compId, { userName, roiPct });
    onPostResult({ userName, roiPct });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-text-primary mb-8">Competitions</h1>
      <Competitions
        competitionsData={competitionsData}
        onViewDetails={handleViewDetails}
        historyGetter={getHistory}
      />
      
      {selectedComp && (
        <CompetitionDetailsModal
          comp={selectedComp}
          entry={entry}
          priceGetter={getPrice}
          historyGetter={getHistory}
          onClose={handleCloseModal}
          onJoin={handleJoin}
          onPlaceOrder={onCompOrder}
          onPostROI={handlePostROI}
          leaderboard={compLeaderboard}
          market={market}
          userSoundCoins={userSoundCoins}
        />
      )}

      {/* Global Leaderboard Section */}
      <div className="mt-12">
        <GlobalLeaderboard 
          leaderboard={leaderboard}
          userName={userName}
          userState={userState}
        />
      </div>
    </div>
  );
};

export default CompetitionsPage;
