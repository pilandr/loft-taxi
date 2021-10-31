import React from "react";
import mapboxgl from 'mapbox-gl';
import { getCard, addressList } from './actions'
import { connect } from 'react-redux';
import './map.css';
import { Link } from 'react-router-dom';
import dot from './img/order_dot.png'
import arrow from './img/order_arrow.png'
import car1 from './img/order_car1.png'
import car2 from './img/order_car2.png'
import car3 from './img/order_car3.png'

class Map extends React.Component {

  map = null
  mapContainer = React.createRef();

  componentDidMount() {
    mapboxgl.accessToken = "pk.eyJ1IjoicGlsYW5kciIsImEiOiJja3V1YW8yeDMwczc4MnZvMDVkMndjNXJzIn0.OXWveFzwJqUMHEg0_U-RSA"

    this.map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: "mapbox://styles/mapbox/light-v10",
      center: [30.3056504, 59.9429126], // LED
      zoom: 10,
    })
    this.props.getCard();
    this.props.addressList();
  }

  componentWillUnmount() {
    this.map = null;
  }

  render () {
    return (
      <div className="map-wrapper">
          <div data-testid="map" className="map" ref={this.mapContainer} />
          { this.props.card.cvc === undefined || this.props.card.cardNumber === undefined || this.props.card.expiryDate === undefined ? (
            <div className="order">
              <div className="order__title">Платежные данные не заполнены</div>
              <Link className="order__btn" to="/profile">Перейти в профиль</Link>
            </div>
          ) : (
            <div className="order">
              <form className="order-form">
                <div className="order__row">
                  <img className="order__img" src={dot} alt="dot" />
                  <select className="order__select" name="address1">
                    { this.props.addresses?.map( address => (
                      <option value={address}>{address}</option>
                    ))}
                  </select>
                </div>
                <div className="order__row">
                  <img className="order__img" src={arrow} alt="dot" />
                  <select className="order__select" name="address2">
                    {this.props.addresses?.map( address => (
                      <option value={address}>{address}</option>
                    ))}
                  </select>
                </div>
                <div className="order__area">
                  <div className="order__cars">
                    <div className="car-container">
                      <img src={car1} alt="car1" />
                    </div>
                    <div className="car-container">
                      <img src={car2} alt="car2" />
                    </div>
                    <div className="car-container">
                      <img src={car3} alt="car3" />
                    </div>
                  </div>
                  <input className="order__submit" type="submit" value="Заказать" />
                </div>
                
              </form>
            </div>
           )}
          
      </div>
    )
  }
}

export const MapStore = connect(
  (state) => ({ isLoggedIn: state.auth.isLoggedIn , card: state.auth.card, addresses: state.auth.addresses}),
  { getCard, addressList }
)(Map);