import { useState, useContext, useEffect } from 'react';
import { AppContext } from '@/context/AppContext';
import Web3 from 'web3';

const InvestmentForm = ({ projectPrice }) => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const { account, isWalletConnected, connectWalletHandle } = useContext(AppContext);
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
    }
  }, []);

  const USDC_CONTRACT_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"; // USDC on Ethereum Mainnet
  const PROJECT_WALLET = "0x6ec4D269DbBA21Ac943adCBE601E060fbbe6c7E5";

  const handleInvestment = async (e) => {
    e.preventDefault();

    try {
      if (!account) {
        connectWalletHandle();
        return;
      }


      if (!isWalletConnected()) {
        await connectWalletHandle();
        return;
      }

      if (!amount || amount <= 0) {
        alert("Please enter a valid amount");
        return;
      }

      setLoading(true);

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

      const contract = new web3.eth.Contract(minABI, USDT_CONTRACT_ADDRESS);
      const amountInWei = web3.utils.toWei(amount, 'mwei');

      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const transaction = await contract.methods
        .transfer(PROJECT_WALLET, amountInWei)
        .send({ from: account });

      if (transaction.status) {
        alert("Investment successful!");
        setAmount('');
      }
    } catch (error) {
      console.error("Investment error:", error);
      alert(error.message || "Transaction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="investment-form mt-4">
      <form onSubmit={handleInvestment}>
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
          type="submit" 
          className={`default-btn w-full py-3 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
          disabled={loading}
        >
          {!account ? 'Connect Wallet' : loading ? 'Processing...' : 'Confirm Investment'}
        </button>
      </form>
    </div>
  );
};

export default InvestmentForm;