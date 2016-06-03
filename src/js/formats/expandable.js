import q from '../lib/query';
import expandableTemplate from '../text/expandable.dot.html!text';

export default {
    preprocess({ content1: content, headline1: header, survey_like, survey_dislike }) {
        const words = content.split(' ');
        const shortContentLength = 65;
        const shortContent = words.slice(0, shortContentLength).join(' ');

        return {
            header,
            shortContent,
            survey_like,
            survey_dislike,
            allContent: content,
        };
    },
    postRender() {
        q('.js-expand').forEach(el => el.addEventListener('click', ev => {
            const readMoreLink = ev.currentTarget;

            q('.js-short-content').forEach(extraContentElement => {
                extraContentElement.classList.add('u-hidden');
            });
            q('.js-all-content').forEach(extraContentElement => {
                extraContentElement.classList.remove('u-hidden');
            });
            readMoreLink.remove();
        }));
    },
    template: expandableTemplate,
};
