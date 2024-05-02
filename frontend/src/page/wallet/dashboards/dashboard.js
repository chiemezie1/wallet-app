import React, { useState, useEffect } from 'react';
import { useUser } from '../../../userContext/UserContext';
import settingsIcon from '../../../settings.png';
import Deposit from '../../deposit/page';
import Transfer from '../../transfer/page';
import Swaps from '../../swaps/page';
import NFTs from '../../nfts/page';
import BalanceModal from '../../balance/page';
import Stake from '../../stake/page';
import History from '../../history/page';
import SettingsPage from '../../settings/page';
import useSessionToken from '../../../utils/getSessionToken';

const Dashboard = () => {
    const { userDetails, updateUserDetails } = useUser();
    const { userToken } = useSessionToken();
    const [activeModal, setActiveModal] = useState(null);
    const [transactions, setTransactions] = useState([]);
    

    useEffect(() => {
        const fetchAndUpdateTransactions = async () => {
            try {
                const response = await fetch("http://localhost:4400/transactions", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        blockchain: userDetails.nativeCoin?.symbol,
                        userToken: userDetails.userToken
                    })
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch transactions');
                }

                const responseData = await response.json();
                console.log("Data from API:", responseData);

                // Update userDetails context
                updateUserDetails({ ...userDetails, transactions: responseData.transactions });

                // Update local state for displaying transactions
                setTransactions(responseData.transactions.slice(0, 4));

            } catch (err) {
                console.error('Error fetching transactions:', err.message);
            }
        };

        fetchAndUpdateTransactions();
    }, [userDetails, updateUserDetails]);

    const ModalContent = () => {
        switch (activeModal) {
            case 'deposit': return <Deposit />;
            case 'transfer': return <Transfer />;
            case 'swaps': return <Swaps />;
            case 'nfts': return <NFTs />;
            case 'stake': return <Stake />;
            case 'history': return <History />;
            case 'settings': return <SettingsPage />;
            case 'balance': return <BalanceModal />;
            default: return null;
        }
    };

    const updateSessionToken = async () => {
        updateUserDetails({ ...userDetails, userToken });
    };

    const closeModal = () => {
        setActiveModal(null);
    };

    return (
        <div>
            <div className="mb-8 text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-2">Welcome, {userDetails.id}!</h2>
                <p className="text-sm text-gray-600">Blockchain: {userDetails.nativeCoin?.name}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-gray-800 p-6 rounded-lg shadow-md" onClick={() => setActiveModal('balance')}>
                    <h3 className="text-xl font-semibold text-white mb-2">{userDetails.nativeCoin?.name + ' '}Balance</h3>
                    <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg shadow-xl p-4 text-white">
                        <h2 className="text-4xl font-bold mb-4">{parseFloat(userDetails.nativeBalance).toFixed(7)}</h2>
                        <button onClick={updateSessionToken} className="bg-transparent hover:bg-white text-white font-semibold hover:text-purple-600 py-1 px-4 border border-white hover:border-transparent rounded">
                            See More
                        </button>
                    </div>
                </div>

                <div className="bg-gray-800 py-6 rounded-lg shadow-md flex justify-around items-center text-center">
                    <button onClick={() => setActiveModal('deposit')} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-3 py-2 rounded">
                        Deposit
                    </button>
                    <button onClick={() => setActiveModal('transfer')} className="bg-purple-500 hover:bg-purple-600 text-white font-semibold p-2 rounded">
                        Transfer
                    </button>
                    <button onClick={() => setActiveModal('swaps')} className="bg-green-500 hover:bg-green-600 text-white font-semibold px-3 py-2 rounded">
                        Swap
                    </button>
                </div>

                <div className="bg-gray-800 py-6 rounded-lg shadow-md flex justify-around items-center text-center">
                    <button onClick={() => setActiveModal('nfts')} className="bg-slate-500 hover:bg-slate-600 text-white font-semibold px-3 py-2 rounded">
                        All NFTs
                    </button>
                    <button onClick={() => setActiveModal('stake')} className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-3 py-2 rounded">
                        Stake
                    </button>
                    <button onClick={() => setActiveModal('settings')} className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-3 py-2 rounded">
                        <img src={settingsIcon} alt="Settings" className="w-8 h-8" />
                    </button>
                </div>
            </div>

            <div className="mt-2 mb-4">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Recent Transactions</h3>
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    <ul className="divide-y divide-gray-700">
                        {transactions.map((transaction, index) => (
                            <li key={index} className="py-4">
                                <p className="text-white">Transaction ID: {transaction.id}</p>
                                <p className="text-gray-400 text-sm">{transaction.date}</p>
                            </li>
                        ))}
                    </ul>
                    <div className="text-center">
                        <button onClick={() => setActiveModal('history')} className="text-blue-500 text-sm font-semibold">
                            View All Transactions
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal for displaying detailed components */}
            {activeModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-gray-800 p-4 rounded-lg text-white relative">
                        {ModalContent()}
                        <button onClick={closeModal} className="absolute top-0 right-0 p-2 text-lg">
                            &#x2715; {/* Unicode X symbol for close */}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
