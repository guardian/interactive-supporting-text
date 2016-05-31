import iframeMessenger from 'guardian/iframe-messenger';
import dot from 'olado/doT';
import parallel from 'async.parallel';
import formats from './formats/index';
import feedback from './text/feedback.dot.partial.html!text';
import render from './render';
import requests from './requests';

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
    const isTailored = !!params.tailored;

    iframeMessenger.enableAutoResize();
    setupVisibilityMonitoring();

    function getRowById(rows, rowId) {
        const row = rows.reduce((prev, currentRow) => {
            if (currentRow.id === rowId) {
                return currentRow;
            }

            return prev;
        }, null);

        if (!row) {
            throw new Error(`row with id ${rowId} not found`);
        }

        return row;
    }

    function buildTemplateData(rowData, trackingCode) {
        return {
            data: rowData,
            trackingCode: {
                like: `${trackingCode}__like`,
                dislike: `${trackingCode}__dislike`,
                more: `${trackingCode}__more`,
                prev: `${trackingCode}__prev`,
                next: `${trackingCode}__next`,
                goToAnswerOne: `${trackingCode}__go_to_answer_one`,
                goToAnswerTwo: `${trackingCode}__go_to_answer_two`,
                back: `${trackingCode}__back`,
            },
        };
    }

    function getRows(response) {
        const rows = response.sheets.content;

        if (!rows || !rows.length) {
            throw new Error(`bad JSON response: ${JSON.stringify(response)}`);
        }

        return rows;
    }

    function getFormat(row) {
        const format = formats[row.format];

        if (!format) {
            throw new Error(`format ${row.format} is not valid`);
        }

        return format;
    }

    function doRender(row, trackingCode) {
        const format = getFormat(row);
        const { template, postRender, preprocess } = format;
        const templateFn = dot.template(template, null, { feedback });
        const rowData = preprocess(row);
        const templateData = buildTemplateData(rowData, trackingCode);

        render(templateFn, templateData, parentEl);
        postRender(rowData);
    }

    function renderTailoredAtom(err, [spreadsheetRes, tailorRes]) {
        if (err) {
            throw err;
        }
        const rows = getRows(spreadsheetRes);
        const level = tailorRes.level || params.default;
        const id = params[level];
        const row = getRowById(rows, id);
        const trackingCode = `brexit__${level}__${id}__tailored`;

        doRender(row, trackingCode);
    }

    function renderUntailoredAtom(err, [spreadsheetRes]) {
        if (err) {
            throw err;
        }
        const rows = getRows(spreadsheetRes);
        const id = params.id;
        const row = getRowById(rows, id);
        const trackingCode = `brexit__${row.level}__${id}__untailored`;

        doRender(row, trackingCode);
    }

    parallel(
        [
            requests.spreadsheetRequest,
            isTailored ? requests.tailorRequest : callback => callback(null, {}),
        ],
        isTailored ? renderTailoredAtom : renderUntailoredAtom
    );
};
