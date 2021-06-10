import React, { Component } from 'react'
import Card from './shared/Card'
import { CORS_PROXY } from './utils/constants'
const axios = require('axios')

class PetCard extends Component {
	constructor(props) {
		super(props)

		this.state = {
			page: 1,
			petList: [],
		}
	}

	_getAnimals = () => {
		axios
			.get(`${CORS_PROXY}https://api.petfinder.com/v2/animals`, {
				headers: {
					Authorization: `Bearer ${process.env.REACT_APP_PETFINDER_ACCESS_TOKEN}`,
				},
				params: {
					distance: 20,
					type: 'cat',
					location: `${this.props.location.lat}, ${this.props.location.lng}`,
					limit: 10,
					page: this.state.page,
				},
				mode: 'cors',
				credentials: 'include',
			})
			.then((result) => {
				this.setState({
					petList: result.data.animals,
				})
			})
			.catch(console.log)
	}

	componentDidUpdate(prevProps) {
		if (
			this.props.location !== prevProps.location &&
			this.state.petList.length > 0
		) {
			this.setState({ page: 1 })

			this._getAnimals()
		}
	}

	render() {
		const { petList } = this.state

		return (
			<Card size="lg" buttonText="Next" title="VISIT A PET" type="pet">
				{petList.map(
					(item, idx) =>
						item.photos?.[0]?.medium && (
							<div key={idx} className="card single-pet">
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

				<div>
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
			</Card>
		)
	}
}

export default PetCard
