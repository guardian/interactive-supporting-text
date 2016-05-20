import bigNumberCarouselTemplate from '../text/bigNumberCarousel.dot.html!text';
import q from '../lib/query';

export default {
    preprocess(data) {
        const newData = [];
        const bigNumberMatcher = /(\d+|\/|\.)/g;
        let i = 1;
        let max = 5;
        let bigNumber;
        let answer;

        for (; i <= max; i += 1) {
            bigNumber = data['big_number_' + i];
            answer = data['answer_' + i];
            if (
                (typeof bigNumber !== 'undefined') &&
                (typeof answer !== 'undefined') &&
                (bigNumber !== '') &&
                (answer !== '')
            ) {
                bigNumber = bigNumber.replace(bigNumberMatcher, '<span class="big-number">$1</span>');
                newData.push({bigNumber, answer});
            }
        }

        return newData;
    },
    postRender(data) {
        const slideCount = data.length;
        let currentSlide = 0;

        function clearCurrent() {
            q('.js-current').forEach(function (el) {
                el.classList.remove('js-current');
                el.classList.remove('brexit__carousel-slide--current');
            });
            q('.js-active').forEach(function (el) {
                el.classList.remove('brexit__carousel-indicator--active');
                el.classList.remove('js-active');
                el.classList.add('brexit__carousel-indicator--passive');
            });
        }

        function setCurrent() {
            q('#carousel-slide-' + currentSlide).forEach(function (el) {
                el.classList.add('js-current');
                el.classList.add('brexit__carousel-slide--current');
            });
            q('#carousel-indicator-' + currentSlide).forEach(function (el) {
                el.children[0].classList.add('brexit__carousel-indicator--active');
                el.children[0].classList.add('js-active');
                el.children[0].classList.remove('brexit__carousel-indicator--passive');
            });
        }

        function isFirstSlide() {
            return (currentSlide <= 0);
        }

        function isLastSlide() {
            return (currentSlide >= slideCount - 1);
        }

        function setControlsVisibility() {
            q('.js-prev').forEach(function (el) {
                if (isFirstSlide()) {
                    el.classList.add('u-hidden');
                } else {
                    el.classList.remove('u-hidden');
                }
            });
            q('.js-next').forEach(function (el) {
                if (isLastSlide()) {
                    el.classList.add('u-hidden');
                } else {
                    el.classList.remove('u-hidden');
                }
            });
        }

        function updateSlides() {
            clearCurrent();
            setCurrent();
            setControlsVisibility();
        }

        function showPreviousSlide() {
            currentSlide -= 1;
            updateSlides();
        }

        function showNextSlide() {
            currentSlide += 1;
            updateSlides();
        }

        setControlsVisibility();

        q('.js-prev').forEach(function (el) {
            el.addEventListener('click', function () {
                if (isFirstSlide()) {
                    return;
                }
                showPreviousSlide();
            });
        });

        q('.js-next').forEach(function (el) {
            el.addEventListener('click', function () {
                if (isLastSlide()) {
                    return;
                }
                showNextSlide();
            });
        });

        q('.js-indicator').forEach(function (el) {
            el.addEventListener('click', function () {
                const elementId =  el.id || el.parentNode.id;
                const newSlideIndex = elementId.split(/carousel-indicator-/)[1];

                currentSlide = parseInt(newSlideIndex, 10);
                updateSlides();
            });
        });
    },
    template: bigNumberCarouselTemplate
};
