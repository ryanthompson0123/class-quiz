import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid/lib/index';
import RaisedButton from 'material-ui/lib/raised-button';
import FontIcon from 'material-ui/lib/font-icon';
import IconButton from 'material-ui/lib/icon-button';
import ImmutablePropTypes from 'react-immutable-proptypes';
import autobind from 'autobind-decorator';

class QuizRow extends Component {
    @autobind
    handleStartClicked() {
        this.props.onStart(this.props.quiz);
    }
    
    @autobind
    handleEditClicked() {
        const { editQuiz, index } = this.props;
        editQuiz(index);
    }
    
    @autobind
    handleDeleteClicked() {
        const { deleteQuiz, index } = this.props;
        deleteQuiz(index);
    }
    
    render() {
        let { quiz } = this.props;
        let { title } = quiz;
                    
        return (
            <Row middle='xs'>
                <Col xs={2} />
                <Col xs={8}>
                    <RaisedButton
                        label={title}
                        onMouseUp={this.handleStartClicked}
                        style={{width: '100%'}} />
                </Col>
                <Col xs={2} >
                    <IconButton tooltip='Edit'>
                        <FontIcon
                            className='material-icons'
                            onClick={this.handleEditClicked}
                            style={{marginLeft: '0'}}>
                            create
                        </FontIcon>
                    </IconButton>
                    <IconButton tooltip='Delete'>
                        <FontIcon
                            className='material-icons'
                            onClick={this.handleDeleteClicked}
                            style={{marginLeft: '0'}}>
                            delete
                        </FontIcon>
                    </IconButton>
                </Col>
            </Row>
        );
    }
}

QuizRow.propTypes = {
    quiz: ImmutablePropTypes.contains({
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
    index: PropTypes.number.isRequired,
    editQuiz: PropTypes.func.isRequired,
    onStart: PropTypes.func.isRequired,
    deleteQuiz: PropTypes.func.isRequired
};

export default QuizRow;