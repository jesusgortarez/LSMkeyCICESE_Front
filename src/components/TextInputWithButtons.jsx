// Importamos las dependencias necesarias.
import React, { useState } from 'react';
import { Button, Input, Form, Modal } from 'semantic-ui-react';

const TextInputWithButtons = ({ onSendData }) => {
	// Estado para almacenar los valores ingresados por el usuario.
	const [inputs, setInputs] = useState({
		letra: '',
		tipoLetra: '',
		testTrainNew: '',
		fechaCaptura: '',
		fechaActualizada: '',
		fechaToma: '',
	});

	// Estado para controlar la apertura del modal.
	const [modalOpen, setModalOpen] = useState(false);

	// Estado para almacenar el tipo de operación seleccionada por el usuario.
	const [selectedType, setSelectedType] = useState('');

	// Obtenemos la API key almacenada en localStorage.
	const apiKey = localStorage.getItem('apiKey');

	// Actualiza los valores de los inputs conforme el usuario escribe.
	const handleChange = (e) =>
		setInputs({ ...inputs, [e.target.name]: e.target.value });

	// Función genérica para realizar solicitudes GET al servidor.
	const fetchData = (endpoint, data, download) => {
		// Serializamos los parámetros en formato de consulta (query string).
		const queryParams = new URLSearchParams(data).toString();

		// Realizamos la solicitud al servidor.
		fetch(import.meta.env.VITE_API_URL + `${endpoint}?${queryParams}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'x-api-key': apiKey, // Incluimos la API key.
			},
		})
			.then((response) =>
				// Si la respuesta es exitosa, la procesamos como JSON.
				response.ok ? response.json() : Promise.reject('Error')
			)
			.then((data) => {
				// Pasamos los datos al manejador de datos recibido como prop.
				onSendData(data, download);
			})
			.catch((error) =>
				// Manejamos cualquier error que ocurra durante la solicitud.
				console.error('Error al enviar la solicitud:', error)
			);
	};

	// Maneja el clic de los botones, configurando el estado según el tipo seleccionado.
	const handleButtonClick = (type) => {
		// Datos que se enviarán al servidor.
		const data = {
			letra: inputs.letra,
			tipoLetra: inputs.tipoLetra,
			testTrainNew: inputs.testTrainNew,
			fechaCaptura: inputs.fechaCaptura,
			fechaActualizada: inputs.fechaActualizada,
			fechaToma: inputs.fechaToma,
		};

		// Mapeo de los endpoints disponibles.
		const endpoints = {
			Imagenes: 'imagenes',
			Keypoint: 'keypoints',
			Imagenes_Keypoint: 'imagenes-keypoints',
			Random: 'random',
			Todo: 'everything',
		};

		setSelectedType(type);

		// Si el tipo es "Random", hacemos la solicitud directamente.
		if (type === 'Random') {
			if (endpoints[selectedType])
				fetchData(endpoints[selectedType], data, false);
		} else {
			// Para otros tipos, abrimos el modal de confirmación.
			setModalOpen(true);
		}
	};

	// Confirma la descarga del tipo seleccionado.
	const confirmDownload = () => {
		const data = {
			letra: inputs.letra,
			tipoLetra: inputs.tipoLetra,
			testTrainNew: inputs.testTrainNew,
			fechaCaptura: inputs.fechaCaptura,
			fechaActualizada: inputs.fechaActualizada,
			fechaToma: inputs.fechaToma,
		};

		const endpoints = {
			Imagenes: 'imagenes',
			Keypoint: 'keypoints',
			Imagenes_Keypoint: 'imagenes-keypoints',
			Random: 'random',
			Todo: 'everything',
		};

		if (endpoints[selectedType]) fetchData(endpoints[selectedType], data, true);
		setModalOpen(false); // Cerramos el modal.
	};

	// Cancela la descarga, simplemente cerrando el modal.
	const cancelDownload = () => {
		setModalOpen(false);
	};

	// Definimos los botones disponibles y sus colores.
	const buttons = [
		{ type: 'Imagenes', color: 'purple' },
		{ type: 'Keypoint', color: 'green' },
		{ type: 'Imagenes_Keypoint', color: 'red' },
		{ type: 'Random', color: 'yellow' },
		{ type: 'Todo', color: 'purple' },
	];

	return (
		<>
			{/* Formulario para capturar los inputs */}
			<Form size='tiny'>
				{/* Renderizamos los botones */}
				{buttons.map(({ type, color }) => (
					<Button
						key={type}
						size='tiny'
						color={color}
						onClick={() => handleButtonClick(type)}
					>
						{type}
					</Button>
				))}

				{/* Renderizamos los campos de entrada */}
				{[
					'letra',
					'tipoLetra',
					'testTrainNew',
					'fechaCaptura',
					'fechaActualizada',
					'fechaToma',
				].map((field) => (
					<Form.Field key={field}>
						<Input
							name={field}
							value={inputs[field]}
							onChange={handleChange}
							placeholder={`Ingrese ${field.replace(/([A-Z])/g, ' $1')}`} // Formateo de nombre.
							type={field.includes('fecha') ? 'date' : 'text'} // Cambiamos el tipo si es una fecha.
						/>
					</Form.Field>
				))}
			</Form>

			{/* Modal para confirmar la descarga */}
			<Modal open={modalOpen} onClose={cancelDownload}>
				<Modal.Header>Confirmación de descarga</Modal.Header>
				<Modal.Content>
					<p>
						¿Estás seguro de que deseas iniciar la descarga para {selectedType}?
					</p>
				</Modal.Content>
				<Modal.Actions>
					<Button onClick={cancelDownload} color='red'>
						Cancelar
					</Button>
					<Button onClick={confirmDownload} color='green'>
						Confirmar
					</Button>
				</Modal.Actions>
			</Modal>
		</>
	);
};

// Exportamos el componente para que pueda ser usado en otras partes de la aplicación.
export default TextInputWithButtons;
