import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid/lib/index';
import RaisedButton from 'material-ui/lib/raised-button';
import FontIcon from 'material-ui/lib/font-icon';
import ImmutablePropTypes from 'react-immutable-proptypes';
import autobind from 'autobind-decorator';

class QuizQuestion extends Component {
    getAnswerHandler(answer) {
        return () => {
            this.props.respond(answer);
        };
    }
    
    getAnswerButton(answer) {
        const { text, id } = answer;
        const { correctAnswer } = this.props;
        
        const style = { 
            width: '100%',
            marginTop: 20,
            marginBottom: 20
        };
        
        const handleAnswer = correctAnswer ? null : this.getAnswerHandler(answer);
        
        if (this.props.selectedAnswer && 
            this.props.selectedAnswer.equals(answer)) {
            return (
                <RaisedButton
                    key={id}
                    label={text}
                    backgroundColor='#00CCFF'
                    style={style}
                    onMouseUp={handleAnswer} />
            );
        } else {
            return (
                <RaisedButton
                    key={id}
                    label={text}
                    style={style}
                    onMouseUp={handleAnswer} />
            );
        }
    }
    
    getAnswerIndicator(answer) {
        const { correctAnswer, selectedAnswer } = this.props;
        
        if (!correctAnswer) return;

        if (answer.equals(correctAnswer)) {
            return (
                <FontIcon
                    className='material-icons' 
                    color='#00CC00'
                    style={{float: 'right'}}>
                    done
                </FontIcon>
            );
        }
        
        if (answer.equals(selectedAnswer)) {
            return (
                <FontIcon
                    className='material-icons' 
                    color='#CC0000'
                    style={{float: 'right'}}>
                    clear
                </FontIcon>
            );
        }
    }
    
    @autobind
    getAnswerRow(answer) {
        const { id } = answer;
        
        const leftXs = this.props.correctAnswer ? 2 : 1;
        const mainXs = this.props.correctAnswer ? 9 : 10;
        
        return (
            <Row key={id} middle='xs'>
                <Col xs={leftXs}>
                    {this.getAnswerIndicator(answer)}
                </Col>
                <Col xs={mainXs}>
                    {this.getAnswerButton(answer)}
                </Col>
            </Row>
        );
    }
    
    render() {
        let { question, timeRemaining } = this.props;
        let { number, text, possibleAnswers } = question;
        
        return (
            <Grid style={{width: '100%' }}>
                <Row>
                    <Col xs={4}>
                        <div 
                            className='mui--text-display2'
                            style={{marginLeft: '40px', marginTop: '100px'}}>
                            Q{number}
                        </div>
                    </Col>
                </Row>
                <Row center='xs'>
                    <Col xs={10}>
                        <div
                            className='mui--text-headline'
                            style={{marginTop: '20px'}}>
                            {text}
                        </div>
                    </Col>
                </Row>
                {possibleAnswers.map(this.getAnswerRow)}
                <Row center='xs'>
                    <Col xs={4}>
                        <div
                            className='mui--text-display2'
                            style={{marginTop: '40px'}}>
                            {timeRemaining}
                        </div>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

QuizQuestion.propTypes = {
    question: ImmutablePropTypes.contains({
        number: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        possibleAnswers: ImmutablePropTypes.listOf(
            ImmutablePropTypes.contains({
                id: PropTypes.number.isRequired,
                text: PropTypes.string.isRequired
            })
        ).isRequired
    }).isRequired,
    selectedAnswer: ImmutablePropTypes.contains({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired
    }),
    correctAnswer: ImmutablePropTypes.contains({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired
    }),
    respond: PropTypes.func.isRequired,
    timeRemaining: PropTypes.number
};

export default QuizQuestion;