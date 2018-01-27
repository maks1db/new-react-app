import constants from '../constants/app'; 
import { message } from '../api';

export const getMessage = () => dispatch => {
    dispatch({type: constants.REQUEST_MESSAGE});

    return message()
        .then(x => {
            dispatch({
                type: constants.RECEIVE_MESSAGE,
                payload: x.data.message
            });
        });
};