import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import threeCharacters from '../../images/three_characters.png';
import Cards from '../Cards/Cards';
import Sidebar from '../sidebar/Sidebar';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadLaunchInfo } from '../../store/reducer/launch_reducer';
import { projIds } from '../../store/reducer/launch_reducer/projectInitialStates';
import '../../App.css';
import './privateSales.css';
import AnimatedBackground from '../AnimatedBackground/AnimatedBackground';
import { connectWallet } from '../../store/reducer/web3_reducer';
import connectLogo from '../../images/connect-logo.svg';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Web3 from 'web3';
import BN from 'bn.js';
import {
	Connection,
	PublicKey,
	Transaction,
	SystemProgram,
	TransactionInstruction,
	LAMPORTS_PER_SOL,
	ComputeBudgetProgram,
} from '@solana/web3.js';
import { getAssociatedTokenAddress, createAssociatedTokenAccountInstruction} from '@solana/spl-token';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
const MINIMUM_TOKEN_REQUIREMENT = 100;

const TIER_THRESHOLDS = {
	TIER1: 300,
	TIER2: 600,
	TIER3: 700,
};

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
	const [tribeBalance, setTribeBalance] = useState(0);
	const [isSwapping, setIsSwapping] = useState(false);
	const [tokenAccount, setTokenAccount] = useState(null);

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
		try {
			setIsLoading(true);
			const getTokenAccountsResponse = await fetch(
				'https://mainnet.helius-rpc.com/?api-key=201ae82c-0179-4400-aa9f-1dd6ae8dde94',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						jsonrpc: '2.0',
						id: 1,
						method: 'getTokenAccountsByOwner',
						params: [
							address,
							{
								programId: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb',
							},
							{
								commitment: 'processed',
								encoding: 'base64',
							},
						],
					}),
				},
			);
			const parsedData = await getTokenAccountsResponse.json();
			const tokenAccount = parsedData.result.value[0].pubkey;
			setTokenAccount(tokenAccount);
			const getTokenAccountBalanceResponse = await fetch(
				'https://mainnet.helius-rpc.com/?api-key=201ae82c-0179-4400-aa9f-1dd6ae8dde94',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						jsonrpc: '2.0',
						id: 1,
						method: 'getTokenAccountBalance',
						params: [tokenAccount],
					}),
				},
			);
			const parsedBalanceData = await getTokenAccountBalanceResponse.json();
			setTokenBalance(parsedBalanceData.result.value.uiAmount);
		} catch (error) {
			console.error('Error fetching tokens:', error);
			setTokenBalance(0);
		} finally {
			setIsLoading(false);
		}
	}

	async function solanaSwap() {
		if (!connected || !address) {
			console.error("Wallet not connected");
			return;
		}
		try {
			setIsSwapping(true);
			const connection = new Connection('https://devnet.helius-rpc.com/?api-key=201ae82c-0179-4400-aa9f-1dd6ae8dde94');
			const transaction = new Transaction();
			const transferAmount = new BN(0.001 * LAMPORTS_PER_SOL);
			const computeBudgetIx = ComputeBudgetProgram.setComputeUnitLimit({
				units: 300000
			});
			transaction.add(computeBudgetIx);
			const swapInstruction = new TransactionInstruction({
				programId: TOKEN_PROGRAM_ID,
				keys: [
					{
						pubkey: new PublicKey(address),
						isSigner: true,
						isWritable: true,
					},
					{
						pubkey: new PublicKey('DC6vk2HjYLZmT6XAjNdfbBD2Sd3ikkNkoVLzz4QeA9WC'),
						isSigner: false,
						isWritable: true,
					},
					{
						pubkey: SystemProgram.programId,
						isSigner: false,
						isWritable: false,
					}
				],
				data: Buffer.from([
					2,
					...transferAmount.toArray('le', 8)
				])
			});

			transaction.add(swapInstruction);
			const { blockhash } = await connection.getLatestBlockhash();
			console.log(blockhash);

			transaction.recentBlockhash = blockhash;
			transaction.feePayer = new PublicKey(address);
			const signedTransaction = await window.solana.signTransaction(transaction);
			const signature = await connection.sendRawTransaction(signedTransaction.serialize());
			await connection.confirmTransaction(signature);
			console.log('Swap successful!', signature);
			await fetchTokens();

		} catch (error) {
			console.error('Error during swap:', error);
		} finally {
			setIsSwapping(false);
		}
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

	useEffect(() => {
		if (location.pathname === '/dashboard/celebrity-nfts') {
			setTitle('TRIBEPOP NFTs');
		} else if (location.pathname === '/dashboard/staking') {
			setTitle('Staking');
		} else if (location.pathname === '/dashboard/projects') {
			setTitle('Projects');
		}
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

	useEffect(() => {
		const checkEligibility = async () => {
			setIsLoading(true);
			if (connected && address) {
				try {
					await fetchTokens();
				} catch (error) {
					console.error('Error fetching token balance:', error);
				}
			}
			setIsLoading(false);
		};

		checkEligibility();
	}, [connected, address]);

	projIds.forEach((val) => {
		const launchCard = (
			<Col lg={4} md={6}>
				<div onClick={() => solanaSwap()}>
					<Cards projDetails={allProjects[val]} />
				</div>
			</Col>
		);
		if (allProjects[val].isFinished) completedLaunches.push(launchCard);
		else if (allProjects[val].startTime * 1000 < Date.now())
			liveLaunches.push(launchCard);
		else upcomingLaunches.push(launchCard);
	});

	const ConnectWalletMessage = () => (
		<div className="message-container">
			<h2 className="message-text">
				Please connect your wallet to access private sales
			</h2>
		</div>
	);

	const InsufficientBalanceMessage = ({ balance }) => (
		<div className="message-container">
			<h2 className="message-text">Insufficient Token Balance</h2>
			<p className="message-description">
				You need to hold at least {MINIMUM_TOKEN_REQUIREMENT.toLocaleString()}{' '}
				tokens to access private sales.
			</p>
			<p className="message-description">
				Your current balance: {balance.toLocaleString()} tokens
			</p>
		</div>
	);

	const getUserTiers = (balance) => {
		const tiers = [];
		if (balance >= TIER_THRESHOLDS.TIER1) tiers.push(1);
		if (balance >= TIER_THRESHOLDS.TIER2) tiers.push(2);
		if (balance >= TIER_THRESHOLDS.TIER3) tiers.push(3);
		return tiers;
	};

	const userTiers = getUserTiers(tokenBalance);

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
					<div className="message-container">
						<h2 className="message-text">Loading...</h2>
					</div>
				) : !connected ? (
					<ConnectWalletMessage />
				) : tokenBalance < TIER_THRESHOLDS.TIER1 ? (
					<InsufficientBalanceMessage balance={tokenBalance} />
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

						{userTiers.includes(1) && (
							<>
								<Container fluid>
									<Row>
										<Col>
											<div>
												<h2 className="projects-launchTitle">TIER 1</h2>
												<p className="tier-requirement">
													Required Balance:{' '}
													{TIER_THRESHOLDS.TIER1.toLocaleString()} TRIBE
												</p>
											</div>
										</Col>
									</Row>
								</Container>
								<Container fluid>
									<Row className="p-4">{liveLaunches}</Row>
								</Container>
							</>
						)}

						{userTiers.includes(2) && (
							<>
								<Container fluid>
									<Row>
										<Col>
											<div>
												<h2 className="projects-launchTitle">TIER 2</h2>
												<p className="tier-requirement">
													Required Balance:{' '}
													{TIER_THRESHOLDS.TIER2.toLocaleString()} TRIBE
												</p>
											</div>
										</Col>
									</Row>
								</Container>
								<Container fluid>
									<Row className="p-4">{liveLaunches}</Row>
								</Container>
							</>
						)}

						{userTiers.includes(3) && (
							<>
								<Container fluid>
									<Row>
										<Col>
											<div>
												<h2 className="projects-launchTitle">TIER 3</h2>
												<p className="tier-requirement">
													Required Balance:{' '}
													{TIER_THRESHOLDS.TIER3.toLocaleString()} TRIBE
												</p>
											</div>
										</Col>
									</Row>
								</Container>
								<Container fluid>
									<Row className="p-4">{completedLaunches}</Row>
								</Container>
							</>
						)}

						{!userTiers.includes(2) && (
							<div className="message-container">
								<h2 className="message-text">Higher Tiers Locked</h2>
								<p className="message-description">
									Hold more TRIBE tokens to unlock higher tiers. Next tier
									requires {TIER_THRESHOLDS.TIER2.toLocaleString()} TRIBE.
								</p>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
}

export default PrivateSales;
