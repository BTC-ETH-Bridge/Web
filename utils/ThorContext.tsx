import React, { createContext, useContext, useState, } from 'react';
import { assetAmount, assetFromStringEx, assetToBase } from '@xchainjs/xchain-util'
import {
  CryptoAmount,
  QuoteSwapParams,
  ThorchainQuery,
  TxDetails,
  SwapEstimate,
} from '@xchainjs/xchain-thorchain-query'
import { FeeOption } from '@xchainjs/xchain-client'

const useValue =  () => {
  
    
    // Helper function for printing out the returned object
    function print(estimate: SwapEstimate, input: CryptoAmount) {
      const expanded = {
        input: input.formatedAssetString(),
        totalFees: {
          outboundFee: estimate.totalFees.outboundFee.formatedAssetString(),
          affiliateFee: estimate.totalFees.affiliateFee.formatedAssetString(),
        },
        slipBasisPoints: estimate.slipBasisPoints.toFixed(),
        netOutput: estimate.netOutput.formatedAssetString(),
        inboundConfirmationSeconds: estimate.inboundConfirmationSeconds,
        outboundDelaySeconds: estimate.outboundDelaySeconds.toFixed(),
        canSwap: estimate.canSwap,
        errors: estimate.errors,
      }
      return expanded
    }
    function printTx(txDetails: TxDetails, input: CryptoAmount) {
      const expanded = {
        memo: txDetails.memo,
        expiry: txDetails.expiry,
        toAddress: txDetails.toAddress,
        txEstimate: print(txDetails.txEstimate, input),
      }
      console.log(expanded)
    }
  
    // Swap code
    async function swapCode(){
    
      const thorchainQuery = new ThorchainQuery()
    
      let amountToSwap   // amount in source asset
      let fromAsset
      let toAsset
      let toDestinationAddress
      let decimals
    
      // Single Swap Example
      amountToSwap = 0.1
      fromAsset = assetFromStringEx(`BTC.BTC`)
      decimals = 8
      toAsset = assetFromStringEx(`THOR.RUNE`)
      toDestinationAddress = `thor1mmdr75utjg0x3utk9upwez67dec0edxvdck8a7`
    
      const singleSwapParams: QuoteSwapParams = {
        fromAsset: fromAsset,
        destinationAsset: toAsset,
        amount: new CryptoAmount(assetToBase(assetAmount(amountToSwap, decimals)), fromAsset),
        destinationAddress: toDestinationAddress,
        // fromAddress: "bc1qj259zutm3p3yt9lvgz20jmecwzl29w7t32t7wj", // BTC wallet address
        // affiliateBps: 10, //optional
        // affiliateAddress: 'thor1mmdr75utjg0x3utk9upwez67dec0edxvdck8a7', // optional
        toleranceBps: 300, //optional
        interfaceID: "999", // optional
        feeOption: FeeOption.Average // optional
      }
      let estimate: TxDetails = await thorchainQuery.quoteSwap(singleSwapParams)
      printTx(estimate, singleSwapParams.amount)
    
      // Double Swap Example
      amountToSwap = 1000
      fromAsset = assetFromStringEx(`ETH.USDC-0XA0B86991C6218B36C1D19D4A2E9EB0CE3606EB48`)
      decimals = 6
      toAsset = assetFromStringEx(`BTC.BTC`)
      toDestinationAddress = `bc1qj259zutm3p3yt9lvgz20jmecwzl29w7t32t7wj`
    
      const doubleSwapParams: QuoteSwapParams = {
        fromAsset: fromAsset,
        destinationAsset: toAsset,
        amount: new CryptoAmount(assetToBase(assetAmount(amountToSwap, decimals)), fromAsset),
        destinationAddress: toDestinationAddress,
        // fromAddress: "0XA0B86991C6218B36C1D19D4A2E9EB0CE3606EB49", // BTC wallet address
        interfaceID: "123", // optional
        // affiliateBps: 10, //optional
        // affiliateAddress: 'thorxxx', // optional
        //  slipLimit: new BigNumber('0.1'), //optional
      }
      estimate = await thorchainQuery.quoteSwap(doubleSwapParams)
      printTx(estimate, doubleSwapParams.amount)
      return 0
    }
    
    
	

	return {
    print,
    printTx,
    swapCode,
	}
}
export const ThorContext = React.createContext({} as ReturnType<typeof useValue>)

export const ThorProvider: React.FC<React.PropsWithChildren<any>> = (props) => {
    return (

		<ThorContext.Provider value={useValue()}>



				  </ThorContext.Provider>

    )
}



