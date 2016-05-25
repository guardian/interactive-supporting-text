import q from '../../lib/query';

let slider;

function getSlider() {
	if (!slider) {
		slider = q('.js-slider-container')[0];
	}
	return slider;
}

export default {
	slideLeft() {
		const slider = getSlider();
		slider.classList.remove('brexit__slider-container--right');
		slider.classList.add('brexit__slider-container--left');
	},
	slideRight() {
		const slider = getSlider();
		slider.classList.add('brexit__slider-container--right');
		slider.classList.remove('brexit__slider-container--left');
	},
	reset() {
		const slider = getSlider();
		slider.classList.remove('brexit__slider-container--left');
		slider.classList.remove('brexit__slider-container--right');
	}
}