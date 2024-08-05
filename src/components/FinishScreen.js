import React from "react";

export const FinishScreen = ({ dispatch, maxPoints, points }) => {
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {maxPoints} points
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
};
