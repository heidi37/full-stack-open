const SelectedCountryInfo = ( {selectedCountry} ) => {

  const languageArray = Object.values(selectedCountry.languages);

  
  return (
    <div>
      <h2>{selectedCountry.name.common}</h2>
      <p>Capital: {selectedCountry.capital}</p>
      <p>Area: {selectedCountry.area}</p>
      <h3>Languages</h3>
      <ul>
      {languageArray.map(language => <li key={language}>{language}</li>)}
      </ul>
      <img alt={selectedCountry.flags.alt} src={selectedCountry.flags.png} />
    </div>
  )
}

export default SelectedCountryInfo
