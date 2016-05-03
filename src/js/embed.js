import iframeMessenger from 'guardian/iframe-messenger'
import reqwest from 'reqwest'
import embedHTML from './text/embed.html!text'
import thankYouHTML from './text/thankYou.html!text'
import reasonHTML from './text/reason.html!text'

// import reasonsTemplate from './text/reasons.dot.html!text'
import questionAndAnswer from './text/questionAndAnswer.dot.html!text'

import dot from 'olado/doT'

var variants = {
    // reasonsToLeave: {
    //    // TODO: change to prod path in production
    //     dataSource: 'https://interactive.guim.co.uk/docsdata-test/1zsqQf4mq8fsAkZAXnoSCNpap2hykFDA3Cm3HaI9qe8k.json',
    //     template: reasonsTemplate
    // },
    // reasonsToStay: {
    //     dataSource: 'https://interactive.guim.co.uk/docsdata-test/1zsqQf4mq8fsAkZAXnoSCNpap2hykFDA3Cm3HaI9qe8k.json',
    //     template: reasonsTemplate
    // },
    questionAndAnswer: {
        dataSource: 'https://interactive.guim.co.uk/docsdata-test/1zsqQf4mq8fsAkZAXnoSCNpap2hykFDA3Cm3HaI9qe8k.json',
        template: questionAndAnswer
    }
};


function q(selectorString) {
    return [].slice.apply(document.querySelectorAll(selectorString));
}

function bindEventHandlers() {
    q('.js-feedback').forEach(el => el.addEventListener('click', ev => {
        let el = ev.currentTarget;
        let feedback = el.parentNode;
        feedback.innerHTML = thankYouHTML.replace(/%surveyHref%/g, el.getAttribute('data-survey-href'));
    }));

    q('[data-track]').forEach(el => el.addEventListener('click', ev => {
        let trackingCode = ev.currentTarget.getAttribute('data-track');
        console.log('tracking event ' + trackingCode);
        _satellite.track(trackingCode);
    }))
}

window.init = function init(el, config) {
    iframeMessenger.enableAutoResize();

    // el.innerHTML = embedHTML;

    // var variantName = window.location.search.replace('?', '');
    var query = window.location.search.replace('?', '').split('&');
    var params = {};
    query.forEach(q => {
        let keyVal = q.split('=');
        params[keyVal[0]] = keyVal[1];
    });
    // var variant = (params['variant'] && variants[params['variant']]) || variants['questionAndAnswer'];

    var sheet = params['sheet'];
    var row = parseInt(params['row']) - 2;
    reqwest({
        url: 'https://interactive.guim.co.uk/docsdata-test/1zsqQf4mq8fsAkZAXnoSCNpap2hykFDA3Cm3HaI9qe8k.json',
        type: 'json',
        crossOrigin: false,
        success: (resp) => {
            var data = resp && resp.sheets && resp.sheets[sheet];

            console.log('data');
            console.log(data);
            if (data && data[row]) {
                let fn = dot.template(questionAndAnswer);
                console.log('data row');
                console.log(data[row]);
                el.innerHTML = fn({
                    data: data[row]
                });

                bindEventHandlers();
            } else {
                console.log('bad JSON response');
                console.log(resp);
            }
        }
    });
};

