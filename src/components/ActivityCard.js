import React, { Component } from 'react'
import Card from './Card'

class ActivityCard extends Component {
	state = {
		activity: '',
	}

	_getActivity = () => {
		fetch('https://www.boredapi.com/api/activity')
			.then((results) => results.json())
			.then((data) => {
				console.log(data)
				this.setState({ activity: data.activity })
			})
			.catch(console.log)
	}

	componentDidMount() {
		this._getActivity()
	}

	render() {
		const { activity } = this.state

		return (
			<Card
				size="sm"
				buttonText="Next"
				title="DO SOMETHING"
				onClick={this._getActivity}
			>
				<p className="App-card-text card-text">{activity}</p>
			</Card>
		)
	}
}

export default ActivityCard
