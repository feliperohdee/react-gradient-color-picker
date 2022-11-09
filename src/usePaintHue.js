import tinycolor from 'tinycolor2';
import { useEffect } from 'react';

const usePaintHue = (canvas, squareWidth) => {
	useEffect(() => {
		const ctx = canvas?.current?.getContext('2d');
		ctx.rect(0, 0, squareWidth, 14);

		const gradient = ctx.createLinearGradient(0, 0, squareWidth, 0);
		for (let i = 0; i <= 360; i += 30) {
			gradient.addColorStop(i / 360, `hsl(${i}, 100%, 50%)`);
		}
		ctx.fillStyle = gradient;
		ctx.fill();
	}, [canvas, squareWidth]);
};

export default usePaintHue;

export const usePaintSat = (canvas, h, l, squareWidth) => {
	useEffect(() => {
		const ctx = canvas?.current?.getContext('2d');
		if (ctx) {
			ctx.rect(0, 0, squareWidth, 14);

			const gradient = ctx.createLinearGradient(0, 0, squareWidth, 0);
			for (let i = 0; i <= 100; i += 10) {
				gradient.addColorStop(i / 100, `hsl(${h}, ${i}%, ${l}%)`);
			}
			ctx.fillStyle = gradient;
			ctx.fill();
		}
	}, [canvas, h, l, squareWidth]);
};

export const usePaintLight = (canvas, h, s, squareWidth) => {
	useEffect(() => {
		const ctx = canvas?.current?.getContext('2d');
		if (ctx) {
			ctx.rect(0, 0, squareWidth, 14);

			const gradient = ctx.createLinearGradient(0, 0, squareWidth, 0);
			for (let i = 0; i <= 100; i += 10) {
				gradient.addColorStop(i / 100, `hsl(${h}, ${s}%, ${i}%)`);
			}
			ctx.fillStyle = gradient;
			ctx.fill();
		}
	}, [canvas, h, s, squareWidth]);
};

export const usePaintBright = (canvas, h, s, squareWidth) => {
	useEffect(() => {
		const ctx = canvas?.current?.getContext('2d');
		if (ctx) {
			ctx.rect(0, 0, squareWidth, 14);

			const gradient = ctx.createLinearGradient(0, 0, squareWidth, 0);
			for (let i = 0; i <= 100; i += 10) {
				let hsl = tinycolor({ h: h, s: s, v: i });
				gradient.addColorStop(i / 100, hsl.toHslString());
			}
			ctx.fillStyle = gradient;
			ctx.fill();
		}
	}, [canvas, h, s, squareWidth]);
};
