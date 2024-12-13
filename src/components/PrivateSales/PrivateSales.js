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
import { connectWallet, fetchBalance } from '../../store/reducer/web3_reducer';
import connectLogo from '../../images/connect-logo.svg';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Web3 from 'web3';
import { Connection, PublicKey } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

export const fetchAccount = createAsyncThunk(
	'FetchAccount',
	async (action, thunkAPI) => {
		try {
			const state = thunkAPI.getState().web3;
			const web3 = state.web3;
			
			// Handle Phantom wallet
			if (state.isPhantom && state.phantomProvider) {
				const address = state.phantomProvider.publicKey.toString();
				// Get Phantom wallet balance in SOL
				const balance = await state.phantomProvider.connection.getBalance(state.phantomProvider.publicKey);
				return {
					address,
					balance: balance / 1000000000, // Convert lamports to SOL
				};
			}
			
			// Handle MetaMask and other Web3 wallets
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

const TOKEN_CONTRACT_ADDRESS = "DC6vk2HjYLZmT6XAjNdfbBD2Sd3ikkNkoVLzz4QeA9WC";

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
	const { connected, shortAddress, balance, isPhantom } = useSelector(
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

	// Add function to check Solana token balance
	const checkTokenBalance = async (walletAddress) => {
		try {
			const connection = new Connection('https://api.mainnet-beta.solana.com');
			const ownerPublicKey = new PublicKey(walletAddress);
			const tokenPublicKey = new PublicKey(TOKEN_CONTRACT_ADDRESS);

			const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
				ownerPublicKey,
				{
					programId: TOKEN_PROGRAM_ID,
				}
			);

			let balance = 0;
			tokenAccounts.value.forEach((tokenAccount) => {
				const accountData = tokenAccount.account.data.parsed.info;
				if (accountData.mint === tokenPublicKey.toString()) {
					balance = Number(accountData.tokenAmount.amount) / Math.pow(10, accountData.tokenAmount.decimals);
				}
			});

			setTokenBalance(balance);
			setIsLoading(false);
		} catch (error) {
			console.error('Error checking token balance:', error);
			setIsLoading(false);
		}
	};

	// Modify existing useEffect to include token balance check
	useEffect(() => {
		if (connected && shortAddress) {
			checkTokenBalance(shortAddress);
		}
	}, [connected, shortAddress]);

	// Add minimum token requirement
	const MINIMUM_TOKEN_REQUIREMENT = 100000;

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
								{isPhantom ? (
									`${fixDecimals(balance, 4)} SOL`
								) : (
									`${fixDecimals(balance, 4)} BNB`
								)}
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
						<p>You need to hold at least {MINIMUM_TOKEN_REQUIREMENT.toLocaleString()} tokens to access private sales.</p>
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
