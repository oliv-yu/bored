import React, { useState } from 'react'
import panda from './img/panda.png'
import ActivityCard from './components/ActivityCard'
import BusinessCard from './components/BusinessCard'
import PetCard from './components/PetCard'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import moment from 'moment'
import { DEFAULT_LOCATION } from './components/utils/constants'

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

	const _handleToggleMode = () => {
		var element = document.body
		element.classList.toggle('dark-mode')
	}

	return (
		<div className="bored-app">
			<div className="bored-header">
				<img src={panda} alt="bored-panda" />
				<span>Feeling Bored?</span>
			</div>

			<div className="bored-body">
				<div className="bored-search">
					<div className="todays-date">
						{moment().format('dddd')}, {moment().format('LL')}
					</div>

					<SearchBar location={location} onChangeLocation={setLocation} />

					<button onClick={_setCurrentLocation} className="btn btn-sm">
						<i className="bi bi-geo-alt"></i>
						Use Current Location
					</button>

					<button
						onClick={_handleToggleMode}
						style={{ marginLeft: '10px' }}
						className="btn btn-sm"
					>
						Switch Theme Mode
					</button>
				</div>

				<WeatherCard location={location} />

				<ActivityCard />

				<PetCard location={location} />

				<BusinessCard location={location} onChangeLocation={setLocation} />
			</div>
		</div>
	)
}

export default Bored
