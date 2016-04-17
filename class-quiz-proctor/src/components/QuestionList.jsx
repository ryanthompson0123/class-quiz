import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'react-flexbox-grid/lib/index';
import { Map, List } from 'immutable';
import FontIcon from 'material-ui/lib/font-icon';
import ImmutablePropTypes from 'react-immutable-proptypes';
import autobind from 'autobind-decorator';
import TextField from 'material-ui/lib/text-field';
import AvAddToQueue from 'material-ui/lib/svg-icons/av/add-to-queue';
import IconButton from 'material-ui/lib/icon-button';
import QuestionRow from './QuestionRow';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';

let CONTENT = null;
    
class QuestionList extends Component {

    constructor(props) {
            super(props);
            this.state = {
              alert: false,
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
    handleNameChange(event) {
        const { changeQuizName } = this.props;
        if(!event.target.value){
            CONTENT = "Quiz Name Cannot Be Blank";
            this.handleOpen();
        }
        changeQuizName(event.target.value);
    }
    
    @autobind
    handleAddClicked() {
        const { addQuestion,selectedQuiz,editingQuestionIndex } = this.props;
        const {questions} = selectedQuiz;
        const count = questions.count();

        if(count>0){
            const {editingQuestion} = this.props;
            const {text,possibleAnswers} = editingQuestion;
            const numberOfAnswers = possibleAnswers.count();

            if(!text){
                CONTENT = "Question Cannot Be Blank";
                this.handleOpen();
            }else if(numberOfAnswers<2){
                CONTENT = "Question must have at least two answers";
                this.handleOpen();
            }else if(!this.checkForCorrectAnswerSelection(possibleAnswers)){
                CONTENT = "Please select at least one correct answer";
                this.handleOpen();
            }else if(this.checkForBlankAnswers(possibleAnswers)){
                CONTENT="Answer cannot be blank";
                this.handleOpen();
            }else{
                console.log("inside add");
                addQuestion();
            }
        }else{
            addQuestion();
        }

 
    }
    
    render() {
        let { xs, selectedQuiz, editingQuestionIndex,editingQuestion,editQuestion, deleteQuestion } = this.props;
        let { title, questions } = selectedQuiz;


        const action = <FlatButton label="Ok" secondary={true}  keyboardFocused={true} onClick={this.handleClose}/>;
       
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
                            editingQuestion={editingQuestion}
                            isSelected={isSelected} />
                    );
                })}
                <Row center='xs'>
                    <Col style={{marginLeft:'-60px',marginTop:'10px'}}>
                        <IconButton tooltip='Add question' onClick={this.handleAddClicked}>
                            <AvAddToQueue className='material-icons'
                                add
                                hoverColor="Cyan"/>
                                <Dialog
                                  title="Warning!!"
                                  actions={action}
                                  open={this.state.alert}
                                  onRequestClose={this.handleClose}
                                  style={{width:'450px',height:'100px',marginLeft:'550px',marginTop:'-250px'}}>
                                    {CONTENT}   
                                </Dialog>
                                
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