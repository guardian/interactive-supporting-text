import carouselTemplate from '../text/carousel.dot.html!text';
import buildCarousel from './helpers/buildCarousel';
import { maxCarouselSize } from '../../config/application.json!json';

export default {
    preprocess(data) {
        const slides = [];
        const { survey_like, survey_dislike } = data;
        const newData = { survey_like, survey_dislike };
        let i = 1;
        let header;
        let content;

        for (; i <= maxCarouselSize; i += 1) {
            header = data[`headline${i}`];
            content = data[`content${i}`];
            if (typeof header !== 'undefined' && typeof content !== 'undefined') {
                slides.push({ header, content });
            }
        }
        newData.slides = slides;

        return newData;
    },
    postRender(data) {
        const slideCount = data.slides.length;

        buildCarousel(slideCount);
    },
    template: carouselTemplate,
};
