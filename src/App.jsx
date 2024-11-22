// Paginas
import Start from './pages/Start';
import Colaborar from './pages/Colaborar';
import SelectLetter from './pages/SelectLetter';
import Borrar from './pages/Borrar';
//
import './App.css';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import React from 'react';
import { BrowserRouter, Route, useLocation, Routes } from 'react-router-dom';

const AnimatedSwitch = () => {
	const location = useLocation();

	return (
		<TransitionGroup className='slide-group'>
			<CSSTransition key={location.pathname} classNames='slide' timeout={450}>
				<Routes location={location}>
					<Route path='/' element={<Start />} />
					<Route path='/SelectLetter' element={<SelectLetter />} />
					<Route path='/Colaborar' element={<Colaborar />} />
					<Route path='/Borrar' element={<Borrar />} />
				</Routes>
			</CSSTransition>
		</TransitionGroup>
	);
};

export default function App() {
	return (
		<div>
			<BrowserRouter
				future={{
					v7_startTransition: true,
					v7_relativeSplatPath: true,
				}}
			>
				<AnimatedSwitch />
			</BrowserRouter>
		</div>
	);
}
