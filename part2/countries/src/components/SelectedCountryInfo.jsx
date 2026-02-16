const SelectedCountryInfo = ( {selectedCountry} ) => {

  const languageArray = Object.values(selectedCountry.languages);

  
  return (
    <div>
      <h1>{selectedCountry.name.common}</h1>
      <p>Capital: {selectedCountry.capital}</p>
      <p>Area: {selectedCountry.area}</p>
      <h2>Languages</h2>
      <ul>
      {languageArray.map(language => <li key={language}>{language}</li>)}
      </ul>
      <img alt={selectedCountry.flags.alt} src={selectedCountry.flags.png} />
    </div>
  )
}

export default SelectedCountryInfo
