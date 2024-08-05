/* eslint-disable default-case */

import { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "increment_count": {
      return {
        count: state.count + state.step,
        step: state.step,
      };
    }

    case "decrement_count": {
      return {
        count: state.count - state.step,
        step: state.step,
      };
    }

    case "define_count": {
      return {
        count: Number(action.newCount),
        step: state.step,
      };
    }
    case "define_step": {
      return {
        count: state.count,
        step: Number(action.newStep),
      };
    }

    case "reset": {
      return {
        count: 0,
        step: 1,
      };
    }
  }
  throw Error(action.type);
};

function DateCounter() {
  const [state, dispatch] = useReducer(reducer, { count: 0, step: 1 });
  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + state.count);

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={state.step}
          onChange={(e) => {
            dispatch({ type: "define_step", newStep: e.target.value });
          }}
        />
        <span>{state.step}</span>
      </div>

      <div>
        <button onClick={() => dispatch({ type: "decrement_count" })}>-</button>
        <input
          onChange={(e) => {
            dispatch({ type: "define_count", newCount: e.target.value });
          }}
          value={state.count}
        />
        <button onClick={() => dispatch({ type: "increment_count" })}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button
          onClick={() => {
            dispatch({ type: "reset" });
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
export default DateCounter;
