// Importación de React, la biblioteca principal para crear interfaces de usuario.
import React from 'react';

// Importación de ReactDOM para renderizar componentes en el DOM.
import ReactDOM from 'react-dom/client';

// Importación del componente principal de la aplicación.
import App from './App';

// Importación de los estilos de Semantic UI, una biblioteca de componentes de interfaz de usuario.
import 'semantic-ui-css/semantic.min.css';

// Obtiene la referencia al elemento raíz del DOM donde se montará la aplicación.
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza el componente principal (<App />) dentro del elemento raíz.
root.render(<App />);
