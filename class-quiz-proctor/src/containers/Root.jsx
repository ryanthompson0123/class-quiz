import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import DevTools from './DevTools';
import ProctorContainer from './ProctorContainer';

export default class Root extends Component {
    render() {
        const { store } = this.props;
        
        return (
            <Provider store={store}>
                <div>
                    <ProctorContainer />
                    <DevTools />
                </div>
            </Provider>
        );
    }
}

Root.propTypes = {
    store: PropTypes.object.isRequired
};