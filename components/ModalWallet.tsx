
// @ts-nocheck

import React, { useContext, useState, useEffect } from "react";
import Modal from "react-modal"
import Image from "next/image";
import Link from "next/link";

import { BtcWalletContext } from "../utils/BtcWalletContext";
import ts from "typescript";

export default function ModalWallet() {
    const { wallet, setWalletType, disconnect, changeNetwork, ellipseAddress,openModal,closeModal } =useContext(BtcWalletContext);

    async function chooseWallet(event: any) {
      await setWalletType(event.target.value);
    }
  return (

       <Modal
    isOpen={wallet.modal}
    onRequestClose={closeModal}
    className="modal"
    overlayClassName="overlay"
    contentLabel="Modal"
    shouldCloseOnEsc={true}
    shouldCloseOnOverlayClick={true}

  >
   <div className="modalContainer  font-roboto ">
    <div className="modalCard">
      {wallet.install.unisat ? (
        <button
          className="modalButton"
          value={"unisat"}
          onClick={chooseWallet}
        >
          <Image
            className="modalLogo"
            src={"/unisat.png"}
            alt="UniSat Wallet"
            width={25}
            height={31}
          />
          Use UniSat
        </button>
      ) : (
        <Link
          className="modalButton"
          href="https://unisat.io/"
          target="_blank"
        >
          <Image
            className="modalLogo"
            src={"/unisat.png"}
            alt="UniSat Wallet"
            width={25}
            height={31}
          />
          Install UniSat
        </Link>
      )}
    </div>
    <div className="modalCard">
      {wallet.install.hiro ? (
        <button
          className="modalButton"
          value={"hiro"}
          onClick={chooseWallet}
        >
          <Image
            className="modalLogo"
            src={"/lether.png"}
            alt="Lether Wallet"
            width={30}
            height={30}
          />
          Use Hiro
        </button>
      ) : (
        <Link
          className="modalButton"
          href="https://wallet.hiro.so/"
          target="_blank"
        >
          <Image
            className="modalLogo"
            src={"/lether.png"}
            alt="Lether Wallet"
            width={30}
            height={30}
          />
          Install Hiro
        </Link>
      )}
    </div>
    <div className="modalCard">
      {wallet.install.xverse ? (
        <button
          className="modalButton"
          value={"xverse"}
          onClick={chooseWallet}
        >
          <Image
            className="modalLogo"
            src={"/xverse.png"}
            alt="Xverse Wallet"
            width={30}
            height={30}
          />
          Use Xverse
        </button>
      ) : (
        <Link
          className="modalButton"
          href="https://www.xverse.app/"
          target="_blank"
        >
          <Image
            className="modalLogo"
            src={"/xverse.png"}
            alt="Xverse Wallet"
            width={30}
            height={30}
          />
          Install Xverse
        </Link>
      )}
    </div>
    <div className="modalCard">
      {wallet.install.ordinalSafe ? (
        <button
          className="modalButton"
          value={"ordinalSafe"}
          onClick={chooseWallet}
        >
          <Image
            className="modalLogo"
            src={"/bitget.png"}
            alt="Bitget Wallet"
            width={30}
            height={30}
          />
          Use Bitget
        </button>
      ) : (
        <Link
          className="modalButton"
          href="https://ordinalsafe.xyz/"
          target="_blank"
        >
          <Image
            className="modalLogo"
            src={"/ordinalsafe.png"}
            alt="Bitget Wallet"
            width={30}
            height={30}
          />
          Install Bitget
        </Link>
      )}
    </div>
  </div> 
  </Modal>

  )
}
