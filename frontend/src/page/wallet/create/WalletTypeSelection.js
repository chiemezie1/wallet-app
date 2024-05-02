import { useState, useEffect } from 'react';

export default function WalletTypeSelection({ onSubmit, onBack }) {
  const [walletType, setWalletType] = useState('');
  const [showComponent, setShowComponent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Delay the appearance of the component to create a transition effect
    setTimeout(() => {
      setShowComponent(true);
    }, 100);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (walletType.trim() !== '') {
      onSubmit(walletType);
    } else {
      setErrorMessage('Please select a wallet type.');
    }
  };

  return (
    <div className={`transition-transform duration-500 ease-in-out transform ${showComponent ? 'translate-y-0' : 'translate-y-full'} bg-gray-900 text-white`}>
      <h2 className="text-2xl mb-4">Select Wallet Type</h2>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="">
        <div>
          <label className="flex items-center py-4">
            <input
              type="radio"
              value="SCA"
              checked={walletType === 'SCA'}
              onChange={(e) => setWalletType(e.target.value)}
              className="mr-2"
            />
            Smart Contract Account (SCA)
          </label>
          <label className="flex items-center pb-2">
            <input
              type="radio"
              value="EOA"
              checked={walletType === 'EOA'}
              onChange={(e) => setWalletType(e.target.value)}
              className="mr-2"
            />
            Externally Owned Account (EOA)
          </label>
        </div>
        <div className='flex justify-between'>
          <button type="button" onClick={onBack} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out mr-2">Back</button>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">Submit</button>
        </div>
      </form>
    </div>
  );
}
