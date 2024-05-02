import React, { useState, useEffect } from 'react';
import { useUser } from '../../userContext/UserContext';
import useUpdateTokenBalances from '../../utils/updateTokenBalances';

const BalanceModal = () => {
    const [error, setError] = useState('');
    const { userDetails } = useUser();

    // Extracting token properties from userDetails
    const tokens = [
        { name: userDetails.nativeCoin?.name, amount: userDetails.nativeBalance },
        { name: userDetails.usdcCoin?.name, amount: userDetails.usdcBalance },
        { name: userDetails.eurcCoin?.name, amount: userDetails.eurcBalance }
    ];

    // Call the custom hook to update token balances
    useUpdateTokenBalances();

    return (
        <div className="flex items-center justify-center px-4 py-10 text-gray-900">
            <div className="bg-white rounded-lg shadow-lg p-8 m-4 w-96">
                <h2 className="text-2xl text-gray-800 font-bold mb-6 text-center">Token Balances</h2>
                <div className="overflow-auto max-h-80">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Token</th>
                                <th className="px-4 py-2">Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tokens.map((token, index) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2">{token.name || 'N/A'}</td>
                                    <td className="border px-4 py-2">{token.amount || 'N/A'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BalanceModal;
