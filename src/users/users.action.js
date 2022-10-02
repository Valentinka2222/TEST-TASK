import { getUsers, getUsersByPage, сreateUserPositions } from './getaway';

export const USERS_LIST = 'USERS/USERS_LIST';
export const SHOW_MORE = 'USERS/SHOW_MORE';
export const POSITIONS = 'USERS/POSITIONS';
export const USERS_COUNT = 'USERS/USERS_COUNT';

export const getData = users => {
  const action = {
    type: USERS_COUNT,
    users,
  };
  return action;
};

export const usersListRecieved = users => {
  const action = {
    type: USERS_LIST,
    users,
  };
  return action;
};

export const showMore = users => {
  return {
    type: SHOW_MORE,
    users,
  };
};
export const positionsRecieved = positions => {
  return {
    type: POSITIONS,
    positions,
  };
};

export const getUsersList = () => dispatch => {
  getUsers().then(usersList => {
    dispatch(usersListRecieved(usersList));
    dispatch(getData(usersList));
  });
};

export const getUsersListByPage = url => dispatch =>
  getUsersByPage(url).then(usersList => {
    dispatch(showMore(usersList));
  });
export const getPositions = () => dispatch =>
  сreateUserPositions().then(positionsList => dispatch(positionsRecieved(positionsList)));
