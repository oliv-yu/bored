import React, { useState } from 'react'
import Card from './shared/Card'

function ActivityCard() {
	const [activity, setActivity] = useState()

	const _handleFetchActivity = () => {
		fetch('https://www.boredapi.com/api/activity')
			.then((results) => results.json())
			.then((data) => {
				setActivity(data.activity)
			})
			.catch(console.log)
	}
	return (
		<Card size="lg" title="DO SOMETHING">
			<p className="App-card-text card-text">{activity}</p>

			<button onClick={_handleFetchActivity} className="btn btn-primary btn-sm">
				Next
			</button>
		</Card>
	)
}

export default ActivityCard
