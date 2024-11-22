import React, { Suspense } from 'react';
import Mano from './Mano.jsx';
import { Canvas as CanvasFbr, useFrame } from '@react-three/fiber'; // Importa useFrame para controlar la animación del frame

import { useState } from 'react';

function Modelado({ letraActual, materialColor, rotationAngle }) {
	// Agrega rotationAngle como una nueva prop
	const [urlModelo, seturlModelo] = useState('../../manita.glb');

	if (!letraActual) letraActual = 'initial';
	return (
		<Suspense>
			<CanvasFbr
				className='canvasfbr'
				camera={{ position: [2, 0, 12.25], fov: 20 }}
			>
				<directionalLight intensity={2.9} position={[1, 4, 5]} color={'#fff'} />
				{/* Agrega una referencia al modelo para poder aplicar la rotación */}
				<Mano
					letraActual={letraActual}
					materialColor={materialColor}
					rotationAngle={rotationAngle}
				/>
			</CanvasFbr>
		</Suspense>
	);
}

export default Modelado;
