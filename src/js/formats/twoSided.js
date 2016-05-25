import twoSidedTemplate from '../text/twoSided.dot.html!text';
import q from '../lib/query';
import slider from './helpers/slider';

export default {
    preprocess(data) {
        return data;
    },
    postRender(data) {
        function goToAnswer(answer) {
            q(`.js-back-to-question[data-answer="${answer}"]`).forEach(el => el.classList.remove('u-hidden'));
            q('.js-go-to-answer').forEach(el => el.classList.add('u-hidden'));

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
            el.addEventListener('click', ev => goToAnswer(el.getAttribute('data-answer')));
        });

        q('.js-back-to-question').forEach(el => {
            el.addEventListener('click', ev => backToQuestion());
        });
    },
    template: twoSidedTemplate,

    url: 'https://interactive.guim.co.uk/docsdata/1SYM89nttwfXXMHJu-ACBbZxo03Vh5zGGDp7kpc8JX2Q.json',

};
