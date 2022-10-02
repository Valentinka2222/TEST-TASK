import React from 'react';
import { connect } from 'react-redux';
import Card from './Card';
import { getUsersList, getUsersListByPage } from '../users/users.action';
import { Component } from 'react';

class Profiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
    };
  }

  componentDidMount() {
    this.props.getUsersList();
  }

  onclick = () => {
    const { next_url, getUsersListByPage } = this.props;
    getUsersListByPage(next_url).catch(e => {
      console.log(e);
    });
    if (next_url === null) {
      this.setState({
        isShow: true,
      });
    }
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
            <Card key={users.id} {...users} />
          ))}
        </div>
        <button
          className={isShow ? 'profiles__btn btn' : ' disabled-btn profiles__btn'}
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
  };
};

export default connect(mapState, mapDispatch)(Profiles);
