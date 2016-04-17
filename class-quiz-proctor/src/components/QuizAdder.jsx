import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Grid, Row, Col } from 'react-flexbox-grid/lib/index';
import autobind from 'autobind-decorator';
import TextField from 'material-ui/lib/text-field';
import IconButton from 'material-ui/lib/icon-button';
import ContentAddBox from 'material-ui/lib/svg-icons/content/add-box';
import AvAddToQueue from 'material-ui/lib/svg-icons/av/add-to-queue';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';

let CONTENT = null;

class QuizAdder extends Component{

	constructor(props) {
    super(props);
    this.state = {
      alert: false,
    	};
  	}

  
  handleOpen =() =>{
    this.setState({alert: true});
  };


  handleClose = () => {
    this.setState({alert: false});
  };



	@autobind
	addQuiz(){
		const {quizzes} =this.props;
		const index = quizzes.count();
		const name = document.getElementById("quiz_title").value;

		if(name){
			{this.props.addQuiz(name)}
			{this.props.editQuiz(index)}
		}else{
			CONTENT = "Quiz Name Cannot Be Blank";
			this.handleOpen();
		}
		
	}

	render(){
		const action = <FlatButton label="Ok" secondary={true}  keyboardFocused={true} onClick={this.handleClose}/>;

		return(<Grid style={{width: '100%' }}>
					<Row center='xs'>
						<Col xs={10}>
								<div className='mui--text-headline' style={{marginTop:'20px'}}>
								Add a new quiz!
								</div>
						</Col>
					</Row>
					<Row center='xs'>
							<Col xs={10}>
								<Row middle='xs'>
									<Col xs={8}>
										<TextField id="quiz_title" 
										floatingLabelText="Enter a short meaningful title here" 
										style={{width:'60%',marginLeft:'320px'}} />
									</Col>
									<Col>
									  	<IconButton tooltip='Add' onClick={this.addQuiz} style={{marginTop:'30px',marginLeft:'50px'}}>
											<AvAddToQueue hoverColor="Cyan"/>
											<Dialog
									          title="Warning!!"
									          actions={action}
									          open={this.state.alert}
									          onRequestClose={this.handleClose}
									          style={{width:'450px',height:'100px',marginLeft:'450px'}}>
									        	{CONTENT}
									        </Dialog>
										</IconButton>
									</Col>
								</Row>
							</Col>
					</Row>
					<div>
        
        
      </div>
				</Grid>
				);
	}
}



export default QuizAdder;