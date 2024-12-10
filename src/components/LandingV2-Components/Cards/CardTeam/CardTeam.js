//- Styles Imports
import styles from './CardTeam.module.css';

//- Import Images
import AgusCTO from './assets/AgusCTO.png';
import AgusDesign from './assets/AgusDesign.png';
import AleManager from './assets/AleManager.png';
import DiegoUX from './assets/DiegoUX.png';
import EliasCCO from './assets/EliasCCO.png';
import FabrizioCMO from './assets/FabrizioCMO.png';
import FacuDev from './assets/FacuDev.png';
import FedeCEO from './assets/FedeCEO.png';
import FedeDev from './assets/FedeDev.png';
import FlorDesign from './assets/FlorDesign.png';
import TomasCFO from './assets/TomasCFO.png';
import EgorGraphic from './assets/EgorGraphic.png';
import JadonDesign from './assets/JadonDesign.png';
import LucasCCO from './assets/LucasCCO.png';
import Circulo from './assets/Circulo.png';

const TeamCard = ({ name, rol, rol2, character, style }) => {
	return (
		<div style={style} className={styles.Container}>
			<img className={styles.Circulo} src={Circulo} />
			<img
				className={styles.Picture}
				src={
					(character == 1 ? AgusCTO : '') +
					(character == 2 ? AgusDesign : '') +
					(character == 3 ? AleManager : '') +
					(character == 4 ? DiegoUX : '') +
					(character == 5 ? EliasCCO : '') +
					(character == 6 ? FabrizioCMO : '') +
					(character == 7 ? FacuDev : '') +
					(character == 8 ? FedeCEO : '') +
					(character == 9 ? FedeDev : '') +
					(character == 10 ? FlorDesign : '') +
					(character == 11 ? TomasCFO : '') +
					(character == 12 ? EgorGraphic : '') +
					(character == 13 ? JadonDesign : '') +
					(character == 14 ? LucasCCO : '')
				}
			/>
			<p className={styles.Text}>
				<b>{name}</b>
			</p>
			<p className={styles.Text}>{rol}</p>
			<p className={styles.Text2}>{rol2}</p>
		</div>
	);
};

export default TeamCard;
