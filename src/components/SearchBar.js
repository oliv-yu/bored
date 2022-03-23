import axios from 'axios'
import { CORS_PROXY } from './utils/constants'
import { useEffect, useState } from 'react'

function SearchBar({ location, onChangeLocation }) {
	const [keyword, setKeyword] = useState('')
	const [autocompleteList, setAutocompleteList] = useState([])
	const [focus, setFocus] = useState(-1)

	const _getAutocomplete = (keyword) => {
		axios
			.get(
				`${CORS_PROXY}https://autocomplete.search.hereapi.com/v1/autocomplete`,
				{
					params: {
						apiKey: `${process.env.REACT_APP_HERE_API_KEY}`,
						q: keyword,
					},
					mode: 'cors',
					credentials: 'include',
				}
			)
			.then((result) => {
				setAutocompleteList(result.data.items)
			})
			.catch(console.log)
	}

	const _handleInputChange = (event) => {
		setKeyword(event.target.value)

		if (event.target.value) {
			_getAutocomplete(event.target.value)
		}
	}

	const _handleKeyPress = (event) => {
		if (event.key === 'ArrowUp') {
			setFocus(focus === -1 ? autocompleteList.length - 1 : focus - 1)
		}

		if (event.key === 'ArrowDown') {
			setFocus(focus === autocompleteList.length - 1 ? -1 : focus + 1)
		}

		if (event.key === 'Enter' && focus > -1) {
			_handleOnClickCity(autocompleteList[focus].id)
		}
	}

	const _handleOnClickCity = (id) => {
		axios
			.get(`${CORS_PROXY}https://lookup.search.hereapi.com/v1/lookup`, {
				params: {
					apiKey: `${process.env.REACT_APP_HERE_API_KEY}`,
					id,
				},
				mode: 'cors',
				credentials: 'include',
			})
			.then((result) => {
				onChangeLocation(result.data.position)
				setAutocompleteList([])
				setFocus(-1)
			})
			.catch(console.log)
	}

	useEffect(() => {
		setKeyword(`${location.lat},${location.lng}`)
	}, [location])

	return (
		<div className="input-group mb-3">
			<div className="dropdown">
				<input
					type="text"
					className="form-control dropdown-toggle"
					placeholder="Search a place"
					aria-label="Search a place"
					onChange={_handleInputChange}
					onKeyDown={_handleKeyPress}
					value={keyword}
				/>

				{autocompleteList.length > 0 && (
					<div
						className="dropdown-menu show"
						aria-labelledby="autocomplete-list"
					>
						{autocompleteList.map((item, idx) => (
							<button
								key={item.id}
								onMouseEnter={() => setFocus(idx)}
								className={
									idx === focus ? 'active dropdown-item' : 'dropdown-item'
								}
								onTouchStart={() => _handleOnClickCity(item.id)}
								onClick={() => _handleOnClickCity(item.id)}
								type="button"
							>
								{item.title}
							</button>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export default SearchBar
