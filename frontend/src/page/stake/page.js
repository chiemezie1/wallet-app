import React, { useState } from 'react';

const Stake = () => {
    const [currency, setCurrency] = useState('USDC');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');

    const handleCurrencyChange = (event) => {
        setCurrency(event.target.value);
    };

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handleStakeSubmit = (event) => {
        event.preventDefault();
        if (!amount || amount <= 0) {
            setError('Please enter a valid amount to stake');
            return;
        }
        setError('');
        console.log('Staking', amount, currency);
        // API call to perform the staking operation would go here
    };

    const currencies = ['USDC', 'EURC', 'ETH'];

    return (
        <div className="flex items-center justify-center px-4 py-10">
            <div className="bg-white rounded-lg shadow-lg p-8 m-4 w-96">
                <h2 className="text-2xl text-gray-800 font-bold mb-6 text-center">Stake Your Tokens</h2>
                <form onSubmit={handleStakeSubmit} className="space-y-6">
                    <div className="text-gray-700">
                        <label htmlFor="currency" className="text-sm font-medium text-gray-700 block mb-2">Currency</label>
                        <select
                            id="currency"
                            value={currency}
                            onChange={handleCurrencyChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        >
                            {currencies.map((currency) => (
                                <option key={currency} value={currency}>{currency}</option>
                            ))}
                        </select>
                    </div>
                    <div className='text-gray-700'>
                        <label htmlFor="amount" className="text-sm font-medium text-gray-700 block mb-2">Amount</label>
                        <input
                            type="text"
                            id="amount"
                            value={amount}
                            onChange={handleAmountChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Enter amount to stake"
                        />
                    </div>
                    {error && <p className="text-red-500 text-xs italic">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Stake Now
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Stake;
