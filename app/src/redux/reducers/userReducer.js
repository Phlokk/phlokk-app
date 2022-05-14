import {types} from '../constants';

const initialState = {
    loading: false,
    user: [],
    error: {},
};


export default userReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case types.SEND_REQUEST_GET_USER:
            return {
                ...state,
                loading: true,
            };
        case types.SEND_REQUEST_GET_USER_SUCCESS:
        return {
            ...state,
            user: payload,
            loading: false,
        };
        case types.SEND_REQUEST_GET_USER_FAILURE:
        return {
            ...state,
            user: {},
            error: payload,
            loading: false,
        };
        default: 
          return state;

    }
}