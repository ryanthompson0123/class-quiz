
import { Map, List } from 'immutable';

export function addQuestion(state) {
    const { editingQuizIndex } = state;
    
    const newQuestion = Map({
        text: '',
        possibleAnswers: List()
        
    });
    
    const newIndex = state.getIn([
        'quizzes',
        editingQuizIndex,
        'questions']).count();
    
    return state
        .set('editingQuestionIndex', newIndex)
        .updateIn([
            'quizzes',
            editingQuizIndex,
            'questions'
        ], questions => {
            return questions.push(newQuestion);
        });
}
export function deleteQuestion(state, index) {
    const { editingQuizIndex } = state;
    
    return state
        .deleteIn([
            'quizzes', 
            editingQuizIndex, 
            'questions', 
            index
        ]);
}

export function setQuestionText(state, text) {
    const { editingQuizIndex, editingQuestionIndex } = state;
    
    return state
        .updateIn([
            'quizzes', 
            editingQuizIndex, 
            'questions', 
            editingQuestionIndex
        ], question => {
            return question
                .set('text', text);
        });
}

export function setAnswer(state, index, text, isCorrect) {
    const { editingQuizIndex, editingQuestionIndex } = state;
    
    return state
        .updateIn([
            'quizzes', 
            editingQuizIndex, 
            'questions', 
            editingQuestionIndex, 
            'possibleAnswers',
            index
        ], answer => {
            return answer
                .set('text', text)
                .set('isCorrect', isCorrect);
        });
}

export function deleteAnswer(state, index) {
    const { editingQuizIndex, editingQuestionIndex } = state;
    
    return state
        .deleteIn([
            'quizzes', 
            editingQuizIndex, 
            'questions', 
            editingQuestionIndex, 
            'possibleAnswers',
            index
        ]);
}

export function addAnswer(state, text) {
    const { editingQuizIndex, editingQuestionIndex } = state;
    
    return state
        .updateIn([
            'quizzes', 
            editingQuizIndex, 
            'questions', 
            editingQuestionIndex, 
            'possibleAnswers'
        ], answers => {
            return answers.push(Map({
                text: text,
                isCorrect: false
            }));
        });
}

export function setQuizName(state, newName) {
    const { editingQuizIndex } = state;
    
    return state
        .setIn([
            'quizzes',
            editingQuizIndex,
            'title'
        ], newName);
}