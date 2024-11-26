import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import {
	HandLandmarker,
	DrawingUtils,
	FilesetResolver,
} from '@mediapipe/tasks-vision';

export default React.memo(function MediaPipe({ onLandmarkDetected }) {
	const webcamRef = useRef(null);
	const canvasRef = useRef(null);
	const [handLandmarker, setHandLandmarker] = useState(null);
	const [landmarks, setLandmarks] = useState(null);

	useEffect(() => {
		async function loadHandLandmarker() {
			const vision = await FilesetResolver.forVisionTasks(
				'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm'
			);
			const model = await HandLandmarker.createFromOptions(vision, {
				baseOptions: {
					modelAssetPath:
						'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
					delegate: 'GPU',
				},
				runningMode: 'VIDEO',
			});
			setHandLandmarker(model);
		}

		loadHandLandmarker();
	}, []);

	useEffect(() => {
		let videoWidth, videoHeight;
		let lastVideoTime = -1;
		let results = undefined;

		const predictWebcam = async () => {
			if (handLandmarker && webcamRef.current && webcamRef.current.video) {
				const canvasElement = canvasRef.current;
				const canvasCtx = canvasElement.getContext('2d');
				const drawingUtils = new DrawingUtils(canvasCtx);

				let startTimeMs = performance.now();
				if (lastVideoTime !== webcamRef.current.video.currentTime) {
					lastVideoTime = webcamRef.current.video.currentTime;
					results = handLandmarker.detectForVideo(
						webcamRef.current.video,
						startTimeMs
					);
				}

				canvasCtx.save();
				canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
				canvasCtx.setTransform(-1, 0, 0, 1, canvasElement.width, 0);
				//
				if (results.landmarks[0]) {
					const Keypoint = results.landmarks[0].map((landmark) => ({
						x: landmark.x,
						y: landmark.y,
						z: landmark.z,
					}));

					for (const landmarks of results.landmarks) {
						drawingUtils.drawConnectors(
							landmarks,
							HandLandmarker.HAND_CONNECTIONS,
							{
								//color de los huesos
								color: '#1cfd00',
								//grosor de los huesos
								lineWidth: 5,
							}
						);
					}

					setLandmarks(Keypoint);
					if (Keypoint) {
						onLandmarkDetected(Keypoint);
					}
				}
				canvasCtx.restore();
				requestAnimationFrame(() => {
					predictWebcam();
				});
			}
		};

		if (handLandmarker) {
			// Activar la webcam stream.
			webcamRef.current.video.addEventListener('loadeddata', () => {
				videoWidth = webcamRef.current.video.videoWidth;
				videoHeight = webcamRef.current.video.videoHeight;
				canvasRef.current.width = videoWidth;
				canvasRef.current.height = videoHeight;
				predictWebcam();
			});
		}
	}, [handLandmarker]);

	return (
		<div className='model-canvas'>
			<Webcam audio={false} mirrored={true} ref={webcamRef} />
			<canvas ref={canvasRef}></canvas>
		</div>
	);
});
