
import { useState, useContext } from 'react';
import { AppContext } from '@/context/AppContext';
import Web3 from 'web3';

const InvestmentForm = ({ projectPrice }) => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const { account, isWalletConnected } = useContext(AppContext);

  const USDT_CONTRACT_ADDRESS = "0xdAC17F958D2ee523a2206206994597C13D831ec7"; // Ethereum USDT
  
  const handleInvestment = async (e) => {
    e.preventDefault();
    
    if (!isWalletConnected() || !account) {
      alert("Please connect your wallet first");
      return;
    }

    try {
      setLoading(true);
      const web3 = new Web3(window.ethereum);
      
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
      
      // Convert amount to wei (USDT has 6 decimals)
      const amountInWei = web3.utils.toWei(amount, 'mwei');
      
      // Project wallet address where funds will be received
      const projectWallet = "YOUR_PROJECT_WALLET_ADDRESS";
      
      // Send transaction
      const transaction = await contract.methods
        .transfer(projectWallet, amountInWei)
        .send({ from: account });
        
      if (transaction.status) {
        alert("Investment successful!");
      }
    } catch (error) {
      console.error("Investment error:", error);
      alert("Transaction failed. Please try again.");
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
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            min="0"
            step="0.01"
            required
          />
          <small className="text-muted">
            Equivalent: {amount ? `${(amount / projectPrice).toFixed(2)} Tokens` : '0 Tokens'}
          </small>
        </div>
        <button 
          type="submit" 
          className="default-btn w-100"
          disabled={loading || !isWalletConnected()}
        >
          {loading ? 'Processing...' : 'Confirm Investment'}
        </button>
      </form>
    </div>
  );
};

export default InvestmentForm;
