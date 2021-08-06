import { useEffect, useState } from "react";
import cardIcon from "./images/undrawAdventure.svg";

function App() {
  const [countries, setCountries] = useState("");

  //useEffect to fetch RESTcountries data
  useEffect(() => {
    fetch("https://restcountries.eu/rest/v2/all")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setCountries(json);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="App w-full h-full">
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
            Kuala Lumpur is the capital of
          </h2>
          <ul className="QuestionList p-8 flex flex-col gap-6">
            <li className="QuestionListItem btn">
              <span className="QuestionListItemLetter font-bold text-xl ">
                A
              </span>
              <span className="QuestionListItemText">Vietnam</span>
            </li>
            <li className="QuestionListItem btn">
              <span className="QuestionListItemLetter font-bold text-xl ">
                B
              </span>
              <span className="QuestionListItemText">Malaysia</span>
            </li>
            <li className="QuestionListItem btn">
              <span className="QuestionListItemLetter font-bold text-xl ">
                C
              </span>
              <span className="QuestionListItemText">Sweden</span>
            </li>
            <li className="QuestionListItem btn-selected">
              <span className="QuestionListItemLetter font-bold text-xl ">
                D
              </span>
              <span className="QuestionListItemText">Austria</span>
            </li>
          </ul>
        </div>
      </main>
      <footer className="text-center text-sm text-white m-auto">
        <span>
          Created by{" "}
          <a className="font-bold" href="https://pantak.net/">
            Chris Pantak
          </a>{" "}
          <a
            className="font-semibold"
            href="https://devchallenges.io/challenges/Bu3G2irnaXmfwQ8sZkw8"
          >
            - devChallenges.io
          </a>
        </span>
      </footer>
    </div>
  );
}

export default App;
