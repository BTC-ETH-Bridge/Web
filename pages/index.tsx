import type { NextPage } from "next";
import React, { useContext, useState, useEffect } from "react";
import { ConnectButton } from '@rainbow-me/rainbowkit';


import Account from "../components/Account";
import { TbSwitchVertical } from "react-icons/tb";
import ModalWallet from "../components/ModalWallet";
import { ThorContext } from "../utils/ThorContext";
const BridgeContainer: NextPage = () => {

  const [eth2Btc,setEth2Btc]=useState(true);
  const {print, printTx, swapCode}=useContext(ThorContext)
  const switchFunction=async ()=>{setEth2Btc(!eth2Btc);await swapCode();};


  return (
    <>

    <div className="w-full flex flex-row items-center justify-center py-[2rem] px-[1.25rem] box-border tracking-[normal] text-left text-[1rem] text-darkslategray font-roboto">
    <ModalWallet />
   
    
      <div className="w-[42rem] rounded-xl bg-white shadow-[0px_2px_4px_-2px_rgba(0,_0,_0,_0.1),_0px_4px_6px_-1px_rgba(0,_0,_0,_0.1),_0px_0px_0px_#000,_0px_0px_0px_#000] overflow-hidden shrink-0 flex flex-col items-center justify-start p-[2rem] box-border gap-[0.75rem] max-w-full mq600:pt-[1.31rem] mq600:pb-[1.31rem] mq600:box-border">
        <div className="self-stretch flex flex-row items-start justify-start py-[0rem] pr-[1.31rem] pl-[0rem] box-border min-h-[6.69rem] max-w-full text-center text-[0.88rem] text-mediumslateblue">
          <div className="flex-1 flex flex-col items-start justify-start gap-[0.06rem] max-w-full">
            <div className="w-[12.75rem] relative tracking-[0.35px] leading-[1.25rem] uppercase font-semibold text-left inline-block">
              BTC-ETH Swap
            </div>
            <div className="self-stretch flex flex-row items-start justify-center py-[0rem] px-[1.25rem] text-[1.5rem] text-gray-100">
              <h3 className="m-0 w-[12.94rem] relative text-inherit leading-[2rem] font-semibold font-inherit inline-block shrink-0 z-[1] mq450:text-[1.19rem] mq450:leading-[1.63rem]">
              Bitcoin-Ethereum Bridge
              </h3>
            </div>
            <div className="self-stretch flex flex-row items-start justify-start py-[0rem] pr-[0rem] pl-[1.31rem] box-border max-w-full text-[1rem] text-slategray">
              <div className="h-[3rem] flex-1 relative leading-[1.5rem] flex items-center justify-center max-w-full">
                Easily swap your BTC and ETH assets natively thanks to Thorchain network.
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-between min-h-[4.25rem] gap-[1.25rem] mq450:flex-wrap">
          <div className="flex flex-col items-start justify-start gap-[0.5rem]">
            <div className="relative leading-[1.5rem]">Bitcoin price (BTC)</div>
            <div className="relative leading-[1.5rem]">Ethereum price (ETH)</div>
          </div>
          <div className="flex flex-col items-end justify-start gap-[0.5rem] text-gray-200">
            <div className="relative leading-[1.5rem] whitespace-nowrap">
              $40,000
            </div>
            <div className="relative leading-[1.5rem] whitespace-nowrap">
              $2,500
            </div>
          </div>
        </div>



        <div className="m-0 self-stretch flex flex-col items-start max-w-full justify-between gap-3">

          <div className="flex flex-row w-full "> 

              <Account />

            <div className="w-full children-max">
                  <ConnectButton label="Connect Ethereum Wallet" chainStatus="name" accountStatus="address" showBalance={false} />
                  </div>
            </div>

          <div className="flex flex-col w-full gap-3"> 
            <div className="flex flex-row items-center justify-between"> 
              <div className=" font-roboto text-darkslategray text-left">
              {eth2Btc?"From (Ethereum):":"From (Bitcoin):"}
              </div>
              <div className=" rounded bg-white  flex flex-row items-center justify-end pt-[0.5rem] pb-[0.63rem] px-[2rem] border-[1px] border-solid border-darkgray-200">
                <input
                  className="w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none  font-roboto text-[1rem] h-[1.25rem] [border:none] [outline:none] text-darkgray-100 text-right  mx-[0.5rem]"
                  placeholder="0.0"
                  type="number"
                />
                {eth2Btc?"ETH":"BTC"}
              </div>
            </div>
            <button className="flex flex-row justify-evenly items-center mx-[30%] h-10 bg-green-500 rounded-md cursor-pointer" onClick={()=>{switchFunction()}}>Switch <TbSwitchVertical /></button>
            <div className="flex flex-row item-center justify-between"> 
              <div className="self-stretch flex flex-col items-center justify-start gap-[0.94rem]">
                <div className="font-roboto text-darkslategray text-left">
                  {eth2Btc?"To (Bitcoin):":"To (Ethereum):"}
                </div>
              </div>
          

             
              <div className="rounded bg-white overflow-hidden flex flex-row items-center justify-end px-[2rem] pt-[0.5rem] pb-[0.63rem] border-[1px] border-solid border-darkgray-200">
                <input
                  className="w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none font-roboto h-[1.25rem] text-[1rem] [border:none] [outline:none]  text-darkgray-100 text-right mx-[0.5rem]"
                  placeholder="0.0"
                  type="number"
                />
                     {eth2Btc?"BTC":"ETH"}
              </div>
              </div>
          </div>


          
          
        </div>




        <input
                  className="w-full [border:none] [outline:none] font-roboto text-[1rem] bg-[transparent] h-[1.25rem] flex-1 relative leading-[1.25rem] text-darkgray-100 text-right inline-block min-w-[10.75rem]"
                  placeholder="0.0 BTC"
                  type="range"
                />

        <div className="self-stretch flex flex-row items-start justify-start pt-[0rem] px-[0rem] pb-[0.75rem] box-border max-w-full">
          <div className="flex-1 flex flex-col items-start justify-start gap-[0.5rem] max-w-full">
            <div className="self-stretch flex flex-row items-start justify-between gap-[1.25rem] mq450:flex-wrap">
              <div className="relative leading-[1.5rem]">Converted Amount:</div>
              <div className="relative leading-[1.5rem] text-gray-200">
                0.0000
              </div>
            </div>
            <div className="self-stretch flex flex-row items-start justify-between gap-[1.25rem] mq450:flex-wrap">
              <div className="relative leading-[1.5rem]">Network Fee:</div>
              <div className="relative leading-[1.5rem] text-gray-200">
                0.0000
              </div>
            </div>
            <div className="self-stretch flex flex-row items-start justify-between gap-[1.25rem] mq450:flex-wrap">
              <div className="relative leading-[1.5rem]">Swap Fee:</div>
              <div className="relative leading-[1.5rem] text-gray-200">
                0.0000
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch h-[1.44rem] relative hidden" />
        <div className="w-[39rem] relative h-[1.5rem] hidden max-w-full" />
        <button className="cursor-pointer [border:none] py-[0.5rem] pr-[1.31rem] pl-[1.25rem] bg-blueviolet self-stretch rounded flex flex-row items-center justify-center hover:bg-darkorchid">
          <b className="relative text-[1rem] leading-[1.5rem] font-roboto text-white text-center">
            Swap Assets
          </b>
        </button>
      </div>
    </div>
    </>
  );
};

export default BridgeContainer;
