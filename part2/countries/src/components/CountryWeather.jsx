const api_key = import.meta.env.VITE_SOME_KEY
import { useState, useEffect } from "react"

const CountryWeather = ( {lat, lng} ) => {
  const [countryWeather, setCountryWeather] = useState([])

  useEffect(() => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lng + "&appid=" +
        api_key,
    )
      .then((res) => res.json())
      .then((data) => {
        setCountryWeather(data)
      })
      .catch((err) => console.error(err))
  }, [])

  console.log(countryWeather)

  return (
    <div>
      <h3>The Weather</h3>
      <p>{countryWeather.weather?.[0]?.description}</p>
    </div>
  )
}

export default CountryWeather
