import React from "react";

export const Options = ({ question, dispatch, selectedOption }) => {
  const hasAnswered = selectedOption != null;

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          onClick={() => {
            dispatch({ type: "answer", payload: index });
          }}
          key={option}
          disabled={hasAnswered}
          className={`btn btn-option ${index === selectedOption ? "answer" : ""}
          ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          } `}
        >
          {option}
        </button>
      ))}
    </div>
  );
};
