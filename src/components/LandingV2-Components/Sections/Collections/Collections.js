//- Import React
import React, { useEffect, useState, createRef, useMemo } from 'react';
import { Link } from 'react-router-dom';

//- Import Styles
import styles from './Collections.module.css';

//- Import Data
import MemepadLogo from './assets/MemepadLogo.png';
import RightArrow from './assets/RightArrow.png';
import LeftArrow from './assets/LeftArrow.png';

//- Import Button
import ApplyButton from '../../Buttons/ApplyButton/ApplyButton';

//- Flicking Imports
import '@egjs/react-flicking/dist/flicking.css';
import '@egjs/flicking-plugins/dist/flicking-plugins.css';
import Flicking, { ViewportSlot } from '@egjs/react-flicking';
import { Pagination } from '@egjs/flicking-plugins';
import '@egjs/flicking-plugins/dist/pagination.css';
import { Arrow } from '@egjs/flicking-plugins';
import '@egjs/flicking-plugins/dist/arrow.css';

import './FlickingStyles.css';

//- Data Imports
import data from '../../../../data/artist.json';

const CollectionsSection = ({ id }) => {
	//- SELECTED STATE
	const [s, setS] = useState(0);
	const [items, setItems] = useState([]);

	const [plugins, setPlugins] = useState([
		new Arrow({ parentEl: document.body }),
	]);

	useMemo(() => {
		data.data.map((value, i) => {
			if (value.collections) {
				items.push(value);
			}
		});
	}, []);

	////////////
	// RENDER //
	////////////

	return (
		<>
			<div className={styles.BigContainer} id={id}>
				<div className={styles.TitleContainer}>
					<h2 className={styles.Title}>Latest NFT Collections</h2>
				</div>
				<div className={styles.CarouselContainer}>
					<Flicking
						circular={true}
						onChanged={(e) => {
							setS(e.index);
						}}
						defaultIndex={0}
						// plugins={plugins}
						className={styles.Carousel}
						renderOnlyVisible={true}
					>
						{items.map((value, i) => {
							if (value.collections) {
								return (
									<div className={styles.Card}>
										<img
											src={value.collections.logo}
											className={`${styles.Img} ${s == i ? styles.Selected : styles.NotSelected
												}`}
										/>
									</div>
								);
							} else {
							}
						})}

						<ViewportSlot>
							{/* <div className={styles.ArrowContainer}>
								<span className={`flicking-arrow-prev ${styles.ArrowLeft}`}>
									<img src={LeftArrow} />
								</span>
								<span className={`flicking-arrow-next ${styles.ArrowRight}`}>
									<img src={RightArrow} />
								</span>
							</div> */}
						</ViewportSlot>
					</Flicking>
					{/* <div className={styles.ArrowContainer}>
						<span className="flicking-arrow-prev is-outside">
							<img className={styles.ArrowLeft} src={LeftArrow} />
						</span>
						<span className="flicking-arrow-next is-outside">
							<img className={styles.ArrowRight} src={RightArrow} />
						</span>
					</div> */}
				</div>
				{items.map((value, i) => {
					if (value.collections) {
						return (
							<div
								className={`${styles.TextContainer} ${s == i ? styles.TextSelected : styles.TextNotSelected
									}`}
							>
								<h3>{value.name}</h3>
								<p>{value.collections.description}</p>
							</div>
						);
					} else {
					}
				})}

				<div className={styles.DotsContainer}>
					<div
						className={`${styles.TextContainer} ${s == 0 ? styles.DotSelected : styles.DotNotSelected
							}`}
					></div>
				</div>
				<div className={styles.DotsContainer}>
					<div
						className={`${styles.TextContainer} ${s == 1 ? styles.DotSelected : styles.DotNotSelected
							}`}
					></div>
				</div>

				<br />
				{/* <Link to="dashboard/celebrity-nfts">
					<div className={styles.ButtonContainer}>
						<ApplyButton text={'View All Collections'} onClick={{}} />
					</div>
				</Link> */}
				<div className={styles.ButtonContainer}>
					<ApplyButton
						text={'View All Collections'}
						onClick={() => {
							window
								.open(
									'https://tribetoken.app/#/dashboard/celebrity-nfts',
									'_blank',
								)
								.focus();
						}}
					/>
				</div>
			</div>
		</>
	);
};

export default CollectionsSection;
