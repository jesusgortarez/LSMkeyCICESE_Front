import React, { useState, useEffect } from 'react';
import FingerMedia from '../components/FingerMediaSelectHand';
import { Button, Modal } from 'semantic-ui-react';

const SelectHand = () => {
	// Estado para almacenar el landmark recibido de FingerMedia y la respuesta del servidor
	const [landmarks, setLandmarks] = useState(null);
	const [responseData, setResponseData] = useState(null); // Estado para almacenar la respuesta del servidor
	const [openModal, setOpenModal] = useState(false); // Estado para controlar la apertura del modal
	const apiKey = localStorage.getItem('apiKey');

	// Función que se pasará como prop a FingerMedia para manejar el landmark
	const handleLandmarkDetected = (detectedLandmark) => {
		setLandmarks(detectedLandmark);
	};

	const handleClickStart = () => {
		const letra = localStorage.getItem('letraActual');
		if (!landmarks || landmarks.length === 0) {
			setResponseData('No se han detectado los landmarks'); // Guardar la respuesta del servidor
			setOpenModal(true); // Abrir el modal con la respuesta
			return;
		}

		const data = {
			Letra: letra,
			TipoLetra: 'N',
			TestTrainNew: 'New',
			Keypoints: landmarks.map((landmark) => ({
				x: landmark.x,
				y: landmark.y,
				z: landmark.z,
			})),
		};

		fetch(import.meta.env.VITE_API_URL + 'colab', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-api-key': apiKey,
			},
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log('Respuesta del servidor:', data);
				setResponseData(data); // Guardar la respuesta del servidor
				setOpenModal(true); // Abrir el modal con la respuesta
			})
			.catch((error) => {
				console.error('Error al enviar la solicitud:', error);
			});
	};

	// Detectar la tecla barra de espacio
	useEffect(() => {
		const handleKeyPress = (e) => {
			if (e.code === 'Space') {
				// Verificar si los landmarks están disponibles antes de ejecutar la función
				if (landmarks && landmarks.length > 0) {
					handleClickStart(); // Ejecutar la función al presionar la barra de espacio solo si hay landmarks
				} else {
					setResponseData('No se han detectado los landmarks');
					setOpenModal(true); // Mostrar un mensaje en el modal si no hay landmarks
				}
			}
		};

		window.addEventListener('keydown', handleKeyPress);

		return () => {
			window.removeEventListener('keydown', handleKeyPress);
		};
	}, [landmarks]); // Agregar landmarks en las dependencias para asegurarse de que el valor más actualizado se use

	return (
		<div>
			<div className='area'>
				<div>
					<FingerMedia onLandmarkDetected={handleLandmarkDetected} />
				</div>
				<div className='centered-content'>
					<Button color='green' size='massive' onClick={handleClickStart}>
						<Button.Content visible>
							Colaborar o presiona la barra de espacio
						</Button.Content>
					</Button>
				</div>
			</div>

			{/* Modal para mostrar la respuesta del servidor */}
			<Modal
				open={openModal}
				onClose={() => setOpenModal(false)} // Cerrar el modal
				size='small'
			>
				<Modal.Header>Respuesta del Servidor</Modal.Header>
				<Modal.Content>
					<pre>{JSON.stringify(responseData, null, 2)}</pre>
				</Modal.Content>
				<Modal.Actions>
					<Button onClick={() => setOpenModal(false)} color='red'>
						Cerrar
					</Button>
				</Modal.Actions>
			</Modal>
		</div>
	);
};

export default SelectHand;
