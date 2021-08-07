import { useState, useEffect } from "react";
import cardIcon from "../images/undrawAdventure.svg";

const Main = ({
  country,
  options,
  points,
  setPoints,
  answered,
  setAnswered,
  incorrect,
  setIncorrect,
}) => {
  const [answerOrder, setAnswerOrder] = useState([]);

  const checkAnswer = (event) => {
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
    <main className="Main py-20 w-full h-full flex">
      <div className="Card m-auto sm:w-5/6 lg:w-3/6 max-w-md min-h-2/3 bg-white rounded-xl relative">
        <h1 className="CardText max-w-1/2 -top-8 md:-top-12 text-lg sm:text-3xl text-white font-bold uppercase absolute ">
          Country Quiz
        </h1>
        <img
          aria-hidden="true"
          src={cardIcon}
          className="h-auto absolute -top-8 right-0 w-20 md:w-40 md:-top-16"
          alt="A around the globe traveller"
        ></img>

        <span className="absolute top-2 left-2 sm:top-4 sm:left-8 sm:text-2xl  text-indigo-800 text-lg font-bold">
          {`${points} points`}
        </span>
        <h2 className="QuestionText text-2xl text-indigo-800 text-center font-bold pt-16 mx-4 md:pt-20">
          {country.capital} is the capital of
        </h2>
        <ul
          className={`QuestionList p-8 flex flex-col gap-6 ${
            answered ? "pointer-events-none" : "pointer-events-auto"
          }`}
        >
          {options}
        </ul>
        <div className="p-8 pt-0">
          <button
            className={`${answered ? "visible" : "invisible"} btn-selected `}
            onClick={() => setAnswered(false)}
          >
            NEXT
          </button>
        </div>
      </div>
    </main>
  );
};

export default Main;
