import React, { useState, useEffect } from 'react';
import { GameState, GameRound } from './types';
import { prepareGameSession } from './services/geminiService';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import EndScreen from './components/EndScreen';
import Loader from './components/Loader';
import { TOTAL_ROUNDS } from './constants';
import { useLanguage } from './contexts/LanguageContext';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.START);
  const [gameData, setGameData] = useState<GameRound[]>([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    document.title = `${t('appTitle')}: ${t('appSubtitle')}`;
  }, [t]);

  const handleStartGame = async (language: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const sessionData = await prepareGameSession(language);
      setGameData(sessionData);
      setCurrentRound(0);
      setScore(0);
      setGameState(GameState.PLAYING);
    } catch (err) {
      setError(t('errorCouldNotStart'));
      console.error(err);
      setGameState(GameState.START); // Go back to start screen on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswer = (wasCorrect: boolean) => {
    if (wasCorrect) {
      setScore(prevScore => prevScore + 1);
    }

    if (currentRound < TOTAL_ROUNDS - 1) {
      setCurrentRound(prevRound => prevRound + 1);
    } else {
      setGameState(GameState.END);
    }
  };

  const handlePlayAgain = () => {
    setGameState(GameState.START);
    setGameData([]);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
            <Loader text={t('loaderCreatingGame')} />
        </div>
      );
    }

    switch (gameState) {
      case GameState.START:
        return (
          <>
            {error && <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-red-500 text-white p-3 rounded-lg shadow-lg">{error}</div>}
            <StartScreen onStartGame={handleStartGame} />
          </>
        );
      case GameState.PLAYING:
        if (gameData.length > 0) {
          return <GameScreen 
                    roundData={gameData[currentRound]} 
                    onAnswer={handleAnswer}
                    currentRound={currentRound}
                    totalRounds={TOTAL_ROUNDS}
                    score={score}
                 />;
        }
        return null;
      case GameState.END:
        return <EndScreen score={score} onPlayAgain={handlePlayAgain} />;
      default:
        return <StartScreen onStartGame={handleStartGame} />;
    }
  };

  return (
    <main className="container mx-auto px-4">
      {renderContent()}
    </main>
  );
};

export default App;
