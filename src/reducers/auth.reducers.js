/* eslint-disable default-case */
import { authConstants } from '../actions/constants';

const initState = {
    name: 'med'
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initState, action) => {

    console.log("🚀 ~ file: auth.reducers.js ~ line 12 ~ action", action)
    
    switch (action.type) {
        case authConstants.LOGIN_REQUEST:       
            state = {
                ...state,
                ...action.payload
            }     
        break;
    }
    return state;
}