import React from "react";
import mapboxgl from 'mapbox-gl';
import { getCard, addressList, getRouteSaga, notRoute } from './actions'
import { connect } from 'react-redux';
import './map.css';
import { Link } from 'react-router-dom';
import dot from './img/order_dot.png'
import arrow from './img/order_arrow.png'
import car1 from './img/order_car1.png'
import car2 from './img/order_car2.png'
import car3 from './img/order_car3.png'
import { Form, Field } from "react-final-form";


const SelectPlace1 = ({addresses, input, onChangeSelect }) => {
  return (
    <>
      <select {...input} className="order__select" name="address1" onChange={onChangeSelect} >
        {addresses?.map(address => (
          <option className="order__select-item-1" key={address} value={address}>{address}</option>
        ))}
      </select>
    </>
  );
};

class Map extends React.Component {
  state = {
    address1: this.props.addresses,
    address2: this.props.addresses,
    hasAddresses: false
  };

  map = null
  mapContainer = React.createRef();

  getMap() {
    return this.map;
  }

  onOrder = (e) => {
    e.preventDefault();
    const { address1, address2 } = e.target;
    const cloneMap = this.getMap.apply(this)
    this.props.getRouteSaga(address1.value, address2.value, cloneMap);
  }

  onClickNextOrder = () => {
    try {
      this.setState({ address1: this.props.addresses.map(address => address) });
      this.setState({
        address2: this.props.addresses.filter((address, ind) => {
          if (ind === 0) return false;
          return true;
        })
      });
      if (this.map.getLayer("route")) {
        this.map.removeLayer("route");
        this.map.removeLayer("start1");
        this.map.removeLayer("start2");
        this.map.removeLayer("start3");
        this.map.removeLayer("end1");
        this.map.removeLayer("end2");
        this.map.removeLayer("end3");
      }
      if (this.map.getSource("route")) {
        this.map.removeSource("route");
        this.map.removeSource("circle-start");
        this.map.removeSource("circle-end");
      }
      this.map.flyTo({
        center: [30.3056504, 59.9429126],
        zoom: 10,
      });
    }
    catch (err) {
      console.log(err);
    }
    this.props.notRoute();
  }

  onChangeAddress1 = (e) => {
    this.setState({
      address2: this.props.addresses.filter((address) => {
        if (address !== e.target.value) return true;
        return false
      })
    });
  }

  onChangeAddress2 = (e) => {
    this.setState({
      address1: this.props.addresses.filter((address) => {
        if (address !== e.target.value) return true;
        return false
      })
    });
  }

  onSubmit = () => {
    console.log("onsubmit");
  }

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

  render() {
    if (!this.state.hasAddresses && this.props.addresses.length > 1) {
      this.setState({ address1: this.props.addresses.map(address => address) });
      this.setState({
        address2: this.props.addresses.filter((address, ind) => {
          if (ind === 0) return false;
          return true;
        })
      });
      this.setState({ hasAddresses: true });
    }
    return (
      <div className="map-wrapper">
        <div data-testid="map" className="map" ref={this.mapContainer} />
        {this.props.card.cvc === undefined || this.props.card.cardNumber === undefined || this.props.card.expiryDate === undefined ? (
          <div className="order order--end">
            <div className="order__title">Платежные данные не заполнены</div>
            <Link className="order__btn" to="/profile">Перейти в профиль</Link>
          </div>
        ) : (
          this.props.routes ? (
            <div className="order order--end">
              <div className="order__title order__title--end">Заказ размещен</div>
              <div className="order__text">Ваше такси уже едет к вам. Прибудет приблизительно через 10 минут.</div>
              <button className="order__btn order__btn--end" onClick={this.onClickNextOrder}>Сделать новый заказ</button>
            </div>
          ) : (
            <div className="order">
              <Form
                onSubmit={this.onSubmit}
                render={({ handleSubmit, pristine, invalid }) => (
                  <form className="order-form" onSubmit={handleSubmit}>
                    <div className="order__row">
                      <img className="order__img" src={dot} alt="dot" />
                      {/* <Field className="order__select" name="address1" onChange={this.onChangeAddress1} component="select">
                        {this.state.address1?.map(address => (
                          <option className="order__select-item-1" key={address} value={address}>{address}</option>
                        ))}
                      </Field> */}
                      <Field className="order__select" name="address1" addresses={this.state.address1} onChangeSelect={this.onChangeAddress1} component={SelectPlace1} />
                    </div>
                    <div className="order__row">
                      <img className="order__img" src={arrow} alt="dot" />
                      <Field className="order__select" name="address2" onChange={this.onChangeAddress2} component="select">
                        {this.state.address2?.map(address => (
                          <option className="order__select-item-2" key={address} value={address}>{address}</option>
                        ))}
                      </Field>
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




                    {/* <Field name="email" label="Email" component={InputEmail} />
                    <Field name="password" label="Пароль" component={InputPassword} />
                    <div className="form__forget-pass">Забыли пароль?</div>
                    <Field name="submit" component={InputSubmit} /> */}
                  </form>
                )}
              />
              {/* <form className="order-form" onSubmit={this.onOrder}>
                <div className="order__row">
                  <img className="order__img" src={dot} alt="dot" />
                  <select className="order__select" name="address1" onChange={this.onChangeAddress1} >
                    {this.state.address1?.map(address => (
                      <option className="order__select-item-1" key={address} value={address}>{address}</option>
                    ))}
                  </select>
                </div>
                <div className="order__row">
                  <img className="order__img" src={arrow} alt="dot" />
                  <select className="order__select" name="address2" onChange={this.onChangeAddress2} >
                    {this.state.address2?.map(address => (
                      <option className="order__select-item-2" key={address} value={address}>{address}</option>
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
              </form> */}
            </div>
          )

        )}

      </div>
    )
  }
}

export const MapStore = connect(
  (state) => ({ isLoggedIn: state.auth.isLoggedIn, card: state.auth.card, addresses: state.auth.addresses, routes: state.auth.routes }),
  { getCard, addressList, getRouteSaga, notRoute }
)(Map);