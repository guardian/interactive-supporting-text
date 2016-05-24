import carouselTemplate from '../text/carousel.dot.html!text';
import buildCarousel from './helpers/buildCarousel';

export default {
    preprocess(data) {
        const slides = [];
        const { survey_like, survey_dislike } = data;
        const newData = { survey_like, survey_dislike };
        const max = 5;
        let i = 1;
        let headline;
        let answer;

        for (; i <= max; i += 1) {
            headline = data[`headline_${i}`];
            answer = data[`answer_${i}`];
            if (headline && answer) {
                slides.push({ headline, answer });
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
    url: 'https://interactive.guim.co.uk/docsdata/1zsqQf4mq8fsAkZAXnoSCNpap2hykFDA3Cm3HaI9qe8k.json',
};
