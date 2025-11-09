import React from 'react';
import BadgeChip from './BadgeChip';

const LessonCard = ({ lesson, completed, onOpen }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-100">
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="text-3xl">📚</div>
          {completed && <BadgeChip text="Completed" variant="success" />}
        </div>
        
        <h3 className="font-semibold text-text-primary mb-2">{lesson.title}</h3>
        <p className="text-sm text-text-secondary mb-4 line-clamp-2">{lesson.summary}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-text-secondary">
            Reward: 🪙 {lesson.quiz.rewardCoins} SoundCoins
          </span>
          <button
            onClick={() => onOpen(lesson)}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
          >
            {completed ? 'Review' : 'Start'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;

