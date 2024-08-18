import React from 'react';

interface QuestionProps {
  question: string;
  onAnswer: (isYes: boolean) => void;
}

const Question: React.FC<QuestionProps> = ({ question, onAnswer }) => {
  return (
    <div>
      <p>{question}</p>
      <button onClick={() => onAnswer(true)}>Yes</button>
      <button onClick={() => onAnswer(false)}>No</button>
    </div>
  );
};

export default React.memo(Question);