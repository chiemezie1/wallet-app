import React, { useState } from 'react';

const Swap = () => {
    const [fromCurrency, setFromCurrency] = useState('USDC');
    const [toCurrency, setToCurrency] = useState('ETH');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');

    const handleFromCurrencyChange = (event) => {
        setFromCurrency(event.target.value);
        // Reset toCurrency if same as fromCurrency
        if (event.target.value === toCurrency) {
            setToCurrency(currencies.find(c => c !== event.target.value));
        }
    };

    const handleToCurrencyChange = (event) => {
        setToCurrency(event.target.value);
    };

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const validateAndSwap = (event) => {
        event.preventDefault();
        if (!amount) {
            setError('Please enter the amount to swap');
            return;
        }
        if (isNaN(amount) || amount <= 0) {
            setError('Please enter a valid amount');
            return;
        }
        if (fromCurrency === toCurrency) {
            setError('Please select two different currencies to swap');
            return;
        }
        setError('');
        console.log('Swapping', amount, fromCurrency, 'to', toCurrency);
        // Here you would typically call an API to perform the swap
    };

    // Define available currencies
    const currencies = ['USDC', 'EURC', 'ETH'];

    return (
        <div className="flex items-center justify-center px-4 py-10">
            <div className="bg-white rounded-lg shadow-lg p-8 m-4 w-96">
                <h2 className="text-2xl text-gray-800 font-bold mb-6 text-center">Currency Swap</h2>
                <form onSubmit={validateAndSwap} className="space-y-6">
                    <div className=' text-gray-800'>
                        <label htmlFor="fromCurrency" className="text-sm font-medium text-gray-700 block mb-2">From</label>
                        <select
                            id="fromCurrency"
                            value={fromCurrency}
                            onChange={handleFromCurrencyChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        >
                            {currencies.map((currency) => (
                                <option key={currency} value={currency}>{currency}</option>
                            ))}
                        </select>
                    </div>
                    <div className=' text-gray-800'>
                        <label htmlFor="toCurrency" className="text-sm font-medium text-gray-700 block mb-2">To</label>
                        <select
                            id="toCurrency"
                            value={toCurrency}
                            onChange={handleToCurrencyChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        >
                            {currencies.map((currency) => (
                                <option key={currency} value={currency}>{currency}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="amount" className="text-sm font-medium text-gray-700 block mb-2">Amount</label>
                        <input
                            type="text"
                            id="amount"
                            value={amount}
                            onChange={handleAmountChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Enter amount"
                        />
                    </div>
                    {error && <p className="text-red-500 text-xs italic">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Swap
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Swap;
