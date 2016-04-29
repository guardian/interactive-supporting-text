import iframeMessenger from 'guardian/iframe-messenger'
import reqwest from 'reqwest'
import embedHTML from './text/embed.html!text'
import thankYouHTML from './text/thankYou.html!text'
import reasonHTML from './text/reason.html!text'

import reasonsTemplate from './text/reasons.dot.html!text'

import dot from 'olado/doT'

var variants = {
    reasonsToLeave: {
       // TODO: change to prod path in production
        dataSource: 'https://interactive.guim.co.uk/docsdata-test/1zsqQf4mq8fsAkZAXnoSCNpap2hykFDA3Cm3HaI9qe8k.json',
        template: reasonsTemplate
    },
    reasonsToStay: {
        dataSource: 'https://interactive.guim.co.uk/docsdata-test/1zsqQf4mq8fsAkZAXnoSCNpap2hykFDA3Cm3HaI9qe8k.json',
        template: reasonsTemplate
    }
};

window.init = function init(el, config) {
    function q(selectorString) {
        return [].slice.apply(el.querySelectorAll(selectorString));
    }

    iframeMessenger.enableAutoResize();

    // el.innerHTML = embedHTML;

    var variantName = window.location.hash.replace('#', '');
    var variant = variantName && variants[variantName];
    if (variant) {
        reqwest({
            url: variant.dataSource,
            type: 'json',
            crossOrigin: false,
            success: (resp) => {
                let data = resp && resp.sheets && resp.sheets[variantName];
                let metaData = resp && resp.sheets && resp.sheets[variantName+'Meta'];

                if (data && data.length && metaData && metaData.length) {
                    let fn = dot.template(variant.template);
                    el.innerHTML = fn({
                        data: data,
                        metaData: metaData[0]
                    });
                } else {
                    console.log('bad JSON response');
                    console.log(resp);
                }
            }
        });
    } else {
        console.log('Invalid variant '+variantName);
    }

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
};
