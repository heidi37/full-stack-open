import { useState, useEffect } from 'react'
import countryService from './services/countries'
import FilteredCountriesList from './components/FilteredCountriesList'

function App() {
  const [countries, setCountries] = useState(null)
  const [filteredCountries, setFilteredCountries] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)

  
  console.log("outer ALL countries", countries)

  useEffect(() => {
    countryService.getAll().then((allCountries) => {
      setCountries(allCountries)
    })
  }, [])

  const handleChange = (event) => {
    console.log("Changed", event.target.value)
    setFilteredCountries(countries.filter(country => country.name.common.includes(event.target.value)))
    console.log("countries:", filteredCountries)
  }

  return (
    <>
      <h1>Countries</h1>
      <label htmlFor="findField">Find Countries:</label>
      <input type="text" id="findField" onChange={handleChange}></input>
      {filteredCountries &&
      <FilteredCountriesList filteredCountries={filteredCountries} />
      }

    </>
  )
}

export default App
