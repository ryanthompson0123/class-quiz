import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Grid, Row, Col } from 'react-flexbox-grid/lib/index';
import autobind from 'autobind-decorator';
import QuizRow from '../components/QuizRow';

class QuizList extends Component {
    @autobind
    getQuizRow(quiz, index) {
        const { editQuiz, startQuiz, deleteQuiz } = this.props;
        
        return (
            <Row center='xs'>
                <Col xs={10}>
                    <QuizRow
                        key={index}
                        quiz={quiz}
                        index={index}
                        editQuiz={editQuiz}
                        onStart={startQuiz}
                        deleteQuiz={deleteQuiz} />   
                </Col>
            </Row>
        );
        
    }
    
    
    getQuizzes() {
        if (!this.props) return;
        
        const { quizzes } = this.props;
        if (!quizzes) return;
        
        return quizzes.map(this.getQuizRow);
    }
    
    render() {
        return (
            <Grid style={{width: '100%' }}>
                <Row center='xs'>
                    <Col xs={4}>
                        <div 
                            className='mui--text-display2'
                            style={{marginTop: '40px'}}>
                            My Quizzes
                        </div>
                    </Col>
                </Row>
                <Row center='xs'>
                    <Col xs={10}>
                        <div
                            className='mui--text-headline'
                            style={{marginTop: '80px'}}>
                            Select a quiz to launch it!
                        </div>
                    </Col>
                </Row>
                {this.getQuizzes()}
            </Grid>
        );
    }
}

QuizList.propTypes = {
    quizzes: ImmutablePropTypes.listOf(
        ImmutablePropTypes.contains({
            title: PropTypes.string.isRequired,
            questions: ImmutablePropTypes.listOf(
                ImmutablePropTypes.contains({
                    text: PropTypes.string.isRequired,
                    possibleAnswers: ImmutablePropTypes.listOf(
                        ImmutablePropTypes.contains({
                            text: PropTypes.string.isRequired,
                            isCorrect: PropTypes.boolean
                        })
                    ).isRequired
                })
            ).isRequired
        })
    ),
    editQuiz: PropTypes.func.isRequired,
    startQuiz: PropTypes.func.isRequired,
    deleteQuiz: PropTypes.func.isRequired
};

export default QuizList;
