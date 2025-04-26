
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

  const USDT_CONTRACT_ADDRESS = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
  const PROJECT_WALLET = "YOUR_PROJECT_WALLET_ADDRESS"; // Replace with your project wallet

  const handleInvestment = async (e) => {
    e.preventDefault();
    
    if (!isWalletConnected()) {
      await connectWalletHandle();
      return;
    }

    if (!amount || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    try {
      setLoading(true);
      
      // Create contract instance
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
          <label>Investment Amount (USDT)</label>
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
          className={`default-btn w-full py-3 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {!isWalletConnected() ? 'Connect Wallet' : loading ? 'Processing...' : 'Confirm Investment'}
        </button>
      </form>
    </div>
  );
};

export default InvestmentForm;
