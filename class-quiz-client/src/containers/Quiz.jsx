import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import ImmutablePropTypes from 'react-immutable-proptypes';
import QuizQuestion from '../components/QuizQuestion.jsx';
import QuestionStats from '../components/QuestionStats.jsx';
import FinalResults from '../components/FinalResults.jsx';
import NameEntry from '../components/NameEntry.jsx';

class Quiz extends Component {
    render() {
        const { playerName, question, correctAnswer, stats, results } = this.props;
        
        if (!playerName) {
            return <NameEntry {...this.props} />;
        }
        
        if (stats && correctAnswer && question) {
            const { text } = correctAnswer;
            const { number } = question;
            
            return (<QuestionStats 
                questionNumber={number}
                correctAnswerText={text}
                stats={stats} />
            );
        }
        
        if (results) {
            return <FinalResults results={results} />;
        }
        
        if (question) {
            return <QuizQuestion {...this.props} />;
        }
        
        return <h2>Waiting for quiz to start...</h2>;
    }
}

Quiz.propTypes = {
    playerName: PropTypes.string,
    question: ImmutablePropTypes.contains({
        number: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        possibleAnswers: ImmutablePropTypes.listOf(
            ImmutablePropTypes.contains({
                id: PropTypes.number.isRequired,
                text: PropTypes.string.isRequired
            })
        ).isRequired
    }),
    selectedAnswer: ImmutablePropTypes.contains({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired
    }),
    correctAnswer: ImmutablePropTypes.contains({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired
    }),
    timeRemaining: PropTypes.number,
    stats: ImmutablePropTypes.contains({
        pointsEarned: PropTypes.number.isRequired,
        responseTime: PropTypes.string.isRequired,
        totalScore: PropTypes.number.isRequired,
        rank: PropTypes.number.isRequired,
        players: PropTypes.number.isRequired
    }),
    results: ImmutablePropTypes.contains({
        rank: PropTypes.number.isRequired,
        players: PropTypes.number.isRequired,
        score: PropTypes.number.isRequired,
        correctAnswers: PropTypes.number.isRequired,
        possibleAnswers: PropTypes.number.isRequired,
        avgResponse: PropTypes.number.isRequired
    }),
    respond: PropTypes.func.isRequired,
    join: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        playerName: state.get('playerName'),
        question: state.get('question'),
        selectedAnswer: state.get('selectedAnswer'),
        results: state.get('results'),
        correctAnswer: state.get('correctAnswer'),
        stats: state.get('stats'),
        finalResults: state.get('finalResults'),
        timeRemaining: state.get('timeRemaining')
    };
}

export default connect(
    mapStateToProps,
    actionCreators
)(Quiz);
