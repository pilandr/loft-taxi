import React from "react";
import mapboxgl from 'mapbox-gl';
import PropTypes from "prop-types";

export class Map extends React.Component {
  static propTypes = {
    setPage: PropTypes.func
  }

  map = null
  mapContainer = React.createRef();

  componentDidMount() {
    mapboxgl.accessToken = "pk.eyJ1IjoicGlsYW5kciIsImEiOiJja3V1YW8yeDMwczc4MnZvMDVkMndjNXJzIn0.OXWveFzwJqUMHEg0_U-RSA"

    this.map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v9",
      center: [30.3056504, 59.9429126], // LED
      zoom: 10,
    })
  }

  componentWillUnmount() {
    this.map = null;
  }

  render () {
    return (
      <div className="map-wrapper">
          <div data-testid="map" className="map" ref={this.mapContainer} />
        </div>
    )
  }
}