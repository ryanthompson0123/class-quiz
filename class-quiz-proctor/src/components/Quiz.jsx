import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Grid, Row, Col } from 'react-flexbox-grid/lib/index';
import autobind from 'autobind-decorator';
import RaisedButton from 'material-ui/lib/raised-button';
import QuizContent from '../components/QuizContent';
import PlayerList from '../components/PlayerList';

class Quiz extends Component {
    
    @autobind
    handleExitClicked() {
        this.props.exitQuiz();
    }
    
    @autobind
    handleSkipClicked() {
        this.props.nextStep();
    }
    
    getExitButton() {
        return (
            <RaisedButton
                label='Exit Quiz'
                secondary={true}
                onMouseUp={this.handleExitClicked}
                style={{float: 'right'}} />
        );
    }
    
    getBottomBar(currentStep) {
        if (currentStep == 'resultsStep') return;
        
        const text = currentStep == 'waiting' ? 'Start Quiz' : 'Skip';
        
        return (
            <Row>
                <Col xs={10}>
                    <div> I'm a timer</div>
                </Col>
                <Col xs={2}>
                    <RaisedButton
                        label={text}
                        secondary={true}
                        onMouseUp={this.handleSkipClicked}
                        style={{float: 'right'}} />
                </Col>
            </Row>
        );
    }
    
    getPlayerList(currentStep, quiz) {
        if (currentStep == 'resultsStep') {
            return;
        }
        
        return (
            <Col xs={3}>
                <PlayerList quiz={quiz} />
            </Col>
        );
    }
    
    render() {
        const { quiz } = this.props;
        const { currentStep } = quiz;
        
        return (
            <Grid style={{width: '98vw'}}>
                <Row style={{marginTop:'10px'}}>
                    <Col xs={12}>
                        {this.getExitButton()}
                    </Col>
                </Row>
                <Row top='xs' style={{height: '82vh'}}>
                    <QuizContent quiz={quiz} {...this.props} />
                    {this.getPlayerList(currentStep, quiz)}
                </Row>
                {this.getBottomBar(currentStep)}
            </Grid>
        );
    }
}

Quiz.propTypes = {
    quiz: ImmutablePropTypes.contains({
        currentQuestion: ImmutablePropTypes.contains({
            
        }),
        scores: ImmutablePropTypes.contains({
            
        }).isRequired,
        currentStep: PropTypes.string.isRequired
    }),
    nextStep: PropTypes.func.isRequired,
    exitQuiz: PropTypes.func.isRequired
};

export default Quiz;
