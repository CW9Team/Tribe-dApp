// React Imports
import React, { useState, useEffect } from 'react';

//Styles Imports
import styles from './Styles.module.css';

// Img Arrow
import Arrow from './assets/arrow.svg';
import Cross from './assets/cross.svg';

//Component
const MobileMenuNavBar = ({
	sections,
	scrolled,
	tops,
	bottoms,
	open,
	isOpen,
	isClosed,
}) => {
	////////////
	// STATES //
	////////////
	//- SELECTED STATE
	const [s, setS] = useState(0);

	///////////////
	// FUNCTIONS //
	///////////////

	const setSelected = () => {
		sections.map((value, i) => {
			if (scrolled >= tops[i] && scrolled <= bottoms[i] - 1) {
				setS(i);
			} else {
			}
		});
	};

	useEffect(() => {
		setSelected();
	}, [scrolled]);

	////////////
	// RENDER //
	////////////

	return (
		<div className={styles.Container}>
			{sections.map((value, i) => {
				return (
					<button
						className={`${styles.Section} ${
							s == i ? styles.Enable : styles.Disable
						}`}
						onClick={() => {
							if (open) {
								isClosed();
							} else {
								isOpen();
							}
						}}
						key={i}
					>
						{value}
						<img
							src={!open ? Arrow : Cross}
							alt={!open ? 'Arrow down' : 'Close cross'}
							width={20}
						/>
					</button>
				);
			})}
		</div>
	);
};

export default MobileMenuNavBar;
