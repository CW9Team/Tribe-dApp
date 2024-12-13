import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import { initializeLaunches } from '../launch_reducer';
import { initializeStaking } from '../staking_reducer';
import { initializeNFT } from '../purchaseNFT_reducer/indexNFT';
import memepad from '../launch_reducer/memepad.json';

export const connectWallet = createAsyncThunk(
	'ConnectWallet',
	async (action, thunkAPI) => {
		await thunkAPI.dispatch(initWeb3());
		await thunkAPI.dispatch(fetchAccount());
		thunkAPI.dispatch(initializeLaunches());
		thunkAPI.dispatch(initializeStaking());
		thunkAPI.dispatch(initializeNFT());
	},
);

export const initWeb3 = createAsyncThunk(
	'InitWeb3',
	async (action, thunkAPI) => {
		const providerOptions = {
			walletconnect: {
				package: WalletConnectProvider,
				options: {
					rpc: {
						56: 'https://bsc-dataseed1.binance.org',
					},
					chainId: 56,
					network: 'binance',
					qrcode: true,
					qrcodeModalOptions: {
						mobileLinks: ['metamask', 'trust'],
					},
				},
			},
			'custom-phantom': {
				display: {
					name: 'Phantom',
					description: 'Connect to Phantom Wallet',
					logo: 'https://187760183-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F-MVOiF6Zqit57q_hxJYp%2Ficon%2FU7kNZ4ygz4QW1rUwOuTT%2FWhite%20Ghost_docs_nu.svg?alt=media&token=447b91f6-db6d-4791-902d-35d75c19c3d1' // You can replace with actual Phantom logo URL
				},
				package: true,
				connector: async () => {
					if (!window.solana || !window.solana.isPhantom) {
						window.open('https://phantom.app/', '_blank');
						throw new Error('Please install Phantom wallet');
					}
					
					try {
						const resp = await window.solana.connect();
						const provider = window.solana;
						
						// Create a custom provider interface that matches Web3 structure
						const phantomProvider = {
							...provider,
							request: async ({ method, params }) => {
								switch (method) {
									case 'eth_accounts':
										return [provider.publicKey.toString()];
									default:
										throw new Error(`Method ${method} not supported`);
								}
							},
							on: (event, callback) => {
								switch (event) {
									case 'accountsChanged':
										provider.on('accountChanged', callback);
										break;
									case 'chainChanged':
										// Phantom equivalent if needed
										break;
								}
							},
							connection: window.solana.connection,
							publicKey: provider.publicKey
						};
						
						return phantomProvider;
					} catch (err) {
						throw new Error('User rejected the connection');
					}
				}
			}
		};
		const bscTestnet = {
			chainId: '0x61',
			chainName: 'BSCTESTNET',
			rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
				nativeCurrency: {
					name: 'BINANCE COIN',
					symbol: 'BNB',
					decimals: 18,
				},
				blockExplorerUrls: ['https://testnet.bscscan.com/'],
		};
		const bscMainnet = {
			chainId: '0x38',
			chainName: 'BSCMAINET',
			rpcUrls: ['https://bsc-dataseed1.binance.org'],
			nativeCurrency: {
				name: 'BINANCE COIN',
				symbol: 'BNB',
				decimals: 18,
			},
			blockExplorerUrls: ['https://bscscan.com/'],
		};
		const networkData = bscTestnet;
		const web3Modal = new Web3Modal({
			cacheProvider: false, // optional
			providerOptions, // required
			disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
			theme: 'dark',
		});
		try {
			const provider = await web3Modal.connect();
			if (provider.isPhantom) {
				return {
					web3: {
						eth: {
							getAccounts: async () => [provider.publicKey.toString()],
							getBalance: async () => {
								try {
									const balance = await provider.connection.getBalance(provider.publicKey);
									return balance.toString();
								} catch (error) {
									console.error('Error getting Phantom balance:', error);
									return '0';
								}
							}
						}
					},
					isPhantom: true,
					phantomProvider: provider
				};
			}
			if (provider.isMetaMask) {
				try {
					await window.ethereum.request({
						method: 'wallet_switchEthereumChain',
						params: [{ chainId: networkData.chainId }],
					});
				} catch (switchError) {
					// This error code indicates that the chain has not been added to MetaMask.
					if (switchError.code === 4902) {
						try {
							await window.ethereum.request({
								method: 'wallet_addEthereumChain',
								params: networkData,
							});
						} catch (addError) {
							console.log(addError);
						}
					}
				}
			}
			const web3 = new Web3(provider);
			provider.on('accountsChanged', async (accounts) => {
				await thunkAPI.dispatch(fetchAccount());
				thunkAPI.dispatch(initializeStaking());
				thunkAPI.dispatch(initializeLaunches());
				thunkAPI.dispatch(initializeNFT());
			});

			// Subscribe to chainId change
			provider.on('chainChanged', (chainId) => {
				if (chainId !== memepad.network) thunkAPI.dispatch(disconnectWallet());
				else {
					thunkAPI.dispatch(initializeStaking());
					thunkAPI.dispatch(initializeLaunches());
					thunkAPI.dispatch(initializeNFT());
				}
			});
			return {
				web3,
			};
		} catch (error) {
			console.log('Error initializing web3', error);
			throw error;
		}
	},
);

export const fetchAccount = createAsyncThunk(
	'FetchAccount',
	async (action, thunkAPI) => {
		try {
			const web3 = thunkAPI.getState().web3.web3;
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

export const fetchBalance = createAsyncThunk(
	'FetchBalance',
	async (action, thunkAPI) => {
		try {
			const { web3, address } = thunkAPI.getState().web3;
			const balance = await web3.eth.getBalance(address);
			return {
				balance: Number(Web3.utils.fromWei(balance)),
			};
		} catch (error) {
			console.log('Error fetching account balance', error);
			throw error;
		}
	},
);

const web3Slice = createSlice({
	name: 'Web3Reducer',
	initialState: {
		web3: null,
		address: null,
		shortAddress: null,
		balance: null,
		blockNum: null,
		connected: false,
		accountUrl: '#',
		isPhantom: false,
		phantomProvider: null
	},
	reducers: {
		disconnectWallet: (state) => {
			state.connected = false;
		},
	},
	extraReducers: {
		[connectWallet.rejected]: (state) => {
			state.connected = false;
		},
		[initWeb3.fulfilled]: (state, action) => {
			state.web3 = action.payload.web3;
			if (action.payload.isPhantom) {
				state.isPhantom = true;
				state.phantomProvider = action.payload.phantomProvider;
				state.connected = true;
			}
		},
		[fetchAccount.fulfilled]: (state, action) => {
			state.address = action.payload.address;
			state.shortAddress = state.isPhantom 
				? action.payload.address.slice(0, 4) + '...' + action.payload.address.slice(-4)
				: action.payload.address.slice(0, 6) + '...' + action.payload.address.slice(38, 42);
			state.accountUrl = memepad.prefix + action.payload.address;
			state.balance = action.payload.balance;
			state.connected = true;
		},
		[fetchAccount.rejected]: (state) => {
			state.connected = false;
		},
		[fetchBalance.fulfilled]: (state, action) => {
			console.log('balance fetched');
			state.balance = action.payload.balance;
		},
	},
});

export const web3Reducer = web3Slice.reducer;
export const { disconnectWallet } = web3Slice.actions;
