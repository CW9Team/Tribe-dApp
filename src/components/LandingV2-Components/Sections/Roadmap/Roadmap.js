//- React imports
import React from 'react';

//- Styles Imports
import styles from './Roadmap.module.css';

import TribeLogo from './assets/TribeLogo.png';

const RoadmapSection = ({ id }) => {
	return (
		<section className={styles.Container} id={id}>
			<div className={styles.SubContainer}>
				<div className={styles.Content}>
					<section className={styles.StepContainer}>
						<div className={styles.TitleContainer}>
							<h2 className={styles.Title}>RoadMap</h2>
						</div>

						<div className={styles.Central}></div>

						<div className={styles.RoadLeftContainer}>
							<div className={styles.ContentLeft}>
								<h1 className={`${styles.RoadTitle} ${styles.Right}`}>
									Q1 2022
								</h1>
								<li className={styles.RoadTextLeft}>
									Launch the first Celebrity TribePop collection ⏳
								</li>
								<li className={styles.RoadTextLeft}>
									Begin metaverse planning and gameplay ✅
								</li>
								<li className={styles.RoadTextLeft}>
									Listing in a CEX of the Top 10 of CMC ⏳
								</li>
								<li className={styles.RoadTextLeft}>
									Start parallel tests for our own NFT marketplace ✅
								</li>
								<li className={styles.RoadTextLeft}>
									Update to Tribe v1.3 ✅
								</li>
							</div>
							<div className={styles.DashLeft}></div>
							<div className={styles.PercentTop}>
								<img className={styles.Img} src={TribeLogo} />
							</div>
							<div className={styles.TitleLineTop}></div>
							<div className={styles.PCTitleLineTop}></div>
						</div>

						<div className={styles.RoadRightContainer}>
							<div className={styles.DashLeft}></div>
							<div className={styles.ContentRight}>
								<h1 className={`${styles.RoadTitle} ${styles.Left}`}>
									Q2 2022
								</h1>
								<li className={styles.RoadTextRight}>
									Tribe v2 Release (Landing Page + Pitch Deck) ⏳
								</li>
								<li className={styles.RoadTextRight}>
									Metaverse development and game (First tests) ⏳
								</li>
								<li className={styles.RoadTextRight}>
									VR TribePop NFT Beta Testing ⏳
								</li>
							</div>
							<div className={styles.Percent}></div>
							<div className={styles.TitleLine}></div>
							<div className={styles.PCTitleLineRight}></div>
						</div>

						<div className={styles.RoadLeftContainer}>
							<div className={styles.ContentLeft}>
								<h1 className={`${styles.RoadTitle} ${styles.Right}`}>
									Q3 2022
								</h1>
								<li className={styles.RoadTextLeft}>
									First public tests of the game ⏳
								</li>
								<li className={styles.RoadTextLeft}>
									Integration of Metaverse and VR to the game ⏳
								</li>
							</div>
							<div className={styles.DashLeft}></div>
							<div className={styles.Percent}></div>
							<div className={styles.TitleLine}></div>
							<div className={styles.PCTitleLineLeft}></div>
						</div>

						<div className={styles.RoadRightContainer}>
							<div className={styles.DashLeft}></div>
							<div className={styles.ContentRight}>
								<h1 className={`${styles.RoadTitle} ${styles.Left}`}>
									Q4 2022
								</h1>
								<li className={styles.RoadTextRight}>
									Minimum viable product (MVP) ⏳
								</li>
							</div>
							<div className={styles.Percent}></div>
							<div className={styles.TitleLine}></div>
							<div className={styles.PCTitleLineRight}></div>
						</div>
					</section>
				</div>
			</div>
		</section>
	);
};

export default RoadmapSection;
