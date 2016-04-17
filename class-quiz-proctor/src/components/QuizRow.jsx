import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid/lib/index';
import RaisedButton from 'material-ui/lib/raised-button';
import FontIcon from 'material-ui/lib/font-icon';
import IconButton from 'material-ui/lib/icon-button';
import ImmutablePropTypes from 'react-immutable-proptypes';
import autobind from 'autobind-decorator';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

class QuizRow extends Component {

    constructor(props) {
            super(props);
                this.state = {
                    alert:false,
                    confirm: false,
                    };
    }


  handleOpen =() =>{
    this.setState({confirm: true});
  };


  handleCancel = () => {
    this.setState({confirm: false});
    this.handleDeleteClicked(false);
  };

  handleProceed =() =>{
    this.setState({confirm: false});
    this.handleDeleteClicked(true);
  }


  openAlert=()=>{
    this.setState({alert:true});
  }

  closeAlert=()=>{
    this.setState({alert:false});
  }


    @autobind
    handleStartClicked() {
        const {quiz} = this.props;
        const {questions} = quiz;
        const numberOfQuestions = questions.count();
     
        if(numberOfQuestions>0){
            this.props.onStart(this.props.quiz);
        }else{
            this.openAlert();
        }
    }
    
    @autobind
    handleEditClicked() {
        const { editQuiz, index } = this.props;
        editQuiz(index);
    }
    
    @autobind
    handleDeleteClicked(input) {
        const { deleteQuiz, index } = this.props;
        
        if(input){
            deleteQuiz(index);
        }
        
    }
    
    render() {
        let { quiz } = this.props;
        let { title } = quiz;

        const actions = [
                      <FlatButton
                        label="Cancel"
                        secondary={true}
                        onClick={this.handleCancel}/>,
                      <FlatButton
                        label="Delete"
                        secondary={true}
                        keyboardFocused={true}
                        onClick={this.handleProceed}/>,
                    ];

        const action = <FlatButton label="Ok" secondary={true}  keyboardFocused={true} onClick={this.closeAlert}/>;
                    
        return (
            <Row middle='xs'>
                <Col xs={2} />
                <Col xs={8}>
                    <RaisedButton
                        label={title}
                        secondary={true}
                        onMouseUp={this.handleStartClicked}
                        style={{width: '100%'}} />
                        <Dialog
                          title="Warning!!"
                          actions={action}
                          open={this.state.alert}
                          onRequestClose={this.closeAlert}
                          style={{width:'450px',height:'100px',marginLeft:'450px',marginTop:'-50px'}}>
                            This Quiz is empty
                        </Dialog>
                </Col>
                <Col xs={2} >
                    <IconButton tooltip='Edit'>
                        <FontIcon
                            className='material-icons'
                            onClick={this.handleEditClicked}
                            style={{marginLeft: '0'}} hoverColor="Cyan">
                            create
                        </FontIcon>
                    </IconButton>
                    <IconButton tooltip='Delete'>
                        <FontIcon
                            className='material-icons'
                            onClick={this.handleOpen}
                            style={{marginLeft: '0'}} hoverColor="Cyan">
                            delete
                        </FontIcon>
                                <Dialog
                                      title="Confirmation!!"
                                      actions={actions}
                                      modal={false}
                                      open={this.state.confirm}
                                      onRequestClose={this.handleCancel}
                                      style={{width:'450px',height:'100px',marginLeft:'550px',marginTop:'-50px'}}>
                                     Are you sure you want to delete this quiz ?
                                    </Dialog>
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