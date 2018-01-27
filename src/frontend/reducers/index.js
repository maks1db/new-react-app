import { combineReducers } from 'redux';
import {reducer as toastr} from 'react-redux-toastr';
import { routerReducer } from 'react-router-redux';
import app from './app';

export default combineReducers({
    routing: routerReducer,
    app,
    toastr
});