import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'react-flexbox-grid/lib/index';
import FontIcon from 'material-ui/lib/font-icon';
import ImmutablePropTypes from 'react-immutable-proptypes';
import autobind from 'autobind-decorator';
import IconButton from 'material-ui/lib/icon-button';
import Checkbox from 'material-ui/lib/checkbox';
import TextField from 'material-ui/lib/text-field';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

let CONTENT = null; 

class AnswerRow extends Component {

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
        if(!event.target.value){
            CONTENT="Answer cannot be blank";
            this.handleOpen();
        }
            editAnswer(index, event.target.value, isCorrect);
    }
    
    render() {
        const { answer, index } = this.props;
        const { text, isCorrect } = answer;

        const action = <FlatButton label="Ok" secondary={true}  keyboardFocused={true} onClick={this.handleClose}/>;


        
        return (
            <Row key={index} middle='xs'>
                <Col xs={1}>
                    <Checkbox
                        defaultChecked={isCorrect}
                        onCheck={this.handleCorrectChecked} />
                </Col>
                <Col xs={9}>
                    <TextField
                        hintText='Enter answer text here'
                        value={text}
                        onChange={this.handleAnswerTextChange}
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