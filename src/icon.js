import React from 'react';
import PropTypes from 'prop-types';

export const TrashIcon = () => {
	const styles = {
		fill: 'none',
		stroke: 'rgb(50, 49, 54)',
		strokeLinecap: 'round',
		strokeLinejoin: 'round',
		strokeWidth: '1.8px'
	};
	return (
		<svg
			id='Layer_1'
			data-name='Layer 1'
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			style={{ width: 15 }}
		>
			<polyline
				style={styles}
				points='17.96 4.31 2.04 4.3 3.75 4.3 4.81 17.29 5.16 17.96 5.74 18.47 6.59 18.62 13.64 18.62 14.52 18.32 15.07 17.68 15.29 17.12 16.28 4.3 12.87 4.3 12.87 2.38 12.48 1.75 11.83 1.46 8.4 1.46 7.64 1.68 7.26 2.21 7.16 2.52 7.17 4.23'
			/>
		</svg>
	);
};

export const LinearIcon = ({ color }) => {
	const col = color || '#323136';
	const styles = {
		fill: 'none',
		stroke: col,
		strokeLinecap: 'round',
		strokeLinejoin: 'round',
		strokeWidth: '1.8px'
	};
	return (
		<svg
			id='Layer_1'
			data-name='Layer 1'
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			style={{ width: 14 }}
		>
			<polyline
				style={styles}
				points='0.9 12.73 0.9 19.1 7.27 19.1 0.9 19.1 19.1 0.9 12.73 0.9 19.1 0.9 19.1 7.27'
			/>
		</svg>
	);
};

export const RadialIcon = ({ color }) => {
	const col = color || '#323136';
	const styles = {
		fill: 'none',
		stroke: col,
		strokeMiterlimit: 10,
		strokeWidth: '1.8px'
	};
	return (
		<svg
			id='Layer_1'
			data-name='Layer 1'
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			style={{ width: 15 }}
		>
			<circle style={styles} cx='10' cy='10' r='9' />
			<circle style={styles} cx='10' cy='10' r='5' />
		</svg>
	);
};

export const DegreesIcon = ({ color }) => {
	const col = color || '#323136';
	const style2 = {
		fill: 'none',
		stroke: col,
		strokeMiterlimit: 10,
		strokeWidth: '1.8px',
		strokeLinecap: 'round'
	};
	return (
		<svg
			id='Layer_1'
			data-name='Layer 1'
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			style={{ width: 15 }}
		>
			<polyline style={style2} points='13.86 2.01 1.7 16.99 18.77 16.99' />
			<polyline
				style={style2}
				points='10.96 16.38 10.96 16.38 10.74 15.7 10.44 14.97 10.06 14.21 9.72 13.63 9.21 12.89 8.85 12.44 8.41 11.95 7.91 11.45 7.51 11.1'
			/>
		</svg>
	);
};

export const StopIcon = () => {
	return (
		<svg
			id='Layer_1'
			data-name='Layer 1'
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			style={{ width: 20, marginRight: 1 }}
		>
			<path d='M2.39,8c-.63,0-1,.21-1,.63A.49.49,0,0,0,1.67,9a6.48,6.48,0,0,0,1.11.43A3,3,0,0,1,4,10.09a1.47,1.47,0,0,1,.35,1.09,1.75,1.75,0,0,1-.57,1.42,2.21,2.21,0,0,1-1.48.48,8.32,8.32,0,0,1-1.68-.21l-.31-.06.12-.94a13.7,13.7,0,0,0,1.8.16c.61,0,.92-.26.92-.77a.52.52,0,0,0-.21-.44,3.13,3.13,0,0,0-.85-.34A3.32,3.32,0,0,1,.66,9.79a1.43,1.43,0,0,1-.42-1.1A1.6,1.6,0,0,1,.78,7.36a2.32,2.32,0,0,1,1.49-.44,10.46,10.46,0,0,1,1.64.17l.32.07-.1.95C3.31,8,2.73,8,2.39,8Z' />
			<path d='M4.79,8.09V7H9.16V8.09H7.59V13H6.38V8.09Z' />
			<path d='M14,12.34a2.25,2.25,0,0,1-1.91.74,2.24,2.24,0,0,1-1.91-.74A3.85,3.85,0,0,1,9.61,10a4,4,0,0,1,.56-2.34,2.2,2.2,0,0,1,1.91-.77A2.21,2.21,0,0,1,14,7.69,4,4,0,0,1,14.55,10,3.85,3.85,0,0,1,14,12.34Zm-2.88-.77a1,1,0,0,0,1,.46,1,1,0,0,0,1-.46A3.25,3.25,0,0,0,13.3,10,3.45,3.45,0,0,0,13,8.46a1,1,0,0,0-1-.49,1,1,0,0,0-1,.49A3.43,3.43,0,0,0,10.85,10,3.38,3.38,0,0,0,11.11,11.57Z' />
			<path d='M17.77,11.24h-1V13H15.58V7h2.19a1.85,1.85,0,0,1,2.11,2.07,2.21,2.21,0,0,1-.54,1.6A2.07,2.07,0,0,1,17.77,11.24Zm-1-1h1c.6,0,.9-.37.9-1.12a1.18,1.18,0,0,0-.22-.79.88.88,0,0,0-.68-.24h-1Z' />
		</svg>
	);
};

LinearIcon.propTypes = {
	color: PropTypes.string
};

RadialIcon.propTypes = {
	color: PropTypes.string
};

DegreesIcon.propTypes = {
	color: PropTypes.string
};
