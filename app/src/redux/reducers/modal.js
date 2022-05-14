import { types } from '../constants';

const initialState = {
    open: false,
    data: null,
    modalType: -1,
}

export const modal = (state = initialState, action) => {
    switch (action.type) {
        case types.MODAL_OPEN_COMMENT_SECTION:
            return {
                ...state,
                open: action.open,
                data: action.data,
                modalType: action.modalType,
            }
        case types.CLEAR_MODAL:
            return initialState;
        default:
            return state;
    }
}

export const settingsModal = (state = initialState, action) => {
    switch (action.type) {
        case types.MODAL_OPEN_SETTINGS:
            return {
                ...state,
                open: action.open,
                data: action.data,
                modalType: action.modalType,
            }
        case types.CLEAR_MODAL:
            return initialState;
        default:
            return state;
    }
}

export const giftingModal = (state = initialState, action) => {
    switch (action.type) {
        case types.MODAL_OPEN_GIFTING_SECTION:
            return {
                ...state,
                open: action.open,
                data: action.data,
                modalType: action.modalType,
            }
        case types.CLEAR_MODAL:
            return initialState;
        default:
            return state;
    }
}

export const settingsSheetModal = (state = initialState, action) => {
    switch (action.type) {
        case types.MODAL_OPEN_SETTINGS_SHEET_SECTION:
            return {
                ...state,
                open: action.open,
                data: action.data,
                modalType: action.modalType,
            }
        case types.CLEAR_MODAL:
            return initialState;
        default:
            return state;
    }
}


