import React, { useState } from 'react';

const LessonModal = ({ lesson, completed, onClose, onPassQuiz }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    const correct = selectedAnswer === lesson.quiz.correctIndex;
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct && !completed) {
      setTimeout(() => {
        onPassQuiz(lesson.id, lesson.quiz.rewardCoins);
      }, 500);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-2xl font-bold text-text-primary">{lesson.title}</h2>
            <button
              onClick={onClose}
              className="text-text-secondary hover:text-text-primary text-2xl"
            >
              ×
            </button>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-text-primary mb-3">Content</h3>
            {lesson.content.map((paragraph, idx) => (
              <p key={idx} className="text-text-secondary mb-3">{paragraph}</p>
            ))}
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Quiz</h3>
            <p className="text-text-primary mb-4 font-medium">{lesson.quiz.question}</p>
            
            <div className="space-y-2 mb-4">
              {lesson.quiz.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => !showResult && setSelectedAnswer(idx)}
                  disabled={showResult}
                  className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-colors ${
                    selectedAnswer === idx
                      ? showResult
                        ? isCorrect && idx === lesson.quiz.correctIndex
                          ? 'border-accent-apply bg-accent-apply/10'
                          : !isCorrect && idx === selectedAnswer
                          ? 'border-red-500 bg-red-50'
                          : 'border-primary bg-primary/10'
                        : 'border-primary bg-primary/10'
                      : showResult && idx === lesson.quiz.correctIndex
                      ? 'border-accent-apply bg-accent-apply/10'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            {showResult ? (
              <div className={`p-4 rounded-lg mb-4 ${
                isCorrect ? 'bg-accent-apply/10 border border-accent-apply' : 'bg-red-50 border border-red-500'
              }`}>
                <p className={`font-semibold ${isCorrect ? 'text-accent-apply' : 'text-red-600'}`}>
                  {isCorrect ? '✅ Correct! You earned 🪙 ' + lesson.quiz.rewardCoins + ' SoundCoins!' : '❌ Incorrect. Try again!'}
                </p>
                {!isCorrect && (
                  <p className="text-sm text-text-secondary mt-2">
                    Hint: Review the content above and select the best answer.
                  </p>
                )}
              </div>
            ) : null}

            <div className="flex gap-3">
              {!showResult ? (
                <button
                  onClick={handleSubmit}
                  disabled={selectedAnswer === null}
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
                    selectedAnswer !== null
                      ? 'bg-accent-apply text-white hover:bg-accent-apply/90'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={onClose}
                  className="flex-1 py-3 px-6 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonModal;

