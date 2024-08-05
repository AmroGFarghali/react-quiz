import { useEffect, useReducer } from "react";
import DateCounter from "./DateCounter";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import { Progress } from "./Progress";
import { FinishScreen } from "./FinishScreen";
import { NextButton } from "./NextButton";
import { Timer } from "./Timer";

const initialState = {
  questions: [],
  //"loading, "error", "ready", "active", "finished"
  status: "loading",
  index: 0,
  selectedOption: null,
  points: 0,
  secondsRemaining: 180,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        status: "ready",
        questions: action.payload,
      };
    case "dataLoading":
      return {
        ...state,
        status: "loading",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };

    case "start":
      return {
        ...state,
        status: "active",
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
      };
    case "nextQuestion":
      return {
        ...state,
        selectedOption: null,
        index: state.index++,
      };

    case "answer":
      const question = state.questions[state.index];
      return {
        ...state,
        selectedOption: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    case "finishQuiz":
      return {
        ...state,
        status: "finished",
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };
    default:
      throw new Error("Action unkown");
  }
};

export default function App() {
  const [
    { questions, status, index, selectedOption, points, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, curr) => prev + curr.points,
    0
  );

  const fetchQuestions = async () => {
    try {
      dispatch({ type: "dataLoading" });
      const req = await fetch("http://localhost:8000/questions");
      const data = await req.json();
      dispatch({ type: "dataReceived", payload: data });
    } catch {
      dispatch({ type: "dataFailed" });
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen dispatch={dispatch} numQuestions={numQuestions} />
        )}
        {status === "active" && (
          <>
            <Progress
              maxPossiblePoints={maxPossiblePoints}
              index={index}
              numQuestions={numQuestions}
              points={points}
              selectedOption={selectedOption}
            />
            <Question
              selectedOption={selectedOption}
              dispatch={dispatch}
              question={questions[index]}
              index={index}
            />
            <footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                numQuestions={numQuestions}
                selectedOption={selectedOption}
                dispatch={dispatch}
                index={index}
              />
            </footer>
          </>
        )}

        {status === "finished" && (
          <FinishScreen
            dispatch={dispatch}
            points={points}
            maxPoints={maxPossiblePoints}
          />
        )}
      </Main>
    </div>
  );
}
