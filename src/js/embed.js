import iframeMessenger from 'guardian/iframe-messenger'
import reqwest from 'reqwest'
import embedHTML from './text/embed.html!text'
import thankYouHTML from './text/thankYou.html!text'
import reasonHTML from './text/reason.html!text'

window.init = function init(el, config) {
    iframeMessenger.enableAutoResize();

    el.innerHTML = embedHTML;

    reqwest({
        url: 'https://interactive.guim.co.uk/docsdata/1zsqQf4mq8fsAkZAXnoSCNpap2hykFDA3Cm3HaI9qe8k.json',
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
            } else {
                console.log("bad JSON response");
                console.log(resp);
            }
        }
    });

    el.querySelector('.js-like').addEventListener('click', ev => {
        let feedback = ev.currentTarget.parentNode;
        feedback.innerHTML = thankYouHTML;
    });
};
