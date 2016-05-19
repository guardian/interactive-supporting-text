import questionAndAnswer from './text/questionAndAnswer.dot.html!text';
import expandableQuestionAndAnswer from './text/expandableQuestionAndAnswer.dot.html!text';
// import reasonsTemplate from './text/reasons.dot.html!text'

export default {
    flat: {
        preprocess: (data) => data,
        template: questionAndAnswer
    },
    expandable: {
        preprocess: (data) => {
            // TODO: don't modify data in place!
            const words = data.Answer.split(' ');

            data.mainAnswer = words.slice(0, 65).join(' ');
            data.extraAnswer = words.slice(65).join(' ');

            return data;
        },
        template: expandableQuestionAndAnswer
    },
    carousel: {
        preprocess: (data) => data,
        template: ''
    }
};
