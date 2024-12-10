//- Import React
import React, { useState } from 'react';

//- Import Styles
import styles from './Tiers.module.css';

//- Import Card
import CardTier from '../../Cards/CardTier/CardTier';

//- Import Images
import Caveman from './assets/Caveman.png';
import CavemanLogo from './assets/CavemanLogo.png';
import CryptoKing from './assets/CryptoKing.png';
import CryptoKingLogo from './assets/CryptoKingLogo.png';
import Gladiator from './assets/Gladiator.png';
import GladiatorLogo from './assets/GladiatorLogo.png';

//- Flicking Imports
import Flicking from '@egjs/react-flicking';
import '@egjs/react-flicking/dist/flicking.css';

const TiersSection = ({ id }) => {
	//- SELECTED STATE
	const [luminous, setLuminous] = useState(1)
	
	return (
		<section className={styles.CardContainer} id={id}>
			<div className={styles.TiersContainer}>
				<h2 className={styles.Tiers}>Tiers</h2>
			</div>

			<Flicking 
			circular={false}
			onChanged={(e) => {
				setLuminous(e.index);
				console.log(e.index);
			}} 
			defaultIndex={1} 
			className={styles.Carousel}> 

				<div className={styles.Card}>
					<CardTier 
						onClick={() => {
							window
								.open(
									'https://pancakeswap.finance/swap?outputCurrency=0xc34c85a3d7a84212b6234146773f7939a931a8af',
									'_blank',
								)
								.focus();
						}}
						price={'2,500'}
						allocation={'5 out of 10'}
						image={Caveman}
						logo={CavemanLogo}
						s={luminous}
						index={0}
					/>
					<h3>
						Access to Level 1 <br /> NFTs
					</h3>
				</div>
				<div className={styles.Card}>
					<CardTier
						onClick={() => {
							window
								.open(
									'https://pancakeswap.finance/swap?outputCurrency=0xc34c85a3d7a84212b6234146773f7939a931a8af',
									'_blank',
								)
								.focus();
						}}
						price={'50,000'}
						allocation={'Guaranteed Allocation'}
						image={CryptoKing}
						logo={CryptoKingLogo}
						s={luminous}
						index={1}
					/>
					<h3>
						Access to Exclusive <br /> NFTs
					</h3>
				</div>
				<div className={styles.Card}>
					<CardTier
						onClick={() => {
							window
								.open(
									'https://pancakeswap.finance/swap?outputCurrency=0xc34c85a3d7a84212b6234146773f7939a931a8af',
									'_blank',
								)
								.focus();
						}}
						price={'17,500'}
						allocation={'7 out of 10'}
						image={Gladiator}
						logo={GladiatorLogo}
						s={luminous}
						index={2}
					/>
					<h3>
						Access to Level 2 <br /> NFTs
					</h3>
				</div>
			</Flicking>
			{/* <div className={styles.Standing}>
				<div className={styles.Card}>
					<CardTier
						onClick={'/'}
						price={'2,500'}
						allocation={'5 out of 10'}
						image={Caveman}
						logo={CavemanLogo}
					/>
					<h3>
						Access to Level 1 <br /> NFTs
					</h3>
				</div>
				<div className={styles.Card}>
					<CardTier
						onClick={'/'}
						price={'50,000'}
						allocation={'Guaranteed Allocation'}
						image={CryptoKing}
						logo={CryptoKingLogo}
					/>
					<h3>
						Access to Exclusive <br /> NFTs
					</h3>
				</div>
				<div className={styles.Card}>
					<CardTier
						onClick={'/'}
						price={'17,500'}
						allocation={'7 out of 10'}
						image={Gladiator}
						logo={GladiatorLogo}
					/>
					<h3>
						Access to Level 2 <br /> NFTs
					</h3>
				</div>
			</div> */}
		</section>
	);
};

export default TiersSection;
