import React from 'react';
import { connect } from 'react-redux';

import Card from './Card';
import {
  getUsersList,
  getPositions,
  getUsersListByPage,
  getUsersCount,
} from '../users/users.action';
import { Component } from 'react';

class Profiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
    };
  }

  componentDidMount() {
    this.props.getUsersCount();
    this.props.getPositions();

    console.log(this.props.count);
    if (this.props.count <= 5) {
      this.props.getUsersList();
      this.props.getUsersListByPage(this.props.next_url);
    }
  }

  onclick = () => {
    this.props.getUsersListByPage(this.props.next_url).catch(e => {
      if (e.message === 'Page not found') {
        this.setState({
          isShow: true,
        });
      }
    });
  };

  render() {
    const usersList = this.props.usersList.users;
    const newUsers = [...new Set(usersList.newUsers)];

    // const isPrevPageAvailable = currentPage === 0;
    // const isNextPageAvailable =
    //   currentPage > Math.ceil(totalItems / itemsPerPage) + 1 || totalItems === 0;
    console.log(newUsers);
    return (
      <section className="profiles">
        <h1 className="title">Working with GET request</h1>
        <div className="profiles__cards">
          {newUsers.map(users => (
            <Card key={users.id} {...users} />
          ))}
        </div>
        <button
          className={!this.state.isShow ? 'profiles__btn btn' : ' disabled-btn profiles__btn btn'}
          onClick={this.onclick}
          disabled={this.state.isShow}
        >
          Show more
        </button>
      </section>
    );
  }
}
const mapDispatch = {
  getUsersList,
  getUsersListByPage,
  getPositions,
  getUsersCount,
};

const mapState = state => {
  console.log(state);
  return {
    usersList: state,
    currentPage: state.currentPage,
    totalItems: state.totalItems,
    next_url: state.users.next_url,
    count: state.users.count,
  };
};

export default connect(mapState, mapDispatch)(Profiles);
