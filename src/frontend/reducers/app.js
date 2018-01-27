import constants from '../constants/app';

const initialState = {
    message: {
        isFetching: false,
        text: ''
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
    case constants.REQUEST_MESSAGE:
        return {...state, message: { isFetching: true, text: ''}};
    case constants.RECEIVE_MESSAGE:
        return {...state, message: { isFetching: false, text: action.payload }};
    }

    return state;
};