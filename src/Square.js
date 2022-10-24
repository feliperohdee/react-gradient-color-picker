import React, { useCallback, useRef, useState } from 'react';
import throttle from 'lodash.throttle';
import usePaintSquare from './usePaintSquare';
import { usePicker } from './context';
import { handle, canvasWrapper } from './style';

const Square = () => {
	const { handleColor, x, y, internalHue, squareWidth, squareHeight } = usePicker();
	const [dragging, setDragging] = useState(false);
	const canvas = useRef(null);
	usePaintSquare(canvas, internalHue, squareWidth, squareHeight);

	const onChange = useCallback(
		(target, clientX, clientY) => {
			const ctx = canvas?.current?.getContext('2d');
			const onMouseMove = throttle(() => {
				handleColor(target, clientX, clientY, ctx);
			}, 250);
			onMouseMove();
		},
		[handleColor]
	);

	const onMouseDown = e => {
		const { target } = e;

		const onDrag = e => {
			onChange(target, e.clientX, e.clientY);
		};

		const onDragStop = () => {
			window.removeEventListener('mousemove', onDrag);
			window.removeEventListener('mouseup', onDragStop);
			setDragging(false);
		};

		window.addEventListener('mousemove', onDrag);
		window.addEventListener('mouseup', onDragStop);

		setDragging(true);
	};

	const onClick = e => {
		if (!dragging) {
			onChange(e.target, e.clientX, e.clientY);
		}
	};

	return (
		<div
			style={{
				position: 'relative'
			}}
		>
			<div
				style={{
					position: 'absolute',
					left: -7,
					top: -7,
					width: squareWidth + 14,
					height: squareHeight + 14
				}}
			/>
			<div style={{ cursor: 'crosshair', position: 'relative' }} onMouseDown={onMouseDown}>
				<div style={{ left: x, top: y, ...handle }} />
				<div style={{ ...canvasWrapper, height: squareHeight }} onClick={onClick}>
					<canvas ref={canvas} width={`${squareWidth}px`} height={`${squareHeight}px`} id='paintSquare' />
				</div>
			</div>
		</div>
	);
};

export default Square;
