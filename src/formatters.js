import constants from './constants';
import { gradientParser } from './gradientParser';

export const low = color => {
	return color.value.toLowerCase();
};

export const high = color => {
	return color.value.toUpperCase();
};

export const getColors = value => {
	let isGradient = value?.includes('gradient');
	if (isGradient) {
		let isConic = value?.includes('conic');
		let safeValue = !isConic && value ? value : constants.defaultGradient;
		if (isConic) {
			console.log('Sorry we cant handle conic gradients yet');
		}
		const obj = gradientParser(safeValue);
		return obj?.colorStops;
	} else {
		let safeValue = value ? value : constants.defaultColor;
		return [{ value: safeValue }];
	}
};

export const formatInputValues = (value, min, max) => {
	return isNaN(value) ? min : value < min ? min : value > max ? max : value;
};
