export function getCurrentPosition(options = {}) {
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject, options)
	})
}

export const getSVG = (char = 'X', fill = 'white', stroke = 'black') =>
	`<svg  width="24" height="24" xmlns="http://www.w3.org/2000/svg">` +
	`<rect stroke="black" fill="${fill}" x="1" y="1" width="22" height="22" />` +
	`<text x="12" y="18" font-size="12pt" font-family="Arial" font-weight="bold" ` +
	`text-anchor="middle" fill="${stroke}" >${char}` +
	`</text></svg>`
