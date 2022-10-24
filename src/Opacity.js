import React, { useState } from 'react';
import { usePicker } from './context';
import { barWrap, barWrapInner, handle, opacityOverlay, opacityBg } from './style';

const Opacity = () => {
	const { handleOpacity, opacity, tinyColor, squareWidth } = usePicker();
	const [dragging, setDragging] = useState(false);
	const { r, g, b } = tinyColor.toRgb();
	const bg = `linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(${r},${g},${b},.5) 100%)`;

	const onMouseDown = e => {
		const { target } = e;

		const onDrag = e => {
			handleOpacity(target, e.clientX);
		};

		const onDragaStop = () => {
			window.removeEventListener('mousemove', onDrag);
			window.removeEventListener('mouseup', onDragaStop);
			setDragging(false);
		};

		window.addEventListener('mousemove', onDrag);
		window.addEventListener('mouseup', onDragaStop);

		setDragging(true);
	};

	const onClick = e => {
		if (!dragging) {
			handleOpacity(e.target, e.clientX);
		}
	};

	let left = squareWidth - 18;

	return (
		<div style={{ ...barWrap, marginTop: 6, width: squareWidth + 36 }}>
			<div style={{ ...barWrapInner, width: squareWidth + 30 }}>
				<div style={{ cursor: 'move', position: 'relative' }} onMouseDown={onMouseDown}>
					<div style={{ left: left * opacity, top: -2, ...handle }} />
					<div style={{ background: bg, ...opacityOverlay }} onClick={onClick} />
					<OpacityBg />
				</div>
			</div>
		</div>
	);
};

export default Opacity;

const OpacityBg = () => {
	const { squareWidth } = usePicker();
	let hw = squareWidth * 0.023809523809524;

	return (
		<div style={opacityBg}>
			{squares?.map((s, key) => (
				<div
					key={key}
					style={{
						height: 7,
						width: hw,
						background: s === 1 ? 'rgba(0,0,0,.3)' : 'rgba(0,0,0,0)'
					}}
				/>
			))}
		</div>
	);
};

const squares = [
	1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1,
	0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1,
	0, 1, 0, 1, 0, 1
];
