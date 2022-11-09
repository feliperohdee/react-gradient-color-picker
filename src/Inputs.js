import { useState, useEffect } from 'react';
import tinycolor from 'tinycolor2';

import { formatInputValues } from './formatters';
import { inputWrap, inputLabel } from './style';
import { usePicker } from './context';

const Inputs = () => {
	const { handleChange, r, g, b, opacity } = usePicker();

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'space-between',
				paddingTop: 14
			}}
		>
			<HexInput />
			<Input
				value={opacity * 100}
				callback={newVal => handleChange(`rgba(${r}, ${g}, ${b}, ${newVal / 100})`)}
				label='A'
			/>
		</div>
	);
};

export default Inputs;

const HexInput = () => {
	const { handleChange, tinyColor, opacity } = usePicker();
	const [disable, setDisable] = useState('');
	const hex = tinyColor.toHex();
	const [newHex, setNewHex] = useState(hex);

	useEffect(() => {
		if (disable !== 'hex') {
			setNewHex(hex);
		}
	}, [tinyColor, disable, hex]);

	const handleHex = e => {
		let tinyHex = tc(e.target.value);
		setNewHex(e.target.value);
		if (tinyHex.isValid()) {
			let { r, g, b } = tinyHex.toRgb();
			let newColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;
			handleChange(newColor);
		}
	};

	return (
		<div style={{ width: '23%' }}>
			<input
				style={{ ...inputWrap }}
				value={newHex}
				onChange={e => handleHex(e)}
				onFocus={() => setDisable('hex')}
				onBlur={() => setDisable('')}
			/>
			<div style={{ ...inputLabel }}>HEX</div>
		</div>
	);
};

const Input = ({ value, callback, max = 100, label }) => {
	const [temp, setTemp] = useState(value);

	useEffect(() => {
		setTemp(value);
	}, [value]);

	const onChange = e => {
		const newVal = formatInputValues(parseFloat(e.target.value), 0, max);
		setTemp(newVal);
		callback(newVal);
	};

	return (
		<div style={{ width: '18%' }}>
			<input style={{ ...inputWrap }} value={temp} onChange={e => onChange(e)} />
			<div style={{ ...inputLabel }}>{label}</div>
		</div>
	);
};
