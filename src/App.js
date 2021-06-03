import React from 'react'
import panda from './img/panda.png'
import './App.css'
import ActivityCard from './components/ActivityCard'
import PetCard from './components/PetCard'
import RestaurantCard from './components/RestaurantCard'

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={panda} className="App-logo" alt="logo" />
				Feeling Bored?
			</header>

			<div className="App-body">
				<ActivityCard />
				<PetCard />
				<RestaurantCard />
			</div>
		</div>
	)
}

export default App
