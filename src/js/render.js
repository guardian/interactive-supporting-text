import thankYouHTML from './text/thankYou.html!text';
import q from './lib/query';

function bindEventHandlers() {
    q('.js-feedback').forEach(el => el.addEventListener('click', ev => {
        const feedbackButton = ev.currentTarget;
        const feedback = feedbackButton.parentNode;

        feedback.innerHTML = thankYouHTML.replace(/%surveyHref%/g, feedbackButton.getAttribute('data-survey-href'));
    }));
}

export default function render(templateFn, data, parentEl) {
    parentEl.innerHTML = templateFn(data);
    bindEventHandlers();
}
