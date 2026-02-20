const api_key = import.meta.env.VITE_SOME_KEY
import { useState, useEffect } from "react"

const CountryWeather = ({ lat, lng, capital }) => {
  const [countryWeather, setCountryWeather] = useState([])
  const iconURL = `https://openweathermap.org/payload/api/media/file/${countryWeather.weather?.[0]?.icon}.png`

  useEffect(() => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
        lat +
        "&lon=" +
        lng +
        "&appid=" +
        api_key,
    )
      .then((res) => res.json())
      .then((data) => {
        setCountryWeather(data)
      })
      .catch((err) => console.error(err))
  }, [])

  return (
    <div>
      <h2>The Weather in {capital}</h2>
      <p>
        Temperature {countryWeather.main
          ? (countryWeather.main.temp - 273.15).toFixed(2)
          : "Loading..."} Celsius
      </p>
      <img src={iconURL} alt={countryWeather.weather?.[0]?.description} />
      <p>
        Wind {countryWeather.wind
          ? countryWeather.wind.speed.toFixed(2)
          : "Loading..."} m/s
      </p>
    </div>
  )
}

export default CountryWeather
