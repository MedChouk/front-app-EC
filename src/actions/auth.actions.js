import { authConstants } from './constants';

export const login = (user) => {
console.log("🚀 ~ file: auth.actions.js ~ line 4 ~ login ~ user", user)

    return async (dispatch) => {
        dispatch({
            type: authConstants.LOGIN_REQUEST,
            payload: {
                ...user
            }
        });
    }
}