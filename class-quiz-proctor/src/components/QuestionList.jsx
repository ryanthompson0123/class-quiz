import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'react-flexbox-grid/lib/index';
import { Map, List } from 'immutable';
import FontIcon from 'material-ui/lib/font-icon';
import ImmutablePropTypes from 'react-immutable-proptypes';
import autobind from 'autobind-decorator';
import TextField from 'material-ui/lib/text-field';
import IconButton from 'material-ui/lib/icon-button';
import QuestionRow from './QuestionRow';
    
class QuestionList extends Component {
    @autobind
    handleNameChange(event) {
        const { changeQuizName } = this.props;
        changeQuizName(event.target.value);
    }
    
    @autobind
    handleAddClicked() {
        const { addQuestion } = this.props;
        
        addQuestion();
    }
    
    render() {
        let { xs, selectedQuiz, editingQuestionIndex, editQuestion, deleteQuestion } = this.props;
        let { title, questions } = selectedQuiz;

        return (
            <Col xs={xs}>
                <Row center='xs'>
                    <Col xs={12}>
                        <TextField
                            value={title}
                            hintText='Quiz Name'
                            floatingLabelText='Quiz Name'
                            style={{width: '100%'}}
                            onChange={this.handleNameChange} />
                    </Col>
                </Row>
                {questions.map((question, index) => {
                    const isSelected = index == editingQuestionIndex;
                    
                    return (
                        <QuestionRow
                            key={index}
                            question={question}
                            index={index}
                            editQuestion={editQuestion}
                            deleteQuestion={deleteQuestion}
                            isSelected={isSelected} />
                    );
                })}
                <Row center='xs' middle='xs'>
                    <Col xs={3} >
                        <IconButton tooltip='Add'>
                            <FontIcon
                                className='material-icons'
                                onClick={this.handleAddClicked}>
                                add
                            </FontIcon>
                        </IconButton>
                    </Col>
                </Row>
            </Col>
        );
    }
}

QuestionList.propTypes = {
    xs: PropTypes.number.isRequired,
    selectedQuiz: ImmutablePropTypes.contains({
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
    }),
    editingQuestionIndex: PropTypes.number.isRequired,
    addQuestion: PropTypes.func.isRequired,
    editQuestion: PropTypes.func.isRequired,
    deleteQuestion: PropTypes.func.isRequired,
    changeQuizName: PropTypes.func.isRequired
};

export default QuestionList;