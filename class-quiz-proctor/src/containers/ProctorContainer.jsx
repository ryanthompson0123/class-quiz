import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import ImmutablePropTypes from 'react-immutable-proptypes';
import QuizList from '../components/QuizList';
import Quiz from '../components/Quiz';
import QuizEditor from '../components/QuizEditor';

class ProctorContainer extends Component {
    getContainer() {
        const { quiz, quizzes, editingQuiz, editingQuizIndex } = this.props;
        
        console.log('getting container');
        if (quiz) {
            return <Quiz {...this.props} />;
        }
        
        if (editingQuiz) {
            console.log('editing quiz');
            const selectedQuiz = quizzes.get(editingQuizIndex);
            
            console.log(editingQuiz);
            return (
                <QuizEditor
                    selectedQuiz={selectedQuiz}
                    {...this.props} />
            );
        }
        
        return <QuizList {...this.props} />;
    }

    render() {
        return this.getContainer();
    }
}

ProctorContainer.propTypes = {
    quizzes: ImmutablePropTypes.listOf(
        ImmutablePropTypes.contains({
            title: PropTypes.string.isRequired,
            questions: ImmutablePropTypes.listOf(
                ImmutablePropTypes.contains({
                    text: PropTypes.string.isRequired,
                    possibleAnswers: ImmutablePropTypes.listOf(
                        ImmutablePropTypes.contains({
                            text: PropTypes.string.isRequired,
                            isCorrect: PropTypes.bool
                        })
                    ).isRequired
                })
            ).isRequired
        })
    ),
    quiz: ImmutablePropTypes.contains({
        
    }),
    editingQuiz: PropTypes.bool,
    editingQuizIndex: PropTypes.number,
    editingQuestionIndex: PropTypes.number,
    players: ImmutablePropTypes.contains({
        
    }),
    nextStep: PropTypes.func.isRequired,
    exitQuiz: PropTypes.func.isRequired,
    startQuiz: PropTypes.func.isRequired,
    editQuiz: PropTypes.func.isRequired,
    deleteQuiz: PropTypes.func.isRequired,
    saveQuiz: PropTypes.func.isRequired,
    addQuestion: PropTypes.func.isRequired,
    editQuestion: PropTypes.func.isRequired,
    deleteQuestion: PropTypes.func.isRequired,
    changeQuizName: PropTypes.func.isRequired,
    editAnswer: PropTypes.func.isRequired,
    deleteAnswer: PropTypes.func.isRequired,
    addAnswer: PropTypes.func.isRequired,
    changeQuestionText: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        quizzes: state.get('quizzes'),
        quiz: state.get('runningQuiz'),
        players: state.get('players'),
        editingQuiz: state.get('editingQuiz'),
        editingQuizIndex: state.get('editingQuizIndex'),
        editingQuestionIndex: state.get('editingQuestionIndex')
    };
}

export default connect(
    mapStateToProps,
    actionCreators
)(ProctorContainer);
