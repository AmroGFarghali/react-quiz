import React from "react";

export const Progress = ({
  points,
  maxPossiblePoints,
  index,
  numQuestions,
  selectedOption,
}) => {
  return (
    <header className="progress">
      <progress
        value={index + Number(selectedOption != null)}
        max={numQuestions}
      ></progress>
      <p>
        Question <strong>{index + 1} </strong> /{numQuestions}
      </p>

      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
};
