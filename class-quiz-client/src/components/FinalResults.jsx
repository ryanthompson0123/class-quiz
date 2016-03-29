import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid/lib/index';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import ImmutablePropTypes from 'react-immutable-proptypes';

class FinalResults extends Component {
    getResultsTable(results) {
        const { rank, players, score, correctAnswers, possibleAnswers, avgResponse } = results;
                
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
                        <TableRowColumn>Rank</TableRowColumn>
                        <TableRowColumn>{rank} / {players}</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableRowColumn>Score</TableRowColumn>
                        <TableRowColumn>{Math.round(score)}</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableRowColumn>Correct Answers</TableRowColumn>
                        <TableRowColumn>{correctAnswers} / {possibleAnswers}</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableRowColumn>Avg. Response Time</TableRowColumn>
                        <TableRowColumn>{avgResponse.toFixed(2)}s</TableRowColumn>
                    </TableRow>
                </TableBody>
            </Table>
        );
    }
    
    render() {
        let { results } = this.props;

        return (
            <Grid style={{width: '100%'}}>
                <Row>
                    <Col xs={4}>
                        <div
                            className='mui--text-display2'
                            style={{marginLeft: '40px', marginTop: '100px'}}>
                            Results
                        </div>
                    </Col>
                </Row>
                <Row center='xs'>
                    <Col xs={10}>
                        {this.getResultsTable(results)}
                    </Col>
                </Row>
            </Grid>
        );
    }
}

FinalResults.propTypes = {
    results: ImmutablePropTypes.contains({
        rank: PropTypes.number.isRequired,
        players: PropTypes.number.isRequired,
        score: PropTypes.number.isRequired,
        correctAnswers: PropTypes.number.isRequired,
        possibleAnswers: PropTypes.number.isRequired,
        avgResponse: PropTypes.number.isRequired
    })
};

export default FinalResults;
