// Importación de React y hooks para manejar el estado y efectos secundarios.
import React, { useState, useEffect } from 'react';

// Importación del hook `useNavigate` para manejar la navegación entre rutas.
import { useNavigate } from 'react-router-dom';

// Importación de componentes de Semantic UI para diseño e interactividad.
import { Header, Button, Segment, Modal, Input } from 'semantic-ui-react';

// Importación de estilos específicos para este componente.
import '../styles/Start.css';

// Componente principal de la pantalla de inicio.
const Inicio = () => {
	// Hook para redireccionar a otras rutas.
	const navigate = useNavigate();

	// Estado para almacenar la API key ingresada por el usuario.
	const [apiKey, setApiKey] = useState('');

	// Estado para controlar si el modal (cuadro emergente) está abierto o cerrado.
	const [isModalOpen, setModalOpen] = useState(false);

	// Efecto que guarda la API key desde el archivo `.env` en el localStorage al montar el componente.
	useEffect(() => {
		const apiKeyFromEnv = import.meta.env.VITE_API_KEY; // Obtiene la API key desde las variables de entorno.
		if (apiKeyFromEnv) {
			localStorage.setItem('apiKey', apiKeyFromEnv); // Guarda la API key en el almacenamiento local.
		}
	}, []); // El array vacío asegura que este efecto se ejecute solo una vez.

	// Función que navega a la página "SelectLetter" al hacer clic en el botón "Iniciar".
	const handleClickStart = () => {
		navigate('/SelectLetter');
	};

	// Función que alterna el estado del modal (abrir/cerrar).
	const toggleModal = () => {
		setModalOpen(!isModalOpen);
	};

	// Función que guarda la API key ingresada en el almacenamiento local y cierra el modal.
	const handleSaveApiKey = () => {
		localStorage.setItem('apiKey', apiKey);
		toggleModal();
	};

	return (
		<div className='area centered-container'>
			{/* Elementos visuales decorativos (círculos animados). */}
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
				{/* Encabezado principal con los botones. */}
				<Header as='h1' textAlign='center' className='center'>
					{/* Botón para iniciar. */}
					<Segment basic={true}>
						<Button color='blue' size='massive' onClick={handleClickStart}>
							Iniciar
						</Button>
					</Segment>

					{/* Botón para abrir el modal e ingresar una API key. */}
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

			{/* Modal para que el usuario pueda ingresar una API key manualmente. */}
			<Modal open={isModalOpen} onClose={toggleModal} size='small'>
				{/* Título del modal. */}
				<Modal.Header>Ingresa tu API Key</Modal.Header>
				{/* Contenido del modal: un cuadro de texto para la API key. */}
				<Modal.Content>
					<Input
						fluid
						placeholder='Escribe tu API Key aquí...'
						value={apiKey}
						onChange={(e) => setApiKey(e.target.value)}
					/>
				</Modal.Content>
				{/* Botones de acción en el modal: cancelar o guardar la API key. */}
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

// Exportación del componente para ser utilizado en otras partes de la aplicación.
export default Inicio;
