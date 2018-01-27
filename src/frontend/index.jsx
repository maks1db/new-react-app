import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import configureStore from './store';
import createHistory from 'history/createBrowserHistory';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import 'scss/index.scss';

const initialState = window.__INITIAL_STATE__ || {};

const history = createHistory();
const store = configureStore(initialState, history);

const render = Component => {
    ReactDOM.render(
        <Provider store={store}>
            <AppContainer>
                <Component history={history} />
            </AppContainer>
        </Provider>
        ,
        document.getElementById('root')
    );
};
  
render(App);
  
if (module.hot) {
    module.hot.accept('./App.jsx', () => {
        const NextApp = require('./App.jsx').default;
        render(NextApp);
    });
}