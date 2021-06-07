import React, { useState } from 'react'
import Card from './Card'
import DisplayMap from './utils/DisplayMap'
import axios from 'axios'
import { getCurrentPosition } from './utils/utils'
import { CORS_PROXY } from './utils/constants'

function BusinessCard() {
	const [location, setLocation] = useState({ lat: 40.75, lng: -73.98 })
	const [businesses, setBusinesses] = useState([])

	const _setCurrentLocation = async () => {
		try {
			const { coords } = await getCurrentPosition()

			setLocation({ lat: coords.latitude, lng: coords.longitude })
		} catch (error) {
			console.log(error)
		}
	}

	const _getBusinesses = ({ lat, lng }) => {
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
			.then((result) => {
				let list = result.data.businesses

				console.log(list)

				setBusinesses(result.data.businesses)
			})
			.catch(console.log)
	}

	return (
		<Card size="lg" title="GO SOMEWHERE">
			<DisplayMap
				center={location}
				markers={businesses.map((item) => ({
					coordinate: {
						lat: item.coordinates.latitude,
						lng: item.coordinates.longitude,
					},
					html:
						`<div><img src=${item.image_url} class="business-img" alt="${item.name}"></div>` +
						`<div><a class="business-title" href=${item.url} target="_blank">${item.name}</a></div>`,
				}))}
				refreshMarkers={_getBusinesses}
			/>

			<button
				onClick={() => _setCurrentLocation()}
				className="btn btn-primary btn-sm"
			>
				Get Current Location
			</button>

			<div className="list-group">
				{businesses.map((business, index) => {
					return (
						<a
							href={business.url}
							className="App-card-text list-group-item list-group-item-action flex-column align-items-start"
							key={index}
						>
							<div className="d-flex w-100 justify-content-between">
								<h5 className="mb-1">
									{index + 1}. {business.name}
								</h5>
								<small>{business.price}</small>
							</div>
							<div className="d-flex w-100 justify-content-between">
								<p className="mb-1">
									{business.location.display_address.join(', ')}
								</p>
								<small>
									{business.categories
										.reduce((acc, curr) => [curr.title, ...acc], [])
										.join(', ')}
								</small>
							</div>
						</a>
					)
				})}
			</div>
		</Card>
	)
}

export default BusinessCard
