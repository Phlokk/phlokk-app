export const GET_USERS_REQUESTED = "GET_USERS_REQUESTED";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_FAILED = "GET_USERS_FAILED";

export const getUsers = () => {
  return {
    type: GET_USERS_REQUESTED,
    
  };
};
