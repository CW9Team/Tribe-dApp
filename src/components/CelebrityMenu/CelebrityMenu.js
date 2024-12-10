///////////////////////////////
// VISTA 1 -  CELEBRITY MENU //
///////////////////////////////

//- React
import React from 'react';

//- Style
import styles from './CelebrityMenu.module.css';

//- Components
// import ChristmasBanner from '../ChristmasComponents/Banners/ChristmasBanner';
import CelebrityCard from '../Cards/CelebrityCard/CelebrityCard';

const CelebrityMenu = ({ cards }) => {
	return (
		<>
			<div className="nft-banner-container">
				<div className="banner-container-content">
					<div>
						<h2>TRIBEPOP NFTs</h2>
						<p>
						Each TRIBEPOP is a characters ready to use in our next role-playing
						game in our metaverse!
						</p>
						<p>
							You can only buy them at this value in this unique opportunity,
							then you can only get one if someone wants to sell
						</p>
					</div>
				</div>
				</div>
			<section className={styles.Container}>
				<div className={styles.Section}>
					<h2 className={styles.Title}>Sales</h2>
					<div className={styles.CardContainer}>{cards}</div>
				</div>
			</section>
		</>
	);
};

export default CelebrityMenu;
