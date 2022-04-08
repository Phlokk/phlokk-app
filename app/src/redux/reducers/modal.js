import { CLEAR_MODAL, MODAL_OPEN_COMMENT_SECTION, MODAL_OPEN_SETTINGS, MODAL_OPEN_GIFTING_SECTION, MODAL_OPEN_SETTINGS_SHEET_SECTION  } from '../constants';

const initialState = {
    open: false,
    data: null,
    modalType: -1,
}

export const modal = (state = initialState, action) => {
    switch (action.type) {
        case MODAL_OPEN_COMMENT_SECTION:
            return {
                ...state,
                open: action.open,
                data: action.data,
                modalType: action.modalType,
            }
        case CLEAR_MODAL:
            return initialState;
        default:
            return state;
    }
}

export const settingsModal = (state = initialState, action) => {
    switch (action.type) {
        case MODAL_OPEN_SETTINGS:
            return {
                ...state,
                open: action.open,
                data: action.data,
                modalType: action.modalType,
            }
        case CLEAR_MODAL:
            return initialState;
        default:
            return state;
    }
}

export const giftingModal = (state = initialState, action) => {
    switch (action.type) {
        case MODAL_OPEN_GIFTING_SECTION:
            return {
                ...state,
                open: action.open,
                data: action.data,
                modalType: action.modalType,
            }
        case CLEAR_MODAL:
            return initialState;
        default:
            return state;
    }
}

export const settingsSheetModal = (state = initialState, action) => {
    switch (action.type) {
        case MODAL_OPEN_SETTINGS_SHEET_SECTION:
            return {
                ...state,
                open: action.open,
                data: action.data,
                modalType: action.modalType,
            }
        case CLEAR_MODAL:
            return initialState;
        default:
            return state;
    }
}


