import { useCallback, useEffect, useState } from 'react';
import { W3SSdk } from '@circle-fin/w3s-pw-web-sdk';
import { useUser } from '../../../userContext/UserContext';
import { useNavigate } from 'react-router-dom';

let sdk;

function App() {
  const { userDetails, updateUserDetails } = useUser();
  const { userToken, encryptionKey, challengeId } = userDetails;

/* 
  Fix in your Circle appId gotten from the developer console dashboard.
*/
  const appId = "53dad8b5-af12-5b69-a740-6aaf199b8f11";

  
  const navigate = useNavigate();
  const [statusMessage, setStatusMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    sdk = new W3SSdk();
  }, []);

  const onSubmit = useCallback(() => {
    setLoading(true);
    sdk.setAppSettings({ appId });
    sdk.setAuthentication({ userToken, encryptionKey });

    sdk.execute(challengeId, (error, result) => {
      setLoading(false);
      if (error) {
        setStatusMessage(`${error?.code?.toString() || 'Error Code Unknown'}: ${error?.message ?? 'An error occurred!'}`);
        return;
      }

      setStatusMessage(`Challenge completed successfully. Redirecting to wallet...`);
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Redirect to login after 2 seconds
    });
  }, [appId, challengeId, encryptionKey, userToken, navigate]);

  const handleBackToWallet = () => {
    navigate('/wallet');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="text-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-4"
          onClick={onSubmit}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Execute Challenge'}
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={handleBackToWallet}
        >
          Back to Wallet
        </button>
        {statusMessage && (
          <p className="mt-4 bg-gray-800 p-3 rounded-md">
            {statusMessage}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
