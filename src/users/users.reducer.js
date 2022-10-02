import { USERS_LIST, SHOW_MORE, POSITIONS, USERS_COUNT } from './users.action';

const initialState = {
  users: [],
  positions: [],
  prev_url: '',
  next_url: '',
  date: '',
  newUsers: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case USERS_COUNT: {
      state.users.length = 6;
      return {
        ...state,
        date: action.users.users['registration_timestamp'],
        count: action.users.count,
        next_url: action.users['links']['next_url'],
        users: action.users.users.sort((a, b) => new Date(a.date) - new Date(b.date)),
      };
    }

    case USERS_LIST: {
      state.newUsers.length = 6;
      console.log(action.users.count);
      return {
        ...state,
        newUsers: action.users.users
          .concat(state.newUsers.filter(({ id }) => !state.newUsers.includes(id)))
          .slice(0, 6),
      };
    }
    case SHOW_MORE: {
      return {
        ...state,
        newUsers: action.users.users
          .concat(state.newUsers.filter(({ id }) => !state.newUsers.includes(id)))
          .slice(0, 6),
        next_url: action.users['links']['next_url'],
      };
    }
    case POSITIONS: {
      return {
        ...state,
        positions: action.positions.positions,
      };
    }
    default:
      return state;
  }
};
export default usersReducer;
