import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import WaitingContent from './WaitingContent';
import QuizQuestion from './QuizQuestion';
import StatsContent from './StatsContent';
import ResultsContent from './ResultsContent';

class QuizContent extends Component {
    
    render() {
        const { quiz,players } = this.props; 
        const { currentStep, currentQuestion, scores, title, askedQuestions } = quiz;
        const questionCount = askedQuestions.count();
        
        console.log(questionCount);
        switch (currentStep) {
            case 'waiting':
                return <WaitingContent title={title} xs={9} />;
            case 'questionStep':
                return <QuizQuestion question={currentQuestion} xs={9} />;
            case 'answersStep':
                return <QuizQuestion showAnswer question={currentQuestion} xs={9} />;
            case 'statsStep':
                return <StatsContent question={currentQuestion} players={players} xs={9} />;
            case 'resultsStep':
                return <ResultsContent scores={scores} xs={12} questionsAsked={questionCount} />;
            default:
                return <div />;
        }
    }
}

QuizContent.propTypes = {
    quiz: ImmutablePropTypes.contains({
        title: PropTypes.string.isRequired,
        scores: ImmutablePropTypes.contains({
        }),
        currentQuestion: ImmutablePropTypes.contains({
        }),
        currentStep: PropTypes.string.isRequired,
        askedQuestions: ImmutablePropTypes.listOf(
            ImmutablePropTypes.contains({
                
            })
        )
    })
};

export default QuizContent;