import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../../userContext/UserContext';
import unset_wallet from '../../../unset_wallet.png';

const Dashboard = () => {
    const { userDetails, updateUserDetails } = useUser();

    return (
        <div style={{ backgroundImage: `url(${unset_wallet})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', minHeight: '100vh' }} className="flex items-center justify-center">
            <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <div className="text-center">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-2">Welcome, {userDetails.id}!</h2>
                    <p className="text-lg text-gray-600">You have successfully created an account.</p>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                    <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center mt-8">
                        <h3 className="text-xl font-semibold text-white mb-4">Account Information</h3>
                        <p className="text-lg text-gray-300 mb-4">User Name: {userDetails.id}</p>
                        <div className='bg-gray-900 border-2 border-gray-500 rounded-md p-2'>
                            <p className="text-lg text-gray-300 ">Creation Date: {new Date(userDetails.createDate).toLocaleDateString()}</p>
                        </div>

                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center mt-8">
                        <h3 className="text-xl font-semibold text-white mb-4">Account Status:</h3>

                        <div className='bg-gray-900 border-2 border-gray-500 rounded-md my-2 p-2'>
                            <p className="text-lg text-gray-300">Status: {userDetails.status}</p>
                        </div>
                        <div className='bg-red-800 border-2 border-gray-500 rounded-md p-2'>
                            <p className="text-lg text-gray-300">Security Question: {userDetails.status}</p>
                        </div>

                    </div>

                </div>


                <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center mt-8">
                    <h3 className="text-xl font-semibold text-red-500 mb-4">Action Required</h3>
                    <p className="text-lg text-gray-300 mb-4">You have not created a wallet yet.</p>
                    <div className='p-4 bg-amber-600 border-2 border-amber-600 rounded-md m-2'>
                        <p className="text-lg text-gray-800 font-bold">Creating a wallet allows you to securely store and manage your digital assets.</p>
                    </div>
                    <div className="flex flex-col max-w-sm mx-auto">
                        <Link to="/createwallet" className="bg-green-700 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-full inline-block transition duration-300">Create Wallet</Link>
                        <Link to="/login" className="text-blue-700 hover:text-blue-600 font-semibold py-2 px-6 rounded-full inline-block transition duration-300">log out</Link>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Dashboard;
