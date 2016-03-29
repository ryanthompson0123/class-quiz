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
    
    render() {
        let { scores, possibleAnswers, xs } = this.props;
        
        return (
            <Col xs={xs}>
                <Row>
                    <Col xs={4}>
                        <div 
                            className='mui--text-display2'
                            style={{marginLeft: '40px'}}>
                            Results
                        </div>
                    </Col>
                </Row>
                <Row middle='xs'>
                    <Col xs={4}>
                        <Card style={cardStyle}>
                            <CardMedia>
                                {this.getAveragesTable(scores, possibleAnswers)}
                            </CardMedia>
                        </Card>
                    </Col>
                    <Col xs={4}>
                        <Card style={cardStyle}>
                            <CardMedia>
                                <img src='/images/bar.png' />
                            </CardMedia>
                        </Card>
                    </Col>
                    <Col xs={4}>
                        <Card style={cardStyle}>
                            <CardMedia>
                                {this.getStandingsTable(scores)}
                            </CardMedia>
                        </Card>
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