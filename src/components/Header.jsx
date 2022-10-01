import React, { Component } from 'react';
import Logo from './images/Logo.svg';
import { connect } from 'react-redux';
import { getPositions } from '../users/users.action';

class Header extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getPositions();
  }

  handleClick = e => {
    if (e.target.dataset.id === 'users') {
      this.props.setIsShowUsers(!this.props.isShowUsers);
    }
    if (e.target.dataset.id === 'sign') {
      this.props.setIsShowAuth(!this.props.isShowAuth);
    }
  };
  render() {
    return (
      <header className="header">
        <div className="logo">
          <img className="logo__image" src={Logo} alt="logo" />
        </div>
        <div className="header_action">
          <button
            className="header_action__btn btn"
            data-id="users"
            onClick={e => this.handleClick(e)}
          >
            Users
          </button>
          <button
            className="header_action__btn btn"
            data-id="sign"
            onClick={e => this.handleClick(e)}
          >
            Sign up
          </button>
        </div>
      </header>
    );
  }
}
const mapDispatch = {
  getPositions,
};
const mapState = state => {
  console.log(state);
  return {
    positions: state.users.positions,
  };
};
export default connect(mapState, mapDispatch)(Header);
