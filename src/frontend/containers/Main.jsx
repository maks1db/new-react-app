import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {};
}

function mapDispatcToProps(dispatch) {
    return {};
}

@connect(mapStateToProps, mapDispatcToProps)
export default class Main extends Component {

    constructor() {
        super();
    }

    render() {

        return (
            <div>
                <h1>Full react app</h1>
            </div>
        );
    }
}