import React, { Component } from 'react'
import { getSVG } from '../utils/utils'

class DisplayMap extends Component {
	constructor(props) {
		super(props)

		this.mapRef = React.createRef()
		this.state = { behavior: null, ui: null, map: null }
	}

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

		this.setState({ behavior, ui, map })
	}

	componentDidMount() {
		this.generateMap()
	}

	componentDidUpdate(prevProps) {
		if (this.props.center !== prevProps.center) {
			this.state.map.setCenter(this.props.center)
		}

		if (this.props.markers !== prevProps.markers) {
			clearMarkers(this.state.map)

			addInfoBubbles(this.state.map, this.props.markers, this.state.ui)
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
					className="btn btn-primary btn-sm"
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

/**
 * Creates a new marker and adds it to a group
 * @param {H.map.Group} group       The group holding the new marker
 * @param {H.geo.Point} coordinate  The location of the marker
 * @param {String} html             Data associated with the marker
 */
function addMarkerToGroup(group, coordinate, html, char, fill, stroke) {
	const H = window.H

	let icon = new H.map.Icon(getSVG(char, fill, stroke))
	let marker = new H.map.Marker(coordinate, { icon })

	// add custom data to the marker
	marker.setData(html)
	group.addObject(marker)
}

/**
 * Clicking on a marker opens an infobubble which holds HTML content related to the marker.
 * @param {H.Map} map A HERE Map instance within the application
 */
function addInfoBubbles(map, markers, ui) {
	const H = window.H

	var group = new H.map.Group()

	map.addObject(group)

	// add 'tap' event listener, that opens info bubble, to the group
	group.addEventListener(
		'tap',
		function (evt) {
			// event target is the marker itself, group is a parent event target
			// for all objects that it contains
			let bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
				// read custom data
				content: evt.target.getData(),
			})
			// show info bubble
			ui.addBubble(bubble)
		},
		false
	)

	markers.forEach((item, idx) => {
		addMarkerToGroup(group, item.coordinate, item.html, idx + 1)
	})
}

/**
 * Clear all markers within the map
 * @param {H.Map} map A HERE Map instance within the application
 */
function clearMarkers(map) {
	const currentMarkers = map.getObjects()

	map.removeObjects(currentMarkers)
}

export default DisplayMap
