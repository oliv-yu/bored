import React from 'react'

function Card({
	buttonText,
	children,
	onClick,
	size = 'lg',
	title,
	type = 'general',
	...props
}) {
	return (
		<div className={`card card-${size} ${type}-card`} {...props}>
			<div className="card-body">
				{title && <p className="card-title">{title}</p>}

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
