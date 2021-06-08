import React, { useState } from 'react'
import panda from './img/panda.png'
import './App.scss'
import axios from 'axios'
import ActivityCard from './components/ActivityCard'
import BusinessCard from './components/BusinessCard'
import PetCard from './components/PetCard'
import { getCurrentPosition } from './components/utils/utils'
import { CORS_PROXY } from './components/utils/constants'

function App() {
	const [location, setLocation] = useState({ lat: 40.75, lng: -73.98 })
	const [keyword, setKeyword] = useState('')
	const [autocompleteList, setAutocompleteList] = useState([])

	const _setCurrentLocation = async () => {
		try {
			const { coords } = await getCurrentPosition()

			setLocation({ lat: coords.latitude, lng: coords.longitude })
			setKeyword('Current Location')
		} catch (error) {
			console.log(error)
		}
	}

	const _getAutocomplete = (keyword) => {
		axios
			.get(
				`${CORS_PROXY}https://autocomplete.search.hereapi.com/v1/autocomplete`,
				{
					params: {
						apiKey: `${process.env.REACT_APP_HERE_API_KEY}`,
						q: keyword,
					},
					mode: 'cors',
					credentials: 'include',
				}
			)
			.then((result) => {
				setAutocompleteList(result.data.items)
			})
			.catch(console.log)
	}

	const _handleInputChange = (event) => {
		setKeyword(event.target.value)

		if (event.target.value) {
			_getAutocomplete(event.target.value)
		}
	}

	const _handleOnClickCity = (id) => {
		axios
			.get(`${CORS_PROXY}https://lookup.search.hereapi.com/v1/lookup`, {
				params: {
					apiKey: `${process.env.REACT_APP_HERE_API_KEY}`,
					id,
				},
				mode: 'cors',
				credentials: 'include',
			})
			.then((result) => {
				setLocation(result.data.position)
				setKeyword(result.data.title)
				setAutocompleteList([])
			})
			.catch(console.log)
	}

	return (
		<div className="App">
			<header className="App-header">
				<img src={panda} className="App-logo" alt="logo" />
				Feeling Bored?
			</header>

			<div className="App-search input-group mb-3">
				<div className="dropdown">
					<input
						type="text"
						className="form-control dropdown-toggle"
						placeholder="Search a place"
						aria-label="Search a place"
						onChange={_handleInputChange}
						value={keyword}
					/>

					{autocompleteList.length > 0 && (
						<div
							className="dropdown-menu show"
							aria-labelledby="autocomplete-list"
						>
							{autocompleteList.map((item) => (
								<button
									key={item.id}
									className="dropdown-item"
									onClick={() => _handleOnClickCity(item.id)}
									type="button"
								>
									{item.title}
								</button>
							))}
						</div>
					)}
				</div>

				<div className="input-group-append">
					<button
						onClick={_setCurrentLocation}
						className="btn btn-outline-secondary"
					>
						Use Current Location
					</button>
				</div>
			</div>

			<div className="App-body">
				<ActivityCard />
				<PetCard location={location} />
				<BusinessCard location={location} />
			</div>
		</div>
	)
}

export default App
