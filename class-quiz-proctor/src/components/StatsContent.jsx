import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid/lib/index';
import FontIcon from 'material-ui/lib/font-icon';
import ImmutablePropTypes from 'react-immutable-proptypes';
import autobind from 'autobind-decorator';
import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
import CardMedia from 'material-ui/lib/card/card-media';

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
    render() {
        const { question, xs } = this.props;
        const { number, possibleAnswers } = question;
        const correctAnswer = possibleAnswers.find(answer => answer.get('isCorrect'));
        
        const { text } = correctAnswer;
        
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
                <Row middle='xs'>
                    <Col xs={6}>
                        <Card style={cardStyle}>
                            <CardTitle title='Beautiful Chart 1' />
                            <CardMedia>
                                <img src='/images/bar.png' />
                            </CardMedia>
                        </Card>
                    </Col>
                    <Col xs={6}>
                        <Card style={cardStyle}>
                            <CardTitle title='Beautiful Chart 2' />
                            <CardMedia>
                                <img src='/images/pie.png' />
                            </CardMedia>
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