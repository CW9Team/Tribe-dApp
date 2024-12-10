//- Import React
import React from 'react';

//- Import Styles
import styles from './Tribepop.module.css';

//- Import Images
import PlebCharacter from './assets/small-baby.png';
import LargePlebCharacter from './assets/baby.png';
import Stroke from './assets/Stroke.png';

//- Page Images Imports
//Mobile
import CoinMobile from './assets/coinmarketMOBILE.png';
import PancakeMobile from './assets/pancakeMOBILE.png';
import MemeMobile from './assets/memepadMOBILE.png';
import GeckoMobile from './assets/CoingekoMOBILE.png';
import BscMobile from './assets/bscMOBILE.png';
import RefinableMobile from './assets/refinableMOBILE.png';
import BabyMobile from './assets/babyswapMOBILE.png';
import BeMobile from './assets/beMOBILE.png';
//PC
import CoinPC from './assets/coinmarketPC.png';
import PancakePC from './assets/pancakePC.png';
import MemePC from './assets/memepadPC.png';
import GeckoPC from './assets/CoingekoPC.png';
import BscPC from './assets/bscPC.png';
import RefinablePC from './assets/refinablePC.png';
import BabyPC from './assets/babyswapPC.png';
import BePC from './assets/bePC.png';

const TribepopSection = ({ id }) => {
	return (
		<section className={styles.Container} id={id}>
			<div className={styles.Subcontainer}>
				<img className={styles.LargeCharacters} src={LargePlebCharacter} />
				<div className={styles.Content}>
					<div className={styles.TribePop}>
						What's a<span className={styles.GradientText}> TribePop </span>?
					</div>
					<img className={styles.Characters} src={PlebCharacter} />
					<p className={styles.Text}>
						All metaverse skin ready characters created <br />
						by <b>TRIBE</b> are <b>TribePops</b>
					</p>
					<div className={styles.TextContainer}>
						<p className={styles.Text} style={{ marginTop: '10px' }}>
							Every brand, athlete, singer, model, actor, <br />
							among others, that works with TRIBE, has <br />
							their own TribePop adapted to different <br />
							situations in their career to create their NFTs.
						</p>
					</div>

					<img className={styles.Stroke} src={Stroke} />
					<p className={styles.Text} style={{ marginTop: '0px' }}>
						All TribePop will be used in our <br />
						<span style={{ color: '#d2219a' }}>
							<b>Metaverse RPG Game</b>
						</span>
					</p>
				</div>
				<div className={styles.Social}>
					{/* Mobile Logos */}
					<img className={styles.Mobile} src={CoinMobile} alt="CoinMarket" />
					<img
						className={styles.Mobile}
						src={PancakeMobile}
						alt="PancakeSwap"
					/>
					<img className={styles.Mobile} src={MemeMobile} alt="Memepad" />
					<img className={styles.Mobile} src={GeckoMobile} alt="CoinGecko" />
					<img className={styles.Mobile} src={BscMobile} alt="BscScan" />
					<img
						className={styles.Mobile}
						src={RefinableMobile}
						alt="Refinable"
					/>
					<img className={styles.Mobile} src={BabyMobile} alt="BabySwap" />
					<img className={styles.Mobile} src={BeMobile} alt="BeInCrypto" />

					{/* PC Logos */}
					<img className={styles.Pc} src={CoinPC} alt="CoinMarket" />
					<img className={styles.Pc} src={PancakePC} alt="PancakeSwap" />
					<img className={styles.Pc} src={MemePC} alt="Memepad" />
					<img className={styles.Pc} src={GeckoPC} alt="CoinGecko" />
					<img className={styles.Pc} src={BscPC} alt="BscScan" />
					<img
						className={styles.Pc}
						style={{ margin: '0px 25px 0px 0px' }}
						src={RefinablePC}
						alt="Refinable"
					/>
					<img
						className={styles.Pc}
						style={{ margin: '0px 25px 0px 25px' }}
						src={BabyPC}
						alt="BabySwap"
					/>
					<img
						className={styles.Pc}
						style={{ margin: '0px 25px 0px 25px' }}
						src={BePC}
						alt="BeInCrypto"
					/>
				</div>
			</div>
		</section>
	);
};

export default TribepopSection;
