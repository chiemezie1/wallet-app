import React, { useContext } from 'react';
import { useUser } from '../../userContext/UserContext';

const ShowTransaction = () => {
    const { userDetails } = useUser(); // Assuming transactions are stored in userDetails or similar context

    // Assuming transactions are stored in an array within userDetails
    const transactions = userDetails.transactions || [];

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-white mb-4">All Transactions</h3>
            <div className="overflow-auto max-h-96">
                <ul className="divide-y divide-gray-700">
                    {transactions.map(transaction => (
                        <li key={transaction.id} className="py-4">
                            <p className="text-white">Transaction ID: {transaction.id}</p>
                            <p className="text-white">State: {transaction.state}</p>
                            <p className="text-white">Type: {transaction.transactionType === "OUTBOUND"? "SENT" : "RECEIVED"}</p>
                            <p className="text-white">Amount: {transaction.amounts[0]}</p>
                            <p className="text-white">Blockchain: {transaction.blockchain}</p>
                            <p className="text-white">Token ID: {transaction.tokenId}</p>
                            <p className="text-white">Wallet ID: {transaction.walletId}</p>
                            <p className="text-white">Source Address: {transaction.sourceAddress}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ShowTransaction;
