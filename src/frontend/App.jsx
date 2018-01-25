import React from 'react';
import Routes from './routes.jsx';
import { ConnectedRouter } from 'react-router-redux';
import ReduxToastr from 'react-redux-toastr';

export default class App extends React.Component{

    constructor() {
        super();
    }

    render() { 
        return (<div> 
            <ConnectedRouter history={this.props.history}>                
                <Routes />
            </ConnectedRouter>  
            <ReduxToastr
                timeOut={4000}
                newestOnTop={false}
                preventDuplicates
                position="top-right"
                transitionIn="fadeIn"
                transitionOut="fadeOut"
                progressBar
            />        
        </div>);
    }
}