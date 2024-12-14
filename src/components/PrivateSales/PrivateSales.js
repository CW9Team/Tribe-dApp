import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import threeCharacters from '../../images/three_characters.png';
import Cards from '../Cards/Cards';
import Sidebar from '../sidebar/Sidebar';
import UpcomingCards from '../UpcomingCards/UpcomingCards';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadLaunchInfo } from '../../store/reducer/launch_reducer';
import { projIds } from '../../store/reducer/launch_reducer/projectInitialStates';
import '../../App.css';
import AnimatedBackground from '../AnimatedBackground/AnimatedBackground';
import { connectWallet } from '../../store/reducer/web3_reducer';
import connectLogo from '../../images/connect-logo.svg';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Web3 from 'web3';

export const fetchAccount = createAsyncThunk(
	'FetchAccount',
	async (action, thunkAPI) => {
		try {
			const state = thunkAPI.getState().web3;
			const web3 = state.web3;
			if (state.isPhantom && state.phantomProvider) {
				const address = state.phantomProvider.publicKey.toString();
				const balance = await state.phantomProvider.connection.getBalance(
					state.phantomProvider.publicKey,
				);
				return {
					address,
					balance: balance / 1000000000,
				};
			}
			const address = (await web3.eth.getAccounts())[0];
			if (!address) throw 'Account disconnected';
			const balance = await web3.eth.getBalance(address);
			return {
				address,
				balance: Number(Web3.utils.fromWei(balance)),
			};
		} catch (error) {
			console.log('Error fetching account address', error);
			throw error;
		}
	},
);

function PrivateSales(props) {
	// STATES
	const [showSidebar, setShowSidebar] = useState(true);
	const [modalShow, setModalShow] = useState(false);
	const [title, setTitle] = useState(null);
	const [tokenBalance, setTokenBalance] = useState(0);
	const [isLoading, setIsLoading] = useState(true);

	const liveLaunches = [],
		completedLaunches = [],
		upcomingLaunches = [];

	// HOOKS
	const dispatch = useDispatch();
	let location = useLocation();
	const allProjects = useSelector((state) => state.launch);
	const { connected, shortAddress, balance, isPhantom, address } = useSelector(
		(state) => state.web3,
	);


	async function fetchTokens() {
		console.log('wallet address : ', address)
		const getTokenAccountsResponse = await fetch('https://mainnet.helius-rpc.com/?api-key=201ae82c-0179-4400-aa9f-1dd6ae8dde94', {
			method: 'POST',
			headers: {
			  "Content-Type": "application/json"
			},
			body: JSON.stringify({
			  "jsonrpc": "2.0",
			  "id": 1,
			  "method": "getTokenAccountsByOwner",
			  "params": [
				address,
				{
				  "programId": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
				},
				{
					'commitment': 'processed',
				  "encoding": "base64"
				}
			  ]
			}),
		});
		const parsedData = await getTokenAccountsResponse.json();
		const tokenAccount = parsedData.result.value[0].pubkey;
		console.log('Token account', tokenAccount);

		const getTokenAccountBalanceResponse = await fetch('https://mainnet.helius-rpc.com/?api-key=201ae82c-0179-4400-aa9f-1dd6ae8dde94', {
			method: 'POST',
			headers: {
			  "Content-Type": "application/json"
			},
			body: JSON.stringify({
			  "jsonrpc": "2.0",
			  "id": 1,
			  "method": "getTokenAccountBalance",
			  "params": [
				tokenAccount
			  ]
			}),
		});
		const parsedBalanceData = await getTokenAccountBalanceResponse.json();
		console.log('--> finall data : ', parsedBalanceData.result.value.uiAmount);
	}


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

	const MINIMUM_TOKEN_REQUIREMENT = 100000;

	useEffect(() => {
		if (location.pathname === '/dashboard/celebrity-nfts') {
			setTitle('TRIBEPOP NFTs');
		} else if (location.pathname === '/dashboard/staking') {
			setTitle('Staking');
		} else if (location.pathname === '/dashboard/projects') {
			setTitle('Projects');
		}
		const interval2 = setInterval(() => {
			if (connected) {
				for (let i = 0; i < projIds.length; ++i) {
					dispatch(loadLaunchInfo(projIds[i]));
				}
			}
		}, 10000);
		return () => {
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
					<button onClick={() => fetchTokens()}>Check tokens</button>
					<div className="Header_wallet__1DOlJ">
						{connected ? (
							<span className="header-wallet-balance">
								{isPhantom
									? `${fixDecimals(balance, 4)} SOL`
									: `${fixDecimals(balance, 4)} BNB`}
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

				{isLoading ? (
					<div className="text-center mt-5">
						<h2>Loading...</h2>
					</div>
				) : !connected ? (
					<div className="text-center mt-5">
						<h2>Please connect your wallet to access private sales</h2>
					</div>
				) : tokenBalance < MINIMUM_TOKEN_REQUIREMENT ? (
					<div className="text-center mt-5">
						<h2>Insufficient Token Balance</h2>
						<p>
							You need to hold at least{' '}
							{MINIMUM_TOKEN_REQUIREMENT.toLocaleString()} tokens to access
							private sales.
						</p>
						<p>Your current balance: {tokenBalance.toLocaleString()} tokens</p>
					</div>
				) : (
					<>
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
					</>
				)}
			</div>
		</div>
	);
}

export default PrivateSales;
