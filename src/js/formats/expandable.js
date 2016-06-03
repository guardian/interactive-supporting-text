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
        q('.js-expand').forEach(el => el.addEventListener('click', () => {
            q('.js-short-content').forEach(shortContentElement => {
                shortContentElement.classList.add('u-hidden');
            });
            q('.js-all-content').forEach(allContentElement => {
                allContentElement.classList.remove('u-hidden');
            });
        }));
        q('.js-collapse').forEach(el => el.addEventListener('click', () => {
            q('.js-all-content').forEach(allContentElement => {
                allContentElement.classList.add('u-hidden');
            });
            q('.js-short-content').forEach(shortContentElement => {
                shortContentElement.classList.remove('u-hidden');
            });
        }));
    },
    template: expandableTemplate,
};
