import q from '../../lib/query';

export default function ({ length, initialSlide = 0 }) {
    const slider = q('.js-slider')[0];
    const fullWidth = `${(100 * length)}%`;
    const slideWidth = 100 / length;
    let currentSlideIndex = initialSlide;

    function buildTransformProperty() {
        return `translate(-${currentSlideIndex * slideWidth}%)`;
    }

    slider.style.width = fullWidth;
    slider.style.transform = buildTransformProperty();

    return {
        slideLeft() {
            if (currentSlideIndex > 0) {
                currentSlideIndex -= 1;
            }
            slider.style.transform = buildTransformProperty();
        },
        slideRight() {
            if (currentSlideIndex < length - 1) {
                currentSlideIndex += 1;
            }
            slider.style.transform = buildTransformProperty();
        },
        reset() {
            currentSlideIndex = initialSlide;
            slider.style.transform = buildTransformProperty();
        },
        getCurrentSlide() {
            return currentSlideIndex;
        },
        gotoSlide(index) {
            if (index >= 0 && index < length) {
                currentSlideIndex = index;
            }
            slider.style.transform = buildTransformProperty();
        },
        isFirstSlide() {
            return (currentSlideIndex <= 0);
        },
        isLastSlide() {
            return (currentSlideIndex >= length - 1);
        },
    };
}
