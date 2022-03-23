import React, { useEffect, useState } from 'react'
import Card from './shared/Card'
import DisplayMap from './shared/DisplayMap'
import axios from 'axios'
import { CORS_PROXY } from './utils/constants'

function BusinessCard({ location }) {
	const [businesses, setBusinesses] = useState([])

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
				setBusinesses(result.data.businesses)
			})
			.catch((error) => console.log(error))
	}

	useEffect(() => {
		setBusinesses([])
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
				refreshMarkers={_getBusinesses}
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
