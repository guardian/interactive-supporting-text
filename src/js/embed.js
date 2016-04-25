import iframeMessenger from 'guardian/iframe-messenger'
import reqwest from 'reqwest'
import embedHTML from './text/embed.html!text'
import thankYouHTML from './text/thankYou.html!text'

window.init = function init(el, config) {
    iframeMessenger.enableAutoResize();

    el.innerHTML = embedHTML;

    // reqwest({
    //     url: 'http://ip.jsontest.com/',
    //     type: 'json',
    //     crossOrigin: true,
    //     success: (resp) => el.querySelector('.test-msg').innerHTML = `Your IP address is ${resp.ip}`
    // });

    el.querySelector('.js-like').addEventListener('click', ev => {
        let feedback = ev.currentTarget.parentNode;
        feedback.innerHTML = thankYouHTML;
    });
};
