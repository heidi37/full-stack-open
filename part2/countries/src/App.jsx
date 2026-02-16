import { useState, useEffect } from 'react'
import countryService from './services/countries'

function App() {
  const [countries, setCountries] = useState(null)
  
  // useEffect(() => {
  //   countryService.getAll().then((initialCountries) => {
  //     console.log(initialCountries.filter(country => country.includes))
  //   })
  // }, [countries])
  console.log(countries)

  const handleChange = function(event){
    countryService.getAll().then((allCountries) => {
      const results = allCountries.filter(country => country.name.common.includes(event.target.value))
      setCountries(results.map(result => result.name.common))
    })
  }

  return (
    <>
      <h1>Countries</h1>
      <label htmlFor="findField">Find Countries:</label>
      <input type="text" id="findField" onChange={handleChange}></input>
      {countries && Object.keys(countries).length <= 10 && countries.map(country => <p key={countries.indexOf(country)}>{country}</p>)}
      {countries && Object.keys(countries).length > 10 ? <p>Too many results. Be more specific.</p> : ""}
      {/* {countries && Object.keys(countries).length === 1 ? <img src={countries[0].flags.png} alt={countries[0].flags.alt} /> : ""} */}
    </>
  )
}

export default App
