import {
    GET_RIGIONS
} from '../actions/action_constants';

export const initialState = {
    rigionList: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
    case GET_RIGIONS:
        return {
            rigionList: action.payload,
        };
    default:
        return state;
    }
};