// Importación de componentes que representan las páginas principales de la aplicación.
import Start from './pages/Start';
import Colaborar from './pages/Colaborar';
import SelectLetter from './pages/SelectLetter';
import Borrar from './pages/Borrar';

// Importación de estilos CSS para la aplicación.
import './App.css';

// Importación de librerías para animaciones y manejo de rutas en React.
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import React from 'react';
import { BrowserRouter, Route, useLocation, Routes } from 'react-router-dom';

// Componente que gestiona las transiciones animadas entre rutas.
const AnimatedSwitch = () => {
	// Hook para obtener la ubicación actual del navegador.
	const location = useLocation();

	return (
		// TransitionGroup permite agrupar múltiples transiciones.
		<TransitionGroup className='slide-group'>
			{/* CSSTransition aplica animaciones CSS al cambiar de ruta. */}
			<CSSTransition key={location.pathname} classNames='slide' timeout={450}>
				{/* Routes renderiza el componente correspondiente a la ruta actual. */}
				<Routes location={location}>
					{/* Definición de las rutas disponibles en la aplicación. */}
					<Route path='/' element={<Start />} />
					<Route path='/SelectLetter' element={<SelectLetter />} />
					<Route path='/Colaborar' element={<Colaborar />} />
					<Route path='/Borrar' element={<Borrar />} />
				</Routes>
			</CSSTransition>
		</TransitionGroup>
	);
};

// Componente principal de la aplicación.
export default function App() {
	return (
		<div>
			{/* BrowserRouter gestiona las rutas y la historia de navegación de la aplicación. */}
			<BrowserRouter
				future={{
					// Configuraciones futuras opcionales para `react-router-dom`.
					v7_startTransition: true,
					v7_relativeSplatPath: true,
				}}
			>
				{/* Renderiza el componente con rutas animadas. */}
				<AnimatedSwitch />
			</BrowserRouter>
		</div>
	);
}
