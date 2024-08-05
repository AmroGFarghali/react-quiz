import { Options } from "./Options";

const Question = ({ question, dispatch, selectedOption }) => {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options
        selectedOption={selectedOption}
        dispatch={dispatch}
        question={question}
      />
    </div>
  );
};

export default Question;
