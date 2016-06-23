import thankYouHTML from './text/thankYou.html!text';
import q from './lib/query';

function bindEventHandlers() {
    q('.js-feedback').forEach(el => el.addEventListener('click', ev => {
        const feedbackButton = ev.currentTarget;
        const feedback = feedbackButton.closest('.js-feedback-container');
        const surveyHref = feedbackButton.getAttribute('data-survey-href');

        feedback.innerHTML = thankYouHTML.replace(/%surveyHref%/g, surveyHref);
    }));
}

export default function render(templateFn, data, parentEl) {
    parentEl.innerHTML = templateFn(data); // eslint-disable-line no-param-reassign
    bindEventHandlers();
}
