import catchMeUpTemplate from '../text/catchMeUp.dot.html!text';

export default {
    preprocess({ headline1: header, content1: content, headline2: url, survey_like, survey_dislike }) {
        return {
            header,
            content,
            survey_like,
            survey_dislike,
            url: url || 'http://theguardian.com/uk',
        };
    },
    postRender() {
    },
    template: catchMeUpTemplate,
};
