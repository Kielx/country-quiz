import cardIcon from "./images/undrawAdventure.svg";

function App() {
  return (
    <div className="App w-full h-full bg-cover flex">
      <div className="Card m-auto w-4/6 lg:w-3/6 max-w-md h-2/3 bg-white rounded-xl relative">
        <h1 className="CardText max-w-1/2 -top-8 md:-top-12 text-lg sm:text-3xl text-white font-bold uppercase absolute ">
          Country Quiz
        </h1>
        <img
          src={cardIcon}
          className="h-auto absolute -top-8 right-0 w-20 md:w-40 md:-top-16"
        ></img>

        <h2 className="QuestionText text-2xl text-indigo-800 text-center font-bold pt-10 md:pt-20">
          Kuala Lumpur is the capital of
        </h2>
      </div>
    </div>
  );
}

export default App;
