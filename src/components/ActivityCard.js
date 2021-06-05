import React, { useState } from 'react'
import Card from './Card'

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
		<Card
			size="sm"
			buttonText="Next"
			title="DO SOMETHING"
			onClick={_handleFetchActivity}
		>
			<p className="App-card-text card-text">{activity}</p>
		</Card>
	)
}

export default ActivityCard
