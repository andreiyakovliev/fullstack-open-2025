import { useState } from "react";
import { useEffect } from "react";
import countryService from "./services/countries";
import Filter from "./components/Filter";
import CountryList from "./components/CountryList"
import CountryDetails from "./components/CountryDetails"

const App = () => {

  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');

  const filteredCountries = searchTerm
    ? countries.filter(country =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : countries;

  const countryToShow = selectedCountry || (filteredCountries.length === 1 ? filteredCountries[0] : null);

  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountry => {
        setCountries(initialCountry)
      })
  }, [])

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setSearchTerm(event.target.value)
    setSelectedCountry(null);
  }

  const handleShowCountry = (selectedCountry) => {
    console.log(selectedCountry);
    setSelectedCountry(selectedCountry);
  }

  return (
    <div>
      <Filter value={searchTerm} onChange={handleSearchChange} />
      {countryToShow ? (
        <CountryDetails country={countryToShow} />
      ) : (
        <CountryList countries={filteredCountries} onClick={handleShowCountry} />
      )}
    </div>
  )
}

export default App