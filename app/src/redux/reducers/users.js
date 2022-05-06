const initialState = {
  user: [],
  loading: false,
  error: null,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USERS_REQUESTED":
      return { ...state, loading: true };
    case "GET_USERS_SUCCESS":
      return { ...state, loading: false, user: action.user };
    case "GET_USERS_FAILED":
      return { ...state, loading: false, error: action.message };
    default:
      return state;
  }
};

export default user;
