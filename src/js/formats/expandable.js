import q from '../lib/query';
import expandableTemplate from '../text/expandable.dot.html!text';

export default {
    preprocess(data) {
        // TODO: don't modify data in place!
        const words = data.Answer.split(' ');

        data.mainAnswer = words.slice(0, 65).join(' ');
        data.extraAnswer = words.slice(65).join(' ');

        return data;
    },
    postRender() {
        q('.js-expand').forEach(el => el.addEventListener('click', ev => {
            const readMoreLink = ev.currentTarget;

            q('.js-extra-content').forEach(extraContentElement => extraContentElement.classList.remove('u-hidden'));
            readMoreLink.remove();
        }));
    },
    template: expandableTemplate
};
