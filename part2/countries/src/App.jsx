import { useState, useEffect } from 'react'
import countryService from './services/countries'
import FilteredCountriesList from './components/FilteredCountriesList'
import SelectedCountryInfo from './components/SelectedCountryInfo'
import CountryWeather from './components/CountryWeather'

function App() {
  const [countries, setCountries] = useState([])
  const [filteredValue, setFilteredValue] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

  const filteredCountries = countries.filter(country => country.name.common.includes(filteredValue))

  useEffect(() => {
    countryService.getAll().then((allCountries) => {
      setCountries(allCountries)
    })
  }, [])

  useEffect(() => {
    if (filteredCountries && filteredCountries.length === 1){
      setSelectedCountry(filteredCountries[0])
    } else {
      setSelectedCountry(null)
    }
  }, [filteredCountries])

  const handleChange = (event) => {
    setFilteredValue(event.target.value)
  }

  console.log(selectedCountry)

  return (
    <>
      <h1>Countries</h1>
      <label htmlFor="findField">Find Countries:</label>
      <input type="text" id="findField" onChange={handleChange}></input>
      {!selectedCountry && filteredCountries &&
      <FilteredCountriesList filteredCountries={filteredCountries} setFilteredValue={setFilteredValue} />
      }
      {selectedCountry && <SelectedCountryInfo selectedCountry={selectedCountry} />}
      {selectedCountry && <CountryWeather lat={selectedCountry.latlng[0]} lng={selectedCountry.latlng[1]}/>}
    </>
  )
}

export default App
