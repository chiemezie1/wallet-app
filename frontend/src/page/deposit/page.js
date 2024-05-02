import React, { useState } from 'react';

const Deposit = () => {
    const walletAddress = '0x123...abcde'; // Example wallet address
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(walletAddress)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
            })
            .catch(err => console.error('Failed to copy!', err));
    };

    return (
        <div className="flex items-center justify-center ">
            <div className="bg-white rounded-lg shadow-lg p-4 mx-4 my-10 w-96">
                <h2 className="text-xl text-gray-800 font-bold mb-2 text-center">Wallet Address</h2>
                <p className="text-lg font-semibold text-gray-800 mb-4 text-center">{walletAddress}</p>
                <div className="text-center">
                    <button
                        onClick={handleCopy}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                    >
                        <svg className="h-6 w-6 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-2m-6-5l6 6m0 0l-6-6m6 6V10a2 2 0 00-2-2h-1"></path>
                        </svg>
                        Copy
                    </button>
                    {copied && <p className="text-green-500 text-sm mt-2">Address copied!</p>}
                </div>
            </div>
        </div>
    );
};

export default Deposit;
