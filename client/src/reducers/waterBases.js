import {
    GET_WATERBASES,
    FILTER_WATERBASES
} from '../utils/ACTIONS_TYPES';

export const initialState = {
    waterBasesList: [],
    wBfilterList: []
};

export default (state = initialState, action) => {
    switch (action.type) {
    case GET_WATERBASES:
        return {
            ...state,
            waterBasesList: action.payload,
        };
    case FILTER_WATERBASES:
        return {
            ...state,
            wBfilterList: action.payload,
        };
    default:
        return state;
    }
};