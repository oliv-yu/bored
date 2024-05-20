import React, { useEffect, useState } from 'react'
import Card from './shared/Card'
import DisplayMap from './shared/DisplayMap'
import axios from 'axios'

function BusinessCard({ location, onChangeLocation }) {
	const [businesses, setBusinesses] = useState([])

	const _getBusinesses = ({ lat, lng }) => {
		axios
			.request({
				method: 'GET',
				// for local development `lcp --proxyUrl https://api.yelp.com/` to avoid CORS issue
				// url: 'http://localhost:8010/proxy/v3/businesses/search',
				url: 'https://api.yelp.com/v3/businesses/search',
				params: {
					sort_by: 'best_match',
					limit: '10',
					latitude: lat,
					longitude: lng,
				},
				headers: {
					accept: 'application/json',
					Authorization: 'Bearer ' + process.env.REACT_APP_YELP_API_KEY,
					'Access-Control-Allow-Origin': '*',
				},
			})
			.then(function (response) {
				setBusinesses(response.data.businesses)
			})
			.catch(function (error) {
				console.error(error)
			})
	}

	useEffect(() => {
		_getBusinesses(location)
	}, [location])

	return (
		<Card type="business" title="GO SOMEWHERE">
			<DisplayMap
				center={location}
				markers={businesses.map((item) => ({
					coordinate: {
						lat: item.coordinates.latitude,
						lng: item.coordinates.longitude,
					},
					html:
						`<div><img src=${item.image_url} class="business-img" alt="${item.name}"></div>` +
						`<div><a class="business-title" href=${item.url} target="_blank" rel="noopener noreferrer">${item.name}</a></div>`,
				}))}
				refreshMarkers={({ lat, lng }) => {
					_getBusinesses({ lat, lng })
					onChangeLocation({ lat, lng })
				}}
			/>

			<div className="list-group">
				{businesses.map((business, index) => {
					return (
						<a
							href={business.url}
							target="_blank"
							className="App-card-text list-group-item list-group-item-action flex-column align-items-start"
							key={index}
							rel="noopener noreferrer"
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
