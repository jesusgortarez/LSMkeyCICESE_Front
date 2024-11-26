// Importamos React y los hooks useState y useEffect para manejar estados y efectos secundarios.
import React, { useState, useEffect } from 'react';

// Importamos el componente FingerMedia y componentes de Semantic UI.
import FingerMedia from '../components/MediaPipe';
import { Button, Modal } from 'semantic-ui-react';

const Colaborar = () => {
	// Estado para almacenar los landmarks detectados desde FingerMedia.
	const [landmarks, setLandmarks] = useState(null);

	// Estado para almacenar la respuesta recibida del servidor.
	const [responseData, setResponseData] = useState(null);

	// Estado para controlar la visibilidad del modal.
	const [openModal, setOpenModal] = useState(false);

	// Obtenemos la API key almacenada en localStorage.
	const apiKey = localStorage.getItem('apiKey');

	// Función que se pasa como prop a FingerMedia para actualizar el estado de landmarks.
	const handleLandmarkDetected = (detectedLandmark) => {
		setLandmarks(detectedLandmark);
	};

	// Función que envía los datos al servidor al hacer clic en el botón "Colaborar".
	const handleClickStart = () => {
		// Obtenemos la letra actual desde localStorage.
		const letra = localStorage.getItem('letraActual');

		// Verificamos si hay landmarks disponibles; si no, mostramos un mensaje.
		if (!landmarks || landmarks.length === 0) {
			setResponseData('No se han detectado los landmarks');
			setOpenModal(true); // Abre el modal con el mensaje de error.
			return;
		}

		// Creamos el objeto de datos que será enviado al servidor.
		const data = {
			Letra: letra,
			TipoLetra: 'N', // Especificamos el tipo de letra.
			TestTrainNew: 'New', // Indicamos que se trata de un nuevo registro.
			Keypoints: landmarks.map((landmark) => ({
				x: landmark.x,
				y: landmark.y,
				z: landmark.z,
			})), // Transformamos los landmarks al formato requerido.
		};

		// Realizamos la solicitud POST al servidor.
		fetch(import.meta.env.VITE_API_URL + 'colab', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-api-key': apiKey,
			},
			body: JSON.stringify(data), // Enviamos los datos como JSON.
		})
			.then((response) => response.json()) // Convertimos la respuesta a JSON.
			.then((data) => {
				console.log('Respuesta del servidor:', data);
				setResponseData(data); // Guardamos la respuesta en el estado.
				setOpenModal(true); // Mostramos el modal con la respuesta del servidor.
			})
			.catch((error) => {
				console.error('Error al enviar la solicitud:', error); // Mostramos el error en la consola.
			});
	};

	// Efecto que detecta cuando el usuario presiona la tecla "Barra de espacio".
	useEffect(() => {
		const handleKeyPress = (e) => {
			if (e.code === 'Space') {
				// Si hay landmarks disponibles, ejecuta la función para colaborar.
				if (landmarks && landmarks.length > 0) {
					handleClickStart();
				} else {
					// Si no hay landmarks, muestra un mensaje en el modal.
					setResponseData('No se han detectado los landmarks');
					setOpenModal(true);
				}
			}
		};

		// Agregamos un listener para las teclas.
		window.addEventListener('keydown', handleKeyPress);

		// Eliminamos el listener al desmontar el componente.
		return () => {
			window.removeEventListener('keydown', handleKeyPress);
		};
	}, [landmarks]); // Dependencia para actualizar el efecto cuando cambian los landmarks.

	return (
		<div>
			<div className='area'>
				{/* Componente FingerMedia para capturar los landmarks de la mano. */}
				<div>
					<FingerMedia onLandmarkDetected={handleLandmarkDetected} />
				</div>

				{/* Botón para colaborar, con texto explicativo. */}
				<div className='centered-content'>
					<Button color='green' size='massive' onClick={handleClickStart}>
						<Button.Content visible>
							Colaborar o presiona la barra de espacio
						</Button.Content>
					</Button>
				</div>
			</div>

			{/* Modal para mostrar la respuesta del servidor. */}
			<Modal
				open={openModal}
				onClose={() => setOpenModal(false)} // Función para cerrar el modal.
				size='small'
			>
				<Modal.Header>Respuesta del Servidor</Modal.Header>
				<Modal.Content>
					{/* Mostramos la respuesta del servidor con formato JSON. */}
					<pre>{JSON.stringify(responseData, null, 2)}</pre>
				</Modal.Content>
				<Modal.Actions>
					{/* Botón para cerrar el modal. */}
					<Button onClick={() => setOpenModal(false)} color='red'>
						Cerrar
					</Button>
				</Modal.Actions>
			</Modal>
		</div>
	);
};

// Exportamos el componente para usarlo en otras partes de la aplicación.
export default Colaborar;
