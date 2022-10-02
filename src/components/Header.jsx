import React, { Component } from 'react';
import Logo from './images/Logo.svg';
import { connect } from 'react-redux';
import { getPositions, getUsersListByPage, getUsersList } from '../users/users.action';

class Header extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getUsersList();
    this.props.getPositions();
  }

  handleClick = e => {
    const { id } = e.target.dataset;
    const { isShowUsers, isShowAuth, getUsersListByPage, setIsShowUsers, setIsShowAuth } =
      this.props;
    getUsersListByPage(isShowUsers);
    if (id === 'users') {
      setIsShowUsers(!isShowUsers);
    }
    if (id === 'sign') {
      setIsShowAuth(!isShowAuth);
    }
  };
  render() {
    return (
      <header className="header">
        <div className="logo">
          <img className="logo__image" src={Logo} alt="logo" />
        </div>
        <div className="header_action">
          <button className="header_action__btn btn" data-id="users" onClick={this.handleClick}>
            Users
          </button>
          <button className="header_action__btn btn" data-id="sign" onClick={this.handleClick}>
            Sign up
          </button>
        </div>
      </header>
    );
  }
}
const mapDispatch = {
  getUsersList,
  getUsersListByPage,
  getPositions,
};
const mapState = state => {
  return {
    positions: state.users.positions,
    next_url: state.users.next_url,
  };
};
export default connect(mapState, mapDispatch)(Header);
