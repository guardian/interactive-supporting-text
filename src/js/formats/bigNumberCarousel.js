import carouselTemplate from '../text/carousel.dot.html!text';
import buildCarousel from './helpers/buildCarousel';

export default {
    preprocess(data) {
        const newData = [];
        const bigNumberMatcher = /(\d+|\/|\.)/g;
        const max = 5;
        let i = 1;
        let bigNumber;
        let answer;

        for (; i <= max; i += 1) {
            bigNumber = data[`big_number_${i}`];
            answer = data[`answer_${i}`];
            if (answer && bigNumber) {
                bigNumber = bigNumber.replace(
                    bigNumberMatcher, '<span class="big-number">$1</span>'
                );
                newData.push({ bigNumber, answer });
            }
        }

        return newData;
    },
    postRender(data) {
        const slideCount = data.length;

        buildCarousel(slideCount);
    },
    template: carouselTemplate,
    url: 'https://interactive.guim.co.uk/docsdata/1zsqQf4mq8fsAkZAXnoSCNpap2hykFDA3Cm3HaI9qe8k.json',
};
