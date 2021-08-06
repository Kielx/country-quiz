import { useEffect, useState } from "react";
import Main from "./components/Main";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState("");
  const [options, setOptions] = useState([]);

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

  useEffect(() => {
    //pick random country from countries state array
    const pickRandomCountry = () => {
      const randomCountry =
        countries.length > 0
          ? countries[Math.floor(Math.random() * countries.length)]
          : null;
      if (randomCountry) {
        return randomCountry;
      }
    };
    //Pick one random country and set it to country state
    //It will be the country that will be the correct option
    const randomCountry = pickRandomCountry();
    setCountry(randomCountry);
    const opt = [];
    //Push correct country to options array
    opt.push(randomCountry);
    //Generate options array of 3 random countries + one correct
    while (countries.length > 0 && opt.length < 4) {
      let newCountry = pickRandomCountry();
      if (!opt.some((option) => option.name === newCountry.name)) {
        opt.push(newCountry);
      }
    }

    setOptions(opt);
  }, [countries]);

  return (
    <div className="App w-full h-full">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Main countries={countries} country={country} options={options} />
      )}

      <Footer></Footer>
    </div>
  );
}

export default App;
