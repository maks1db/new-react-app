import React from 'react';
import ReactDOM from 'react-dom/server';
import VarReplace from 'frontend/var-replace';
import path from 'path';
import configureStore from 'store';
import { Provider } from 'react-redux';
import App from 'frontend/App.jsx';
import { RoutingContext, match } from 'react-router';
import routes from 'frontend/routes.jsx';

module.exports = (req, res) => {
    const store = configureStore();
    const varReplace = new VarReplace({
        entry: path.resolve(__dirname, '../../frontend/template', 'index.html')
    });
    const version = require('../../../package.json').version;
    varReplace.replace('{version}',  version);
    let publicPath = '/assets';

    varReplace
        .replace('${js-path}', publicPath + '/js/')
        .replace('${link-path}',`<link rel="stylesheet" href="${publicPath}/css/styles.min.css?v=${version}">`);

    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
        var a = 1;    
    });
    // store.dispatch(getGalleryItems())
    //     .then(() => {
            // const componentHTML = ReactDOM.renderToString(
            //     <Provider store={store}>
            //         <App />
            //     </Provider>  
            // );   
        
            // JspVars
            //     .replace('${content}', componentHTML)
            //     .replace('${initial-state}',
            //         `window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())}`);
            // res.end(JspVars.getText());
        // });
    
};