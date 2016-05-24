import iframeMessenger from 'guardian/iframe-messenger';
import reqwest from 'reqwest';
import dot from 'olado/doT';
import formats from './formats/index';
import render from './render';

if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function remove() {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}

let visible;

function setupVisibilityMonitoring() {
    iframeMessenger.monitorPosition(data => {
        function isVisible(threshold = 1) {
            const width = data.iframeRight - data.iframeLeft;
            const height = data.iframeBottom - data.iframeTop;

            return (
                data.iframeLeft >= -(width * (1 - threshold)) &&
                data.iframeTop >= -(height * (1 - threshold)) &&
                data.iframeRight <= data.innerWidth + (width * (1 - threshold)) &&
                data.iframeBottom <= data.innerHeight + (height * (1 - threshold))
            );
        }

        function hasVisibilityChanged() {
            const wasVisible = visible;

            visible = isVisible(0.5);

            return (wasVisible !== visible);
        }

        if (hasVisibilityChanged()) {
            if (visible) {
                // TODO: track visibility change
            } else {
                // TODO: track visibility change
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

window.init = function init(parentEl) {
    const params = getQueryParams();
    const { sheet, id, format = 'flat' } = params;
    const { template, postRender, preprocess, url } = formats[format];

    iframeMessenger.enableAutoResize();
    setupVisibilityMonitoring();
    reqwest({
        url,
        type: 'json',
        crossOrigin: false,
        success: (res) => {
            const templateFn = dot.template(template);
            const rows = res && res.sheets && res.sheets[sheet];
            const trackingCode = `brexit__${sheet}__${id}`;
            let row;

            if (!rows || !rows.length) {
                throw new Error(`bad JSON response: ${JSON.stringify(res)}`);
            }
            rows.forEach((r) => {
                if (r.id === id) {
                    row = r;
                }
            });
            if (!row) {
                throw new Error(`row with id ${id} not found`);
            }
            if (!template) {
                throw new Error(`format ${format} is not valid`);
            }
            const rowData = preprocess(row);
            const templateData = {
                data: rowData,
                trackingCode: {
                    like: `${trackingCode}__like`,
                    dislike: `${trackingCode}__dislike`,
                },
            };
            render(templateFn, templateData, parentEl);
            postRender(rowData);
        },
    });
};
