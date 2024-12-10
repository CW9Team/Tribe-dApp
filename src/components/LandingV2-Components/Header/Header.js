//- Last Updated by Alejo - 15/01/2022

//- React Imports
import React, { useState, useEffect } from 'react';

//- Styles Imports
import styles from './Header.module.css';

//- Components Imports
import { Link } from 'react-router-dom';
import { FlatButton } from '../..';
import MobileNavBar from '../NavBar/MobileNavBar/MobileNavBar';
import MobileMenuNavBar from '../NavBar/MobileMenuNavBar/MobileMenuNavBar';
import Menu from '../NavBar/MobileMenuNavBar/Menu';
import NavBar from '../NavBar/DefaultNavBar/NavBar';

const Header = ({ sections }) => {
	////////////
	// STATES //
	////////////

	// Scrolled value
	const [scrolled, setScrolled] = useState(0);
	// Set the timer that stop the scroll
	const [timer, setTimer] = useState(null);
	// Set if the scroll is stoped
	const [isMoving, setMoving] = useState(false);
	// Sections Boxes sizes
	// Top Size Array
	const [tops, setTops] = useState([]);
	// Bottom Size Array
	const [bottoms, setBottoms] = useState([]);

	//Menu State
	const [isOpen, setOpen] = useState(false);

	useEffect(() => {
		const interval = window.setInterval(() => {
			window.addEventListener(
				'scroll',
				(e) => {
					setScrolled(Math.round(window.scrollY) + window.innerHeight / 2);
					// console.log(Math.round(window.scrollY) + window.innerHeight / 2);
				},
				false,
			);
			sections.map((value, i) => {
				tops.push(document.getElementById(value).offsetTop);
				bottoms.push(
					(bottoms[0] ? bottoms[i - 1] : 0) +
					document.getElementById(value).clientHeight,
				);
			});

			window.clearInterval(interval);
			// console.log(tops, bottoms);
		}, 500);
	}, []);

	////////////
	// RENDER //
	////////////

	return (
		<header
			className={`${styles.Container} ${isOpen ? styles.Blacked : styles.Transparent
				}`}
		>
			<div className={styles.Subcontainer}>
				<a className={styles.Logo} href="">
					Tribe
				</a>

				{window.matchMedia('(min-width: 1024px)').matches ? (
					<NavBar
						sections={sections}
						tops={tops}
						bottoms={bottoms}
						scrolled={scrolled}
					/>
				) : (
					''
				)}
				<div className={styles.Button}>
					{/* <Link to="/dashboard">
						<FlatButton
							mid
							text={'Enter Application'}
							style={{ width: 'auto' }}
						/>
					</Link> */}
					<FlatButton
						mid
						text={'Enter Application'}
						style={{ width: 'auto' }}
						onClick={() => {
							window
								.open('http://localhost:3000/#/dashboard/staking', '_blank')
								.focus();
						}}
					/>
				</div>
			</div>
			{window.matchMedia('(max-width: 1024px)').matches ? (
				// <MobileNavBar
				// 	sections={sections}
				// 	tops={tops}
				// 	bottoms={bottoms}
				// 	scrolled={scrolled}
				// />
				<>
					<MobileMenuNavBar
						sections={sections}
						tops={tops}
						bottoms={bottoms}
						scrolled={scrolled}
						open={isOpen}
						isOpen={() => {
							setOpen(true);
						}}
						isClosed={() => {
							setOpen(false);
						}}
					/>
					{isOpen ? (
						<Menu
							sections={sections}
							tops={tops}
							bottoms={bottoms}
							scrolled={scrolled}
							isOpen={(value) => {
								setOpen(value);
							}}
						/>
					) : (
						''
					)}
				</>
			) : (
				''
			)}
		</header>
	);
};

export default Header;
