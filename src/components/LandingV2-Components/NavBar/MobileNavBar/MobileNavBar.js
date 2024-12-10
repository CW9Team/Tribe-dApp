//- React Imports
import React, { useEffect, useState, createRef } from 'react';

//- Styles Imports
import styles from './MobileNavBar.module.css';

//- Flicking Imports
import Flicking, { FlickingError } from '@egjs/react-flicking';

//- React Router Hash Link Imports
import { HashLink } from 'react-router-hash-link';

const MobileNavBar = ({ sections, scrolled, tops, bottoms }) => {
	////////////
	// STATES //
	////////////
	//- SELECTED STATE
	const [s, setS] = useState(0);
	const [isMoving, setMoving] = useState(false);

	const flicking = createRef();

	////////////////////////
	// FLICKING FUNCTIONS //
	////////////////////////

	const moveToPanel = async (n) => {
		try {
			await flicking.current.moveTo(n);
		} catch (e) {
			// console.log(e instanceof FlickingError); // true
			// console.log(e.code);
		}
	};

	const disable = async () => {
		try {
			await flicking.current.disableInput();
		} catch (e) {
			// console.log(e instanceof FlickingError); // true
			// console.log(e.code);
		}
	};

	const enable = async () => {
		try {
			await flicking.current.enableInput();
		} catch (e) {
			// console.log(e instanceof FlickingError); // true
			// console.log(e.code);
		}
	};

	///////////////
	// FUNCTIONS //
	///////////////

	useEffect(() => {
		sections.map((value, i) => {
			if (s == i) {
				// window.location = '#/#' + value;
				document
					.getElementById(value)
					.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
		});
	}, [s]);

	const setSelected = () => {
		sections.map((value, i) => {
			if (
				Math.round(window.scrollY) + window.innerHeight / 2 >= tops[i] &&
				Math.round(window.scrollY) + window.innerHeight / 2 <= bottoms[i] - 1
			) {
				setS(i);
				moveToPanel(i);
			} else {
			}
		});
	};

	useEffect(() => {
		if (!isMoving) {
			setSelected();
		} else {
			const timer = setTimeout(function () {
				setMoving(false);
				clearInterval(timer);
			}, 1500);
		}
	}, [scrolled]);

	// useEffect(() => {
	// 	const interval = setInterval(() => {
	// 		setMoving(false);
	// 		console.log('Clear inverval');
	// 		clearInterval(interval);
	// 	}, 2000);
	// }, [isMoving]);

	////////////
	// RENDER //
	////////////

	return (
		<nav className={styles.Container}>
			<Flicking
				ref={flicking}
				className={`${styles.NavContainer}`}
				onChanged={(e) => {
					setMoving(true);
					setS(e.index);
				}}
			>
				{sections.map((value, i) => (
					<button
						className={`${styles.Button} ${
							s == i ? styles.Selected : styles.NotSelected
						}`}
						key={i}
						onClick={() => {
							// setMoving(true);
							setS(i);
							document
								.getElementById(value)
								.scrollIntoView({ behavior: 'smooth', block: 'start' });
							moveToPanel(i);
						}}
					>
						<p className={styles.Link}>{value}</p>
					</button>
				))}
			</Flicking>
		</nav>
	);
};

export default MobileNavBar;
