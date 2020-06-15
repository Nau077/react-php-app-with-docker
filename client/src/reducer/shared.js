import {
    ENABLE_LOADING,
    REQUEST_IN_SUCCESS,
    REQUEST_IN_FAILURE
} from '../actions/action_constants';

export const initialState = {
    isLoading: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
    case ENABLE_LOADING:
        return {
            ...state,
            isLoading: true,
        };

    case REQUEST_IN_SUCCESS:
        return {
            ...state,
            isLoading: false,
        };

    case REQUEST_IN_FAILURE:
        return {
            ...state,
            isLoading: false,
        };
    default:
        return state;
    }
};