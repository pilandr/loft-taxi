import React from "react";
import mapboxgl from 'mapbox-gl';
import { getCard } from './actions'
import { connect } from 'react-redux';

class Map extends React.Component {

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

    this.props.getCard();
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

export const MapStore = connect(
  (state) => ({ isLoggedIn: state.auth.isLoggedIn}),
  { getCard }
)(Map);