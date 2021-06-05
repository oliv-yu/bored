import React from 'react'

function Card({ buttonText, children, onClick, size, title }) {
	return (
		<div className={`App-card App-card-${size ? size : 'sm'} card`}>
			<div className="card-body">
				{title && <p className="App-card-title card-title">{title}</p>}

				{children}

				{buttonText && onClick && (
					<button onClick={onClick} className="btn btn-primary">
						{buttonText}
					</button>
				)}
			</div>
		</div>
	)
}

export default Card
