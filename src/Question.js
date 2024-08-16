const Question = ({ question, onAnswer }) => {
    return (
      <div>
        <p>{question}</p>
        <button onClick={() => onAnswer(true)}>Yes</button>
        <button onClick={() => onAnswer(false)}>No</button>
      </div>
    );
  };
  
  export default Question;