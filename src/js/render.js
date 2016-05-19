import thankYouHTML from './text/thankYou.html!text';

function q(selectorString) {
    return [].slice.apply(document.querySelectorAll(selectorString));
}

function bindEventHandlers() {
    q('.js-feedback').forEach(el => el.addEventListener('click', ev => {
        const feedbackButton = ev.currentTarget;
        const feedback = feedbackButton.parentNode;

        feedback.innerHTML = thankYouHTML.replace(/%surveyHref%/g, feedbackButton.getAttribute('data-survey-href'));
    }));
    q('.js-expand').forEach(el => el.addEventListener('click', ev => {
        const readMoreLink = ev.currentTarget;

        q('.js-extra-content').forEach(extraContentElement => extraContentElement.classList.remove('u-hidden'));
        readMoreLink.remove();
    }));
}

export default function render(templateFn, data, parentEl) {
    parentEl.innerHTML = templateFn(data);
    bindEventHandlers();
}
