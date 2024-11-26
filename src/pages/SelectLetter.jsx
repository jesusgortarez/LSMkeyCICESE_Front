// Importación de React y el hook useState para manejar estados locales.
import React, { useState } from 'react';

// Importación de componentes necesarios de Semantic UI y React Router.
import { Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

// Importación de componentes personalizados utilizados en la página.
import Modelado from '../components/Modelado';
import LetterButtons from '../components/LetterButtons';
import TextInputWithButtons from '../components/TextInputWithButtons';
import HandLandmarkCanvas from '../components/HandLandmarkCanvas';

const SelectLetter = () => {
	// Estado para almacenar la letra seleccionada.
	const [letraActual, estableceLetraActual] = useState('');
	// Estado para almacenar los landmarks recibidos desde FingerMedia.
	const [landmarks, setLandmarks] = useState(null);

	// Inicializa `useNavigate` para redirigir entre rutas.
	const navigate = useNavigate();

	// Función para manejar los datos enviados desde el componente hijo.
	const handleSendData = (data, download) => {
		console.log(data); // Imprime los datos para depuración.
		const Keypoint_array = [data.Keypoints]; // Extrae los puntos clave de los datos recibidos.
		setLandmarks(Keypoint_array); // Almacena los puntos clave en el estado.
		estableceLetraActual(data.Letra); // Actualiza la letra seleccionada.

		// Si `download` es true, descarga los datos como archivo JSON.
		if (download) downloadData(data);
	};

	// Función para descargar los datos como un archivo JSON.
	const downloadData = (data) => {
		// Convierte el objeto `data` a una cadena JSON con formato legible.
		const dataStr = JSON.stringify(data, null, 2);

		// Crea un Blob con el contenido JSON.
		const blob = new Blob([dataStr], { type: 'application/json' });

		// Crea un enlace temporal para descargar el archivo.
		const link = document.createElement('a');
		link.href = URL.createObjectURL(blob);
		link.download = 'data.json'; // Asigna el nombre del archivo.

		// Simula un clic en el enlace para iniciar la descarga.
		link.click();
	};

	// Lista de letras disponibles para seleccionar.
	const letras = [
		'A',
		'B',
		'C',
		'D',
		'E',
		'F',
		'G',
		'H',
		'I',
		'L',
		'M',
		'N',
		'O',
		'P',
		'R',
		'S',
		'T',
		'U',
		'V',
		'W',
		'Y',
	];

	// Función para manejar la selección de una letra desde el componente `LetterButtons`.
	const letterSelect = (letra) => {
		estableceLetraActual(letra); // Actualiza la letra seleccionada en el estado.
	};

	// Color utilizado para el material del modelo 3D.
	const materialColor = '#DF8A5A';

	// Función que redirige a la página "/Colaborar" y guarda la letra seleccionada en localStorage.
	const handleColaborarClick = () => {
		localStorage.setItem('letraActual', letraActual);
		navigate('/Colaborar');
	};

	// Función que redirige a la página "/Borrar".
	const handleBorrarClick = () => {
		navigate('/Borrar');
	};

	return (
		<div>
			<div className='area'>
				{/* Renderización del modelo 3D con la letra actual y puntos clave. */}
				<div className='model-canvas'>
					<Modelado
						letraActual={letraActual}
						materialColor={materialColor}
						rotationAngle={0} // Propiedad opcional para rotación del modelo.
					/>
					<HandLandmarkCanvas keypoint={landmarks} />
				</div>

				{/* Botones para seleccionar letras desde la lista disponible. */}
				<div>
					<LetterButtons
						className='textInputWithButtons'
						letras={letras}
						onSelectLetter={letterSelect}
					/>
				</div>

				{/* Componente para ingresar datos manualmente con botones adicionales. */}
				<div className='textInputWithButtons'>
					<TextInputWithButtons onSendData={handleSendData} />
				</div>

				{/* Botón para colaborar con la letra seleccionada. */}
				<div className='colaborar-button'>
					<Button color='red' onClick={handleColaborarClick} size='small'>
						Colaborar con la letra {letraActual}
					</Button>
				</div>

				{/* Botón para redirigir a la página para borrar registros. */}
				<div className='deleted-button'>
					<Button color='red' onClick={handleBorrarClick} size='small'>
						Borrar un registro
					</Button>
				</div>
			</div>
		</div>
	);
};

// Exporta el componente para su uso en otras partes de la aplicación.
export default SelectLetter;
