//- Import React
import React, { useState } from 'react';

//- Import Styles
import styles from './Main.module.css';

//- Components Imports
import { FlatButton } from '../../../index';

//- Flicking Imports
import Flicking from '@egjs/react-flicking';
import { AutoPlay } from '@egjs/flicking-plugins';

//- Import Images
import PlebCharacter3 from './assets/PlebCharacter3.png';
import LargePlebCharacter3 from './assets/LargePlebCharacter3.png';
import Binance from './assets/Binance.png';
import Telegram from './assets/Telegram.png';
import Twitter from './assets/Twitter.png';
import Pancake from './assets/Pankake.png';
import Bsc from './assets/bsc-8 2.png';
import PanButton from './assets/PanButton.png';
import Kings from './assets/Tribepop.png';

const MainSection = ({ id }) => {
	const [plugins, setPlugins] = useState([new AutoPlay()]);

	return (
		<section className={styles.Container} id={id}>
			<div className={styles.Subcontainer}>
				<img className={styles.CharactersLarge} src={Kings} />

				<div className={styles.Content}>
					<div className={styles.Celebrities}>
						<p style={{ margin: 0, textAlign: 'center' }}>We launch</p>
						<div className={styles.MainText}>
							<Flicking
								circular={true}
								horizontal={false}
								plugins={plugins}
								className={styles.AnimatedText}
							>
								<p>Celebrities</p>
								<p>Brands</p>
								<p>Artists</p>
								<p>Sports</p>
							</Flicking>
							<span className={styles.GradientText}> TribePop </span>
						</div>
						<p>on the Metaverse</p>
					</div>
					<p className={styles.Text} style={{ marginTop: '40px', marginBottom: '8px' }}>
						We launch NFTs <br />
						We build the future
					</p>
					<img className={styles.Characters} src={Kings} />

					<p className={styles.TribeText}>
						Buy <b>TRIBE Tokens</b> on
					</p>
					<FlatButton
						text={'PancakeSwap'}
						big
						onClick={() => {
							window
								.open(
									'https://pancakeswap.finance/swap?outputCurrency=0xc34c85a3d7a84212b6234146773f7939a931a8af',
									'_blank',
								)
								.focus();
						}}
					/>
					<p className={styles.Text} style={{ marginTop: '8px' }}>
						Exclusively on <img src={Binance} /> <b>Binance Smart Chain</b>
					</p>
				</div>
				<div className={styles.Images}>
					<a
						title="Telegram"
						href="https://t.me/tribeen"
						target="_blank"
						className={styles.Social}
					>
						<img className={styles.Img} src={Telegram} alt="Telegram" />
					</a>
					<a
						title="Twitter"
						href="https://twitter.com/tribebsc"
						target="_blank"
						className={styles.Social}
					>
						<img className={styles.Img} src={Twitter} alt="Twitter" />
					</a>
					<a
						title="Pancake"
						href="https://pancakeswap.finance/swap?outputCurrency=0xc34c85a3d7a84212b6234146773f7939a931a8af"
						target="_blank"
						className={styles.Social}
					>
						<img className={styles.Img} src={Pancake} alt="Pancake" />
					</a>
					<a
						title="BSCScan"
						href="https://bscscan.com/token/0xc34c85a3d7a84212b6234146773f7939a931a8af"
						target="_blank"
						className={styles.Social}
					>
						<img className={styles.Img} src={Bsc} alt="BSCScan" />
					</a>
				</div>
			</div>
		</section>
	);
};

export default MainSection;
