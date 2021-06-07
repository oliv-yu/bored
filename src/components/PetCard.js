import React, { Component } from 'react'
import Card from './Card'
import { getCurrentPosition } from './utils/utils'
import { CORS_PROXY } from './utils/constants'
const axios = require('axios')

class PetCard extends Component {
	constructor(props) {
		super(props)

		this.state = {
			location: { lat: 40.75, lng: -73.98 },
			page: 1,
			petList: [],
		}
	}

	_setCurrentLocation = async () => {
		try {
			const { coords } = await getCurrentPosition()

			this.setState({
				location: { lat: coords.latitude, lng: coords.longitude },
			})
		} catch (error) {
			console.error(error)
		}
	}

	_getAnimals = () => {
		axios
			.get(`${CORS_PROXY}https://api.petfinder.com/v2/animals`, {
				headers: {
					Authorization: `Bearer ${process.env.REACT_APP_PETFINDER_ACCESS_TOKEN}`,
				},
				params: {
					type: 'cat',
					location: `${this.state.location.lat}, ${this.state.location.lng}`,
					limit: 10,
					page: this.state.page,
				},
				mode: 'cors',
				credentials: 'include',
			})
			.then((result) => {
				console.log(result.data.animals)

				this.setState({
					petList: result.data.animals,
				})
			})
			.catch(console.log)
	}

	componentDidMount() {
		this._setCurrentLocation()
	}

	render() {
		const { petList } = this.state

		return (
			<Card size="lg" buttonText="Next" title="Adopt a Cat!">
				<div className="pet-refresh">
					<button
						onClick={() => {
							this._getAnimals()
							this.setState((state) => ({ page: state.page + 1 }))
						}}
						className="btn btn-primary btn-sm"
					>
						Find a buddy!
					</button>
				</div>

				{petList.map(
					(item, idx) =>
						item.photos?.[0]?.medium && (
							<div key={idx} className="card pet-card">
								{item.photos[0] && (
									<img
										className="card-img-top"
										src={item.photos[0].medium}
										alt={item.name}
									></img>
								)}

								<div className="card-title">
									<a href={item.url} target="_blank" rel="noopener noreferrer">
										{item.name}
									</a>
								</div>
								<div className="card-text">
									<div>{item.breeds.primary}</div>
									<div>{`${item.gender} - ${item.age}`}</div>
									<div>
										{item.contact.address.city +
											', ' +
											item.contact.address.state}
									</div>
								</div>
							</div>
						)
				)}
			</Card>
		)
	}
}

export default PetCard
