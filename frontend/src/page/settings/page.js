import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../userContext/UserContext';

const Settings = () => {
    const [showChangeInfoModal, setShowChangeInfoModal] = useState(false);
    const [showAddBeneficiaryModal, setShowAddBeneficiaryModal] = useState(false);
    const [username, setUsername] = useState('');
    const [beneficiaryName, setBeneficiaryName] = useState('');
    const [beneficiaryAddress, setBeneficiaryAddress] = useState('');
    const [beneficiaries, setBeneficiaries] = useState([]);
    const [error, setError] = useState('');
    const { userDetails, updateUserDetails, resetUserDetails} = useUser();
    const navigate = useNavigate();

    const { userName, userToken } = userDetails;

    useEffect(() => {
        const loadedBeneficiaries = JSON.parse(localStorage.getItem('beneficiaries')) || [];
        setBeneficiaries(loadedBeneficiaries);
    }, []);

    const handleLogout = () => {
        resetUserDetails();
        navigate('/');
    };

    const handleSaveUsername = () => {
        // Save new username logic here
        setShowChangeInfoModal(false);
        console.log('Username updated to:', username);
    };

    const handleAddBeneficiary = () => {
        if (beneficiaryName && beneficiaryAddress && !beneficiaries.some(b => b.address === beneficiaryAddress)) {
            const updatedBeneficiaries = [...beneficiaries, { name: beneficiaryName, address: beneficiaryAddress }];
            localStorage.setItem('beneficiaries', JSON.stringify(updatedBeneficiaries));
            setBeneficiaries(updatedBeneficiaries);
            console.log('Beneficiary added:', { name: beneficiaryName, address: beneficiaryAddress });
            setBeneficiaryName('');
            setBeneficiaryAddress('');
        }
    };

    const handleRemoveBeneficiary = (beneficiary) => {
        const updatedBeneficiaries = beneficiaries.filter(b => b.address !== beneficiary.address);
        localStorage.setItem('beneficiaries', JSON.stringify(updatedBeneficiaries));
        setBeneficiaries(updatedBeneficiaries);
    };

    const handleRestorePin = async () => {
        try {
            const response = await fetch("https://wallet-app-server.vercel.app/restore", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userName,
                    userToken
                })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Failed to update pin.');
            }
            const { challengeId } = data;
            updateUserDetails({ ...userDetails, challengeId });
            setTimeout(() => {
                navigate('/w3ssdk');
            }, 1000);
        } catch (err) {
            setError(err.message || 'Failed to update pin. Please try again.');
        } finally {
            // setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-96 px-4 py-10 bg-gray-900 text-white">
            <button onClick={handleLogout} className="mb-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Logout
            </button>
            <button onClick={() => setShowChangeInfoModal(true)} className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Change Username
            </button>
            <button onClick={() => setShowAddBeneficiaryModal(true)} className="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Add Beneficiary
            </button>
            <button onClick={handleRestorePin} className="mb-4 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                Restore Pin
            </button>

            {/* Modals */}
            {showChangeInfoModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-gray-800 p-4 rounded-lg text-white">
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="text-black p-2 rounded" />
                        <button onClick={handleSaveUsername} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block mt-2">
                            Save
                        </button>
                    </div>
                </div>
            )}

            {showAddBeneficiaryModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-gray-800 p-4 rounded-lg text-white">
                        <div className='flex flex-col'>
                            <input type="text" value={beneficiaryName} onChange={(e) => setBeneficiaryName(e.target.value)} className="text-black p-2 rounded" placeholder="Enter Beneficiary Name" />
                            <input type="text" value={beneficiaryAddress} onChange={(e) => setBeneficiaryAddress(e.target.value)} className="text-black p-2 rounded mt-2" placeholder="Enter Beneficiary Address" />
                        </div>
                        <button onClick={handleAddBeneficiary} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded block mt-2">
                            Save
                        </button>
                        {/* Beneficiaries */}
                        <ul className="space-y-2 mt-4">
                            {beneficiaries.map((b, index) => (
                                <li key={index} className="flex justify-between items-center">
                                    <div className="truncate mr-2" style={{ maxWidth: "200px" }}>
                                        <span title={b.address}>{b.name} - {b.address}</span>
                                    </div>
                                    <button onClick={() => handleRemoveBeneficiary(b)} className="text-red-500 hover:text-red-700">Remove</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Settings;
