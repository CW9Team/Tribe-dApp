//- Import React
import React from 'react';

//- Import Styles
import styles from './FlatButton.module.css';

//- Import Logo
import PancakeLogo from './assets/PanButton.png';

// FLATBUTTON COMPONENT
// text: STRING - Texto que va en el boton.
// onClick: Function - Funcion que es llamada cuando se hace click en el boton.

// STYLES TAMAÑOS
// NO PASAR ESTOS VALORES AL MISMO TIEMPO (SOLO ELEGIR UNO)
// POR DEFECTO SE LLAMA AL BIG (SI NO SE PASA POR PARÁMETRO UN TAMAÑO LLAMA AL BIG
//////////////////////////        PARA NO TIRAR ERROR)
// - small: true - Boton pequeño.
// - mid: true - Boton mediano.
// - big: true - Boton grande.

const FlatButton = ({ onClick, text, style, small, mid }) => {
	return (
		<button
			className={`${styles.PancakeButton} 
            ${small ? styles.Small : styles.Big}
            ${mid ? styles.Mid : styles.Big}`}
			onClick={onClick}
			style={style}
		>
			{!mid ? <img src={PancakeLogo} /> : ''}
			{text}
		</button>
	);
};

export default FlatButton;
