// Importamos React y los hooks necesarios.
import React, { useState } from 'react';

// Importamos los componentes necesarios de react-router-dom y Semantic UI.
import { useNavigate } from 'react-router-dom';
import { Button, Loader, Message, Modal, Input } from 'semantic-ui-react';

const Deleted = () => {
	// Inicializamos useNavigate para redirigir a otras páginas.
	const navigate = useNavigate();

	// Definimos los estados para manejar la lógica del componente.
	const [loading, setLoading] = useState(false); // Indicador de carga.
	const [error, setError] = useState(null); // Estado para errores.
	const [success, setSuccess] = useState(false); // Estado para éxito.
	const [isModalOpen, setModalOpen] = useState(false); // Controla la visibilidad del modal.
	const [inputId, setInputId] = useState(''); // Almacena el ID ingresado por el usuario.

	// Obtenemos la API key almacenada en localStorage.
	const apiKey = localStorage.getItem('apiKey');

	// Función asincrónica para eliminar un registro basado en el ID proporcionado.
	const deleteRecord = async (id) => {
		// Reseteamos los estados antes de iniciar la operación.
		setLoading(true);
		setError(null);
		setSuccess(false);

		try {
			// Hacemos una solicitud DELETE al endpoint correspondiente.
			const response = await fetch(
				import.meta.env.VITE_API_URL + 'deleted/' + id,
				{
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						'x-api-key': apiKey, // Incluimos la API key en los encabezados.
					},
				}
			);

			// Si la respuesta no es exitosa, lanzamos un error.
			if (!response.ok) {
				throw new Error('Error al eliminar el registro');
			}

			// Si la eliminación fue exitosa, actualizamos el estado.
			setSuccess(true);
		} catch (err) {
			// Si ocurre un error, lo registramos en el estado.
			setError(err.message);
		} finally {
			// Independientemente del resultado, ocultamos el loader y cerramos el modal.
			setLoading(false);
			setModalOpen(false);
		}
	};

	// Función para alternar la visibilidad del modal.
	const toggleModal = () => {
		setModalOpen(!isModalOpen);
	};

	// Función para redirigir al usuario a la página de inicio.
	const handleRedirect = () => {
		navigate('/'); // Cambia la ruta según tu necesidad.
	};

	return (
		<div style={{ textAlign: 'center', padding: '2rem' }} className='area'>
			{/* Mostrar mensajes de estado: cargando, éxito o error */}
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
				{/* Botón para redirigir al inicio */}
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

			{/* Modal para ingresar el ID a eliminar */}
			<Modal open={isModalOpen} onClose={toggleModal} size='small'>
				<Modal.Header>Eliminar Registro</Modal.Header>
				<Modal.Content>
					{/* Input para capturar el ID */}
					<Input
						fluid
						placeholder='Ingresa el ID del registro a eliminar...'
						value={inputId}
						onChange={(e) => setInputId(e.target.value)}
					/>
				</Modal.Content>
				<Modal.Actions>
					{/* Botón para cerrar el modal */}
					<Button color='grey' onClick={toggleModal}>
						Cancelar
					</Button>
					{/* Botón para confirmar la eliminación */}
					<Button
						color='red'
						onClick={() => deleteRecord(inputId)}
						disabled={!inputId.trim()} // Deshabilitar si el ID está vacío.
					>
						Eliminar
					</Button>
				</Modal.Actions>
			</Modal>
		</div>
	);
};

// Exportamos el componente para ser utilizado en otras partes de la aplicación.
export default Deleted;
