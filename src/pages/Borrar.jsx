import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Loader, Message, Modal, Input } from 'semantic-ui-react';

const Deleted = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);
	const [isModalOpen, setModalOpen] = useState(false);
	const [inputId, setInputId] = useState(''); // ID ingresado por el usuario
	const apiKey = localStorage.getItem('apiKey');
	// Función para eliminar el registro
	const deleteRecord = async (id) => {
		setLoading(true);
		setError(null);
		setSuccess(false);

		try {
			const response = await fetch(
				import.meta.env.VITE_API_URL + 'deleted/' + id,
				{
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						'x-api-key': apiKey, // Usa la API key almacenada
					},
				}
			);

			if (!response.ok) {
				throw new Error('Error al eliminar el registro');
			}

			setSuccess(true);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
			setModalOpen(false); // Cerrar el modal después de la operación
		}
	};

	// Abrir o cerrar el modal
	const toggleModal = () => {
		setModalOpen(!isModalOpen);
	};

	// Redirigir al usuario a otra página
	const handleRedirect = () => {
		navigate('/'); // Cambia la ruta según tu necesidad
	};

	return (
		<div style={{ textAlign: 'center', padding: '2rem' }} className='area'>
			{/* Mensajes de éxito o error */}
			{loading ? (
				<Loader active inline='centered' size='large'>
					Cargando...
				</Loader>
			) : error ? (
				<Message negative>
					<Message.Header>Error</Message.Header>
					<p>{error}</p>
				</Message>
			) : success ? (
				<Message positive>
					<Message.Header>Éxito</Message.Header>
					<p>El registro ha sido eliminado correctamente.</p>
				</Message>
			) : null}

			<div className='centered'>
				{/* Botón para volver al inicio */}
				<Button
					color='blue'
					onClick={handleRedirect}
					style={{ marginTop: '1rem' }}
				>
					Volver al Inicio
				</Button>

				{/* Botón para abrir el modal */}
				<Button
					color='red'
					onClick={toggleModal}
					style={{ marginTop: '1rem', marginLeft: '1rem' }}
				>
					Eliminar por ID
				</Button>
			</div>

			{/* Modal para ingresar ID */}
			<Modal open={isModalOpen} onClose={toggleModal} size='small'>
				<Modal.Header>Eliminar Registro</Modal.Header>
				<Modal.Content>
					<Input
						fluid
						placeholder='Ingresa el ID del registro a eliminar...'
						value={inputId}
						onChange={(e) => setInputId(e.target.value)}
					/>
				</Modal.Content>
				<Modal.Actions>
					<Button color='grey' onClick={toggleModal}>
						Cancelar
					</Button>
					<Button
						color='red'
						onClick={() => deleteRecord(inputId)}
						disabled={!inputId.trim()}
					>
						Eliminar
					</Button>
				</Modal.Actions>
			</Modal>
		</div>
	);
};

export default Deleted;
