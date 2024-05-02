import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../userContext/UserContext';

const Transfer = () => {
    const [currency, setCurrency] = useState('USDC');
    const [amount, setAmount] = useState('');
    const [recipient, setRecipient] = useState('');
    const [beneficiaries, setBeneficiaries] = useState([]);
    const [showBeneficiariesModal, setShowBeneficiariesModal] = useState(false);
    const [newBeneficiaryName, setNewBeneficiaryName] = useState('');
    const [newBeneficiaryAddress, setNewBeneficiaryAddress] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { userDetails, updateUserDetails } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        loadBeneficiaries();
    }, []);

    const loadBeneficiaries = () => {
        const loadedBeneficiaries = JSON.parse(localStorage.getItem('beneficiaries')) || [];
        setBeneficiaries(loadedBeneficiaries);
    };

    const handleCurrencyChange = (event) => {
        setCurrency(event.target.value);
    };

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handleRecipientChange = (event) => {
        setRecipient(event.target.value);
    };

    const validateAndTransfer = async (event) => {
        event.preventDefault();
        const { username, userToken } = userDetails;
        try {
            if (!amount || !recipient) {
                throw new Error('Please fill in all fields');
            }
            if (isNaN(amount) || amount <= 0) {
                throw new Error('Please enter a valid amount');
            }
            setError('');
            setLoading(true);
            console.log('Transferring', amount, currency, 'to', recipient);


            const response = await fetch("https://wallet-app-server.vercel.app/transfer", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    amount,
                    recipient,
                    currency,
                    userToken
                })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Failed to create wallet.');
            }
            const { challengeId } = data;
            updateUserDetails({ ...userDetails, challengeId });
            setTimeout(() => {
                navigate('/w3ssdk');
            }, 1000);
        } catch (err) {
            setError(err.message || 'Failed to create wallet. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const addBeneficiary = () => {
        if (newBeneficiaryName && newBeneficiaryAddress && !beneficiaries.some(b => b.address === newBeneficiaryAddress)) {
            const updatedBeneficiaries = [...beneficiaries, { name: newBeneficiaryName, address: newBeneficiaryAddress }];
            localStorage.setItem('beneficiaries', JSON.stringify(updatedBeneficiaries));
            setBeneficiaries(updatedBeneficiaries);
            setNewBeneficiaryName('');
            setNewBeneficiaryAddress('');
        }
    };

    const removeBeneficiary = (address) => {
        const updatedBeneficiaries = beneficiaries.filter(b => b.address !== address);
        localStorage.setItem('beneficiaries', JSON.stringify(updatedBeneficiaries));
        setBeneficiaries(updatedBeneficiaries);
    };

    const handleSelectBeneficiary = (address) => {
        setRecipient(address);
        setShowBeneficiariesModal(false);
    };

    return (
        <div className="flex items-center justify-center mx-4 my-10">
            <div className="bg-white rounded-lg shadow-lg p-8 m-4 w-full max-w-md">
                <h2 className="text-2xl text-gray-800 font-bold mb-6 text-center">Transfer Funds</h2>
                <form onSubmit={validateAndTransfer} className="space-y-6 text-gray-800">
                    <div>
                        <label htmlFor="currency" className="text-sm font-medium text-gray-700 block mb-2">Currency</label>
                        <select
                            id="currency"
                            value={currency}
                            onChange={handleCurrencyChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        >
                            <option value="USDC">USDC</option>
                            <option value="EURC">EURC</option>
                            <option value="ETH">ETH</option>
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
                    <div>
                        <label htmlFor="recipient" className="text-sm font-medium text-gray-700 block mb-2">Recipient Address</label>
                        <input
                            type="text"
                            id="recipient"
                            value={recipient}
                            onChange={handleRecipientChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Enter recipient's address"
                        />
                    </div>
                    {error && <p className="text-red-500 text-xs italic">{error}</p>}
                    <button
                        type="button"
                        onClick={() => setShowBeneficiariesModal(true)}
                        className="w-full bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-4"
                    >
                        Select from Beneficiaries
                    </button>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Transfer
                    </button>
                </form>
            </div>
            {showBeneficiariesModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 text-gray-800">
                    <div className="bg-white p-4 rounded-lg max-w-md w-full">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Manage Beneficiaries</h3>
                        <input
                            type="text"
                            value={newBeneficiaryName}
                            onChange={(e) => setNewBeneficiaryName(e.target.value)}
                            placeholder="Name"
                            className="w-full p-2 border border-gray-300 rounded-md mb-2"
                        />
                        <input
                            type="text"
                            value={newBeneficiaryAddress}
                            onChange={(e) => setNewBeneficiaryAddress(e.target.value)}
                            placeholder="Address"
                            className="w-full p-2 border border-gray-300 rounded-md mb-4"
                        />
                        <button
                            onClick={addBeneficiary}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
                        >
                            Add
                        </button>
                        <ul className="space-y-2">
                            {beneficiaries.map((b, index) => (
                                <li key={index} className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <div className="truncate mr-2" style={{ maxWidth: "200px" }}>
                                            <span
                                                onClick={() => handleSelectBeneficiary(b.address)}
                                                className="cursor-pointer"
                                                title={b.address}
                                            >
                                                {b.name} - {b.address}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => removeBeneficiary(b.address)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={() => setShowBeneficiariesModal(false)}
                            className="mt-4 w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Transfer;
