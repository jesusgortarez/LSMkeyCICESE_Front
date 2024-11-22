import React, { useState } from 'react';
import { Button, Input, Form, Modal } from 'semantic-ui-react';

const TextInputWithButtons = ({ onSendData }) => {
	const [inputs, setInputs] = useState({
		letra: '',
		tipoLetra: '',
		testTrainNew: '',
		fechaCaptura: '',
		fechaActualizada: '',
		fechaToma: '',
	});

	const [modalOpen, setModalOpen] = useState(false); // Estado para abrir el modal
	const [selectedType, setSelectedType] = useState(''); // Para almacenar el tipo de descarga seleccionado
	const apiKey = localStorage.getItem('apiKey');

	// Actualiza los valores de los campos
	const handleChange = (e) =>
		setInputs({ ...inputs, [e.target.name]: e.target.value });

	// Realiza el fetch de manera genérica
	const fetchData = (endpoint, data, download) => {
		const queryParams = new URLSearchParams(data).toString();
		fetch(import.meta.env.VITE_API_URL + `${endpoint}?${queryParams}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'x-api-key': apiKey,
			},
		})
			.then((response) =>
				response.ok ? response.json() : Promise.reject('Error')
			)
			.then((data) => {
				if (download) {
					onSendData(data, download);
				} else {
					onSendData(data, download);
				}
			})

			.catch((error) => console.error('Error al enviar la solicitud:', error));
	};

	// Maneja el clic en los botones
	const handleButtonClick = (type) => {
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
		setSelectedType(type);
		if (type === 'Random') {
			if (endpoints[selectedType])
				fetchData(endpoints[selectedType], data, false);
		} else {
			setModalOpen(true); // Abre el modal para confirmar la descarga
		}
	};

	// Confirmar la descarga
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
		setModalOpen(false); // Cierra el modal
	};

	// Cancelar la descarga
	const cancelDownload = () => {
		setModalOpen(false); // Solo cierra el modal sin hacer nada
	};

	// Definir los botones con colores
	const buttons = [
		{ type: 'Imagenes', color: 'purple' },
		{ type: 'Keypoint', color: 'green' },
		{ type: 'Imagenes_Keypoint', color: 'red' },
		{ type: 'Random', color: 'yellow' },
		{ type: 'Todo', color: 'purple' },
	];

	return (
		<>
			<Form size='tiny'>
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
							placeholder={`Ingrese ${field.replace(/([A-Z])/g, ' $1')}`}
							type={field.includes('fecha') ? 'date' : 'text'}
						/>
					</Form.Field>
				))}
			</Form>

			{/* Modal de confirmación */}
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

export default TextInputWithButtons;
