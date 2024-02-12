import { Fragment } from "react";
import React, { useContext, useState, useEffect } from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import "./global.css";
import { EthWalletProvider } from '../utils/EthWalletContext';
import { BtcWalletProvider } from "../utils/BtcWalletContext";
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
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme
} from '@rainbow-me/rainbowkit';
import Image from "next/image";
import Link from "next/link";
import { BitcoinProvider } from "../utils/BitcoinContext";




function MyApp({ Component, pageProps }: AppProps) {

const infuraApiKey="7b40ddeb6ef14608af35b2bedd033531";

const { chains, publicClient } = configureChains(
	[mainnet, goerli],
	[
		infuraProvider({apiKey:infuraApiKey}),
	  publicProvider(),
	
	]
  );
  
  const { connectors } = getDefaultWallets({
	appName: 'Bitcoin-Ethereum Bridge',
	projectId: '9fd1832dc9bd95806b09bfc279b2066d',
	chains
  });
  
  const wagmiConfig = createConfig({
	autoConnect: true,
	connectors,
	publicClient,

  })

 
  return (
    <Fragment>
      <Head>
        <title>Bitcoin-Ethereum Bridge</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <WagmiConfig config={wagmiConfig}>
        <BitcoinProvider>
      <BtcWalletProvider>
    <EthWalletProvider>
   
    <Component {...pageProps} />

    </EthWalletProvider>
    </BtcWalletProvider>
    </BitcoinProvider>
    </WagmiConfig >
     
    </Fragment>
  );
}

export default MyApp;
