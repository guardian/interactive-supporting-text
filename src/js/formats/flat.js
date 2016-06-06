import flatTemplate from '../text/flat.dot.html!text';
import markdown from '../lib/markdown';

export default {
    preprocess({ headline1: header, content1, survey_like, survey_dislike }) {
        const content = markdown.getHtmlContentString(content1);

        return {
            header,
            content,
            survey_like,
            survey_dislike,
        };
    },
    postRender() {
    },
    template: flatTemplate,
};
