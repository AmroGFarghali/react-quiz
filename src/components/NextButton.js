import React from "react";

export const NextButton = ({
  selectedOption,
  dispatch,
  maxPoints,
  points,
  index,
  numQuestions,
}) => {
  if (selectedOption == null) return null;

  // if (index > numQuestions - 1) return null;

  if (index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "finishQuiz" });
        }}
      >
        Finish
      </button>
    );

  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "nextQuestion" });
        }}
      >
        Next
      </button>
    );
};
