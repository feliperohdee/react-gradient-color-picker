import React, { useRef, useState, useEffect } from 'react';
import PickerContextWrapper from './context';
import Picker from './Picker';

function ColorPicker({
	value = 'rgba(175, 51, 242, 1)',
	onChange = () => {},
	hideControls = false,
	hideInputs = false,
	hidePresets = false,
	presets = [],
	width = 294,
	height = 294,
	style = {},
	className
}) {
	const contRef = useRef(null);
	const [bounds, setBounds] = useState({});

	useEffect(() => {
		setBounds(contRef?.current?.getBoundingClientRect());
	}, []);

	return (
		<div ref={contRef} style={{ ...style, width: width }} className={className}>
			<PickerContextWrapper
				bounds={bounds}
				value={value}
				onChange={onChange}
				squareWidth={width}
				squareHeight={height}
			>
				<Picker
					hideControls={hideControls}
					hideInputs={hideInputs}
					hidePresets={hidePresets}
					presets={presets}
				/>
			</PickerContextWrapper>
		</div>
	);
}

export default ColorPicker;
