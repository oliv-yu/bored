import React from 'react'

function Card({ children, size = 'lg', title, type = 'general', ...props }) {
	return (
		<div className={`card card-${size} ${type}-card`} {...props}>
			<div className="card-body">
				{title && <p className="card-title">{title}</p>}

				{children}
			</div>
		</div>
	)
}

export default Card
