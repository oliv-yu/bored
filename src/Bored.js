import React, { useState } from 'react'
import panda from './img/panda.png'
import ActivityCard from './components/ActivityCard'
import BusinessCard from './components/BusinessCard'
import PetCard from './components/PetCard'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import moment from 'moment'

const DEFAULT_LOCATION = { lat: 40.75, lng: -73.98 }

function Bored() {
	const [location, setLocation] = useState(DEFAULT_LOCATION)

	const _setCurrentLocation = () => {
		navigator.geolocation.getCurrentPosition(
			({ coords }) => {
				setLocation({ lat: coords.latitude, lng: coords.longitude })
			},
			(error) => {
				console.log(error)
			}
		)
	}

	return (
		<div className="bored-app">
			<header>
				<img src={panda} alt="bored-panda" />
				<span>Feeling Bored?</span>
			</header>

			<div className="bored-body">
				<div className="bored-search">
					<div className="todays-date">
						<h4>
							<strong>
								{moment().format('dddd')}, {moment().format('LL')}
							</strong>
						</h4>
					</div>

					<button
						onClick={_setCurrentLocation}
						className="btn btn-primary btn-sm"
					>
						<i className="bi bi-geo-alt"></i>
						Use Current Location
					</button>

					<SearchBar location={location} onChangeLocation={setLocation} />
				</div>

				<ActivityCard />

				<WeatherCard location={location} />

				<PetCard location={location} />

				<BusinessCard location={location} />
			</div>
		</div>
	)
}

export default Bored
