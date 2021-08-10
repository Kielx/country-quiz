import React from "react";
import cardIcon from "../images/undrawAdventure.svg";

const FlagQuestion = ({
  points,
  country,
  answered,
  options,
  setAnswered,
  incorrect,
  setClicked,
  setOpenModal,
}) => {
  return (
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
      <div className="flex flex-col gap-4 items-center pt-16 mx-4 md:pt-20">
        <img
          className="w-1/4 border-gray-50 border"
          src={country.flag}
          alt="country flag"
        ></img>
        <h2 className="QuestionText text-2xl text-indigo-800 text-center items-center font-bold ">
          {` Which country does this flag belong to?`}
        </h2>
      </div>
      <ul
        className={`QuestionList p-8 flex flex-col gap-6 ${
          answered ? "pointer-events-none" : "pointer-events-auto"
        }`}
      >
        {options}
      </ul>
      <div className="p-8 pt-0 flex">
        <button
          className={`${answered ? "visible" : "invisible"} btn-learn-more`}
          onClick={() => setOpenModal(true)}
        >
          Learn More
        </button>
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
  );
};

export default FlagQuestion;
