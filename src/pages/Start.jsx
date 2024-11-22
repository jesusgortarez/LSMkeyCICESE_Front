import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Button, Segment, Modal, Input } from 'semantic-ui-react';
import '../styles/Start.css';

const Inicio = () => {
	const navigate = useNavigate();
	const [apiKey, setApiKey] = useState('');
	const [isModalOpen, setModalOpen] = useState(false);

	// Guardar API key de .env en localStorage cuando el componente se monte
	useEffect(() => {
		const apiKeyFromEnv = import.meta.env.VITE_API_KEY; // Usamos import.meta.env
		if (apiKeyFromEnv) {
			localStorage.setItem('apiKey', apiKeyFromEnv); // Guarda la API key en localStorage
		}
	}, []); // El array vacío asegura que solo se ejecute una vez al montar el componente

	// Manejar clic en "Vamos a jugar!"
	const handleClickStart = () => {
		navigate('/SelectLetter');
	};

	// Abrir/cerrar el cuadro de texto para ingresar la API key
	const toggleModal = () => {
		setModalOpen(!isModalOpen);
	};

	// Guardar la API key ingresada
	const handleSaveApiKey = () => {
		localStorage.setItem('apiKey', apiKey);
		toggleModal();
	};

	return (
		<div className='area centered-container'>
			<ul className='circulos'>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>

			<div className='centered-content'>
				<Header as='h1' textAlign='center' className='center'>
					{/* Botón "Vamos a jugar!" */}
					<Segment basic={true}>
						<Button color='blue' size='massive' onClick={handleClickStart}>
							Iniciar
						</Button>
					</Segment>

					{/* Botón para ingresar API key */}
					<Segment basic={true}>
						<Button
							color='green'
							size='massive'
							onClick={toggleModal}
							style={{ marginTop: '20px' }}
						>
							Ingresar API Key
						</Button>
					</Segment>
				</Header>
			</div>

			{/* Modal para ingresar API key */}
			<Modal open={isModalOpen} onClose={toggleModal} size='small'>
				<Modal.Header>Ingresa tu API Key</Modal.Header>
				<Modal.Content>
					<Input
						fluid
						placeholder='Escribe tu API Key aquí...'
						value={apiKey}
						onChange={(e) => setApiKey(e.target.value)}
					/>
				</Modal.Content>
				<Modal.Actions>
					<Button color='red' onClick={toggleModal}>
						Cancelar
					</Button>
					<Button color='green' onClick={handleSaveApiKey}>
						Guardar
					</Button>
				</Modal.Actions>
			</Modal>
		</div>
	);
};

export default Inicio;
