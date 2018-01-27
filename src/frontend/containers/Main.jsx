import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMessage as getMessageAction } from '../actions';

function mapStateToProps(state) {
    return {
        message: state.app.message
    };
}

function mapDispatcToProps(dispatch) {
    return {
        getMessage: () => dispatch(getMessageAction())
    };
}

@connect(mapStateToProps, mapDispatcToProps)
export default class Main extends Component {

    constructor() {
        super();
    }

    componentDidMount() {
        this.props.getMessage();
    }

    render() {

        const { message } = this.props;

        return (
            <div>
                <h1>{message.text}</h1>
            </div>
        );
    }
}