import flatTemplate from '../text/flat.dot.html!text';

export default {
    preprocess({ headline1: header, content1: content, survey_like, survey_dislike }) {
        return { header, content, survey_like, survey_dislike };
    },
    postRender() {},
    template: flatTemplate,
};
