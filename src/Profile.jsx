import React from "react";
import { withAuth } from "./AuthContext";
import PropTypes from "prop-types";

export class Profile extends React.Component {
  static propTypes = {
    setPage: PropTypes.func
  }
  render() {
    return <><h1>Страница Профиля</h1></>
  }
}

export const ProfileWithAuth = withAuth(Profile)