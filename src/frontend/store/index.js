import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from 'reducers';
import { routerMiddleware } from 'react-router-redux';

const composeEnhancers = process.env.DEV ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) : compose;

export default function configureStore(initialState = {}, history) {
    const store = createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(
            thunkMiddleware,
            routerMiddleware(history)      
        ))
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers/index');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
