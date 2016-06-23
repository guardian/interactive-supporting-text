import './lib/shims';
import iframeMessenger from 'guardian/iframe-messenger';
import dot from 'olado/doT';
import template from './text/flat.dot.html!text';

window.init = function init(parentEl) {
    const templateFn = dot.template(template);
    const templateData = {
        header: 'Join us as we launch an innovative form of collaborative journalism',
        content: 'Follow a Guardian journalist as they dig into a topic off the beaten news track, track their working out as they go, and contribute ideas, suggestions and feedback. With weekly updates, we hope to keep interested readers updated but not inundated on the issues they care about, and give them the chance to collaborate in our reporting.',
        footer: 'Sign up to the Labour & Liverpool newsletter',
    };

    iframeMessenger.enableAutoResize();
    parentEl.innerHTML = templateFn(templateData); // eslint-disable-line no-param-reassign
};
