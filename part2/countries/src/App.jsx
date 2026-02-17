import { useState, useEffect } from 'react'
import countryService from './services/countries'
import FilteredCountriesList from './components/FilteredCountriesList'
import SelectedCountryInfo from './components/SelectedCountryInfo'

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
      countryService.getOne(filteredCountries[0].name.common).then((country) => {
        setSelectedCountry(country)
      })
    } else {
      setSelectedCountry(null)
    }
  }, [filteredCountries])

  const handleChange = (event) => {
    setFilteredValue(event.target.value)
  }

  return (
    <>
      <h1>Countries</h1>
      <label htmlFor="findField">Find Countries:</label>
      <input type="text" id="findField" onChange={handleChange}></input>
      {!selectedCountry && filteredCountries &&
      <FilteredCountriesList filteredCountries={filteredCountries} />
      }
      {selectedCountry && <SelectedCountryInfo selectedCountry={selectedCountry} />}
    </>
  )
}

export default App
