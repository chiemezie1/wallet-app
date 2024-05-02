import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BlockchainSelection from './BlockchainSelection';
import WalletTypeSelection from './WalletTypeSelection';
import { useUser } from '../../../userContext/UserContext';
import useSessionToken from '../../../utils/getSessionToken';

export default function Create() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedBlockchain, setSelectedBlockchain] = useState('');
  const [selectedWalletType, setSelectedWalletType] = useState('');
  const { userDetails, updateUserDetails } = useUser();
  const { userToken } = useSessionToken();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleBlockchainSelection = (blockchain) => {
    setSelectedBlockchain(blockchain);
    setCurrentStep(2); 
  };

  const handleWalletTypeSelection = async (walletType) => {
    setSelectedWalletType(walletType);
    const username = userDetails.id;
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4400/createwallet", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          selectedBlockchain,
          selectedWalletType,
          userToken
        })
      });
      const data = await response.json();
      if (response.ok) {
        const { challengeId } = data;
        updateUserDetails({ ...userDetails, challengeId });
        setTimeout(() => {
          navigate('/w3ssdk');
        }, 1000); // Delay to next page
      } else {
        throw new Error(data.error || 'Failed to create wallet.');
      }
    } catch (err) {
      setError(err.message || 'Failed to create wallet. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      {currentStep === 1 ? (
        <BlockchainSelection onNext={handleBlockchainSelection} onBack={handleBack} />
      ) : (
        <WalletTypeSelection onBack={handleBack} onSubmit={handleWalletTypeSelection} />
      )}
      {loading && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-xl font-bold text-white">Please wait...</div>
        </div>
      )}
      {error && (
        <div className="bg-yellow-700 p-4 rounded-md text-center">
          <p className="text-lg font-semibold">if this page doesnt redirect, reSubmit</p>
          <Link to="/wallet" className="text-white underline">Go to Wallet</Link>
        </div>
      )}
    </div>
  );
}
