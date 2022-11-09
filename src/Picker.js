import { usePicker } from './context';
import Controls from './Controls';
import GradientBar from './GradientBar';
import Hue from './Hue';
import Inputs from './Inputs';
import Opacity from './Opacity';
import Presets from './Presets';
import PropTypes from 'prop-types';
import Square from './Square';

const Picker = ({ hideControls, hideInputs, hidePresets, presets }) => {
	const { isGradient } = usePicker();

	return (
		<div style={{ userSelect: 'none' }}>
			<Square />
			{!hideControls && <Controls />}
			{isGradient && <GradientBar />}
			<Hue />
			<Opacity />
			{!hideInputs && <Inputs />}
			{!hidePresets && <Presets presets={presets} />}
		</div>
	);
};

export default Picker;

Picker.propTypes = {
	hideControls: PropTypes.bool,
	hideInputs: PropTypes.bool,
	hidePresets: PropTypes.bool,
	presets: PropTypes.array
};
