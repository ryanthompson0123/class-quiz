import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid/lib/index';
import FontIcon from 'material-ui/lib/font-icon';
import ImmutablePropTypes from 'react-immutable-proptypes';
import autobind from 'autobind-decorator';
import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
import CardMedia from 'material-ui/lib/card/card-media';
import { BarChart } from 'react-d3';
import { Map, List, toJS,fromJS } from 'immutable';



const cardStyle = {
    marginTop: '20px',
    marginBottom: '20px',
    marginLeft: '20px',
    marginRight: '20px'
};

const iconStyle = {
    marginLeft: '10px',
    marginRight: 'auto',
    fontSize: '40px',
    float: 'right'
};



class StatsContent extends Component {
    @autobind
    createBarChart(possibleAnswers){

        var barChartData = [{
        label:"Question Stats",
        values:[]
        }];

        const {players} = this.props;

        possibleAnswers.map((answer,index)=>{
            const {text} = answer;
            const entry = {x:text,y:0};
            barChartData[0].values.push(entry);   
        });


        players.map((player,index)=>{
       
            const {selectedAnswer} = player;
            
            if(selectedAnswer){
                const {id} = selectedAnswer;
                barChartData[0].values[id].y +=1;
            }

        });

        return   <BarChart
                  data={barChartData}
                  width={600}
                  height={300}
                  fill={'#3182bd'}
                  yAxisLabel='How Many Selected'
                  xAxisLabel='List of Answers' />

    }



    render() {
        const { question, xs } = this.props;
        const { number, possibleAnswers } = question;
        const correctAnswer = possibleAnswers.find(answer => answer.get('isCorrect'));
        
        const { text ,id} = correctAnswer;
        
        return (
            <Col xs={xs}>
                <Row>
                    <Col xs={4}>
                        <div 
                            className='mui--text-display2'
                            style={{marginLeft: '40px' }}>
                            Q{number}
                        </div>
                    </Col>
                </Row>
                <Row center='xs' middle='xs'>
                    <Col xs={2}>
                        <FontIcon
                            className='material-icons' 
                            color='#00CC00'
                            style={iconStyle}>
                            done
                        </FontIcon>
                    </Col>
                    <Col xs={8}>
                        <div
                            className='mui--text-display1'
                            style={{marginTop: '20px', marginBottom: '20px', float: 'left'}}>
                            {text}
                        </div>
                    </Col>
                </Row>
                <Row center='xs'>
                    <Col xs={10}>
                        <Card style={cardStyle}>
                            <CardTitle title='Question Statistics' />
                               {this.createBarChart(possibleAnswers)}
                        </Card>
                    </Col>
                </Row>
            </Col>
        );
    }
}

StatsContent.propTypes = {
    xs: PropTypes.number.isRequired,
    question: ImmutablePropTypes.contains({
        number: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        possibleAnswers: ImmutablePropTypes.listOf(
            ImmutablePropTypes.contains({
                id: PropTypes.number.isRequired,
                text: PropTypes.string.isRequired,
                isCorrect: PropTypes.boolean
            })
        ).isRequired
    }).isRequired
};

export default StatsContent;