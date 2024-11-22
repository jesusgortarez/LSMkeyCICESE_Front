import React, { useEffect, useRef } from 'react';
import { DrawingUtils, HandLandmarker } from '@mediapipe/tasks-vision';

const HandLandmarkCanvas = ({ keypoint, width = 360, height = 360 }) => {
	const canvasRef = useRef(null);
	useEffect(() => {
		console.log(keypoint);
		if (!keypoint || !canvasRef.current) return;

		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');

		// Limpia el canvas antes de dibujar
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Inicializa DrawingUtils
		const drawingUtils = new DrawingUtils(ctx);

		// Dibuja los landmarks
		for (const landmarks of keypoint) {
			drawingUtils.drawConnectors(landmarks, HandLandmarker.HAND_CONNECTIONS, {
				color: '#00FDE1',
				lineWidth: 5,
			});
		}
	}, [keypoint]);

	return (
		<canvas
			className='canvasfbr'
			ref={canvasRef}
			width={width}
			height={height}
		/>
	);
};

export default HandLandmarkCanvas;
