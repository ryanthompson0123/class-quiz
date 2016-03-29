import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'react-flexbox-grid/lib/index';
import FontIcon from 'material-ui/lib/font-icon';
import ImmutablePropTypes from 'react-immutable-proptypes';
import autobind from 'autobind-decorator';
import IconButton from 'material-ui/lib/icon-button';
import Checkbox from 'material-ui/lib/checkbox';
import TextField from 'material-ui/lib/text-field';

class AnswerRow extends Component {
    @autobind
    handleDeleteClicked() {
        const { deleteAnswer, index } = this.props;
        
        deleteAnswer(index);
    }
    
    @autobind
    handleCorrectChecked() {
        const { editAnswer, answer, index } = this.props;
        const { text, isCorrect } = answer;
        
        const newValue = isCorrect ? false : true;
        
        editAnswer(index, text, newValue);
    }
    
    @autobind
    handleAnswerTextChange(event) {
        const { editAnswer, answer, index } = this.props;
        const { isCorrect } = answer;
        
        editAnswer(index, event.target.value, isCorrect);
    }
    
    render() {
        const { answer, index } = this.props;
        const { text, isCorrect } = answer;
        
        return (
            <Row key={index} middle='xs'>
                <Col xs={1}>
                    <Checkbox
                        defaultChecked={isCorrect}
                        onCheck={this.handleCorrectChecked} />
                </Col>
                <Col xs={10}>
                    <TextField
                        hintText='Enter answer text here'
                        value={text}
                        onChange={this.handleAnswerTextChange}
                        style={{ width: '100%' }} />
                </Col>
                <Col xs={1}>
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

AnswerRow.propTypes = {
    answer: ImmutablePropTypes.contains({
        text: PropTypes.string.isRequired,
        isCorrect: PropTypes.bool
    }),
    index: PropTypes.number.isRequired,
    deleteAnswer: PropTypes.func.isRequired,
    editAnswer: PropTypes.func.isRequired
};

export default AnswerRow;