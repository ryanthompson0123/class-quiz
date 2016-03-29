import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid/lib/index';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import ImmutablePropTypes from 'react-immutable-proptypes';
import FontIcon from 'material-ui/lib/font-icon';

class QuestionStats extends Component {
    
    getStatsTable(stats) {
        const { pointsEarned, totalScore, responseTime, rank, players } = stats;
                
        return (
            <Table>
                <TableHeader displaySelectAll={false}>
                    <TableRow>
                        <TableHeaderColumn />
                        <TableHeaderColumn />
                    </TableRow>
                </TableHeader>
                <TableBody stripedRows displayRowCheckbox={false}>
                    <TableRow>
                        <TableRowColumn>Points Earned</TableRowColumn>
                        <TableRowColumn>{Math.round(pointsEarned)}</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableRowColumn>Response Time</TableRowColumn>
                        <TableRowColumn>{responseTime}</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableRowColumn>Total Score</TableRowColumn>
                        <TableRowColumn>{Math.round(totalScore)}</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableRowColumn>Rank</TableRowColumn>
                        <TableRowColumn>{rank} / {players}</TableRowColumn>
                    </TableRow>
                </TableBody>
            </Table>
        );
    }
    
    render() {
        let { questionNumber, correctAnswerText, stats } = this.props;

        return (
            <Grid style={{width: '100%'}}>
                <Row>
                    <Col xs={4}>
                        <div
                            className='mui--text-display2'
                            style={{marginLeft: '40px', marginTop: '100px'}}>
                            Q{questionNumber}
                        </div>
                    </Col>
                </Row>
                <Row center='xs'>
                    <Col xs={10}>
                        <Row>
                            <Col xs={2}>
                                <FontIcon
                                    className='material-icons' 
                                    color='#00CC00'
                                    style={{float: 'right'}}>
                                    done
                                </FontIcon>
                            </Col>
                            <Col xs={10}>
                                <div
                                    className='mui--text-headline'
                                    style={{float: 'left'}}>
                                    {correctAnswerText}
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row center='xs'>
                    <Col xs={10}>
                        {this.getStatsTable(stats)}
                    </Col>
                </Row>
            </Grid>
        );
    }
}

QuestionStats.propTypes = {
    questionNumber: PropTypes.number.isRequired,
    correctAnswerText: PropTypes.string.isRequired,
    stats: ImmutablePropTypes.contains({
        pointsEarned: PropTypes.number.isRequired,
        responseTime: PropTypes.string.isRequired,
        totalScore: PropTypes.number.isRequired,
        rank: PropTypes.number.isRequired,
        players: PropTypes.number.isRequired
    })
};

export default QuestionStats;
