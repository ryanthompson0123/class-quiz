import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'react-flexbox-grid/lib/index';
import { Map, List } from 'immutable';
import FontIcon from 'material-ui/lib/font-icon';
import ImmutablePropTypes from 'react-immutable-proptypes';
import autobind from 'autobind-decorator';
import TextField from 'material-ui/lib/text-field';
import IconButton from 'material-ui/lib/icon-button';
import AnswerRow from './AnswerRow';
    
class QuestionEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newQuestionText: ''
        };
    }
    
    @autobind
    handleTextChange(event) {
        const { changeQuestionText } = this.props;
        
        changeQuestionText(event.target.value);
    }
    
    @autobind
    handleAddClicked() {
        const { addAnswer } = this.props;
        const { newQuestionText } = this.state;

        addAnswer(newQuestionText);
        this.setState({
            newQuestionText: ''
        });
    }
    
    @autobind
    handleNewAnswerTextChange(event) {
        this.setState({
            newQuestionText: event.target.value
        });
    }
    
    render() {
        let { xs, question, index, editAnswer, deleteAnswer } = this.props;
        let { text, possibleAnswers } = question;

        return (
            <Col xs={xs}>
                <Row middle='xs'>
                    <Col xs={2}>
                        <div className='mui--text-display3'>
                            {index + 1}
                        </div>
                    </Col>
                    <Col xs={9}>
                        <TextField
                            floatingLabelText='Enter your quiz question here'
                            multiLine
                            rows={3}
                            rowsMax={5}
                            value={text}
                            onChange={this.handleTextChange}
                            style={{ width: '100%' }} />
                    </Col>
                </Row>
                {possibleAnswers.map((answer, index) => {
                    return (
                        <AnswerRow
                            key={index}
                            answer={answer}
                            index={index}
                            editAnswer={editAnswer}
                            deleteAnswer={deleteAnswer} />
                    );
                })}
                <Row middle='xs'>
                    <Col xs={1} />
                    <Col xs={8}>
                        <TextField
                            floatingLabelText='Enter another answer here'
                            onChange={this.handleNewAnswerTextChange}
                            value={this.state.newQuestionText}
                            style={{ width: '100%' }} />
                    </Col>
                    <Col xs={3}>
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

QuestionEditor.propTypes = {
    xs: PropTypes.number.isRequired,
    question: ImmutablePropTypes.contains({
        text: PropTypes.string.isRequired,
        possibleAnswers: ImmutablePropTypes.listOf(
            ImmutablePropTypes.contains({
                text: PropTypes.string.isRequired,
                isCorrect: PropTypes.bool
            })
        ).isRequired
    }),
    index: PropTypes.number.isRequired,
    editAnswer: PropTypes.func.isRequired,
    deleteAnswer: PropTypes.func.isRequired,
    addAnswer: PropTypes.func.isRequired,
    changeQuestionText: PropTypes.func.isRequired
};

export default QuestionEditor;