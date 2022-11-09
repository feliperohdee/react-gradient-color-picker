import { useRef, useState, useEffect } from 'react';

import { barWrap, barWrapInner, handle, borderBox } from './style';
import { usePicker } from './context';
import usePaintHue from './usePaintHue';

const Hue = () => {
	const barRef = useRef(null);
	const { handleHue, internalHue, squareWidth } = usePicker();
	const [dragging, setDragging] = useState(false);
	usePaintHue(barRef, squareWidth);
	const [handleTop, setHandleTop] = useState(2);

	useEffect(() => {
		setHandleTop(barRef?.current?.offsetTop - 2);
	}, [barRef]);

	const onMouseDown = e => {
		const { target } = e;

		const onDrag = e => {
			handleHue(target, e.clientX);
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
			handleHue(e.target, e.clientX);
		}
	};

	return (
		<div style={{ ...barWrap, width: squareWidth + 36 }}>
			<div style={{ ...barWrapInner, position: 'relative', width: squareWidth + 30 }}>
				<div
					style={{ ...borderBox, cursor: 'move', position: 'relative' }}
					onMouseDown={onMouseDown}
					className='c-resize ps-rl'
				>
					<div
						style={{
							...handle,
							left: internalHue * ((squareWidth - 18) / 360),
							top: handleTop
						}}
					/>
					<canvas
						ref={barRef}
						width={`${squareWidth}px`}
						height='14px'
						style={{ position: 'relative', borderRadius: 14 }}
						onClick={onClick}
					/>
				</div>
			</div>
		</div>
	);
};

export default Hue;
