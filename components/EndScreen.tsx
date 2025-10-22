import React from 'react';
import Card from './Card';
import Button from './Button';
import { TOTAL_ROUNDS } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

interface EndScreenProps {
  score: number;
  onPlayAgain: () => void;
}

const EndScreen: React.FC<EndScreenProps> = ({ score, onPlayAgain }) => {
  const { t } = useLanguage();
  const percentage = Math.round((score / TOTAL_ROUNDS) * 100);
  
  let messageKey = '';
  if (percentage > 80) {
    messageKey = 'endScreenMessageExcellent';
  } else if (percentage > 50) {
    messageKey = 'endScreenMessageGood';
  } else {
    messageKey = 'endScreenMessageNice';
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-teal-400 mb-2">{t(messageKey)}</h2>
        <p className="text-slate-300 text-lg mb-4">{t('endScreenFinished')}</p>
        <p className="text-6xl font-black text-white mb-6">
          {score} / {TOTAL_ROUNDS}
        </p>
        <Button onClick={onPlayAgain}>{t('playAgainButton')}</Button>
      </Card>
    </div>
  );
};

export default EndScreen;
