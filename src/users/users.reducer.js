import { USERS_LIST, SHOW_MORE, POSITIONS, USERS_COUNT } from './users.action';

const initialState = {
  users: [],
  positions: [],
  prev_url: '',
  next_url: '',
  totalItems: 0,
  count: 0,
  currentPage: 0,
  date: '',
  newUsers: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case USERS_COUNT: {
      return {
        ...state,
        count: action.users.count,
        next_url: action.users['links']['next_url'],
        users: action.users.users.sort((a, b) => new Date(a.date) - new Date(b.date)),
      };
    }

    case USERS_LIST: {
      // console.log(action.users['count']);
      // const Url = new URL(state.next_url);
      // const parsed = qs.parse(Url.search);
      // const newPage = Number(parsed.page);
      // Url.searchParams.delete('count');
      // Url.searchParams.set('page', newPage);
      console.log(action.users.count);
      return {
        ...state,
        date: action.users.users['registration_timestamp'],
        newUsers: state.users.concat(
          action.users.users.filter(({ id }) => !state.users.includes(id)),
        ),
        totalItems: action.users['total_users'],
        next_url: action.users['links']['next_url'],
        prev_url: action.users['links']['prev_url'],
        count: action.users.count,
        currentPage: action.users['page'],
      };
    }
    case SHOW_MORE: {
      if (state.newUsers.length > 0) {
        state.users = state.newUsers;
      }

      return {
        ...state,
        newUsers: state.users.concat(
          action.users.users.filter(({ id }) => !state.users.includes(id)),
        ),
        next_url: action.users['links']['next_url'],
        currentPage: state.currentPage,
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
