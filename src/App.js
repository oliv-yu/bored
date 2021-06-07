import React from 'react'
import panda from './img/panda.png'
import './App.css'
import ActivityCard from './components/ActivityCard'
import BusinessCard from './components/BusinessCard'
import PetCard from './components/PetCard'

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
				<BusinessCard />
			</div>
		</div>
	)
}

export default App
