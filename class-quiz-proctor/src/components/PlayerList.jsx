import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid/lib/index';
import FontIcon from 'material-ui/lib/font-icon';
import ImmutablePropTypes from 'react-immutable-proptypes';
import autobind from 'autobind-decorator';
import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
import { List } from 'immutable';

const cardStyle = {
    marginTop: '20px',
    marginBottom: '20px',
    marginRight: '20px'
};
    
class PlayerList extends Component {
    getWaitingContent(scores) {
        console.log(scores);
        return scores.map(s => {
            const { player } = s;
            return (
                <Card key={s} style={cardStyle}>
                    <CardTitle title={player} />
                </Card>
            );
        });  
    }
    
    getQuestionContent(currentQuestion) {
        const { responses } = currentQuestion;
        
        if (!responses) {
            return List();
        }
        
        console.log('there are ' + responses.count() + ' responses');
        return responses
            .sortBy(response => Number(response.get('responseTime')))
            .map((response, index) => {
                console.log(index);
                const { playerName, responseTime } = response;
                const responseStr = responseTime + 's';
                
                return (
                    <Card key={index} style={cardStyle}>
                        <Grid style={{width: '100%'}}>
                            <Row>
                                <Col xs={1} />
                                <Col xs={7}>
                                    <CardTitle title={playerName} />
                                </Col>
                                <Col xs={4}>
                                    <CardTitle title={responseStr}
                                        style={{float: 'right'}} />
                                </Col>
                            </Row>
                        </Grid>
                    </Card>
                );
            });
    }
    
    getAnswerContent(currentQuestion) {
        const { responses } = currentQuestion;
        
        const iconStyle = {
            marginLeft: '10px',
            marginRight: 'auto'
        };
        
        return responses
            .sortBy(response => response.responseTime)
            .map((response, index) => {
                const { playerName, responseTime, isCorrect } = response;
                const responseStr = responseTime + 's';
                let answerIcon;
                if (isCorrect) {
                    answerIcon = (
                        <FontIcon
                            className='material-icons' 
                            color='#00CC00'
                            style={iconStyle}>
                            done
                        </FontIcon>
                    );
                } else {
                    answerIcon = (
                        <FontIcon
                            className='material-icons' 
                            color='#CC0000'
                            style={iconStyle}>
                            clear
                        </FontIcon>
                    );
                }
                
                return (
                    <Card key={index} style={cardStyle}>
                        <Grid style={{width: '100%'}}>
                            <Row middle='xs'>
                                <Col xs={1}>
                                    {answerIcon}
                                </Col>
                                <Col xs={7}>
                                    <CardTitle title={playerName} />
                                </Col>
                                <Col xs={4}>
                                    <CardTitle title={responseStr} />
                                </Col>
                            </Row>
                        </Grid>
                    </Card>
                );
            });
    }
    
    getStatsContent(scores) {
        return scores
            .sortBy(score => score.get('rank'))
            .map((scoreObj, index) => {
                const { player, score } = scoreObj;
                
                return (
                    <Card key={index} style={cardStyle}>
                        <Grid style={{width: '100%'}}>
                            <Row>
                                <Col xs={1} />
                                <Col xs={7}>
                                    <CardTitle title={player} />
                                </Col>
                                <Col xs={4}>
                                    <CardTitle title={Math.round(score)} />
                                </Col>
                            </Row>
                        </Grid>
                    </Card>
                );
            });
    }
    
    getContent(scores, currentQuestion, currentStep) {
        switch (currentStep) {
            case 'waiting':
                return this.getWaitingContent(scores);
            case 'questionStep':
                return this.getQuestionContent(currentQuestion);
            case 'answersStep':
                return this.getAnswerContent(currentQuestion);
            case 'statsStep':
                return this.getStatsContent(scores);
        }
    }
    
    getSummaryText(currentStep) {
        switch (currentStep) {
            case 'waiting':
                return 'Players';
            case 'questionStep':
            case 'answersStep':
                return 'Responses';
            case 'statsStep':
                return 'Scores';
        }
    }
    
    render() {
        let { quiz } = this.props;
        let { scores, currentQuestion, currentStep } = quiz;
        
        const content = this.getContent(scores, currentQuestion, currentStep);
        
        if (!content) {
            return <div>No current step.</div>;
        }
        
        return (
            <Row>
                <Col xs={12}>
                    <Row center='xs'>
                        <Col xs={12}>
                            <div
                                className='mui--text-title'
                                style={{marginTop: '20px'}}>
                                {this.getSummaryText(currentStep)}
                            </div>
                        </Col>
                    </Row>
                    {content.map((c, index) => {
                        return (
                            <Row key={index}>
                                <Col xs={12}>
                                    {c}
                                </Col>
                            </Row>
                        );
                    })}
                </Col>
            </Row>
        );
    }
}

PlayerList.propTypes = {
    quiz: ImmutablePropTypes.contains({
        scores: ImmutablePropTypes.contains({
        }),
        currentQuestion: ImmutablePropTypes.contains({
        }),
        currentStep: PropTypes.string.isRequired
    })
};

export default PlayerList;