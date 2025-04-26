import React, { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

const ethereum = typeof window !== "undefined" ? (window.ethereum || (window.web3 && window.web3.currentProvider)) : null;

const AppProvider = ({ children }) => {
   const [visibility, setVisibility] = useState(false);
   const [walletModalvisibility, setModalvisibility] = useState(false);
   const [shareModalVisibility, setShareModalvisibility] = useState(false);
   const [metamaskModalVisibility, setMetamaskModalVisibility] = useState(false);
   const [connectWalletModal, setConnectWalletModal] = useState(false);
   const [account, setAccount] = useState("");

   const isMetaMaskInstalled = () => {
      if (ethereum) {
         return true;
      }
      return false;
   }

   const isWalletConnected = () => {
      if (typeof window !== 'undefined' && localStorage.getItem('isWalletConnected') === 'true') {
         return true
      }
      return false;
   }

   const mintModalHandle = () => {
      setVisibility(!visibility);
   };

   const walletModalHandle = () => {
      setModalvisibility(!walletModalvisibility);
   };

   const shareModalHandle = (e) => {
      e.preventDefault();
      setShareModalvisibility(!shareModalVisibility);
   };

   const metamaskModalHandle = () => {
      setMetamaskModalVisibility(!metamaskModalVisibility);
   };

   const connectWalletModalHanlde = () => {
      if (!isWalletConnected()) {
         setConnectWalletModal(!connectWalletModal);
      }
   };

   const connectWallet = async () => {
      if (typeof window !== 'undefined' && window.ethereum) {
         try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            return accounts[0];
         } catch (error) {
            console.error("Error connecting wallet:", error);
            return null;
         }
      } else {
         console.log("Please install MetaMask");
         return null;
      }
   };

   const connectWalletHandle = async () => {
      if (typeof window !== 'undefined' && window.ethereum) {
         try {
            await window.ethereum.enable();
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            if (accounts.length > 0) {
               setAccount(accounts[0]);
               localStorage.setItem('isWalletConnected', 'true');
               setModalvisibility(false);
            }
         } catch (error) {
            console.error("Error connecting wallet:", error);
            localStorage.setItem('isWalletConnected', 'false');
         }
      } else {
         console.log("Please install MetaMask");
         window.open('https://metamask.io/download/', '_blank');
      }
   };

   const disconnectWallet = () => {
      setAccount("");
      localStorage.removeItem('isWalletConnected');
   };

   const isWalletAlreadyConnected = async () => {
      if (isWalletConnected()) {
         const account = await connectWallet();
         if (account) {
            setAccount(account);
         } else {
            disconnectWallet();
         }
      }
   };

   const setAccountAfterDisconnectWallet = () => {
      disconnectWallet();
   };

   // Check wallet connection on mount
   useEffect(() => {
      isWalletAlreadyConnected();
   }, []);

   return (
      <AppContext.Provider value={{
         isWalletConnected,
         visibility,
         mintModalHandle,
         walletModalHandle,
         walletModalvisibility,
         shareModalVisibility,
         shareModalHandle,
         metamaskModalVisibility,
         metamaskModalHandle,
         account,
         connectWalletHandle,
         isWalletAlreadyConnected,
         setAccountAfterDisconnectWallet,
         connectWalletModalHanlde,
         connectWalletModal,
         isMetaMaskInstalled
      }}>
         {children}
      </AppContext.Provider>
   );
};

export default AppProvider;