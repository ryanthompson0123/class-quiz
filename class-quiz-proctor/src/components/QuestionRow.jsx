import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'react-flexbox-grid/lib/index';
import FontIcon from 'material-ui/lib/font-icon';
import ImmutablePropTypes from 'react-immutable-proptypes';
import autobind from 'autobind-decorator';
import IconButton from 'material-ui/lib/icon-button';
import RaisedButton from 'material-ui/lib/raised-button';

class QuestionRow extends Component {
    @autobind
    handleQuestionClicked() {
        const { editQuestion, index } = this.props;
        editQuestion(index);
    }
    
    @autobind
    handleDeleteClicked() {
        const { deleteQuestion, index } = this.props;
        deleteQuestion(index);
    }
    
    render() {
        const { question, index, isSelected } = this.props;
        const { text } = question;
        const indexLabel = index + 1;
        const label = indexLabel + ' ' + text;
        
        const backgroundColor = isSelected ? '#00CCFF' : '#FFFFFF';
        
        return (
            <Row key={index} middle='xs'>
                <Col xs={10}>
                    <RaisedButton
                        label={label}
                        onMouseUp={this.handleQuestionClicked}
                        backgroundColor={backgroundColor}
                        style={{width: '100%'}} />
                </Col>
                <Col xs={2}>
                    <IconButton tooltip='Delete'>
                        <FontIcon
                            className='material-icons'
                            onClick={this.handleDeleteClicked}>
                            delete
                        </FontIcon>
                    </IconButton>
                </Col>
            </Row>
        );
    }
}

QuestionRow.propTypes = {
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
    isSelected: PropTypes.bool.isRequired,
    deleteQuestion: PropTypes.func.isRequired,
    editQuestion: PropTypes.func.isRequired
};

export default QuestionRow;