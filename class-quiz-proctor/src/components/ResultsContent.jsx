import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'react-flexbox-grid/lib/index';
import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
import CardMedia from 'material-ui/lib/card/card-media';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import { Map } from 'immutable';
import { BarChart } from 'react-d3';

const cardStyle = {
    marginTop: '20px',
    marginBottom: '20px',
    marginLeft: '20px',
    marginRight: '20px'
};

class ResultsContent extends Component {
   
    getStandingsTable(scores) {
        return (
            <Table selectable={false} multiSelectable={false}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn>Rank</TableHeaderColumn>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn>Score</TableHeaderColumn>
                        <TableHeaderColumn>Avg. R. (s)</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {scores
                        .sortBy(score => score.get('rank'))
                        .take(10).map(scoreObj => {
                            const { rank, player, score, avgResponse} = scoreObj;
                            
                            return (
                                <TableRow key={rank}>
                                    <TableRowColumn>{rank}</TableRowColumn>
                                    <TableRowColumn>{player}</TableRowColumn>
                                    <TableRowColumn>{Math.round(score)}</TableRowColumn>
                                    <TableRowColumn>{avgResponse.toFixed(2)}</TableRowColumn>
                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>
        );
    }
    
    getAverages(scores) {
        const initialState = Map({
            score: 0,
            response: 0,
            correct: 0
        });
       
        const totals = 
            scores
            .reduce((reduction, scoreObj) => {
                const { score, avgResponse, correctAnswers } = scoreObj;
                return reduction
                    .update('score', s => s + score)
                    .update('response', r => r + avgResponse)
                    .update('correct', c => c + correctAnswers);
            }, initialState);
        
        const count = scores.count();
        return totals
            .update('score', s => s / count)
            .update('response', r => r / count)
            .update('correct', c => c / count);
    }
    
    getAveragesTable(scores, possibleAnswers) {
        const { score, response, correct } = this.getAverages(scores);
       
        return (
            <Table selectable={false} multiSelectable={false}>
                <TableBody displayRowCheckbox={false}>
                    <TableRow>
                        <TableRowColumn>Avg. Score</TableRowColumn>
                        <TableRowColumn>{Math.round(score)}</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableRowColumn>Avg. Response</TableRowColumn>
                        <TableRowColumn>{Math.round(response)} s</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableRowColumn>Avg. Correct</TableRowColumn>
                        <TableRowColumn>{Math.round(correct / possibleAnswers * 100)} %</TableRowColumn>
                    </TableRow>
                </TableBody>
            </Table>
       );   
    }



    getOverallStatisticsBarChart(scores){

        const totalScore = 400;

        var barChartData = [{
            label:"Quiz Stats",
            values:[{x:"0-10",y:0},{x:"10-20",y:0},{x:"20-30",y:0},{x:"30-40",y:0},{x:"40-50",y:0},
            {x:"50-60",y:0},{x:"60-70",y:0},{x:"70-80",y:0},{x:"80-90",y:0},{x:"90-100",y:0}]
            }];

        scores.map((scoreObj)=>{
            const {score} = scoreObj;
            const percentage = (score/400) *100;

            switch(true){
            case percentage>=0 && percentage <=10:
                barChartData[0].values[0].y+=1;
                break;
            case percentage>10 && percentage <=20:
                barChartData[0].values[1].y+=1;
                break;
            case percentage>20 && percentage <=30:
                barChartData[0].values[2].y+=1;
                break;
            case percentage>30 && percentage <=40:
                barChartData[0].values[3].y+=1;
                break;
            case percentage>40 && percentage <=50:
                barChartData[0].values[4].y+=1;
                break;
            case percentage>50 && percentage <=60:
                barChartData[0].values[5].y+=1;
                break;
            case percentage>60 && percentage <=70:
                barChartData[0].values[6].y+=1;
                break;
            case percentage>70 && percentage <=80:
                barChartData[0].values[7].y+=1;
                break;
            case percentage>80 && percentage <=90:
                barChartData[0].values[8].y+=1;
                break;
            case percentage>90 && percentage <=100:
                barChartData[0].values[9].y+=1;
                break;
            default:
                break;
            }
            
        })

        return   <BarChart
                  data={barChartData}
                  width={600}
                  height={300}
                  fill={'#3182bd'}
                  yAxisLabel='Number of Users'
                  xAxisLabel='Scores in Percentage'/>;


    }
    
    render() {
        let { scores, possibleAnswers, xs } = this.props;
        
        return (
            <Col xs={xs}>
                <Row center='xs'>
                    <Col xs={4}>
                        <div 
                            className='mui--text-display2'
                            style={{marginLeft: '0px'}}>
                            Results
                        </div>
                    </Col>
                </Row>
                <Row start='xs'>
                    <Col xs={6}>
                        <Card style={cardStyle}>
                           <CardTitle title='Quiz Statistics' />
                              {this.getOverallStatisticsBarChart(scores)}
                        </Card>
                    </Col>
                    <Col xs={6}>
                        <Row>
                            <Col xs={8}>
                                <Card style={cardStyle}>
                                    <CardMedia>
                                        {this.getStandingsTable(scores)}
                                     </CardMedia>
                                </Card>
                            </Col>
                        </Row>
                        <Row >
                            <Col xs={8}>
                                <Card style={cardStyle}>
                                     <CardMedia>
                                        {this.getAveragesTable(scores, possibleAnswers)}
                                    </CardMedia>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        );
    }
}

ResultsContent.propTypes = {
    scores: ImmutablePropTypes.contains(
    ),
    possibleAnswers: PropTypes.number.isRequired,
    xs: PropTypes.number.isRequired
};

export default ResultsContent;