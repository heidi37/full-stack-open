const FilteredCountriesList = ({ filteredCountries, setFilteredValue }) => {
  const handleClick = (countryName) => {
    setFilteredValue(countryName)
  }

  let message

  if (filteredCountries.length === 0) {
    message = ""
  } else if (filteredCountries.length > 10) {
    message = "Please enter a more specific search."
  } else {
    message = filteredCountries.map((country) => (
      <p key={country.name.common}>
        {country.flag} {country.name.common}{" "}
        <button onClick={() => handleClick(country.name.common)}>Show</button>
      </p>
    ))
  }

  return <div>{message}</div>
}

export default FilteredCountriesList
