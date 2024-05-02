import { useEffect } from "react";
import { useUser } from "../userContext/UserContext";

function useUpdateTokenBalances () {
    const { userDetails, updateUserDetails } = useUser();
    const fetchAndUpdateTokenBalances = async () => {
        try {
            const response = await fetch("http://localhost:4400/balance", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userName: userDetails.username,
                    userToken: userDetails.userToken
                })
            });
            const responseData = await response.json();
            console.log("Data from API:", responseData);
            if (!response.ok) {
                throw new Error(responseData.error || 'Failed to fetch token balances.');
            }
            updateGlobalContext(responseData.tokenBalances, userDetails, updateUserDetails);
        } catch (err) {
            console.error(err.message || 'Failed to fetch token balances. Please try again.');
        }
    };
    

    const updateGlobalContext = (data, userDetails, updateUserDetails) => {
        const nativeChains = ["ETH-SEPOLIA", "ETH", "AVAX", "MATIC-AMOY", "MATIC", "AVAX-FUJI"];

        // Update userDetails in global context
        updateUserDetails({
            ...userDetails,
            nativeCoin: data.find(token => nativeChains.includes(token.token.symbol))?.token || null,
            nativeBalance: data.find(token => nativeChains.includes(token.token.symbol))?.amount || null,
            usdcCoin: data.find(token => token.token.symbol === 'USDC')?.token || null,
            usdcBalance: data.find(token => token.token.symbol === 'USDC')?.amount || null,
            eurcCoin: data.find(token => token.token.symbol === 'EURC')?.token || null,
            eurcBalance: data.find(token => token.token.symbol === 'EURC')?.amount || null,
        });
    };

    useEffect(() => {
        fetchAndUpdateTokenBalances();
    }, []);

    return null;
}

export default useUpdateTokenBalances;
