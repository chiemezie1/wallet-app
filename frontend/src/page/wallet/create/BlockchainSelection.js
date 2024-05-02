import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function BlockchainSelection({ onNext, onBack }) {
  const [blockchain, setBlockchain] = useState('');
  const [showComponent, setShowComponent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Delay the appearance of the component to create a transition effect
    setTimeout(() => {
      setShowComponent(true);
    }, 50);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (blockchain.trim() !== '') {
      onNext(blockchain);
    } else {
      setErrorMessage('Please select a blockchain.');
    }
  };

  return (
    <div className={`transition-transform duration-500 ease-in-out transform ${showComponent ? 'translate-y-0' : 'translate-y-full'} bg-gray-900 text-white`}>
      <h2 className="text-2xl mb-4">Select Blockchain</h2>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="">
        <select
          value={blockchain}
          onChange={(e) => setBlockchain(e.target.value)}
          className="bg-gray-800 text-white border-b-2 border-gray-600 focus:outline-none focus:border-blue-500 mb-4 px-12 py-2 w-full rounded-md"
        >
          <option value="">Select blockchain</option>
          <option value="ETH">ETH</option>
          <option value="ETH-SEPOLIA">ETH-SEPOLIA</option>
          <option value="AVAX">AVAX</option>
          <option value="AVAX-FUJI">AVAX-FUJI</option>
          <option value="MATIC">MATIC</option>
          <option value="MATIC-AMOY">MATIC-AMOY</option>
        </select>
        <div className='flex justify-between'>
          <Link to="/wallet" className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">Back</Link>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">Next</button>
        </div>
      </form>
    </div>
  );
}
