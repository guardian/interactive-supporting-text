import q from '../../lib/query';
import buildSlider from './slider';

export default function buildCarousel(length) {
    const slider = buildSlider({
        length,
    });

    function updateIndicator(currentSlide) {
        q('.js-active').forEach((el) => {
            el.classList.remove('explainer__carousel-indicator--active');
            el.classList.remove('js-active');
            el.classList.add('explainer__carousel-indicator--passive');
        });

        q(`.js-indicator[data-slide-index="${currentSlide}"]`).forEach((el) => {
            el.children[0].classList.add('explainer__carousel-indicator--active');
            el.children[0].classList.add('js-active');
            el.children[0].classList.remove('explainer__carousel-indicator--passive');
        });
    }

    function setControlsVisibility() {
        q('.js-prev').forEach((el) => {
            if (slider.isFirstSlide()) {
                el.classList.add('u-hidden');
            } else {
                el.classList.remove('u-hidden');
            }
        });
        q('.js-next').forEach((el) => {
            if (slider.isLastSlide()) {
                el.classList.add('u-hidden');
            } else {
                el.classList.remove('u-hidden');
            }
        });
    }

    function updateControls() {
        updateIndicator(slider.getCurrentSlide());
        setControlsVisibility();
    }

    function bindEventHandlers() {
        q('.js-prev').forEach((el) => {
            el.addEventListener('click', () => {
                slider.slideLeft();
                updateControls();
            });
        });

        q('.js-next').forEach((el) => {
            el.addEventListener('click', () => {
                slider.slideRight();
                updateControls();
            });
        });

        q('.js-indicator').forEach((el) => {
            el.addEventListener('click', () => {
                const newSlideIndex = (el.dataset && el.dataset.slideIndex) ||
                    el.parentNode.dataset.slideIndex;

                slider.gotoSlide(parseInt(newSlideIndex, 10));
                updateControls();
            });
        });
    }

    bindEventHandlers();
    setControlsVisibility();
}
