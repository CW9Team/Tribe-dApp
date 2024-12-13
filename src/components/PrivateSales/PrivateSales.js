import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import threeCharacters from '../../images/three_characters.png';
import './privateSales.css';
import Cards from '../Cards/Cards';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import UpcomingCards from '../UpcomingCards/UpcomingCards';
import { useDispatch, useSelector } from 'react-redux';
import { loadLaunchInfo } from '../../store/reducer/launch_reducer';
import { projIds } from '../../store/reducer/launch_reducer/projectInitialStates';
import '../../App.css';
import AnimatedBackground from '../AnimatedBackground/AnimatedBackground';
import { connectWallet, fetchBalance } from '../../store/reducer/web3_reducer';
import connectLogo from '../../images/connect-logo.svg';

function PrivateSales(props) {
	// STATES
	const [showSidebar, setShowSidebar] = useState(true);
	const [modalShow, setModalShow] = useState(false);
	const [title, setTitle] = useState(null);

	const liveLaunches = [],
		completedLaunches = [],
		upcomingLaunches = [];

	// HOOKS
	const dispatch = useDispatch();
	let location = useLocation();
	const allProjects = useSelector((state) => state.launch);
	const { connected, shortAddress, balance } = useSelector(
		(state) => state.web3,
	);

	// HANDLERS
	const getToggleStatus = (props) => {
		setShowSidebar(!showSidebar);
	};
	const fixDecimals = (val, dec = 0) => {
		if (!val || val == Infinity) return 0;
		return val.toLocaleString('fullwide', {
			useGrouping: false,
			maximumFractionDigits: dec,
		});
	};

	// USEEFFECT
	useEffect(() => {
		if (location.pathname === '/dashboard/celebrity-nfts') {
			setTitle('TRIBEPOP NFTs');
		} else if (location.pathname === '/dashboard/staking') {
			setTitle('Staking');
		} else if (location.pathname === '/dashboard/projects') {
			setTitle('Projects');
		}
		const interval = setInterval(() => {
			if (connected) dispatch(fetchBalance());
		}, 3000);
		const interval2 = setInterval(() => {
			if (connected) {
				for (let i = 0; i < projIds.length; ++i) {
					dispatch(loadLaunchInfo(projIds[i]));
				}
			}
		}, 10000);
		return () => {
			clearInterval(interval);
			clearInterval(interval2);
		};
	});

	useEffect(() => {
		const interval = setInterval(() => {
			if (connected) {
				for (let i = 0; i < projIds.length; ++i) {
					dispatch(loadLaunchInfo(projIds[i]));
				}
			}
		}, 10000);
		return () => {
			clearInterval(interval);
		};
	});

	projIds.forEach((val) => {
		const launchCard = (
			<Col lg={4} md={6}>
				<Link key={val} to={`/dashboard/celebrity-nfts/${val}`}>
					<Cards projDetails={allProjects[val]} />
				</Link>
			</Col>
		);
		if (allProjects[val].isFinished) completedLaunches.push(launchCard);
		else if (allProjects[val].startTime * 1000 < Date.now())
			liveLaunches.push(launchCard);
		else upcomingLaunches.push(launchCard);
	});

	return (
		<div className="main-layout">
			{<AnimatedBackground />}
			<aside className={`sidebar-container ${showSidebar && 'sidebar-toggle'}`}>
				<div className="sidebar-body">
					<Sidebar getToggleStatus={getToggleStatus} />
				</div>
			</aside>
			<div className="layout-content">
				<header className="header-container">
					<button
						className="Hamburger_container__3wFvX Header_hamburger2"
						onClick={() => setShowSidebar(!showSidebar)}
					>
						<span
							className={`Hamburger_dash__20BhT ${
								!showSidebar && 'hamburger-first-child'
							}`}
						></span>
						<span
							className={`Hamburger_dash__20BhT ${
								!showSidebar && 'middle-hamburger-hide'
							}`}
						></span>
						<span
							className={`Hamburger_dash__20BhT ${
								!showSidebar && 'hamburger-last-child'
							}`}
						></span>
					</button>
					<div className="header-logo-container">
						{/* <ChristmasLogo mobile /> */}
					</div>
					<strong className="Header_title__2eSkT">{title}</strong>
					<div className="Header_wallet__1DOlJ">
						{connected ? (
							<span className="header-wallet-balance">
								${fixDecimals(balance, 4)}BNB
							</span>
						) : null}
						<button
							onClick={
								connected
									? () => {
											setModalShow(true);
									  }
									: () => {
											dispatch(connectWallet());
									  }
							}
							className="user-btn"
						>
							{connected ? (
								<span>
									{shortAddress}{' '}
									<img
										src={connectLogo}
										alt="Connect Logo"
										width="25"
										height="25"
									/>{' '}
								</span>
							) : (
								'Connect Wallet'
							)}
						</button>
					</div>
				</header>
				<div className="project-banner-container">
					<div className="banner-container-content">
						<div>
							<h2>Launchpad Projects</h2>
							<p>View upcoming projects and our past launches</p>
						</div>
						<div className="banner-img">
							<img src={threeCharacters} alt="Rocket" />
						</div>
					</div>
				</div>
				<Container fluid>
					<Row>
						<Col>
							<div>
								<h2 className="projects-launchTitle">Upcoming Launches</h2>
							</div>
						</Col>
					</Row>
				</Container>
				<Container fluid>
					<Row className="p-4">
						<Col lg={4} md={6}>
							<UpcomingCards />
						</Col>
						<Col lg={4} md={6}>
							<UpcomingCards />
						</Col>
						{upcomingLaunches}
					</Row>
				</Container>
				<Container fluid>
					<Row>
						<Col>
							<div>
								<h2 className="projects-launchTitle">LIVE Launches</h2>
							</div>
						</Col>
					</Row>
				</Container>
				<Container fluid>
					<Row className="p-4">{liveLaunches}</Row>
				</Container>
				<Container fluid>
					<Row>
						<Col>
							<div>
								<h2 className="projects-launchTitle">Completed Launches</h2>
							</div>
						</Col>
					</Row>
				</Container>
				<Container fluid>
					<Row className="p-4">{completedLaunches}</Row>
				</Container>
			</div>
		</div>
	);
}

export default PrivateSales;
