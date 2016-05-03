import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Grid, Row, Col } from 'react-flexbox-grid/lib/index';
import autobind from 'autobind-decorator';
import RaisedButton from 'material-ui/lib/raised-button';
import QuestionList from './QuestionList';
import QuestionEditor from './QuestionEditor';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

let CONTENT = null;

class QuizEditor extends Component {

    constructor(props) {
            super(props);
            this.state = {
              alert: false,
                };
    }

    handleOpen =() => {
    this.setState({alert: true});
    };


    handleClose =() => {
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
    handleDoneClicked() {
        let lastQuestionText,editingQuestionAnswers,numberOfAnswers;
        const { saveQuiz, editingQuizIndex,editingQuestionIndex, selectedQuiz} = this.props;
        const editingQuestion = selectedQuiz.getIn(['questions', editingQuestionIndex]);
        const {title,questions} = selectedQuiz;
        const numberOfQuestions = questions.count();
        
        if(numberOfQuestions>0){
            const lastQuestion = questions.last();
            const {text} = lastQuestion;
            lastQuestionText = text;

            const {possibleAnswers} = editingQuestion;
            editingQuestionAnswers = possibleAnswers;
            numberOfAnswers = possibleAnswers.count();
        }

        if(!title){
            CONTENT = "Quiz Name Cannot Be Blank";
            this.handleOpen();
        }else if(numberOfQuestions>0 && !lastQuestionText){
            CONTENT = "Last Question cannot be blank";
            this.handleOpen();
        }else if(numberOfAnswers<2){
            CONTENT = "Question must have at least two answers";
            this.handleOpen();
        }else if(numberOfQuestions>0 && !this.checkForCorrectAnswerSelection(editingQuestionAnswers)){
            CONTENT = "Please select at least one correct answer";
            this.handleOpen();
        }else if(numberOfQuestions>0 &&this.checkForBlankAnswers(editingQuestionAnswers)){
            CONTENT="Answer cannot be blank";
            this.handleOpen();
        }else{
            saveQuiz(selectedQuiz, editingQuizIndex);
        }
    }
    
    render() {
        console.log(this.props);
        const { selectedQuiz,editingQuestionIndex} = this.props;
        
        const editingQuestion = selectedQuiz.getIn(['questions', editingQuestionIndex]);

        const action = <FlatButton label="Ok" secondary={true}  keyboardFocused={true} onClick ={this.handleClose}/>;

        if(editingQuestion){
            return (
                <Grid style={{
                    width: 'auto',
                    margin: '20px'
                }}>
                    <Row top='xs'>
                        <Col xs={4}>
                            <QuestionList
                                xs={12}
                                editingQuestion={editingQuestion}
                                {...this.props} />
                            <Row start='xs' style={{marginTop:'70px'}}>
                                <Col xs={12}>
                                    <RaisedButton
                                        secondary={true}
                                        label='Click Here To Save The Quiz'
                                        onClick={this.handleDoneClicked}
                                        style={{width:'100%'}} />
                                            <Dialog
                                          title="Warning!!"
                                          actions={action}
                                          open={this.state.alert}
                                          onRequestClose={this.handleClose}
                                          style={{width:'450px',height:'100px',marginLeft:'380px',marginTop:'-250px'}}>
                                            {CONTENT}
                                    </Dialog>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={1} />
                        <QuestionEditor
                            xs={6}
                            question={editingQuestion}
                            index={editingQuestionIndex}
                            {...this.props} />
                    </Row>
                </Grid>
            );
        }else{
            return (
                    <Grid style={{
                        width: 'auto',
                        margin: '20px'
                    }}>
                        <Row top='xs'>
                            <Col xs={4}>
                                <QuestionList
                                    xs={12}
                                    {...this.props} />
                                <Row start='xs' style={{marginTop:'70px'}}>
                                    <Col xs={12}>
                                        <RaisedButton
                                            secondary={true}
                                            label='Click Here To Save The Quiz'
                                            onClick={this.handleDoneClicked}
                                            style={{width:'100%'}} />
                                            <Dialog
                                              title="Warning!!"
                                              actions={action}
                                              open={this.state.alert}
                                              onRequestClose={this.handleClose}
                                              style={{width:'450px',height:'100px',marginLeft:'380px',marginTop:'-250px'}}>
                                                {CONTENT}
                                            </Dialog>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={1} />
                                <div
                                    className='mui--text-headline'
                                    style={{marginLeft:'30px',marginTop: '40px'}}>
                                    No questions have been added yet.
                                </div>
                        </Row>
                    </Grid>
                );
        }
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
