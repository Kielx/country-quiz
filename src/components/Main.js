import { useState, useEffect } from "react";
import cardIcon from "../images/undrawAdventure.svg";
import hiScore from "../images/undraw_winners.svg";

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
          <div className="flex flex-col items-center p-10 gap-3">
            <img
              aria-hidden="true"
              src={hiScore}
              className="w-1/2"
              alt="A around the globe traveller"
            ></img>
            <h2 className="QuestionText text-3xl text-indigo-800 text-center font-extrabold pt-8  uppercase">
              Results
            </h2>
            <p>
              You got{" "}
              <span className="text-3xl text-green-400 font-bold">
                {points}
              </span>{" "}
              correct answers!
            </p>
            {/* Button resets stats and restarts game */}
            <button
              className="mt-10 w-1/2 border-2 border-indigo-800 p-3 text-indigo-800 rounded-xl cursor-pointer transition-all hover:bg-yellow-500 hover:border-yellow-500 hover:text-white"
              onClick={() => {
                setIncorrect(false);
                setAnswered(false);
                setPoints(0);
                setClicked(false);
              }}
            >
              Try Again
            </button>
          </div>
        ) : (
          /* Question part of card */
          <>
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
              {country.capital
                ? `${country.capital} is the capital of`
                : `Country without capital city`}
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
                className={`${answered ? "visible" : "invisible"} btn-selected`}
                onClick={() => {
                  setAnswered(false);
                  incorrect ? setClicked(true) : setClicked(false);
                }}
              >
                {incorrect ? "RESULTS" : "NEXT"}
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Main;
