import { types } from '../constants';

export const setChats = data => dispatch =>
    dispatch({ data, type: types.CHATS_SET })