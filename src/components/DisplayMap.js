import React, { Component, useRef, useLayoutEffect } from 'react'
import { getSVG } from './utils'

function DisplayMapHook({
	center = { lat: 40.75, lng: -73.98 },
	markers = [],
}) {
	const mapRef = useRef()

	useLayoutEffect(() => {
		if (!mapRef.current) return

		const H = window.H
		const platform = new H.service.Platform({
			apikey: `${process.env.REACT_APP_HERE_API_KEY}`,
		})

		const defaultLayers = platform.createDefaultLayers()

		// Create an instance of the map
		const map = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
			center,
			zoom: 14,
			pixelRatio: window.devicePixelRatio || 1,
		})

		const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map))

		const ui = H.ui.UI.createDefault(map, defaultLayers)

		// Add the first marker
		var centerIcon = new H.map.Icon(getSVG('X')),
			centerMarker = new H.map.Marker(center, { icon: centerIcon })

		map.addObject(centerMarker)

		// Add markers for the other
		markers.map((coord, idx) => {
			var indexIcon = new H.map.Icon(getSVG(idx + 1)),
				indexMarker = new H.map.Marker(coord, { icon: indexIcon })

			map.addObject(indexMarker)
		})

		// Add event listener
		map.addEventListener('tap', function (evt) {
			var coord = map.screenToGeo(
				evt.currentPointer.viewportX,
				evt.currentPointer.viewportY
			)

			console.log(coord)
		})

		// This will act as a cleanup to run once this hook runs again.
		// This includes when the component un-mounts
		return () => {
			map.dispose()
		}
	}, [center, mapRef, markers]) //eslint-disable-line

	return (
		<div
			className="map"
			ref={mapRef}
			style={{
				width: '100%',
				height: '400px',
				background: 'grey',
			}}
		/>
	)
}

class DisplayMap extends Component {
	mapRef = React.createRef()
	state = { map: null }

	generateMap() {
		const H = window.H
		const platform = new H.service.Platform({
			apikey: `${process.env.REACT_APP_HERE_API_KEY}`,
		})

		const defaultLayers = platform.createDefaultLayers()

		const map = new H.Map(
			this.mapRef.current,
			defaultLayers.vector.normal.map,
			{
				center: this.props.center,
				zoom: 14,
				pixelRatio: window.devicePixelRatio || 1,
			}
		)

		const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map))

		const ui = H.ui.UI.createDefault(map, defaultLayers)

		this.setState({ map })
	}

	addMarker(position, char, fill, stroke) {
		const H = window.H

		let icon = new H.map.Icon(getSVG(char, fill, stroke))

		let marker = new H.map.Marker(position, { icon })

		this.state.map.addObject(marker)
	}

	clearMarkers() {
		const currentMarkers = this.state.map.getObjects()

		this.state.map.removeObjects(currentMarkers)
	}

	componentDidMount() {
		this.generateMap()
	}

	componentDidUpdate(prevProps) {
		if (this.props.center !== prevProps.center) {
			this.state.map.dispose()

			this.generateMap()
		}

		if (this.props.markers !== prevProps.markers) {
			this.clearMarkers()

			this.props.markers.map((coord, idx) => {
				this.addMarker(coord, idx + 1)
			})
		}
	}

	componentWillUnmount() {
		this.state.map.dispose()
	}

	render() {
		return (
			<>
				<div
					ref={this.mapRef}
					style={{
						width: '100%',
						height: '400px',
						background: 'grey',
					}}
				/>

				<button
					onClick={() => {
						this.props.refreshMarkers(this.state.map.getCenter())
					}}
				>
					Refresh
				</button>
			</>
		)
	}
}

export default DisplayMap
