import { useContext, useState } from "react";
import { AppContext } from "@/context/AppContext";
import { ThemeContext } from "@/context/ThemeContext";

import { Modal } from "react-bootstrap";
import { faClone, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Image from 'next/image';

const Wallet = ({ show, handleClose }) => {
  const [copied, setIsCopied] = useState(false);
  const { isDarkMode } = useContext(ThemeContext);
  // const [isWalletDisconnect, setIsWalletDisconnect] = useState(false);



  const {
    account,
    setAccountAfterDisconnectWallet,
    connectWalletHandle, isWalletConnected, isMetaMaskInstalled } = useContext(AppContext);



  const disconnectWallet = async () => {
    setAccountAfterDisconnectWallet();
    localStorage.setItem('isWalletConnected', 'false');
  }


  const connectMetamaskWallet = async () => {

    if (isMetaMaskInstalled()) {
      connectWalletHandle();
      localStorage.setItem('isWalletConnected', 'true');
    } else {

      window.open('https://metamask.io/download/', '_blank');

    }
  }

  const copyToClipboard = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
      setIsCopied(true)
    } catch (error) {
      console.error("Error copying text to clipboard:", error);
    }
  };



  return (
    <Modal className={`wallet-modal ${isDarkMode ? 'dark-theme' : 'light-theme'}`} show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Connect Your Wallet</Modal.Title>
      </Modal.Header>


      {isWalletConnected() && account ?
        <div className="modal-body">
          <div> Already Connected</div>
          <div className="wallet-btns" >
            <button className={`default-btn default-btn--small ${isDarkMode ? 'dark-theme' : 'light-theme'}`} onClick={() => copyToClipboard(account.toString())}>
              Copy Address <FontAwesomeIcon className="icon" icon={faClone} /></button>
            <button className={`default-btn default-btn--small ${isDarkMode ? 'dark-theme' : 'light-theme'}`} onClick={() => disconnectWallet()}>
              Disconnect <FontAwesomeIcon className="icon" icon={faRightToBracket} /></button>
          </div>
          <div className="errors">
            {copied === true ? <span className="text-white" >Address Copied.</span> : null}
          </div>
        </div>
        : <div className="modal-body"><div>
          Please select a wallet from below to connect for Launching
          yourIDO&apos;s </div><ul className="wallet__list">
            <li className="wallet__list-item">
              <Link onClick={connectMetamaskWallet} href="#">
                <span>
                  <Image src="/images/wallet/metamask.svg"
                    width={60}
                    height={60}
                    alt="metamask"
                  />
                </span>
              </Link>
            </li>
            <li className="wallet__list-item">
              <Link href="#">
                <span>
                  <Image src="/images/wallet/coinbase.svg"
                    width={60}
                    height={60}
                    alt="coinbase"

                  />
                </span>
              </Link>
            </li>
            <li className="wallet__list-item">
              <Link href="#">
                <span>
                  <Image src="/images/wallet/wallet-connect.svg"
                    width={60}
                    height={60}
                    alt="wallet-connect"
                  />
                </span>
              </Link>
            </li>
            <li className="wallet__list-item">
              <Link href="#">
                <span>
                  <Image src="/images/wallet/venly.svg"
                    width={60}
                    height={60}
                    alt="venly"
                  />
                </span>
              </Link>
            </li>
            <li className="wallet__list-item">
              <Link href="#">
                <span>
                  <Image src="/images/wallet/bitski.svg"
                    width={60}
                    height={60}
                    alt="bitski"
                  />
                </span>
              </Link>
            </li>
          </ul>
          <div>
            By connecting your wallet, you agree to our
            <Link href="#">Terms of Service</Link> and our
            <Link href="#">Privacy Policy</Link> .
          </div>
        </div>}
    </Modal>
  );
};

export default Wallet;
