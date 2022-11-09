import { createContext, useContext, useState, useEffect } from 'react';
import tinycolor from 'tinycolor2';

import constants from './constants';
import { low, getColors } from './formatters';
import {
	computePickerPosition,
	getGradientType,
	computeSquareXY,
	getDegrees,
	getNewHsl,
	getHandleValue,
	isUpperCase
} from './utils';

const PickerContext = createContext();

export default function PickerContextWrapper({ children, bounds, value, onChange, squareWidth, squareHeight }) {
	const offsetLeft = bounds?.x;

	const isGradient = value?.includes('gradient');
	const gradientType = getGradientType(value);
	const degrees = getDegrees(value);
	const degreeStr = gradientType === 'linear-gradient' ? `${degrees}deg` : 'circle';
	const colors = getColors(value);
	const indexedColors = colors?.map((c, i) => ({ ...c, index: i }));
	const currentColorObj = indexedColors?.filter(c => isUpperCase(c.value))[0] || indexedColors[0];
	const currentColor = currentColorObj?.value;
	const selectedColor = currentColorObj?.index;
	const currentLeft = currentColorObj?.left;
	const [tinyColor, setTinyColor] = useState(tinycolor(currentColor));

	const { r, g, b, a: opacity } = tinyColor.toRgb();
	const { h, s, l } = tinyColor.toHsl();
	const { s: hsvS, v: hsvV } = tinyColor.toHsv();
	const [internalHue, setInternalHue] = useState(Math.round(h));
	const hue = Math.round(h);
	const [x, y] = computeSquareXY([hue, s, l], squareWidth, squareHeight);
	const [previousColors, setPreviousColors] = useState([]);
	const [previousGraidents, setPreviousGradients] = useState([]);

	useEffect(() => {
		setTinyColor(tinycolor(currentColor));
		setInternalHue(hue);
	}, [currentColor, hue]);

	useEffect(() => {
		if (isGradient) {
			setPreviousGradients([value, ...previousGraidents?.slice(0, 4)]);
		} else {
			if (tinycolor(value).isValid()) {
				setPreviousColors([value, ...previousColors?.slice(0, 4)]);
			}
		}
		//eslint-disable-next-line
	}, [value]);

	const addPoint = (target, clientX) => {
		let left = getHandleValue(target, clientX);
		let newColors = [...colors.map(c => ({ ...c, value: low(c) })), { value: currentColor, left: left }];
		createGradientStr(newColors);
	};

	const createGradientStr = newColors => {
		let sorted = newColors.sort((a, b) => a.left - b.left);
		let colorString = sorted?.map(cc => `${cc?.value} ${cc.left}%`);
		onChange(`${gradientType}(${degreeStr}, ${colorString.join(', ')})`);
	};

	const deletePoint = () => {
		if (colors?.length > 2) {
			let remaining = colors?.filter((rc, i) => i !== selectedColor);
			createGradientStr(remaining);
		}
	};

	const handleChange = newColor => {
		if (!isGradient) {
			onChange(newColor);
		} else {
			const newColors = colors.map((c, i) => {
				if (i === selectedColor) {
					c.value = newColor.toUpperCase();
				} else {
					c.value = c.value.toLowerCase();
				}

				return c;
			});

			createGradientStr(newColors);
		}
	};

	const handleOpacity = (target, clientX) => {
		let newO = getHandleValue(target, clientX) / 100;
		let newColor = `rgba(${r}, ${g}, ${b}, ${newO})`;
		handleChange(newColor);
	};

	const handleHue = (target, clientX) => {
		let newHue = getHandleValue(target, clientX) * 3.6;
		let newHsl = getNewHsl(newHue, s, l, opacity, setInternalHue);
		handleChange(newHsl);
	};

	const handleColor = (target, clientX, clientY, ctx) => {
		const [x, y] = computePickerPosition(target, clientX, clientY);
		const x1 = Math.min(x + constants.crossSize / 2, squareWidth - 1);
		const y1 = Math.min(y + constants.crossSize / 2, squareHeight - 1);
		const [r, g, b] = ctx.getImageData(x1, y1, 1, 1).data;
		let newColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;
		handleChange(newColor);
	};

	const pickerState = {
		addPoint,
		b,
		colors,
		createGradientStr,
		currentColor,
		currentLeft,
		degrees,
		deletePoint,
		g,
		gradientType,
		handleChange,
		handleColor,
		handleHue,
		handleOpacity,
		hsvS,
		hsvV,
		hue,
		internalHue,
		isGradient,
		l,
		offsetLeft,
		onChange,
		opacity,
		previousColors,
		previousGraidents,
		r,
		s,
		selectedColor,
		setInternalHue,
		squareHeight,
		squareWidth,
		tinyColor,
		value,
		x,
		y
	};

	return <PickerContext.Provider value={pickerState}>{children}</PickerContext.Provider>;
}

export const usePicker = () => {
	return useContext(PickerContext);
};
