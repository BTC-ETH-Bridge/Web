import React, { useContext, useState, useEffect } from "react";
import { BtcWalletContext } from "../utils/BtcWalletContext";
import { IoChevronDown,IoChevronUp } from "react-icons/io5";
import {BsCheck} from "react-icons/bs";

export default function Account() {

    const { wallet, openModal, disconnect, changeNetwork, ellipseAddress } =
    useContext(BtcWalletContext);
    const [menu,setMenu]=useState(false);
    const [isHashiconClicked, setIsHashiconClicked] = useState(false);

  async function toggleNetwork() {
    if (wallet.network === "signet") {
      changeNetwork("mainnet");
    } else if (wallet.network === "mainnet" || wallet.network === "livenet") {
      changeNetwork("testnet");
    } else if(wallet.network === "testnet"){
      changeNetwork("signet");
    }
  }

  function toggleMenu(){
    setMenu(!menu);
  }
  function connect() {
      openModal()
  }


  function copyClipboard() {
    if (wallet.connect) {
        navigator.clipboard.writeText(wallet.address)
        setIsHashiconClicked(true);
        setTimeout(() => {
            setIsHashiconClicked(false);
        }, 500);
    }
}


  return (
    <div className="account_wrapper" >
        {wallet.load || !wallet.connect?
            <button className="connect cursor-pointer" disabled={wallet.load} onClick={connect}>{!wallet.load?"Connect":"Loading"}</button>
        :

            <div className="flex flex-col w-full  justify-start gap-3">
             <button className="account" disabled={wallet.load} onClick={toggleMenu}>
             <div className={`${"iconContainer"} ${isHashiconClicked ? "grayFilter" : ''}`} onClick={copyClipboard}>
  {isHashiconClicked && <BsCheck className="checkIcon" />}
</div>

          <div>{ellipseAddress()}</div>
          {menu ? <IoChevronUp/> : <IoChevronDown/>}
        </button>

            <div className={menu?"menu_open ":"menu_close"}>
              <button  disabled={wallet.load} onClick={toggleNetwork}>
                {wallet.load ? "Loading" :wallet.network}
              </button>
             <button disabled={wallet.load} onClick={disconnect}>
                  Disconnect
              </button>
              </div>
              
            </div>
    
            }

        </div>
  )
}
