import { useState, useEffect } from "react";
import cardIcon from "../images/undrawAdventure.svg";

const Main = ({ country, options }) => {
  const [answered, setAnswered] = useState(false);
  const [points, setPoints] = useState(0);
  const [answerOrder, setAnswerOrder] = useState([]);

  const checkAnswer = (event) => {
    setAnswered(true);
    if (event.target.children[1].innerHTML === country.name) {
      event.target.className += "correct";
      setPoints(points + 1);
    } else {
      event.target.className += "wrong";
    }
  };

  useEffect(() => {
    function generateRandomNumberArr() {
      //Generate random number from 0 to 4 and push it to array if it does not contain it
      const arr = [];

      while (arr.length < 4) {
        const randomNumber = Math.floor(Math.random() * 5);
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
      className={`order-${answerOrder[index]} QuestionListItem btn ${
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
        {String.fromCharCode(97 + index)}
      </span>
      <span className="QuestionListItemText pointer-events-none">
        {option.name}
      </span>
    </li>
  ));

  return (
    <main className="Main w-full h-full flex">
      <div className="Card m-auto w-4/6 lg:w-3/6 max-w-md min-h-2/3 bg-white rounded-xl relative">
        <h1 className="CardText max-w-1/2 -top-8 md:-top-12 text-lg sm:text-3xl text-white font-bold uppercase absolute ">
          Country Quiz
        </h1>
        <img
          aria-hidden="true"
          src={cardIcon}
          className="h-auto absolute -top-8 right-0 w-20 md:w-40 md:-top-16"
          alt="A around the globe traveller"
        ></img>

        <h2 className="QuestionText text-2xl text-indigo-800 text-center font-bold pt-10 md:pt-20">
          {country.capital} is the capital of
        </h2>
        <ul className="QuestionList p-8 flex flex-col gap-6">{options}</ul>
      </div>
    </main>
  );
};

export default Main;
