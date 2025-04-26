
import { useState, useContext, useEffect } from 'react';
import { AppContext } from '@/context/AppContext';
import Web3 from 'web3';

const InvestmentForm = ({ projectPrice }) => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const { account, isWalletConnected, connectWalletHandle } = useContext(AppContext);
  const [web3, setWeb3] = useState(null);

  const USDC_CONTRACT_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"; // USDC on Ethereum Mainnet
  const PROJECT_WALLET = "0x6ec4D269DbBA21Ac943adCBE601E060fbbe6c7E5";

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        try {
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);
          window.ethereum.on('accountsChanged', (accounts) => {
            if (accounts.length === 0) {
              setWeb3(null);
              connectWalletHandle();
            }
          });
          window.ethereum.on('chainChanged', () => window.location.reload());
        } catch (error) {
          console.error("Web3 initialization error:", error);
          alert("Failed to initialize Web3. Please ensure MetaMask is installed.");
        }
      }
    };
    initWeb3();
  }, [connectWalletHandle]);

  const handleInvestment = async () => {
    if (!web3) {
      alert("Web3 not initialized. Please ensure MetaMask is installed.");
      return;
    }

    if (!account) {
      try {
        await connectWalletHandle();
      } catch (error) {
        console.error("Wallet connection error:", error);
        alert("Failed to connect wallet. Please try again.");
        return;
      }
    }

    if (!amount || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    setLoading(true);

    try {
      const minABI = [
        {
          constant: false,
          inputs: [
            { name: "_to", type: "address" },
            { name: "_value", type: "uint256" }
          ],
          name: "transfer",
          outputs: [{ name: "", type: "bool" }],
          type: "function"
        }
      ];

      const amountInWei = web3.utils.toWei(amount, 'mwei'); // USDC uses 6 decimals
      const contract = new web3.eth.Contract(minABI, USDC_CONTRACT_ADDRESS);

      const transaction = await contract.methods
        .transfer(PROJECT_WALLET, amountInWei)
        .send({ from: account });

      if (transaction.status) {
        alert("Investment successful!");
        setAmount('');
      }
    } catch (error) {
      console.error("Investment error:", error);
      let errorMessage = "Transaction failed. Please check your USDC balance and try again.";
      if (error.code === 4001) {
        errorMessage = "Transaction rejected by user.";
      } else if (error.message.includes("insufficient funds")) {
        errorMessage = "Insufficient USDC balance.";
      }
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="investment-form mt-4">
      <div className="form-group mb-3">
        <label>Investment Amount (USDC)</label>
        <input
          type="number"
          className="form-control w-full p-2 rounded border"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          min="0"
          step="0.01"
          required
          disabled={loading}
        />
        <small className="text-muted block mt-1">
          Equivalent: {amount ? `${(amount / projectPrice).toFixed(2)} Tokens` : '0 Tokens'}
        </small>
      </div>
      <button 
        type="button"
        onClick={handleInvestment}
        className={`default-btn w-full py-3 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
        disabled={loading}
      >
        {!account ? 'Connect Wallet' : loading ? 'Processing...' : 'Confirm Investment'}
      </button>
    </div>
  );
};

export default InvestmentForm;
