import q from '../../lib/query';

export default function buildCarousel(slideCount) {
    let currentSlide = 0;

    function clearCurrent() {
        q('.js-current').forEach((el) => {
            el.classList.remove('js-current');
            el.classList.remove('brexit__carousel-slide--current');
        });
        q('.js-active').forEach((el) => {
            el.classList.remove('brexit__carousel-indicator--active');
            el.classList.remove('js-active');
            el.classList.add('brexit__carousel-indicator--passive');
        });
    }

    function setCurrent() {
        q(`#carousel-slide-${currentSlide}`).forEach((el) => {
            el.classList.add('js-current');
            el.classList.add('brexit__carousel-slide--current');
        });
        q(`#carousel-indicator-${currentSlide}`).forEach((el) => {
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
        q('.js-prev').forEach((el) => {
            if (isFirstSlide()) {
                el.classList.add('u-hidden');
            } else {
                el.classList.remove('u-hidden');
            }
        });
        q('.js-next').forEach((el) => {
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

    q('.js-prev').forEach((el) => {
        el.addEventListener('click', () => {
            if (isFirstSlide()) {
                return;
            }
            showPreviousSlide();
        });
    });

    q('.js-next').forEach((el) => {
        el.addEventListener('click', () => {
            if (isLastSlide()) {
                return;
            }
            showNextSlide();
        });
    });

    q('.js-indicator').forEach((el) => {
        el.addEventListener('click', () => {
            const elementId = el.id || el.parentNode.id;
            const newSlideIndex = elementId.split(/carousel-indicator-/)[1];

            currentSlide = parseInt(newSlideIndex, 10);
            updateSlides();
        });
    });
}
