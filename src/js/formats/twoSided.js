import twoSidedTemplate from '../text/twoSided.dot.html!text';
import q from '../lib/query';
import slider from './helpers/slider';
import markdown from '../lib/markdown';

export default {
    preprocess({
        headline1: question,
        headline2: answer1Title,
        headline3: answer2Title,
        content2,
        content3,
        survey_like,
        survey_dislike,
    }) {
        const answer1Body = markdown.getHtmlContentString(content2);
        const answer2Body = markdown.getHtmlContentString(content3);

        return {
            question,
            answer1Title,
            answer1Body,
            answer2Title,
            answer2Body,
            survey_like,
            survey_dislike,
        };
    },
    postRender() {
        function goToAnswer(answer) {
            q(`.js-back-to-question[data-answer="${answer}"]`).forEach(el => {
                el.classList.remove('u-hidden');
            });
            q('.js-go-to-answer').forEach(el => {
                el.classList.add('u-hidden');
            });
            if (answer === 'one') {
                slider.slideLeft();
            } else {
                slider.slideRight();
            }
        }

        function backToQuestion() {
            slider.reset();
            q('.js-back-to-question').forEach(el => el.classList.add('u-hidden'));
            q('.js-go-to-answer').forEach(el => el.classList.remove('u-hidden'));
        }

        q('.js-go-to-answer').forEach(el => {
            el.addEventListener('click', () => goToAnswer(el.getAttribute('data-answer')));
        });
        q('.js-back-to-question').forEach(el => {
            el.addEventListener('click', () => backToQuestion());
        });
    },
    template: twoSidedTemplate,
};
