import iframeMessenger from 'guardian/iframe-messenger';
import reqwest from 'reqwest';
import dot from 'olado/doT';
import formats from './formats/index';
import render from './render';

if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function () {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}

var isVisible;

function setupVisibilityMonitoring() {
    iframeMessenger.monitorPosition(data => {
        function _isVisible(threshold) {
            const width = data.iframeRight - data.iframeLeft;
            const height = data.iframeBottom - data.iframeTop;

            threshold = threshold || 1;

            return (
                data.iframeLeft >= -(width * (1 - threshold)) &&
                data.iframeTop >= -(height * (1 - threshold)) &&
                data.iframeRight <= data.innerWidth + (width * (1 - threshold)) &&
                data.iframeBottom <= data.innerHeight + (height * (1 - threshold))
            );
        }

        function _hasVisibilityChanged() {
            const wasVisible = isVisible;

            isVisible = _isVisible(0.5);

            return (wasVisible !== isVisible);
        }

        if (_hasVisibilityChanged()) {
            if (isVisible) {
                console.log('%c VISIBLE', 'background: #222; color: #bada55');
            } else {
                console.log('%c NOT VISIBLE', 'background: #222; color: #bada55');
            }
        }
    });
}

function getQueryParams() {
    const query = window.location.search.replace('?', '').split('&');
    const params = {};

    query.forEach(q => {
        const keyVal = q.split('=');
        params[keyVal[0]] = keyVal[1];
    });

    return params;
}

window.init = function init(parentEl, config) {

    iframeMessenger.enableAutoResize();

    setupVisibilityMonitoring();

    reqwest({
        url: 'https://interactive.guim.co.uk/docsdata/1zsqQf4mq8fsAkZAXnoSCNpap2hykFDA3Cm3HaI9qe8k.json',
        type: 'json',
        crossOrigin: false,
        success: (res) => {
            const params = getQueryParams();
            const {sheet, id, format = 'flat'} = params;
            const { template, postRender, preprocess } = formats[format];
            const templateFn = dot.template(template);
            const rows = res && res.sheets && res.sheets[sheet];
            const trackingCode = 'brexit__' + sheet + '__' + id;
            let rowData;
            let templateData;
            let row;

            if (!rows || !rows.length) {
                console.log('bad JSON response');
                console.log(res);

                return;
            }
            rows.forEach((r) => {
                if (r.id === id) {
                    row = r;
                }
            });
            if (!row) {
                console.log('row with id ' + id + ' not found');

                return;
            }
            if (!template) {
                console.log('format ' + format + ' is not valid');

                return;
            }
            rowData = preprocess(row);
            templateData = {
                data: rowData,
                trackingCode: {
                    like: trackingCode + '__like',
                    dislike: trackingCode + '__dislike'
                }
            };
            render(templateFn, templateData, parentEl);
            postRender(rowData);
        }
    });
};

