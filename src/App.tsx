import React, { useState, useEffect, useCallback } from 'react';
import Question from './Question.js';
import NodeCache from 'node-cache';
import { QUESTIONS } from './questions.js';

const cache = new NodeCache();

const App: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [yesCount, setYesCount] = useState<number>(0);
  const [totalRuns, setTotalRuns] = useState<number>(0);
  const [averageScore, setAverageScore] = useState<number>(0);
  const [currentScore, setCurrentScore] = useState<number | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    const storedRuns = cache.get<number>('totalRuns') || 0;
    const storedAverage = cache.get<number>('averageScore') || 0;
    setTotalRuns(storedRuns);
    setAverageScore(storedAverage);
  }, []);

  const handleAnswer = useCallback((isYes: boolean) => {
    setYesCount((prevYesCount) => {
      const updatedYesCount = isYes ? prevYesCount + 1 : prevYesCount;

      if (currentQuestion === Object.keys(QUESTIONS).length) {
        const score = (100 * updatedYesCount) / Object.keys(QUESTIONS).length;
        setCurrentScore(score);

        const newTotalRuns = totalRuns + 1;
        const newAverageScore = ((averageScore * totalRuns) + score) / newTotalRuns;

        setTotalRuns(newTotalRuns);
        setAverageScore(newAverageScore);

        cache.set('totalRuns', newTotalRuns);
        cache.set('averageScore', newAverageScore);

        setIsCompleted(true);
      } else {
        setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      }

      return updatedYesCount;
    });
  }, [currentQuestion, totalRuns, averageScore]);

  const startNewRun = useCallback(() => {
    setCurrentQuestion(1);
    setYesCount(0);
    setCurrentScore(null);
    setIsCompleted(false);
  }, []);

  return (
    <div>
      <h1>Yes/No Questionnaire</h1>
      {isCompleted ? (
        <div>
          <h2>Your score for this run: {currentScore}%</h2>
          <h3>Average score for all runs: {averageScore}%</h3>
          <button onClick={startNewRun}>Start New Run</button>
        </div>
      ) : (
        <Question question={QUESTIONS[currentQuestion]} onAnswer={handleAnswer} />
      )}
    </div>
  );
};

export default App;