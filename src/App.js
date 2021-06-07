import React, { useState } from 'react'
import panda from './img/panda.png'
import './App.css'
import ActivityCard from './components/ActivityCard'
import BusinessCard from './components/BusinessCard'
import PetCard from './components/PetCard'
import { getCurrentPosition } from './components/utils/utils'

function App() {
	const [location, setLocation] = useState({ lat: 40.75, lng: -73.98 })

	const _setCurrentLocation = async () => {
		try {
			const { coords } = await getCurrentPosition()

			setLocation({ lat: coords.latitude, lng: coords.longitude })
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className="App">
			<header className="App-header">
				<img src={panda} className="App-logo" alt="logo" />
				Feeling Bored?
			</header>

			<button
				onClick={() => _setCurrentLocation()}
				className="btn btn-primary btn-sm"
			>
				Use Current Location
			</button>

			<div className="App-body">
				<ActivityCard />
				<PetCard location={location} />
				<BusinessCard location={location} />
			</div>
		</div>
	)
}

export default App
