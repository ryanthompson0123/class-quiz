import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'react-flexbox-grid/lib/index';
import FontIcon from 'material-ui/lib/font-icon';
import ImmutablePropTypes from 'react-immutable-proptypes';
import autobind from 'autobind-decorator';
import IconButton from 'material-ui/lib/icon-button';
import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

let CONTENT = null; 

class QuestionRow extends Component {

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

    checkForCorrectAnswerSelection(possibleAnswers){ 
    
        let selected = false;
        possibleAnswers.map((answer,index) => {
            const {isCorrect} = answer;
            if(isCorrect==true){
                selected=isCorrect;
            }
        });
        return selected;
    }

    checkForBlankAnswers(possibleAnswers){

        let blank = false;
         possibleAnswers.map((answer,index) => {
            const {text} = answer;
            if(!text){
                blank=true;
            }
        });
        return blank;

    }


    @autobind
    handleQuestionClicked() {
        const { editQuestion, index,editingQuestion} = this.props;
        const {possibleAnswers} = editingQuestion;
        const numberOfAnswers = possibleAnswers.count();

        if(numberOfAnswers<2){
                CONTENT = "Question must have at least two answers";
                this.handleOpen();
        }else if(!this.checkForCorrectAnswerSelection(possibleAnswers)){
            CONTENT = "Please select at least one correct answer";
            this.handleOpen();
        }else if(this.checkForBlankAnswers(possibleAnswers)){
            CONTENT="Answer cannot be blank";
            this.handleOpen();
        }else{
            editQuestion(index);
        }
    
    }
    
    @autobind
    handleDeleteClicked() {
        const { deleteQuestion, index,editingQuestion } = this.props;
        deleteQuestion(index);
    }
    
    render() {
        const { question, index, isSelected} = this.props;
        const { text } = question;
        const indexLabel = index + 1;
        const label = indexLabel + '. ' + text;
        
        const backgroundColor = isSelected ? 'Grey' : '';

        const action = <FlatButton label="Ok" secondary={true}  keyboardFocused={true} onClick={this.handleClose}/>;

        return (
            <Row key={index} middle='xs'>
                <Col xs={10}>
                    <RaisedButton
                        label={label}
                        onMouseUp={this.handleQuestionClicked}
                        secondary={true}
                        backgroundColor={backgroundColor}
                        style={{width: '100%'}} />
                        <Dialog
                          title="Warning!!"
                          actions={action}
                          open={this.state.alert}
                          onRequestClose={this.handleClose}
                          style={{width:'450px',height:'100px',marginLeft:'550px',marginTop:'-250px'}}>
                            {CONTENT}   
                        </Dialog>
                                
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