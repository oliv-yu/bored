import React, { useState } from 'react'
import panda from './img/panda.png'
import axios from 'axios'
import ActivityCard from './components/ActivityCard'
import BusinessCard from './components/BusinessCard'
import PetCard from './components/PetCard'
import WeatherCard from './components/WeatherCard'
import moment from 'moment'
import { CORS_PROXY } from './components/utils/constants'

function Bored() {
	const [location, setLocation] = useState({ lat: 40.75, lng: -73.98 })
	const [keyword, setKeyword] = useState('')
	const [autocompleteList, setAutocompleteList] = useState([])
	const [focus, setFocus] = useState(-1)

	const _setCurrentLocation = () => {
		navigator.geolocation.getCurrentPosition(
			({ coords }) => {
				setLocation({ lat: coords.latitude, lng: coords.longitude })
				setKeyword('Current Location')
			},
			(error) => {
				console.log(error)
			}
		)
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

	const _handleKeyPress = (event) => {
		if (event.key === 'ArrowUp') {
			setFocus(focus === -1 ? autocompleteList.length - 1 : focus - 1)
		}

		if (event.key === 'ArrowDown') {
			setFocus(focus === autocompleteList.length - 1 ? -1 : focus + 1)
		}

		if (event.key === 'Enter' && focus > -1) {
			_handleOnClickCity(autocompleteList[focus].id)
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
				setFocus(-1)
			})
			.catch(console.log)
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

					<div className="input-group mb-3">
						<div className="dropdown">
							<input
								type="text"
								className="form-control dropdown-toggle"
								placeholder="Search a place"
								aria-label="Search a place"
								onChange={_handleInputChange}
								onKeyDown={_handleKeyPress}
								value={keyword}
							/>

							{autocompleteList.length > 0 && (
								<div
									className="dropdown-menu show"
									aria-labelledby="autocomplete-list"
								>
									{autocompleteList.map((item, idx) => (
										<button
											key={item.id}
											onMouseEnter={() => setFocus(idx)}
											className={
												idx === focus ? 'active dropdown-item' : 'dropdown-item'
											}
											onTouchStart={() => _handleOnClickCity(item.id)}
											onClick={() => _handleOnClickCity(item.id)}
											type="button"
										>
											{item.title}
										</button>
									))}
								</div>
							)}
						</div>
					</div>
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
