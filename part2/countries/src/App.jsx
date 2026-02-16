import { useState, useEffect } from 'react'
import countryService from './services/countries'
import FilteredCountriesList from './components/FilteredCountriesList'
import SelectedCountryInfo from './components/SelectedCountryInfo'

function App() {
  const [countries, setCountries] = useState(null)
  const [filteredCountries, setFilteredCountries] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    countryService.getAll().then((allCountries) => {
      setCountries(allCountries)
    })
  }, [])

  useEffect(() => {
    if (filteredCountries && filteredCountries.length === 1){
      // setSelectedCountry(filteredCountries[0].name.common)
      countryService.getOne(filteredCountries[0].name.common).then((country) => {
        setSelectedCountry(country)
      })
    } else {
      setSelectedCountry(null)
    }
  }, [filteredCountries])

  const handleChange = (event) => {
    setFilteredCountries(countries.filter(country => country.name.common.includes(event.target.value)))
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
