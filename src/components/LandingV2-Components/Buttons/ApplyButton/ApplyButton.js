//- Import React
import React from 'react';

//- Import Styles
import styles from './ApplyButton.module.css';

//- Import Logo
import WhitePaper from './assets/Paper.png';
import SolidProof from './assets/SolidProof.png';

// FLATBUTTON COMPONENT
// text: STRING - Texto que va en el boton.
// onClick: Function - Funcion que es llamada cuando se hace click en el boton.

// STYLES TAMAÑOS
// NO PASAR ESTOS VALORES AL MISMO TIEMPO (SOLO ELEGIR UNO)
// POR DEFECTO SE LLAMA AL BOTON SIN IMAGEN (SI NO SE PASA POR PARÁMETRO UN TAMAÑO LLAMA AL Apply
//////////////////////////        PARA NO TIRAR ERROR)
// - paper: true - Boton con imagen WhitePaper.
// - solid: true - Boton con imagen SolidProof.
// - Apply: true - Boton sin imagen.

const ApplyButton = ({ onClick, text, style, paper, solid }) => {
	return (
		<button
			className={`${styles.ApplyButton} 
            ${paper ? styles.Paper : styles.Apply}
            ${solid ? styles.Solid : styles.Apply}`}
			onClick={onClick}
			style={style}
		>
			<img className={styles.PaperLogo} src={WhitePaper} />
			<img className={styles.SolidLogo} src={SolidProof} />
			<p className={styles.Text}>{text}</p>
		</button>
	);
};

export default ApplyButton;
