import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Grid, Row, Col } from 'react-flexbox-grid/lib/index';
import autobind from 'autobind-decorator';
import RaisedButton from 'material-ui/lib/raised-button';
import QuestionList from './QuestionList';
import QuestionEditor from './QuestionEditor';

class QuizEditor extends Component {
    
    @autobind
    handleDoneClicked() {
        const { saveQuiz, editingQuizIndex, selectedQuiz } = this.props;
        
        saveQuiz(selectedQuiz, editingQuizIndex);
    }
    
    render() {
        console.log(this.props);
        const { selectedQuiz, editingQuestionIndex } = this.props;
        
        const editingQuestion = selectedQuiz.getIn(['questions', editingQuestionIndex]);
        
        return (
            <Grid style={{
                width: 'auto',
                margin: '20px'
            }}>
                <Row top='xs' style={{height: '85vh'}}>
                    <QuestionList
                        xs={3}
                        {...this.props} />
                    <Col xs={1} />
                    <QuestionEditor
                        xs={6}
                        question={editingQuestion}
                        index={editingQuestionIndex}
                        {...this.props} />
                </Row>
                <Row end='xs'>
                    <Col xs={10} />
                    <Col xs={2}>
                        <RaisedButton
                            label='Done'
                            onMouseUp={this.handleDoneClicked} />
                    </Col>
                </Row>
            </Grid>
        );
    }
}

QuizEditor.propTypes = {
    selectedQuiz: ImmutablePropTypes.contains({
        title: PropTypes.string.isRequired,
        questions: ImmutablePropTypes.listOf(
            ImmutablePropTypes.contains({
                text: PropTypes.string.isRequired,
                possibleAnswers: ImmutablePropTypes.listOf(
                    ImmutablePropTypes.contains({
                        text: PropTypes.string.isRequired,
                        isCorrect: PropTypes.bool
                    })
                ).isRequired
            })
        ).isRequired
    }),
    editingQuizIndex: PropTypes.number.isRequired,
    editingQuestionIndex: PropTypes.number.isRequired,
    saveQuiz: PropTypes.func.isRequired,
    addQuestion: PropTypes.func.isRequired,
    editQuestion: PropTypes.func.isRequired,
    deleteQuestion: PropTypes.func.isRequired,
    changeQuizName: PropTypes.func.isRequired,
    editAnswer: PropTypes.func.isRequired,
    deleteAnswer: PropTypes.func.isRequired,
    addAnswer: PropTypes.func.isRequired,
    changeQuestionText: PropTypes.func.isRequired
};

export default QuizEditor;
