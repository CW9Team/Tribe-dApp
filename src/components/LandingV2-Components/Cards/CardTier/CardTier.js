//- React Imports
import React from 'react';

//- Style Imports
import styles from './CardTier.module.css';

//- Button Imports
import FlatButton from '../../Buttons/FlatButton/FlatButton';

// CARD TIER COMPONENT - COMPONENTE PARA UTILIZAR EN TIER SECTION
// onClick: La funcion que activa el boton BUY
// allocation: STRING - Texto que está por encima del Buy On, son los beneficios de cada Tier
// price: STRING NUMBER - El Precio del NFT
// image: STRING - Url de la imagen
// logo: STRING - Url del logo

const CardNFT = ({ onClick, allocation, price, image, logo, index, s }) => {
	return (
		<div className={`${styles.NftCard} ${s == index ? styles.Selected : styles.NotSelected}`}>
			<img src={image} className={styles.NftImage} />
			<img src={logo} className={styles.NftLogo} />

			<div className={styles.NftDataContainer}>
                <h5>{price} $TRIBEX</h5>
                <h4>Required Staked Tokens</h4>    
				<h6>Odds Ratios</h6>
				<h2>{allocation}</h2>
                <h3>Buy On</h3>
                <FlatButton text={'PancakeSwap'} onClick={onClick} small />
			</div>
		</div>
	);
};

export default CardNFT;