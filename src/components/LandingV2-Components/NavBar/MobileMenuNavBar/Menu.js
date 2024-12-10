// React Imports
import React, { useEffect, useState } from 'react';

// Styles Imports
import styles from './Menu.module.css';

// Component
const Menu = ({ sections, scrolled, tops, bottoms, isOpen }) => {
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
		<nav className={styles.Container}>
			{sections.map((value, i) => {
				return (
					<button
						className={`${styles.Item} ${
							s == i ? styles.Enable : styles.Disable
						}`}
						key={i}
						onClick={() => {
							setS(i);
							isOpen(false);
							document
								.getElementById(value)
								.scrollIntoView({ behavior: 'smooth', block: 'start' });
						}}
					>
						{value}
					</button>
				);
			})}
		</nav>
	);
};

export default Menu;
