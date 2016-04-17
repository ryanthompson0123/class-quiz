import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'react-flexbox-grid/lib/index';
import { Map, List } from 'immutable';
import FontIcon from 'material-ui/lib/font-icon';
import ImmutablePropTypes from 'react-immutable-proptypes';
import autobind from 'autobind-decorator';
import TextField from 'material-ui/lib/text-field';
import IconButton from 'material-ui/lib/icon-button';
import AvAddToQueue from 'material-ui/lib/svg-icons/av/add-to-queue';
import AnswerRow from './AnswerRow';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';

let CONTENT = null;  
class QuestionEditor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            newQuestionText: '',
            alert:false,   
        };
    }

    handleOpen = () =>{
        this.setState({alert: true});  
    };

    handleClose = () => {
        this.setState({alert: false});   
    };

   

    @autobind
    handleTextChange(event) {
        const { changeQuestionText } = this.props;

            if(!event.target.value){
                CONTENT="Question Cannot Be Blank";
                this.handleOpen();
            }
        
        changeQuestionText(event.target.value);
    }
    
    @autobind
    handleAddClicked() {
        const { addAnswer } = this.props;
        const { newQuestionText } = this.state;

        if(!newQuestionText){
            CONTENT="Answer cannot be blank";
            this.handleOpen();
        }else{
            addAnswer(newQuestionText);
            this.setState({
                newQuestionText: ''
            });
        }
    }
    
    @autobind
    handleNewAnswerTextChange(event) {
        if(!event.target.value){
            CONTENT="Answer cannot be blank";
            this.handleOpen();
        }
        this.setState({
            newQuestionText: event.target.value
        });
    }
    
    render() {
        let { xs, question, index, editAnswer, deleteAnswer } = this.props;
        let { text, possibleAnswers } = question;
   

        const action = <FlatButton label="Ok" secondary={true}  keyboardFocused={true} onClick={this.handleClose}/>;

        return (
            <Col xs={xs}>
                <Row middle='xs'>
                    <Col xs={1}>
                        <div className='mui--text-display3'>
                            {index + 1}
                        </div>
                    </Col>
                    <Col xs={9}>
                        <TextField
                            floatingLabelText='Enter your quiz question here'
                            multiLine={true}
                            value={text}
                            onChange={this.handleTextChange}
                            style={{ width: '100%' }} />
                            <Dialog
                              title="Warning!!"
                              actions={action}
                              open={this.state.alert}
                              onRequestClose={this.handleClose}
                             style={{width:'450px',height:'100px',marginLeft:'550px',marginTop:'-250px'}}>
                                {CONTENT}
                            </Dialog>
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
                            floatingLabelText='Enter answer here'
                            onChange={this.handleNewAnswerTextChange}
                            value={this.state.newQuestionText}
                            style={{ width: '100%' }} />
                    </Col>
                    <Col xs={3}>
                        <IconButton tooltip='Add' onClick={this.handleAddClicked} style={{marginTop:'20px'}}>
                            <AvAddToQueue className='material-icons'
                                add
                                hoverColor="Cyan"/>
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