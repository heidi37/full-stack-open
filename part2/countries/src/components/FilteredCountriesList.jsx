const FilteredCountriesList = ( {filteredCountries} ) => {
  console.log("Filtered Countries in Component", filteredCountries)

  return (
    <div>
      {filteredCountries.length < 10 && filteredCountries.length >= 1 ? filteredCountries.map(country => <p key={country.name.common}>{country.name.common}</p>) : "Please enter a more specific search."}
    </div>
  )
}

export default FilteredCountriesList
