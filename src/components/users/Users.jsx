import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { getUsersList, getUsersListByPage } from '../../modules/users.action';
import Card from './Card';
import * as qs from 'query-string';
import './users.scss';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      isLoaded: true,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isLoaded: false,
      });
    }, 2000);
  }
  componentWillUnmount() {
    this.setState({
      isLoaded: false,
    });
  }

  onclick = () => {
    const { next_url, getUsersListByPage, total_pages } = this.props;
    const Url = new URL(next_url);
    const parsed = qs.parse(Url.search);
    const newPage = Number(parsed.page);

    if (total_pages === newPage) {
      this.setState({
        isShow: true,
      });
    }
    getUsersListByPage(next_url);
  };

  render() {
    const usersList = this.props.usersList.users;
    const newUsers = [...new Set(usersList.newUsers)];
    const { isShow } = this.state;
    return (
      <section className="profiles">
        <h1 className="title">Working with GET request</h1>
        <div className="profiles__cards">
          {newUsers.map(users => (
            <Card key={users.id} {...users} isLoaded={this.state.isLoaded} />
          ))}
        </div>
        <button
          className={!isShow ? 'profiles__btn btn' : ' disabled-btn profiles__btn '}
          onClick={this.onclick}
          disabled={isShow}
        >
          Show more
        </button>
      </section>
    );
  }
}
const mapDispatch = {
  getUsersListByPage,
  getUsersList,
};

const mapState = state => {
  return {
    usersList: state,
    next_url: state.users.next_url,
    count: state.users.count,
    page: state.users.page,
    total_pages: state.users.total_pages,
  };
};
Users.propTypes = {
  getUsersList: PropTypes.func,
  getUsersListByPage: PropTypes.func,
  next_url: PropTypes.string,
  usersList: PropTypes.object,
};

export default connect(mapState, mapDispatch)(Users);
