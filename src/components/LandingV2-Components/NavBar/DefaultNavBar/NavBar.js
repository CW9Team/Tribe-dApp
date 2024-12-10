//- Last Update by Alejo - 15/01/2022

//- React Imports
import React, { useState, useEffect } from 'react';

//- Styles Imports
import styles from './NavBar.module.css';

//- React Router Hash Link Imports
import { HashLink } from 'react-router-hash-link';

// Hay que añadir un Listener para que tome cuando el valor scrollTop de cada sección
// cambia de 0 a 1 para cambiar los elementos en la navbar.

const NavBar = ({ sections, scrolled, tops, bottoms }) => {
	////////////
	// STATES //
	////////////
	//- SELECTED STATE
	const [s, setS] = useState();

	///////////////
	// FUNCTIONS //
	///////////////

	// useEffect(() => {
	// 	sections.map((value, i) => {
	// 		if (s == i) {
	// 			window.location = '#/#' + value;
	// 			document
	// 				.getElementById(value)
	// 				.scrollIntoView({ behavior: 'smooth', block: 'start' });
	// 		}
	// 	});
	// }, [s]);

	const setSelected = () => {
		sections.map((value, i) => {
			if (scrolled >= tops[i] && scrolled <= bottoms[i] - 1) {
				setS(i);
			} else {
			}
		});
	};

	useEffect(() => {
		// if (!isMoving) {
		// 	setSelected();
		// } else {
		// 	const timer = setTimeout(function () {
		// 		setMoving(false);
		// 		clearInterval(timer);
		// 	}, 700);
		// }
		setSelected();
	}, [scrolled]);

	////////////
	// RENDER //
	////////////

	return (
		<>
			<button
				className={styles.Logo}
				onClick={() => {
					setS(0);
					document
						.getElementById('Home')
						.scrollIntoView({ behavior: 'smooth', block: 'start' });
				}}
			>
				Tribe
			</button>
			<nav className={styles.Container}>
				{sections.map((value, i) => {
					// Condicion para filtrar los items de la navbar
					// 0 = Home, 5 = RoadMap, 8 = Apply
					if (i != 0 && i != 5 && i != 8) {
						return (
							<button
								className={`${styles.Button} ${
									s == i ? styles.Selected : styles.NotSelected
								}`}
								key={i}
								onClick={() => {
									setS(i);
									document
										.getElementById(value)
										.scrollIntoView({ behavior: 'smooth', block: 'start' });
								}}
							>
								<p className={styles.Link}>{value}</p>
							</button>
						);
					}
				})}
			</nav>
		</>
	);
};

export default NavBar;
