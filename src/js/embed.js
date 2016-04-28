import iframeMessenger from 'guardian/iframe-messenger'
import reqwest from 'reqwest'
import embedHTML from './text/embed.html!text'
import thankYouHTML from './text/thankYou.html!text'
import reasonHTML from './text/reason.html!text'

window.init = function init(el, config) {
    iframeMessenger.enableAutoResize();

    el.innerHTML = embedHTML;

    reqwest({
        // TODO: change to prod path in production
        url: 'http://interactive.guim.co.uk/docsdata-test/1zsqQf4mq8fsAkZAXnoSCNpap2hykFDA3Cm3HaI9qe8k.json',
        type: 'json',
        crossOrigin: false,
        success: (resp) => {
            let reasonsToLeave = resp && resp.sheets && resp.sheets.reasonsToLeave;
            console.log(reasonsToLeave);
            if (reasonsToLeave && reasonsToLeave.length) {
                let htmlArray = reasonsToLeave.map(reason => {
                    return reasonHTML.replace(/%youSay%/g, reason.youSay).replace(/%theySay%/g, reason.theySay);
                });
                el.querySelector('.reasons').innerHTML = htmlArray.join("\n");

                let title = reasonsToLeave[0].title;
                if (title) {
                    let e = el.querySelector('.brexit__title');
                    e.innerHTML = e.innerHTML.replace(/%title%/g, title);
                }
                let articleLinkText = reasonsToLeave[0].articleLinkText;
                if (articleLinkText) {
                    let e = el.querySelector('.brexit__button');
                    e.innerHTML = e.innerHTML.replace(/%articleLinkText%/g, articleLinkText);
                }
                let feedbackQuestion = reasonsToLeave[0].feedbackQuestion;
                if (feedbackQuestion) {
                    let e = el.querySelector('.brexit__feedback');
                    e.innerHTML = e.innerHTML.replace(/%feedbackQuestion%/g, feedbackQuestion);
                }
            } else {
                console.log('bad JSON response');
                console.log(resp);
            }
        }
    });

    function arr(nodeList) {
        return [].slice.apply(nodeList);
    }

    arr(el.querySelectorAll('.js-feedback')).forEach(el => el.addEventListener('click', ev => {
        let el = ev.currentTarget;
        let feedback = el.parentNode;
        feedback.innerHTML = thankYouHTML.replace(/%surveyHref%/, el.getAttribute('data-survey-href'));
    }));

    arr(el.querySelectorAll('[data-track]')).forEach(el => el.addEventListener('click', ev => {
        let trackingCode = ev.currentTarget.getAttribute('data-track');
        console.log('tracking event ' + trackingCode);
        _satellite.track(trackingCode);
    }))
};
