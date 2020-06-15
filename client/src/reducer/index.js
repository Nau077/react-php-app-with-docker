import { combineReducers } from 'redux';
import waterBasesReducer from './waterBases';
import rigionsReducer from './rigions';
import shared from './shared';

export default combineReducers({
    rigions: rigionsReducer,
    waterBases: waterBasesReducer,
    shared: shared
});