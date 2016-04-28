import iframeMessenger from 'guardian/iframe-messenger'
import reqwest from 'reqwest'
import embedHTML from './text/embed.html!text'
import thankYouHTML from './text/thankYou.html!text'
import reasonHTML from './text/reason.html!text'

window.init = function init(el, config) {
    function q(selectorString) {
        return [].slice.apply(el.querySelectorAll(selectorString));
    }

    iframeMessenger.enableAutoResize();

    el.innerHTML = embedHTML;

    reqwest({
        // TODO: change to prod path in production
        url: 'https://interactive.guim.co.uk/docsdata-test/1zsqQf4mq8fsAkZAXnoSCNpap2hykFDA3Cm3HaI9qe8k.json',
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

                ['title', 'articleLinkText', 'feedbackQuestion'].forEach(field => {
                    let text = reasonsToLeave[0][field];
                    if (text) {
                        q('[data-source-'+field+']').forEach(el => el.innerHTML = text);
                    }
                })
            } else {
                console.log('bad JSON response');
                console.log(resp);
            }
        }
    });

    q('.js-feedback').forEach(el => el.addEventListener('click', ev => {
        let el = ev.currentTarget;
        let feedback = el.parentNode;
        feedback.innerHTML = thankYouHTML.replace(/%surveyHref%/, el.getAttribute('data-survey-href'));
    }));

    q('[data-track]').forEach(el => el.addEventListener('click', ev => {
        let trackingCode = ev.currentTarget.getAttribute('data-track');
        console.log('tracking event ' + trackingCode);
        _satellite.track(trackingCode);
    }))
};
