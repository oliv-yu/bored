import React, { useState } from 'react'
import Card from './shared/Card'

const BORED_ACTIVITIES = [
	'Learn a new language.',
	'Code a project you have been putting off.',
	'Text an old friend.',
	'Go outside and touch grass.',
	'Tidy up your room.',
	'Drink a cup of tea.',
	'Write in a journal.',
	'Discover a new podcast.',
	'Meal prep for the week.',
	'Try a new recipe.',
	'Play a video game.',
	'Practice yoga.',
	'Bake something sweet.',
	'Generate AI art.',
	'Do a jigsaw puzzle.',
	'Learn how to knit or crochet.',
	'Read a book someone recommended you.'
]

function ActivityCard() {
	const [activity, setActivity] = useState(
		'Click on Next to get a random activity.'
	)

	const _handleFetchActivity = () => {
		let randomInt = Math.floor(Math.random() * 17); 

		setActivity(BORED_ACTIVITIES[randomInt]);
	}

	return (
		<Card title="DO SOMETHING">
			<p className="App-card-text card-text">{activity}</p>

			<button onClick={_handleFetchActivity} className="btn btn-sm">
				Next
			</button>
		</Card>
	)
}

export default ActivityCard
