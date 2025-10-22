import React, { useState } from 'react';
import Card from './Card';
import Button from './Button';
import Header from './Header';
import LanguageSelector from './LanguageSelector';
import { SUPPORTED_LANGUAGES } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

interface StartScreenProps {
  onStartGame: (language: string) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStartGame }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>(SUPPORTED_LANGUAGES[0].code);
  const { t } = useLanguage();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value);
  };

  const handleStart = () => {
    onStartGame(selectedLanguage);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Header />
      <Card className="w-full max-w-md">
        <div className="space-y-6">
          <LanguageSelector selectedLanguage={selectedLanguage} onChange={handleLanguageChange} />
          <Button onClick={handleStart}>
            {t('startGameButton')}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default StartScreen;
