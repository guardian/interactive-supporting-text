import twoSidedTemplate from '../text/twoSided.dot.html!text';
import q from '../lib/query';

export default {
    preprocess(data) {
        return data;
    },
    postRender(data) {
        function goToAnswer(answer) {
            const leftOrRight = answer === 'one' ? 'left' : 'right';
            q(`.js-back-from-answer-${answer}`).forEach(el => el.classList.remove('u-hidden'));
            q('.js-slider-container').forEach(el => el.classList.add(`brexit__slider-container--${leftOrRight}`));
            q('.js-go-to-answer').forEach(el => el.classList.add('u-hidden'));
        }

        function backToQuestion() {
            const sliderContainers = q('.js-slider-container');
            sliderContainers.forEach(el => {
                el.classList.remove('brexit__slider-container--right');
                el.classList.remove('brexit__slider-container--left');
            });

            // Hide back to question
            q('.js-back-to-question').forEach(el => el.classList.add('u-hidden'));

            // Show go to answer
            q('.js-go-to-answer').forEach(el => el.classList.remove('u-hidden'));
        }

        q('.js-go-to-answer-one').forEach(el => {
            el.addEventListener('click', ev => goToAnswer('one'));
        });

        q('.js-go-to-answer-two').forEach(el => {
            el.addEventListener('click', ev => goToAnswer('two'));
        });

        q('.js-back-to-question').forEach(el => {
            el.addEventListener('click', ev => backToQuestion());
        });
    },
    template: twoSidedTemplate,

    // correct twoSided URL
    url: 'http://interactive.guim.co.uk/docsdata/1SYM89nttwfXXMHJu-ACBbZxo03Vh5zGGDp7kpc8JX2Q.json',

};
