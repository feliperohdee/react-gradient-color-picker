import React from 'react';
import { usePicker } from './context';
import { formatInputValues } from './formatters';
import { controlBtnStyles } from './Controls';
import { LinearIcon, RadialIcon, DegreesIcon, StopIcon, TrashIcon } from './icon';
import { controlBtnsWrap, controlBtn, degreeInput, borderBox } from './style';

const GradientControls = () => {
	const { gradientType } = usePicker();
	return (
		<div
			style={{
				...borderBox,
				background: '#e9e9f5',
				borderRadius: 6,
				display: 'flex',
				justifyContent: 'space-between',
				marginBottom: -4,
				marginTop: 12
			}}
		>
			<GradientType />
			<div style={{ width: 53 }}>{gradientType === 'linear-gradient' && <DegreePicker />}</div>
			<StopPicker />
			<DeleteBtn />
		</div>
	);
};

export default GradientControls;

const GradientType = () => {
	const { gradientType, onChange, value } = usePicker();
	let isLinear = gradientType === 'linear-gradient';
	let isRadial = gradientType === 'radial-gradient';

	const handleLinear = () => {
		const remaining = value.split(/,(.+)/)[1];
		onChange(`linear-gradient(90deg, ${remaining}`);
	};

	const handleRadial = () => {
		const remaining = value.split(/,(.+)/)[1];
		onChange(`radial-gradient(circle, ${remaining}`);
	};

	return (
		<div style={{ ...controlBtnsWrap, ...borderBox, alignItems: 'center', display: 'flex' }}>
			<div onClick={handleLinear} style={{ ...controlBtn, ...controlBtnStyles(isLinear) }}>
				<LinearIcon color={isLinear ? '#568CF5' : ''} />
			</div>
			<div onClick={handleRadial} style={{ ...controlBtn, ...controlBtnStyles(isRadial) }}>
				<RadialIcon color={isRadial ? '#568CF5' : ''} />
			</div>
		</div>
	);
};

const StopPicker = () => {
	const { currentLeft, handleGradient, currentColor } = usePicker();

	const handleKeyDown = e => {
		if (e.key === 'ArrowUp') {
			const n = Number(e.target.value || 0);

			if (!isNaN(n)) {
				handleMove(n + 1);
			}
		} else if (e.key === 'ArrowDown') {
			const n = Number(e.target.value || 0);

			if (!isNaN(n)) {
				handleMove(n - 1);
			}
		}
	};

	const handleMove = newVal => {
		handleGradient(currentColor, formatInputValues(newVal, 0, 100));
	};

	return (
		<div style={{ ...controlBtnsWrap, alignItems: 'center', display: 'flex', paddingLeft: 8 }}>
			<StopIcon />
			<input
				style={degreeInput}
				value={currentLeft}
				onKeyDown={handleKeyDown}
				onChange={e => handleMove(e.target.value || 0)}
			/>
		</div>
	);
};

const DegreePicker = () => {
	const { degrees, onChange, value } = usePicker();

	const handleDegrees = e => {
		let newValue = formatInputValues(e.target.value, 0, 360);
		const remaining = value.split(/,(.+)/)[1];
		onChange(`linear-gradient(${newValue || 0}deg, ${remaining}`);
	};

	const handleKeyDown = e => {
		if (e.key === 'ArrowUp') {
			handleDegrees({
				target: {
					value: degrees + 1
				}
			});
		} else if (e.key === 'ArrowDown') {
			handleDegrees({
				target: {
					value: degrees - 1
				}
			});
		}
	};

	return (
		<div style={{ ...controlBtnsWrap, alignItems: 'center', display: 'flex', position: 'relative' }}>
			<DegreesIcon />
			<input style={degreeInput} value={degrees} onKeyDown={handleKeyDown} onChange={handleDegrees} />
			<div
				style={{
					position: 'absolute',
					right: degrees > 99 ? 0 : degrees < 10 ? 7 : 3,
					top: 1,
					fontWeight: 400,
					fontSize: 13
				}}
			>
				°
			</div>
		</div>
	);
};

const DeleteBtn = () => {
	const { deletePoint } = usePicker();

	return (
		<div
			onClick={deletePoint}
			style={{
				...controlBtnsWrap,
				...controlBtnStyles(false),
				display: 'flex',
				justifyContent: 'center',
				marginRight: 1,
				width: 30
			}}
		>
			<TrashIcon />
		</div>
	);
};
