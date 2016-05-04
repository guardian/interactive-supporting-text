import iframeMessenger from 'guardian/iframe-messenger'
import reqwest from 'reqwest'
import thankYouHTML from './text/thankYou.html!text'

// import reasonsTemplate from './text/reasons.dot.html!text'
import questionAndAnswer from './text/questionAndAnswer.dot.html!text'

import dot from 'olado/doT'

function q(selectorString) {
    return [].slice.apply(document.querySelectorAll(selectorString));
}

function bindEventHandlers() {
    q('.js-feedback').forEach(el => el.addEventListener('click', ev => {
        let el = ev.currentTarget;
        let feedback = el.parentNode;
        feedback.innerHTML = thankYouHTML.replace(/%surveyHref%/g, el.getAttribute('data-survey-href'));
    }));
}

window.init = function init(el, config) {
    iframeMessenger.enableAutoResize();

    var query = window.location.search.replace('?', '').split('&');
    var params = {};
    query.forEach(q => {
        let keyVal = q.split('=');
        params[keyVal[0]] = keyVal[1];
    });

    var sheet = params.sheet;
    var id = params.id;
    reqwest({
        url: 'https://interactive.guim.co.uk/docsdata/1zsqQf4mq8fsAkZAXnoSCNpap2hykFDA3Cm3HaI9qe8k.json',
        type: 'json',
        crossOrigin: false,
        success: (resp) => {
            var rows = resp && resp.sheets && resp.sheets[sheet];
            var row;

            if (rows && rows.length) {
                for (var i = 0; i < rows.length; i++) {
                    if (rows[i].id === id) {
                        row = rows[i];
                    }
                }

                if (!row) {
                    console.log('row with id ' + id + ' not found');
                    return;
                }

                let fn = dot.template(questionAndAnswer);
                let trackingCode = 'brexit__' + sheet + '__' + row.id;
                el.innerHTML = fn({
                    data: row,
                    trackingCode: {
                        like: trackingCode + '__like',
                        dislike: trackingCode + '__dislike'
                    }
                });

                bindEventHandlers();
            } else {
                console.log('bad JSON response');
                console.log(resp);
            }
        }
    });
};

