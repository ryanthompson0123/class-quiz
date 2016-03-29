import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid/lib/index';
import FontIcon from 'material-ui/lib/font-icon';
import ImmutablePropTypes from 'react-immutable-proptypes';
import autobind from 'autobind-decorator';
import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';

const cardStyle = {
    marginTop: '20px',
    marginBottom: '20px'
};

const iconStyle = {
    marginLeft: '10px',
    marginRight: 'auto',
    fontSize: '40px'
};

class QuizQuestion extends Component {
    
    getAnswerIcon(isCorrect, showAnswer) {
        if (!isCorrect || !showAnswer) return;
        
        return (
            <FontIcon
                className='material-icons' 
                color='#00CC00'
                style={iconStyle}>
                done
            </FontIcon>
        );
    }
    
    getAnswerCard(answer, showAnswer) {
        const { id, text, isCorrect } = answer;
        
        
        return (
            <Card key={id} style={cardStyle}>
                <Grid style={{width: '100%'}}>
                    <Row center='xs' middle='xs'>
                        <Col xs={0}>
                            {this.getAnswerIcon(isCorrect, showAnswer)}
                        </Col>
                        <Col xs={11}>
                            <CardTitle title={text.toUpperCase()} />
                        </Col>
                    </Row>
                </Grid>
            </Card>
        );
    }
    
    @autobind
    getAnswerRow(answer, showAnswer) {
        const { id } = answer;
        
        return (
            <Row key={id} center='xs'>
                <Col xs={8}>
                    {this.getAnswerCard(answer, showAnswer)}
                </Col>
            </Row>
        );
    }
    
    render() {
        let { question, showAnswer, xs } = this.props;
        let { number, text, possibleAnswers } = question;
        
        return (
            <Col xs={xs}>
                <Row>
                    <Col xs={4}>
                        <div 
                            className='mui--text-display2'
                            style={{marginLeft: '40px' }}>
                            Q{number}
                        </div>
                    </Col>
                </Row>
                <Row center='xs'>
                    <Col xs={8}>
                        <div
                            className='mui--text-display2'
                            style={{marginTop: '20px', marginBottom: '50px'}}>
                            {text}
                        </div>
                    </Col>
                </Row>
                {possibleAnswers.map(answer => this.getAnswerRow(answer, showAnswer))}
            </Col>
        );
    }
}

QuizQuestion.propTypes = {
    xs: PropTypes.number.isRequired,
    showAnswer: PropTypes.bool,
    question: ImmutablePropTypes.contains({
        number: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        possibleAnswers: ImmutablePropTypes.listOf(
            ImmutablePropTypes.contains({
                id: PropTypes.number.isRequired,
                text: PropTypes.string.isRequired,
                isCorrect: PropTypes.boolean
            })
        ).isRequired
    }).isRequired
};

export default QuizQuestion;