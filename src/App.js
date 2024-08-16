import React, { useState, useEffect } from 'react';
import {QUESTIONS} from './questions.ts';
import Question from './Question.js';
import NodeCache from 'node-cache';

const cache = new NodeCache();

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [yesCount, setYesCount] = useState(0);
  const [totalRuns, setTotalRuns] = useState(0);
  const [averageScore, setAverageScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const storedRuns = cache.get('totalRuns') || 0;
    const storedAverage = cache.get('averageScore') || 0;
    setTotalRuns(storedRuns);
    setAverageScore(storedAverage);
  }, []);

  const handleAnswer = (isYes) => {
    if (isYes) {
      setYesCount(yesCount + 1);
    }

    if (currentQuestion === Object.keys(QUESTIONS).length) {
      const score = (100 * yesCount) / Object.keys(QUESTIONS).length;
      setCurrentScore(score);

      const newTotalRuns = totalRuns + 1;
      const newAverageScore = ((averageScore * totalRuns) + score) / newTotalRuns;

      setTotalRuns(newTotalRuns);
      setAverageScore(newAverageScore);

      cache.set('totalRuns', newTotalRuns);
      cache.set('averageScore', newAverageScore);

      setIsCompleted(true); 
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const startNewRun = () => {
    setCurrentQuestion(1);
    setYesCount(0);
    setCurrentScore(null);
    setIsCompleted(false);
  };

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