import { combineReducers } from 'redux';
import {reducer as toastr} from 'react-redux-toastr';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
    routing: routerReducer,
    toastr
});