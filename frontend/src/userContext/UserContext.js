import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(() => {
    const storedUserDetails = localStorage.getItem('userDetails');
    return storedUserDetails ? JSON.parse(storedUserDetails) : {
      id: null,
      token: null,
      status: null,
      createDate: null,
      pinStatus: null,
      pinDetails: null,
      walletId: null,
      encryptionKey: null,
      userToken: null,
      userTokenOwner: null,
      userTokenDate: null,
      blockchain: null,
      nativeCoin: null,
      nativeBalance: null,
      usdcCoin: null,
      usdcBalance: null,
      eurcCoin: null,
      eurcBalance: null,
      transactions: null,
      challengeId: null
    };
  });

  const resetUserDetails = () => {
    setUserDetails({
      id: null,
      token: null,
      status: null,
      createDate: null,
      pinStatus: null,
      pinDetails: null,
      walletId: null,
      encryptionKey: null,
      userToken: null,
      userTokenOwner: null,
      userTokenDate: null,
      blockchain: null,
      nativeCoin: null,
      nativeBalance: null,
      usdcCoin: null,
      usdcBalance: null,
      eurcCoin: null,
      eurcBalance: null,
      transactions: null,
      challengeId: null
    });
  };

  useEffect(() => {
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
  }, [userDetails]);

  const updateUserDetails = (newDetails) => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      ...newDetails,
    }));
  };

  return (
    <UserContext.Provider value={{ userDetails, updateUserDetails, resetUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
