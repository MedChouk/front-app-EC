/* // eslint-disable-next-line import/no-anonymous-default-export
export default (state = {name: 'med'}, action) => {
    return state;
} */

import authReducer from "./auth.reducers";
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth: authReducer
});

export default rootReducer;