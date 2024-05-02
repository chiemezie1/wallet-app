import { useEffect, useCallback } from 'react';
import { useUser } from '../userContext/UserContext';

const useSessionToken = () => {
  const { userDetails, updateUserDetails } = useUser();
  const { id: username, userToken, encryptionKey, userTokenOwner, userTokenDate } = userDetails;

  const fetchSessionToken = useCallback(async () => {
    const creationTime = Date.now();  
    try {
      const response = await fetch("http://localhost:4400/sessiontoken", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username }),
      });
      const data = await response.json();
      if (response.ok) {
        const { encryptionKey, userToken } = data;
        updateUserDetails({
          ...userDetails,
          encryptionKey,
          userToken,
          userTokenOwner: username,
          userTokenDate: creationTime
        });
      } else {
        console.error('Error fetching session token:', data.message);
      }
    } catch (error) {
      console.error('Error fetching session token:', error.message);
    }
  }, [username, updateUserDetails, userDetails]);
  

  useEffect(() => {
    if (!userToken || username !== userTokenOwner || Date.now() - userTokenDate > 60000) {
      fetchSessionToken();
    }
  }, [userToken, userTokenOwner, username, userTokenDate, fetchSessionToken]);

  return {
    encryptionKey,
    userToken
  };
};

export default useSessionToken;
