import { useRef, useState } from 'react';

import { barWrap, barWrapInner, gradientHandleWrap, gradientHandle } from './style';
import { getHandleValue } from './utils';
import { usePicker } from './context';

const GradientBar = () => {
	const { createGradientStr, addPoint, colors, value, squareWidth } = usePicker();
	const [dragging, setDragging] = useState(false);
	const ref = useRef(null);

	const force90degLinear = color => {
		return color.replace(/(radial|linear)-gradient\([^,]+,/, 'linear-gradient(90deg,');
	};

	const onMouseDown = e => {
		if (!dragging) {
			addPoint(e.target, e.clientX);
			setDragging(true);
		}
	};

	const onHandleMouseDown = (e, colors, index) => {
		const currentColor = colors[index].value;

		const onDrag = e => {
			if (ref?.current) {
				const left = getHandleValue(ref.current, e.clientX);
				const newColors = colors.map((c, i) => {
					if (i === index) {
						c.left = left;
						c.value = currentColor.toUpperCase();
					} else {
						c.value = c.value.toLowerCase();
					}

					return c;
				});

				createGradientStr(newColors);
			}
		};

		const newColors = colors.map((c, i) => {
			c.value = i === index ? c.value.toUpperCase() : c.value.toLowerCase();
			return c;
		});

		const onDragStop = () => {
			window.removeEventListener('mousemove', onDrag);
			window.removeEventListener('mouseup', onDragStop);
			setDragging(false);
		};

		window.addEventListener('mousemove', onDrag);
		window.addEventListener('mouseup', onDragStop);
		createGradientStr(newColors);
		setDragging(true);
	};

	return (
		<div style={{ ...barWrap, width: squareWidth + 36 }}>
			<div style={{ ...barWrapInner, position: 'relative', width: squareWidth + 30 }}>
				<div onMouseDown={onMouseDown} ref={ref} style={{ paddingTop: 6, paddingBottom: 6 }}>
					<div
						style={{
							cursor: 'copy',
							width: squareWidth,
							height: 14,
							backgroundImage: force90degLinear(value),
							borderRadius: 10
						}}
					/>
				</div>
				{colors?.map((c, i) => (
					<Handle left={c.left} key={`${i}-${c}`} index={i} onMouseDown={onHandleMouseDown} />
				))}
			</div>
		</div>
	);
};

export default GradientBar;

export const Handle = ({ left, index, onMouseDown: onMouseDownProxy }) => {
	const { colors, selectedColor, squareWidth } = usePicker();
	const isSelected = selectedColor === index;
	const leftMultiplayer = (squareWidth - 18) / 100;

	const onMouseDown = e => {
		e.stopPropagation();
		onMouseDownProxy(e, colors, index);
	};

	return (
		<div
			style={{ cursor: 'move', left: left * leftMultiplayer + 13, ...gradientHandleWrap }}
			onMouseDown={onMouseDown}
		>
			<div
				style={{
					...handleStyle(isSelected),
					...gradientHandle,
					alignItems: 'center',
					display: 'flex',
					justifyContent: 'center',
					pointerEvents: selectedColor ? 'auto' : 'none'
				}}
			>
				{isSelected && (
					<div
						style={{
							width: 5,
							height: 5,
							borderRadius: '50%',
							background: 'white'
						}}
					/>
				)}
			</div>
		</div>
	);
};

const handleStyle = isSelected => {
	return {
		boxShadow: isSelected ? '0px 0px 5px 1px rgba(86, 140, 245,.95)' : '',
		border: isSelected ? '2px solid white' : '2px solid rgba(255,255,255,.75)'
	};
};
