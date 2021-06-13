import React from 'react'
import ReactDOM from 'react-dom'
import Bored from './Bored'

it('renders without crashing', () => {
	const div = document.createElement('div')
	ReactDOM.render(<Bored />, div)
	ReactDOM.unmountComponentAtNode(div)
})
