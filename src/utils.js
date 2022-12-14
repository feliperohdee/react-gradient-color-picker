import tc from 'tinycolor2';

import { formatInputValues } from './formatters';
import constants from './constants';

export function getHandleValue(target, clientX) {
	const { offsetLeft, clientWidth } = safeBounds(target);
	let pos = clientX - offsetLeft - constants.barSize / 2;
	let adjuster = clientWidth - 18;
	let bounded = formatInputValues(pos, 0, adjuster);
	return Math.round(bounded / (adjuster / 100));
}

export function computeSquareXY(hsl, squareWidth, squareHeight) {
	const s = hsl[1] * 100;
	const l = hsl[2] * 100;
	const t = (s * (l < 50 ? l : 100 - l)) / 100;
	const s1 = Math.round((200 * t) / (l + t)) | 0;
	const b1 = Math.round(t + l);
	const x = (squareWidth / 100) * s1 - constants.crossSize / 2;
	const y = squareHeight - (squareHeight / 100) * b1 - constants.crossSize / 2;
	return [x, y];
}

export function computePickerPosition(target, clientX, clientY) {
	const { offsetLeft, offsetTop, clientWidth, clientHeight } = safeBounds(target);
	const getX = () => {
		let xPos = clientX - offsetLeft - constants.crossSize / 2;
		return formatInputValues(xPos, -8, clientWidth - 10);
	};
	const getY = () => {
		let yPos = clientY - offsetTop - constants.crossSize / 2;
		return formatInputValues(yPos, -8, clientHeight - 10);
	};

	return [getX(), getY()];
}

export const getDegrees = value => {
	let s1 = value?.split(',')[0];
	return parseInt(s1?.split('(')[1]?.slice(0, -3));
};

export const getGradientType = value => {
	return value?.split('(')[0];
};

export const getNewHsl = (newHue, s, l, o, setInternalHue) => {
	setInternalHue(newHue);
	let tiny = tc({ h: newHue, s: s, l: l });
	let { r, g, b } = tiny.toRgb();
	return `rgba(${r}, ${g}, ${b}, ${o})`;
};

export const safeBounds = target => {
	let client = target.parentNode.getBoundingClientRect();
	let className = target.className;
	let adjuster = className === 'c-resize ps-rl' ? 15 : 0;
	return {
		offsetLeft: client?.x + adjuster,
		offsetTop: client?.y,
		clientWidth: client?.width,
		clientHeight: client?.height
	};
};

export const isUpperCase = str => {
	return str?.[0] === str?.[0]?.toUpperCase();
};
