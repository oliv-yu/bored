import React, { useEffect, useState } from 'react'
import Card from './shared/Card'
const axios = require('axios')

function WeatherCard({ location }) {
	const [weather, setWeather] = useState({})

	const getForecast = () => {
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
	}

	useEffect(() => {
		getForecast()
	}, [location]) //eslint-disable-line

	return (
		<Card title="TALK ABOUT THE WEATHER" type="weather">
			{weather.main?.temp && (
				<div className="card" style={{ width: '400px' }}>
					<div className="card-body">
						<h5 className="card-title">
							<img
								src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
								alt={weather.weather[0].description}
								title={weather.weather[0].main}
							/>
							<span>
								{weather.name} - {weather.main.temp} F
							</span>
						</h5>

						<div className="card-text">
							<div>Feels like: {weather.main.feels_like}</div>
							<div>Humidity: {weather.main.humidity}%</div>
							<div>Wind: {weather.wind.speed} mph</div>
						</div>
					</div>
				</div>
			)}

			<button type="button" className="btn btn-primary" onClick={getForecast}>
				Check!
			</button>
		</Card>
	)
}

export default WeatherCard
