import React, { useEffect } from 'react';
import useSessionToken from './utils/getSessionToken';

const MyComponent = () => {
  // Call the useSessionToken hook
  const { encryptionKey, userToken } = useSessionToken();

  // You can now use encryptionKey and userToken in your component
  
  return (
    <div>
      <p>Encryption Key: {encryptionKey}</p>
      <p>User Token: {userToken}</p>
      {/* Your component content here */}
    </div>
  );
};

export default MyComponent;
