import q from '../../lib/query';

let slider;

function getSlider() {
	if (!slider) {
		slider = q('.js-slider')[0];
	}
	return slider;
}

export default {
	slideLeft() {
		const slider = getSlider();
		slider.classList.remove('brexit__slider--right');
		slider.classList.add('brexit__slider--left');
	},
	slideRight() {
		const slider = getSlider();
		slider.classList.add('brexit__slider--right');
		slider.classList.remove('brexit__slider--left');
	},
	reset() {
		const slider = getSlider();
		slider.classList.remove('brexit__slider--left');
		slider.classList.remove('brexit__slider--right');
	}
}