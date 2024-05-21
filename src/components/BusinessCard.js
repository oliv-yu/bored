import React, { useEffect, useState } from 'react'
import Card from './shared/Card'
import DisplayMap from './shared/DisplayMap'
import axios from 'axios'

function BusinessCard({ location, onChangeLocation }) {
	const [businesses, setBusinesses] = useState([])
	const [error, setError] = useState('')

	const _getBusinesses = ({ lat, lng }) => {
		axios
			.request({
				method: 'GET',
				url: 'https://discover.search.hereapi.com/v1/discover',
				params: {
					at: `${lat},${lng}`,
					app_id: `${process.env.REACT_APP_HERE_APP_ID}`,
					apiKey: `${process.env.REACT_APP_HERE_API_KEY}`,
					limit: '5',
					q: 'restaurant',
				},
			})
			.then(function (response) {
				setBusinesses(response.data.items)
				setError('')
			})
			.catch(function (error) {
				console.error(error)
				setError(error.message || 'Unknown error')
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
						lat: item.position.lat,
						lng: item.position.lng,
					},
					html: `<div>${item.title}</div>`,
				}))}
				refreshMarkers={({ lat, lng }) => {
					_getBusinesses({ lat, lng })
					onChangeLocation({ lat, lng })
				}}
			/>

			{error ? (
				<div className="list-group">
					<div className="list-group-item list-group-item-action flex-column align-items-start">
						<div className="w-100 justify-content-between">
							<h5 className="mb-1">
								Oh no! Businesses cannot load at this time.
							</h5>
							<div className="mb-1">{error}</div>
						</div>
					</div>
				</div>
			) : (
				<div className="list-group">
					{businesses.map((business, index) => {
						return (
							<a
								href={business.contacts?.[0]?.www?.[0]?.value}
								target="_blank"
								className="list-group-item list-group-item-action flex-column align-items-start"
								key={index}
								rel="noopener noreferrer"
							>
								<div className="d-flex w-100 justify-content-between">
									<h5 className="mb-1">
										{index + 1}. {business.title}
									</h5>
								</div>
								<div className="d-flex w-100 justify-content-between">
									<p className="mb-1 text-start">{business.address.label}</p>
									<small className="text-end">
										{business.categories
											.reduce((acc, curr) => [curr.name, ...acc], [])
											.join(', ')}
									</small>
								</div>
							</a>
						)
					})}
				</div>
			)}
		</Card>
	)
}

export default BusinessCard
