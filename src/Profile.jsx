import React from "react";
import './Profile.css';
import { connect } from "react-redux";
import { logOut } from "./actions";

export class Profile extends React.Component {

  render() {
    return ( <>
          <div className="profile-wrapper">
            <div className="profile">
              <form className="form-profile" onSubmit={this.onLogin}>
                <div className="form-profile__title">Профиль</div>
                <div className="form-profile__title-text">Введите платежные данные</div>
                <div className="form-profile__body">
                  <div className="form-profile__left">
                    <label className="form-profile__label-text" htmlFor="name">Имя владельца</label>
                    <input className="form-profile__input input" id="name" type="text" name="name" size="28" />
                    <label className="form-profile__label-text" htmlFor="number">Номер карты</label>
                    <input className="form-profile__input input" id="number" type="text" name="number" size="28" />
                    <div className="form-profile__row">
                      <div className="form-profile__column">
                        <label className="form-profile__label-text" htmlFor="date">MM/YY</label>
                        <input className="form-profile__input form-profile__input--row input" id="date" type="text" name="date" size="28" />
                      </div>
                      <div className="form-profile__column">
                        <label className="form-profile__label-text" htmlFor="cvc">CVC</label>
                        <input className="form-profile__input form-profile__input--row input" id="cvc" type="text" name="cvc" size="28" />
                      </div>
                    </div>
                  </div>
                  <div className="form-profile__right"></div>
                </div>
                <input className="form-profile__submit" type="submit" value="Сохранить" />
              </form>
            </div>
          </div>
    </>
    );
  }
}

export const ProfileWithAuth = connect(
  null,
  { logOut }
)(Profile)