import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid/lib/index';
import TextField from 'material-ui/lib/text-field';
import ImmutablePropTypes from 'react-immutable-proptypes';
import RaisedButton from 'material-ui/lib/raised-button';
import autobind from 'autobind-decorator';

class NameEntry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playerName: ''
        };
    }
  
    @autobind
    handleJoinQuiz() {
        console.log('in join quiz');
        console.log('about to join');
        this.props.join(this.state.playerName);
    }
    
    @autobind
    handleNameChange(event) {
        this.setState({
            playerName: event.target.value
        });
    }
    
    render() {
        
        return (
            <Grid style={{width: '100%'}}>
                <Row>
                    <Col xs={4}>
                        <div
                            className='mui--text-display2'
                            style={{marginLeft: '40px', marginTop: '100px'}}>
                            Welcome.
                        </div>
                    </Col>
                </Row>
                <Row center='xs'>
                    <Col xs={8}>
                        <TextField
                            ref={c => this.nameField = c}
                            hintText='Please enter your name.'
                            floatingLabelText='Please enter your name.'
                            onChange={this.handleNameChange}
                            style={{marginTop: '100px'}} />
                    </Col>
                </Row>
                <Row center='xs'>
                    <Col xs={8}>
                        <RaisedButton
                            label='Join!'
                            backgroundColor='#00CCFF'
                            onMouseUp={this.handleJoinQuiz}
                            style={{float: 'right'}} />
                    </Col>
                </Row>
            </Grid>
        );
    }
}

NameEntry.propTypes = {
    results: ImmutablePropTypes.contains({
        rank: PropTypes.number.isRequired,
        players: PropTypes.number.isRequired,
        score: PropTypes.number.isRequired,
        correctAnswers: PropTypes.number.isRequired,
        possibleAnswers: PropTypes.number.isRequired,
        avgResponse: PropTypes.string.isRequired
    }),
    join: PropTypes.func.isRequired
};

export default NameEntry;
