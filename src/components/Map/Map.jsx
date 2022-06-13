import React from 'react';
import mapboxgl from 'mapbox-gl';
import { connect } from 'react-redux';
import Order from './Order/Order';
import { useEffect, useRef } from 'react';


const Map = (props) => {

  const map = useRef(null);
  const mapContainer = useRef(null);

  const drawRoute = (coordinates) => {
    map.current.flyTo({
      center: coordinates[0],
      zoom: 15
    });
    map.current.addSource('circle-start', {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: coordinates[0]
        }
      }
    });
    map.current.addSource('circle-end', {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: coordinates[coordinates.length - 1]
        }
      }
    });
    map.current.addLayer({
      id: 'start1',
      type: 'circle',
      source: 'circle-start',
      paint: {
        'circle-color': '#FDBF5A',
        'circle-radius': 15,
        'circle-pitch-scale': 'viewport'
      }
    });
    map.current.addLayer({
      id: 'start2',
      type: 'circle',
      source: 'circle-start',
      paint: {
        'circle-color': '#FDBF5A',
        'circle-radius': 44,
        'circle-opacity': 0.4
      }
    });
    map.current.addLayer({
      id: 'start3',
      type: 'circle',
      source: 'circle-start',
      paint: {
        'circle-color': '#FDBF5A',
        'circle-radius': 68,
        'circle-opacity': 0.2
      }
    });
    map.current.addLayer({
      id: 'end1',
      type: 'circle',
      source: 'circle-end',
      paint: {
        'circle-color': '#71981A',
        'circle-radius': 15,
        'circle-pitch-scale': 'viewport'
      }
    });
    map.current.addLayer({
      id: 'end2',
      type: 'circle',
      source: 'circle-end',
      paint: {
        'circle-color': '#71981A',
        'circle-radius': 44,
        'circle-opacity': 0.4
      }
    });
    map.current.addLayer({
      id: 'end3',
      type: 'circle',
      source: 'circle-end',
      paint: {
        'circle-color': '#71981A',
        'circle-radius': 68,
        'circle-opacity': 0.2
      }
    });
    map.current.addLayer({
      id: 'route',
      type: 'line',
      source: {
        type: 'geojson',
        lineMetrics: true,
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates
          }
        }
      },
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#FDBF5A',
        'line-width': 4,
        'line-gradient': [
          'interpolate',
          ['linear'],
          ['line-progress'],
          0,
          '#FDBF5A',
          1,
          '#71981A'
        ]
      }
    });
  };


  const DeleteRoutesFromMap = () => {
    try {
      if (map.current.getLayer('route')) {
        map.current.removeLayer('route');
        map.current.removeLayer('start1');
        map.current.removeLayer('start2');
        map.current.removeLayer('start3');
        map.current.removeLayer('end1');
        map.current.removeLayer('end2');
        map.current.removeLayer('end3');
      }
      if (map.current.getSource('route')) {
        map.current.removeSource('route');
        map.current.removeSource('circle-start');
        map.current.removeSource('circle-end');
      }
      map.current.flyTo({
        center: [30.3056504, 59.9429126],
        zoom: 10,
      });
    }
    catch (err) {
      // eslint-disable-next-line
      console.log(err); //ESLin
    }

  };

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [30.3056504, 59.9429126], // LED
      zoom: 10,
    });

    return () => {
      map.current = null;
    };
  },[]);

  return (
    <div className="map-wrapper">
      <div data-testid="map" className="map" ref={mapContainer} />
      <Order onClickNextOrder={DeleteRoutesFromMap} onOrder={drawRoute} />

    </div>
  );
};

export const MapStore = connect(
  (state) => ({ isLoggedIn: state.auth.isLoggedIn, card: state.card.card, addresses: state.address.addresses, routes: state.route.routes }),
  { }
)(Map);