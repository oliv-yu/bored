import React, { useCallback, useEffect, useState } from 'react'
import Card from './shared/Card'
import moment from 'moment'
const axios = require('axios')

function WeatherCard({ location }) {
	const [weather, setWeather] = useState({})
	const [time, setTime] = useState(moment.utc())

	const getForecast = useCallback(() => {
		axios
			.get('https://api.openweathermap.org/data/2.5/weather', {
				params: {
					lat: location.lat,
					lon: location.lng,
					appid: process.env.REACT_APP_WEATHER_API_KEY,
					units: 'imperial',
				},
			})
			.then((response) => {
				setWeather(response.data)
			})
			.catch((error) => {
				console.log(error)
			})
	}, [location])

	const tick = () => {
		setTime(moment.utc())
	}

	useEffect(() => {
		getForecast()
	}, [getForecast])

	useEffect(() => {
		const timerID = setInterval(() => tick(), 1000)

		return function cleanup() {
			clearInterval(timerID)
		}
	})

	return (
		<Card title="TALK ABOUT THE WEATHER" type="weather">
			{weather.main?.temp && (
				<div>
					<div>
						<h4>
							<img
								src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
								alt={weather.weather[0].description}
								title={weather.weather[0].main}
							/>
							<span>
								{weather.name}, {weather.sys.country} - {weather.main.temp} F
							</span>
						</h4>

						<h5>
							{time
								.utcOffset(weather.timezone / 3600)
								.format('MMM DD YYYY hh:mm:ss A')}
						</h5>

						<div className="card-text">
							<div>Feels like: {weather.main.feels_like}</div>
							<div>Humidity: {weather.main.humidity}%</div>
							<div>Wind: {weather.wind.speed} mph</div>
						</div>
					</div>
				</div>
			)}
		</Card>
	)
}

export default WeatherCard
