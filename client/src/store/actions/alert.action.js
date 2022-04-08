import { SET_ALERT, REMOVE_ALERT } from "../types";

export const setAlert = (msg, type = "info") => (dispatch, getState) => {
    try {
        const id = getState().alert.length;

        dispatch({
            type: SET_ALERT,
            payload: { id, msg, type }
        });

        setTimeout(() => {
            dispatch(removeAlert(id))
        }, 5000)
    } catch (err) {
        console.log(err)
        throw err;
    }
}

export const removeAlert = (id) => (dispatch) => {
    try {
        dispatch({
            type: REMOVE_ALERT,
            payload: { id }
        });
    } catch (err) {
        console.log(err)
        throw err;
    }
}