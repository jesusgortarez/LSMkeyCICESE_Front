import React, { useState } from 'react';
import { Button } from 'semantic-ui-react'; // Importamos Button de semantic-ui-react
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate para redirigir
import Modelado from '../components/Modelado';
import LetterButtons from '../components/LetterButtons'; // Importamos el nuevo componente
import TextInputWithButtons from '../components/TextInputWithButtons';
import HandLandmarkCanvas from '../components/HandLandmarkCanvas';

const SelectLetter = () => {
	// Estado para almacenar el landmark recibido de FingerMedia
	const [letraActual, estableceLetraActual] = useState('');
	const [landmarks, setLandmarks] = useState(null);

	const navigate = useNavigate(); // Inicializamos useNavigate

	// Función que maneja los datos enviados desde el componente hijo
	const handleSendData = (data, download) => {
		console.log(data);
		const Keypoint_array = [data.Keypoints];
		setLandmarks(Keypoint_array);
		estableceLetraActual(data.Letra);

		// Descargar el contenido de data
		if (download) downloadData(data);
	};

	// Función para descargar el archivo
	const downloadData = (data) => {
		// Convertir el objeto data a una cadena JSON
		const dataStr = JSON.stringify(data, null, 2); // Indentado para mejorar la legibilidad

		// Crear un Blob con el contenido
		const blob = new Blob([dataStr], { type: 'application/json' });

		// Crear un enlace para descargar el archivo
		const link = document.createElement('a');
		link.href = URL.createObjectURL(blob);
		link.download = 'data.json'; // Nombre del archivo de descarga

		// Simular un clic en el enlace para iniciar la descarga
		link.click();
	};

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

	const letterSelect = (letra) => {
		estableceLetraActual(letra);
	};

	const materialColor = '#DF8A5A';

	// Función para manejar el clic en el botón "Colaborar"
	const handleColaborarClick = () => {
		localStorage.setItem('letraActual', letraActual); // Guardar la letraActual en localStorage
		navigate('/Colaborar'); // Redirigir a la página /Colaborar
	};

	const handleBorrarClick = () => {
		navigate('/Borrar'); // Redirigir a la página /Colaborar
	};
	return (
		<div>
			<div className='area'>
				<div className='model-canvas'>
					<Modelado
						letraActual={letraActual}
						materialColor={materialColor}
						rotationAngle={0}
					/>
					<HandLandmarkCanvas keypoint={landmarks} />
				</div>
				<div>
					<LetterButtons
						className='textInputWithButtons'
						letras={letras}
						onSelectLetter={letterSelect}
					/>
				</div>
				<div className='textInputWithButtons'>
					<TextInputWithButtons onSendData={handleSendData} />
				</div>
				<div className='colaborar-button'>
					{/* Botón Colaborar */}
					<Button color='red' onClick={handleColaborarClick} size='small'>
						Colaborar con la letra {letraActual}
					</Button>
				</div>
				<div className='deleted-button'>
					{/* Botón Borrar */}
					<Button color='red' onClick={handleBorrarClick} size='small'>
						Borrar un registro
					</Button>
				</div>
			</div>
		</div>
	);
};

export default SelectLetter;
