import { useEffect, useState } from "react";
import Main from "./components/Main";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const [countries, setCountries] = useState("");
  const [loading, setLoading] = useState(true);

  //useEffect to fetch RESTcountries data
  useEffect(() => {
    fetch("https://restcountries.eu/rest/v2/all")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setCountries(json);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="App w-full h-full">
      {loading ? <LoadingSpinner /> : <Main countries={countries} />}

      <Footer></Footer>
    </div>
  );
}

export default App;
