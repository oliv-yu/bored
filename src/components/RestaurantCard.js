import React, { Component } from 'react'
import Card from './Card'
import location_icon from './../svg/location.svg'
import { getCurrentPosition } from './utils'

const axios = require('axios').default
const CORS_PROXY = 'https://ancient-escarpment-84180.herokuapp.com/'
const SEARCH_RESULT_COUNT = 5

class RestaurantCard extends Component {
	constructor(props) {
		super(props)

		this.state = {
			activeLink: -1,
			app_id: process.env.REACT_APP_HERE_APP_ID,
			app_code: process.env.REACT_APP_HERE_APP_CODE,
			center: null,
			keyword: '',
			location: '',
			restaurantList: [],
			suggestedList: [],
			zoom: 14,
		}
	}

	_placeMarkers = (coords, index) => {
		var svgMarkup =
			'<svg width="24" height="24" ' +
			'xmlns="http://www.w3.org/2000/svg">' +
			'<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
			'height="22" /><text x="12" y="18" font-size="12pt" ' +
			'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
			'fill="white">' +
			index +
			'</text></svg>'

		var icon = new window.H.map.Icon(svgMarkup),
			marker = new window.H.map.Marker(coords, { icon: icon })

		this.map.addObject(marker)
	}

	_clearMarkers = () => {
		const currentMarkers = this.map.getObjects()

		this.map.removeObjects(currentMarkers)
	}

	_generateMap = () => {
		this.platform = new window.H.service.Platform(this.state)

		var layer = this.platform.createDefaultLayers()
		var container = document.getElementById('here-map')

		this.map = new window.H.Map(container, layer.normal.map, {
			center: this.state.center,
			zoom: this.state.zoom,
		})

		var events = new window.H.mapevents.MapEvents(this.map)
		// eslint-disable-next-line
		var behavior = new window.H.mapevents.Behavior(events)
		// eslint-disable-next-line
		var ui = new window.H.ui.UI.createDefault(this.map, layer)
	}

	_getCity = (keyword) => {
		fetch(
			`https://developers.zomato.com/api/v2.1/locations?query=${keyword}&count=${SEARCH_RESULT_COUNT}`,
			{
				headers: { 'user-key': process.env.REACT_APP_ZOMATO_API_KEY },
				mode: 'cors',
			}
		)
			.then((results) => results.json())
			.then((data) => {
				this.setState({
					suggestedList: data.location_suggestions,
				})
			})
			.catch(console.log)
	}

	_setCurrentLocation = async () => {
		try {
			const { coords } = await getCurrentPosition()
			const { latitude, longitude } = coords
			const newCoords = { lat: latitude, lng: longitude }

			this.setState({
				center: newCoords,
				location: 'Current Location',
				suggestedList: [],
			})

			this._getRestaurants(newCoords)
			this.map.setCenter(newCoords)
		} catch (error) {
			console.log(error)
		}
	}

	_getRestaurants = ({ lat, lng }) => {
		fetch(
			`https://developers.zomato.com/api/v2.1/geocode?lat=${lat}&lon=${lng}`,
			{
				headers: { 'user-key': process.env.REACT_APP_ZOMATO_API_KEY },
				mode: 'cors',
			}
		)
			.then((results) => results.json())
			.then((data) => {
				let list = []
				data.nearby_restaurants.map((result) =>
					list.push(result.restaurant)
				)

				this._clearMarkers()

				list.map((restaurant, index) =>
					this._placeMarkers(
						{
							lat: restaurant.location.latitude,
							lng: restaurant.location.longitude,
						},
						index + 1
					)
				)

				this.setState({
					restaurantList: list,
				})
			})
			.catch(console.log)
	}

	_getRestaurantsYelp = ({ lat, lng }) => {
		axios
			.get(`${CORS_PROXY}https://api.yelp.com/v3/businesses/search`, {
				headers: {
					Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`,
				},
				params: {
					latitude: lat,
					longitude: lng,
					limit: 10,
				},
				mode: 'cors',
				credentials: 'include',
			})
			.then((res) => {
				let list = res.data.businesses

				this._clearMarkers()

				list.map((business, index) =>
					this._placeMarkers(
						{
							lat: business.coordinates.latitude,
							lng: business.coordinates.longitude,
						},
						index + 1
					)
				)

				this.setState({
					restaurantList: list,
				})
			})
			.catch(console.log)
	}

	_handleInputOnChange = (event) => {
		this.setState({
			keyword: event.target.value,
		})
	}

	_handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			if (this.state.activeLink > -1) {
				this._handleSubmitCity(this.state.activeLink)
			} else {
				this._getCity(event.target.value)
				this.setState({
					activeLink: 0,
				})
			}
		} else if (event.key === 'ArrowDown') {
			this.setState((state) => ({
				activeLink:
					state.activeLink + 1 === SEARCH_RESULT_COUNT
						? 0
						: state.activeLink + 1,
			}))
		} else if (event.key === 'ArrowUp') {
			this.setState((state) => ({
				activeLink:
					state.activeLink === 0
						? SEARCH_RESULT_COUNT - 1
						: state.activeLink - 1,
			}))
		} else {
			this.setState({
				activeLink: -1,
			})
		}
	}

	_handleSubmitCity = (index) => {
		const city = this.state.suggestedList[index]

		const coords = { lat: city.latitude, lng: city.longitude }

		this.setState({
			activeLink: -1,
			center: coords,
			keyword: '',
			location: city.title,
			suggestedList: [],
		})

		this._getRestaurants(coords)
		this.map.setCenter(coords)
	}

	_updateActiveLink = (index) => {
		this.setState({
			activeLink: index,
		})
	}

	componentDidMount() {
		this._setCurrentLocation()
		this._generateMap()
	}

	render() {
		const { activeLink, keyword, location, restaurantList, suggestedList } =
			this.state

		return (
			<Card size="lg" title="EAT SOMEWHERE">
				<div
					id="here-map"
					style={{
						width: '100%',
						height: '400px',
						background: 'grey',
					}}
				/>

				<div className="input-group mb-2">
					<input
						type="text"
						className="form-control"
						aria-label="Text input with dropdown button"
						onChange={this._handleInputOnChange}
						onKeyDown={this._handleKeyDown}
						placeholder="Type a city name..."
						value={keyword}
					/>
					{suggestedList.length > 0 && activeLink > -1 && (
						<div className="dropdown-menu show dropdown-menu-left">
							{suggestedList.map((item, index) => {
								return (
									<div
										className={
											activeLink === index
												? 'active dropdown-item'
												: 'dropdown-item'
										}
										key={index + 1}
										onMouseOver={() =>
											this._updateActiveLink(index)
										}
										onClick={() =>
											this._handleSubmitCity(index)
										}
									>
										{item.title}
									</div>
								)
							})}
						</div>
					)}

					<div className="input-group-append">
						<span className="input-group-text">{location}</span>
					</div>

					<div className="input-group-append">
						<button
							className="btn btn-outline-secondary"
							type="button"
							onClick={this._getCurrentLocation}
						>
							<img src={location_icon} alt="current location" />
						</button>
					</div>
				</div>

				<div className="list-group">
					{restaurantList.map((restaurant, index) => {
						return (
							<a
								href={restaurant.url}
								className="App-card-text list-group-item list-group-item-action flex-column align-items-start"
								key={index}
							>
								<div className="d-flex w-100 justify-content-between">
									<h5 className="mb-1">
										{index + 1}. {restaurant.name}
									</h5>
									<small>
										{'$'.repeat(restaurant.price_range)}
									</small>
								</div>
								<div className="d-flex w-100 justify-content-between">
									<p className="mb-1">
										{restaurant.location.address}
									</p>
									<small>{restaurant.cuisines}</small>
								</div>
							</a>
						)
					})}
				</div>
			</Card>
		)
	}
}

export default RestaurantCard
