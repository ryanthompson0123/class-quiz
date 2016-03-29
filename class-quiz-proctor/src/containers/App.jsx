import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

class App extends Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.node
};

function mapStateToProps() {
    return {};
}

function mapDispatchToProps() {
    return {};
}

injectTapEventPlugin();

export default connect(mapStateToProps, mapDispatchToProps)(App);
