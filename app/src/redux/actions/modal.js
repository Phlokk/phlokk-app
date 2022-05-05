import { 
    CLEAR_MODAL, 
    MODAL_OPEN_COMMENT_SECTION, 
    MODAL_OPEN_SETTINGS, 
    MODAL_OPEN_GIFTING_SECTION, 
    MODAL_OPEN_SETTINGS_SHEET_SECTION } from '../constants'

export const openCommentModal = (open, data) => (dispatch) => {
    return dispatch({
        data,
        open,
        modalType: 0,
        type: MODAL_OPEN_COMMENT_SECTION
    })
}


export const openSettingsModal = (open, data) => (dispatch) => {
    return dispatch({
        data,
        open,
        modalType: 1,
        type: MODAL_OPEN_SETTINGS
    })
}

export const openGiftingModal = (open, data) => (dispatch) => {
    return dispatch({
        data,
        open,
        modalType: 2,
        type: MODAL_OPEN_GIFTING_SECTION
    })
}

export const openSettingsSheetModal = (open, data) => (dispatch) => {
    return dispatch({
        data,
        open,
        modalType: 3,
        type: MODAL_OPEN_SETTINGS_SHEET_SECTION
    })
}



export const clearModal = () => (dispatch) => {
    return dispatch({
        type: CLEAR_MODAL
    })
}