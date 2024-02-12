import React, { createContext, useContext, useState, } from 'react';


import Web3, { Numbers } from 'web3';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  lightTheme,
} from '@rainbow-me/rainbowkit';

import {
  mainnet,
  goerli
} from 'wagmi/chains';
import { useAccount, useConnect, useEnsName, usePrepareContractWrite, useContractWrite, useWaitForTransaction, useNetwork } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { infuraProvider } from  'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';
import { configureChains, createConfig, WagmiConfig, usePublicClient, useWalletClient } from 'wagmi';

const infuraApiKey="7b40ddeb6ef14608af35b2bedd033531";

const contractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "txskHash",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "seller",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "EthscriptionListedForSale",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "txHash",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "EthscriptionPurchased",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "txHash",
				"type": "bytes32"
			}
		],
		"name": "purchaseEthscription",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "txHash",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "receiveData",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "ethscriptionsForSale",
		"outputs": [
			{
				"internalType": "address",
				"name": "seller",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const { chains, publicClient } = configureChains(
	[mainnet, goerli],
	[
		infuraProvider({apiKey:infuraApiKey}),
	  publicProvider(),

	]
  );
const useValue =  () => {

	const { address, connector, isConnected } = useAccount()
	const { chain, chains } = useNetwork()
	const [network,setNetwork]=useState("goerli");

	const [contractAddress, setContractAddress]=useState<`0x${string}`>(`0x8cAeaAFF5De7549F4d9e581B41B55161c83B5B29`);
	const [blockIndexerComputed, setBlockIndexerComputed]=useState<Numbers | undefined>();
	const [blockIndexerReceived, setBlockIndexerReceived]=useState<Numbers | undefined>();
	const [blockNumber, setBlockNumber]=useState<Numbers | undefined>();
	const [blockBehind, setBlockBehind]=useState<Numbers | undefined>();


	React.useEffect(()=>{
		if(chain?.network && chain.network!=null && chain.network!=undefined){
			if(chain.id==1){
				setNetwork("mainnet");
			}else if(chain.id==5){
				setNetwork("goerli");
			}else{
				setNetwork("goerli");
				console.error("Network not supported")
			}
		}
	},[chain?.network,chain?.id])
	// React.useEffect(()=>{
	// 	const fetchData = async () => {
	// 		const web3 = new Web3(new Web3.providers.WebsocketProvider(`wss://${network}.infura.io/ws/v3/${infuraApiKey}`));

	// 		web3.eth.subscribe('newBlockHeaders').then((subscription) => {
	// 			subscription
	// 				.on('data',async (blockHeader) => {
	// 					const res = await fetch(`/api/ethsindexer/block_status?network=${network}`);
	// 					const { data } = await res.json();
	// 					setBlockIndexerComputed(data.last_imported_block)
	// 					setBlockIndexerReceived(data.current_block_number)
	// 					setBlockNumber(blockHeader.number);
	// 					//@ts-ignore
	// 					setBlockBehind(data.blocks_behind)
	// 				})

	// 		});

	// 	  }
	// 	fetchData()
	// },[network])


	return {
		address,
		connector,
		isConnected,
		contractAddress,
		contractABI,
		blockNumber,
		blockIndexerReceived,
		blockIndexerComputed,
		blockBehind,
		network
	}
}
export const EthWalletContext = React.createContext({} as ReturnType<typeof useValue>)

export const EthWalletProvider: React.FC<React.PropsWithChildren<any>> = (props) => {
    return (

		<EthWalletContext.Provider value={useValue()}>



					<RainbowKitProvider modalSize="compact" theme={lightTheme({
      accentColor: '#4984ee',
      accentColorForeground: 'white',
      borderRadius: 'small',
      fontStack: 'system',
      overlayBlur: 'small',
    })} chains={chains} initialChain={mainnet}>




            {props.children}


      			</RainbowKitProvider>




				  </EthWalletContext.Provider>

    )
}



