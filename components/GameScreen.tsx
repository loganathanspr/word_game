import React, { useState, useEffect } from 'react';
import { GameRound } from '../types';
import Card from './Card';
import Button from './Button';
import { useLanguage } from '../contexts/LanguageContext';

interface GameScreenProps {
  roundData: GameRound;
  onAnswer: (isCorrect: boolean) => void;
  currentRound: number;
  totalRounds: number;
  score: number;
}

const GameScreen: React.FC<GameScreenProps> = ({ roundData, onAnswer, currentRound, totalRounds, score }) => {
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setFeedback(null);
    setIsAnswered(false);
  }, [roundData]);

  const handleAnswer = (userAnswer: boolean) => {
    if (isAnswered) return;
    setIsAnswered(true);
    
    const correct = userAnswer === roundData.isCorrect;
    setFeedback(correct ? 'correct' : 'incorrect');
    
    setTimeout(() => {
      onAnswer(correct);
    }, 1000);
  };

  const feedbackClasses = {
    correct: 'border-green-500 ring-4 ring-green-500/50',
    incorrect: 'border-red-500 ring-4 ring-red-500/50',
    null: 'border-slate-700',
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md mb-4 flex justify-between text-lg font-bold">
            <span className="text-slate-300">{t('roundLabel')} {currentRound + 1} / {totalRounds}</span>
            <span className="text-teal-400">{t('scoreLabel')} {score}</span>
        </div>
      <Card className={`w-full max-w-md border-4 ${feedbackClasses[feedback || 'null']}`}>
        <div className="space-y-6">
          <div className="aspect-square bg-slate-700 rounded-lg overflow-hidden flex items-center justify-center">
            {roundData.imageUrl ? (
              <img src={roundData.imageUrl} alt={roundData.objectName} className="w-full h-full object-cover"/>
            ) : (
                <div className="text-slate-400">{t('imageLoading')}</div>
            )}
          </div>
          <div className="text-center">
            <p className="text-5xl font-bold">{roundData.word}</p>
            <p className="text-slate-400 text-xl">{roundData.wordEnglish}</p>
          </div>
          <p className="text-center text-lg text-slate-300">{t('doesWordMatchImage')}</p>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="secondary" onClick={() => handleAnswer(true)} disabled={isAnswered}>{t('yesButton')}</Button>
            <Button variant="secondary" onClick={() => handleAnswer(false)} disabled={isAnswered}>{t('noButton')}</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GameScreen;
