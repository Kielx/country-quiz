import { useState, useEffect } from "react";

import CapitalQuestion from "./CapitalQuestion";
import FlagQuestion from "./FlagQuestion";
import Results from "./Results";

const Main = ({
  country,
  options,
  points,
  setPoints,
  answered,
  setAnswered,
  incorrect,
  setIncorrect,
  questionType,
}) => {
  const [answerOrder, setAnswerOrder] = useState([]);
  const [clicked, setClicked] = useState(false);

  const checkAnswer = (event) => {
    //Function checks if the answer is correct
    //If it is, it adds the points to the score
    //If it is not, it adds wrong classname, and sets the incorrect variable to true
    if (!answered) {
      if (event.target.children[1].innerHTML === country.name) {
        event.target.className += "correct";
        setPoints(points + 1);
      } else {
        event.target.className += "wrong";
        setIncorrect(true);
      }
    }
    setAnswered(true);
  };

  useEffect(() => {
    function generateRandomNumberArr() {
      //Generate random number from 0 to 4 and push it to array if it does not contain it
      //Function is used to generate answer order
      const arr = [];

      while (arr.length < 4) {
        const randomNumber = Math.floor(Math.random() * 4);
        if (arr.indexOf(randomNumber) === -1) {
          arr.push(randomNumber);
        }
      }
      return arr;
    }

    setAnswerOrder(generateRandomNumberArr());
  }, []);

  options = options.map((option, index) => (
    <li
      key={option.capital}
      className={` order-${answerOrder[index]} QuestionListItem btn ${
        answered
          ? option.capital === country.capital
            ? "correct pointer-events-none"
            : ""
          : ""
      }`}
      onClick={checkAnswer}
    >
      <span
        className={`QuestionListItemLetter font-bold text-xl uppercase pointer-events-none`}
      >
        {String.fromCharCode(97 + answerOrder[index])}
      </span>
      <span className="QuestionListItemText pointer-events-none">
        {option.name}
      </span>
    </li>
  ));

  return (
    /****** Main card element ******/

    <main className="Main py-20 w-full h-full flex">
      <div className="Card m-auto w-full sm:w-5/6 lg:w-3/6 max-w-md min-h-2/3 bg-white rounded-xl relative">
        <h1 className="CardText max-w-1/2 -top-8 md:-top-12 text-lg sm:text-3xl text-white font-bold uppercase absolute ">
          Country Quiz
        </h1>
        {/* If incorrect answer is provided and results button is clicked
         * display results page
         *  */}
        {incorrect && clicked ? (
          <Results
            setIncorrect={setIncorrect}
            setAnswered={setAnswered}
            setPoints={setPoints}
            setClicked={setClicked}
            points={points}
          ></Results>
        ) : /* Question part of card */
        questionType === 0 ? (
          <FlagQuestion
            country={country}
            options={options}
            points={points}
            setPoints={setPoints}
            answered={answered}
            setAnswered={setAnswered}
            incorrect={incorrect}
            setIncorrect={setIncorrect}
            setClicked={setClicked}
          ></FlagQuestion>
        ) : (
          <CapitalQuestion
            country={country}
            options={options}
            points={points}
            setPoints={setPoints}
            answered={answered}
            setAnswered={setAnswered}
            incorrect={incorrect}
            setIncorrect={setIncorrect}
            setClicked={setClicked}
          ></CapitalQuestion>
        )}
      </div>
    </main>
  );
};

export default Main;
