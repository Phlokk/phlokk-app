import { types } from '../constants'

export const openCommentModal = (open, data) => (dispatch) => {
    return dispatch({
        data,
        open,
        modalType: 0,
        type: types.MODAL_OPEN_COMMENT_SECTION
    })
}


export const openSettingsModal = (open, data) => (dispatch) => {
    return dispatch({
        data,
        open,
        modalType: 1,
        type: types.MODAL_OPEN_SETTINGS
    })
}

export const openGiftingModal = (open, data) => (dispatch) => {
    return dispatch({
        data,
        open,
        modalType: 2,
        type: types.MODAL_OPEN_GIFTING_SECTION
    })
}

export const openSettingsSheetModal = (open, data) => (dispatch) => {
    return dispatch({
        data,
        open,
        modalType: 3,
        type: types.MODAL_OPEN_SETTINGS_SHEET_SECTION
    })
}



export const clearModal = () => (dispatch) => {
    return dispatch({
        type: types.CLEAR_MODAL
    })
}