import React from 'react';
import { usePicker } from './context';

import { controlBtn, borderBox } from './style';
import constants from './constants';
import GradientControls from './GradientControls';

const Controls = () => {
	const { isGradient, onChange, previousColors, previousGraidents } = usePicker();
	
	const solidColor = previousColors?.[0] || constants.defaultColor;
	const gradientColor = previousGraidents?.[0] || constants.defaultGradient;

	const setSolid = () => {
		onChange(solidColor);
	};

	const setGradient = () => {
		onChange(gradientColor);
	};

	return (
		<div style={{ paddingTop: 12, paddingBottom: 9 }}>
			<div style={{ alignItems: 'center', width: '100%', display: 'flex', justifyContent: 'center' }}>
				<div
					style={{
						alignItems: 'center',
						background: '#e9e9f5',
						borderRadius: 6,
						display: 'flex',
						height: 28,
						justifyContent: 'center',
						padding: 2,
						...borderBox
					}}
				>
					<div
						style={{
							alignItems: 'center',
							display: 'flex',
							...controlBtn,
							...controlBtnStyles(!isGradient)
						}}
						onClick={setSolid}
					>
						Solid
					</div>
					<div
						style={{
							alignItems: 'center',
							display: 'flex',
							...controlBtn,
							...controlBtnStyles(isGradient)
						}}
						onClick={setGradient}
					>
						Gradient
					</div>
				</div>
			</div>
			{isGradient && <GradientControls />}
		</div>
	);
};

export default Controls;

export const controlBtnStyles = selected => {
	return {
		background: selected ? 'white' : 'rgba(255,255,255,0)',
		boxShadow: selected ? '1px 1px 3px rgba(0,0,0,.2)' : '1px 1px 3px rgba(0,0,0,0)',
		color: selected ? '#568CF5' : 'rgb(86,86,86)',
		cursor: selected ? 'auto' : 'pointer'
	};
};
