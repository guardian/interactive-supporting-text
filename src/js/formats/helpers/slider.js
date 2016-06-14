import q from '../../lib/query';

export default function ({ length, initialSlide }) {
    const slider = q('.js-slider')[0];
    const fullWidth = `${(100 * length)}%`;
    const slideWidth = 100 / length;
    let currentSlideIndex = initialSlide - 1;

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
            currentSlideIndex = initialSlide - 1;
            slider.style.transform = buildTransformProperty();
        },
    };
}
