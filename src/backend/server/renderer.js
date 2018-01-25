import React from 'react';
import ReactDOM from 'react-dom/server';
import JspReplace from 'frontend/jsp_replace';
import path from 'path';
import configureStore from 'store';
import { Provider } from 'react-redux';
const { getGalleryItems } = require('actions');
import App from 'frontend/App.jsx';

module.exports = (req, res) => {
    const store = configureStore();
    const JspVars = new JspReplace({
        entry: path.resolve(__dirname, '../../frontend/template', 'index.html')
    });
    const version = require('../../../package.json').version;
    JspVars.replace('{version}',  version);
    let publicPath = '/assets';

    JspVars
        .replace('${js-path}', publicPath + '/js/')
        .replace('${link-path}',`<link rel="stylesheet" href="${publicPath}/css/styles.min.css?v=${version}">`);

    store.dispatch(getGalleryItems())
        .then(() => {
            const componentHTML = ReactDOM.renderToString(
                <Provider store={store}>
                    <App />
                </Provider>  
            );   
        
            JspVars
                .replace('${content}', componentHTML)
                .replace('${initial-state}',
                    `window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())}`);
            res.end(JspVars.getText());
        });
    
};